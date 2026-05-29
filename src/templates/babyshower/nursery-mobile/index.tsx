import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Sparkles, Heart } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const NurseryMobile: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<any[]>([]);

  const primaryColor = data.primaryColor || '#f5a18a'; // Peach

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        handleOpen();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  // Particle System loop on canvas
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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha -= 0.008;
        p.size *= 0.99;
        p.angle += p.spin;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        
        // Draw star shape
        ctx.beginPath();
        for (let j = 0; j < 5; j++) {
          ctx.lineTo(Math.cos(((18 + j * 72) * Math.PI) / 180) * p.size, Math.sin(((18 + j * 72) * Math.PI) / 180) * p.size);
          ctx.lineTo(Math.cos(((54 + j * 72) * Math.PI) / 180) * (p.size / 2), Math.sin(((54 + j * 72) * Math.PI) / 180) * (p.size / 2));
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const spawnParticles = (count: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const colors = ['#f5a18a', '#b89df5', '#e0f2fe', '#fef3c7', '#fbcfe8'];
    const width = canvas.width;
    const height = canvas.height;
    
    // Spawn centered around mobile location
    const centerX = width / 2;
    const centerY = height / 2.2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      particlesRef.current.push({
        x: centerX + (Math.random() - 0.5) * 60,
        y: centerY + (Math.random() - 0.5) * 60,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 0.5, // drift upward
        size: Math.random() * 12 + 6,
        alpha: 1,
        spin: (Math.random() - 0.5) * 0.05,
        angle: Math.random() * Math.PI,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  };

  const handleOpen = () => {
    if (isOpen) return;
    setIsSpinning(true);
    spawnParticles(40);
    
    // Periodic spark bursts
    const interval = setInterval(() => {
      spawnParticles(12);
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setIsOpen(true);
      setShowMusic(true);
      setIsSpinning(false);
      fireConfetti(primaryColor);
      setTimeout(() => fireConfetti('#b89df5'), 200);
      setTimeout(() => fireConfetti('#bae6fd'), 400);
    }, 1200);
  };

  return (
    <div className={`nursery-viewport ${isOpen ? 'scrollable' : ''}`}>
      {/* Canvas background for glowing star dust */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-gradient-to-b from-[#e0f2fe] via-[#fbcfe8]/40 to-[#fef3c7]/60">
        
        {/* Soft floating clouds in background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute top-[12%] left-[-10%] w-48 h-12 bg-white/70 rounded-full blur-[2px] floating-cloud cloud-1" />
          <div className="absolute top-[35%] right-[-15%] w-64 h-16 bg-white/60 rounded-full blur-[4px] floating-cloud cloud-2" />
        </div>

        {/* Nursery Mobile Hanging Crane */}
        <div className="relative flex flex-col items-center justify-center h-[520px] w-[320px] z-20">
          
          <div 
            onClick={isPreview ? undefined : handleOpen}
            className={`nursery-mobile-crane flex flex-col items-center cursor-pointer transition-all duration-1000 select-none ${
              isOpen ? 'scale-90 opacity-0 pointer-events-none' : 'hover:scale-[1.02] active:scale-[0.98]'
            } ${isSpinning ? 'spinning-action' : ''}`}
          >
            {/* Hanging thread */}
            <div className="w-[1.5px] h-20 bg-amber-800/40 relative shadow-sm" />
            
            {/* Wooden crossbar hanger */}
            <div className="w-44 h-2 bg-amber-700/80 rounded-full relative flex items-center justify-center shadow-xs">
              <div className="absolute w-2 h-2 rounded-full bg-amber-900" />
            </div>

            {/* Hanging Elements */}
            <div className="flex justify-between w-40 mt-[-2px] px-1 relative h-36">
              {/* String 1: Cloud */}
              <div className="flex flex-col items-center hanger-string s-1">
                <div className="w-[1px] h-10 bg-amber-800/30" />
                <div className="w-10 h-6 bg-white border border-slate-100 rounded-full shadow-sm flex items-center justify-center text-[10px] text-sky-400">☁️</div>
              </div>

              {/* String 2: Crescent Moon (Center) */}
              <div className="flex flex-col items-center hanger-string s-2">
                <div className="w-[1px] h-16 bg-amber-800/30" />
                <div className="w-12 h-12 bg-yellow-200 border border-yellow-300/40 rounded-full shadow-md flex items-center justify-center text-lg animate-pulse text-amber-500 font-bold select-none">🌙</div>
              </div>

              {/* String 3: Star */}
              <div className="flex flex-col items-center hanger-string s-3">
                <div className="w-[1px] h-12 bg-amber-800/30" />
                <div className="w-8 h-8 bg-pink-100 border border-pink-200/40 rounded-full shadow-sm flex items-center justify-center text-xs">⭐</div>
              </div>
            </div>

            {/* Little Instruction Tag */}
            <div className="mt-8 bg-white/95 border border-pink-100 shadow-xl rounded-2xl p-4 text-center w-[250px]">
              <span className="text-[8px] uppercase tracking-[0.25em] font-extrabold text-pink-400 block mb-1">
                Baby Shower
              </span>
              <h3 className="font-display text-sm font-black text-slate-800 truncate max-w-[210px] mx-auto mb-0.5">
                {data.targetName || "Baby Boy Thompson"}
              </h3>
              <p className="text-[10px] text-slate-500 font-semibold mb-2">
                {data.title || "Welcome Sweet Child"}
              </p>
              <div className="h-[1px] w-12 bg-pink-100 mx-auto my-1.5" />
              <div className="flex items-center justify-center gap-1 text-[8px] font-extrabold text-pink-500">
                <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} />
                <span>Tap Mobile to Spin & Open</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revealed Invitation Banner when open */}
        {isOpen && (
          <div className="absolute bg-white border border-pink-100 p-6 pb-7 rounded-3xl shadow-2xl w-[290px] text-center transition-all duration-[1.2s] ease-out z-20 translate-y-0 scale-100 opacity-100">
            <div className="flex justify-center mb-2">
              <Heart className="h-6 w-6 text-pink-400 animate-bounce" />
            </div>
            <h4 className="font-display text-sm font-extrabold text-[#111111] mb-1">
              Delivery Complete!
            </h4>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mb-4">
              A sweet miracle is on the way. Scroll down to read full celebration times and details.
            </p>
            <div className="h-[1px] w-16 bg-[#e5dfd3] mx-auto" />
          </div>
        )}

        {/* Guide banner at the bottom */}
        {!isOpen && (
          <div className="absolute bottom-16 text-center animate-bounce text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 justify-center">
            👶 Tap Hanger to Spin Portal
          </div>
        )}

        {/* Scroll down indicator */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-500 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[9px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#fdfaf6] text-[#111111] border-t border-[#fed7aa] z-20 relative">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Lullaby Tune'} />
      )}
    </div>
  );
};

export default NurseryMobile;
