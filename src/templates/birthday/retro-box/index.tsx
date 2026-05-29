import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Gift, Star, Cake } from 'lucide-react';
import gsap from 'gsap';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const RetroBox: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  
  const boxRef = useRef<HTMLDivElement | null>(null);
  const lidRef = useRef<HTMLDivElement | null>(null);
  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  const primaryColor = data.primaryColor || '#d30f0f';

  useEffect(() => {
    // If in live customizer preview mode, auto-open after 1.5 seconds so the user sees modifications
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

    // Fire Confetti!
    fireConfetti(primaryColor);

    // GSAP Cinematic Sequence
    const tl = gsap.timeline();

    if (lidRef.current && boxRef.current) {
      // 1. Pop the lid off into 3D space
      tl.to(lidRef.current, {
        transform: 'translateZ(100px) translateY(-240px) rotateX(120deg) rotateY(45deg)',
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // 2. Slow rotation drift zoom
      tl.to(boxRef.current, {
        rotateX: -10,
        rotateY: 25,
        scale: 1.05,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4');

      // 3. Fall the box sides flat
      const sideDuration = 0.7;
      const sideEase = 'back.out(1.2)';

      if (frontRef.current) {
        tl.to(frontRef.current, { transform: 'rotateY(0deg) translateZ(100px) rotateX(90deg)', duration: sideDuration, ease: sideEase }, '-=0.2');
      }
      if (backRef.current) {
        tl.to(backRef.current, { transform: 'rotateY(180deg) translateZ(100px) rotateX(90deg)', duration: sideDuration, ease: sideEase }, '-=0.7');
      }
      if (leftRef.current) {
        tl.to(leftRef.current, { transform: 'rotateY(-90deg) translateZ(100px) rotateX(90deg)', duration: sideDuration, ease: sideEase }, '-=0.7');
      }
      if (rightRef.current) {
        tl.to(rightRef.current, { transform: 'rotateY(90deg) translateZ(100px) rotateX(90deg)', duration: sideDuration, ease: sideEase }, '-=0.7');
      }
    }
  };

  return (
    <div className={`template-viewport ${isOpen ? 'scrollable' : ''}`}>
      
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
        {/* Background Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <Star className="absolute top-12 left-[10%] h-12 w-12 animate-bounce" style={{ color: primaryColor }} />
          <Cake className="absolute bottom-20 right-[15%] h-16 w-16 animate-pulse" style={{ color: primaryColor }} />
          <Gift className="absolute top-[40%] right-[8%] h-10 w-10 animate-bounce" style={{ color: primaryColor }} />
        </div>

        {/* Main 3D Box Container */}
        {!isOpen && (
          <div className="text-center absolute top-20 pointer-events-none z-10 px-4">
            <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-[#111111] mb-2">
              A Special Surprise
            </h2>
            <p className="font-display text-sm text-[#5e5a52]">
              Click the box to open your wish
            </p>
          </div>
        )}

        <div 
          className="box-scene" 
          onClick={isPreview ? undefined : handleOpen}
          style={{ pointerEvents: isPreview ? 'none' : 'auto' }}
        >
          <div 
            ref={boxRef} 
            className={`gift-box ${isOpen ? 'open' : 'breathing'}`}
          >
            {/* Lid */}
            <div ref={lidRef} className="box-lid">
              <div className="lid-top" style={{ backgroundColor: primaryColor }}>
                <div className="ribbon-v"></div>
                <div className="ribbon-h"></div>
                <div className="lid-bow"></div>
              </div>
              <div className="lid-side lid-side-front" style={{ backgroundColor: primaryColor }}></div>
              <div className="lid-side lid-side-back" style={{ backgroundColor: primaryColor }}></div>
              <div className="lid-side lid-side-left" style={{ backgroundColor: primaryColor }}></div>
              <div className="lid-side lid-side-right" style={{ backgroundColor: primaryColor }}></div>
            </div>

            {/* Box Sides */}
            <div ref={frontRef} className="box-face face-front" style={{ '--theme-color': primaryColor } as React.CSSProperties}>
              <div className="ribbon-v"></div>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white/30 tracking-wider uppercase">BDAY</div>
            </div>
            <div ref={backRef} className="box-face face-back" style={{ '--theme-color': primaryColor } as React.CSSProperties}>
              <div className="ribbon-v"></div>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white/30 tracking-wider uppercase">BDAY</div>
            </div>
            <div ref={leftRef} className="box-face face-left" style={{ '--theme-color': primaryColor } as React.CSSProperties}>
              <div className="ribbon-h"></div>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white/30 tracking-wider uppercase">Wish</div>
            </div>
            <div ref={rightRef} className="box-face face-right" style={{ '--theme-color': primaryColor } as React.CSSProperties}>
              <div className="ribbon-h"></div>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white/30 tracking-wider uppercase">Love</div>
            </div>
            <div className="box-face face-bottom"></div>
          </div>
        </div>

        {/* Rising Greeting Card */}
        <div className={`greeting-card-container ${isOpen ? 'visible' : ''}`}>
          <h3 className="font-display text-lg font-black text-[#111111] mb-1">
            For {data.targetName || "You"}
          </h3>
          <p className="text-xs text-[#5e5a52] font-semibold leading-relaxed mb-4">
            {data.title || "Happy Birthday!"}
          </p>
          <div className="h-[1px] w-12 bg-[#cbd5e1] mx-auto mb-3" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-[#cbd5e1] animate-pulse">
            Scroll Down to Celebrate 🎈
          </span>
        </div>

        {/* Floating Instruction text */}
        {!isOpen && (
          <div className="tap-instruction" style={{ color: primaryColor }}>
            🎁 Open Surprise
          </div>
        )}

        {/* Scroll Indicator */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#5e5a52] animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isOpen && (
        <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
      )}

      {/* Background Audio Player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Birthday Tune'} />
      )}
    </div>
  );
};
export default RetroBox;
