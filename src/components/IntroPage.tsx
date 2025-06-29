import React, { useState } from 'react';
import { Heart, Brain, Shield, ArrowRight, Star, Users, Award } from 'lucide-react';

interface IntroPageProps {
  onComplete: () => void;
}

export function IntroPage({ onComplete }: IntroPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to Manavastha",
      subtitle: "Apke Mann Ka Sathi - Your Mental Wellness Companion",
      description: "Embark on a personalized journey to better mental health with our advanced AI technology and evidence-based wellness practices.",
      icon: () => (
        <img 
          src="/Untitled design (13).png" 
          alt="Manavastha Logo" 
          className="w-16 h-16 object-contain"
        />
      ),
      gradient: "from-brand-500 to-serenity-500",
      features: [
        "AI-powered mood analysis",
        "Personalized wellness insights",
        "24/7 emotional support"
      ]
    },
    {
      title: "Track Your Wellness Journey",
      subtitle: "Comprehensive Mood & Mental Health Monitoring",
      description: "Log your daily moods, energy levels, and emotions with our intuitive tracking system. Get real-time insights and personalized recommendations.",
      icon: Heart,
      gradient: "from-serenity-500 to-tranquil-500",
      features: [
        "Daily mood tracking",
        "Wellness analytics",
        "Progress visualization"
      ]
    },
    {
      title: "AI Wellness Companions",
      subtitle: "Expert Support When You Need It",
      description: "Connect with specialized AI therapists, coaches, and companions trained to provide professional mental health support and guidance.",
      icon: Brain,
      gradient: "from-tranquil-500 to-brand-500",
      features: [
        "5 specialized AI agents",
        "Crisis support available",
        "Evidence-based responses"
      ]
    },
    {
      title: "Your Privacy Matters",
      subtitle: "Secure & Confidential Wellness Platform",
      description: "All your data is encrypted and stored securely. We never share your personal mental health information with third parties.",
      icon: Shield,
      gradient: "from-brand-500 to-vitality-500",
      features: [
        "End-to-end encryption",
        "Local data storage",
        "HIPAA-compliant security"
      ]
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-serenity-50 to-tranquil-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-elite-gradient opacity-30 animate-pulse-gentle"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-brand-500 w-8'
                      : index < currentSlide
                      ? 'bg-brand-300'
                      : 'bg-elegant-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            {/* Icon */}
            <div className={`w-20 h-20 bg-gradient-to-br ${currentSlideData.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 animate-float shadow-xl`}>
              {currentSlide === 0 ? (
                <IconComponent />
              ) : (
                <IconComponent className="w-10 h-10 text-white" />
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-brand-600 to-serenity-600 bg-clip-text text-transparent mb-3">
              {currentSlideData.title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl font-semibold text-elegant-700 mb-4">
              {currentSlideData.subtitle}
            </h2>

            {/* Description */}
            <p className="text-elegant-600 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              {currentSlideData.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {currentSlideData.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-brand-50 to-serenity-50 rounded-xl border border-brand-100 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-4 h-4 text-brand-500" />
                    <span className="text-elegant-700 font-medium text-sm">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentSlide === 0
                  ? 'text-elegant-400 cursor-not-allowed'
                  : 'text-elegant-600 hover:bg-elegant-100'
              }`}
            >
              Previous
            </button>

            <div className="flex items-center space-x-2 text-elegant-500">
              <span>{currentSlide + 1}</span>
              <span>of</span>
              <span>{slides.length}</span>
            </div>

            <button
              onClick={nextSlide}
              className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${currentSlideData.gradient} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Skip Option */}
          <div className="text-center mt-6">
            <button
              onClick={onComplete}
              className="text-elegant-500 hover:text-elegant-700 text-sm font-medium transition-colors"
            >
              Skip Introduction
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-brand-400 rounded-full opacity-60 animate-float"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-serenity-400 rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 -left-8 w-4 h-4 bg-tranquil-400 rounded-full opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}