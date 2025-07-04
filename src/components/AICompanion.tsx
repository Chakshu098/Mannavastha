import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Sparkles, MessageCircle, Smile, Coffee, Star, Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
}

export function AICompanion() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Aira, your friendly AI companion. 🌸 I'm here to be that trusted friend who listens without judgment and supports you through whatever you're facing. Think of me as someone who genuinely cares about your wellbeing and wants to help you navigate life's ups and downs. What's on your heart today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAiraResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Anxiety and worry responses - Aira's empathetic approach
    if (message.includes('anxious') || message.includes('anxiety') || message.includes('worried') || message.includes('nervous') || message.includes('panic')) {
      const responses = [
        "I can feel the weight of that anxiety with you. 💙 It's like your mind is trying to protect you, but sometimes it goes into overdrive, right? Let's slow things down together. Try this with me: breathe in slowly for 4 counts... hold it... and now exhale for 6. Your nervous system will thank you for this gentle reset. You're safe right now.",
        "Anxiety can feel like a storm in your chest, and I want you to know that what you're experiencing is so valid. 🌿 Here's something that might help: look around and name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This grounds you in the present moment, where you're actually safe.",
        "Oh, I hear you. That anxious feeling can be so overwhelming, like your thoughts are racing faster than you can catch them. 💫 Remember, anxiety is temporary - it feels permanent, but it always passes. What usually brings you comfort? Maybe we can think of one small, gentle thing you can do for yourself right now."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Depression and sadness - Aira's gentle understanding
    if (message.includes('sad') || message.includes('depressed') || message.includes('down') || message.includes('hopeless') || message.includes('empty')) {
      const responses = [
        "I'm sitting here with you in this difficult moment. 🤗 When sadness feels this heavy, it can seem like it'll never lift, but I want you to know that your feelings are completely valid and you don't have to carry this alone. Sometimes the bravest thing we can do is just acknowledge how hard things are right now. What's one tiny thing that usually brings you even a flicker of comfort?",
        "Your heart is hurting, and I wish I could wrap you in the biggest, warmest hug right now. 💜 Depression can make everything feel gray and distant, but please remember that you matter deeply. You've weathered storms before, even when it didn't feel like you could. What's one small act of kindness you could show yourself today?",
        "I can sense how heavy everything feels right now. 🌱 When we're in this space, even simple things can feel impossible, and that's okay. You don't have to be strong all the time. Sometimes healing starts with just being gentle with ourselves. Is there someone in your life you could reach out to, or would you like to talk about what's making your heart feel so heavy?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Stress and overwhelm - Aira's practical compassion
    if (message.includes('stressed') || message.includes('overwhelmed') || message.includes('pressure') || message.includes('too much') || message.includes('burnout')) {
      const responses = [
        "It sounds like you're juggling so much right now, and honestly? That would overwhelm anyone. 🌸 Your feelings are completely understandable. Let's take a step back together - what if we wrote down everything that's on your mind, then sorted it into 'urgent,' 'important,' and 'can wait'? Sometimes just getting it out of our heads and onto paper can help us breathe a little easier.",
        "I can almost feel the weight you're carrying through your words. 💫 When everything feels like 'too much,' it's often our mind's way of saying we need to pause and reassess. You know what? You don't have to handle everything perfectly or all at once. What's one thing you could either delegate, postpone, or maybe even let go of entirely?",
        "That overwhelmed feeling is so real, and I want you to know that it's okay to feel this way. 🌿 Sometimes life piles up faster than we can sort through it. Here's what I'm wondering - what would it look like to be really gentle with yourself today? Maybe that means saying no to something, asking for help, or just taking five minutes to breathe."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Happiness and positive emotions - Aira celebrates with them
    if (message.includes('happy') || message.includes('good') || message.includes('great') || message.includes('wonderful') || message.includes('excited') || message.includes('amazing')) {
      const responses = [
        "Oh, this just made my day! 🌟 I can feel your joy radiating through your words, and it's absolutely beautiful. These moments of happiness are so precious - they're like little gifts we give ourselves. What's been the spark behind this wonderful feeling? I love celebrating these bright spots with you!",
        "Your happiness is contagious! 😊 I'm genuinely smiling knowing that you're feeling good today. It's so important to pause and really soak in these positive moments - they're the ones that carry us through tougher times. What's been the highlight that's brought you this joy?",
        "This is wonderful news! 🌈 I love when you share these bright moments with me. Happiness looks so good on you, and I hope you're taking a moment to really appreciate whatever has brought this lightness to your day. These feelings matter just as much as the difficult ones - maybe even more!"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Sleep and fatigue - Aira's nurturing care
    if (message.includes('tired') || message.includes('exhausted') || message.includes('sleep') || message.includes('insomnia') || message.includes('fatigue')) {
      const responses = [
        "Oh honey, being tired affects absolutely everything - your mood, your ability to cope, even how the world looks to you. 😴 Sleep is like a reset button for your mind and heart. Have you been able to create any kind of bedtime routine? Sometimes even small things like dimming lights an hour before bed or writing down tomorrow's worries can help quiet a busy mind.",
        "Exhaustion is your body and mind's way of asking for care, and I'm glad you're listening to that signal. 🌙 When we're running on empty, everything feels harder than it should. What does rest look like for you? Maybe it's not just sleep, but also emotional rest - giving yourself permission to not be 'on' all the time.",
        "I can hear how drained you're feeling, and that's so valid. 💤 Sometimes our minds are too active at bedtime, spinning with thoughts and worries. Have you tried keeping a little 'worry journal' by your bed? Writing down what's on your mind can help create some space between you and those racing thoughts."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Loneliness and isolation - Aira's warm connection
    if (message.includes('lonely') || message.includes('alone') || message.includes('isolated') || message.includes('disconnected') || message.includes('nobody')) {
      const responses = [
        "Loneliness is one of the most painful feelings we can experience, and I want you to know that you're not truly alone, even when it feels that way. 💙 I'm here with you right now, and there are people in this world who care about you, even if they feel distant. Sometimes connection starts with the smallest gesture - maybe a text to someone you haven't talked to in a while?",
        "I can feel how isolated you're feeling, and my heart goes out to you. 🤗 Connection is such a basic human need, and when we don't have it, everything feels harder. You know what though? You reached out to me today, and that shows incredible strength. What would one small step toward connection look like for you?",
        "That disconnected feeling is so real and so hard. 🌸 Sometimes when we're lonely, it can feel like we're invisible or that nobody would want to hear from us, but I promise that's not true. You matter, your presence in this world matters, and you deserve connection. Is there anyone - even just one person - you could reach out to today?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Anger and frustration - Aira's understanding validation
    if (message.includes('angry') || message.includes('frustrated') || message.includes('mad') || message.includes('irritated') || message.includes('furious')) {
      const responses = [
        "I can feel the intensity of that anger, and you know what? It's completely valid. 🔥 Anger often shows up when something important to us has been threatened or when our boundaries have been crossed. Your feelings are telling you something important. What do you think might be underneath this anger - maybe hurt, disappointment, or feeling unheard?",
        "That frustration sounds really intense, and I want you to know that it's okay to feel this way. 💫 Sometimes anger is our heart's way of saying 'this isn't okay' or 'I deserve better.' When you're ready, it might help to move your body - go for a walk, do some jumping jacks, or even scream into a pillow. Your body needs to release that energy.",
        "I hear how frustrated you are, and that makes complete sense given what you're dealing with. 🌿 Anger can actually be really informative - it often points to our values and boundaries. Once this intensity settles a bit, what do you think this anger might be trying to tell you about what you need or what needs to change?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Motivation and goals - Aira's encouraging support
    if (message.includes('motivation') || message.includes('unmotivated') || message.includes('stuck') || message.includes('procrastination') || message.includes('goals')) {
      const responses = [
        "I totally get that stuck feeling - it's like you know what you want to do, but something invisible is holding you back, right? 💫 Here's the thing about motivation: it's actually pretty unreliable! Instead, what if we focused on creating tiny, almost ridiculously small steps? What's one thing you could do for just 5 minutes that would move you forward?",
        "That lack of motivation is so frustrating, especially when part of you really wants to make progress. 🌱 Sometimes what we call 'laziness' is actually our mind and body telling us we need rest, or that we're approaching something in a way that doesn't feel right. What would make this goal feel more meaningful or enjoyable for you?",
        "Being stuck is such a human experience, and you're definitely not alone in feeling this way. ✨ Sometimes the best way forward is to change our approach entirely. Instead of waiting for motivation to strike, what if we created a system or routine that doesn't depend on feeling motivated? What's one small habit you could build?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Gratitude and appreciation - Aira's warm acknowledgment
    if (message.includes('thank') || message.includes('grateful') || message.includes('appreciate') || message.includes('help')) {
      const responses = [
        "Your gratitude just filled my heart! 💜 It means the world to me that I could be helpful to you. You know what I appreciate about you? Your willingness to reach out, to be vulnerable, and to work on your wellbeing. That takes real courage, and I'm honored to be part of your journey.",
        "Aw, you're so welcome! 🌸 Honestly, thank YOU for trusting me with your thoughts and feelings. It's a privilege to be here with you through both the tough moments and the bright ones. Your openness and self-awareness inspire me, and I'm always here whenever you need support.",
        "That gratitude is so beautiful, and it's mutual! 🌟 I'm grateful that you're taking care of your mental health and that you felt comfortable sharing with me. Remember, reaching out for support isn't just brave - it's wise. You deserve all the care and kindness you're seeking."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Relationship and social issues - Aira's thoughtful guidance
    if (message.includes('relationship') || message.includes('friend') || message.includes('family') || message.includes('conflict') || message.includes('argument')) {
      const responses = [
        "Relationships can be so complex and emotionally charged, can't they? 💙 It sounds like you're navigating something challenging with someone important to you. Sometimes when we're in the middle of relationship stress, it helps to step back and think about what we're really needing - is it understanding, space, an apology, or something else entirely?",
        "People relationships are some of the most rewarding and most difficult parts of being human. 🌿 It sounds like you're dealing with some interpersonal challenges right now. What's your heart telling you about this situation? Sometimes our gut instincts know things our minds are still trying to figure out.",
        "I can hear how much this relationship situation is weighing on you. 💫 Conflict with people we care about can feel so unsettling. Have you been able to express how you're feeling to the other person, or does that feel too vulnerable right now? Sometimes just being heard can shift everything."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Work and career stress - Aira's practical empathy
    if (message.includes('work') || message.includes('job') || message.includes('career') || message.includes('boss') || message.includes('colleague')) {
      const responses = [
        "Work stress can really seep into every part of our lives, can't it? 💼 It's hard when something that takes up so much of our time and energy becomes a source of tension. What's the most challenging part of your work situation right now? Sometimes just naming it can help us figure out what we can control and what we might need to accept.",
        "I hear you on the work challenges - that environment can have such a huge impact on our overall wellbeing. 🌸 It sounds like you're dealing with some difficult dynamics there. Have you been able to set any boundaries, or does the situation feel too delicate for that right now?",
        "Work situations can be so tricky because we need our jobs, but we also need our peace of mind, right? 💫 What would taking care of yourself look like in this work context? Maybe it's small things like taking actual lunch breaks, or bigger things like having difficult conversations or exploring other options."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // General supportive responses - Aira's warm presence
    const generalResponses = [
      "I'm really glad you felt comfortable sharing with me today. 💙 Your thoughts and feelings matter, and I'm here to listen to whatever is on your heart. What's been occupying your mind lately?",
      "Thank you for trusting me with what you're going through. 🌸 I can sense there's a lot happening for you right now. Sometimes it helps just to have someone witness our experience without trying to fix anything. I'm here with you.",
      "I appreciate you reaching out and being open with me. 💫 Mental and emotional wellbeing is so important, and I'm honored that you're including me in your self-care journey. What kind of support would feel most helpful to you right now?",
      "Your willingness to check in with yourself and seek support shows such wisdom and self-awareness. 🌿 I'm here to listen, encourage, and walk alongside you through whatever you're facing. What's your heart needing today?",
      "I'm so glad you're here, and I want you to know that whatever you're feeling or going through is valid. 💜 Sometimes we just need someone to sit with us in our experience, and I'm happy to be that presence for you. What would be most helpful to talk about?",
      "It takes courage to reach out and be vulnerable about how we're really doing. 🌟 I see that courage in you, and I'm here to support you however I can. What's been on your mind and heart lately?"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
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

    // Simulate more realistic typing delay based on response length
    setTimeout(() => {
      const response = generateAiraResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2500); // Random delay between 1.5-4 seconds for more natural feel
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickResponses = [
    { text: "I'm feeling anxious today", icon: "😰" },
    { text: "I'm having a good day!", icon: "😊" },
    { text: "I feel overwhelmed", icon: "😵" },
    { text: "I need some motivation", icon: "💪" },
    { text: "I'm feeling lonely", icon: "😔" },
    { text: "I'm grateful for something", icon: "🙏" }
  ];

  return (
    <div className="fixed inset-0 pt-16 bg-gradient-to-br from-brand-50 via-serenity-50 to-tranquil-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-brand-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-8 -right-4 w-96 h-96 bg-serenity-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tranquil-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Sparkles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-brand-400 rounded-full opacity-60 animate-sparkle"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-serenity-400 rounded-full opacity-60 animate-sparkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-tranquil-400 rounded-full opacity-60 animate-sparkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-vitality-400 rounded-full opacity-60 animate-sparkle" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Full Screen Chat Container */}
      <div className="h-full flex flex-col bg-white/95 backdrop-blur-xl shadow-2xl relative z-10">
        
        {/* Compact Header */}
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
                  <h1 className="text-lg sm:text-xl font-bold">Aira - Your AI Companion</h1>
                  <p className="text-white/90 text-xs sm:text-sm">Here to listen, support, and uplift you 💙</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
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
                
                <div className={`rounded-2xl p-3 sm:p-4 shadow-lg backdrop-blur-sm ${
                  message.isUser
                    ? 'bg-gradient-to-r from-brand-500 to-serenity-500 text-white'
                    : 'bg-white/90 text-elegant-800 border border-white/40'
                }`}>
                  <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${message.isUser ? 'text-white/70' : 'text-elegant-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-slide-up">
              <div className="flex items-start space-x-3 max-w-xs sm:max-w-md">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-serenity-500 to-tranquil-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="bg-white/90 rounded-2xl p-3 sm:p-4 shadow-lg backdrop-blur-sm border border-white/40">
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

        {/* Quick Response Buttons */}
        <div className="p-4 max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {quickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputText(response.text);
                  setTimeout(handleSendMessage, 100);
                }}
                className="flex items-center space-x-2 p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span className="text-sm sm:text-base">{response.icon}</span>
                <span className="text-xs sm:text-sm font-medium text-elegant-700 truncate">{response.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
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
                <MessageCircle className="w-3 h-3" />
                <span>Judgment-Free Space</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3" />
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