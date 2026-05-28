import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import Countdown from '../../common/Countdown';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart, Calendar, MapPin, Mail, ChevronRight, ChevronLeft } from 'lucide-react';
import './style.css';

export const ElegantCard: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
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

  const formattedTime = data.date
    ? new Date(data.date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className="wedding-viewport">
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
                  <Heart className="h-4 w-4 fill-current text-gold text-[#d4af37]" />
                  <div className="wedding-line"></div>
                </div>

                <h1 className="font-wedding-serif text-3xl font-bold text-[#111111] my-6 leading-snug">
                  {data.targetName || "Sarah & David"}
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
                    The Countdown
                  </span>
                  <div className="flex justify-center mb-6">
                    <Heart className="h-8 w-8 text-[#d30f0f] fill-[#d30f0f]/10 animate-pulse" style={{ color: primaryColor }} />
                  </div>
                  <h3 className="font-wedding-serif text-lg font-bold text-[#111111] mb-2">
                    Counting down the days...
                  </h3>
                  <p className="text-xs text-[#5e5a52] mb-4">
                    Until we walk down the aisle and start our forever together.
                  </p>
                </div>

                {data.date && (
                  <div className="scale-90">
                    <Countdown targetDate={data.date} primaryColor={primaryColor} />
                  </div>
                )}

                <div className="text-[10px] text-[#5e5a52] border-t border-[#e5dfd3] pt-4">
                  We look forward to seeing you!
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
                  <h2 className="font-wedding-serif text-2xl font-bold text-[#111111] mb-4">
                    Invitation Details
                  </h2>
                  <p className="text-xs text-[#5e5a52] leading-relaxed mb-6 max-w-[240px] mx-auto">
                    {data.message || "We request the honor of your presence to celebrate our special union."}
                  </p>
                </div>

                {/* Event Metadata */}
                <div className="flex flex-col gap-3 my-4 text-left bg-[#fcfbfa] p-4 rounded-xl border border-[#e5dfd3]">
                  {formattedDate && (
                    <div className="flex items-start gap-3 text-xs text-[#111111]">
                      <Calendar className="h-4 w-4 text-[#d4af37] shrink-0" />
                      <div>
                        <p className="font-bold">{formattedDate}</p>
                        <p className="text-[10px] text-[#5e5a52]">{formattedTime}</p>
                      </div>
                    </div>
                  )}

                  {data.extraMessage && (
                    <div className="flex items-start gap-3 text-xs text-[#111111] border-t border-[#e5dfd3] pt-3">
                      <MapPin className="h-4 w-4 text-[#d4af37] shrink-0" />
                      <div>
                        <p className="font-bold">Venue & Schedule</p>
                        <p className="text-[10px] text-[#5e5a52] leading-normal">{data.extraMessage}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {data.rsvpEmail && (
                    <a
                      href={`mailto:${data.rsvpEmail}?subject=Wedding%20RSVP%20Status`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold text-white transition-all hover:opacity-90 cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Mail className="h-3.5 w-3.5" /> Confirm RSVP
                    </a>
                  )}

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

      {/* Background Audio Player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Wedding Waltz'} />
      )}
    </div>
  );
};
export default ElegantCard;
