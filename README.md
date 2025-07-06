<h1> 🌟 Mannavastha - Apke Maan Ka Sathi <h1/>
________

![Screenshot 2025-07-05 100737](https://github.com/user-attachments/assets/2e7e0b8f-7ae2-4fdb-92d5-dd5852d88412)

_____

<h1> 📋 Table of Contents <h1/>
  
    🎯 Project Overview

    ✨ Key Features

    🏗️ Architecture & Technology Stack

    🚀 Getting Started
  
    📁 Project Structure

    🎨 Design System

    🔧 Development Guidelines

    📱 Responsive Design

    🔒 Security & Privacy

    🚀 Deployment

    🤝 Contributing

    📞 Support & Contact
  
    📄 License

  ___

  <h1> ✨Project Overview </h1>

     Mannavastha is an AI-powered mental wellness platform designed to offer emotional support, self-diagnosis, and mood-aware interactions through a friendly, conversational assistant.It blends AI, empathy, and accessible technology to help users manage their mental health proactively — anytime, anywhere.

  🎯 Mission Statement
  
    “To empower individuals with accessible, empathetic, and AI-driven mental health support, fostering emotional well-being through personalized conversations, self-awareness tools, and non-judgmental guidance — anytime, anywhere.”

  **👥 Target Audience**
  
Mannavastha is built for:


🧑‍🎓 Students and young adults dealing with academic pressure, isolation, or self-esteem struggles


👩‍💻 Working professionals facing burnout, anxiety, or work-life imbalance


🧕 Women navigating emotional overwhelm or social stress


🤖 Tech-savvy users interested in AI-based wellness tracking


📱 Anyone who feels emotionally low but isn’t ready (or able) to seek traditional therapy

___


<h1> 🧩 Key Features <h/>

    🤖 AI Chat Companion – Empathetic, non-judgmental support powered by LLMs

    🧘‍♀️ Mood Tracking – Users log emotional states and get feedback over time

    📸 Image Diagnosis – Upload photos to assess signs of stress, sleep issues, or burnout using AI

    🧾 Wellness Reports – Personalized, trackable progress reports and suggestions

    🎙️ Voice Input & Output – Accessibility for users who prefer to speak, not type

    📊 Analytics Dashboard – Admin or user-level insight on emotional trends


___


**🏗️ Architecture & Technology Stack**




    🔲 Frontend 
  
    Framework: React (Next.js)

    Styling: Tailwind CSS

    Voice: elevenlabs

    AI Chat Integration: Gemini / Mistral via API

    ___________________________________________________________________________________________________________________________


    🧠 AI & NLP

    LLM: Gemini Pro + Mistral 7B (Open Source)

    Image AI: Custom-trained image classification (for stress/anxiety detection via facial features or condition image)

    Emotion Analysis: Contextual mood detection via prompt engineering

    ___________________________________________________________________________________________________________________________


    🗄️ Backend

    Server: Node.js + Express

    Routing/API: REST APIs

    Authentication: Supabase Auth

    Database: Supabase (PostgreSQL)

    Deployment: Vercel


___    


🚀 Getting Started

1.Clone the repo:

       git clone https://github.com/Chakshu098/Mannavastha.git
        cd Mannavastha


2.Install Dependencies:

    npm install
 
3.Set Environment Variables (.env.local):


    SUPABASE_URL=your_supabase_url
    SUPABASE_ANON_KEY=your_anon_key
    OPENAI_API_KEY=your_mistral_key
    GEMINI_API_KEY=your_gemini_key

4.Run Dev Server:

    npm run dev
