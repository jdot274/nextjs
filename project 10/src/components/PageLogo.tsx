import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageLogo: React.FC = () => {
  const navigate = useNavigate();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClick = () => {
    if (window.location.pathname === '/') {
      scrollToTop();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="fixed left-4 top-[2rem] z-20 flex items-center gap-1
                    cursor-pointer group z-[100]" onClick={handleClick}>
      <div className="w-logo-base h-logo-base relative bg-gradient-to-br from-blue-600 to-blue-400 rounded-full">
        <div className="absolute inset-0 rounded-full blur-xl bg-blue-600/30 animate-pulse"></div>
        <div className="absolute inset-4 rounded-full blur-md bg-blue-500/25 animate-pulse"></div>
      </div>

      <span className="text-base font-bold bg-clip-text text-transparent 
                    bg-gradient-to-r from-blue-400 to-blue-200
                    group-hover:from-blue-300 group-hover:to-blue-100
                    transition-all duration-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
        SATurn
      </span>
    </div>
  );
};

export default PageLogo;