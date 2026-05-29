import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Disc, Zap, Radio } from 'lucide-react';
import gsap from 'gsap';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const NeonCyberpunkVinyl: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const sleeveRef = useRef<HTMLDivElement | null>(null);
  const discRef = useRef<HTMLDivElement | null>(null);

  const primaryColor = data.primaryColor || '#ff007f';

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

    const tl = gsap.timeline();

    if (sleeveRef.current && discRef.current) {
      // 1. Move sleeve down and tilt forward
      tl.to(sleeveRef.current, {
        transform: 'rotateX(15deg) rotateY(0deg) translateY(40px)',
        duration: 0.6,
        ease: 'power2.out',
      });

      // 2. Slide disc out
      tl.to(discRef.current, {
        opacity: 1,
        transform: 'translateZ(20px) translateY(-140px)',
        duration: 0.8,
        ease: 'back.out(1.5)',
      }, '-=0.2');
    }
  };

  return (
    <div className={`cyberpunk-viewport ${isOpen ? 'scrollable' : ''}`}>
      
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
        <div className="cyber-grid"></div>

        {/* Outer Neon Rings */}
        <div className="neon-ring ring-outer" style={{ borderColor: primaryColor }}></div>
        <div className="neon-ring ring-inner"></div>

        {/* Floating neon badge */}
        {!isOpen && (
          <div className="absolute top-20 flex flex-col items-center gap-1.5 animate-pulse text-center">
            <Radio className="h-6 w-6 text-[#00ffff]" />
            <span className="text-[10px] tracking-[0.3em] font-extrabold uppercase text-[#00ffff]">
              SYNTHWAVE CORE ACTIVE
            </span>
          </div>
        )}

        {/* 3D Scene */}
        <div 
          className="cyberpunk-scene"
          onClick={isPreview ? undefined : handleOpen}
          style={{ pointerEvents: isPreview ? 'none' : 'auto' }}
        >
          {/* Sleeve */}
          <div 
            ref={sleeveRef} 
            className="vinyl-sleeve"
            style={{ borderColor: primaryColor, boxShadow: `0 0 30px ${primaryColor}66` }}
          >
            <div className="absolute top-3 left-3 bg-[#00ffff]/10 border border-[#00ffff]/30 rounded px-2 py-0.5 text-[8px] font-black uppercase text-[#00ffff] tracking-widest flex items-center gap-1">
              <Zap className="h-2 w-2 animate-bounce" /> LP-STICKER
            </div>
            
            <Disc className="h-16 w-16 mb-4 text-[#00ffff] animate-spin" style={{ animationDuration: '8s' }} />
            
            <span className="text-[8px] uppercase tracking-widest text-[#5e5a52] font-black">
              B-DAY SYSTEM
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-white text-center px-4 truncate max-w-[200px]">
              {data.targetName || "SYSTEM LOADED"}
            </span>
          </div>

          {/* Disc */}
          <div 
            ref={discRef} 
            className={`vinyl-disc ${isOpen ? 'spinning' : ''}`}
            style={{ boxShadow: `0 0 25px ${primaryColor}66` }}
          >
            <div className="vinyl-groove"></div>
            <div className="vinyl-groove-2"></div>
            <div className="vinyl-groove-3"></div>

            {/* Disc center label */}
            <div className="vinyl-label" style={{ background: `radial-gradient(circle, ${primaryColor} 40%, #00ffff 100%)` }}>
              <span>TRACK 01</span>
            </div>
          </div>
        </div>

        {/* Bottom Floating prompt */}
        {!isOpen && (
          <div className="absolute bottom-16 text-center animate-bounce text-[10px] font-black uppercase tracking-widest text-[#00ffff]">
            💿 Tap sleeve to play record
          </div>
        )}

        {/* Scroll Indicator */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#00ffff] animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Decrypting Details</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#0b0b0f]/80 text-[#00ffff] border-t border-[#ff007f]/20">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Cyberpunk disk'} />
      )}
    </div>
  );
};
export default NeonCyberpunkVinyl;
