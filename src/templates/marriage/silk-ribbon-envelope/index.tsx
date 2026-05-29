import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const SilkRibbonEnvelope: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const primaryColor = data.primaryColor || '#b89df5'; // Lavender theme preset

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        handleOpen();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  // Rose petals falling particle animation
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

    for (let i = 0; i < 25; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 3,
        speedY: Math.random() * 0.6 + 0.3,
        speedX: Math.random() * 0.4 - 0.2,
        angle: Math.random() * 360,
        spin: Math.random() * 0.01 - 0.005,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.beginPath();
        // Soft rounded rose petal path
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size, -p.size, -p.size * 1.5, p.size / 2, 0, p.size * 1.5);
        ctx.bezierCurveTo(p.size * 1.5, p.size / 2, p.size, -p.size, 0, 0);
        ctx.fillStyle = `rgba(244, 63, 94, ${p.opacity})`; // Rose pink color
        ctx.fill();
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.spin * 180;

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
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
  };

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className={`wedding-viewport ${isOpen ? 'scrollable' : ''}`}>
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-gradient-to-b from-[#fffafb] via-[#fff1f3] to-[#ffe4e6]">
        {/* Falling rose petals */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

        {/* Envelope 3D Container */}
        <div className={`envelope-container ${isOpen ? 'unfolded' : ''}`} onClick={handleOpen}>
          {/* Back Flap (Background) */}
          <div className="env-back bg-white border border-[#ffe4e6]"></div>

          {/* Invitation letter card inside */}
          <div className="env-card bg-white p-5 border border-pink-100 shadow-md flex flex-col justify-between text-center select-none">
            <div>
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500/10 mx-auto mb-2 animate-pulse" />
              <span className="text-[8px] uppercase tracking-widest font-bold text-slate-500 block mb-1">
                Save the Date
              </span>
              <h3 className="font-wedding-serif text-base font-bold text-neutral-800 leading-tight mb-2">
                {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
              </h3>
              <p className="text-[10px] text-slate-500 max-w-[150px] mx-auto italic mb-4">
                "{data.title || "Together in Love"}"
              </p>
            </div>
            
            {formattedDate && (
              <div className="text-[9px] font-bold text-neutral-800 border-t border-b border-neutral-100 py-1.5 uppercase tracking-wider mb-2">
                {formattedDate}
              </div>
            )}
            
            <div className="text-[8px] font-bold text-rose-500 uppercase tracking-widest animate-bounce">
              Scroll Down ↓
            </div>
          </div>

          {/* Front Fold Left */}
          <div className="env-flap env-left bg-[#fff8f9] border border-[#ffe4e6]/80"></div>
          {/* Front Fold Right */}
          <div className="env-flap env-right bg-[#fff8f9] border border-[#ffe4e6]/80"></div>
          {/* Bottom Fold */}
          <div className="env-flap env-bottom bg-[#fff5f6] border border-[#ffe4e6]"></div>

          {/* Top Fold Flap */}
          <div className="env-top-flap bg-[#fff0f2] border border-[#ffe4e6]"></div>

          {/* Interactive Silk Bow Overlay */}
          {!isOpen && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              {/* Ribbon line horizontal */}
              <div className="absolute w-[105%] h-6 bg-rose-400 opacity-90 shadow-md flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                <span className="text-[8px] text-white font-bold uppercase tracking-widest">Click Bow to Open</span>
              </div>
              {/* Ribbon line vertical */}
              <div className="absolute h-[105%] w-6 bg-rose-400 opacity-90 shadow-md" style={{ backgroundColor: primaryColor }} />
              {/* Ribbon Bow knot */}
              <div 
                onClick={handleOpen}
                className="absolute w-12 h-12 bg-rose-500 rounded-full border-2 border-white/60 shadow-lg flex items-center justify-center pointer-events-auto cursor-pointer" 
                style={{ backgroundColor: primaryColor }}
              >
                <Heart className="h-4.5 w-4.5 text-white fill-white/10" />
              </div>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-rose-500 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#fcfbfa]/90 text-[#111111] border-t border-[#e5dfd3] z-20 relative">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Silk Bow Waltz'} />
      )}
    </div>
  );
};

export default SilkRibbonEnvelope;
