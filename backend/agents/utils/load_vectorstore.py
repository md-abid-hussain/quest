import os
from pymongo import MongoClient
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_core.embeddings import Embeddings


def load_mongo_db_store(embeddings: Embeddings):
    mongo_db_client = MongoClient(os.getenv("MONGODB_ATLAS_URI"))
    db_name = os.getenv("MONGODB_ATLAS_DB_NAME")
    collection_name = os.getenv("MONGODB_ATLAS_COLLECTION_NAME")
    db = mongo_db_client[db_name]
    collection = db[collection_name]
    vector_store = MongoDBAtlasVectorSearch(
        embedding=embeddings,
        index_name=os.getenv("MONGODB_ATLAS_INDEX_NAME"),
        client=mongo_db_client,
        db_name=db_name,
        collection=collection,
    )

    return {"vector_store": vector_store, "mongo_db_client": mongo_db_client}


def load_vector_store(embeddings: Embeddings):
    return load_mongo_db_store(embeddings)


def load_retriever(embeddings: Embeddings, chatId: str, callbacks):
    store = load_vector_store(embeddings)

    vector_store = store["vector_store"]

    mongo_filter = {
        "preFilter": {
            "docstore_document_id": {
                "$eq": chatId,
            },
        },
    }

    retriever = vector_store.as_retriever(
        filter=mongo_filter,
        callbacks=callbacks,
    )

    return retriever
