import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppWindow, Calendar, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const TopButtons = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  
  return (
    <div className="fixed top-2 right-2 z-[100] flex items-center gap-1.5 scale-[0.6] origin-right">
      <div className="flex items-center gap-2">
        <button
          onClick={() => window.location.href = 'itms-apps://itunes.apple.com/app/saturn-sat-prep/id123456789'}
          className="px-1.5 py-1 bg-gradient-to-r from-blue-600 to-blue-400
                   rounded-lg text-white text-xs font-medium shadow-lg hover:from-blue-500 hover:to-blue-300
                   transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-sm
                   flex items-center gap-2 border border-white/10 relative"
        >
          <AppWindow className="w-3.5 h-3.5" />
          <span>Open In App Store</span>
        </button>
        <button
          onClick={() => navigate('/register-exam')}
          className="px-1.5 py-1 bg-gradient-to-r from-green-500 to-emerald-500 
                   rounded-lg text-white text-xs font-medium shadow-lg
                   hover:from-green-400 hover:to-emerald-400
                   transition-all duration-300 transform hover:scale-105 backdrop-blur-sm
                   flex items-center gap-2 group relative"
        >
          <Calendar className="w-3.5 h-3.5 group-hover:animate-bounce" />
          <span>Register For Your SAT Exam</span>
        </button>
        {!isSignedIn ? (
          <button
            onClick={() => navigate('/sign-in')}
            className="flex items-center gap-2 px-1.5 py-1 text-xs font-medium
                     bg-white/5 hover:bg-white/10 backdrop-blur-sm
                     border border-white/10 rounded-lg text-sm
                     text-white/90 hover:text-white
                     transition-all duration-300"
          >
            <User className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        ) : (
          <button
            className="flex items-center gap-2 px-1.5 py-1 text-xs font-medium
                     bg-white/5 hover:bg-white/10 backdrop-blur-sm
                     border border-white/10 rounded-lg text-sm
                     transition-all duration-300"
          >
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-blue-400">Joey</span>
          </button>
        )}
      </div>
    </div>
  );
};