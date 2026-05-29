import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import Countdown from '../../common/Countdown';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart, Calendar, MapPin, Mail, Sparkles } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const WaxSealScroll: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const primaryColor = data.primaryColor || '#d30f0f';

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setShowMusic(true);
        fireConfetti(primaryColor);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  // Particle loop for falling gold/amber stardust
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

    const particles: Array<{
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
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedY: Math.random() * 0.5 + 0.2,
        speedX: Math.random() * 0.2 - 0.1,
        angle: Math.random() * 360,
        spin: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.6, 0, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`; // Gold metallic particles
        ctx.fill();
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.spin * 180;

        if (p.y > height) {
          p.y = -10;
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

  const formattedTime = data.date
    ? new Date(data.date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className={`scroll-viewport ${isOpen ? 'scrollable' : ''}`}>
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
        {/* Falling gold dust particles */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
        
        {/* Background floral overlays */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#d30f0f_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>

        {/* Main Rolled Scroll */}
        <div className={`scroll-container ${isOpen ? 'unrolled' : ''}`}>
          
          {/* Top Cylinder */}
          <div className="scroll-rod rod-top"></div>

          {/* Paper Sheet */}
          <div className="scroll-paper">
            <div className="scroll-content">
              {/* Corner Gold ornaments */}
              <div className="scroll-gold-corner c-tl"></div>
              <div className="scroll-gold-corner c-tr"></div>
              <div className="scroll-gold-corner c-bl"></div>
              <div className="scroll-gold-corner c-br"></div>

              {/* Letter Headers */}
              <div className="flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#5e5a52] mb-2">
                  Royal Invitation
                </span>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[1px] w-8 bg-[#d4af37]" />
                  <Heart className="h-3.5 w-3.5 text-[#d4af37] fill-[#d4af37]/20" />
                  <div className="h-[1px] w-8 bg-[#d4af37]" />
                </div>

                <h1 className="font-wedding-serif text-2xl font-black text-[#111111] mb-2 leading-tight">
                  {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
                </h1>
                <p className="font-wedding-serif text-[11px] italic text-[#5e5a52] max-w-[200px] leading-relaxed">
                  {data.title || "Request the honor of your presence at their wedding celebration"}
                </p>
              </div>

              {/* Countdown timer */}
              {data.date && (
                <div className="scale-85 my-2">
                  <Countdown targetDate={data.date} primaryColor={primaryColor} />
                </div>
              )}

              {/* Event Address details */}
              <div className="flex flex-col gap-2.5 text-left bg-[#fdfaf5] p-3 rounded-xl border border-[#e5dfd3] w-full text-xs">
                {formattedDate && (
                  <div className="flex items-center gap-2 text-[#111111]">
                    <Calendar className="h-4 w-4 text-[#d4af37] shrink-0" />
                    <div>
                      <span className="font-bold">{formattedDate}</span> at {formattedTime}
                    </div>
                  </div>
                )}

                {data.extraMessage && (
                  <div className="flex items-start gap-2 text-[#111111] border-t border-[#e5dfd3] pt-2">
                    <MapPin className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Venue:</span> {data.extraMessage}
                    </div>
                  </div>
                )}
              </div>

              {/* RSVP Button */}
              {data.rsvpEmail && (
                <a
                  href={`mailto:${data.rsvpEmail}?subject=Wedding%20RSVP`}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 px-4 text-xs font-bold text-white transition-all hover:opacity-90 cursor-pointer shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Mail className="h-3.5 w-3.5" /> Confirm RSVP
                </a>
              )}
            </div>
          </div>

          {/* Bottom Cylinder */}
          <div className="scroll-rod rod-bottom"></div>

          {/* 3D Wax Seal Button */}
          <button
            className={`wax-seal-button ${isOpen ? 'cracked' : ''}`}
            onClick={handleOpen}
            title="Break Wax Seal"
          >
            <div className="wax-seal-half seal-left" style={{ background: `radial-gradient(circle, ${primaryColor}cc 30%, ${primaryColor} 90%)` }} />
            <div className="wax-seal-half seal-right" style={{ background: `radial-gradient(circle, ${primaryColor}cc 30%, ${primaryColor} 90%)` }} />
            <div className="wax-stamp-design">
              <Heart className="h-6 w-6 text-white fill-white/10" />
            </div>
          </button>
        </div>

        {/* Floating unlock label */}
        {!isOpen && (
          <div className="absolute bottom-16 text-center animate-bounce text-xs font-bold uppercase tracking-wider text-[#8b0808] flex items-center gap-1.5 justify-center">
            <Sparkles className="h-4 w-4 text-[#d4af37]" /> Click Wax Seal to Open
          </div>
        )}

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
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Waltz tune'} />
      )}
    </div>
  );
};
export default WaxSealScroll;
