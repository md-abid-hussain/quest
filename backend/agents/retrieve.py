from langchain_core.runnables import RunnableConfig
from agents.state import AgentState
from agents.utils.models import load_embedding_model
from agents.utils.load_vectorstore import load_retriever


async def retreive_node(state: AgentState, config: RunnableConfig):
    """
    This function is a retrieve node for the agent.
    It receives the current state and a config object.
    It returns the new state.
    """

    print("...Retrieving documents...")

    print("---State---")
    for key, value in state.items():
        print(key, ":", value)

    chatId = state["chat"]["chatId"] if state["chat"]["chatId"] else ""
    embedding_model = load_embedding_model()
    retriever = load_retriever(
        embeddings=embedding_model, chatId=chatId, callbacks=None
    )

    documents = retriever.invoke(state["chat"]["question"])
    state["chat"]["documents"] = documents

    print("---State---")
    for key, value in state.items():
        print(key, ":", value)

    return state
