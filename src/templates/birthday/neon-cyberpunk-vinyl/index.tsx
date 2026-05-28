import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import Countdown from '../../common/Countdown';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Disc, Zap, Radio, Calendar } from 'lucide-react';
import gsap from 'gsap';
import './style.css';

export const NeonCyberpunkVinyl: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const sleeveRef = useRef<HTMLDivElement | null>(null);
  const discRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

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

    if (sleeveRef.current && discRef.current && panelRef.current) {
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

      // 3. Reveal details panel
      tl.to(panelRef.current, {
        opacity: 1,
        transform: 'translateY(120px) scale(1)',
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4');
    }
  };

  return (
    <div className="cyberpunk-viewport">
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

      {/* Customizer config panel reveal */}
      <div 
        ref={panelRef} 
        className="cyberpunk-text-panel"
        style={{ borderColor: primaryColor, boxShadow: `0 0 25px ${primaryColor}44` }}
      >
        <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 border border-[#00ffff]/30 bg-[#00ffff]/5 rounded text-[#00ffff] inline-block mb-3">
          Cyberpunk Wish
        </span>
        <h1 className="font-display text-2xl font-black text-white uppercase tracking-tight mb-1">
          {data.title || "SYSTEM INITIATED"}
        </h1>
        <h2 className="font-display text-sm font-bold uppercase tracking-wider mb-4 text-[#00ffff]">
          For {data.targetName || "CYBER UNIT"}
        </h2>

        {data.date && (
          <div className="scale-90 mb-4 bg-black/40 p-2.5 rounded-xl border border-white/5">
            <Countdown targetDate={data.date} primaryColor="#00ffff" />
          </div>
        )}

        <p className="font-display text-xs text-white/80 leading-relaxed mb-4">
          {data.message || "Initializing core celebratory configurations..."}
        </p>

        {data.extraMessage && (
          <div className="border-t border-white/10 pt-3 text-[10px] text-white/40 mb-4 flex items-center justify-center gap-1">
            <Calendar className="h-3 w-3 shrink-0" />
            <span>{data.extraMessage}</span>
          </div>
        )}

        {data.rsvpEmail && (
          <a
            href={`mailto:${data.rsvpEmail}?subject=Cyberpunk%20Surprise%20Access`}
            className="inline-flex w-full items-center justify-center rounded-lg py-2.5 px-4 text-xs font-bold text-black uppercase tracking-widest transition-all cursor-pointer hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            Access RSVP
          </a>
        )}
      </div>

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Cyberpunk disk'} />
      )}
    </div>
  );
};
export default NeonCyberpunkVinyl;
