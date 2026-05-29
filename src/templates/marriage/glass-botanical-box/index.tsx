import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart, Calendar, MapPin, Mail, Sparkles, Sprout } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const GlassBotanicalBox: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [tilt, setTilt] = useState({ rx: 15, ry: -10 });

  const primaryColor = data.primaryColor || '#d30f0f';
  const sceneRef = useRef<HTMLDivElement | null>(null);

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

  // Capture mouse move to perform subtle interactive 3D parallax tilt
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isOpen || isPreview) return;
    if (!sceneRef.current) return;

    const rect = sceneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Map mouse position to angle
    const rx = 15 - (y / rect.height) * 20; // range 5 to 25
    const ry = -10 + (x / rect.width) * 20; // range -20 to 0
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    if (isOpen || isPreview) return;
    setTilt({ rx: 15, ry: -10 });
  };

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
    <div className={`glass-box-viewport ${isOpen ? 'opened scrollable' : ''}`}>
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
        <div className="botanical-bg"></div>

        {/* Floating Botanical icons */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08] z-2">
          <Sprout className="absolute top-[12%] right-[10%] h-16 w-16" />
          <Sprout className="absolute bottom-[15%] left-[8%] h-20 w-20 rotate-45" />
        </div>

        {!isOpen && (
          <div className="absolute top-20 flex flex-col items-center gap-1.5 text-center pointer-events-none z-10 px-4">
            <Heart className="h-5 w-5 text-emerald-800" />
            <h2 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-emerald-900">
              Botanical Terrarium
            </h2>
            <p className="text-xs text-[#5e5a52]">Hover to tilt &bull; Click to open case</p>
          </div>
        )}

        {/* 3D Scene */}
        <div 
          ref={sceneRef}
          className="terrarium-scene"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={isPreview ? undefined : handleOpen}
          style={{ pointerEvents: isPreview ? 'none' : 'auto' }}
        >
          <div 
            className="terrarium-box"
            style={{ transform: isOpen ? 'rotateX(10deg) rotateY(0deg)' : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
          >
            {/* Glass Door (Front panel) */}
            <div className="glass-door">
              <div className="border border-white/20 h-[96%] w-[94%] rounded-xl flex flex-col items-center justify-between p-6">
                <Sparkles className="h-6 w-6 text-[#d4af37]" />
                
                <div className="text-center">
                  <span className="text-[8px] uppercase tracking-[0.25em] font-extrabold text-[#d4af37] block mb-2">
                    Wedding Ceremony
                  </span>
                  <h3 className="font-wedding-serif text-sm font-bold text-white leading-tight max-w-[160px] truncate">
                    {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
                  </h3>
                </div>

                <span className="text-[8px] uppercase tracking-widest font-black text-white/80 border border-white/30 px-3 py-1 rounded">
                  Unlatch Box
                </span>
              </div>
            </div>

            {/* Inside Invitation Card */}
            <div className="terrarium-inside-card">
              <div className="flex flex-col justify-between h-full w-full">
                {/* Botanical Frame header */}
                <div>
                  <Heart className="h-5 w-5 text-[#d4af37] fill-[#d4af37]/10 mx-auto mb-2" />
                  <h4 className="font-wedding-serif text-[10px] uppercase tracking-widest text-[#5e5a52] mb-1">
                    Wedding Celebration
                  </h4>
                  <h1 className="font-wedding-serif text-lg font-extrabold text-[#111111] mb-2 leading-none">
                    {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
                  </h1>
                  <p className="text-[10px] text-[#5e5a52] leading-normal max-w-[200px] mx-auto mb-3">
                    {data.message || "Join us in our forest garden under the skies."}
                  </p>
                </div>

                {/* Event Schedule address details */}
                <div className="flex flex-col gap-2 text-left bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 text-[10px] my-3">
                  {formattedDate && (
                    <div className="flex items-center gap-1.5 text-emerald-900">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <div>
                        <span className="font-bold">{formattedDate}</span> at {formattedTime}
                      </div>
                    </div>
                  )}

                  {data.extraMessage && (
                    <div className="flex items-start gap-1.5 text-emerald-900 border-t border-emerald-100/50 pt-2">
                      <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Location:</span> {data.extraMessage}
                      </div>
                    </div>
                  )}
                </div>

                {/* RSVP Button */}
                {data.rsvpEmail && (
                  <a
                    href={`mailto:${data.rsvpEmail}?subject=Garden%20Wedding%20RSVP`}
                    className="inline-flex w-full items-center justify-center gap-1 rounded-xl py-2 px-3 text-[10px] font-bold text-white transition-all hover:opacity-90 cursor-pointer shadow-sm"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Mail className="h-3.5 w-3.5" /> Confirm RSVP
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating prompt */}
        {!isOpen && (
          <div className="absolute bottom-16 text-center animate-bounce text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1 justify-center">
            🌿 Click Glass to Unlock
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
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Garden Waltz'} />
      )}
    </div>
  );
};
export default GlassBotanicalBox;
