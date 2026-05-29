import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const ElegantCard: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
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

  // Gold dust falling particle animation
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

    // Initialize particles
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.random() * 0.4 - 0.2,
        angle: Math.random() * 360,
        spin: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.beginPath();
        // Leaf/petal gold flake path
        ctx.ellipse(0, 0, p.size * 1.8, p.size * 0.8, 0, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
        ctx.fill();
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.spin * 180;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        else if (p.x < 0) p.x = width;
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

  const handleClose = () => {
    setIsOpen(false);
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
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
        {/* Falling gold dust particles */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
        
        {/* Background visual details */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#d30f0f_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="book-wrapper">
          <div className={`book ${isOpen ? 'opened' : ''}`}>
            {/* PAGE 1: COVER (FLIPS LEFT) */}
            <div className={`page page-1 ${isOpen ? 'flipped' : ''}`}>
              {/* Front Side of Cover */}
              <div className="page-face front-side">
                {/* Corner Gold borders */}
                <div className="gold-ornament ornament-tl"></div>
                <div className="gold-ornament ornament-tr"></div>
                <div className="gold-ornament ornament-bl"></div>
                <div className="gold-ornament ornament-br"></div>

                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5e5a52] mb-3">
                    Wedding Invitation
                  </span>
                  
                  <div className="wedding-divider">
                    <div className="wedding-line"></div>
                    <Heart className="h-4 w-4 fill-current text-[#d4af37]" />
                    <div className="wedding-line"></div>
                  </div>

                  <h1 className="font-wedding-serif text-3xl font-bold text-[#111111] my-6 leading-snug">
                    {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
                  </h1>

                  <p className="font-wedding-serif text-sm italic text-[#5e5a52] max-w-[200px] mb-8">
                    {data.title || "Together with their families invite you to celebrate their love"}
                  </p>

                  {formattedDate && (
                    <div className="text-xs font-semibold text-[#111111] border-y border-[#e5dfd3] py-2 w-full uppercase tracking-wider mb-8">
                      {formattedDate}
                    </div>
                  )}

                  <button
                    onClick={handleOpen}
                    className="page-flip-btn flex items-center gap-1 hover:scale-105 active:scale-95 duration-200"
                  >
                    Open Invite <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Back Side of Cover (Inside Left Page) */}
              <div className="page-face back-side bg-[#faf8f5]">
                <div className="flex flex-col justify-between h-full text-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#5e5a52] block mb-4">
                      The Invitation
                    </span>
                    <div className="flex justify-center mb-6">
                      <Heart className="h-8 w-8 text-[#d30f0f] fill-[#d30f0f]/10 animate-pulse" style={{ color: primaryColor }} />
                    </div>
                    <h3 className="font-wedding-serif text-base font-bold text-[#111111] mb-2">
                      Together Forever
                    </h3>
                    <p className="text-[10px] text-[#5e5a52] max-w-[120px] mx-auto leading-relaxed">
                      We invite you to witness our vows and celebrate our love.
                    </p>
                  </div>

                  <div className="text-[9px] text-[#5e5a52] border-t border-[#e5dfd3] pt-4">
                    Scroll down for all details.
                  </div>
                </div>
              </div>
            </div>

            {/* PAGE 2: MAIN DETAILS (STATIONARY INSIDE RIGHT) */}
            <div className="page page-2">
              <div className="page-face front-side">
                {/* Gold borders */}
                <div className="gold-ornament ornament-tl"></div>
                <div className="gold-ornament ornament-tr"></div>
                <div className="gold-ornament ornament-bl"></div>
                <div className="gold-ornament ornament-br"></div>

                <div className="flex flex-col justify-between h-full text-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#5e5a52] block mb-2">
                      Our Celebration
                    </span>
                    <h2 className="font-wedding-serif text-xl font-bold text-[#111111] mb-4">
                      Vows & Ceremony
                    </h2>
                    <p className="text-[10px] text-[#5e5a52] leading-relaxed mb-6 max-w-[140px] mx-auto">
                      Please join us as we embark on this beautiful journey.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleClose}
                      className="text-[10px] uppercase font-bold text-[#5e5a52] flex items-center justify-center gap-1 hover:text-[#111111] mt-1 duration-150 cursor-pointer"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" /> Close Card
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        <div className="w-full bg-[#fcfbfa]/90 text-[#111111] border-t border-[#e5dfd3]">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Background Audio Player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Wedding Waltz'} />
      )}
    </div>
  );
};
export default ElegantCard;
