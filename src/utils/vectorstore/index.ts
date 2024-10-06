import { Embeddings } from "@langchain/core/embeddings";
import { loadMongoDBStore } from "./mongo";
import { Callbacks } from "@langchain/core/callbacks/manager";

export async function loadVectorStore({
  embeddings,
}: {
  namespace: string;
  embeddings: Embeddings;
}) {
  return await loadMongoDBStore({
    embeddings,
  });
}

export async function loadRetriever({
  embeddings,
  chatId,
  callbacks,
}: {
  embeddings: Embeddings;
  chatId: string;
  callbacks?: Callbacks;
}) {
  let mongoDbClient = null;
  const store = await loadVectorStore({
    namespace: chatId,
    embeddings,
  });
  const vectorstore = store.vectorstore;
  mongoDbClient = store.mongoDbClient;
  const filter = {
    preFilter: {
      docstore_document_id: {
        $eq: chatId,
      },
    },
  };

  const retriever = vectorstore.asRetriever({
    filter,
    callbacks,
  });
  return {
    retriever,
    mongoDbClient,
  };
}
