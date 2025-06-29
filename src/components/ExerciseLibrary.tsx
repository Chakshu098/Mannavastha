import React, { useState } from 'react';
import { Clock, Star, Play, CheckCircle, Filter, Search, Music, BookOpen, Headphones, ExternalLink } from 'lucide-react';
import { exercises } from '../data/exercises';
import { Exercise, ExerciseCompletion, MoodEntry } from '../types';

interface ExerciseLibraryProps {
  completedExercises: ExerciseCompletion[];
  onCompleteExercise: (exerciseId: string, rating: number, notes?: string) => void;
  moodEntries: MoodEntry[];
}

export function ExerciseLibrary({ completedExercises, onCompleteExercise, moodEntries }: ExerciseLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [showBooksModal, setShowBooksModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState('');

  // Get current mood for recommendations
  const latestMood = moodEntries.length > 0 ? moodEntries[moodEntries.length - 1] : null;
  const currentMoodScore = latestMood ? latestMood.mood_score : 5;

  // Music recommendations based on mood
  const getMusicRecommendations = () => {
    if (currentMoodScore >= 8) {
      return [
        { title: "Happy Vibes Playlist", artist: "Spotify", mood: "Uplifting", link: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd" },
        { title: "Feel Good Pop", artist: "Spotify", mood: "Energetic", link: "https://open.spotify.com/playlist/37i9dQZF1DX6GwdWRQMQpq" },
        { title: "Confidence Boost", artist: "Spotify", mood: "Empowering", link: "https://open.spotify.com/playlist/37i9dQZF1DX6GwdWRQMQpq" },
      ];
    } else if (currentMoodScore >= 6) {
      return [
        { title: "Chill Vibes", artist: "Spotify", mood: "Relaxing", link: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
        { title: "Peaceful Piano", artist: "Spotify", mood: "Calm", link: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
        { title: "Nature Sounds", artist: "Spotify", mood: "Meditative", link: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
      ];
    } else {
      return [
        { title: "Healing Music", artist: "Spotify", mood: "Therapeutic", link: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
        { title: "Comfort Songs", artist: "Spotify", mood: "Soothing", link: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
        { title: "Mindfulness Meditation", artist: "Spotify", mood: "Healing", link: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
      ];
    }
  };

  // Book recommendations based on mood with actual reading links
  const getBookRecommendations = () => {
    if (currentMoodScore >= 8) {
      return [
        { 
          title: "The Power of Now", 
          author: "Eckhart Tolle", 
          mood: "Mindfulness", 
          description: "A guide to spiritual enlightenment",
          link: "https://www.goodreads.com/book/show/6708.The_Power_of_Now",
          readingLink: "https://archive.org/details/PowerOfNowEckhartTolle"
        },
        { 
          title: "Atomic Habits", 
          author: "James Clear", 
          mood: "Growth", 
          description: "Build good habits and break bad ones",
          link: "https://www.goodreads.com/book/show/40121378-atomic-habits",
          readingLink: "https://jamesclear.com/atomic-habits"
        },
        { 
          title: "The Happiness Project", 
          author: "Gretchen Rubin", 
          mood: "Joy", 
          description: "A year-long journey to happiness",
          link: "https://www.goodreads.com/book/show/6398634-the-happiness-project",
          readingLink: "https://gretchenrubin.com/books/the-happiness-project/"
        },
      ];
    } else if (currentMoodScore >= 6) {
      return [
        { 
          title: "Mindfulness for Beginners", 
          author: "Jon Kabat-Zinn", 
          mood: "Peace", 
          description: "Introduction to mindfulness meditation",
          link: "https://www.goodreads.com/book/show/14096.Mindfulness_for_Beginners",
          readingLink: "https://www.mindfulnesscds.com/"
        },
        { 
          title: "The Gifts of Imperfection", 
          author: "Brené Brown", 
          mood: "Self-acceptance", 
          description: "Embrace vulnerability and imperfection",
          link: "https://www.goodreads.com/book/show/7015403-the-gifts-of-imperfection",
          readingLink: "https://brenebrown.com/book/the-gifts-of-imperfection/"
        },
        { 
          title: "Wherever You Go, There You Are", 
          author: "Jon Kabat-Zinn", 
          mood: "Presence", 
          description: "Mindfulness meditation in everyday life",
          link: "https://www.goodreads.com/book/show/14096.Wherever_You_Go_There_You_Are",
          readingLink: "https://www.mindfulnesscds.com/"
        },
      ];
    } else {
      return [
        { 
          title: "Feeling Good", 
          author: "David D. Burns", 
          mood: "Healing", 
          description: "The new mood therapy",
          link: "https://www.goodreads.com/book/show/46674.Feeling_Good",
          readingLink: "https://feelinggood.com/"
        },
        { 
          title: "The Body Keeps the Score", 
          author: "Bessel van der Kolk", 
          mood: "Recovery", 
          description: "Brain, mind, and body in healing trauma",
          link: "https://www.goodreads.com/book/show/18693771-the-body-keeps-the-score",
          readingLink: "https://www.besselvanderkolk.com/"
        },
        { 
          title: "Self-Compassion", 
          author: "Kristin Neff", 
          mood: "Kindness", 
          description: "The proven power of being kind to yourself",
          link: "https://www.goodreads.com/book/show/10127008-self-compassion",
          readingLink: "https://self-compassion.org/"
        },
      ];
    }
  };

  const categories = [
    { id: 'all', label: 'All Exercises' },
    { id: 'breathing', label: 'Breathing' },
    { id: 'meditation', label: 'Meditation' },
    { id: 'journaling', label: 'Journaling' },
    { id: 'movement', label: 'Movement' }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isExerciseCompleted = (exerciseId: string) => {
    const today = new Date().toISOString().split('T')[0];
    return completedExercises.some(completion => 
      completion.exercise_id === exerciseId && 
      completion.completed_at.startsWith(today)
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-brand-100 text-brand-800';
      case 'intermediate': return 'bg-serenity-100 text-serenity-800';
      case 'advanced': return 'bg-vitality-100 text-vitality-800';
      default: return 'bg-elegant-100 text-elegant-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'breathing': return '🫁';
      case 'meditation': return '🧘';
      case 'journaling': return '📝';
      case 'movement': return '🚶';
      default: return '✨';
    }
  };

  const handleStartExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const handleCompleteExercise = () => {
    if (selectedExercise) {
      onCompleteExercise(selectedExercise.id, rating, notes.trim() || undefined);
      setShowCompletionModal(false);
      setSelectedExercise(null);
      setRating(5);
      setNotes('');
    }
  };

  const ExerciseModal = ({ exercise }: { exercise: Exercise }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-elegant-100">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-elegant-900 mb-2">{exercise.title}</h3>
              <p className="text-elegant-600">{exercise.description}</p>
            </div>
            <button
              onClick={() => setSelectedExercise(null)}
              className="text-elegant-400 hover:text-elegant-600 text-xl"
            >
              ×
            </button>
          </div>
          
          <div className="flex items-center space-x-4 mt-4">
            <span className="text-2xl">{getCategoryIcon(exercise.category)}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
              {exercise.difficulty}
            </span>
            <div className="flex items-center text-elegant-600">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">{exercise.duration} min</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold text-elegant-900 mb-3">Instructions</h4>
            <ol className="space-y-2">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-elegant-700">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h4 className="font-semibold text-elegant-900 mb-3">Benefits</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {exercise.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-500" />
                  <span className="text-sm text-elegant-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowCompletionModal(true)}
              className="flex-1 bg-brand-500 text-white py-3 px-4 rounded-lg hover:bg-brand-600 transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Complete Exercise</span>
            </button>
            <button
              onClick={() => setSelectedExercise(null)}
              className="px-6 py-3 border border-elegant-300 text-elegant-700 rounded-lg hover:bg-elegant-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CompletionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-elegant-900 mb-4">How was your experience?</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-elegant-700 mb-2">
              Rating (1-5 stars)
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? 'text-serenity-400' : 'text-elegant-300'}`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="completion-notes" className="block text-sm font-medium text-elegant-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="completion-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did this exercise make you feel?"
              rows={3}
              className="w-full px-3 py-2 border border-elegant-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleCompleteExercise}
              className="flex-1 bg-brand-500 text-white py-2 px-4 rounded-lg hover:bg-brand-600 transition-colors"
            >
              Submit
            </button>
            <button
              onClick={() => setShowCompletionModal(false)}
              className="px-6 py-2 border border-elegant-300 text-elegant-700 rounded-lg hover:bg-elegant-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MusicModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-elegant-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-brand-500 to-serenity-500 rounded-xl">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-elegant-900">Music for Your Mood</h3>
            </div>
            <button
              onClick={() => setShowMusicModal(false)}
              className="text-elegant-400 hover:text-elegant-600 text-xl"
            >
              ×
            </button>
          </div>
          <p className="text-elegant-600 mt-2">
            Based on your current mood score: {currentMoodScore}/10
          </p>
        </div>

        <div className="p-6 space-y-4">
          {getMusicRecommendations().map((music, index) => (
            <div key={index} className="p-4 border border-elegant-200 rounded-xl hover:bg-elegant-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-serenity-500 rounded-xl flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-elegant-900">{music.title}</h4>
                    <p className="text-sm text-elegant-600">{music.artist}</p>
                    <span className="inline-block px-2 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-medium mt-1">
                      {music.mood}
                    </span>
                  </div>
                </div>
                <a
                  href={music.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Listen</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BooksModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-elegant-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-serenity-500 to-tranquil-500 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-elegant-900">Books for Your Journey</h3>
            </div>
            <button
              onClick={() => setShowBooksModal(false)}
              className="text-elegant-400 hover:text-elegant-600 text-xl"
            >
              ×
            </button>
          </div>
          <p className="text-elegant-600 mt-2">
            Curated reading recommendations based on your current mood: {currentMoodScore}/10
          </p>
        </div>

        <div className="p-6 space-y-4">
          {getBookRecommendations().map((book, index) => (
            <div key={index} className="p-4 border border-elegant-200 rounded-xl hover:bg-elegant-50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-serenity-500 to-tranquil-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-elegant-900">{book.title}</h4>
                  <p className="text-sm text-elegant-600 mb-1">by {book.author}</p>
                  <p className="text-sm text-elegant-700 mb-2">{book.description}</p>
                  <span className="inline-block px-2 py-1 bg-serenity-100 text-serenity-700 rounded-full text-xs font-medium mb-3">
                    {book.mood}
                  </span>
                  <div className="flex space-x-2">
                    <a
                      href={book.readingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-serenity-500 text-white px-3 py-1 rounded-lg hover:bg-serenity-600 transition-colors text-sm"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Read Online</span>
                    </a>
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-elegant-100 text-elegant-700 px-3 py-1 rounded-lg hover:bg-elegant-200 transition-colors text-sm"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Reviews</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-elegant-900">Wellness Studio</h2>
          <p className="text-elegant-600">Guided activities, music, and books to support your mental health</p>
        </div>
        
        {/* Mood-based recommendations */}
        <div className="flex space-x-3">
          <button
            onClick={() => setShowMusicModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-brand-500 to-serenity-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Music className="w-4 h-4" />
            <span>Music for Mood</span>
          </button>
          <button
            onClick={() => setShowBooksModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-serenity-500 to-tranquil-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <BookOpen className="w-4 h-4" />
            <span>Reading List</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elegant-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-elegant-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-elegant-400" />
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-brand-500 text-white'
                  : 'bg-elegant-100 text-elegant-700 hover:bg-elegant-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => {
          const completed = isExerciseCompleted(exercise.id);
          
          return (
            <div
              key={exercise.id}
              className={`bg-white rounded-xl p-6 shadow-sm border transition-all hover:shadow-md ${
                completed ? 'border-brand-200 bg-brand-50' : 'border-elegant-100'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getCategoryIcon(exercise.category)}</span>
                  <div>
                    <h3 className="font-semibold text-elegant-900">{exercise.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
                {completed && <CheckCircle className="w-5 h-5 text-brand-500" />}
              </div>

              <p className="text-elegant-600 text-sm mb-4 line-clamp-2">{exercise.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-elegant-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{exercise.duration} min</span>
                </div>
              </div>

              <button
                onClick={() => handleStartExercise(exercise)}
                className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
                  completed
                    ? 'bg-brand-100 text-brand-700 hover:bg-brand-200'
                    : 'bg-brand-500 text-white hover:bg-brand-600'
                }`}
              >
                <Play className="w-4 h-4" />
                <span>{completed ? 'Practice Again' : 'Start Exercise'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {selectedExercise && <ExerciseModal exercise={selectedExercise} />}
      {showCompletionModal && <CompletionModal />}
      {showMusicModal && <MusicModal />}
      {showBooksModal && <BooksModal />}
    </div>
  );
}