interface ResponseCategory {
  keywords: string[];
  responses: string[];
  agent_type: 'therapist' | 'coach' | 'companion' | 'crisis';
}

const responseCategories: ResponseCategory[] = [
  {
    keywords: ['anxious', 'anxiety', 'worried', 'nervous', 'panic', 'scared'],
    agent_type: 'therapist',
    responses: [
      "I understand you're experiencing anxiety right now. Let's work through this together. Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8. This activates your parasympathetic nervous system and can help calm your mind.",
      "Anxiety can feel overwhelming, but remember that these feelings are temporary and manageable. Let's ground yourself using the 5-4-3-2-1 technique: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
      "When anxiety strikes, it's your mind's way of trying to protect you, but sometimes it can be overactive. Try some gentle movement, step outside for fresh air, or practice progressive muscle relaxation. You have the strength to work through this.",
      "I hear that you're feeling anxious. This is a common experience, and there are evidence-based techniques that can help. Consider trying mindfulness meditation or cognitive restructuring to challenge anxious thoughts. Would you like me to guide you through a specific technique?"
    ]
  },
  {
    keywords: ['sad', 'depressed', 'down', 'low', 'hopeless', 'empty', 'worthless'],
    agent_type: 'therapist',
    responses: [
      "I hear that you're going through a difficult time, and I want you to know that your feelings are completely valid. Depression can make everything feel harder, but you're not alone in this. Have you been able to maintain any daily routines or connect with supportive people?",
      "Feeling low can make it seem like nothing will improve, but depression often distorts our thinking. Small acts of self-care can help - perhaps a warm shower, listening to music, or spending a few minutes in nature. What usually brings you even a small sense of comfort?",
      "When we're experiencing depression, it's crucial to be gentle with ourselves. Consider reaching out to a mental health professional who can provide personalized support. In the meantime, try to do one small thing each day that usually brings you joy, even if it feels difficult.",
      "Depression can create a sense of isolation, but connection is healing. Whether it's talking to a trusted friend, joining a support group, or working with a therapist, reaching out is a sign of strength. What kind of support feels most accessible to you right now?"
    ]
  },
  {
    keywords: ['stressed', 'overwhelmed', 'pressure', 'busy', 'too much', 'burnout'],
    agent_type: 'coach',
    responses: [
      "It sounds like you're carrying a lot right now. When we feel overwhelmed, it often helps to pause and prioritize. What's the most important thing you need to focus on today? Let's break it down into smaller, manageable steps.",
      "Feeling overwhelmed is your mind's signal that you might need to reassess your current load. Try the 'brain dump' technique: write down everything on your mind, then categorize by urgency and importance. This can help create clarity and reduce mental clutter.",
      "Stress can be exhausting, and it's important to remember that rest isn't earned - it's necessary. Make sure you're taking breaks, even small ones. Your wellbeing is just as important as your responsibilities. What's one thing you could delegate or postpone?",
      "When everything feels like 'too much,' it's okay to ask for help or to say no to non-essential commitments. Let's work on some stress management strategies: deep breathing, time-blocking, or setting boundaries. Which of these resonates most with you?"
    ]
  },
  {
    keywords: ['sleep', 'tired', 'exhausted', 'insomnia', 'rest', 'fatigue'],
    agent_type: 'coach',
    responses: [
      "Sleep is fundamental to mental health, and I'm glad you're recognizing its importance. Let's work on sleep hygiene: try establishing a bedtime routine, dimming lights 30 minutes before bed, avoiding screens, and perhaps some gentle stretching or reading.",
      "If you're having trouble sleeping, your mind might be too active at bedtime. Consider keeping a 'worry journal' - write down your concerns before bed to help quiet your thoughts. Also, try to keep your bedroom cool, dark, and quiet.",
      "Fatigue affects everything - your mood, ability to cope, and physical health. Prioritize rest when you can, and consider speaking with a healthcare provider if sleep issues persist. What does your current bedtime routine look like?",
      "Good sleep is like a reset button for your mental health. Try the 'wind-down hour': no caffeine after 2 PM, no large meals before bed, and create a calming environment. Progressive muscle relaxation can also help prepare your body for rest."
    ]
  },
  {
    keywords: ['lonely', 'alone', 'isolated', 'disconnected', 'nobody cares'],
    agent_type: 'companion',
    responses: [
      "Loneliness is one of the most difficult feelings to experience, and I want you to know that you're not truly alone, even when it feels that way. There are people who care about you, and your presence in this world matters more than you might realize right now.",
      "When feeling isolated, sometimes reaching out to just one person can help break that cycle. Even a simple text to a friend or family member can create connection. If that feels too difficult, consider joining online communities or local groups with shared interests.",
      "I hear how disconnected you're feeling, and that's incredibly painful. Connection is a basic human need. Would it help to think about small ways to connect - perhaps volunteering, taking a class, or even just smiling at a stranger? Sometimes connection starts with tiny steps.",
      "Loneliness doesn't mean you're unlovable or that you'll always feel this way. These feelings can be temporary, even when they feel permanent. You have value and deserve connection. What's one small step you could take today toward reaching out to someone?"
    ]
  },
  {
    keywords: ['angry', 'frustrated', 'mad', 'irritated', 'furious', 'rage'],
    agent_type: 'therapist',
    responses: [
      "Anger is a valid emotion that often signals something important needs attention. What do you think might be underneath this anger? Sometimes it masks hurt, fear, or disappointment. Let's explore what's really driving these feelings.",
      "When we're angry, our bodies are activated and ready for action. Try some physical release - go for a walk, do some exercise, or even scream into a pillow if you need to. Physical movement can help process these intense emotions.",
      "Frustration can build up over time, and it sounds like you might be at a breaking point. It could help to journal about what's bothering you or talk to someone you trust. What's been the biggest source of frustration lately?",
      "Anger often contains important information about our boundaries and values. Once you've had a chance to cool down, consider what this anger might be telling you. Are there changes you need to make or conversations you need to have?"
    ]
  },
  {
    keywords: ['motivation', 'unmotivated', 'stuck', 'procrastination', 'lazy', 'no energy'],
    agent_type: 'coach',
    responses: [
      "Lack of motivation is often temporary and very normal. Let's start small - what's one tiny step you could take toward your goal right now? Sometimes action creates motivation, not the other way around. Even 5 minutes of progress can build momentum.",
      "Feeling 'stuck' often means we need to change our approach or break things down differently. What's one small part of your goal that feels manageable today? Success builds on success, so let's start with something achievable.",
      "Motivation naturally fluctuates, and that's okay. Instead of waiting for motivation, try creating systems and habits that don't rely on feeling motivated. What's one routine you could establish that would move you forward even on low-energy days?",
      "Sometimes what we call 'laziness' is actually our mind and body telling us we need rest, or that we're approaching something in a way that doesn't align with our values. Be compassionate with yourself. What would make this goal feel more meaningful or enjoyable?"
    ]
  }
];

