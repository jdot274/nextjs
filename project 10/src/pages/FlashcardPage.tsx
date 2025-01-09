import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Undo2, Check, X, Sparkles, Code } from 'lucide-react';
import PageLogo from '../components/PageLogo';
import Navigation from '../components/Navigation';
import { FlashcardBackground } from '../components/FlashcardBackground';
import { useDevMode } from '../contexts/DevModeContext';
import EditableText from '../components/EditableText';
import { mathFlashcards } from '../data/mathFlashcards';
import type { Flashcard } from '@/types/practice';

const readingFlashcards: Flashcard[] = [
  {
    question: "A car manufacturer produces x cars per day. After upgrading their equipment, daily production increased by 25%. Which equation represents the new daily production?",
    options: [
      "0.25x",
      "1.25x",
      "2.5x",
      "x + 25"
    ],
    correctAnswer: "B",
    answer: "The new production quantity represents 100% of the original amount plus a 25% increase. This means we need 125% of the original amount. We can write this as a decimal by dividing 125 by 100, giving us 1.25. Therefore, the new daily production is 1.25x cars. While option A (0.25x) represents just the increase, and option D (x + 25) incorrectly adds 25 as a number rather than a percentage, 1.25x correctly captures the entire new quantity."
  },
  // ... rest of the original readingFlashcards array remains the same
];

const FlashcardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDevMode, toggleDevMode } = useDevMode();
  const { title, color } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());

  const flashcards = title === 'Math' ? mathFlashcards : readingFlashcards;

  const handleCardClick = () => {
    if (showAnswer) {
      setIsFlipping(true);
      setTimeout(() => {
        setShowAnswer(false);
        setIsFlipping(false);
      }, 150);
      return;
    }

    setIsFlipping(true);
    setTimeout(() => {
      setShowAnswer(true);
      setIsFlipping(false);
    }, 150);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const handleKnown = () => {
    const newKnown = new Set(knownCards);
    newKnown.add(currentIndex);
    setKnownCards(newKnown);
    handleNext();
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setKnownCards(new Set());
    setShowAnswer(false);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setIsFlipping(true);
    setTimeout(() => {
      setShowAnswer(true);
      setIsFlipping(false);
    }, 150);
  };

  const handleOptionClick = (index: number) => {
    setSelectedAnswer(String.fromCharCode(65 + index)); // Convert 0-3 to A-D
  };
  
  const handleTopicClick = (topic: string) => {
    setSelectedTopics(prev => {
      const newTopics = new Set(prev);
      if (newTopics.has(topic)) {
        newTopics.delete(topic);
      } else {
        newTopics.add(topic);
      }
      return newTopics;
    });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950
                    flex flex-col relative overflow-hidden">
      <PageLogo />
      <FlashcardBackground />

      <Navigation />

      <main className="flex-1 relative z-10 container mx-auto px-4 py-4 overflow-hidden">
        {/* Dev Mode Toggle */}
        <button
          onClick={toggleDevMode}
          className="fixed top-24 right-8 z-50 p-2 bg-white/5 border border-white/10 rounded-lg
                   hover:bg-white/10 transition-colors"
        >
          <Code className={`w-5 h-5 ${isDevMode ? 'text-green-400' : 'text-white/60'}`} />
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 
                         rounded-xl blur opacity-75 group-hover:opacity-100 animate-pulse" />
            <div className="relative px-12 py-4 bg-gradient-to-r from-blue-600/20 via-purple-500/20 to-blue-400/20 
                         backdrop-blur-xl rounded-xl border border-blue-500/30">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-purple-200 to-blue-100 
                         bg-clip-text text-transparent flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
                Flash Cards
                <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/60">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {flashcards.length} cards
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {knownCards.size} mastered
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${color || 'from-blue-600 to-blue-400'} 
                       transition-all duration-300 animate-pulse`}
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors"
            >
              <Undo2 className="w-4 h-4" />
              <span>Reset Progress</span>
            </button>
            <span className="text-sm text-white/60">
              Card {currentIndex + 1} of {flashcards.length}
            </span>
          </div>
        </div>

        {/* Flashcard */}
        <div 
          onClick={handleCardClick}
          className="max-w-3xl mx-auto aspect-[3/2.2] perspective-1000 cursor-pointer"
        >
          <div className={`relative w-full h-full transition-all duration-500 transform-style-preserve-3d
                        ${isFlipping ? 'rotate-y-180 scale-95' : 'rotate-y-0 scale-100'}`}>
            {/* Front */}
            <div className="absolute inset-0 backdrop-blur-xl bg-white/5 rounded-3xl p-8 
                         border border-white/10 flex flex-col shadow-2xl backface-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
              {!showAnswer ? (
                <div className="relative w-full flex-1">
                  <div className="flex justify-between mb-8">
                    <h2 className="text-4xl font-bold text-white/90">Question 1</h2>
                    <div className="flex gap-2">
                      <span className="px-4 py-1 rounded-full bg-blue-500/20 text-blue-400 font-medium">
                        {flashcards[currentIndex].topic}
                      </span>
                      <span className="px-4 py-1 rounded-full bg-white/10 text-white/60 font-medium">
                        {flashcards[currentIndex].difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <EditableText
                      text={flashcards[currentIndex].question}
                      className="text-xl text-white/90"
                    />
                    <div className="space-y-2 flex flex-col items-stretch w-full max-w-[30%]">
                      {flashcards[currentIndex].options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOptionClick(index);
                          }}>
                        <EditableText
                          text={option}
                          className={`text-left px-4 py-2 rounded-lg text-base transition-all duration-200
                                    ${selectedAnswer === String.fromCharCode(65 + index)
                                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                      : 'bg-white/5 border-white/10 text-white/90 hover:bg-white/10'
                                    } border backdrop-blur-sm w-full`}
                        />
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubmit();
                      }}
                      disabled={selectedAnswer === null}
                      className={`mt-8 px-6 py-3 rounded-lg text-base font-medium transition-all duration-200
                                ${selectedAnswer !== null
                                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                                  : 'bg-white/5 text-white/40 cursor-not-allowed'
                                }`}
                    >
                      Submit Answer
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative flex flex-col items-start text-left">
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 
                                bg-clip-text text-transparent mb-6">
                      {selectedAnswer === null
                        ? 'No answer selected'
                        : selectedAnswer === flashcards[currentIndex].correctAnswer 
                        ? 'Correct!' 
                        : 'Incorrect'}
                    </h2>
                    <p className="text-2xl font-bold text-white">
                      {selectedAnswer !== null && selectedAnswer !== flashcards[currentIndex].correctAnswer && (
                        <span className="text-red-400">
                          Your answer: ({selectedAnswer}) {flashcards[currentIndex].options?.[
                            selectedAnswer?.charCodeAt(0)! - 65
                          ]}<br />
                        </span>
                      )}
                      <span className="text-green-400">
                        Correct answer: ({flashcards[currentIndex].correctAnswer}) {flashcards[currentIndex].options?.[flashcards[currentIndex].correctAnswer?.charCodeAt(0)! - 65]}
                      </span>
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                      Explanation
                    </h3>
                    <EditableText
                      text={flashcards[currentIndex].answer}
                      className="text-lg text-white/90 leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* Back */}
            <div className="absolute inset-0 backdrop-blur-xl bg-white/5 rounded-3xl p-8 
                         border border-white/10 flex flex-col shadow-2xl backface-hidden rotate-y-180">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
              <div className="relative flex flex-col items-start text-left">
                <EditableText
                  text={flashcards[currentIndex].answer}
                  className="text-lg text-white/90 leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="max-w-3xl mx-auto mt-12 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg
                     text-white/90 hover:bg-white/10 transition-all disabled:opacity-50
                     hover:scale-105 active:scale-95 disabled:hover:scale-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => handleNext()}
              className="p-4 rounded-2xl backdrop-blur-xl bg-red-500/10 border border-red-500/20 shadow-lg
                       text-red-400 hover:bg-red-500/20 transition-all
                       hover:scale-105 active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={handleKnown}
              className="p-4 rounded-2xl backdrop-blur-xl bg-green-500/10 border border-green-500/20 shadow-lg
                       text-green-400 hover:bg-green-500/20 transition-all
                       hover:scale-105 active:scale-95"
            >
              <Check className="w-6 h-6" />
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg
                     text-white/90 hover:bg-white/10 transition-all disabled:opacity-50
                     hover:scale-105 active:scale-95 disabled:hover:scale-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default FlashcardPage;