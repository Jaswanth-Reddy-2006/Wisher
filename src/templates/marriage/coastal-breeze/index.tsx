import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const CoastalBreeze: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#0284c7'; // Sky Blue

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
    setTimeout(() => fireConfetti('#f0f9ff'), 250);
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
    <div className={`coastal-viewport ${isOpen ? 'scrollable' : ''}`}>
      
      {/* Animated sea-waves backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#f0f9ff] via-[#e0f2fe]/40 to-[#faf8f5]">
        <div className="sea-wave wave-1" />
        <div className="sea-wave wave-2" />
      </div>

      {/* HERO COVER PORTAL */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
        
        {/* Coastal framed card */}
        <div className={`coastal-card-wrapper ${isOpen ? 'active' : ''} z-30`}>
          <div className="coastal-paper">
            
            {/* Elegant compass/heart divider */}
            <div className="flex justify-center mb-2">
              <span className="text-xl">🐚</span>
            </div>

            <span className="text-[9px] uppercase tracking-[0.3em] font-extrabold text-sky-600 block mb-2">
              Beach Wedding Invitation
            </span>

            <h1 className="font-serif text-3xl font-bold text-sky-950 my-6 leading-snug">
              {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
            </h1>

            <p className="font-serif text-xs italic text-sky-800 max-w-[220px] mx-auto leading-relaxed mb-6">
              {data.title || "invite you to celebrate their love along the coastal ocean shores"}
            </p>

            {formattedDate && (
              <div className="text-[10px] font-bold text-sky-950 border-y border-sky-200 py-2 w-full uppercase tracking-wider mb-6">
                {formattedDate}
              </div>
            )}

            {!isOpen ? (
              <button onClick={handleOpen} className="coastal-btn hover:scale-105 active:scale-95 duration-200">
                Unlock Invitation 🏝️
              </button>
            ) : (
              <div className="text-[10px] text-sky-600 font-extrabold uppercase tracking-widest mt-2 animate-pulse flex items-center justify-center gap-1">
                <Heart className="h-3 w-3 fill-current" /> Coastal Union <Heart className="h-3 w-3 fill-current" />
              </div>
            )}

          </div>
        </div>

        {/* Scroll Helper */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-sky-800 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[9px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* DYNAMIC SCROLLABLE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#fdfdfd] text-[#111111] border-t border-sky-100 relative z-20">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Coastal Melodies'} />
      )}
    </div>
  );
};

export default CoastalBreeze;
