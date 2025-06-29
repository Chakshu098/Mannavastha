import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Ocean Breath Technique',
    description: 'Deep rhythmic breathing that mimics ocean waves to calm your nervous system',
    category: 'breathing',
    duration: 8,
    difficulty: 'beginner',
    instructions: [
      'Sit comfortably with your spine straight',
      'Close your eyes and breathe naturally for a moment',
      'Inhale slowly through your nose for 4 counts',
      'Hold your breath gently for 2 counts',
      'Exhale slowly through your mouth for 6 counts',
      'Imagine ocean waves with each breath cycle',
      'Continue for 8 minutes, focusing on the rhythm'
    ],
    benefits: ['Reduces anxiety', 'Lowers heart rate', 'Improves focus', 'Activates parasympathetic nervous system'],
    icon: '🌊',
    color: 'from-serenity-400 to-serenity-600',
    completions: 1247,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Neural Reset Meditation',
    description: 'Advanced body-mind integration technique for deep mental clarity',
    category: 'meditation',
    duration: 20,
    difficulty: 'intermediate',
    instructions: [
      'Lie down in a comfortable position',
      'Begin with 5 deep cleansing breaths',
      'Scan your body from head to toe',
      'Notice areas of tension without judgment',
      'Visualize golden light entering tense areas',
      'Allow each body part to completely relax',
      'Expand awareness to your entire being',
      'Rest in pure awareness for final 5 minutes'
    ],
    benefits: ['Deep relaxation', 'Mental clarity', 'Emotional balance', 'Stress release'],
    icon: '🧠',
    color: 'from-brand-400 to-brand-600',
    completions: 892,
    rating: 4.9
  },
  {
    id: '3',
    title: 'Gratitude Flow Journal',
    description: 'Structured journaling practice to cultivate appreciation and positive mindset',
    category: 'journaling',
    duration: 15,
    difficulty: 'beginner',
    instructions: [
      'Find a quiet space with your journal',
      'Write today\'s date and take 3 deep breaths',
      'List 5 things you\'re grateful for today',
      'For each item, write why it matters to you',
      'Describe how it made you feel',
      'Write one way you can share gratitude today',
      'End with an affirmation about abundance'
    ],
    benefits: ['Increases happiness', 'Improves relationships', 'Better sleep', 'Reduces depression'],
    icon: '📝',
    color: 'from-vitality-400 to-vitality-600',
    completions: 2156,
    rating: 4.7
  },
  {
    id: '4',
    title: 'Mindful Movement Flow',
    description: 'Gentle movement practice combining yoga and mindfulness',
    category: 'movement',
    duration: 25,
    difficulty: 'intermediate',
    instructions: [
      'Start in mountain pose, feeling grounded',
      'Raise arms overhead with deep inhale',
      'Swan dive forward with exhale',
      'Step back to downward dog',
      'Flow through cat-cow stretches',
      'Move into child\'s pose for rest',
      'Repeat sequence 5 times mindfully',
      'End in savasana for 5 minutes'
    ],
    benefits: ['Improves flexibility', 'Reduces stress', 'Increases body awareness', 'Boosts mood'],
    icon: '🤸‍♀️',
    color: 'from-serenity-400 to-brand-500',
    completions: 743,
    rating: 4.6
  },
  {
    id: '5',
    title: 'Present Moment Anchor',
    description: 'Mindfulness technique to ground yourself in the present moment',
    category: 'mindfulness',
    duration: 10,
    difficulty: 'beginner',
    instructions: [
      'Sit comfortably and close your eyes',
      'Notice 5 things you can hear right now',
      'Feel 4 physical sensations in your body',
      'Identify 3 emotions you\'re experiencing',
      'Acknowledge 2 thoughts passing through your mind',
      'Take 1 deep breath and open your eyes',
      'Carry this awareness into your day'
    ],
    benefits: ['Reduces anxiety', 'Improves focus', 'Increases awareness', 'Grounds you in reality'],
    icon: '⚓',
    color: 'from-tranquil-400 to-tranquil-600',
    completions: 1834,
    rating: 4.8
  },
  {
    id: '6',
    title: 'Healing Light Visualization',
    description: 'Powerful visualization technique for emotional healing and inner peace',
    category: 'visualization',
    duration: 18,
    difficulty: 'advanced',
    instructions: [
      'Lie down and close your eyes',
      'Imagine a warm, golden light above you',
      'See this light slowly entering your crown',
      'Feel it filling your entire head with warmth',
      'Guide the light down through your body',
      'Let it heal any areas of pain or tension',
      'Expand the light beyond your body',
      'Rest in this cocoon of healing energy'
    ],
    benefits: ['Emotional healing', 'Reduces pain', 'Increases self-love', 'Spiritual connection'],
    icon: '✨',
    color: 'from-mindful-400 to-vitality-500',
    completions: 567,
    rating: 4.9
  }
];