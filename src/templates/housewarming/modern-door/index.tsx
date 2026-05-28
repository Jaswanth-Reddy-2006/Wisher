import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import Countdown from '../../common/Countdown';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Home, Calendar, MapPin, Mail, Key } from 'lucide-react';
import gsap from 'gsap';
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

    // 1. Key enters lock and rotates
    if (keyRef.current && handleRef.current) {
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
      // Fallback if elements not bound yet
      setIsUnlocked(true);
      setShowMusic(true);
      fireConfetti(primaryColor);
    }
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
    <div
      ref={viewportRef}
      className={`door-viewport ${isUnlocked ? 'unlocked' : ''}`}
    >
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
        <div className="indoor-view">
          <div className="housewarming-card" style={{ borderTop: `6px solid ${primaryColor}` }}>
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white inline-block mb-4"
              style={{ backgroundColor: primaryColor }}
            >
              House Warming
            </span>

            <h1 className="font-display text-2xl font-extrabold text-[#111111] mb-1">
              {data.title || "Our New Home"}
            </h1>
            <h2 className="font-display text-base font-bold text-[#5e5a52] mb-4">
              Hosted by {data.targetName || "The Sharma Family"}
            </h2>

            {data.date && (
              <div className="scale-90 mb-4">
                <Countdown targetDate={data.date} primaryColor={primaryColor} />
              </div>
            )}

            <p className="font-display text-xs text-[#5e5a52] leading-relaxed mb-6">
              {data.message || "We have moved into our new nest! Join us for a housewarming party to bless our new home."}
            </p>

            {/* Address Info */}
            <div className="flex flex-col gap-2 my-4 text-left bg-[#f5f2eb] p-3 rounded-xl border border-[#e5dfd3] text-xs">
              {formattedDate && (
                <div className="flex items-center gap-2 text-[#111111]">
                  <Calendar className="h-4 w-4 shrink-0" style={{ color: primaryColor }} />
                  <div>
                    <span className="font-bold">{formattedDate}</span> at {formattedTime}
                  </div>
                </div>
              )}

              {data.extraMessage && (
                <div className="flex items-start gap-2 text-[#111111] border-t border-[#e5dfd3] pt-2">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color: primaryColor }} />
                  <div>
                    <span className="font-bold">Address:</span> {data.extraMessage}
                  </div>
                </div>
              )}
            </div>

            {data.rsvpEmail && (
              <a
                href={`mailto:${data.rsvpEmail}?subject=Housewarming%20RSVP`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold text-white transition-all hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                <Mail className="h-4 w-4" /> Confirm RSVP
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Background Audio Player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Acoustic Tune'} />
      )}
    </div>
  );
};
export default ModernDoor;
