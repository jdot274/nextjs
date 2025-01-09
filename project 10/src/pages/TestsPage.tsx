import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Timer, Flag, BookOpen, Download, ChevronDown, BookText, GraduationCap } from 'lucide-react';
import Navigation from '../components/Navigation';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  status: 'unanswered' | 'answered' | 'flagged' | 'current';
}

const TestViewer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const totalPages = 4;
  const [timeLeft, setTimeLeft] = useState(65 * 60); // 65 minutes in seconds
  const difficulty = 'Medium';

  const handleDownload = () => {
    if (!selectedTest) return;
    // In a real app, this would trigger the actual PDF download
    console.log(`Downloading ${selectedTest}`);
    setShowDownloadDropdown(false);
    setSelectedTest(null);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  const [questions] = useState<Question[]>(
    Array.from({ length: 52 }, (_, i) => ({
      id: i + 1,
      status: i === 2 ? 'current' : i < 2 ? 'answered' : 'unanswered'
    }))
  );
  const [currentQuestion, setCurrentQuestion] = useState(3);

  const handleQuestionClick = (questionId: number) => {
    setCurrentQuestion(questionId);
  };

  return ( 
    <div className="flex-1 flex flex-col relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute w-[200vw] h-[100vh] -top-[30vh] -left-[50vw] 
                      bg-gradient-to-b from-blue-400/30 via-blue-600/10 to-transparent
                      blur-3xl transform -rotate-12" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/70 to-slate-950" />
      </div>

      {/* Header */}
      <div className="relative z-50">
        <Navigation />
      </div>
      <header className="relative z-10 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-2 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Download Button */}
            <div className="relative">
              <button
                onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                className="px-4 py-2 backdrop-blur-md bg-white/10 rounded-lg border border-white/20
                         flex items-center gap-2 hover:bg-white/20 transition-colors"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400">Download Test</span>
                <ChevronDown className={`w-4 h-4 text-blue-400 transition-transform duration-300 ${
                  showDownloadDropdown ? 'rotate-180' : ''
                }`} />
              </button>

              {showDownloadDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 backdrop-blur-xl bg-white/5 
                             rounded-xl border border-white/10 overflow-hidden z-50">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedTest(`SAT Practice Test #${i + 1}`);
                        handleDownload();
                      }}
                      className="w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 
                               transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4 text-blue-400" />
                      SAT Practice Test #{i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Timer */}
            <div className="backdrop-blur-md bg-white/10 px-4 py-2 rounded-lg
                        border border-white/20">
              <Timer className="h-3 w-3 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* External Practice Tests */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-white mb-6">External Practice Tests</h2>
        <div className="grid grid-cols-3 gap-6">
          {/* College Board */}
          <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10
                       hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center justify-center w-16 h-16 mb-4 mx-auto
                         bg-gradient-to-br from-blue-500/20 to-blue-400/20
                         rounded-xl border border-blue-500/30">
              <BookText className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white text-center mb-2">College Board</h3>
            <p className="text-sm text-white/60 text-center">Official SAT practice tests and study materials</p>
          </div>

          {/* Princeton Review */}
          <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10
                       hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center justify-center w-16 h-16 mb-4 mx-auto
                         bg-gradient-to-br from-orange-500/20 to-orange-400/20
                         rounded-xl border border-orange-500/30">
              <GraduationCap className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-lg font-bold text-white text-center mb-2">The Princeton Review</h3>
            <p className="text-sm text-white/60 text-center">Premium practice tests and expert strategies</p>
          </div>

          {/* Kaplan */}
          <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10
                       hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center justify-center w-16 h-16 mb-4 mx-auto
                         bg-gradient-to-br from-purple-500/20 to-purple-400/20
                         rounded-xl border border-purple-500/30">
              <BookText className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white text-center mb-2">Kaplan</h3>
            <p className="text-sm text-white/60 text-center">Comprehensive test prep and practice materials</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container flex flex-1 relative z-10">
        {/* Left Sidebar - Question Navigator */}
        <div className="w-32 backdrop-blur-md bg-white/5 border-r border-white/10 p-2 sticky top-0 h-[calc(100vh-8rem)]
                     flex flex-col">
          <h2 className="text-xs font-semibold mb-2 text-white/90">Questions</h2>
          <div className="space-y-1.5 pr-2 flex-1 overflow-y-auto custom-scrollbar">
            {questions.map((question) => (
              <button
                key={question.id}
                onClick={() => handleQuestionClick(question.id)}
                className={cn(
                  "flex items-center w-full gap-1 p-1 rounded-md transition-all duration-200",
                  "hover:bg-white/10",
                  question.id === currentQuestion && "bg-white/10"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-200 text-xs",
                  question.status === 'current' && "bg-blue-600 text-white border-blue-600",
                  question.status === 'answered' && "bg-green-500/20 text-green-400 border-green-500/30",
                  question.status === 'flagged' && "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                  question.status === 'unanswered' && "bg-white/5 text-white/70 border-white/20"
                )}>
                  {question.id}
                </div>
                <span className="text-xs transition-colors duration-200">
                  Question {question.id}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Toolbar */}
          <div className="backdrop-blur-md bg-white/5 border-b border-white/10 p-2 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-white/70">Page {currentPage} of {totalPages}</span>
              <button className="p-1 hover:bg-white/10 rounded transition-colors">
                <ChevronLeft className="h-3 w-3 text-white/70" />
              </button>
              <button className="p-1 hover:bg-white/10 rounded transition-colors">
                <ChevronRight className="h-3 w-3 text-white/70" />
              </button>
            </div>
          </div>

          {/* PDF Content Area */}
          <div className="flex-1 overflow-y-auto bg-slate-950/50 p-2 relative flex flex-col gap-2 custom-scrollbar">
            {/* Reading Test Panel */}
            <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-lg overflow-hidden
                         border border-white/10 p-2">
              <div className="text-white/90">
                <h2 className="text-sm font-bold mb-1 text-white">Reading Test</h2>
                <p className="text-xs text-white/70">65 MINUTES, 52 QUESTIONS</p>
              </div>
            </div>

            {/* Module Header */}
            <div className="bg-gradient-to-r from-slate-300 to-slate-400 rounded-lg overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-8 py-4">
                <span className="text-6xl font-bold text-slate-800">1</span>
                <div className="flex flex-col items-center">
                  <span className="text-xl text-slate-700">Module</span>
                  <span className="text-4xl font-bold text-slate-800">1</span>
                </div>
                <span className="text-6xl font-bold text-slate-800">1</span>
              </div>
            </div>

            {/* Section Title and Questions */}
            <div className="bg-gradient-to-r from-slate-300 to-slate-400 rounded-lg p-8 shadow-lg">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Reading and Writing</h1>
              <h2 className="text-2xl font-bold text-slate-700 mb-8">33 QUESTIONS</h2>
              
              <div className="bg-slate-600/20 border border-slate-600/30 text-slate-700 text-sm font-bold px-4 py-1 inline-block mb-4 rounded">
                DIRECTIONS
              </div>
              
              <p className="text-slate-700 text-lg mb-4">
                The questions in this section address a number of important reading and writing skills. Each
                question includes one or more passages, which may include a table or graph. Read each passage
                and question carefully, and then choose the best answer to the question based on the passage(s).
              </p>
              
              <p className="text-slate-700 text-lg">
                All questions in this section are multiple-choice with four answer choices. Each question has a
                single best answer.
              </p>
            </div>

            {/* Questions Panel */}
            <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-lg overflow-hidden
                         border border-white/10 p-3">
              <div className="flex items-center mb-4">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 border border-yellow-500/30 text-white">
                  {difficulty}
                </span>
              </div>
              <div className="text-white/90">
                <div className="space-y-4 mb-6">
                  <p className="text-xs leading-relaxed">
                    This passage is adapted from "The Enigma of Time" by Dr. Sarah Chen, 
                    published in 2023. The article discusses recent developments in our 
                    understanding of temporal mechanics.
                  </p>
                  <p className="text-xs leading-relaxed">
                    The concept of time has puzzled philosophers and scientists for millennia. 
                    While we experience time as a continuous flow from past to future, modern 
                    physics suggests a more complex reality. Einstein's theory of relativity 
                    showed that time is not absolute but relative, varying with motion and 
                    gravity. This revolutionary insight challenged our fundamental assumptions 
                    about the nature of reality.
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Question 1</h3>
                </div>
                <div className="border-l-2 border-blue-500/30 pl-2">
                  <p className="text-xs mb-2">
                    The main purpose of the passage is to:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" name="q1" id="q1a" className="mr-1 w-3 h-3 accent-blue-500" />
                      <label htmlFor="q1a" className="text-xs">Present a historical overview of time measurement</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" name="q1" id="q1b" className="mr-1 w-3 h-3 accent-blue-500" />
                      <label htmlFor="q1b" className="text-xs">Explain modern physics' view of time</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" name="q1" id="q1c" className="mr-1 w-3 h-3 accent-blue-500" />
                      <label htmlFor="q1c" className="text-xs">Compare different theories of time</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" name="q1" id="q1d" className="mr-1 w-3 h-3 accent-blue-500" />
                      <label htmlFor="q1d" className="text-xs">Critique Einstein's theory of relativity</label>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsAnswerSubmitted(true)}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                               bg-gradient-to-r from-blue-600 to-blue-400 text-white
                               hover:from-blue-500 hover:to-blue-300
                               shadow-[0_0_20px_rgba(37,99,235,0.3)]
                               hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]
                               hover:scale-105 active:scale-95">
                      <span>Submit Answer</span>
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                               bg-yellow-500/20 border border-yellow-500/30 text-yellow-400
                               hover:bg-yellow-500/30 hover:border-yellow-500/50
                               shadow-[0_0_20px_rgba(234,179,8,0.2)]
                               hover:shadow-[0_0_25px_rgba(234,179,8,0.3)]
                               hover:scale-105 active:scale-95
                               flex items-center gap-2">
                      <Flag className="w-3 h-3" />
                      Save Question for Review
                    </button>
                  </div>
                  {isAnswerSubmitted && (
                    <div className="mt-2 text-xs text-green-400 font-medium">
                      Correct answer: B
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestViewer;