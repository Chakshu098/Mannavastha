import React, { useRef, useEffect, useState } from 'react';
import { Brain, Shield, Star, Heart, Sparkles, Zap, MessageCircle, Users, Award, Clock } from 'lucide-react';

interface SupportChatProps {
  chatHistory: any[];
  onSendMessage: (message: string) => void;
}

export function SupportChat({ chatHistory, onSendMessage }: SupportChatProps) {
  const [voiceflowLoaded, setVoiceflowLoaded] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const voiceflowContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Voiceflow
  useEffect(() => {
    if (!voiceflowLoaded) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = () => {
        if (window.voiceflow && voiceflowContainerRef.current) {
          setTimeout(() => {
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
            setTimeout(() => setIsInitializing(false), 2000);
          }, 500);
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
  }, [voiceflowLoaded]);

  const features = [
    {
      icon: Brain,
      title: "Advanced AI",
      description: "Powered by cutting-edge conversational AI technology",
      color: "from-brand-500 to-serenity-500"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your conversations are secure and confidential",
      color: "from-serenity-500 to-tranquil-500"
    },
    {
      icon: Heart,
      title: "Empathetic Support",
      description: "Designed to understand and respond with care",
      color: "from-tranquil-500 to-brand-500"
    },
    {
      icon: Star,
      title: "24/7 Available",
      description: "Always here when you need emotional support",
      color: "from-brand-500 to-vitality-500"
    },
    {
      icon: MessageCircle,
      title: "Natural Conversations",
      description: "Engage in meaningful, human-like dialogue",
      color: "from-vitality-500 to-mindful-500"
    },
    {
      icon: Award,
      title: "Expert Knowledge",
      description: "Trained on evidence-based mental health practices",
      color: "from-mindful-500 to-serenity-500"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Conversations", value: "1M+", icon: MessageCircle },
    { label: "Avg Response", value: "<2s", icon: Clock },
    { label: "Satisfaction", value: "98%", icon: Star }
  ];

  return (
    <div className="fixed inset-0 pt-16 bg-gradient-to-br from-brand-50 via-serenity-50 to-mindful-50">
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
        
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-brand-500 via-serenity-500 to-tranquil-500 p-4 sm:p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden">
          {/* Header Background Pattern */}
          <div className="absolute inset-0 bg-white/10 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 2px, transparent 2px)`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 rounded-3xl flex items-center justify-center shadow-2xl animate-sparkle backdrop-blur-sm">
                  <Brain className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">AI Wellness Companion</h1>
                  <p className="text-white/90 text-sm sm:text-base lg:text-lg">Advanced conversational AI for personalized mental health support</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white/90 text-sm font-medium">Online & Ready</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-white/80" />
                      <span className="text-white/90 text-sm font-medium">Powered by Advanced AI</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 lg:p-4 text-center animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white mx-auto mb-1" />
                      <div className="text-lg lg:text-xl font-bold">{stat.value}</div>
                      <div className="text-xs lg:text-sm text-white/80">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Voiceflow Container */}
        <div className="flex-1 relative overflow-hidden">
          {/* Loading State */}
          {isInitializing && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-50 to-serenity-50 z-10">
              <div className="text-center animate-fade-in max-w-md mx-auto p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-serenity-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-sparkle shadow-2xl">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-elegant-900 mb-3">Initializing Your AI Companion</h3>
                <p className="text-elegant-600 mb-6 leading-relaxed">
                  Connecting you to our most sophisticated wellness AI. This advanced system is trained on evidence-based mental health practices and designed to provide personalized support.
                </p>
                
                {/* Loading Animation */}
                <div className="flex space-x-2 justify-center mb-6">
                  <div className="w-3 h-3 bg-brand-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-serenity-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-tranquil-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>

                {/* Loading Steps */}
                <div className="space-y-2 text-sm text-elegant-600">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Loading AI models...</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Establishing secure connection...</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-elegant-300 rounded-full"></div>
                    <span>Personalizing experience...</span>
                  </div>
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
        
        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-brand-50 via-serenity-50 to-tranquil-50 border-t border-elegant-100 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-serenity-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-elegant-900">Privacy & Security</p>
                  <p className="text-xs text-elegant-600">Your conversations are encrypted and confidential</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-xs text-elegant-600">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-brand-500" />
                  <span>Powered by Advanced AI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-serenity-500" />
                  <span>Mental Health Focused</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-vitality-500" />
                  <span>Evidence-Based</span>
                </div>
              </div>
            </div>
            
            {/* Crisis Support Notice */}
            <div className="mt-4 p-3 bg-gradient-to-r from-vitality-50 to-mindful-50 border border-vitality-200 rounded-xl">
              <div className="flex items-center space-x-2 text-vitality-700">
                <Heart className="w-4 h-4 flex-shrink-0" />
                <p className="text-xs">
                  <strong>Crisis Support:</strong> If you're experiencing a mental health emergency, please contact your local emergency services (911) or the National Suicide Prevention Lifeline (988) immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}