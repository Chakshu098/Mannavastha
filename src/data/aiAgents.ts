import { AIAgent } from '../types';

export const aiAgents: AIAgent[] = [
  {
    id: 'dr-maya',
    name: 'Dr. Maya',
    role: 'Clinical Therapist',
    specialty: ['CBT', 'Anxiety', 'Depression', 'Trauma'],
    avatar: '👩‍⚕️',
    description: 'Specialized in cognitive behavioral therapy and evidence-based treatments',
    personality: 'Empathetic, professional, and solution-focused',
    active: true
  },
  {
    id: 'coach-alex',
    name: 'Coach Alex',
    role: 'Wellness Coach',
    specialty: ['Motivation', 'Goal Setting', 'Habit Formation', 'Stress Management'],
    avatar: '🏃‍♂️',
    description: 'Helps you build sustainable wellness habits and achieve your mental health goals',
    personality: 'Encouraging, energetic, and goal-oriented',
    active: true
  },
  {
    id: 'sage-luna',
    name: 'Sage Luna',
    role: 'Mindfulness Guide',
    specialty: ['Meditation', 'Mindfulness', 'Spiritual Wellness', 'Inner Peace'],
    avatar: '🧘‍♀️',
    description: 'Guides you through meditation and mindfulness practices for inner peace',
    personality: 'Calm, wise, and spiritually grounded',
    active: true
  },
  {
    id: 'buddy-sam',
    name: 'Buddy Sam',
    role: 'Emotional Companion',
    specialty: ['Daily Support', 'Emotional Regulation', 'Social Connection', 'Loneliness'],
    avatar: '🤗',
    description: 'Your friendly companion for daily emotional support and encouragement',
    personality: 'Warm, friendly, and always available',
    active: true
  },
  {
    id: 'guardian-phoenix',
    name: 'Guardian Phoenix',
    role: 'Crisis Support',
    specialty: ['Crisis Intervention', 'Safety Planning', 'Emergency Support', 'Risk Assessment'],
    avatar: '🛡️',
    description: 'Specialized in crisis support and connecting you with emergency resources',
    personality: 'Protective, immediate, and resource-focused',
    active: true
  }
];