import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const WeddingClassicSonali: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#674ea7'; // Traditional Royal Purple

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
    setTimeout(() => fireConfetti('#e25c67'), 250); // Romantic Pink
    setTimeout(() => fireConfetti('#d4af37'), 500); // Royal Gold
  };

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'November 29, 2026';

  return (
    <div className={`sonali-viewport ${isOpen ? 'scrollable' : ''}`}>
      {/* Background drifting sakura petals */}
      {isOpen && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {Array.from({ length: 20 }).map((_, i) => {
            const size = 8 + Math.random() * 12;
            return (
              <div 
                key={i} 
                className="sonali-sakura-petal" 
                style={{
                  left: `${5 + Math.random() * 90}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${8 + Math.random() * 6}s`,
                  opacity: 0.6 + Math.random() * 0.4
                }} 
              />
            );
          })}
        </div>
      )}

      {/* HERO COVER PORTAL - ENVELOPE / CARD REVEAL */}
      <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-gradient-to-br from-[#FAF5EF] to-[#F3EBE0] p-4">
        
        {/* Decorative corner illustrations */}
        <div className="absolute top-0 right-0 w-[45%] max-w-[280px] pointer-events-none select-none z-10 animate-fade-in opacity-90 transition-transform duration-500 hover:scale-105">
          <img src="https://i.imgur.com/dGOOfnA.png" alt="top-right-decor" className="w-full h-auto object-contain" />
        </div>
        <div className="absolute top-0 left-0 w-[45%] max-w-[280px] pointer-events-none select-none z-10 animate-fade-in opacity-90 transition-transform duration-500 hover:scale-105">
          <img src="https://i.imgur.com/t6ffnbn.png" alt="top-left-decor" className="w-full h-auto object-contain" />
        </div>

        {/* 3D Glassmorphic Envelope Flap & Card Portal */}
        <div className={`sonali-envelope-container ${isOpen ? 'open' : ''} z-30`}>
          
          {/* ENVELOPE COVER (FRONT SEAL) */}
          {!isOpen && (
            <div className="sonali-envelope-front flex flex-col items-center justify-center p-8 bg-[#ffffff]/90 border-2 border-[#d4af37]/40 shadow-[0_15px_35px_rgba(103,78,167,0.15)] rounded-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
              
              {/* Outer double gold border */}
              <div className="absolute inset-2 border border-[#d4af37]/20 rounded-xl pointer-events-none" />
              
              <div className="text-center space-y-4 relative z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#8a7f72] block">
                  The Wedding of
                </span>
                
                <h2 className="font-serif text-3xl font-extrabold text-[#674ea7] italic leading-tight">
                  {data.brideName || "Sonali"} <span className="text-sm font-normal text-[#e25c67] block my-1">&</span> {data.groomName || "Gagan"}
                </h2>

                <p className="text-[10px] font-bold text-[#8a7f72] uppercase tracking-[0.15em] mb-4">
                  Request Your Noble Presence
                </p>

                {/* Wax Seal Button */}
                <button 
                  onClick={handleOpen}
                  className="sonali-wax-seal flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#c93e50] via-[#be123c] to-[#9f1239] text-[#ffffff] text-xl font-bold shadow-[0_8px_20px_rgba(226,92,103,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 relative border border-[#ffffff]/20 cursor-pointer"
                >
                  <div className="absolute inset-0.5 rounded-full border border-dashed border-[#ffffff]/35 animate-spin" style={{ animationDuration: '20s' }} />
                  <Heart className="h-5 w-5 fill-[#ffffff]" />
                </button>
                
                <span className="text-[9px] font-bold text-[#e25c67] uppercase tracking-widest block animate-pulse mt-2">
                  Tap Seal to Open
                </span>
              </div>
            </div>
          )}

          {/* INNER INVITATION CARD (REVEALED) */}
          <div className="sonali-invitation-card bg-[#ffffff]/95 border-2 border-[#d4af37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-6 md:p-10 text-center relative overflow-hidden backdrop-blur-md">
            <div className="absolute inset-1.5 border border-[#d4af37]/20 rounded-xl pointer-events-none" />
            <div className="absolute inset-3 border border-dashed border-[#674ea7]/10 rounded-lg pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#674ea7] block">
                Wedding Invitation
              </span>

              <div className="py-2">
                <h1 className="font-serif text-4xl md:text-5xl font-black text-[#674ea7] leading-tight select-none">
                  {data.brideName || "Sonali"}
                </h1>
                <span className="font-serif text-2xl font-bold text-[#e25c67] italic block my-2">&</span>
                <h1 className="font-serif text-4xl md:text-5xl font-black text-[#674ea7] leading-tight select-none">
                  {data.groomName || "Gagan"}
                </h1>
              </div>

              <h3 className="font-serif text-xs font-bold text-[#8a7f72] uppercase tracking-[0.15em]">
                {data.title || "Are getting married"}
              </h3>

              <div className="h-[1px] w-20 mx-auto bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

              <p className="font-sans text-xs font-bold text-[#674ea7]/80 max-w-[280px] mx-auto leading-relaxed italic">
                "{data.message || "With the divine grace of the almighty, inviting you and your family to celebrate elder sister's wedding."}"
              </p>

              {formattedDate && (
                <div className="text-[10px] font-bold text-[#674ea7] border-y border-[#d4af37]/25 py-2.5 w-full uppercase tracking-widest my-4">
                  {formattedDate}
                </div>
              )}

              {data.weddingTime && (
                <p className="text-[10px] font-bold text-[#e25c67] uppercase tracking-wider">
                  ⏱️ {data.weddingTime} onwards
                </p>
              )}

              <p className="font-serif text-xs italic text-[#8a7f72] tracking-wider block">
                {data.extraMessage || "Dinner & Dancing to follow"}
              </p>
            </div>
          </div>

        </div>

        {/* Scroll Helper */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#674ea7] animate-bounce select-none pointer-events-none z-30">
            <span className="text-[9px]">Scroll to enter</span>
            <span className="text-lg">↓</span>
          </div>
        )}
      </div>

      {/* DYNAMIC SCROLLABLE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#fdfdfc] text-[#111111] border-t border-[#d4af37]/20 relative z-20">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Din Shagna Da'} />
      )}
    </div>
  );
};

export default WeddingClassicSonali;
