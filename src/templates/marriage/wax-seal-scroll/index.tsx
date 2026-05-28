import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import Countdown from '../../common/Countdown';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart, Calendar, MapPin, Mail, Sparkles } from 'lucide-react';
import './style.css';

export const WaxSealScroll: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

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
    <div className="scroll-viewport">
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
                {data.targetName || "Sarah & David"}
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
          style={{ backgroundColor: primaryColor }}
        >
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

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Waltz tune'} />
      )}
    </div>
  );
};
export default WaxSealScroll;
