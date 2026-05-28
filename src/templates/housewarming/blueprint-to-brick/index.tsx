import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import Countdown from '../../common/Countdown';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Hammer, Calendar, MapPin, Mail } from 'lucide-react';
import './style.css';

export const BlueprintToBrick: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isBuilt, setIsBuilt] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#d30f0f';

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        setIsBuilt(true);
        setShowMusic(true);
        fireConfetti(primaryColor);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview, data]);

  const handleBuild = () => {
    if (isBuilt) return;
    setIsBuilt(true);
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
    <div className={`blueprint-viewport ${isBuilt ? 'built' : ''}`}>
      {/* Blueprint Header */}
      {!isBuilt && (
        <div className="absolute top-20 flex flex-col items-center gap-1.5 text-center pointer-events-none z-10 px-4">
          <span className="text-[10px] tracking-[0.25em] font-extrabold text-[#00ffff] uppercase">
            ARCHITECTURAL DRAFTING MODE
          </span>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">
            House Blueprint
          </h2>
          <p className="text-xs text-white/50">Click "Build Home" to raise structure</p>
        </div>
      )}

      {/* 3D Blueprint Scene */}
      <div className="blueprint-scene">
        <div className="isometric-grid">
          {/* Base Layout Square */}
          <div className="blueprint-line" style={{ width: '100px', height: '100px', top: '50px', left: '50px' }}></div>

          {/* Wall Panel Front (Raises up rotateX) */}
          <div 
            className={`wall-panel ${isBuilt ? 'popped' : ''}`}
            style={{ width: '100px', bottom: '50px', left: '50px' }}
          ></div>

          {/* Wall Panel Side */}
          <div 
            className={`wall-panel ${isBuilt ? 'popped' : ''}`}
            style={{ width: '100px', bottom: '50px', left: '150px', transform: 'rotateX(-90deg) rotateY(90deg) scaleY(1)' }}
          ></div>

          {/* Roof wireframe */}
          <div className="roof-wireframe"></div>
        </div>
      </div>

      {/* Build CTA button */}
      {!isBuilt && (
        <button
          onClick={handleBuild}
          className="absolute bottom-20 inline-flex items-center gap-2 rounded-xl bg-[#00ffff] py-3.5 px-6 font-display text-xs font-black uppercase tracking-wider text-black shadow-[0_10px_20px_rgba(0,255,255,0.25)] hover:scale-105 active:scale-95 transition-all cursor-pointer z-20"
        >
          <Hammer className="h-4 w-4" /> Build Home
        </button>
      )}

      {/* Pop-over Address Card */}
      <div className={`blueprint-info-card ${isBuilt ? 'visible' : ''}`}>
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
          {data.message || "We have built our home from the ground up. Come celebrate our new nest with us!"}
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
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Drafting acoustic'} />
      )}
    </div>
  );
};
export default BlueprintToBrick;
