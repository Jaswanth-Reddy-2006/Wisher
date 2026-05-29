import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const MinimalistLinen: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#78350f'; // Warm Brown/Amber

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
    setTimeout(() => fireConfetti('#a1a1aa'), 250);
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
    <div className={`linen-viewport ${isOpen ? 'scrollable' : ''}`}>
      
      {/* HERO COVER PORTAL */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-[#f4f4f0]">
        
        {/* Soft elegant warm ambient shadows */}
        <div className="absolute w-[60%] h-[60%] bg-[#e4e4db]/60 rounded-full blur-3xl opacity-50 top-1/4" />

        {/* Minimalist linen card */}
        <div className={`linen-card-wrapper ${isOpen ? 'active' : ''} z-30`}>
          <div className="linen-paper">
            
            <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#71717a] block mb-3">
              Wedding Invitation
            </span>

            <h1 className="font-serif text-3xl font-normal text-[#18181b] my-6 leading-snug tracking-tighter">
              {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
            </h1>

            <div className="w-16 h-[0.5px] bg-[#d4d4d8] mx-auto my-4" />

            <p className="font-serif text-xs text-[#52525b] max-w-[210px] mx-auto leading-relaxed mb-6">
              {data.title || "honour us with your presence as we celebrate our wedding vows"}
            </p>

            {formattedDate && (
              <div className="text-[9px] font-bold text-[#18181b] border-y border-[#e4e4e7] py-2 w-full uppercase tracking-wider mb-6">
                {formattedDate}
              </div>
            )}

            {!isOpen ? (
              <button onClick={handleOpen} className="linen-btn hover:scale-105 active:scale-95 duration-200">
                Open Invitation
              </button>
            ) : (
              <div className="text-[9px] text-[#78350f] font-extrabold uppercase tracking-widest mt-2 animate-pulse flex items-center justify-center gap-1">
                <Heart className="h-3 w-3 fill-current" /> Joined Together <Heart className="h-3 w-3 fill-current" />
              </div>
            )}

          </div>
        </div>

        {/* Scroll Helper */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#78350f] animate-bounce select-none pointer-events-none z-30">
            <span className="text-[9px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* DYNAMIC SCROLLABLE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#fcfcf9] text-[#18181b] border-t border-[#e4e4e7] relative z-20">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Ambient Modern BGM'} />
      )}
    </div>
  );
};

export default MinimalistLinen;
