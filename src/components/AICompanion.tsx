import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Sparkles, MessageCircle, Smile, Coffee, Star } from 'lucide-react';

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
      text: "Hello! I'm your AI wellness companion. I'm here to listen, support, and help you on your mental health journey. How are you feeling today? 🌸",
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

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Wellness-focused responses
    if (message.includes('anxious') || message.includes('anxiety') || message.includes('worried')) {
      const responses = [
        "I understand you're feeling anxious. Let's try a simple breathing exercise: breathe in for 4 counts, hold for 4, then exhale for 6. This can help calm your nervous system. 🌬️",
        "Anxiety can feel overwhelming, but you're not alone. Try grounding yourself by naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. 🌿",
        "When anxiety strikes, remember that these feelings are temporary. Consider taking a short walk, listening to calming music, or practicing mindfulness. What usually helps you feel more centered? 💙"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (message.includes('sad') || message.includes('depressed') || message.includes('down')) {
      const responses = [
        "I hear that you're going through a difficult time. Your feelings are completely valid. Sometimes it helps to do one small thing that usually brings you comfort. What's something gentle you could do for yourself today? 🤗",
        "When we're feeling low, it's important to be extra kind to ourselves. Consider reaching out to someone you trust, taking a warm bath, or simply acknowledging that it's okay to not be okay. 💜",
        "Sadness is a natural part of the human experience. While it's difficult, remember that you've overcome challenges before. What's one small step you could take today toward feeling a bit better? 🌱"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (message.includes('stressed') || message.includes('overwhelmed') || message.includes('pressure')) {
      const responses = [
        "It sounds like you're carrying a lot right now. When feeling overwhelmed, try breaking things down into smaller, manageable steps. What's the most important thing you need to focus on today? 📝",
        "Stress can be exhausting. Remember that it's okay to take breaks and ask for help. Try some deep breathing or a short walk to reset your mind. You don't have to handle everything at once. 🌸",
        "Feeling overwhelmed is your mind's way of saying you might need to slow down. Consider what you can delegate, postpone, or let go of. Your wellbeing is just as important as your responsibilities. ✨"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (message.includes('happy') || message.includes('good') || message.includes('great') || message.includes('wonderful')) {
      const responses = [
        "That's wonderful to hear! I'm so glad you're feeling good today. What's contributing to your positive mood? It's great to celebrate these moments! 🌟",
        "I love hearing that you're feeling happy! These positive moments are so important. Consider taking a moment to appreciate what's going well in your life right now. 😊",
        "Your happiness brings me joy too! It's beautiful when we can recognize and savor the good moments. What's been the highlight of your day so far? 🌈"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (message.includes('tired') || message.includes('exhausted') || message.includes('sleep')) {
      const responses = [
        "Rest is so important for mental health. If you're having trouble sleeping, try creating a calming bedtime routine - dim lights, no screens, maybe some gentle stretching or reading. 😴",
        "Being tired affects everything - your mood, ability to cope, and physical health. Make sure you're prioritizing rest when you can. What does your current sleep routine look like? 🌙",
        "Fatigue can be both physical and emotional. Consider what might be draining your energy and how you can create more space for rest and recovery in your day. 💤"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (message.includes('lonely') || message.includes('alone') || message.includes('isolated')) {
      const responses = [
        "Loneliness can be really difficult to experience. Remember that you're not truly alone - there are people who care about you, and I'm here to listen. Sometimes reaching out to just one person can help. 💙",
        "Feeling isolated is painful, but connection is possible. Consider small ways to connect - maybe a text to a friend, joining an online community, or even just smiling at a stranger. You matter. 🤗",
        "I hear how disconnected you're feeling. Connection is a basic human need, and it's okay to seek it out. What's one small step you could take today toward reaching out to someone? 🌸"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (message.includes('thank') || message.includes('grateful') || message.includes('appreciate')) {
      const responses = [
        "You're so welcome! It means a lot to me that I could be helpful. Remember, taking care of your mental health is one of the most important things you can do. 💜",
        "I'm grateful to be part of your wellness journey! Your willingness to reach out and work on your mental health shows real strength and self-awareness. 🌟",
        "Thank you for sharing with me. It takes courage to be open about how you're feeling. I'm always here when you need support or just want to chat. 🌸"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // General supportive responses
    const generalResponses = [
      "I'm here to listen and support you. Your feelings are valid, and it's important that you're taking time to check in with yourself. What's on your mind today? 💙",
      "Thank you for sharing with me. Mental health is just as important as physical health, and I'm glad you're prioritizing it. How can I best support you right now? 🌿",
      "I appreciate you reaching out. Sometimes talking about our feelings can help us process them better. What would be most helpful for you today? ✨",
      "Your mental wellbeing matters so much. I'm here to help however I can. Is there something specific you'd like to talk about or work through together? 🌸",
      "It's wonderful that you're taking time for your mental health. What kind of support feels most important to you right now - practical strategies, emotional validation, or something else? 💜"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
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

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickResponses = [
    { text: "I'm feeling anxious", icon: "😰" },
    { text: "I'm having a good day", icon: "😊" },
    { text: "I feel overwhelmed", icon: "😵" },
    { text: "I need motivation", icon: "💪" }
  ];

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col bg-gradient-to-br from-brand-50 via-serenity-50 to-tranquil-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-500 via-serenity-500 to-tranquil-500 p-4 sm:p-6 text-white shadow-xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg animate-sparkle backdrop-blur-sm">
              <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">AI Wellness Companion</h1>
              <p className="text-white/90 text-sm sm:text-base">Your personal mental health support assistant</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">Online & Ready to Help</span>
              </div>
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
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {quickResponses.map((response, index) => (
            <button
              key={index}
              onClick={() => {
                setInputText(response.text);
                setTimeout(handleSendMessage, 100);
              }}
              className="flex items-center space-x-2 p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span className="text-lg">{response.icon}</span>
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
                placeholder="Share what's on your mind... I'm here to listen and support you 💙"
                rows={1}
                className="w-full px-4 py-3 pr-12 bg-white/90 backdrop-blur-sm border border-elegant-200 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none text-elegant-800 placeholder-elegant-500 shadow-lg"
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
              <span>Confidential & Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-1">
              <Coffee className="w-3 h-3" />
              <span>Always Here to Listen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}