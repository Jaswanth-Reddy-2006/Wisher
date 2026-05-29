import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import './style.css';

import IntroScreen from './components/IntroScreen';
import EnvelopeLetter from './components/EnvelopeLetter';

export const Galactic3DHeart: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [showLetter, setShowLetter] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const targetName = data.targetName || 'Siri';
  const senderName = data.senderName || 'Arjun';

  useEffect(() => {
    if (isPreview) {
      setShowLetter(false); // keep in intro screen for preview
    }
  }, [isPreview]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="galactic-3d-heart-container">
      {/* Trailing Custom Cursor */}
      <div 
        className="fixed w-4 h-4 bg-[#ffb6c1] rounded-full pointer-events-none z-50 mix-blend-screen transition-transform duration-75 ease-out"
        style={{ 
          left: mousePosition.x - 8, 
          top: mousePosition.y - 8,
          boxShadow: '0 0 10px #ffb6c1, 0 0 20px #ffb6c1'
        }} 
      />
      <div 
        className="fixed w-12 h-12 border-2 border-[#ffb6c1] rounded-full pointer-events-none z-50 mix-blend-screen transition-transform duration-300 ease-out"
        style={{ 
          left: mousePosition.x - 24, 
          top: mousePosition.y - 24 
        }} 
      />

      {!showLetter && (
        <IntroScreen targetName={targetName} onEnter={() => setShowLetter(true)} />
      )}
      
      {showLetter && (
        <EnvelopeLetter targetName={targetName} senderName={senderName} />
      )}
    </div>
  );
};

export default Galactic3DHeart;
