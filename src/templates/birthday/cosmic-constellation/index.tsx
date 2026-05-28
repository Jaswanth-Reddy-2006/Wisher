import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import Countdown from '../../common/Countdown';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Orbit, Compass, Mail, Calendar } from 'lucide-react';
import gsap from 'gsap';
import './style.css';

export const CosmicConstellation: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const sphereRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);

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

    const tl = gsap.timeline();

    if (sphereRef.current && cardRef.current && sceneRef.current) {
      // 1. Zoom and fade out the glass sphere
      tl.to(sphereRef.current, {
        scale: 2.5,
        opacity: 0,
        rotateY: 180,
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          if (sphereRef.current) {
            sphereRef.current.style.display = 'none';
          }
        }
      });

      // 2. Animate the scene container slightly
      tl.to(sceneRef.current, {
        scale: 1.1,
        duration: 1.0,
      }, '-=1.0');

      // 3. Reveal cosmic card
      tl.to(cardRef.current, {
        opacity: 1,
        transform: 'scale(1) translateY(-60px)',
        duration: 1.2,
        ease: 'back.out(1.2)',
      }, '-=0.2');
    }
  };

  return (
    <div className="cosmic-viewport">
      <div className="nebula-cloud"></div>

      {/* Static Floating Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-2">
        <div className="absolute h-1.5 w-1.5 bg-white rounded-full top-[15%] left-[20%] animate-ping" />
        <div className="absolute h-1 w-1 bg-white rounded-full top-[30%] left-[80%] animate-pulse" />
        <div className="absolute h-2 w-2 bg-white rounded-full top-[70%] left-[10%] animate-ping" />
        <div className="absolute h-1 w-1 bg-white/60 rounded-full top-[60%] left-[75%] animate-pulse" />
        <div className="absolute h-1.5 w-1.5 bg-white rounded-full top-[85%] left-[45%] animate-pulse" />
      </div>

      {!isOpen && (
        <div className="absolute top-20 flex flex-col items-center gap-1.5 text-center pointer-events-none z-10 px-4">
          <Compass className="h-6 w-6 text-white/70" />
          <h2 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-white">
            Stellar Starmap
          </h2>
          <p className="text-xs text-white/50">Click the sphere to unlock constellations</p>
        </div>
      )}

      {/* 3D Sphere Scene */}
      <div 
        ref={sceneRef}
        className="sphere-scene"
        onClick={isPreview ? undefined : handleOpen}
        style={{ pointerEvents: isPreview ? 'none' : 'auto' }}
      >
        <div ref={sphereRef} className="celestial-sphere">
          <div className="sphere-ring ring-h"></div>
          <div className="sphere-ring ring-v"></div>
          <Orbit className="h-12 w-12 text-white/30 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        {/* Constellation SVGs drawing paths */}
        {isOpen && (
          <svg className="constellation-svg" viewBox="0 0 100 100" fill="none">
            {/* Draw star nodes */}
            <circle cx="20" cy="30" r="1.5" fill="#00ffff" className="pulsing-star" />
            <circle cx="50" cy="15" r="2" fill="#ffd700" className="pulsing-star" />
            <circle cx="80" cy="30" r="1.5" fill="#00ffff" className="pulsing-star" />
            <circle cx="65" cy="65" r="1.5" fill="#ffffff" className="pulsing-star" />
            <circle cx="35" cy="65" r="1.5" fill="#ffffff" className="pulsing-star" />
            
            {/* Draw linking lines */}
            <line x1="20" y1="30" x2="50" y2="15" stroke="rgba(0, 255, 255, 0.4)" strokeWidth="0.5" className="draw-line" />
            <line x1="50" y1="15" x2="80" y2="30" stroke="rgba(0, 255, 255, 0.4)" strokeWidth="0.5" className="draw-line" />
            <line x1="80" y1="30" x2="65" y2="65" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" className="draw-line" />
            <line x1="65" y1="65" x2="35" y2="65" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" className="draw-line" />
            <line x1="35" y1="65" x2="20" y2="30" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" className="draw-line" />
          </svg>
        )}
      </div>

      {/* Floating prompt */}
      {!isOpen && (
        <div className="absolute bottom-16 text-center animate-bounce text-xs font-bold uppercase tracking-wider text-white/60">
          ✨ Align Celestial Nodes
        </div>
      )}

      {/* Projected Message Card */}
      <div ref={cardRef} className="cosmic-text-card">
        <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white inline-block mb-3">
          Stellar Alignment
        </span>

        <h1 className="font-display text-2xl font-black text-white tracking-tight mb-1">
          {data.title || "Happy Birthday!"}
        </h1>
        <h2 className="font-display text-sm font-bold tracking-wider mb-4" style={{ color: primaryColor }}>
          For {data.targetName || "Alex Mercer"}
        </h2>

        {data.date && (
          <div className="scale-90 mb-4 bg-white/5 p-2 rounded-2xl border border-white/5">
            <Countdown targetDate={data.date} primaryColor={primaryColor} />
          </div>
        )}

        <p className="font-display text-xs text-white/70 leading-relaxed mb-6">
          {data.message || "May your special day align perfectly with the cosmos, bringing you endless joy and adventures."}
        </p>

        {data.extraMessage && (
          <div className="border-t border-white/10 pt-4 mb-4 text-[10px] text-white/40 italic flex items-center justify-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{data.extraMessage}</span>
          </div>
        )}

        {data.rsvpEmail && (
          <a
            href={`mailto:${data.rsvpEmail}?subject=Constellation%20Surprise`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold text-black transition-all hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            <Mail className="h-3.5 w-3.5" /> Confirm RSVP
          </a>
        )}
      </div>

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Cosmic ambient'} />
      )}
    </div>
  );
};
export default CosmicConstellation;
