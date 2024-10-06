from typing import List, TypedDict, Optional
from langgraph.graph import MessagesState
from langchain.schema import Document


class ChatState(TypedDict):
    """
    Represents the state of our chat.

    Attributes:
        chatId: Unique identifier for the chat session
        question: User's question
        documents: List of documents
    """

    chatId: str
    question: str
    documents: Optional[List[Document]]


class AgentState(MessagesState):
    """
    This is the state of the agent.
    It is a subclass of the MessagesState class from langgraph.
    """

    chat: ChatState
    answer: Optional[str]
