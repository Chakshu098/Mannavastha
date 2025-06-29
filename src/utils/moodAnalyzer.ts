import { MoodEntry } from '../types';
import { subDays, format, parseISO, isAfter, isBefore } from 'date-fns';

export class MoodAnalyzer {
  static analyzeTrend(entries: MoodEntry[], days: number = 7): 'improving' | 'stable' | 'declining' {
    if (entries.length < 3) return 'stable';

    const recentEntries = entries
      .filter(entry => isAfter(parseISO(entry.date), subDays(new Date(), days)))
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

    if (recentEntries.length < 3) return 'stable';

    const firstHalf = recentEntries.slice(0, Math.floor(recentEntries.length / 2));
    const secondHalf = recentEntries.slice(Math.floor(recentEntries.length / 2));

    const firstAvg = firstHalf.reduce((sum, entry) => sum + entry.mood_score, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, entry) => sum + entry.mood_score, 0) / secondHalf.length;

    const difference = secondAvg - firstAvg;

    if (difference > 0.5) return 'improving';
    if (difference < -0.5) return 'declining';
    return 'stable';
  }

  static identifyTriggers(entries: MoodEntry[]): string[] {
    const lowMoodEntries = entries.filter(entry => entry.mood_score <= 4);
    const allTags = lowMoodEntries.flatMap(entry => entry.tags);
    
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tagCounts)
      .filter(([_, count]) => count >= 2)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 5)
      .map(([tag]) => tag);
  }

  static generateInsights(entries: MoodEntry[]): string[] {
    const insights: string[] = [];
    
    if (entries.length === 0) {
      insights.push("Start logging your daily mood to receive personalized insights.");
      return insights;
    }

    const recentEntries = entries.slice(-7);
    const avgMood = recentEntries.reduce((sum, entry) => sum + entry.mood_score, 0) / recentEntries.length;
    const avgEnergy = recentEntries.reduce((sum, entry) => sum + entry.energy_level, 0) / recentEntries.length;
    const avgAnxiety = recentEntries.reduce((sum, entry) => sum + entry.anxiety_level, 0) / recentEntries.length;

    if (avgMood >= 7) {
      insights.push("Your mood has been consistently positive this week. Keep up the great work!");
    } else if (avgMood <= 4) {
      insights.push("Your mood has been lower than usual. Consider reaching out to a mental health professional.");
    }

    if (avgEnergy <= 4) {
      insights.push("Your energy levels seem low. Try incorporating gentle movement or breathing exercises.");
    }

    if (avgAnxiety >= 6) {
      insights.push("Your anxiety levels have been elevated. Meditation and mindfulness exercises might help.");
    }

    const trend = this.analyzeTrend(entries);
    if (trend === 'improving') {
      insights.push("Great news! Your overall mood trend is improving over time.");
    } else if (trend === 'declining') {
      insights.push("Your mood trend shows some decline. Consider focusing on self-care activities.");
    }

    return insights;
  }

  static predictRisk(entries: MoodEntry[]): 'low' | 'medium' | 'high' {
    if (entries.length < 5) return 'low';

    const recentEntries = entries.slice(-5);
    const avgMood = recentEntries.reduce((sum, entry) => sum + entry.mood_score, 0) / recentEntries.length;
    const avgAnxiety = recentEntries.reduce((sum, entry) => sum + entry.anxiety_level, 0) / recentEntries.length;
    
    const lowMoodDays = recentEntries.filter(entry => entry.mood_score <= 3).length;
    const highAnxietyDays = recentEntries.filter(entry => entry.anxiety_level >= 7).length;

    if (lowMoodDays >= 3 || highAnxietyDays >= 3 || avgMood <= 3) {
      return 'high';
    } else if (avgMood <= 5 || avgAnxiety >= 6) {
      return 'medium';
    }
    
    return 'low';
  }
}