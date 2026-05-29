import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Trophy, Star, Mail, Calendar, MapPin } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const DiplomaRollUnwrap: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const primaryColor = data.primaryColor || '#d4af37'; // Golden accent color preset

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        handleOpen();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  // Golden stardust floating particle animation
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

    const sparks: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      spin: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 0.4 + 0.2,
        speedX: Math.random() * 0.2 - 0.1,
        angle: Math.random() * 360,
        spin: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      sparks.forEach((s) => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate((s.angle * Math.PI) / 180);
        ctx.beginPath();
        // Star node glow
        ctx.rect(-s.size, -s.size, s.size * 2, s.size * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${s.opacity})`; // Gold color
        ctx.fill();
        ctx.restore();

        s.y += s.speedY;
        s.x += s.speedX;
        s.angle += s.spin * 180;

        if (s.y > height) {
          s.y = -10;
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
    setTimeout(() => fireConfetti('#b89df5'), 200); // Lavender accent
    setTimeout(() => fireConfetti('#38bdf8'), 400); // Blue accent
  };

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const formattedTime = data.date
    ? new Date(data.date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className={`diploma-roll-viewport ${isOpen ? 'scrollable' : ''}`}>
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#101e30] to-[#0f172a]">
        {/* Floating stardust */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

        {/* Scroll unrolling container */}
        <div className={`diploma-container ${isOpen ? 'unrolled' : ''}`} onClick={isPreview ? undefined : handleOpen}>
          {/* Top Wooden Rod cylinder */}
          <div className="diploma-rod top-rod"></div>

          {/* Roll out paper sheet */}
          <div className="diploma-sheet bg-[#fdfbf7] border-x border-[#c4b998] shadow-2xl relative select-none">
            {/* Corner ornaments */}
            <div className="gold-seal-corner s-tl" />
            <div className="gold-seal-corner s-tr" />
            <div className="gold-seal-corner s-bl" />
            <div className="gold-seal-corner s-br" />

            <div className="diploma-inner flex flex-col justify-between h-full p-4 text-center">
              <div>
                <Trophy className="h-6 w-6 text-amber-500 mx-auto mb-2 animate-bounce" />
                <span className="text-[8px] uppercase tracking-[0.25em] font-extrabold text-[#5e5a52] block mb-1">
                  Official Scroll
                </span>
                
                <h2 className="font-wedding-serif text-lg font-black text-neutral-800 leading-tight mb-2">
                  {data.targetName || "The Graduate"}
                </h2>
                
                <p className="text-[10px] text-[#5e5a52] max-w-[160px] mx-auto leading-relaxed mb-4">
                  "{data.message || "Join us to celebrate this major achievement."}"
                </p>
              </div>

              {/* Event card timeline details */}
              <div className="flex flex-col gap-2 text-left bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/40 w-full text-[10px]">
                {formattedDate && (
                  <div className="flex items-center gap-1.5 text-neutral-800">
                    <Calendar className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
                    <div>
                      <span className="font-bold">{formattedDate}</span> at {formattedTime}
                    </div>
                  </div>
                )}
                {data.extraMessage && (
                  <div className="flex items-start gap-1.5 text-neutral-800 border-t border-amber-200/30 pt-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Venue:</span> {data.extraMessage}
                    </div>
                  </div>
                )}
              </div>

              {data.rsvpEmail && (
                <a
                  href={`mailto:${data.rsvpEmail}?subject=Graduation%20RSVP`}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-[9px] font-bold text-white transition-all hover:opacity-90 mt-2 shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Mail className="h-3.5 w-3.5" /> Confirm RSVP
                </a>
              )}
            </div>
          </div>

          {/* Bottom Wooden Rod cylinder */}
          <div className="diploma-rod bottom-rod"></div>

          {/* Gold Tie Wrap Overlay */}
          {!isOpen && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              {/* Red Ribbon tie wrap */}
              <div className="absolute w-[105%] h-5 bg-rose-600 border-y border-amber-400 opacity-95 shadow-md flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                <span className="text-[7px] text-white font-bold uppercase tracking-widest">Click Ribbon to Unroll</span>
              </div>
              {/* Tassel bow knot */}
              <div className="absolute w-10 h-10 rounded-full bg-amber-500 border border-amber-600 shadow-lg flex items-center justify-center pointer-events-auto cursor-pointer">
                <Star className="h-4.5 w-4.5 text-white fill-white/10" />
              </div>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#d4af37] animate-bounce select-none pointer-events-none z-30">
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
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Fanfare Tune'} />
      )}
    </div>
  );
};

export default DiplomaRollUnwrap;
