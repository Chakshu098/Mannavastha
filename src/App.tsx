import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { MoodLogger } from './components/MoodLogger';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { AICompanion } from './components/AICompanion';
import { VideoConsult } from './components/VideoConsult';
import { UserProfile } from './components/UserProfile';
import { LoginPage } from './components/LoginPage';
import { IntroPage } from './components/IntroPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { MoodEntry, ExerciseCompletion } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('manavastha-auth', false);
  const [showIntro, setShowIntro] = useLocalStorage('manavastha-intro-seen', true);
  
  // Data storage using localStorage
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>('manavastha-mood-entries', []);
  const [exerciseCompletions, setExerciseCompletions] = useLocalStorage<ExerciseCompletion[]>('manavastha-exercise-completions', []);

  // Close mobile menu when tab changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  const handleSaveMood = (moodData: Omit<MoodEntry, 'id' | 'user_id' | 'created_at'>) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      user_id: 'local-user',
      created_at: new Date().toISOString(),
      ...moodData
    };
    
    setMoodEntries(prev => [...prev, newEntry]);
    
    // Show success message with animation
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-brand-500 to-serenity-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-slide-down';
    notification.innerHTML = '🌸 Mood entry saved successfully! +15 wellness points';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleQuickMoodSave = (moodScore: number, energyLevel: number, stressLevel: number, notes?: string) => {
    const quickEntry: MoodEntry = {
      id: Date.now().toString(),
      user_id: 'local-user',
      date: new Date().toISOString().split('T')[0],
      mood_score: moodScore,
      energy_level: energyLevel,
      anxiety_level: Math.max(1, 11 - stressLevel), // Convert stress to anxiety (inverse)
      stress_level: stressLevel,
      sleep_quality: 7, // Default value
      notes: notes || undefined,
      tags: ['quick-checkin'],
      created_at: new Date().toISOString()
    };
    
    setMoodEntries(prev => [...prev, quickEntry]);
    
    // Show success message with animation
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-brand-500 to-serenity-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-slide-down';
    notification.innerHTML = '✨ Quick check-in saved! Dashboard updated with new insights';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleCompleteExercise = (exerciseId: string, rating: number, notes?: string) => {
    const completion: ExerciseCompletion = {
      id: Date.now().toString(),
      user_id: 'local-user',
      exercise_id: exerciseId,
      completed_at: new Date().toISOString(),
      rating,
      notes,
      duration_completed: Math.floor(Math.random() * 10) + 5 // Mock duration
    };
    
    setExerciseCompletions(prev => [...prev, completion]);
    
    // Show success message with animation
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-serenity-500 to-tranquil-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-slide-down';
    notification.innerHTML = '🎉 Great job completing the exercise! +10 wellness points';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all your wellness data? This action cannot be undone.')) {
      setMoodEntries([]);
      setExerciseCompletions([]);
      
      const notification = document.createElement('div');
      notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-vitality-500 to-mindful-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-slide-down';
      notification.innerHTML = '🗑️ All data has been cleared.';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset your wellness graphs and data? This will clear all mood entries and start fresh.')) {
      setMoodEntries([]);
      setExerciseCompletions([]);
      
      const notification = document.createElement('div');
      notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-brand-500 to-serenity-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-slide-down';
      notification.innerHTML = '🔄 Wellness data has been reset. Start your fresh journey!';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  const handleExportData = () => {
    const data = {
      moodEntries,
      exerciseCompletions,
      exportDate: new Date().toISOString(),
      platform: 'Manavastha AI Wellness Platform'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `manavastha-wellness-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-brand-500 to-serenity-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-slide-down';
    notification.innerHTML = '📥 Wellness data exported successfully!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleLogin = (email: string, password: string) => {
    // Simple mock authentication
    if (email && password) {
      setIsAuthenticated(true);
      const notification = document.createElement('div');
      notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-brand-500 to-serenity-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-slide-down';
      notification.innerHTML = '🌸 Welcome to Manavastha! Your wellness journey begins now.';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard moodEntries={moodEntries} onQuickMoodSave={handleQuickMoodSave} onResetData={handleResetData} />;
      case 'mood':
        return <MoodLogger onSaveMood={handleSaveMood} />;
      case 'exercises':
        return (
          <ExerciseLibrary 
            completedExercises={exerciseCompletions}
            onCompleteExercise={handleCompleteExercise}
            moodEntries={moodEntries}
          />
        );
      case 'chat':
        return <AICompanion />;
      case 'video':
        return <VideoConsult />;
      case 'profile':
        return (
          <UserProfile 
            onClearData={handleClearData}
            onExportData={handleExportData}
            onLogout={handleLogout}
          />
        );
      default:
        return <Dashboard moodEntries={moodEntries} onQuickMoodSave={handleQuickMoodSave} onResetData={handleResetData} />;
    }
  };

  // Show intro page first
  if (showIntro) {
    return <IntroPage onComplete={() => setShowIntro(false)} />;
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-serenity-50 to-tranquil-50">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-elite-gradient opacity-20 animate-pulse-gentle"></div>
      
      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="relative z-10">
        {/* Special handling for AI Companion tab */}
        {activeTab === 'chat' ? (
          renderActiveTab()
        ) : (
          <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {renderActiveTab()}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;