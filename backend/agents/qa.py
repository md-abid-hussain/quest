import json
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.runnables import RunnableConfig
from copilotkit.langchain import copilotkit_customize_config
from pydantic import BaseModel, Field
from agents.state import AgentState
from agents.utils.models import get_model


class QATool(BaseModel):
    """
    Answer the user's question from the context. If context not present try answering yourself.
    """

    answer: str = Field(description="The answer to the user's question")


async def qa_node(state: AgentState, config: RunnableConfig):
    # config = copilotkit_customize_config(
    #     config,
    #     emit_intermediate_state=[
    #         {
    #             "state_key": "answer",
    #             "tool": "QATool",
    #         }
    #     ],
    # )

    print("---State---")
    for key, value in state.items():
        print(key, ":", value)

    print("...Answering user's question...")

    system_message = f"""
Answer the user's question from the context. If context not present try answering yourself.
user_question: {state["chat"]["question"]}
context: {"\n\n".join(doc.page_content for doc in state['chat']['documents'])}

Answer should be detailed and should contain examples for explanation if required.
"""

    messages = [
        SystemMessage(content=system_message),
        HumanMessage(content=state["chat"]["question"]),
    ]

    # Invoke the model with the list of messages
    # response = (
    #     await get_model()
    #     .bind_tools([QATool], tool_choice="required")
    #     .ainvoke(messages, config)  # Pass the list of messages
    # )

    response = get_model().invoke(messages, config)

    print(response)
    state["answer"] = response
    return state
