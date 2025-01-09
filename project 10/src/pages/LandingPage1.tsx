import React, { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Sphere from '../components/Sphere';
import Navigation from '../components/Navigation';
import SplineViewer from '../components/SplineViewer';
import { useAuth } from '../contexts/AuthContext';
import { BackgroundElements } from '../components/landing/BackgroundElements';
import { TopButtons } from '../components/landing/TopButtons';
import { MainContent } from '../components/landing/MainContent';
import PageLogo from '../components/PageLogo';

const LandingPage1: FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [showFeatures, setShowFeatures] = useState(false);

  const handleStartJourney = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 flex flex-col relative select-none">
      <PageLogo />
      <SplineViewer />
      <Sphere />
      <BackgroundElements />
      <div className="relative z-50">
        <Navigation />
        <TopButtons />
      </div>

      <MainContent 
        scrollToSATExplained={() => {}}
        isSignedIn={isSignedIn}
      />
    </div>
  );
};

export default LandingPage1;