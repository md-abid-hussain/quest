import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_together import ChatTogether


def load_embedding_model():
    return GoogleGenerativeAIEmbeddings(
        model="models/text-embedding-004",
        task_type="retrieval_query",
        title="Document title",
        google_api_key=os.getenv("GEMINI_API_KEY"),
    )


def get_model():
    """
    Get a model based on the environment variable.
    """
    return ChatTogether(
        api_key=os.getenv("TOGETHER_API_KEY"),
        model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    )
