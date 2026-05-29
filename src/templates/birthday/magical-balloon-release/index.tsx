import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Sparkles, Gift } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const MagicalBalloonRelease: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#d30f0f';

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        handleOpen();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setShowMusic(true);
    fireConfetti(primaryColor);
    setTimeout(() => fireConfetti('#38bdf8'), 200);
    setTimeout(() => fireConfetti('#fbbf24'), 400);
  };

  // 5 balloons with different colors, drift angles, and delay presets
  const balloons = [
    { color: '#ec4899', rx: -30, ry: -40, delay: 0 }, // Pink
    { color: '#3b82f6', rx: 35, ry: -30, delay: 0.1 }, // Blue
    { color: '#eab308', rx: -15, ry: 45, delay: 0.15 }, // Gold
    { color: '#10b981', rx: 40, ry: 30, delay: 0.05 }, // Emerald
    { color: '#8b5cf6', rx: 0, ry: -60, delay: 0.2 }, // Purple
  ];

  return (
    <div className={`balloon-viewport ${isOpen ? 'scrollable' : ''}`}>
      <style>{`
        @keyframes float-gentle {
          0% { transform: translateY(0px) rotate(-1deg); }
          100% { transform: translateY(-10px) rotate(1deg); }
        }
        .balloon-bundle {
          animation: float-gentle 4s ease-in-out infinite alternate;
        }
      `}</style>

      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
        {/* Sky cloud background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f3f8fc] via-[#e6f0fa] to-[#d8e8f8] pointer-events-none z-0" />
        
        {/* Interactive balloon release scene */}
        <div className="relative flex flex-col items-center justify-center h-[500px] w-[320px] z-10">
          
          {/* Balloons Cluster */}
          <div className={`relative w-40 h-40 flex items-center justify-center balloon-bundle transition-all duration-1000 ${
            isOpen ? 'scale-110 opacity-0 pointer-events-none' : ''
          }`}>
            {balloons.map((b, idx) => (
              <div 
                key={idx}
                className="absolute w-12 h-15 rounded-t-full rounded-b-2xl transition-all duration-[1.5s] ease-out shadow-lg"
                style={{
                  backgroundColor: b.color,
                  transform: isOpen 
                    ? `translate3d(${b.rx * 12}px, -120vh, 0px) scale(0.5) rotate(${b.rx}deg)` 
                    : `translate3d(${b.rx}px, ${b.ry}px, 0px) rotate(${b.rx * 0.1}deg)`,
                  boxShadow: `inset -4px -6px 15px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.1)`,
                }}
              >
                {/* Highlight gloss */}
                <div className="w-2.5 h-2.5 bg-white rounded-full opacity-50 absolute top-2 left-2" />
                {/* String line */}
                <div 
                  className="absolute w-[1px] bg-slate-400/40 origin-top"
                  style={{
                    height: '240px',
                    left: '50%',
                    top: '100%',
                    transform: `rotate(${-b.rx * 0.2}deg)`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Converging Strings Joint & Release Tag */}
          <div className="relative mt-8 flex flex-col items-center">
            {/* Hanging Gift tag */}
            <button
              onClick={isPreview ? undefined : handleOpen}
              className={`relative bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 shadow-lg w-[220px] transition-all duration-700 select-none group cursor-pointer text-center ${
                isOpen ? 'translate-y-32 opacity-0 pointer-events-none' : 'hover:scale-105 active:scale-95'
              }`}
              style={{ borderColor: primaryColor }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              </div>

              <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#5e5a52] block mb-2 mt-1">
                A Surprise For
              </span>
              <h3 className="font-display text-base font-black text-[#111111] truncate max-w-[180px] mx-auto mb-1">
                {data.targetName || "You"}
              </h3>
              <div className="h-[1px] w-12 bg-amber-200 mx-auto my-2" />
              <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-amber-800" style={{ color: primaryColor }}>
                <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} />
                <span>Pop Knot to Release</span>
              </div>
            </button>
          </div>
        </div>

        {/* Release Instruction text */}
        {!isOpen && (
          <div className="absolute bottom-16 text-center animate-bounce text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 justify-center">
            🎈 Click Tag to Release Wish
          </div>
        )}

        {/* Rising mini card when released */}
        <div className={`absolute bg-white border border-[#e5dfd3] p-5 pb-6 rounded-3xl shadow-xl w-[280px] text-center transition-all duration-[1.2s] ease-out z-20 ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-24 scale-75 opacity-0 pointer-events-none'
        }`}>
          <div className="flex justify-center mb-2">
            <Gift className="h-6 w-6 text-pink-500 animate-pulse" style={{ color: primaryColor }} />
          </div>
          <h4 className="font-display text-sm font-extrabold text-[#111111] mb-1">
            Wishes Set Free!
          </h4>
          <p className="text-[10px] text-[#5e5a52] font-semibold leading-relaxed mb-4">
            The celebration has begun. Scroll down to see your wishes.
          </p>
          <div className="h-[1px] w-16 bg-[#e5dfd3] mx-auto" />
        </div>

        {/* Scroll Indicator */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-500 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#f3f8fc] text-[#111111] border-t border-[#cbd5e1] z-20 relative">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Celebration tune'} />
      )}
    </div>
  );
};
export default MagicalBalloonRelease;
