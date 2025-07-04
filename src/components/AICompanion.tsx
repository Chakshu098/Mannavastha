import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Sparkles, MessageCircle, Smile, Coffee, Star, Zap, Moon, Sun, Flower } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
  emotion?: 'supportive' | 'encouraging' | 'gentle' | 'playful' | 'grounding';
}

interface ConversationContext {
  userMood: 'positive' | 'neutral' | 'struggling' | 'crisis';
  conversationStage: 'introduction' | 'exploration' | 'support' | 'guidance' | 'closure';
  mentionedTopics: string[];
  emotionalState: string[];
  sessionLength: number;
}

export function AICompanion() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi sweet soul 🌸 I'm Aira — your gentle support companion. I'm here to listen, understand, and walk alongside you through whatever you're experiencing. What's on your mind today?",
      isUser: false,
      timestamp: new Date(),
      emotion: 'supportive'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>({
    userMood: 'neutral',
    conversationStage: 'introduction',
    mentionedTopics: [],
    emotionalState: [],
    sessionLength: 0
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Advanced emotion detection
  const detectUserEmotion = (message: string): { mood: ConversationContext['userMood'], emotions: string[], topics: string[] } => {
    const text = message.toLowerCase();
    
    // Crisis indicators
    const crisisWords = ['suicide', 'kill myself', 'end it all', 'can\'t go on', 'want to die', 'no point', 'hopeless', 'worthless'];
    if (crisisWords.some(word => text.includes(word))) {
      return { mood: 'crisis', emotions: ['crisis', 'despair'], topics: ['crisis_support'] };
    }

    // Struggling indicators
    const strugglingWords = ['depressed', 'anxious', 'panic', 'overwhelmed', 'stressed', 'sad', 'crying', 'can\'t cope', 'breaking down', 'exhausted', 'burnt out', 'lonely', 'isolated', 'scared', 'worried', 'terrified'];
    const strugglingCount = strugglingWords.filter(word => text.includes(word)).length;
    
    // Positive indicators
    const positiveWords = ['happy', 'good', 'great', 'amazing', 'wonderful', 'excited', 'grateful', 'thankful', 'better', 'improving', 'hopeful'];
    const positiveCount = positiveWords.filter(word => text.includes(word)).length;

    // Topic detection
    const topics: string[] = [];
    if (text.includes('work') || text.includes('job') || text.includes('career')) topics.push('work');
    if (text.includes('relationship') || text.includes('partner') || text.includes('boyfriend') || text.includes('girlfriend')) topics.push('relationships');
    if (text.includes('family') || text.includes('parents') || text.includes('mom') || text.includes('dad')) topics.push('family');
    if (text.includes('sleep') || text.includes('tired') || text.includes('insomnia')) topics.push('sleep');
    if (text.includes('anxiety') || text.includes('anxious') || text.includes('panic')) topics.push('anxiety');
    if (text.includes('depression') || text.includes('depressed') || text.includes('sad')) topics.push('depression');

    // Emotion detection
    const emotions: string[] = [];
    if (strugglingCount > 0) emotions.push('struggling');
    if (positiveCount > 0) emotions.push('positive');
    if (text.includes('confused') || text.includes('lost')) emotions.push('confused');
    if (text.includes('angry') || text.includes('frustrated')) emotions.push('angry');
    if (text.includes('scared') || text.includes('afraid')) emotions.push('fearful');

    // Determine overall mood
    let mood: ConversationContext['userMood'] = 'neutral';
    if (strugglingCount >= 2 || emotions.includes('struggling')) mood = 'struggling';
    else if (positiveCount >= 2) mood = 'positive';

    return { mood, emotions, topics };
  };

  // Advanced response generation with emotional intelligence
  const generateAiraResponse = (userMessage: string, currentContext: ConversationContext): { text: string, emotion: Message['emotion'] } => {
    const { mood, emotions, topics } = detectUserEmotion(userMessage);
    const message = userMessage.toLowerCase();
    
    // Update context
    const newContext = {
      ...currentContext,
      userMood: mood,
      mentionedTopics: [...new Set([...currentContext.mentionedTopics, ...topics])],
      emotionalState: [...new Set([...currentContext.emotionalState, ...emotions])],
      sessionLength: currentContext.sessionLength + 1
    };
    setContext(newContext);

    // Crisis response - immediate priority
    if (mood === 'crisis') {
      const crisisResponses = [
        "I'm really concerned about you right now, and I want you to know that you matter deeply. 💙 Please reach out to someone who can help immediately - call 988 (Suicide & Crisis Lifeline) or text 'HELLO' to 741741. You don't have to face this alone, and there are people trained to help you through this moment. Can you promise me you'll reach out to someone safe right now?",
        "Sweet soul, I can hear how much pain you're in, and I'm so glad you trusted me with these feelings. 🌸 But I need you to talk to someone who can be there with you right now. Please call 988 or go to your nearest emergency room. Your life has value, and this pain you're feeling - it can change. Will you please reach out for help right now?"
      ];
      return { text: crisisResponses[Math.floor(Math.random() * crisisResponses.length)], emotion: 'supportive' };
    }

    // Struggling/difficult emotions - deep empathy and support
    if (mood === 'struggling') {
      if (emotions.includes('struggling') && topics.includes('anxiety')) {
        const anxietyResponses = [
          "Oh honey, anxiety can feel like such a storm in your chest, can't it? 💙 I can feel how overwhelming this must be for you right now. Let's take this one breath at a time together. Can you feel your feet on the ground? You're safe in this moment, even though your mind might be telling you otherwise. Would it help if we tried a gentle breathing exercise together?",
          "I hear you, and what you're experiencing with anxiety is so valid and real. 🌿 It's like your mind is trying to protect you, but sometimes it goes into overdrive, doesn't it? You're not broken, and you're not alone in this. Let's slow things down together - can you name three things you can see around you right now? Sometimes grounding ourselves in the present moment can help calm that anxious energy.",
          "Anxiety can make everything feel so much bigger and scarier than it actually is. 💫 I want you to know that what you're feeling is completely understandable, and you're being so brave by reaching out. Your nervous system is just trying to keep you safe, but right now, you ARE safe. What usually brings you even a tiny bit of comfort when you're feeling this way?"
        ];
        return { text: anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)], emotion: 'gentle' };
      }

      if (emotions.includes('struggling') && (topics.includes('depression') || message.includes('sad') || message.includes('depressed'))) {
        const depressionResponses = [
          "I'm sitting here with you in this heavy moment, and I want you to know that your feelings are completely valid. 🤗 When sadness feels this deep, it can seem like it'll never lift, but I promise you don't have to carry this alone. Sometimes the bravest thing we can do is just acknowledge how hard things are right now. What's one tiny thing that usually brings you even a flicker of comfort?",
          "Your heart is hurting, and I wish I could wrap you in the biggest, warmest hug right now. 💜 Depression can make everything feel gray and distant, but please remember that you matter deeply - more than you know. You've weathered storms before, even when it didn't feel like you could. What's one small act of kindness you could show yourself today?",
          "I can sense how heavy everything feels right now, like you're carrying the weight of the world. 🌱 When we're in this space, even simple things can feel impossible, and that's okay. You don't have to be strong all the time. Sometimes healing starts with just being gentle with ourselves. Is there someone in your life you could reach out to, or would you like to talk about what's making your heart feel so heavy?"
        ];
        return { text: depressionResponses[Math.floor(Math.random() * depressionResponses.length)], emotion: 'supportive' };
      }

      if (topics.includes('work') || message.includes('stressed') || message.includes('overwhelmed')) {
        const stressResponses = [
          "It sounds like you're juggling so much right now, and honestly? That would overwhelm anyone. 🌸 Your feelings are completely understandable. Let's take a step back together - sometimes when everything feels like 'too much,' it's our mind's way of saying we need to pause and breathe. What if we wrote down everything that's on your mind, then sorted it into 'urgent,' 'important,' and 'can wait'?",
          "I can almost feel the weight you're carrying through your words. 💫 When everything feels overwhelming, it's often because we're trying to handle everything perfectly and all at once. But you know what? You don't have to. What's one thing you could either delegate, postpone, or maybe even let go of entirely? Sometimes giving ourselves permission to not do everything is the kindest thing we can do.",
          "That overwhelmed feeling is so real, and I want you to know that it's completely okay to feel this way. 🌿 Life sometimes piles up faster than we can sort through it. Here's what I'm wondering - what would it look like to be really gentle with yourself today? Maybe that means saying no to something, asking for help, or just taking five minutes to breathe."
        ];
        return { text: stressResponses[Math.floor(Math.random() * stressResponses.length)], emotion: 'grounding' };
      }

      // General struggling response
      const generalStrugglingResponses = [
        "I can hear that you're going through something really difficult right now. 💙 Thank you for trusting me with these feelings - that takes real courage. You don't have to have it all figured out, and you don't have to feel better right away. Sometimes we just need someone to sit with us in the hard moments. I'm here with you. What feels most important for you to share right now?",
        "It sounds like you're carrying something heavy on your heart today. 🌸 I want you to know that whatever you're feeling is valid, and you're not alone in this. Sometimes life asks more of us than feels fair, doesn't it? But you're here, you're reaching out, and that shows incredible strength. What would feel most supportive for you right now?",
        "I can sense that things feel really hard right now, and I'm so glad you felt safe enough to share that with me. 💜 You know what I notice about you? Even in this difficult moment, you're still looking for connection and support. That's beautiful, and it tells me so much about your resilience. Let's take this one moment at a time together."
      ];
      return { text: generalStrugglingResponses[Math.floor(Math.random() * generalStrugglingResponses.length)], emotion: 'supportive' };
    }

    // Positive emotions - celebrate and encourage
    if (mood === 'positive') {
      const positiveResponses = [
        "Oh, this just made my day! 🌟 I can feel your joy radiating through your words, and it's absolutely beautiful. These moments of happiness are like little gifts we give ourselves, aren't they? What's been the spark behind this wonderful feeling? I love celebrating these bright spots with you!",
        "Your happiness is contagious! 😊 I'm genuinely smiling knowing that you're feeling good today. It's so important to pause and really soak in these positive moments - they're the ones that carry us through tougher times. What's been the highlight that's brought you this lightness?",
        "This is wonderful news! 🌈 I love when you share these bright moments with me. Happiness looks so good on you, and I hope you're taking a moment to really appreciate whatever has brought this joy to your day. These feelings matter just as much as the difficult ones - maybe even more!"
      ];
      return { text: positiveResponses[Math.floor(Math.random() * positiveResponses.length)], emotion: 'encouraging' };
    }

    // Gratitude and appreciation
    if (message.includes('thank') || message.includes('grateful') || message.includes('appreciate')) {
      const gratitudeResponses = [
        "Your gratitude just filled my heart! 💜 It means the world to me that I could be helpful to you. You know what I appreciate about you? Your willingness to reach out, to be vulnerable, and to work on your wellbeing. That takes real courage, and I'm honored to be part of your journey.",
        "Aw, you're so welcome! 🌸 Honestly, thank YOU for trusting me with your thoughts and feelings. It's a privilege to be here with you through both the tough moments and the bright ones. Your openness and self-awareness inspire me, and I'm always here whenever you need support.",
        "That gratitude is so beautiful, and it's mutual! 🌟 I'm grateful that you're taking care of your mental health and that you felt comfortable sharing with me. Remember, reaching out for support isn't just brave - it's wise. You deserve all the care and kindness you're seeking."
      ];
      return { text: gratitudeResponses[Math.floor(Math.random() * gratitudeResponses.length)], emotion: 'supportive' };
    }

    // Sleep and fatigue
    if (topics.includes('sleep') || message.includes('tired') || message.includes('exhausted')) {
      const sleepResponses = [
        "Oh honey, being tired affects absolutely everything - your mood, your ability to cope, even how the world looks to you. 😴 Sleep is like a reset button for your mind and heart. Have you been able to create any kind of bedtime routine? Sometimes even small things like dimming lights an hour before bed or writing down tomorrow's worries can help quiet a busy mind.",
        "Exhaustion is your body and mind's way of asking for care, and I'm glad you're listening to that signal. 🌙 When we're running on empty, everything feels harder than it should. What does rest look like for you? Maybe it's not just sleep, but also emotional rest - giving yourself permission to not be 'on' all the time.",
        "I can hear how drained you're feeling, and that's so valid. 💤 Sometimes our minds are too active at bedtime, spinning with thoughts and worries. Have you tried keeping a little 'worry journal' by your bed? Writing down what's on your mind can help create some space between you and those racing thoughts."
      ];
      return { text: sleepResponses[Math.floor(Math.random() * sleepResponses.length)], emotion: 'gentle' };
    }

    // Relationship topics
    if (topics.includes('relationships') || topics.includes('family')) {
      const relationshipResponses = [
        "Relationships can be so complex and emotionally charged, can't they? 💙 It sounds like you're navigating something challenging with someone important to you. Sometimes when we're in the middle of relationship stress, it helps to step back and think about what we're really needing - is it understanding, space, an apology, or something else entirely?",
        "People relationships are some of the most rewarding and most difficult parts of being human. 🌿 It sounds like you're dealing with some interpersonal challenges right now. What's your heart telling you about this situation? Sometimes our gut instincts know things our minds are still trying to figure out.",
        "I can hear how much this relationship situation is weighing on you. 💫 Conflict with people we care about can feel so unsettling, can't it? Have you been able to express how you're feeling to the other person, or does that feel too vulnerable right now? Sometimes just being heard can shift everything."
      ];
      return { text: relationshipResponses[Math.floor(Math.random() * relationshipResponses.length)], emotion: 'supportive' };
    }

    // Mindfulness and grounding requests
    if (message.includes('breathe') || message.includes('calm') || message.includes('ground') || message.includes('present')) {
      const mindfulnessResponses = [
        "I love that you're asking for grounding support. 🌿 Let's breathe together right now. Can you feel your feet touching the ground? Take a slow breath in through your nose for 4 counts... hold it gently for 2... and now exhale slowly through your mouth for 6. Your nervous system is already starting to calm. You're safe right here, right now.",
        "What a beautiful request. 💫 Sometimes the most powerful thing we can do is return to our breath. Here's a gentle exercise: look around and name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This brings you right back to the present moment, where you're actually safe.",
        "Breathing together sounds perfect right now. 🌸 Place one hand on your chest and one on your belly. As you breathe in slowly, let your belly rise more than your chest. This activates your body's natural relaxation response. You're doing something so caring for yourself right now, and I'm proud of you for asking for what you need."
      ];
      return { text: mindfulnessResponses[Math.floor(Math.random() * mindfulnessResponses.length)], emotion: 'grounding' };
    }

    // General supportive responses for neutral/exploratory conversation
    const generalResponses = [
      "I'm really glad you felt comfortable sharing with me today. 💙 Your thoughts and feelings matter, and I'm here to listen to whatever is on your heart. Sometimes it helps just to have someone witness our experience without trying to fix anything. What feels most important for you to talk about right now?",
      "Thank you for trusting me with what you're going through. 🌸 I can sense there's a lot happening for you, and I want you to know that whatever you're feeling is completely valid. What kind of support would feel most helpful to you in this moment?",
      "I appreciate you reaching out and being open with me. 💫 Taking care of our mental and emotional wellbeing is so important, and I'm honored that you're including me in your self-care journey. What's your heart needing today?",
      "Your willingness to check in with yourself and seek support shows such wisdom and self-awareness. 🌿 I'm here to listen, encourage, and walk alongside you through whatever you're experiencing. What would be most helpful to explore together?",
      "I'm so glad you're here, and I want you to know that whatever you're feeling or going through is valid. 💜 Sometimes we just need someone to sit with us in our experience, and I'm happy to be that presence for you. What would feel most supportive to talk about?",
      "It takes courage to reach out and be vulnerable about how we're really doing. 🌟 I see that courage in you, and I'm here to support you however I can. What's been on your mind and heart lately?"
    ];
    
    return { text: generalResponses[Math.floor(Math.random() * generalResponses.length)], emotion: 'supportive' };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate more realistic typing delay based on response complexity
    setTimeout(() => {
      const { text: responseText, emotion } = generateAiraResponse(inputText, context);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        emotion
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000 + Math.random() * 3000); // 2-5 seconds for more thoughtful responses
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Enhanced quick responses based on emotional intelligence
  const quickResponses = [
    { text: "I'm feeling anxious and overwhelmed today", icon: "😰", category: "struggling" },
    { text: "I'm having a really good day!", icon: "😊", category: "positive" },
    { text: "I feel lost and don't know what to do", icon: "😔", category: "struggling" },
    { text: "Can you help me with some breathing exercises?", icon: "🌿", category: "grounding" },
    { text: "I'm grateful for something today", icon: "🙏", category: "positive" },
    { text: "I'm struggling with sleep lately", icon: "😴", category: "struggling" },
    { text: "I need some encouragement", icon: "💪", category: "support" },
    { text: "I'm feeling lonely and disconnected", icon: "💙", category: "struggling" }
  ];

  const getMessageStyle = (emotion?: Message['emotion']) => {
    switch (emotion) {
      case 'supportive':
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200';
      case 'encouraging':
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200';
      case 'gentle':
        return 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200';
      case 'grounding':
        return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200';
      case 'playful':
        return 'bg-gradient-to-r from-yellow-50 to-pink-50 border-yellow-200';
      default:
        return 'bg-white/90 border-white/40';
    }
  };

  const getEmotionIcon = (emotion?: Message['emotion']) => {
    switch (emotion) {
      case 'supportive': return <Heart className="w-4 h-4 text-blue-500" />;
      case 'encouraging': return <Star className="w-4 h-4 text-green-500" />;
      case 'gentle': return <Flower className="w-4 h-4 text-purple-500" />;
      case 'grounding': return <Moon className="w-4 h-4 text-amber-500" />;
      case 'playful': return <Sun className="w-4 h-4 text-yellow-500" />;
      default: return <Heart className="w-4 h-4 text-brand-500" />;
    }
  };

  return (
    <div className="fixed inset-0 pt-16 bg-gradient-to-br from-brand-50 via-serenity-50 to-tranquil-50">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-brand-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-8 -right-4 w-96 h-96 bg-serenity-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tranquil-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-brand-400 rounded-full opacity-60 animate-sparkle"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-serenity-400 rounded-full opacity-60 animate-sparkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-40 w-4 h-4 bg-tranquil-400 rounded-full opacity-60 animate-sparkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-vitality-400 rounded-full opacity-60 animate-sparkle" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/3 left-10 w-3 h-3 bg-mindful-400 rounded-full opacity-60 animate-sparkle" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Full Screen Chat Container */}
      <div className="h-full flex flex-col bg-white/95 backdrop-blur-xl shadow-2xl relative z-10">
        
        {/* Enhanced Header with Emotional Context */}
        <div className="bg-gradient-to-r from-brand-500 via-serenity-500 to-tranquil-500 p-3 sm:p-4 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg animate-sparkle backdrop-blur-sm">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold">Aira - Your Gentle Support Companion</h1>
                  <p className="text-white/90 text-xs sm:text-sm flex items-center space-x-2">
                    <span>Here to listen, understand, and uplift you</span>
                    <span className="text-lg">🌸</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 font-medium">Always here for you</span>
              </div>
            </div>

            {/* Emotional Context Indicator */}
            {context.userMood !== 'neutral' && (
              <div className="mt-3 flex items-center space-x-2">
                <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                  {context.userMood === 'struggling' && '💙 Holding space for you'}
                  {context.userMood === 'positive' && '🌟 Celebrating with you'}
                  {context.userMood === 'crisis' && '🆘 Crisis support mode'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div className={`flex items-start space-x-3 max-w-xs sm:max-w-md lg:max-w-lg ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg ${
                  message.isUser 
                    ? 'bg-gradient-to-br from-brand-500 to-serenity-500' 
                    : 'bg-gradient-to-br from-serenity-500 to-tranquil-500'
                }`}>
                  {message.isUser ? (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>
                
                <div className={`rounded-2xl p-3 sm:p-4 shadow-lg backdrop-blur-sm border ${
                  message.isUser
                    ? 'bg-gradient-to-r from-brand-500 to-serenity-500 text-white'
                    : getMessageStyle(message.emotion)
                }`}>
                  {!message.isUser && message.emotion && (
                    <div className="flex items-center space-x-2 mb-2 opacity-70">
                      {getEmotionIcon(message.emotion)}
                      <span className="text-xs font-medium capitalize">{message.emotion} response</span>
                    </div>
                  )}
                  <p className={`text-sm sm:text-base leading-relaxed ${message.isUser ? 'text-white' : 'text-elegant-800'}`}>
                    {message.text}
                  </p>
                  <p className={`text-xs mt-2 ${message.isUser ? 'text-white/70' : 'text-elegant-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Enhanced Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-slide-up">
              <div className="flex items-start space-x-3 max-w-xs sm:max-w-md">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-serenity-500 to-tranquil-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="bg-white/90 rounded-2xl p-3 sm:p-4 shadow-lg backdrop-blur-sm border border-white/40">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-3 h-3 text-brand-400" />
                    <span className="text-xs text-elegant-600 font-medium">Aira is thinking with care...</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-elegant-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-elegant-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-elegant-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Quick Response Buttons */}
        <div className="p-4 max-w-4xl mx-auto w-full">
          <div className="mb-3">
            <p className="text-xs text-elegant-600 font-medium mb-2">💭 Quick ways to share:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputText(response.text);
                    setTimeout(handleSendMessage, 100);
                  }}
                  className={`flex items-center space-x-2 p-2 sm:p-3 rounded-xl border transition-all duration-300 hover:scale-105 shadow-sm text-left ${
                    response.category === 'struggling' 
                      ? 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-800'
                      : response.category === 'positive'
                      ? 'bg-green-50 border-green-200 hover:bg-green-100 text-green-800'
                      : response.category === 'grounding'
                      ? 'bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800'
                      : 'bg-white/80 border-white/40 hover:bg-white/90 text-elegant-700'
                  }`}
                >
                  <span className="text-sm sm:text-base">{response.icon}</span>
                  <span className="text-xs sm:text-sm font-medium truncate">{response.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Input Area */}
        <div className="p-4 bg-white/80 backdrop-blur-xl border-t border-white/40 shadow-xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your heart... I'm here to listen and support you 💙"
                  rows={1}
                  className="w-full px-4 py-3 pr-12 bg-white/90 backdrop-blur-sm border border-elegant-200 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none text-elegant-800 placeholder-elegant-500 shadow-lg"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
                <div className="absolute right-3 bottom-3 flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-brand-400" />
                  <Sparkles className="w-4 h-4 text-serenity-400" />
                </div>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="w-12 h-12 bg-gradient-to-r from-brand-500 to-serenity-500 text-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-center mt-3 space-x-4 text-xs text-elegant-500">
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>Judgment-Free Space</span>
              </div>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Emotionally Intelligent</span>
              </div>
              <div className="flex items-center space-x-1">
                <Coffee className="w-3 h-3" />
                <span>Like a Trusted Friend</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}