import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import Countdown from '../../common/Countdown';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart, Calendar, MapPin, Mail } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const InfinityOrigamiFold: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [step, setStep] = useState(0); // 0 = Closed, 1 = Vertically open, 2 = Fully open
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#d30f0f';

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        setStep(2);
        setShowMusic(true);
        fireConfetti(primaryColor);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  const handleNextStep = () => {
    if (step === 0) {
      setStep(1);
      setShowMusic(true);
      fireConfetti(primaryColor);
    } else if (step === 1) {
      setStep(2);
    } else {
      setStep(0);
    }
  };

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const formattedTime = data.date
    ? new Date(data.date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className={`origami-viewport ${step === 2 ? 'scrollable' : ''}`}>
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
        {/* Background stardust */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#d30f0f_1px,transparent_1px)] [background-size:20px_20px]"></div>

        {/* Title instructions */}
        <div className="absolute top-16 text-center pointer-events-none z-10 px-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#5e5a52]">
            Endless Origami Invite
          </span>
          <h2 className="font-wedding-serif text-lg font-bold text-[#111111] mt-1">
            {step === 0 ? "Click card to unfold" : step === 1 ? "Click once more..." : "Click to fold back"}
          </h2>
        </div>

        {/* 3D Scene */}
        <div 
          className={`origami-scene ${step >= 1 ? 'folded-vertical' : ''} ${step === 2 ? 'folded-horizontal' : ''}`}
          onClick={isPreview ? undefined : handleNextStep}
          style={{ pointerEvents: isPreview ? 'none' : 'auto' }}
        >
          <div className="origami-core">
            
            {/* LAYER 0 (CLOSED FLAPS TOP/BOTTOM) */}
            <div className="origami-flap flap-top" style={{ borderTop: `4px solid ${primaryColor}` }}>
              <span className="text-[9px] uppercase tracking-widest font-black text-[#5e5a52] mb-1">
                Save The Date
              </span>
              <Heart className="h-5 w-5 animate-pulse" style={{ color: primaryColor }} />
            </div>

            <div className="origami-flap flap-bottom" style={{ borderBottom: `4px solid ${primaryColor}` }}>
              <h3 className="font-wedding-serif text-sm font-bold text-[#111111] truncate max-w-[200px]">
                {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
              </h3>
              <span className="text-[8px] uppercase tracking-wider text-[#5e5a52] mt-1">
                Click to Open
              </span>
            </div>

            {/* LAYER 1 (INSIDE VERTICAL OPEN - FLAPS LEFT/RIGHT SHIELD CORE) */}
            <div className="origami-flap flap-left">
              <span className="text-[8px] uppercase tracking-widest font-bold text-[#5e5a52] rotate-[270deg] origin-center">
                Our Journey
              </span>
            </div>

            <div className="origami-flap flap-right">
              <span className="text-[8px] uppercase tracking-widest font-bold text-[#5e5a52] rotate-[90deg] origin-center">
                Wedding Day
              </span>
            </div>

            {/* LAYER 2 (FULLY UNFOLDED CORE PAGE) */}
            <div className={`origami-inside-content ${step === 2 ? 'active' : ''}`}>
              <div className="w-full flex flex-col items-center">
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#5e5a52] mb-1">
                  The Marriage Union
                </span>
                <h3 className="font-wedding-serif text-base font-extrabold text-[#111111] mb-2 leading-none">
                  {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
                </h3>
                <p className="text-[10px] text-[#5e5a52] max-w-[200px] leading-relaxed mx-auto mb-3">
                  {data.message || "We request the pleasure of your company."}
                </p>
              </div>

              {/* Countdown timer */}
              {data.date && (
                <div className="scale-75 my-1">
                  <Countdown targetDate={data.date} primaryColor={primaryColor} />
                </div>
              )}

              {/* Event Address info */}
              <div className="flex flex-col gap-2 text-left bg-[#fdfaf5] p-2.5 rounded-xl border border-[#e5dfd3] w-full text-[10px]">
                {formattedDate && (
                  <div className="flex items-center gap-1.5 text-[#111111]">
                    <Calendar className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
                    <div>
                      <span className="font-bold">{formattedDate}</span> at {formattedTime}
                    </div>
                  </div>
                )}

                {data.extraMessage && (
                  <div className="flex items-start gap-1.5 text-[#111111] border-t border-[#e5dfd3] pt-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#d4af37] shrink-0 mt-0.5" />
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
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-[10px] font-bold text-white transition-all hover:opacity-90 cursor-pointer shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Mail className="h-3.5 w-3.5" /> RSVP Status
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Floating steps indicators */}
        <div className="absolute bottom-16 flex items-center gap-3">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                step === idx ? 'w-6 bg-[#111111]' : 'bg-[#e5dfd3]'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        {step === 2 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 text-xs font-bold uppercase tracking-widest text-[#5e5a52] animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {step === 2 && (
        <div className="w-full bg-[#fcfbfa]/90 text-[#111111] border-t border-[#e5dfd3] z-20 relative">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Origami soundtrack'} />
      )}
    </div>
  );
};
export default InfinityOrigamiFold;
