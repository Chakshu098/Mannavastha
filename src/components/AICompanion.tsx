import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Sparkles, MessageCircle, Smile, Coffee, Star, Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
}

interface VoiceflowResponse {
  type: string;
  payload?: {
    message?: string;
    slate?: {
      content: Array<{
        children: Array<{
          text: string;
        }>;
      }>;
    };
  };
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
  const [voiceflowLoaded, setVoiceflowLoaded] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Voiceflow
  useEffect(() => {
    const initializeVoiceflow = () => {
      // Generate a unique session ID for this user
      const newSessionId = `manavastha-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      setVoiceflowLoaded(true);
    };

    initializeVoiceflow();
  }, []);

  // Function to send message to Voiceflow API
  const sendToVoiceflow = async (message: string): Promise<string> => {
    try {
      const response = await fetch('https://general-runtime.voiceflow.com/state/user/68651ed5b6d64a988f504e01/interact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'VF.DM.68651ed5b6d64a988f504e01.bQpzOy8BqGjmhJBF', // You'll need to replace this with your actual API key
        },
        body: JSON.stringify({
          action: {
            type: 'text',
            payload: message
          },
          config: {
            tts: false,
            stripSSML: true,
            stopAll: true,
            excludeTypes: ['block', 'debug', 'flow']
          },
          session: {
            userID: sessionId
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: VoiceflowResponse[] = await response.json();
      
      // Extract text from Voiceflow response
      let responseText = '';
      for (const item of data) {
        if (item.type === 'text' && item.payload?.message) {
          responseText += item.payload.message + ' ';
        } else if (item.type === 'speak' && item.payload?.message) {
          responseText += item.payload.message + ' ';
        } else if (item.payload?.slate?.content) {
          // Handle slate format
          for (const content of item.payload.slate.content) {
            for (const child of content.children) {
              responseText += child.text + ' ';
            }
          }
        }
      }

      return responseText.trim() || "I'm here to listen and support you. Could you tell me more about what's on your mind?";
    } catch (error) {
      console.error('Error communicating with Voiceflow:', error);
      return "I'm having trouble connecting right now, but I'm still here for you. Sometimes technology has hiccups, but my care for your wellbeing never wavers. Could you try sharing again?";
    }
  };

  // Fallback responses for when Voiceflow is unavailable
  const getFallbackResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('anxious') || message.includes('anxiety') || message.includes('worried')) {
      return "I can feel the weight of that anxiety with you. 💙 It's like your mind is trying to protect you, but sometimes it goes into overdrive, right? Let's slow things down together. Try this with me: breathe in slowly for 4 counts... hold it... and now exhale for 6. Your nervous system will thank you for this gentle reset. You're safe right now.";
    }
    
    if (message.includes('sad') || message.includes('depressed') || message.includes('down')) {
      return "I'm sitting here with you in this difficult moment. 🤗 When sadness feels this heavy, it can seem like it'll never lift, but I want you to know that your feelings are completely valid and you don't have to carry this alone. Sometimes the bravest thing we can do is just acknowledge how hard things are right now.";
    }
    
    if (message.includes('happy') || message.includes('good') || message.includes('great')) {
      return "Oh, this just made my day! 🌟 I can feel your joy radiating through your words, and it's absolutely beautiful. These moments of happiness are so precious - they're like little gifts we give ourselves. What's been the spark behind this wonderful feeling?";
    }
    
    return "Thank you for trusting me with what you're going through. 🌸 I can sense there's a lot happening for you right now. Sometimes it helps just to have someone witness our experience without trying to fix anything. I'm here with you. What's your heart needing today?";
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
      let responseText: string;
      
      if (voiceflowLoaded && sessionId) {
        // Try to get response from Voiceflow
        responseText = await sendToVoiceflow(inputText);
      } else {
        // Use fallback response
        responseText = getFallbackResponse(inputText);
      }

      // Simulate realistic typing delay
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500 + Math.random() * 2000);

    } catch (error) {
      console.error('Error sending message:', error);
      
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: getFallbackResponse(inputText),
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1500);
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
                  <p className="text-white/90 text-xs sm:text-sm">
                    {voiceflowLoaded ? 'Powered by Advanced AI • Here to listen and support you 💙' : 'Loading AI • Here to listen and support you 💙'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-xs sm:text-sm">
                <div className={`w-2 h-2 rounded-full animate-pulse ${voiceflowLoaded ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <span className="text-white/90 font-medium">{voiceflowLoaded ? 'AI Ready' : 'Loading'}</span>
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
                className="flex items-center space-x-2 p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
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
                <span>Judgment-Free Space</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>AI-Powered Support</span>
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