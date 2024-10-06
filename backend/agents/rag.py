import os
from dotenv import load_dotenv

load_dotenv()

import json
from langgraph.graph import StateGraph, END, START
from langgraph.checkpoint.memory import MemorySaver

from .utils.models import loadEmbeddings
from .utils.load_vectorstore import load_retriever

from langchain.schema import Document
from langchain_core.prompts import ChatPromptTemplate

from langchain_together import ChatTogether

from typing import List
from typing_extensions import TypedDict
import re

from langgraph.checkpoint.memory import MemorySaver


class GraphState(TypedDict):
    """
    Represents the state of our graph.

    Attributes:
        chatId: Unique identifier for the chat session
        question: User's question
        generation: LLM generation
        documents: List of documents
    """

    chatId: str
    question: str
    generation: str
    documents: List[str]


def extract_chat_id(question: str) -> str:
    """
    Extract the chat ID from the question.

    Args:
        question (str): The user question containing the chatId.

    Returns:
        str: The extracted chat ID.
    """
    match = re.search(r"chatId:([a-zA-Z0-9]+)", question)
    if match:
        return match.group(1)
    else:
        raise ValueError("Chat ID not found in the question")


def retrieve(state: GraphState) -> GraphState:
    """
    Retrieve documents

    Args:
        state (GraphState): The current graph state

    Returns:
        GraphState: New key added to state, documents, that contains retrieved documents
    """
    print("---RETRIEVE---")
    question = state["question"]
    print("---QUESTION---")
    print(question)

    # Extract and remove chatId from the question
    chatId = extract_chat_id(question)
    print("---CHATID---")
    print(chatId)
    question = re.sub(r"\(chatId:[a-zA-Z0-9]+\)", "", question).strip()
    print("---QUESTION WITHOUT CHATID---")
    print(question)

    embeddings = loadEmbeddings()
    print("---EMBEDDINGS---")
    print(embeddings)
    retriever = load_retriever(embeddings=embeddings, chatId=chatId, callbacks=None)

    print("---RETRIEVER---")
    print(retriever)
    # Retrieval
    documents = retriever["retriever"].invoke(question)

    print("---DOCUMENTS---")
    # print(documents)
    state["documents"] = documents
    return state


def qa_node(state: GraphState) -> GraphState:
    """
    Question-answering node

    Args:
        state (GraphState): The current graph state

    Returns:
        GraphState: New key added to state, generation, that contains the LLM generation
    """
    print("---QA---")
    question = state["question"]
    documents = state["documents"]
    # context = "\n".join(documents)
    # Question-answering
    generation = question_chain.invoke({"question": question, "context": documents})
    state["generation"] = generation
    return {
        "generation": generation,
    }


# Prompt
system_prompt = (
    "From the given context try to answer user query. Give a detailed answer with example for explanation if required."
    "\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{question}"),
    ]
)
llm = ChatTogether(api_key=os.getenv("TOGETHER_API_KEY"), model="google/gemma-2-9b-it")

question_chain = prompt | llm

# Workflow setup
workflow = StateGraph(GraphState)
workflow.add_node("retrieve", retrieve)
workflow.add_node("qa_chain", qa_node)

workflow.set_entry_point("retrieve")
workflow.add_edge("retrieve", "qa_chain")
workflow.add_edge("qa_chain", END)

# app = workflow.compile()

# from pprint import pprint

# # Run
# inputs = {
#     "chatId": "cm1u8isco00014vqlc8gh9vcs",
#     "question": "What is GA? (chatId:cm1u8isco00014vqlc8gh9vcs)",
# }
# for output in app.stream(inputs):
#     for key, value in output.items():
#         # Node
#         pprint(f"Node '{key}':")
#         # Optional: print full state at each node
#         # pprint.pprint(value["keys"], indent=2, width=80, depth=None)
#     pprint("\n---\n")

# # Final generation
# pprint(value["generation"])

# inputs2 = {
#     "chatId": "cm1u8isco00014vqlc8gh9vcs",
#     "question": "exaplain the earlier question with an example and usecase (chatId:cm1u8isco00014vqlc8gh9vcs)",
# }

# for output in app.stream(inputs2):
#     for key, value in output.items():
#         # Node
#         pprint(f"Node '{key}':")
#         # Optional: print full state at each node
#         # pprint.pprint(value["keys"], indent=2, width=80, depth=None)
#     pprint("\n---\n")

# # Final generation
# pprint(value["generation"])


memory = MemorySaver()
graph = workflow.compile(checkpointer=memory)
