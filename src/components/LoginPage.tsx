import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Heart, Brain, Shield, Users } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  const features = [
    {
      icon: Heart,
      title: "Mood Tracking",
      description: "Track your daily emotions and mental wellness with AI-powered insights"
    },
    {
      icon: Brain,
      title: "AI Companions",
      description: "Get support from specialized AI therapists and wellness coaches"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and secure. We never share your personal information"
    },
    {
      icon: Users,
      title: "Expert Care",
      description: "Connect with licensed mental health professionals via video consultations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-serenity-50 to-tranquil-50 flex">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-elite-gradient opacity-30 animate-pulse-gentle"></div>
      
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 p-12 flex-col justify-center">
        <div className="max-w-lg">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
              <img 
                src="/Untitled design (13).png" 
                alt="Manavastha Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-serenity-600 bg-clip-text text-transparent">
                Manavastha
              </h1>
              <p className="text-elegant-600 text-sm">Apke Mann Ka Sathi</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-elegant-900 mb-4">
            Your Mental Wellness Journey Starts Here
          </h2>
          <p className="text-elegant-600 text-lg mb-8 leading-relaxed">
            Join thousands of users who have transformed their mental health with our AI-powered wellness platform.
          </p>

          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-serenity-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-elegant-900 mb-1">{feature.title}</h3>
                    <p className="text-elegant-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg">
                <img 
                  src="/Untitled design (13).png" 
                  alt="Manavastha Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-brand-600 to-serenity-600 bg-clip-text text-transparent">
                  Manavastha
                </h1>
                <p className="text-elegant-600 text-sm">Apke Mann Ka Sathi</p>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-elegant-900 mb-2">
                {isSignUp ? 'Create Your Account' : 'Welcome Back'}
              </h2>
              <p className="text-elegant-600">
                {isSignUp 
                  ? 'Start your wellness journey today' 
                  : 'Sign in to continue your wellness journey'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-elegant-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 pl-4 pr-4 border border-elegant-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white/90 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your full name"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-elegant-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elegant-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-10 pr-4 border border-elegant-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white/90 backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-elegant-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elegant-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-10 pr-12 border border-elegant-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white/90 backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-elegant-400 hover:text-elegant-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-brand-600 bg-elegant-100 border-elegant-300 rounded focus:ring-brand-500"
                    />
                    <span className="ml-2 text-sm text-elegant-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-500 to-serenity-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-elegant-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-1 text-brand-600 hover:text-brand-700 font-medium"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-elegant-200">
              <p className="text-xs text-elegant-500 text-center">
                By continuing, you agree to our Terms of Service and Privacy Policy. 
                Your mental health data is encrypted and secure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-6 h-6 bg-brand-400 rounded-full opacity-60 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-8 h-8 bg-serenity-400 rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-10 w-4 h-4 bg-tranquil-400 rounded-full opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}