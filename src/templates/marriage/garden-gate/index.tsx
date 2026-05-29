import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const GardenGate: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const primaryColor = data.primaryColor || '#b89df5'; // Lavender/Grape

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        handleOpen();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  // Rose Petals Falling particle loop
  useEffect(() => {
    if (!isOpen) return;
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

    // Initialize petals
    const petals: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      spin: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 45; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * -height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 1.5 + 1.0,
        speedX: Math.random() * 0.8 - 0.4,
        angle: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.4 + 0.6,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.spin;

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;
        
        // Draw elegant rose petal shape
        ctx.fillStyle = '#fca5a5'; // light rose pink
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Highlight line on petal
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(-p.size, 0);
        ctx.quadraticCurveTo(0, -p.size * 0.2, p.size, 0);
        ctx.stroke();

        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isOpen]);

  const handleOpen = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    
    setTimeout(() => {
      setIsOpen(true);
      setShowMusic(true);
      setIsOpening(false);
      fireConfetti(primaryColor);
      setTimeout(() => fireConfetti('#fca5a5'), 250);
    }, 1500);
  };

  return (
    <div className={`garden-gate-viewport ${isOpen ? 'scrollable' : ''}`}>
      {/* HTML5 Canvas for Rose Petals */}
      {isOpen && <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />}

      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-gradient-to-b from-[#fdf2f8] via-[#fbcfe8]/40 to-[#e0e7ff]/60">
        
        {/* Secret Garden Pathway Background behind gates */}
        <div className="absolute inset-0 z-0 bg-garden-path flex items-center justify-center">
          <div className="absolute inset-0 bg-black/5" />
          {/* Soft shining bokeh light spots */}
          <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse top-1/4" style={{ animationDuration: '5s' }} />
        </div>

        {/* 3D Gate Assembly */}
        <div className="absolute inset-0 flex z-30 pointer-events-none perspective-container justify-center items-center">
          <div className="relative w-[340px] h-[520px] flex transform-style-3d">
            
            {/* Left Gate Door */}
            <div className={`gate-door left-gate ${isOpen ? 'open' : ''} ${isOpening ? 'shaking' : ''}`}>
              <div className="gate-iron-framework" />
              {/* Climbing vines and roses */}
              <div className="rose-decor left-roses" />
            </div>

            {/* Right Gate Door */}
            <div className={`gate-door right-gate ${isOpen ? 'open' : ''} ${isOpening ? 'shaking' : ''}`}>
              <div className="gate-iron-framework" />
              <div className="rose-decor right-roses" />
            </div>

            {/* Golden Padlock Lock Center */}
            {!isOpen && (
              <div 
                onClick={handleOpen}
                className={`gate-padlock ${isOpening ? 'unlocking' : ''}`}
              >
                <div className="padlock-loop" />
                <div className="padlock-body">
                  <Heart className="h-4.5 w-4.5 text-amber-600 fill-current animate-pulse" />
                  <span className="keyhole" />
                </div>
                <div className="lock-tag">Tap to Unlock</div>
              </div>
            )}

          </div>
        </div>

        {/* Secret Garden Invitation Card Reveal */}
        <div className={`garden-invitation-wrap ${isOpen ? 'active' : ''} z-10 select-none`}>
          <div className="bg-white/90 backdrop-blur-md border border-[#f3e8ff] p-7 pb-8 rounded-3xl shadow-2xl w-[280px] text-center relative mx-auto transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex justify-center mb-3">
              <Heart className="h-6 w-6 text-rose-400 fill-current animate-pulse" />
            </div>
            
            <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-slate-500 block mb-1">
              Wedding Invitation
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-800 leading-tight mb-2">
              {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
            </h3>
            
            <div className="h-[1.5px] w-12 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto my-3" />

            <p className="text-[11px] text-slate-600 font-medium leading-relaxed px-1">
              "{data.message}"
            </p>

            <div className="mt-5 text-[9px] font-extrabold uppercase text-indigo-600 tracking-wider">
              {data.venueName || "The Secret Garden"}
            </div>
          </div>
        </div>

        {/* Floating guidance note */}
        {!isOpen && (
          <div className="absolute bottom-16 text-center animate-bounce text-xs font-bold uppercase tracking-wider text-slate-600 z-40 flex items-center gap-1.5 justify-center">
            🌹 Click Lock to Open Garden Gates
          </div>
        )}

        {/* Scroll helper */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-700 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[9px] text-slate-600">Scroll to Enter Event</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#fdfaf7] text-[#111111] border-t border-[#fbcfe8] z-20 relative">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Classical Wedding'} />
      )}
    </div>
  );
};

export default GardenGate;
