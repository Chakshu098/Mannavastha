import React, { useState } from 'react';
import { Calendar, Tag, Save, Smile, Frown, Meh, MapPin, Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';
import { MoodEntry } from '../types';
import { format } from 'date-fns';

interface MoodLoggerProps {
  onSaveMood: (mood: Omit<MoodEntry, 'id' | 'user_id' | 'created_at'>) => void;
}

export function MoodLogger({ onSaveMood }: MoodLoggerProps) {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [moodScore, setMoodScore] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [anxietyLevel, setAnxietyLevel] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(7);
  const [stressLevel, setStressLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [weather, setWeather] = useState('');
  const [location, setLocation] = useState('');

  const commonTags = [
    'work', 'family', 'relationships', 'health', 'sleep', 'exercise',
    'social', 'money', 'weather', 'travel', 'food', 'hobbies'
  ];

  const weatherOptions = [
    { value: 'sunny', label: 'Sunny', icon: Sun },
    { value: 'cloudy', label: 'Cloudy', icon: Cloud },
    { value: 'rainy', label: 'Rainy', icon: CloudRain },
    { value: 'snowy', label: 'Snowy', icon: Snowflake },
  ];

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddCustomTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const moodEntry: Omit<MoodEntry, 'id' | 'user_id' | 'created_at'> = {
      date,
      mood_score: moodScore,
      energy_level: energyLevel,
      anxiety_level: anxietyLevel,
      stress_level: stressLevel,
      sleep_quality: sleepQuality,
      notes: notes.trim() || undefined,
      tags,
      weather: weather || undefined,
      location: location.trim() || undefined
    };

    onSaveMood(moodEntry);
    
    // Reset form
    setNotes('');
    setTags([]);
    setWeather('');
    setLocation('');
    // Keep sliders at current values for convenience
  };

  const getMoodIcon = (score: number) => {
    if (score <= 3) return <Frown className="w-6 h-6 text-vitality-500" />;
    if (score <= 7) return <Meh className="w-6 h-6 text-mindful-500" />;
    return <Smile className="w-6 h-6 text-brand-500" />;
  };

  const getSliderStyle = (value: number, type: 'mood' | 'energy' | 'anxiety' | 'stress' | 'sleep') => {
    const baseStyle = "w-full h-4 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:scale-105";
    
    switch (type) {
      case 'mood':
        return `${baseStyle} bg-gradient-to-r from-vitality-400 via-mindful-400 via-brand-400 to-serenity-500`;
      case 'energy':
        return `${baseStyle} bg-gradient-to-r from-tranquil-400 via-serenity-400 via-brand-400 to-vitality-500`;
      case 'anxiety':
        return `${baseStyle} bg-gradient-to-r from-serenity-400 via-mindful-400 via-vitality-400 to-vitality-500`;
      case 'stress':
        return `${baseStyle} bg-gradient-to-r from-brand-400 via-tranquil-400 via-mindful-400 to-vitality-500`;
      case 'sleep':
        return `${baseStyle} bg-gradient-to-r from-tranquil-400 via-serenity-400 via-brand-400 to-mindful-500`;
      default:
        return baseStyle;
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-brand-500 to-serenity-500 rounded-2xl shadow-lg">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-600 to-serenity-600 bg-clip-text text-transparent">
            Daily Mood Check-in
          </h2>
          <p className="text-elegant-600">Track your wellness journey with detailed insights</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Date and Context */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-elegant-700 mb-3">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-elegant-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white/90 backdrop-blur-sm"
              max={format(new Date(), 'yyyy-MM-dd')}
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-elegant-700 mb-3">
              Location (Optional)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elegant-400 w-5 h-5" />
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where are you today?"
                className="w-full pl-10 pr-4 py-3 border border-elegant-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white/90 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Weather */}
        <div>
          <label className="block text-sm font-semibold text-elegant-700 mb-3">
            Weather Today
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {weatherOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setWeather(weather === option.value ? '' : option.value)}
                  className={`flex items-center space-x-2 p-3 rounded-xl border-2 transition-all duration-300 ${
                    weather === option.value
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-elegant-200 hover:border-elegant-300 text-elegant-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mood Tracking Sliders */}
        <div className="space-y-8">
          {/* Mood Score */}
          <div className="bg-gradient-to-r from-brand-50 via-serenity-50 to-tranquil-50 p-6 rounded-2xl border border-elegant-100">
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-semibold text-elegant-800">
                Overall Mood: {moodScore}/10
              </label>
              <div className="flex items-center space-x-2">
                {getMoodIcon(moodScore)}
                <span className="text-2xl">
                  {moodScore <= 3 ? '😢' : moodScore <= 7 ? '😐' : '😊'}
                </span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={moodScore}
              onChange={(e) => setMoodScore(Number(e.target.value))}
              className={getSliderStyle(moodScore, 'mood')}
            />
            <div className="flex justify-between text-xs text-elegant-500 mt-2">
              <span>Very Low</span>
              <span>Neutral</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Energy Level */}
          <div className="bg-gradient-to-r from-serenity-50 via-tranquil-50 to-brand-50 p-6 rounded-2xl border border-elegant-100">
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-semibold text-elegant-800">
                Energy Level: {energyLevel}/10
              </label>
              <span className="text-2xl">
                {energyLevel <= 3 ? '😴' : energyLevel <= 7 ? '😌' : '⚡'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className={getSliderStyle(energyLevel, 'energy')}
            />
            <div className="flex justify-between text-xs text-elegant-500 mt-2">
              <span>Exhausted</span>
              <span>Moderate</span>
              <span>Energized</span>
            </div>
          </div>

          {/* Anxiety Level */}
          <div className="bg-gradient-to-r from-tranquil-50 via-brand-50 to-serenity-50 p-6 rounded-2xl border border-elegant-100">
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-semibold text-elegant-800">
                Anxiety Level: {anxietyLevel}/10
              </label>
              <span className="text-2xl">
                {anxietyLevel <= 3 ? '😌' : anxietyLevel <= 7 ? '😰' : '😱'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={anxietyLevel}
              onChange={(e) => setAnxietyLevel(Number(e.target.value))}
              className={getSliderStyle(anxietyLevel, 'anxiety')}
            />
            <div className="flex justify-between text-xs text-elegant-500 mt-2">
              <span>Very Calm</span>
              <span>Some Anxiety</span>
              <span>Very Anxious</span>
            </div>
          </div>

          {/* Stress Level */}
          <div className="bg-gradient-to-r from-brand-50 via-mindful-50 to-vitality-50 p-6 rounded-2xl border border-elegant-100">
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-semibold text-elegant-800">
                Stress Level: {stressLevel}/10
              </label>
              <span className="text-2xl">
                {stressLevel <= 3 ? '😎' : stressLevel <= 7 ? '😤' : '🤯'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(Number(e.target.value))}
              className={getSliderStyle(stressLevel, 'stress')}
            />
            <div className="flex justify-between text-xs text-elegant-500 mt-2">
              <span>No Stress</span>
              <span>Manageable</span>
              <span>Overwhelming</span>
            </div>
          </div>

          {/* Sleep Quality */}
          <div className="bg-gradient-to-r from-tranquil-50 via-serenity-50 to-brand-50 p-6 rounded-2xl border border-elegant-100">
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-semibold text-elegant-800">
                Sleep Quality: {sleepQuality}/10
              </label>
              <span className="text-2xl">
                {sleepQuality <= 3 ? '😵' : sleepQuality <= 7 ? '😪' : '😴'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={sleepQuality}
              onChange={(e) => setSleepQuality(Number(e.target.value))}
              className={getSliderStyle(sleepQuality, 'sleep')}
            />
            <div className="flex justify-between text-xs text-elegant-500 mt-2">
              <span>Terrible</span>
              <span>Average</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-lg font-semibold text-elegant-800 mb-4">
            What's affecting your mood today?
          </label>
          
          {/* Common Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {commonTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  tags.includes(tag)
                    ? 'bg-gradient-to-r from-brand-500 to-serenity-500 text-white shadow-lg'
                    : 'bg-elegant-100 text-elegant-700 hover:bg-elegant-200 hover:scale-105'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Custom Tag Input */}
          <div className="flex space-x-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add custom tag..."
              className="flex-1 px-4 py-3 border border-elegant-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white/90 backdrop-blur-sm"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomTag())}
            />
            <button
              type="button"
              onClick={handleAddCustomTag}
              className="px-6 py-3 bg-gradient-to-r from-elegant-100 to-elegant-200 text-elegant-700 rounded-xl hover:from-elegant-200 hover:to-elegant-300 transition-all duration-300 flex items-center space-x-2"
            >
              <Tag className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Selected Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-100 to-serenity-100 text-brand-800 rounded-full text-sm font-medium border border-brand-200"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-brand-600 hover:text-brand-800 text-lg"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-lg font-semibold text-elegant-800 mb-3">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How are you feeling? What happened today that affected your mood? Any insights or reflections..."
            rows={4}
            className="w-full px-4 py-3 border border-elegant-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none bg-white/90 backdrop-blur-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-brand-500 via-serenity-500 to-tranquil-500 text-white py-4 px-6 rounded-2xl hover:shadow-2xl transition-all duration-300 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 text-lg font-semibold hover:scale-105"
        >
          <Save className="w-6 h-6" />
          <span>Save Mood Entry & Earn Points</span>
          <span className="bg-white/20 px-2 py-1 rounded-full text-sm">+15 pts</span>
        </button>
      </form>
    </div>
  );
}