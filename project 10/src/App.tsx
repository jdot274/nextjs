import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDragScroll } from './hooks/useDragScroll';
import { AuthProvider } from './contexts/AuthContext';
import { DevModeProvider } from './contexts/DevModeContext';
import PracticePage from './pages/PracticePage';
import PracticePage2 from './pages/PracticePage2';
import SATExplainedPage from './pages/SATExplainedPage';

// Page imports
import LandingPage1 from './pages/LandingPage1';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import TestsPage from './pages/TestsPage';
import TestSelectionPage from './pages/TestSelectionPage';
import BackgroundPage from './pages/BackgroundPage';
import ProgressPage from './pages/ProgressPage';
import ReviewPage from './pages/ReviewPage';
import FlashcardPage from './pages/FlashcardPage';
import BackgroundDemo2Page from './pages/BackgroundDemo2Page';
import ExamRegistrationPage from './pages/ExamRegistrationPage';
import StudyStreakPage from './pages/StudyStreakPage';
import GlassmorphicDemoPage from './pages/GlassmorphicDemoPage';
import StudyStreakDetailsPage from './pages/StudyStreakDetailsPage';
import VocabBuilderPage from './pages/VocabBuilderPage';
import DailyChallengePage from './pages/DailyChallengePage';

const App: React.FC = () => {
  const { onMouseDown } = useDragScroll();

  useEffect(() => {
    // Reset any transforms or scaling
    document.body.style.zoom = '';
    document.body.style.transform = '';
    document.body.style.transformOrigin = '';
  }, []);

  return (
    <Router onMouseDown={onMouseDown}>
      <AuthProvider>
        <DevModeProvider>
          <Routes>
            <Route path="/" element={<LandingPage1 />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tests" element={<TestSelectionPage />} />
            <Route path="/tests/viewer" element={<TestsPage />} />
            <Route path="/sat" element={<PracticePage />} />
            <Route path="/background" element={<BackgroundPage />} />
            <Route path="/practice2" element={<PracticePage2 />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/sat-explained" element={<SATExplainedPage />} />
            <Route path="/practice/flashcards" element={<FlashcardPage />} />
            <Route path="/background-demo-2" element={<BackgroundDemo2Page />} />
            <Route path="/register-exam" element={<ExamRegistrationPage />} />
            <Route path="/study-streak" element={<StudyStreakPage />} />
            <Route path="/study-streak-details" element={<StudyStreakDetailsPage />} />
            <Route path="/vocabulary" element={<VocabBuilderPage />} />
            <Route path="/daily-challenge" element={<DailyChallengePage />} />
          </Routes>
        </DevModeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;