import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Sparkles, Star } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const CosmicGalaxyPortal: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const primaryColor = data.primaryColor || '#b89df5'; // Lavender space color preset

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        handleOpen();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  // Starfield particle background waltz
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 45; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 0.15 + 0.05,
        speedX: Math.random() * 0.1 - 0.05,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();

        s.y += s.speedY;
        s.x += s.speedX;

        if (s.y > height) {
          s.y = -5;
          s.x = Math.random() * width;
        }
      });
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setShowMusic(true);
    fireConfetti(primaryColor);
    setTimeout(() => fireConfetti('#38bdf8'), 200); // Blue
    setTimeout(() => fireConfetti('#f43f5e'), 400); // Rose
  };

  return (
    <div className={`portal-viewport ${isOpen ? 'scrollable' : ''}`}>
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-gradient-to-b from-[#0a0518] via-[#09090f] to-[#020205]">
        {/* Starfield canvas overlay */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

        {/* Constellation nodes in bg */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

        {/* Portal Core Graphic */}
        <div 
          onClick={isPreview ? undefined : handleOpen}
          className={`portal-core-container relative flex items-center justify-center cursor-pointer transition-all duration-1000 ${
            isOpen ? 'scale-[1.3] opacity-0 pointer-events-none' : 'hover:scale-[1.03] active:scale-[0.98]'
          }`}
        >
          {/* Outer glowing dust ring */}
          <div className="absolute w-56 h-56 rounded-full border border-purple-500/20 blur-[4px] animate-spin" style={{ animationDuration: '15s', borderColor: `${primaryColor}30` }} />
          <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-sky-500/30 animate-spin" style={{ animationDuration: '25s' }} />

          {/* Galaxy swirl disc */}
          <div className="relative w-40 h-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3)_0%,rgba(16,185,129,0.05)_70%)] border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.25)] relative overflow-hidden">
            {/* Spinning stars */}
            <Star className="h-6 w-6 text-white absolute top-6 left-8 opacity-75 animate-pulse" />
            <Star className="h-5 w-5 text-sky-300 absolute bottom-8 right-6 opacity-60 animate-bounce" />
            <Star className="h-4 w-4 text-purple-400 absolute top-12 right-12 opacity-80" />

            {/* Glowing core */}
            <div className="w-16 h-16 rounded-full bg-white shadow-[0_0_30px_#ffffff] flex items-center justify-center relative z-10">
              <Sparkles className="h-6 w-6 text-purple-600 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </div>
        </div>

        {/* Title details */}
        {!isOpen && (
          <div className="absolute bottom-20 text-center animate-bounce text-xs font-bold uppercase tracking-widest text-purple-400 flex items-center gap-1.5 justify-center">
            🌌 Click Portal to Open Surprise
          </div>
        )}

        {/* Revealed card when slot opens */}
        {isOpen && (
          <div className="absolute bg-slate-900 border border-purple-500/20 p-6 pb-7 rounded-3xl shadow-2xl w-[280px] text-center transition-all duration-[1.2s] ease-out z-20 translate-y-0 scale-100 opacity-100 text-white">
            <div className="flex justify-center mb-2">
              <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" style={{ color: primaryColor }} />
            </div>
            <h4 className="font-display text-sm font-extrabold mb-1">
              Cosmos Aligned!
            </h4>
            <p className="text-[10px] text-purple-200/60 font-semibold leading-relaxed mb-4">
              Your surprise has materialized. Scroll down to read the card and details.
            </p>
            <div className="h-[1px] w-16 bg-purple-500/20 mx-auto" />
          </div>
        )}

        {/* Scroll Indicator */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-purple-400 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#0a0518] text-white border-t border-purple-950 z-20 relative">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Galaxy Suite'} />
      )}
    </div>
  );
};

export default CosmicGalaxyPortal;
