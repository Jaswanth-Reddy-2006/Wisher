import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Home, Key } from 'lucide-react';
import gsap from 'gsap';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const ModernDoor: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  
  const handleRef = useRef<HTMLDivElement | null>(null);
  const keyRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const primaryColor = data.primaryColor || '#d30f0f';

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        setIsUnlocked(true);
        setShowMusic(true);
        fireConfetti(primaryColor);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  const handleUnlockSequence = () => {
    if (isUnlocked || isUnlocking) return;
    setIsUnlocking(true);

    const tl = gsap.timeline();

    if (keyRef.current && handleRef.current) {
      // 1. Key enters lock and rotates
      tl.to(keyRef.current, {
        rotation: 90,
        scale: 1.1,
        duration: 0.8,
        ease: 'power1.inOut',
      });

      // 2. Handle turns down
      tl.to(handleRef.current, {
        rotation: 45,
        duration: 0.3,
        ease: 'power1.in',
      });

      // 3. Trigger unlock status
      tl.to({}, {
        duration: 0.2,
        onComplete: () => {
          setIsUnlocked(true);
          setShowMusic(true);
          fireConfetti(primaryColor);
        }
      });

      // 4. Return handle to horizontal state
      tl.to(handleRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: 'power1.out',
      });
    } else {
      setIsUnlocked(true);
      setShowMusic(true);
      fireConfetti(primaryColor);
    }
  };

  return (
    <div
      ref={viewportRef}
      className={`door-viewport ${isUnlocked ? 'scrollable' : ''}`}
    >
      
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
        {/* Dynamic Background particles for luxury home feeling */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <Home className="absolute top-[10%] left-[15%] h-12 w-12 text-white" />
          <Key className="absolute bottom-[20%] right-[10%] h-10 w-10 text-white" />
        </div>

        {/* Main Door Scene */}
        <div className="door-scene">
          {/* The Door Leaf */}
          <div
            className="door-leaf"
            onClick={isPreview ? undefined : handleUnlockSequence}
            style={{ pointerEvents: isPreview ? 'none' : 'auto' }}
          >
            {/* House Number Plate */}
            <div className="house-number-plate" style={{ borderColor: primaryColor }}>
              Nº 708
            </div>

            {/* Floating visual key instruction */}
            {!isUnlocked && !isUnlocking && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white/80 bg-black/20 hover:bg-black/35 transition-colors duration-300">
                <Key className="h-10 w-10 mb-3 animate-bounce" style={{ color: primaryColor }} />
                <span className="font-display text-sm font-bold uppercase tracking-wider">
                  Click Door to Unlock
                </span>
              </div>
            )}

            {/* Keyhole Overlay during unlocking */}
            <div className="door-handle-plate">
              <div ref={handleRef} className="door-handle"></div>
              <div className="keyhole"></div>
            </div>

            {/* Rotating Key Visual Element */}
            <div
              ref={keyRef}
              className={`key-overlay ${isUnlocking && !isUnlocked ? 'visible' : ''}`}
            >
              <Key className="h-12 w-12 text-[#d4af37] drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]" />
            </div>
          </div>

          {/* Indoor View (Behind the door) */}
          <div className="indoor-view flex items-center justify-center">
            <span className="text-xl font-bold uppercase tracking-widest text-[#3d2c1f] animate-pulse">Welcome</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        {isUnlocked && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-white/70 animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Enter Home</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isUnlocked && (
        <div className="w-full bg-[#fcfaf7] text-[#111111] border-t border-[#e5dfd3]">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Background Audio Player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Acoustic Tune'} />
      )}
    </div>
  );
};
export default ModernDoor;
