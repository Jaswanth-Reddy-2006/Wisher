import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import Countdown from '../../common/Countdown';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Mail, Calendar, MapPin, MailCheck } from 'lucide-react';
import './style.css';

export const CozyMailboxReveal: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
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
    <div className={`mailbox-viewport ${isOpen ? 'opened' : ''}`}>
      <div className="autumn-leaves"></div>

      {/* Main Header */}
      {!isOpen && (
        <div className="absolute top-20 flex flex-col items-center gap-1 text-center pointer-events-none z-10 px-4">
          <Mail className="h-6 w-6 text-[#5e5a52] animate-bounce" />
          <h2 className="font-display text-xl font-bold uppercase tracking-widest text-[#111111]">
            Curbside Mailbox
          </h2>
          <p className="text-xs text-[#5e5a52]">Click the red flag to check mail</p>
        </div>
      )}

      {/* 3D Mailbox Scene */}
      <div 
        className="mailbox-scene"
        onClick={isPreview ? undefined : handleOpen}
        style={{ pointerEvents: isPreview ? 'none' : 'auto' }}
      >
        <div className="mailbox-body">
          {/* Pivoting flag */}
          <div className="mailbox-flag" style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
            <div className="flag-plate" style={{ backgroundColor: primaryColor, borderColor: primaryColor }}></div>
          </div>

          {/* Mailbox Lid front */}
          <div className="mailbox-lid">
            {/* Stamped letter box number */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 text-white/40 text-[9px] font-black tracking-widest">
              POST
            </div>
          </div>

          {/* Envelope inside */}
          <div className="mailbox-envelope">
            <div className="absolute inset-1 border border-dashed border-[#5e5a52]/20 rounded flex items-center justify-center">
              <MailCheck className="h-8 w-8 text-[#5e5a52]/40" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Instruction */}
      {!isOpen && (
        <div className="absolute bottom-16 text-center animate-bounce text-xs font-bold uppercase tracking-wider text-[#b80c0c] flex items-center gap-1.5 justify-center">
          📬 Push Indicator Flag Down
        </div>
      )}

      {/* Slide Up Details Card */}
      <div className={`mailbox-details-card ${isOpen ? 'visible' : ''}`}>
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
          {data.message || "A new letter has arrived! Join us for a cozy housewarming dinner at our new place."}
        </p>

        {/* Address schedule */}
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
            href={`mailto:${data.rsvpEmail}?subject=Mailbox%20Housewarming%20RSVP`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold text-white transition-all hover:opacity-90 cursor-pointer shadow-md"
            style={{ backgroundColor: primaryColor }}
          >
            <Mail className="h-3.5 w-3.5" /> Confirm RSVP
          </a>
        )}
      </div>

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Mailbox soundtrack'} />
      )}
    </div>
  );
};
export default CozyMailboxReveal;
