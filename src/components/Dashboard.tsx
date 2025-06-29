import React, { useState } from 'react';
import { TrendingUp, Activity, Heart, Zap, AlertTriangle, CheckCircle, Brain, Target, Award, Calendar, Plus, Save, User, MapPin, Thermometer, Music, BookOpen, Headphones, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import { MoodEntry } from '../types';
import { MoodAnalyzer } from '../utils/moodAnalyzer';
import { format, subDays, parseISO } from 'date-fns';

interface DashboardProps {
  moodEntries: MoodEntry[];
  onQuickMoodSave: (moodScore: number, energyLevel: number, stressLevel: number, notes?: string) => void;
  onResetData: () => void;
}

export function Dashboard({ moodEntries, onQuickMoodSave, onResetData }: DashboardProps) {
  const [showQuickEntry, setShowQuickEntry] = useState(false);
  const [quickMood, setQuickMood] = useState(5);
  const [quickEnergy, setQuickEnergy] = useState(5);
  const [quickStress, setQuickStress] = useState(5);
  const [quickNotes, setQuickNotes] = useState('');

  const recentEntries = moodEntries.slice(-14);
  const insights = MoodAnalyzer.generateInsights(moodEntries);
  const trend = MoodAnalyzer.analyzeTrend(moodEntries);
  const triggers = MoodAnalyzer.identifyTriggers(moodEntries);
  const riskLevel = MoodAnalyzer.predictRisk(moodEntries);

  const chartData = recentEntries.map(entry => ({
    date: format(parseISO(entry.date), 'MMM dd'),
    mood: entry.mood_score,
    energy: entry.energy_level,
    anxiety: 10 - entry.anxiety_level,
    stress: 10 - entry.stress_level,
    sleep: entry.sleep_quality || 7,
  }));

  const radarData = [
    { subject: 'Mood', A: recentEntries.length > 0 ? recentEntries.reduce((sum, entry) => sum + entry.mood_score, 0) / recentEntries.length : 0 },
    { subject: 'Energy', A: recentEntries.length > 0 ? recentEntries.reduce((sum, entry) => sum + entry.energy_level, 0) / recentEntries.length : 0 },
    { subject: 'Sleep', A: recentEntries.length > 0 ? recentEntries.reduce((sum, entry) => sum + (entry.sleep_quality || 7), 0) / recentEntries.length : 0 },
    { subject: 'Calm', A: recentEntries.length > 0 ? 10 - (recentEntries.reduce((sum, entry) => sum + entry.anxiety_level, 0) / recentEntries.length) : 0 },
    { subject: 'Peace', A: recentEntries.length > 0 ? 10 - (recentEntries.reduce((sum, entry) => sum + entry.stress_level, 0) / recentEntries.length) : 0 },
  ];

  // Enhanced mood distribution with dates
  const moodDistributionData = recentEntries.map(entry => ({
    date: format(parseISO(entry.date), 'MMM dd'),
    mood: entry.mood_score,
    category: entry.mood_score >= 8 ? 'Excellent' : entry.mood_score >= 6 ? 'Good' : 'Challenging'
  }));

  const pieData = [
    { 
      name: 'Excellent Days', 
      value: recentEntries.filter(e => e.mood_score >= 8).length, 
      color: '#ec4899',
      dates: recentEntries.filter(e => e.mood_score >= 8).map(e => format(parseISO(e.date), 'MMM dd'))
    },
    { 
      name: 'Good Days', 
      value: recentEntries.filter(e => e.mood_score >= 6 && e.mood_score < 8).length, 
      color: '#f472b6',
      dates: recentEntries.filter(e => e.mood_score >= 6 && e.mood_score < 8).map(e => format(parseISO(e.date), 'MMM dd'))
    },
    { 
      name: 'Challenging Days', 
      value: recentEntries.filter(e => e.mood_score < 6).length, 
      color: '#fca5a5',
      dates: recentEntries.filter(e => e.mood_score < 6).map(e => format(parseISO(e.date), 'MMM dd'))
    },
  ];

  const avgMood = recentEntries.length > 0 
    ? recentEntries.reduce((sum, entry) => sum + entry.mood_score, 0) / recentEntries.length 
    : 0;

  const avgEnergy = recentEntries.length > 0 
    ? recentEntries.reduce((sum, entry) => sum + entry.energy_level, 0) / recentEntries.length 
    : 0;

  const avgSleep = recentEntries.length > 0 
    ? recentEntries.reduce((sum, entry) => sum + (entry.sleep_quality || 7), 0) / recentEntries.length 
    : 0;

  const streak = 7; // Mock streak data

  const getTrendIcon = () => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-6 h-6 text-brand-500" />;
      case 'declining': return <TrendingUp className="w-6 h-6 text-vitality-500 transform rotate-180" />;
      default: return <Activity className="w-6 h-6 text-serenity-500" />;
    }
  };

  // Enhanced risk assessment based on mood data
  const getGraphBasedRiskLevel = () => {
    if (recentEntries.length === 0) {
      return { level: 'Low Risk', description: 'Start tracking your mood to get personalized risk assessment.', icon: '📊', progress: 10, color: 'from-brand-500 to-brand-600' };
    }

    const avgMoodScore = recentEntries.reduce((sum, entry) => sum + entry.mood_score, 0) / recentEntries.length;
    const avgAnxiety = recentEntries.reduce((sum, entry) => sum + entry.anxiety_level, 0) / recentEntries.length;
    const avgStress = recentEntries.reduce((sum, entry) => sum + entry.stress_level, 0) / recentEntries.length;
    
    const lowMoodDays = recentEntries.filter(entry => entry.mood_score <= 4).length;
    const highAnxietyDays = recentEntries.filter(entry => entry.anxiety_level >= 7).length;
    const highStressDays = recentEntries.filter(entry => entry.stress_level >= 7).length;

    // Calculate risk score based on multiple factors
    let riskScore = 0;
    
    // Mood factor (40% weight)
    if (avgMoodScore <= 3) riskScore += 40;
    else if (avgMoodScore <= 5) riskScore += 25;
    else if (avgMoodScore <= 7) riskScore += 10;
    
    // Anxiety factor (30% weight)
    if (avgAnxiety >= 8) riskScore += 30;
    else if (avgAnxiety >= 6) riskScore += 20;
    else if (avgAnxiety >= 4) riskScore += 10;
    
    // Stress factor (20% weight)
    if (avgStress >= 8) riskScore += 20;
    else if (avgStress >= 6) riskScore += 15;
    else if (avgStress >= 4) riskScore += 8;
    
    // Frequency factor (10% weight)
    if (lowMoodDays >= 5) riskScore += 10;
    else if (lowMoodDays >= 3) riskScore += 7;
    else if (lowMoodDays >= 1) riskScore += 3;

    if (riskScore >= 60) {
      return { 
        level: 'High Risk', 
        description: 'Your mood patterns suggest you may benefit from professional mental health support. Consider reaching out to a therapist or counselor.', 
        icon: '🚨', 
        progress: Math.min(95, riskScore), 
        color: 'from-vitality-500 to-vitality-600',
        recommendation: 'Seek professional help, practice daily self-care, and consider crisis support if needed.'
      };
    } else if (riskScore >= 30) {
      return { 
        level: 'Moderate Risk', 
        description: 'Your wellness data shows some areas of concern. Focus on stress management, regular exercise, and maintaining social connections.', 
        icon: '⚠️', 
        progress: Math.min(70, riskScore), 
        color: 'from-mindful-500 to-mindful-600',
        recommendation: 'Increase self-care activities, practice mindfulness, and monitor your mood trends closely.'
      };
    } else {
      return { 
        level: 'Low Risk', 
        description: 'Your mental wellness indicators are positive! Keep maintaining your current healthy habits and continue monitoring your wellbeing.', 
        icon: '✅', 
        progress: Math.max(15, riskScore), 
        color: 'from-brand-500 to-brand-600',
        recommendation: 'Continue your current wellness practices and celebrate your positive mental health journey!'
      };
    }
  };

  const riskAssessment = getGraphBasedRiskLevel();

  const handleQuickSave = () => {
    onQuickMoodSave(quickMood, quickEnergy, quickStress, quickNotes.trim() || undefined);
    setShowQuickEntry(false);
    setQuickNotes('');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-serenity-500 to-tranquil-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 sm:mb-6">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Welcome back to your wellness journey! 🌸</h2>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg">
                {moodEntries.length > 0 
                  ? "Here's your personalized wellness insights and AI-powered recommendations."
                  : "Start your mental wellness journey by logging your first mood entry."}
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-white/20 rounded-full flex items-center justify-center animate-sparkle">
                <Brain className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-white" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {streak > 0 && (
              <div className="flex items-center space-x-2 bg-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 w-fit">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-serenity-300" />
                <span className="font-semibold text-sm sm:text-base">{streak} day wellness streak!</span>
              </div>
            )}
            
            <div className="flex space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowQuickEntry(true)}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 transition-all duration-300 w-fit hover:scale-105"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-sm sm:text-base">Quick Check-in</span>
              </button>
              
              <button
                onClick={onResetData}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 transition-all duration-300 w-fit hover:scale-105"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-sm sm:text-base hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Entry Modal */}
      {showQuickEntry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-elegant-900">Quick Wellness Check-in</h3>
              <button
                onClick={() => setShowQuickEntry(false)}
                className="text-elegant-400 hover:text-elegant-600 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-elegant-700 mb-2">
                  How's your mood? {quickMood}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={quickMood}
                  onChange={(e) => setQuickMood(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-vitality-400 via-brand-400 to-serenity-400 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-elegant-700 mb-2">
                  Energy level? {quickEnergy}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={quickEnergy}
                  onChange={(e) => setQuickEnergy(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-tranquil-400 via-serenity-400 to-brand-400 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-elegant-700 mb-2">
                  Stress level? {quickStress}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={quickStress}
                  onChange={(e) => setQuickStress(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-serenity-400 via-mindful-400 to-vitality-400 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-elegant-700 mb-2">
                  Quick note (optional)
                </label>
                <textarea
                  value={quickNotes}
                  onChange={(e) => setQuickNotes(e.target.value)}
                  placeholder="How are you feeling today?"
                  rows={3}
                  className="w-full px-3 py-2 border border-elegant-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleQuickSave}
                  className="flex-1 bg-gradient-to-r from-brand-500 to-serenity-500 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Earn Points</span>
                </button>
                <button
                  onClick={() => setShowQuickEntry(false)}
                  className="px-4 sm:px-6 py-3 border border-elegant-300 text-elegant-700 rounded-xl hover:bg-elegant-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <p className="text-xs sm:text-sm text-elegant-600 mb-1 font-medium">Mood Score</p>
              <p className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-brand-600 to-serenity-600 bg-clip-text text-transparent">
                {avgMood.toFixed(1)}/10
              </p>
            </div>
            <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-brand-500 to-serenity-500 rounded-xl sm:rounded-2xl shadow-lg">
              <Heart className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
            </div>
          </div>
          <div className="w-full bg-elegant-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-brand-500 to-serenity-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(avgMood / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <p className="text-xs sm:text-sm text-elegant-600 mb-1 font-medium">Energy Level</p>
              <p className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-serenity-600 to-tranquil-600 bg-clip-text text-transparent">
                {avgEnergy.toFixed(1)}/10
              </p>
            </div>
            <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-serenity-500 to-tranquil-500 rounded-xl sm:rounded-2xl shadow-lg">
              <Zap className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
            </div>
          </div>
          <div className="w-full bg-elegant-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-serenity-500 to-tranquil-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(avgEnergy / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <p className="text-xs sm:text-sm text-elegant-600 mb-1 font-medium">Sleep Quality</p>
              <p className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-tranquil-600 to-brand-600 bg-clip-text text-transparent">
                {avgSleep.toFixed(1)}/10
              </p>
            </div>
            <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-tranquil-500 to-brand-500 rounded-xl sm:rounded-2xl shadow-lg">
              <Activity className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
            </div>
          </div>
          <div className="w-full bg-elegant-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-tranquil-500 to-brand-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(avgSleep / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <p className="text-xs sm:text-sm text-elegant-600 mb-1 font-medium">Wellness Trend</p>
              <p className="text-sm sm:text-xl lg:text-2xl font-bold text-elegant-900 capitalize">{trend}</p>
            </div>
            <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-elegant-500 to-elegant-600 rounded-xl sm:rounded-2xl shadow-lg">
              {getTrendIcon()}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${trend === 'improving' ? 'bg-brand-500' : trend === 'declining' ? 'bg-vitality-500' : 'bg-serenity-500'}`}></div>
            <span className="text-xs sm:text-sm text-elegant-600 font-medium">
              {trend === 'improving' ? 'Keep it up!' : trend === 'declining' ? 'Focus on self-care' : 'Maintaining balance'}
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {chartData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Mood Trend Chart */}
          <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-elegant-900">14-Day Wellness Journey</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-brand-500 rounded-full"></div>
                <span className="text-xs sm:text-sm text-elegant-600">Mood</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" fontSize={10} />
                <YAxis domain={[0, 10]} stroke="#666" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#ec4899" 
                  strokeWidth={3}
                  fill="url(#moodGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Wellness Radar */}
          <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-elegant-900 mb-4 sm:mb-6">Wellness Balance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#666' }} />
                <PolarRadiusAxis domain={[0, 10]} tick={false} />
                <Radar
                  name="Wellness"
                  dataKey="A"
                  stroke="#ec4899"
                  fill="#ec4899"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Insights and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* AI Insights */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20">
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-brand-500 to-serenity-500 rounded-xl sm:rounded-2xl">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-elegant-900">AI-Powered Insights</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {insights.length > 0 ? (
              insights.map((insight, index) => (
                <div key={index} className="p-3 sm:p-4 bg-gradient-to-r from-brand-50 to-serenity-50 rounded-xl border-l-4 border-brand-500 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                    <p className="text-elegant-700 font-medium text-sm sm:text-base">{insight}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 sm:py-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-500 to-serenity-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <p className="text-elegant-500 text-sm sm:text-base">Start logging your mood to receive personalized AI insights.</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Mood Distribution with Dates */}
        <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-elegant-900 mb-4 sm:mb-6">Mood Distribution</h3>
          {pieData.some(d => d.value > 0) ? (
            <>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-2 sm:space-y-3 mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs sm:text-sm text-elegant-600">{item.name}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-elegant-900">{item.value}</span>
                    </div>
                    {item.dates.length > 0 && (
                      <div className="ml-4 sm:ml-5 flex flex-wrap gap-1">
                        {item.dates.map((date, dateIndex) => (
                          <span key={dateIndex} className="text-xs bg-elegant-100 text-elegant-600 px-2 py-1 rounded-full">
                            {date}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-elegant-400 mx-auto mb-2" />
              <p className="text-elegant-500 text-xs sm:text-sm">No mood data yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Graph-Based Risk Assessment */}
      <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20">
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-tranquil-500 to-serenity-500 rounded-xl sm:rounded-2xl">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-elegant-900">Graph-Based Wellness Assessment</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div>
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r ${riskAssessment.color} text-white mb-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/90 mb-1 text-sm sm:text-base">Current Risk Level</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold">{riskAssessment.level}</span>
                    <span className="text-lg sm:text-xl">{riskAssessment.icon}</span>
                  </div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <p className="text-white/90 text-xs sm:text-sm mt-3">
                {riskAssessment.description}
              </p>
              
              {/* Risk Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${riskAssessment.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Risk Level Indicators */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${riskAssessment.level === 'Low Risk' ? 'bg-brand-500' : 'bg-elegant-200'}`}></div>
                <span className={`text-xs sm:text-sm font-medium ${riskAssessment.level === 'Low Risk' ? 'text-brand-600' : 'text-elegant-500'}`}>
                  Low Risk - Optimal wellness (0-29 points)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${riskAssessment.level === 'Moderate Risk' ? 'bg-mindful-500' : 'bg-elegant-200'}`}></div>
                <span className={`text-xs sm:text-sm font-medium ${riskAssessment.level === 'Moderate Risk' ? 'text-mindful-600' : 'text-elegant-500'}`}>
                  Moderate Risk - Needs attention (30-59 points)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${riskAssessment.level === 'High Risk' ? 'bg-vitality-500' : 'bg-elegant-200'}`}></div>
                <span className={`text-xs sm:text-sm font-medium ${riskAssessment.level === 'High Risk' ? 'text-vitality-600' : 'text-elegant-500'}`}>
                  High Risk - Seek support (60+ points)
                </span>
              </div>
            </div>
          </div>

          <div>
            {riskAssessment.recommendation && (
              <div className="mb-4">
                <h4 className="font-semibold text-elegant-900 mb-3 sm:mb-4 text-sm sm:text-base">Personalized Recommendations</h4>
                <div className="p-3 sm:p-4 bg-gradient-to-r from-brand-50 to-serenity-50 rounded-xl border border-brand-200">
                  <p className="text-elegant-700 text-sm">{riskAssessment.recommendation}</p>
                </div>
              </div>
            )}
            
            {triggers.length > 0 && (
              <div>
                <h4 className="font-semibold text-elegant-900 mb-3 sm:mb-4 text-sm sm:text-base">Identified Stress Triggers</h4>
                <div className="flex flex-wrap gap-2">
                  {triggers.map((trigger, index) => (
                    <span 
                      key={index}
                      className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-vitality-100 to-vitality-200 text-vitality-700 rounded-full text-xs sm:text-sm font-medium animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}