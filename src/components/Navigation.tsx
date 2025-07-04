import React from 'react';
import { Home, TrendingUp, Brain, MessageCircle, User, Menu, X, Video } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Navigation({ activeTab, onTabChange, isMobileMenuOpen, setIsMobileMenuOpen }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Wellness Hub', icon: Home, gradient: 'from-brand-500 to-serenity-500' },
    { id: 'mood', label: 'Mood Tracker', icon: TrendingUp, gradient: 'from-serenity-500 to-tranquil-500' },
    { id: 'exercises', label: 'Wellness Studio', icon: Brain, gradient: 'from-tranquil-500 to-brand-500' },
    { id: 'chat', label: 'AI Companion', icon: MessageCircle, gradient: 'from-brand-500 to-vitality-500' },
    { id: 'video', label: 'Video Consult', icon: Video, gradient: 'from-vitality-500 to-mindful-500' },
    { id: 'profile', label: 'My Journey', icon: User, gradient: 'from-serenity-500 to-brand-500' },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
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
                <p className="text-xs text-elegant-500 font-medium hidden sm:block">Apke Mann Ka Sathi</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === item.id
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : 'text-elegant-600 hover:bg-elegant-100 hover:text-elegant-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gradient-to-br from-brand-500 to-serenity-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-elegant-100">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeTab === item.id
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : 'text-elegant-600 hover:bg-elegant-50 hover:text-elegant-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}