const genericResponses = [
  "Thank you for sharing with me. It takes courage to express how you're feeling. I'm here to support you through this. What kind of support would be most helpful right now?",
  "I'm here to listen and support you. Your feelings are valid, and it's important that you're taking time to check in with yourself. How can I best help you process what you're experiencing?",
  "It sounds like you're going through something challenging. Remember that seeking support is a sign of strength, not weakness. What's one thing that usually helps you feel a bit better when you're struggling?",
  "Mental health is just as important as physical health, and I'm glad you're prioritizing it. What aspects of your wellbeing would you like to focus on today?",
  "Sometimes talking about our feelings can help us process them better. Is there anything specific you'd like to explore or work through together?",
  "I appreciate you reaching out and trusting me with your feelings. What kind of support feels most important to you right now - practical strategies, emotional validation, or something else?",
  "Your mental wellbeing matters, and I'm here to help however I can. Have you been able to practice any self-care activities recently, or is that something we should focus on?",
  "It's completely normal to have ups and downs in our mental health journey. What usually helps you feel more grounded when you're going through a difficult time?"
];

const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'die', 'hurt myself', 'self harm', 'not worth living', 'better off dead'];

const crisisResponse = "I'm very concerned about what you've shared, and I want you to know that your life has value and meaning. You don't have to go through this alone. Please reach out for immediate support: National Suicide Prevention Lifeline (988), Crisis Text Line (text HOME to 741741), or call emergency services (911) if you're in immediate danger. There are people who want to help you through this difficult time.";

export function generateAIResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Check for crisis keywords first
  if (crisisKeywords.some(keyword => message.includes(keyword))) {
    return crisisResponse;
  }

  // Find matching category
  for (const category of responseCategories) {
    if (category.keywords.some(keyword => message.includes(keyword))) {
      const randomIndex = Math.floor(Math.random() * category.responses.length);
      return category.responses[randomIndex];
    }
  }

  // Return generic response if no specific category matches
  const randomIndex = Math.floor(Math.random() * genericResponses.length);
  return genericResponses[randomIndex];
}

export function getAgentType(userMessage: string): 'therapist' | 'coach' | 'companion' | 'crisis' {
  const message = userMessage.toLowerCase();
  
  if (crisisKeywords.some(keyword => message.includes(keyword))) {
    return 'crisis';
  }

  for (const category of responseCategories) {
    if (category.keywords.some(keyword => message.includes(keyword))) {
      return category.agent_type;
    }
  }

  return 'companion';
}

export function calculateConfidenceScore(userMessage: string): number {
  const message = userMessage.toLowerCase();
  let matchCount = 0;
  let totalKeywords = 0;

  for (const category of responseCategories) {
    totalKeywords += category.keywords.length;
    matchCount += category.keywords.filter(keyword => message.includes(keyword)).length;
  }

  return Math.min(0.95, Math.max(0.6, matchCount / totalKeywords * 10));
}