import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart, Star } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const CelestialStars: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#1e3a8a'; // Royal Blue

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setShowMusic(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowMusic(true);
    fireConfetti(primaryColor);
    setTimeout(() => fireConfetti('#ffffff'), 250);
  };

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className={`celestial-viewport ${isOpen ? 'scrollable' : ''}`}>
      {/* Background glowing stars */}
      <div className="starfield z-0 pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="celestial-star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }} />
        ))}
      </div>

      {/* HERO COVER PORTAL */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-[#070b19]">
        
        {/* Glowing Nebula effects */}
        <div className="absolute w-[60%] h-[60%] bg-[#1e1b4b]/50 rounded-full blur-3xl opacity-50 top-1/4" />

        {/* Crescent moon card cover */}
        <div className={`celestial-card-wrapper ${isOpen ? 'active' : ''} z-30`}>
          <div className="celestial-paper">
            
            {/* Constellation Star icon */}
            <div className="flex justify-center mb-2">
              <Star className="h-5 w-5 text-yellow-300 fill-current animate-pulse" />
            </div>

            <span className="text-[9px] uppercase tracking-[0.3em] font-extrabold text-blue-300 block mb-2">
              Written in the Stars
            </span>

            <h1 className="font-serif text-3xl font-bold text-white my-6 leading-snug tracking-wide">
              {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
            </h1>

            <p className="font-serif text-xs italic text-blue-100 max-w-[220px] mx-auto leading-relaxed mb-6">
              {data.title || "invite you to celebrate their union under the cosmic sky"}
            </p>

            {formattedDate && (
              <div className="text-[10px] font-bold text-yellow-200 border-y border-blue-900 py-2 w-full uppercase tracking-wider mb-6">
                {formattedDate}
              </div>
            )}

            {!isOpen ? (
              <button onClick={handleOpen} className="celestial-btn hover:scale-105 active:scale-95 duration-200">
                Unlock Vows 🌙
              </button>
            ) : (
              <div className="text-[10px] text-yellow-300 font-extrabold uppercase tracking-widest mt-2 animate-pulse flex items-center justify-center gap-1">
                <Heart className="h-3 w-3 fill-current" /> Cosmic Alliance <Heart className="h-3 w-3 fill-current" />
              </div>
            )}

          </div>
        </div>

        {/* Scroll Helper */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-yellow-300 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[9px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* DYNAMIC SCROLLABLE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#0a0f24] text-white border-t border-blue-950 relative z-20">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Dreamy Waltz'} />
      )}
    </div>
  );
};

export default CelestialStars;
