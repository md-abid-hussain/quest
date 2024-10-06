"""
This module provides a function to get a model based on the configuration.
"""

import os
from langchain_together import ChatTogether


def get_model():
    """
    Get a model based on the environment variable.
    """
    return ChatTogether(
        api_key=os.getenv("TOGETHER_API_KEY"),
        model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    )
