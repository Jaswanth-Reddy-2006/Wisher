import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Sparkles, Home, CreditCard } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const GoldenKeycard: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [isInserting, setIsInserting] = useState(false);

  const primaryColor = data.primaryColor || '#2d6a4f'; // Forest Green preset

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        handleOpen();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  const handleOpen = () => {
    if (isOpen || isInserting) return;
    setIsInserting(true);
    
    // Animate card insertion first, then trigger open
    setTimeout(() => {
      setIsOpen(true);
      setShowMusic(true);
      fireConfetti(primaryColor);
      setIsInserting(false);
    }, 1000);
  };

  return (
    <div className={`keycard-viewport ${isOpen ? 'scrollable' : ''}`}>
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-slate-900">
        {/* Futuristic circuit grid lines in background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Interactive Reader Box */}
        <div className="relative flex flex-col items-center justify-center h-[500px] w-[320px] z-10">
          
          <div className={`reader-device bg-slate-800 border border-slate-700 p-6 rounded-3xl shadow-2xl w-[280px] flex flex-col items-center justify-between h-[360px] relative transition-all duration-700 ${
            isOpen ? 'scale-90 opacity-0 pointer-events-none' : ''
          }`}>
            
            {/* Status light */}
            <div className="flex items-center gap-2 self-start mb-2">
              <div className={`h-2.5 w-2.5 rounded-full ${isInserting ? 'bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]' : 'bg-rose-500 shadow-[0_0_8px_#ef4444]'}`} />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                {isInserting ? 'Authorizing Card...' : 'Insert Keycard'}
              </span>
            </div>

            {/* Electronic House Outline SVG */}
            <div className="w-36 h-36 border border-slate-700/50 bg-slate-900/50 rounded-2xl flex items-center justify-center relative overflow-hidden my-4">
              <Home className={`h-16 w-16 text-slate-600 transition-colors duration-500 ${isInserting ? 'text-amber-400 animate-pulse' : ''}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />
            </div>

            {/* Smart card slot */}
            <div className="w-full h-8 bg-neutral-950 border border-slate-800 rounded-lg flex items-center justify-center relative shadow-inner mb-6 overflow-visible">
              {/* Inserted Card overlay */}
              <div className={`absolute w-36 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg border border-amber-300 flex flex-col justify-between p-2 shadow-lg transition-all duration-1000 ${
                isInserting ? 'translate-y-0 opacity-100' : 'translate-y-[-70px] opacity-100'
              } ${isOpen ? 'pointer-events-none' : ''}`}>
                <div className="flex justify-between items-start">
                  <CreditCard className="h-4 w-4 text-white" />
                  <div className="h-3 w-5 bg-amber-200/50 rounded-sm" />
                </div>
                <span className="text-[7px] text-white font-black uppercase tracking-widest">Wishes Card</span>
              </div>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest z-10 pointer-events-none">Card Slot</span>
            </div>

            {/* Instructions */}
            <button 
              onClick={handleOpen}
              className="w-full bg-[#102a43] hover:bg-[#1e3d64] text-white text-xs font-bold py-2.5 rounded-xl uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Sparkles className="h-3.5 w-3.5" /> Tap to Insert Key
            </button>
          </div>
        </div>

        {/* Revealed card when slot opens */}
        {isOpen && (
          <div className="absolute bg-white border border-neutral-100 p-6 pb-7 rounded-3xl shadow-2xl w-[280px] text-center transition-all duration-[1.2s] ease-out z-20 translate-y-0 scale-100 opacity-100">
            <div className="flex justify-center mb-2">
              <Home className="h-6 w-6 text-emerald-600 animate-bounce" style={{ color: primaryColor }} />
            </div>
            <h4 className="font-display text-sm font-extrabold text-[#111111] mb-1">
              Access Granted!
            </h4>
            <p className="text-[10px] text-[#5e5a52] font-semibold leading-relaxed mb-4">
              Welcome to our home sweet home! Scroll down to see full event details and RSVP forms.
            </p>
            <div className="h-[1px] w-16 bg-[#e5dfd3] mx-auto" />
          </div>
        )}

        {/* Scroll Indicator */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-400 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#fdfdfc] text-[#111111] border-t border-slate-200 z-20 relative">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Keycard Synth'} />
      )}
    </div>
  );
};

export default GoldenKeycard;
