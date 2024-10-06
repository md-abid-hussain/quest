import { NextResponse, NextRequest } from "next/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import prisma from "@/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { loadEmbeddingsModel } from "@/utils/loadEmbeddings";
import { loadVectorStore } from "@/utils/vectorstore";
import { type MongoClient } from "mongodb";

export async function POST(request: NextRequest) {
  let mongoDbClient: MongoClient | null = null;

  const { fileUrl, fileName, cid } = await request.json();

  if (!fileUrl || !fileName || !cid) {
    return NextResponse.json({ error: "Missing fileUrl or fileName" });
  }

  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "You must be logged in to ingest data" });
  }

  const doc = await prisma.document.create({
    data: {
      fileName,
      fileUrl,
      userId,
      cid,
    },
  });

  const namespace = doc.id;

  try {
    console.log(fileUrl);
    console.log(userId);
    console.log(namespace);
    const response = await fetch(fileUrl);
    const buffer = await response.blob();
    const loader = new PDFLoader(buffer);
    const rawDocs = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await textSplitter.splitDocuments(rawDocs);
    for (const splitDoc of splitDocs) {
      splitDoc.metadata.docstore_document_id = namespace;
    }

    if (splitDocs.length === 0) {
      return NextResponse.json({
        error: "Failed to extract text from the PDF",
      });
    }

    console.log("creating vector store...");

    const embeddings = loadEmbeddingsModel();

    const store = await loadVectorStore({
      namespace: doc.id,
      embeddings,
    });
    const vectorstore = store.vectorstore;
    mongoDbClient = store.mongoDbClient;

    // embed the PDF documents
    await vectorstore.addDocuments(splitDocs);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "Failed to ingest your data" });
  } finally {
    if (mongoDbClient) {
      await mongoDbClient.close();
    }
  }

  return NextResponse.json({
    text: "Successfully embedded pdf",
    id: namespace,
  });
}
