from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

from agents.state import AgentState
from agents.extract import step_node
from agents.retrieve import retreive_node
from agents.qa import qa_node

workflow = StateGraph(AgentState)
workflow.add_node("step", step_node)
workflow.add_node("retrieve", retreive_node)
workflow.add_node("qa", qa_node)

workflow.set_entry_point("step")
workflow.add_edge("step", "retrieve")
workflow.add_edge("retrieve", "qa")
workflow.add_edge("qa", END)

memory = MemorySaver()

graph = workflow.compile(checkpointer=memory)
