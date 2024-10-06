import DocumentClient from "./document-client";
import prisma from "@/utils/prisma";



export default async function DocumentPage({ params }: { params: { id: string } }) {
    const docId = params.id
    const currentDoc = await prisma.document.findUnique({
        where: {
            id: docId
        }
    })

    if (!currentDoc) {
        return <div>This document was not found</div>;
    }

    const { id } = params;
    console.log("DocumentPage", id);
    return (
        <div>
            <DocumentClient currentDoc={currentDoc} />
        </div>
    );
}