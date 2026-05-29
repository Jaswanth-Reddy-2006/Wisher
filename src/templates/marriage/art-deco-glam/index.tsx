import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const ArtDecoGlam: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#d97706'; // Gold/Amber

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
    <div className={`artdeco-viewport ${isOpen ? 'scrollable' : ''}`}>
      
      {/* Background glowing particles */}
      {isOpen && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="artdeco-dust" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }} />
          ))}
        </div>
      )}

      {/* HERO COVER PORTAL */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-[#0d0d0d]">
        
        {/* Glowing luxury amber blobs */}
        <div className="absolute w-[50%] h-[50%] bg-[#b45309]/15 rounded-full blur-3xl opacity-50 top-1/3" />

        {/* Geometric Gatsby Frame card */}
        <div className={`artdeco-card-wrapper ${isOpen ? 'active' : ''} z-30`}>
          <div className="artdeco-paper">
            {/* Geometric Art Deco lines top */}
            <div className="deco-border-top" />

            <span className="text-[8px] uppercase tracking-[0.35em] font-extrabold text-[#d97706] block mb-2">
              Wedding Invitation
            </span>

            <h1 className="font-serif text-3xl font-extrabold text-white my-6 leading-snug tracking-wider">
              {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
            </h1>

            <div className="deco-diamond mx-auto my-3" />

            <p className="font-serif text-xs italic text-slate-300 max-w-[220px] mx-auto leading-relaxed mb-6">
              {data.title || "invite you to celebrate their union in roaring vintage grandeur"}
            </p>

            {formattedDate && (
              <div className="text-[10px] font-bold text-[#d97706] border-y border-[#d97706]/30 py-2 w-full uppercase tracking-wider mb-6">
                {formattedDate}
              </div>
            )}

            {!isOpen ? (
              <button onClick={handleOpen} className="artdeco-btn hover:scale-105 active:scale-95 duration-200">
                Unlock Vows ✨
              </button>
            ) : (
              <div className="text-[10px] text-[#d97706] font-extrabold uppercase tracking-widest mt-2 animate-pulse flex items-center justify-center gap-1">
                <Heart className="h-3 w-3 fill-current" /> Grand Alliance <Heart className="h-3 w-3 fill-current" />
              </div>
            )}

            {/* Geometric Art Deco lines bottom */}
            <div className="deco-border-bottom" />
          </div>
        </div>

        {/* Scroll Helper */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#d97706] animate-bounce select-none pointer-events-none z-30">
            <span className="text-[9px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* DYNAMIC SCROLLABLE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#0a0a0a] text-white border-t border-[#d97706]/20 relative z-20">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Vintage Jazz'} />
      )}
    </div>
  );
};

export default ArtDecoGlam;
