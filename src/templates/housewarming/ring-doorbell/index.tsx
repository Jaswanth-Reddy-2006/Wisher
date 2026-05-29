import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Home } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const RingDoorbell: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  const primaryColor = data.primaryColor || '#2d6a4f'; // Housewarming Green

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        handleOpen();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  const handleOpen = () => {
    if (isOpen || isRinging) return;
    setIsRinging(true);
    
    // Simulate doorbell ring chime
    setTimeout(() => {
      setIsOpen(true);
      setShowMusic(true);
      setIsRinging(false);
      fireConfetti(primaryColor);
      setTimeout(() => fireConfetti('#ffd700'), 250);
    }, 1200);
  };

  return (
    <div className={`doorbell-viewport ${isOpen ? 'scrollable' : ''}`}>
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-[#1e293b]">
        
        {/* Overhead Porch Light Glow */}
        <div className={`porch-light ${isOpen ? 'turned-on' : ''} ${isRinging ? 'flickering' : ''}`} />

        {/* Front Porch Background Wall */}
        <div className="absolute inset-0 bg-[#0f172a] opacity-90 z-0">
          {/* Subtle siding line detailing */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_40px]" />
        </div>

        {/* Door and Wall Panel */}
        <div className="relative flex flex-col items-center justify-center h-[520px] w-[320px] z-10 select-none">
          
          {/* Door panel - swings open on Y-axis */}
          <div className={`porch-door ${isOpen ? 'open' : ''} z-20`}>
            {/* Door surface panel decorations */}
            <div className="door-panel-top" />
            <div className="door-panel-bottom" />
            {/* Latch handle */}
            <div className="door-handle" />
          </div>

          {/* Doorbell Plaque and Button - stays mounted on wall */}
          {!isOpen && (
            <div className="absolute right-1 bottom-44 z-30 flex flex-col items-center">
              <div 
                onClick={isPreview ? undefined : handleOpen}
                className={`doorbell-plaque ${isRinging ? 'ringing-pulse' : ''} cursor-pointer`}
              >
                {/* Plaque Brass border */}
                <div className="plaque-brass" />
                {/* Glowing LED Button */}
                <div className="bell-button">
                  <div className="bell-led" />
                </div>
              </div>
              <span className="text-[7px] text-amber-500 uppercase tracking-widest font-black mt-2 bg-black/40 px-1 py-0.5 rounded-xs animate-pulse">
                Ring Bell
              </span>
            </div>
          )}

          {/* Inside Welcome Invitation Card - revealed behind door */}
          <div className={`doorbell-invitation ${isOpen ? 'active' : ''} z-10`}>
            <div className="bg-white/95 border-2 border-emerald-800/10 p-6 rounded-3xl shadow-2xl w-[265px] text-center transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex justify-center mb-3">
                <Home className="h-6 w-6 text-emerald-700 animate-bounce" />
              </div>

              <span className="text-[8px] uppercase tracking-[0.25em] font-extrabold text-slate-500 block mb-1">
                Housewarming Invite
              </span>
              <h3 className="font-display text-base font-black text-slate-800 truncate max-w-[200px] mx-auto mb-1">
                {data.targetName || "The Sharma Family"}
              </h3>
              <p className="text-[10px] text-slate-500 font-semibold mb-3">
                {data.title || "Bless Our New Nest"}
              </p>
              
              <div className="h-[1px] w-12 bg-emerald-100 mx-auto my-2" />

              <p className="text-[10px] text-slate-600 leading-relaxed font-semibold italic">
                "{data.message}"
              </p>
            </div>
          </div>
        </div>

        {/* Floating guide message */}
        {!isOpen && (
          <div className="absolute bottom-16 text-center animate-bounce text-xs font-bold uppercase tracking-wider text-slate-400 z-40 flex items-center gap-1.5 justify-center">
            🔔 Press Bell to Ring Porch
          </div>
        )}

        {/* Scroll Helper */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-400 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[9px] text-white/70">Scroll Down to Enter</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#fdfdfc] text-[#111111] border-t border-[#cbd5e1] z-20 relative">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Chime Fanfare'} />
      )}
    </div>
  );
};

export default RingDoorbell;
