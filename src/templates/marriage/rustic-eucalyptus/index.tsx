import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

export const RusticEucalyptus: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#2c4c38'; // Dark Olive

  useEffect(() => {
    if (isPreview) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setShowMusic(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPreview]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowMusic(true);
    fireConfetti(primaryColor);
    setTimeout(() => fireConfetti('#d4af37'), 250);
  };

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className={`eucalyptus-viewport ${isOpen ? 'scrollable' : ''}`}>
      {/* Background drifting leaves */}
      {isOpen && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="eucalyptus-leaf" style={{
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${12 + Math.random() * 8}s`
            }} />
          ))}
        </div>
      )}

      {/* HERO COVER PORTAL */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden bg-[#faf8f5]">
        
        {/* Soft Olive Green Watercolor background washes */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#e2ece9] rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#d0dfda] rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDuration: '10s' }} />

        {/* Botanical frame card */}
        <div className={`eucalyptus-card-wrapper ${isOpen ? 'active' : ''} z-30`}>
          <div className="eucalyptus-paper">
            {/* Eucalyptus branch top outline */}
            <div className="eucalyptus-branch-top" />

            <span className="text-[9px] uppercase tracking-[0.3em] font-extrabold text-[#5c6e65] block mb-2">
              Wedding Invitation
            </span>

            <h1 className="font-serif text-3xl font-bold text-[#222f28] my-6 leading-snug">
              {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
            </h1>

            <p className="font-serif text-xs italic text-[#5c6e65] max-w-[220px] mx-auto leading-relaxed mb-6">
              {data.title || "Request the pleasure of your company as they tie the knot"}
            </p>

            {formattedDate && (
              <div className="text-[10px] font-bold text-[#222f28] border-y border-[#c3d1cb] py-2 w-full uppercase tracking-wider mb-6">
                {formattedDate}
              </div>
            )}

            {!isOpen ? (
              <button onClick={handleOpen} className="eucalyptus-btn hover:scale-105 active:scale-95 duration-200">
                Reveal Invite 🌿
              </button>
            ) : (
              <div className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-widest mt-2 animate-pulse flex items-center justify-center gap-1">
                <Heart className="h-3 w-3 fill-current" /> Entered Celebration <Heart className="h-3 w-3 fill-current" />
              </div>
            )}

            {/* Eucalyptus branch bottom outline */}
            <div className="eucalyptus-branch-bottom" />
          </div>
        </div>

        {/* Scroll Helper */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#2c4c38] animate-bounce select-none pointer-events-none z-30">
            <span className="text-[9px]">Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* DYNAMIC SCROLLABLE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#fdfdfc] text-[#111111] border-t border-[#c3d1cb] relative z-20">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Acoustic Folk'} />
      )}
    </div>
  );
};

export default RusticEucalyptus;
