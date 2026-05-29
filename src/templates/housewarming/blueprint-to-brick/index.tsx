import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Hammer } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const BlueprintToBrick: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isBuilt, setIsBuilt] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#d30f0f';

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        setIsBuilt(true);
        setShowMusic(true);
        fireConfetti(primaryColor);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  const handleBuild = () => {
    if (isBuilt) return;
    setIsBuilt(true);
    setShowMusic(true);
    fireConfetti(primaryColor);
  };

  return (
    <div className={`blueprint-viewport ${isBuilt ? 'scrollable' : ''}`}>
      
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
        {/* Blueprint Header */}
        {!isBuilt && (
          <div className="absolute top-20 flex flex-col items-center gap-1.5 text-center pointer-events-none z-10 px-4">
            <span className="text-[10px] tracking-[0.25em] font-extrabold text-[#00ffff] uppercase">
              ARCHITECTURAL DRAFTING MODE
            </span>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">
              House Blueprint
            </h2>
            <p className="text-xs text-white/50">Click "Build Home" to raise structure</p>
          </div>
        )}

        {/* 3D Blueprint Scene */}
        <div className="blueprint-scene">
          <div className="isometric-grid">
            {/* Base Layout Square */}
            <div className="blueprint-line" style={{ width: '100px', height: '100px', top: '50px', left: '50px' }}></div>

            {/* Wall Panel Front (Raises up rotateX) */}
            <div 
              className={`wall-panel ${isBuilt ? 'popped' : ''}`}
              style={{ width: '100px', bottom: '50px', left: '50px' }}
            ></div>

            {/* Wall Panel Side */}
            <div 
              className={`wall-panel ${isBuilt ? 'popped' : ''}`}
              style={{ width: '100px', bottom: '50px', left: '150px', transform: 'rotateX(-90deg) rotateY(90deg) scaleY(1)' }}
            ></div>

            {/* Roof wireframe */}
            <div className="roof-wireframe"></div>
          </div>
        </div>

        {/* Build CTA button */}
        {!isBuilt && (
          <button
            onClick={handleBuild}
            className="absolute bottom-20 inline-flex items-center gap-2 rounded-xl bg-[#00ffff] py-3.5 px-6 font-display text-xs font-black uppercase tracking-wider text-black shadow-[0_10px_20px_rgba(0,255,255,0.25)] hover:scale-105 active:scale-95 transition-all cursor-pointer z-20"
          >
            <Hammer className="h-4 w-4" /> Build Home
          </button>
        )}

        {/* Scroll Indicator */}
        {isBuilt && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#00ffff] animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Enter House</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isBuilt && (
        <div className="w-full bg-[#0d2b45]/90 text-white border-t border-cyan-800/30">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Drafting acoustic'} />
      )}
    </div>
  );
};
export default BlueprintToBrick;
