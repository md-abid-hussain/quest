from dotenv import load_dotenv

load_dotenv()
# from agents.agent import graph
from agents.my_agent import graph

from fastapi import FastAPI
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from copilotkit import CopilotKitSDK, LangGraphAgent

app = FastAPI()
sdk = CopilotKitSDK(
    agents=[LangGraphAgent(name="rag", description="RAG agent", agent=graph)]
)

add_fastapi_endpoint(app, sdk, "/copilotkit")
