import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import Countdown from '../../common/Countdown';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Key, Calendar, MapPin, Mail } from 'lucide-react';
import gsap from 'gsap';
import './style.css';

export const IsometricNeighborhood: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isFalling, setIsFalling] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const keyAssetRef = useRef<HTMLDivElement | null>(null);
  const primaryColor = data.primaryColor || '#d30f0f';

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        setIsDropped(true);
        setShowMusic(true);
        fireConfetti(primaryColor);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  const handleKeyDrop = () => {
    if (isFalling || isDropped) return;
    setIsFalling(true);

    const tl = gsap.timeline();

    if (keyAssetRef.current) {
      // 1. Key spins and drops down
      tl.to(keyAssetRef.current, {
        transform: 'translate(-50%, -50%) translateZ(60px) rotateY(720deg)',
        duration: 1.0,
        ease: 'power2.in',
        onComplete: () => {
          setIsDropped(true);
          setShowMusic(true);
          fireConfetti(primaryColor);
        }
      });
    } else {
      // Fallback
      setIsDropped(true);
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
    <div className="neighborhood-viewport">
      {/* Background stardust */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Main Header */}
      {!isDropped && (
        <div className="absolute top-20 flex flex-col items-center gap-1.5 text-center pointer-events-none z-10 px-4">
          <span className="text-[10px] tracking-[0.25em] font-extrabold text-[#d2c8b2] uppercase">
            3D LOW-POLY LANDSCAPE
          </span>
          <h2 className="font-display text-2xl font-bold text-[#111111] tracking-tight">
            Key Drop Invitation
          </h2>
          <p className="text-xs text-[#5e5a52]">Click the floating gold key to open</p>
        </div>
      )}

      {/* 3D Neighborhood Scene */}
      <div className="neighborhood-scene">
        <div className={`isometric-block ${isDropped ? 'zoomed' : ''}`}>
          
          {/* 3D House */}
          <div className="house-obj">
            <div className="house-wall wall-h-front"></div>
            <div className="house-wall wall-h-right"></div>
            {/* Sliding roof panel */}
            <div 
              className={`house-roof-slide ${isDropped ? 'slid-open' : ''}`}
              style={{ backgroundColor: primaryColor }}
            ></div>
          </div>

          {/* Shockwave ring (Ripple wave) */}
          <div className={`shockwave-ring ${isDropped ? 'wave' : ''}`}></div>
        </div>

        {/* Floating Gold Key */}
        <div
          ref={keyAssetRef}
          className={`gold-key-asset ${isFalling ? 'falling' : ''} ${isDropped ? 'hidden' : ''}`}
          onClick={isPreview ? undefined : handleKeyDrop}
          style={{ pointerEvents: isPreview ? 'none' : 'auto' }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="12" stroke="#d4af37" strokeWidth="4" fill="#ffd700"/>
            <rect x="28" y="18" width="22" height="4" fill="#ffd700" stroke="#d4af37" strokeWidth="2"/>
            <rect x="42" y="22" width="4" height="6" fill="#ffd700" stroke="#d4af37" strokeWidth="2"/>
            <rect x="48" y="22" width="4" height="6" fill="#ffd700" stroke="#d4af37" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* Floating unlock label */}
      {!isDropped && (
        <div className="absolute bottom-16 text-center animate-bounce text-xs font-bold uppercase tracking-wider text-[#b80c0c] flex items-center gap-1.5 justify-center">
          <Key className="h-4 w-4 text-[#d4af37]" /> Insert Key into Chimney
        </div>
      )}

      {/* Pop-over Address Card details */}
      <div className={`neighborhood-card ${isDropped ? 'visible' : ''}`}>
        <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-[#111111] text-white rounded-full inline-block mb-3">
          House Warming
        </span>

        <h1 className="font-display text-2xl font-black text-[#111111] mb-1">
          {data.title || "Our New Home"}
        </h1>
        <h2 className="font-display text-sm font-bold text-[#5e5a52] mb-4">
          Hosted by {data.targetName || "The Sharma Family"}
        </h2>

        {data.date && (
          <div className="scale-85 mb-4">
            <Countdown targetDate={data.date} primaryColor={primaryColor} />
          </div>
        )}

        <p className="font-display text-xs text-[#5e5a52] leading-relaxed mb-5">
          {data.message || "We have settled in! Drop by to check out our new isometric neighborhood."}
        </p>

        {/* Details address */}
        <div className="flex flex-col gap-2.5 text-left bg-[#fdfdfb] p-3 rounded-xl border border-[#e5dfd3] w-full text-xs mb-5">
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold text-white transition-all hover:opacity-90 cursor-pointer shadow-md"
            style={{ backgroundColor: primaryColor }}
          >
            <Mail className="h-3.5 w-3.5" /> Confirm RSVP
          </a>
        )}
      </div>

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Neighborhood acoustic'} />
      )}
    </div>
  );
};
export default IsometricNeighborhood;
