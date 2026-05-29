import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Trophy, Star } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const CurtainSpotlight: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  const primaryColor = data.primaryColor || '#102a43'; // Skateboard Navy

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
    setIsPulling(true);
    setTimeout(() => {
      setIsOpen(true);
      setShowMusic(true);
      setIsPulling(false);
      
      // Multi-layered celebration confetti
      fireConfetti(primaryColor);
      setTimeout(() => fireConfetti('#ffd700'), 250); // Gold
      setTimeout(() => fireConfetti('#b89df5'), 500); // Lavender
    }, 800);
  };

  return (
    <div className={`curtain-spotlight-viewport ${isOpen ? 'scrollable' : ''}`}>
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-radial-gradient">
        
        {/* Spotlight Beam - Visible when open */}
        <div className={`spotlight-beam ${isOpen ? 'active' : ''}`} />

        {/* Ambient Stage Lights Background */}
        <div className="absolute inset-0 bg-neutral-950 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        </div>

        {/* Floating Sparks when open */}
        {isOpen && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
            <div className="sparkle-particle sp-1">✦</div>
            <div className="sparkle-particle sp-2">★</div>
            <div className="sparkle-particle sp-3">✦</div>
            <div className="sparkle-particle sp-4">★</div>
          </div>
        )}

        {/* Velvet Curtains Container */}
        <div className="absolute inset-0 flex z-30 pointer-events-none">
          {/* Left Curtain */}
          <div className={`curtain-flap left-flap ${isOpen ? 'open' : ''}`}>
            {/* Fabric texture overlay */}
            <div className="curtain-texture" />
            {/* Curtain folds highlights */}
            <div className="curtain-folds" />
            {/* Golden Fringe/Border */}
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-300 via-yellow-500 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          </div>

          {/* Right Curtain */}
          <div className={`curtain-flap right-flap ${isOpen ? 'open' : ''}`}>
            <div className="curtain-texture" />
            <div className="curtain-folds" />
            {/* Golden Fringe/Border */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-300 via-yellow-500 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          </div>
        </div>

        {/* Interactive Curtain Pull Cord */}
        {!isOpen && (
          <div 
            onClick={isPreview ? undefined : handleOpen}
            className={`pull-cord-wrapper z-40 cursor-pointer ${isPulling ? 'pulling' : ''}`}
          >
            {/* Hanging Cord Rope */}
            <div className="cord-rope" />
            {/* Golden Ring Handle / Tassel */}
            <div className="cord-tassel">
              <div className="tassel-ring" />
              <div className="tassel-skirt" />
            </div>
            <div className="cord-tooltip bg-black/60 backdrop-blur-xs text-amber-400 border border-amber-400/20 text-[9px] px-2 py-1 rounded-sm uppercase tracking-widest font-black absolute top-28 left-6 whitespace-nowrap opacity-80 animate-pulse">
              Pull to Open
            </div>
          </div>
        )}

        {/* Stage Content Reveal Area */}
        <div className="relative flex flex-col items-center justify-center h-[520px] w-[320px] z-10 select-none">
          
          {/* Spotlight Stand / Pedestal */}
          <div className={`stage-pedestal ${isOpen ? 'active' : ''}`}>
            <div className="pedestal-top" />
            <div className="pedestal-column" />
            <div className="pedestal-base" />
          </div>

          {/* The Certificate / Diploma */}
          <div className={`stage-diploma-wrapper ${isOpen ? 'active' : ''}`}>
            {/* Diploma Certificate Stand */}
            <div className="bg-[#FAF9F6] border-2 border-amber-500/30 p-5 rounded-lg shadow-2xl relative w-[250px] mx-auto text-center transform hover:scale-[1.03] transition-all duration-300">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white rounded-full p-1 border border-amber-600 shadow-md">
                <Trophy className="h-4.5 w-4.5" />
              </div>

              <div className="mt-2 text-center">
                <span className="text-[8px] uppercase tracking-[0.25em] font-extrabold text-amber-600 block mb-1">
                  Honor & Ceremony
                </span>
                <h3 className="font-display text-base font-black text-slate-800 truncate max-w-[200px] mx-auto mb-1">
                  {data.targetName || "Michael Chang"}
                </h3>
                <p className="text-[10px] text-slate-500 font-semibold mb-3">
                  {data.title || "The Adventure Begins!"}
                </p>
                <div className="h-[1px] w-12 bg-amber-200 mx-auto my-2" />
                <p className="text-[10px] text-slate-600 italic leading-relaxed px-1">
                  "{data.message}"
                </p>
              </div>

              {/* Gold Seal decoration */}
              <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center rotate-12">
                <Star className="h-3.5 w-3.5 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Intro Board before opening */}
          {!isOpen && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <div className="bg-black/45 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center w-[260px] shadow-2xl">
                <span className="text-[9px] uppercase tracking-[0.3em] font-extrabold text-amber-400 block mb-2 animate-pulse">
                  Grand Commencement
                </span>
                <h3 className="font-display text-lg font-black text-white mb-1">
                  {data.targetName || "The Graduate"}
                </h3>
                <p className="text-[10px] text-neutral-300 font-medium">
                  {data.title || "Class of 2026 Invite"}
                </p>
                <div className="h-[1px] w-16 bg-white/20 mx-auto my-3" />
                <span className="text-[9px] font-extrabold text-amber-400 block animate-bounce mt-1">
                  🎗️ Pull Cord or Click to Raise Curtains
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Scroll Indicator when open */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-amber-500 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[9px] text-white/70">Scroll to Explore</span>
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

export default CurtainSpotlight;
