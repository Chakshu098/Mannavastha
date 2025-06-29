import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Lightbulb, AlertCircle, Sparkles, MessageSquare, Zap, Mic, MicOff } from 'lucide-react';
import { ChatMessage } from '../types';
import { aiAgents } from '../data/aiAgents';

interface SupportChatProps {
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export function SupportChat({ chatHistory, onSendMessage }: SupportChatProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(aiAgents[0]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setIsTyping(true);

    onSendMessage(userMessage);

    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const startListening = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const quickPrompts = [
    { text: "I'm feeling anxious today", icon: "😰", color: "from-mindful-400 to-mindful-600" },
    { text: "Help me with stress management", icon: "🧘‍♀️", color: "from-serenity-400 to-serenity-600" },
    { text: "I'm having trouble sleeping", icon: "😴", color: "from-tranquil-400 to-tranquil-600" },
    { text: "I feel overwhelmed", icon: "🌊", color: "from-brand-400 to-brand-600" },
    { text: "I need motivation", icon: "⚡", color: "from-vitality-400 to-vitality-600" },
    { text: "How can I practice self-care?", icon: "💆‍♀️", color: "from-serenity-400 to-mindful-500" }
  ];

  const handleQuickPrompt = (prompt: string) => {
    onSendMessage(prompt);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };

  const getAgentGradient = (agentId: string) => {
    const gradients = {
      'dr-maya': 'from-brand-500 to-serenity-500',
      'coach-alex': 'from-serenity-500 to-tranquil-500',
      'sage-luna': 'from-tranquil-500 to-brand-500',
      'buddy-sam': 'from-brand-500 to-vitality-500',
      'guardian-phoenix': 'from-vitality-500 to-mindful-500'
    };
    return gradients[agentId as keyof typeof gradients] || 'from-brand-500 to-serenity-500';
  };

  return (
    <div className="fixed inset-0 pt-16 bg-gradient-to-br from-brand-50 via-serenity-50 to-mindful-50">
      {/* Full Screen Chat Container */}
      <div className="h-full flex flex-col bg-white/95 backdrop-blur-xl shadow-2xl">
        
        {/* Compact Chat Header */}
        <div className={`bg-gradient-to-r ${getAgentGradient(selectedAgent.id)} p-3 text-white shadow-lg`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center text-base sm:text-lg animate-pulse-gentle shadow-lg">
                  {selectedAgent.avatar}
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold">{selectedAgent.name}</h2>
                  <p className="text-white/90 text-xs sm:text-sm">{selectedAgent.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-xs font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact AI Agents Selector */}
        <div className="p-2 border-b border-elegant-100 bg-elegant-50/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex space-x-1 overflow-x-auto">
              {aiAgents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`flex-shrink-0 flex items-center space-x-1 px-2 py-1 rounded-lg transition-all duration-300 text-xs ${
                    selectedAgent.id === agent.id
                      ? `bg-gradient-to-r ${getAgentGradient(agent.id)} text-white shadow-md`
                      : 'bg-white text-elegant-600 hover:bg-elegant-100'
                  }`}
                >
                  <span className="text-sm">{agent.avatar}</span>
                  <span className="font-medium whitespace-nowrap">{agent.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Messages - Maximized Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {chatHistory.length === 0 ? (
              <div className="text-center py-6 sm:py-8 animate-fade-in">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${getAgentGradient(selectedAgent.id)} rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float shadow-xl`}>
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-elegant-900 mb-2">Welcome to AI Wellness Support</h3>
                <p className="text-elegant-600 mb-4 sm:mb-6 max-w-xl mx-auto text-sm sm:text-base">
                  I'm {selectedAgent.name}, your {selectedAgent.role.toLowerCase()}. How are you feeling today?
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 max-w-4xl mx-auto">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className={`p-2 sm:p-3 bg-gradient-to-r ${prompt.color} text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in group`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-base sm:text-xl mb-1 group-hover:scale-110 transition-transform duration-300">{prompt.icon}</div>
                      <p className="text-xs font-medium">{prompt.text}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {chatHistory.map((chat, index) => (
                  <div key={chat.id} className="space-y-2 sm:space-y-3 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="flex items-end space-x-2 max-w-xs sm:max-w-md lg:max-w-lg">
                        <div className="bg-gradient-to-r from-brand-500 to-serenity-500 text-white p-2 sm:p-3 rounded-2xl rounded-br-lg shadow-lg">
                          <p className="text-xs sm:text-sm">{chat.message}</p>
                        </div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-elegant-400 to-elegant-600 rounded-full flex items-center justify-center shadow-lg">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex justify-start">
                      <div className="flex items-end space-x-2 max-w-xs sm:max-w-md lg:max-w-2xl">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${getAgentGradient(selectedAgent.id)} rounded-full flex items-center justify-center shadow-lg`}>
                          <span className="text-xs">{selectedAgent.avatar}</span>
                        </div>
                        <div className="bg-white p-2 sm:p-3 rounded-2xl rounded-bl-lg shadow-lg border border-elegant-100">
                          <p className="text-xs sm:text-sm text-elegant-900 leading-relaxed">{chat.response}</p>
                          <div className="flex items-center space-x-3 mt-2 pt-2 border-t border-elegant-100">
                            <div className="flex items-center space-x-1">
                              <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-brand-500" />
                              <span className="text-xs text-elegant-500">AI</span>
                            </div>
                            {chat.confidence_score && (
                              <div className="flex items-center space-x-1">
                                <Zap className="w-2 h-2 sm:w-3 sm:h-3 text-serenity-500" />
                                <span className="text-xs text-elegant-500">{Math.round(chat.confidence_score * 100)}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex items-end space-x-2">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${getAgentGradient(selectedAgent.id)} rounded-full flex items-center justify-center shadow-lg`}>
                        <span className="text-xs">{selectedAgent.avatar}</span>
                      </div>
                      <div className="bg-white p-2 sm:p-3 rounded-2xl rounded-bl-lg shadow-lg border border-elegant-100">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-brand-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-serenity-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-mindful-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Compact Quick Actions */}
        {chatHistory.length > 0 && (
          <div className="px-3 sm:px-4 py-2 border-t border-elegant-100 bg-elegant-50/80 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <div className="flex space-x-2 overflow-x-auto">
                {quickPrompts.slice(3).map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt.text)}
                    className="flex-shrink-0 px-2 py-1 text-xs bg-white hover:bg-elegant-100 rounded-lg transition-all duration-300 border border-elegant-200 flex items-center space-x-1 hover:scale-105 shadow-sm"
                  >
                    <span className="text-sm">{prompt.icon}</span>
                    <span className="whitespace-nowrap">{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Compact Message Input with Mic */}
        <div className="p-3 border-t border-elegant-100 bg-white/95 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto">
            <div className="mb-2 p-2 bg-gradient-to-r from-serenity-50 to-mindful-50 border border-serenity-200 rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-serenity-600 flex-shrink-0" />
              <p className="text-xs text-serenity-700">
                AI assistant for support. For crises, contact emergency services.
              </p>
            </div>
            
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Chat with ${selectedAgent.name}...`}
                className="flex-1 px-3 py-2 border border-elegant-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white/90 backdrop-blur-sm text-sm"
                disabled={isTyping}
              />
              
              {/* Mic Button */}
              {recognition && (
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`px-3 py-2 rounded-xl transition-all duration-300 flex items-center space-x-1 ${
                    isListening 
                      ? 'bg-vitality-500 text-white animate-pulse' 
                      : 'bg-elegant-100 text-elegant-600 hover:bg-elegant-200'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}
              
              <button
                type="submit"
                disabled={!message.trim() || isTyping}
                className={`px-3 sm:px-4 py-2 bg-gradient-to-r ${getAgentGradient(selectedAgent.id)} text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 hover:scale-105`}
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline text-sm">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}