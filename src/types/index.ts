export interface MoodEntry {
  id: string;
  user_id: string;
  date: string;
  mood_score: number; // 1-10 scale
  energy_level: number; // 1-10 scale
  anxiety_level: number; // 1-10 scale
  stress_level: number; // 1-10 scale
  sleep_quality: number; // 1-10 scale
  notes?: string;
  tags: string[];
  created_at: string;
  weather?: string;
  location?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  category: 'breathing' | 'meditation' | 'journaling' | 'movement' | 'mindfulness' | 'visualization';
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[];
  benefits: string[];
  icon: string;
  color: string;
  completions: number;
  rating: number;
}

export interface ExerciseCompletion {
  id: string;
  user_id: string;
  exercise_id: string;
  completed_at: string;
  rating: number; // 1-5 stars
  notes?: string;
  duration_completed: number;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  response: string;
  created_at: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  agent_type: 'therapist' | 'coach' | 'companion' | 'crisis';
  confidence_score?: number;
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  specialty: string[];
  avatar: string;
  description: string;
  personality: string;
  active: boolean;
}

export interface UserInsights {
  mood_trend: 'improving' | 'stable' | 'declining';
  stress_triggers: string[];
  recommended_exercises: string[];
  risk_level: 'low' | 'medium' | 'high';
  weekly_summary: {
    avg_mood: number;
    avg_energy: number;
    avg_anxiety: number;
    avg_stress: number;
    avg_sleep: number;
    total_exercises: number;
    streak_days: number;
  };
  predictions: {
    next_mood_dip: string;
    recommended_interventions: string[];
    optimal_exercise_times: string[];
  };
}

export interface WellnessGoal {
  id: string;
  title: string;
  description: string;
  target_value: number;
  current_value: number;
  unit: string;
  category: 'mood' | 'exercise' | 'sleep' | 'mindfulness';
  deadline: string;
  created_at: string;
}

// Add speech recognition types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}