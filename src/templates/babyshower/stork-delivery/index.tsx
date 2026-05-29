import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Sparkles, Heart } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const StorkDelivery: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#f5a18a'; // Lion Peach

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
    setTimeout(() => fireConfetti('#b89df5'), 200); // Lion Lavender accent
    setTimeout(() => fireConfetti('#e0f2fe'), 400); // Sky blue accent
  };

  return (
    <div className={`stork-viewport ${isOpen ? 'scrollable' : ''}`}>
      <style>{`
        @keyframes sway-bundle {
          0% { transform: translateY(0px) rotate(-3deg); }
          100% { transform: translateY(-15px) rotate(3deg); }
        }
        .stork-bundle {
          animation: sway-bundle 3s ease-in-out infinite alternate;
        }
        @keyframes float-clouds {
          0% { transform: translateX(-10%); }
          100% { transform: translateX(110%); }
        }
        .cloud-bg-1 {
          animation: float-clouds 25s linear infinite;
        }
        .cloud-bg-2 {
          animation: float-clouds 35s linear infinite 5s;
        }
        @keyframes flap-wings {
          0% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
          100% { transform: scaleY(1); }
        }
        .stork-wings {
          animation: flap-wings 1.5s ease-in-out infinite;
          transform-origin: 50px 50px;
        }
      `}</style>

      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-[#fed7aa]">
        
        {/* Floating background clouds */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute top-[15%] w-32 h-10 bg-white/70 rounded-full blur-[2px] cloud-bg-1" />
          <div className="absolute top-[40%] w-48 h-12 bg-white/60 rounded-full blur-[3px] cloud-bg-2" />
        </div>

        {/* Interactive delivery package bundle */}
        <div className="relative flex flex-col items-center justify-center h-[500px] w-[320px] z-10">
          
          {/* Baby Delivery Stork Package */}
          <div 
            onClick={isPreview ? undefined : handleOpen}
            className={`stork-bundle flex flex-col items-center cursor-pointer transition-all duration-1000 select-none ${
              isOpen ? 'scale-90 opacity-0 pointer-events-none' : 'hover:scale-[1.03] active:scale-[0.98]'
            }`}
          >
            {/* Stork silhouette SVG or icon above the bundle */}
            <svg className="w-24 h-24 text-slate-700/80 mb-2" viewBox="0 0 100 100" fill="currentColor">
              {/* Flying bird shape */}
              <path className="stork-wings" d="M10,50 Q40,30 50,45 Q60,30 90,50 Q60,55 50,70 Q40,55 10,50 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <path d="M50,45 Q50,90 48,95" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="45" r="3" />
            </svg>

            {/* Hanging Diaper Wrap Bundle */}
            <div className="w-28 h-28 rounded-b-full bg-orange-100/90 border-2 border-orange-200 shadow-xl flex flex-col items-center justify-start pt-6 relative">
              {/* Tied Knot top */}
              <div className="absolute -top-3 w-8 h-8 rounded-full bg-orange-200 border-2 border-orange-300 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              
              {/* Heart Badge */}
              <div className="w-8 h-8 rounded-full bg-rose-400 flex items-center justify-center shadow-md animate-pulse">
                <Heart className="h-4 w-4 text-white fill-current" />
              </div>
              
              <span className="text-[7px] font-black text-rose-500 uppercase tracking-widest mt-3">Special Delivery</span>
            </div>

            {/* Gift tag message card */}
            <div className="mt-6 bg-white/90 border border-orange-200 shadow-md rounded-2xl p-4 text-center w-[240px]">
              <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-slate-500 block mb-1">
                Baby Shower Celebration
              </span>
              <h3 className="font-display text-sm font-black text-[#111111] truncate max-w-[200px] mx-auto mb-1">
                {data.targetName || "Baby-to-Be"}
              </h3>
              <p className="text-[10px] text-slate-600 font-semibold mb-2">
                {data.title || "Welcome Sweet Child"}
              </p>
              <div className="h-[1px] w-12 bg-orange-200 mx-auto my-1.5" />
              <div className="flex items-center justify-center gap-1.5 text-[9px] font-extrabold text-orange-600" style={{ color: primaryColor }}>
                <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} />
                <span>Untie Knot to Unravel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revealed card when bundle opened */}
        {isOpen && (
          <div className="absolute bg-white border border-[#e5dfd3] p-6 pb-7 rounded-3xl shadow-2xl w-[280px] text-center transition-all duration-[1.2s] ease-out z-20 translate-y-0 scale-100 opacity-100">
            <div className="flex justify-center mb-2">
              <Heart className="h-6 w-6 text-rose-400 animate-bounce" />
            </div>
            <h4 className="font-display text-sm font-extrabold text-[#111111] mb-1">
              Delivery Completed!
            </h4>
            <p className="text-[10px] text-[#5e5a52] font-semibold leading-relaxed mb-4">
              Welcome sweet bundle of joy! Scroll down to see full baby shower details and maps.
            </p>
            <div className="h-[1px] w-16 bg-[#e5dfd3] mx-auto" />
          </div>
        )}

        {/* Floating guide text */}
        {!isOpen && (
          <div className="absolute bottom-16 text-center animate-bounce text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1 justify-center">
            👶 Tap Bundle to Open Invitation
          </div>
        )}

        {/* Scroll Indicator */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-600 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#fdfaf6] text-[#111111] border-t border-[#fed7aa] z-20 relative">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Lullaby Tune'} />
      )}
    </div>
  );
};

export default StorkDelivery;
