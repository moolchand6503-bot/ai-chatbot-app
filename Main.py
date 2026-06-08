import streamlit as st
import os
from openai import OpenAI
from dotenv import load_dotenv

# Local computer par check karne ke liye .env load karna
load_dotenv()

# Web page ki settings
st.set_page_config(page_title="Fancy AI Chatbot", page_icon="🤖", layout="centered")

# Fancy Title aur Design
st.markdown("""
    <style>
    .main-title {
        text-align: center;
        color: #FF4B4B;
        font-size: 40px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    </style>
    <div class='main-title'>🤖 MY FANCY AI CHATBOT</div>
""", unsafe_allow_html=True)
st.write("---")

# Render ke Environment Variable se automatic key lena (Sabse safe tarika)
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    st.error("⚠️ Bhai, OpenAI API Key nahi mili! Render ke Environment Variables mein check karein.")
    st.stop()

# OpenAI Client ko chalu karna
client = OpenAI(api_key=api_key)

# Purani baatein yaad rakhne ke liye memory setup
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "system", "content": "You are a helpful, stylish, and intelligent AI assistant. Keep responses engaging and friendly."}
    ]

# Screen par purani chat dikhana
for msg in st.session_state.messages:
    if msg["role"] != "system":
        with st.chat_message(msg["role"]):
            st.write(msg["content"])

# Website par chat box se input lena
if user_input := st.chat_input("Yahan apna message likhein..."):
    
    # User ka message dikhana
    with st.chat_message("user"):
        st.write(user_input)
    
    st.session_state.messages.append({"role": "user", "content": user_input})
    
    # AI ka response lekar dikhana
    with st.chat_message("assistant"):
        with st.spinner("AI soch raha hai... ⏳"):
            try:
                response = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=st.session_state.messages
                )
                ai_response = response.choices.message.content
                st.write(ai_response)
                
                # Jawab ko memory mein save karna
                st.session_state.messages.append({"role": "assistant", "content": ai_response})
            except Exception as e:
                st.error(f"Error aaya: {e}")

