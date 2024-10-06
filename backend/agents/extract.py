from langchain_core.messages import HumanMessage
from langchain_core.runnables import RunnableConfig
from copilotkit.langchain import copilotkit_customize_config
from pydantic import BaseModel, Field
from agents.models import get_model
from agents.state import AgentState


class ExtractDetails(BaseModel):
    """
    This class represents the details of the extract agent.
    """

    question: str = Field(description="The user's question")
    chatId: str = Field(description="Unique identifier for the chat session")


class Details(BaseModel):
    """
    This class represents the details of the extract agent.
    """

    details: ExtractDetails = Field(
        description="The extracted details containing the chatId and question"
    )


async def step_node(state: AgentState, config: RunnableConfig):
    """
    This function is a step node for the agent.
    It receives the current state and a config object.
    It returns the new state.
    """

    print("---State---")
    print(state)
    # config = copilotkit_customize_config(
    #     config,
    #     emit_intermediate_state=[
    #         {
    #             "state_key": "chat",
    #             "tool": "ExtractDetails",
    #             "tool_argument": "chat",
    #         }
    #     ],
    # )

    # Extract the content of the last message
    last_message_content = state["messages"][-1].content

    # Construct the instructions with the last message content
    instructions = f"""
    From the given input extract the chatId and question. The input contains the chatId at the end as (chatId:xxxx)
    {last_message_content}
    """

    # Invoke the model with the last message and the instructions
    response = (
        await get_model()
        .bind_tools(
            [ExtractDetails],
            tool_choice="required",
        )
        .ainvoke([last_message_content, HumanMessage(content=instructions)], config)
    )

    # extracted_details = response.tool_calls
    # details_instance = Details(details=ExtractDetails(**extracted_details))
    # question = details_instance.details.question
    # chat_id = details_instance.details.chatId
    # print(f"Extracted Question: {question}")
    # print(f"Extracted Chat ID: {chat_id}")

    # state["chat"]["chatId"] = chat_id
    # state["chat"]["question"] = question

    print("---Response---")
    print(response)

    if response.content:
        chat = response.tool_calls[0]["args"]
    else:
        chat = {
            "chatId": "",
            "question": last_message_content,
        }

    print("---Chat---")
    print(chat)

    return {
        "chat": chat,
    }
