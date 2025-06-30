import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Lightbulb, AlertCircle, Sparkles, MessageSquare, Zap, Mic, MicOff, Brain, Shield, Star, Users } from 'lucide-react';
import { ChatMessage } from '../types';
import { aiAgents } from '../data/aiAgents';

interface SupportChatProps {
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export function SupportChat({ chatHistory, onSendMessage }: SupportChatProps) {
  const [selectedMode, setSelectedMode] = useState<'voiceflow' | 'local'>('voiceflow');
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(aiAgents[0]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [voiceflowLoaded, setVoiceflowLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const voiceflowContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Voiceflow
  useEffect(() => {
    if (selectedMode === 'voiceflow' && !voiceflowLoaded) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = () => {
        if (window.voiceflow && voiceflowContainerRef.current) {
          window.voiceflow.chat.load({
            verify: { projectID: '686038d5106ac2ce38522ca3' },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
            voice: {
              url: "https://runtime-api.voiceflow.com"
            },
            render: {
              mode: 'embedded',
              target: voiceflowContainerRef.current
            }
          });
          setVoiceflowLoaded(true);
        }
      };
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [selectedMode, voiceflowLoaded]);

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

  const features = [
    {
      icon: Brain,
      title: "Advanced AI",
      description: "Powered by cutting-edge conversational AI technology"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your conversations are secure and confidential"
    },
    {
      icon: Heart,
      title: "Empathetic Support",
      description: "Designed to understand and respond with care"
    },
    {
      icon: Star,
      title: "24/7 Available",
      description: "Always here when you need emotional support"
    }
  ];

  return (
    <div className="fixed inset-0 pt-16 bg-gradient-to-br from-brand-50 via-serenity-50 to-mindful-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-brand-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-serenity-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-tranquil-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Full Screen Chat Container */}
      <div className="h-full flex flex-col bg-white/95 backdrop-blur-xl shadow-2xl relative z-10">
        
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-brand-500 via-serenity-500 to-tranquil-500 p-4 sm:p-6 text-white shadow-2xl relative overflow-hidden">
          {/* Header Background Pattern */}
          <div className="absolute inset-0 bg-white/10 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-2xl animate-sparkle">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">AI Wellness Companions</h1>
                  <p className="text-white/90 text-sm sm:text-base">Advanced conversational AI for mental health support</p>
                </div>
              </div>
              
              {/* Mode Selector */}
              <div className="flex items-center space-x-2 bg-white/20 rounded-2xl p-1">
                <button
                  onClick={() => setSelectedMode('voiceflow')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedMode === 'voiceflow'
                      ? 'bg-white text-brand-600 shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Advanced AI</span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedMode('local')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedMode === 'local'
                      ? 'bg-white text-brand-600 shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Local Agents</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <div className="bg-gradient-to-r from-brand-50 to-serenity-50 border-b border-elegant-100 p-3 sm:p-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white/80 rounded-xl border border-white/40 animate-scale-in hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-brand-500 to-serenity-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-elegant-900 text-xs sm:text-sm truncate">{feature.title}</h3>
                      <p className="text-elegant-600 text-xs hidden sm:block">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          {selectedMode === 'voiceflow' ? (
            /* Voiceflow Integration */
            <div className="h-full flex flex-col">
              <div className="flex-1 relative">
                {!voiceflowLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-50 to-serenity-50">
                    <div className="text-center animate-fade-in">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-serenity-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-sparkle shadow-2xl">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-elegant-900 mb-2">Initializing Advanced AI</h3>
                      <p className="text-elegant-600 mb-4">Connecting you to our most sophisticated wellness companion...</p>
                      <div className="flex space-x-1 justify-center">
                        <div className="w-2 h-2 bg-brand-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-serenity-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-tranquil-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Voiceflow Container */}
                <div 
                  ref={voiceflowContainerRef}
                  className="h-full w-full"
                  style={{ 
                    minHeight: '100%',
                    background: 'transparent'
                  }}
                />
              </div>
              
              {/* Voiceflow Footer Info */}
              <div className="p-3 sm:p-4 bg-gradient-to-r from-brand-50 to-serenity-50 border-t border-elegant-100">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-center space-x-2 text-elegant-600">
                    <Shield className="w-4 h-4 text-brand-500" />
                    <span className="text-xs sm:text-sm">
                      Powered by advanced AI • Your conversations are private and secure
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Local AI Agents */
            <div className="h-full flex flex-col">
              {/* AI Agents Selector */}
              <div className="p-3 sm:p-4 border-b border-elegant-100 bg-elegant-50/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                  <div className="flex space-x-2 overflow-x-auto">
                    {aiAgents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent)}
                        className={`flex-shrink-0 flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 text-sm ${
                          selectedAgent.id === agent.id
                            ? `bg-gradient-to-r ${getAgentGradient(agent.id)} text-white shadow-lg scale-105`
                            : 'bg-white text-elegant-600 hover:bg-elegant-100 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <span className="text-lg sm:text-xl">{agent.avatar}</span>
                        <div className="text-left">
                          <div className="font-semibold whitespace-nowrap">{agent.name}</div>
                          <div className="text-xs opacity-90 hidden sm:block">{agent.role}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {chatHistory.length === 0 ? (
                    <div className="text-center py-8 sm:py-12 animate-fade-in">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${getAgentGradient(selectedAgent.id)} rounded-3xl flex items-center justify-center mx-auto mb-6 animate-float shadow-2xl`}>
                        <span className="text-2xl sm:text-3xl">{selectedAgent.avatar}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-elegant-900 mb-3">Meet {selectedAgent.name}</h3>
                      <p className="text-elegant-600 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                        {selectedAgent.description}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
                        {quickPrompts.map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickPrompt(prompt.text)}
                            className={`p-3 sm:p-4 bg-gradient-to-r ${prompt.color} text-white rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in group`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="text-xl sm:text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{prompt.icon}</div>
                            <p className="text-xs sm:text-sm font-medium">{prompt.text}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {chatHistory.map((chat, index) => (
                        <div key={chat.id} className="space-y-3 sm:space-y-4 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                          {/* User Message */}
                          <div className="flex justify-end">
                            <div className="flex items-end space-x-2 sm:space-x-3 max-w-xs sm:max-w-md lg:max-w-lg">
                              <div className="bg-gradient-to-r from-brand-500 to-serenity-500 text-white p-3 sm:p-4 rounded-2xl rounded-br-lg shadow-lg">
                                <p className="text-sm sm:text-base">{chat.message}</p>
                              </div>
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-elegant-400 to-elegant-600 rounded-full flex items-center justify-center shadow-lg">
                                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                            </div>
                          </div>

                          {/* AI Response */}
                          <div className="flex justify-start">
                            <div className="flex items-end space-x-2 sm:space-x-3 max-w-xs sm:max-w-md lg:max-w-2xl">
                              <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${getAgentGradient(selectedAgent.id)} rounded-full flex items-center justify-center shadow-lg`}>
                                <span className="text-sm sm:text-base">{selectedAgent.avatar}</span>
                              </div>
                              <div className="bg-white p-3 sm:p-4 rounded-2xl rounded-bl-lg shadow-lg border border-elegant-100">
                                <p className="text-sm sm:text-base text-elegant-900 leading-relaxed">{chat.response}</p>
                                <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-elegant-100">
                                  <div className="flex items-center space-x-1">
                                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-brand-500" />
                                    <span className="text-xs text-elegant-500">{selectedAgent.name}</span>
                                  </div>
                                  {chat.confidence_score && (
                                    <div className="flex items-center space-x-1">
                                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-serenity-500" />
                                      <span className="text-xs text-elegant-500">{Math.round(chat.confidence_score * 100)}% confidence</span>
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
                          <div className="flex items-end space-x-2 sm:space-x-3">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${getAgentGradient(selectedAgent.id)} rounded-full flex items-center justify-center shadow-lg`}>
                              <span className="text-sm sm:text-base">{selectedAgent.avatar}</span>
                            </div>
                            <div className="bg-white p-3 sm:p-4 rounded-2xl rounded-bl-lg shadow-lg border border-elegant-100">
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

              {/* Quick Actions for Local Mode */}
              {chatHistory.length > 0 && (
                <div className="px-3 sm:px-4 py-2 border-t border-elegant-100 bg-elegant-50/80 backdrop-blur-sm">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex space-x-2 overflow-x-auto">
                      {quickPrompts.slice(3).map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickPrompt(prompt.text)}
                          className="flex-shrink-0 px-3 py-2 text-xs bg-white hover:bg-elegant-100 rounded-lg transition-all duration-300 border border-elegant-200 flex items-center space-x-2 hover:scale-105 shadow-sm"
                        >
                          <span className="text-sm">{prompt.icon}</span>
                          <span className="whitespace-nowrap">{prompt.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Message Input for Local Mode */}
              <div className="p-3 sm:p-4 border-t border-elegant-100 bg-white/95 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-3 p-3 bg-gradient-to-r from-serenity-50 to-mindful-50 border border-serenity-200 rounded-xl flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-serenity-600 flex-shrink-0" />
                    <p className="text-xs text-serenity-700">
                      AI assistant for support. For crises, contact emergency services.
                    </p>
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="flex space-x-2 sm:space-x-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Chat with ${selectedAgent.name}...`}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-elegant-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white/90 backdrop-blur-sm text-sm sm:text-base"
                      disabled={isTyping}
                    />
                    
                    {/* Mic Button */}
                    {recognition && (
                      <button
                        type="button"
                        onClick={isListening ? stopListening : startListening}
                        className={`px-3 py-2 sm:py-3 rounded-xl transition-all duration-300 flex items-center space-x-1 ${
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
                      className={`px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${getAgentGradient(selectedAgent.id)} text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 hover:scale-105`}
                    >
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline text-sm">Send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}