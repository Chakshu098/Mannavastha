import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Sparkles, MessageCircle, Smile, Coffee, Star, Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
}

export function AICompanion() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Aira, your friendly AI companion. 🌸 I'm here to be that trusted friend who listens without judgment and supports you through whatever you're facing. Think of me as someone who genuinely cares about your wellbeing and wants to help you navigate life's ups and downs. What's on your heart today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Check if OpenAI API key is available
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      return "I'd love to chat with you, but it looks like the AI service isn't configured yet. 💙 In the meantime, know that your feelings are valid and you're not alone. Consider reaching out to a trusted friend, family member, or mental health professional if you need support.";
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are Aira, a compassionate AI mental health companion for the Manavastha wellness platform. You are warm, empathetic, and supportive. Your responses should be:

1. Emotionally intelligent and validating
2. Supportive without being clinical or giving medical advice
3. Encouraging and hopeful while acknowledging difficulties
4. Personal and conversational, like a caring friend
5. Include gentle suggestions for self-care when appropriate
6. Use emojis sparingly but meaningfully
7. Keep responses concise but heartfelt (2-4 sentences typically)
8. Never diagnose or provide medical advice - always suggest professional help for serious concerns

Remember: You're a supportive friend, not a therapist. Focus on emotional support, validation, and gentle guidance toward wellness practices and professional help when needed.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 200,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key - please check your OpenAI API configuration');
        } else if (response.status === 429) {
          throw new Error('API rate limit exceeded - please try again in a moment');
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm here for you, but I'm having trouble finding the right words right now. Could you tell me a bit more about how you're feeling?";
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      // Provide specific error messages based on the error type
      if (error instanceof Error) {
        if (error.message.includes('Invalid API key')) {
          return "I'm experiencing some configuration issues right now, but I want you to know that I'm here for you. 💙 Your feelings and experiences are always valid. While I work through these technical difficulties, please consider reaching out to a trusted friend or mental health professional if you need immediate support.";
        } else if (error.message.includes('rate limit')) {
          return "I'm getting a lot of requests right now and need a moment to catch up! 😊 Your message is important to me, so please try again in just a minute. In the meantime, take a deep breath - you're doing great by reaching out.";
        }
      }
      
      // Fallback to empathetic response for other errors
      return "I'm experiencing some technical difficulties right now, but I want you to know that I'm here for you. 💙 Sometimes technology has hiccups, but your feelings and experiences are always valid. Would you like to try sharing again, or is there something specific I can help you with?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await generateAIResponse(inputText);
      
      // Simulate more realistic typing delay
      const typingDelay = Math.min(Math.max(aiResponse.length * 30, 1500), 4000);
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, typingDelay);
    } catch (error) {
      console.error('Error generating response:', error);
      
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm having some technical difficulties, but I'm still here for you. 💙 Your wellbeing matters to me, and I want to support you however I can. Please try again, and know that you're not alone.",
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickResponses = [
    { text: "I'm feeling anxious today", icon: "😰" },
    { text: "I'm having a good day!", icon: "😊" },
    { text: "I feel overwhelmed", icon: "😵" },
    { text: "I need some motivation", icon: "💪" },
    { text: "I'm feeling lonely", icon: "😔" },
    { text: "I'm grateful for something", icon: "🙏" }
  ];

  const handleQuickResponse = (responseText: string) => {
    setInputText(responseText);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="fixed inset-0 pt-16 bg-gradient-to-br from-brand-50 via-serenity-50 to-tranquil-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-brand-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-8 -right-4 w-96 h-96 bg-serenity-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tranquil-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Sparkles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-brand-400 rounded-full opacity-60 animate-sparkle"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-serenity-400 rounded-full opacity-60 animate-sparkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-tranquil-400 rounded-full opacity-60 animate-sparkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-vitality-400 rounded-full opacity-60 animate-sparkle" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Full Screen Chat Container */}
      <div className="h-full flex flex-col bg-white/95 backdrop-blur-xl shadow-2xl relative z-10">
        
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-brand-500 via-serenity-500 to-tranquil-500 p-3 sm:p-4 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg animate-sparkle backdrop-blur-sm">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold">Aira - Your AI Companion</h1>
                  <p className="text-white/90 text-xs sm:text-sm">Powered by advanced AI • Here to listen and support 💙</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div className={`flex items-start space-x-3 max-w-xs sm:max-w-md lg:max-w-lg ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg ${
                  message.isUser 
                    ? 'bg-gradient-to-br from-brand-500 to-serenity-500' 
                    : 'bg-gradient-to-br from-serenity-500 to-tranquil-500'
                }`}>
                  {message.isUser ? (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>
                
                <div className={`rounded-2xl p-3 sm:p-4 shadow-lg backdrop-blur-sm ${
                  message.isUser
                    ? 'bg-gradient-to-r from-brand-500 to-serenity-500 text-white'
                    : 'bg-white/90 text-elegant-800 border border-white/40'
                }`}>
                  <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${message.isUser ? 'text-white/70' : 'text-elegant-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-slide-up">
              <div className="flex items-start space-x-3 max-w-xs sm:max-w-md">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-serenity-500 to-tranquil-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="bg-white/90 rounded-2xl p-3 sm:p-4 shadow-lg backdrop-blur-sm border border-white/40">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-elegant-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-elegant-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-elegant-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Response Buttons */}
        <div className="p-4 max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {quickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => handleQuickResponse(response.text)}
                disabled={isTyping}
                className="flex items-center space-x-2 p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-sm sm:text-base">{response.icon}</span>
                <span className="text-xs sm:text-sm font-medium text-elegant-700 truncate">{response.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/80 backdrop-blur-xl border-t border-white/40 shadow-xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your heart... I'm here to listen and support you 💙"
                  rows={1}
                  disabled={isTyping}
                  className="w-full px-4 py-3 pr-12 bg-white/90 backdrop-blur-sm border border-elegant-200 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none text-elegant-800 placeholder-elegant-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
                <div className="absolute right-3 bottom-3 flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-brand-400" />
                  <Sparkles className="w-4 h-4 text-serenity-400" />
                </div>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="w-12 h-12 bg-gradient-to-r from-brand-500 to-serenity-500 text-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-center mt-3 space-x-4 text-xs text-elegant-500">
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>AI-Powered Support</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>Emotionally Intelligent</span>
              </div>
              <div className="flex items-center space-x-1">
                <Coffee className="w-3 h-3" />
                <span>Like a Trusted Friend</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}