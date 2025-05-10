import streamlit as st
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
import os

# Set your Google API key as an environment variable
os.environ["GOOGLE_API_KEY"] = "AIzaSyDeCfka3goQtaqdQFQ6IDW2qkdneps-Otw"

# Initialize chat history
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

# Function to generate responses

def get_response(user_query, chat_history):
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-pro",
        temperature=0.5,  # Fixed creativity level
        max_tokens=256,   # Fixed response length
        timeout=None,
        max_retries=2,
    )

    # Single-role system message
    system_message = "You are a helpful AI assistant."

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_message),
            ("human", "{input}"),
        ]
    )

    chain = prompt | llm | StrOutputParser()
    return chain.stream(
        {
            "history": chat_history,
            "input": user_query,
        }
    )

# Set up the app
st.set_page_config(page_title="MechMate Assistant", page_icon="🤖")
st.title("MechMate Assistant")

# Display chat history
for message in st.session_state.chat_history:
    if isinstance(message, HumanMessage):
        with st.chat_message("Human"):
            st.markdown(message.content)
    else:
        with st.chat_message("AI"):
            st.markdown(message.content)

# Get user input
user_query = st.chat_input("Your message")
if user_query:
    st.session_state.chat_history.append(HumanMessage(user_query))

    # Display the user message
    with st.chat_message("Human"):
        st.markdown(user_query)

    # Generate AI response
    with st.chat_message("AI"):
        message_placeholder = st.empty()
        full_response = ""

        for chunk in get_response(user_query, st.session_state.chat_history):
            full_response += chunk
            message_placeholder.markdown(full_response)

        st.session_state.chat_history.append(AIMessage(full_response))