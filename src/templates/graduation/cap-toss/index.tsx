import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Sparkles, Trophy } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const CapToss: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#102a43';

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
    setTimeout(() => fireConfetti('#b89df5'), 200); // lavender accent
    setTimeout(() => fireConfetti('#ffd700'), 400); // gold/yellow accent
  };

  // Positions and angles for thrown graduation caps
  const caps = [
    { x: -50, y: -20, rotate: -45, delay: 0 },
    { x: -20, y: -60, rotate: 15, delay: 0.1 },
    { x: 30, y: -45, rotate: -15, delay: 0.05 },
    { x: 60, y: -30, rotate: 30, delay: 0.15 },
    { x: 10, y: -80, rotate: -10, delay: 0.2 },
  ];

  return (
    <div className={`cap-toss-viewport ${isOpen ? 'scrollable' : ''}`}>
      <style>{`
        @keyframes float-caps {
          0% { transform: translateY(100vh) rotate(0deg) scale(0.6); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120vh) rotate(360deg) scale(1.1); opacity: 0; }
        }
        .cap-element {
          animation: float-caps 5s ease-in-out infinite;
        }
      `}</style>

      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        
        {/* Dynamic rising caps background when open */}
        {isOpen && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-1">
            {caps.map((c, idx) => (
              <div 
                key={idx}
                className="absolute bottom-[-100px] w-12 h-8 bg-neutral-900 rounded-sm shadow-2xl flex items-center justify-center cap-element"
                style={{
                  left: `${20 + idx * 15}%`,
                  animationDelay: `${c.delay * 3}s`,
                  animationDuration: `${4 + Math.random() * 2}s`
                }}
              >
                {/* Cap top square */}
                <div className="absolute w-12 h-12 bg-neutral-900 rotate-45 rounded-sm border border-neutral-800 shadow-md flex items-center justify-center">
                  {/* Cap button */}
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 relative">
                    {/* Tassel string */}
                    <div className="absolute top-1 left-2 w-8 h-[1.5px] bg-amber-500 origin-left rotate-45" />
                  </div>
                </div>
                {/* Cap skull band */}
                <div className="absolute bottom-0 w-8 h-4 bg-neutral-800 rounded-b-md" />
              </div>
            ))}
          </div>
        )}

        {/* Interactive Graduation diploma seal */}
        <div className="relative flex flex-col items-center justify-center h-[500px] w-[320px] z-10">
          
          {/* Main Sealed Scroll / Diploma */}
          <div 
            onClick={isPreview ? undefined : handleOpen}
            className={`relative cursor-pointer transition-all duration-1000 flex flex-col items-center select-none ${
              isOpen ? 'scale-90 opacity-0 pointer-events-none' : 'hover:scale-[1.03] active:scale-[0.98]'
            }`}
          >
            {/* Scroll paper container */}
            <div className="w-56 h-14 bg-amber-50 border-y border-[#cbd5e1] rounded-lg shadow-lg relative flex items-center justify-center">
              {/* Ribbon Wrap */}
              <div className="absolute w-8 h-full bg-[#102a43] flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                {/* Gold Diploma Seal */}
                <div className="absolute w-10 h-10 rounded-full bg-amber-500 border border-amber-600 shadow-md flex items-center justify-center transform hover:rotate-12 transition-transform duration-200">
                  <Trophy className="h-4.5 w-4.5 text-white" />
                </div>
              </div>
              
              {/* Scroll ends rolled effect */}
              <div className="absolute left-[-6px] top-[-2px] bottom-[-2px] w-2 bg-amber-200 border-l border-amber-300 rounded-l shadow-md" />
              <div className="absolute right-[-6px] top-[-2px] bottom-[-2px] w-2 bg-amber-200 border-r border-amber-300 rounded-r shadow-md" />
            </div>

            <div className="mt-8 text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg w-[260px]">
              <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-amber-500 block mb-1">
                Graduation Celebration
              </span>
              <h3 className="font-display text-base font-black text-white truncate max-w-[220px] mx-auto mb-1">
                {data.targetName || "The Graduate"}
              </h3>
              <p className="text-[10px] text-neutral-400 font-semibold mb-2">
                {data.title || "The Adventure Begins!"}
              </p>
              <div className="h-[1px] w-12 bg-neutral-700 mx-auto my-2" />
              <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-amber-500">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span>Tap Seal to Open Diploma</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down notification when open */}
        {isOpen && (
          <div className="absolute bg-white border border-[#e5dfd3] p-5 pb-6 rounded-3xl shadow-2xl w-[290px] text-center transition-all duration-[1.2s] ease-out z-20 translate-y-0 scale-100 opacity-100">
            <div className="flex justify-center mb-2">
              <Trophy className="h-6 w-6 text-amber-500 animate-bounce" style={{ color: primaryColor }} />
            </div>
            <h4 className="font-display text-sm font-extrabold text-[#111111] mb-1">
              Congratulations!
            </h4>
            <p className="text-[10px] text-[#5e5a52] font-semibold leading-relaxed mb-4">
              A major milestone achieved. Scroll down to read the congratulatory card and event details.
            </p>
            <div className="h-[1px] w-16 bg-[#e5dfd3] mx-auto animate-pulse" />
          </div>
        )}

        {/* Floating instruction flag */}
        {!isOpen && (
          <div className="absolute bottom-16 text-center animate-bounce text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 justify-center">
            🎓 Break Seal to Toss Caps
          </div>
        )}

        {/* Scroll Indicator */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-neutral-400 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#fafbfd] text-[#111111] border-t border-[#cbd5e1] z-20 relative">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Graduation Fanfare'} />
      )}
    </div>
  );
};

export default CapToss;
