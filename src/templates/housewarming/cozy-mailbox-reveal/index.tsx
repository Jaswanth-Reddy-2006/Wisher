import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Mail, MailCheck } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
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

  return (
    <div className={`mailbox-viewport ${isOpen ? 'scrollable' : ''}`}>
      
      {/* HERO COVER SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
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

        {/* Scroll Indicator */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#5e5a52] animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Read Letter</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS */}
      {isOpen && (
        <div className="w-full bg-[#fdfdfb]/90 text-[#111111] border-t border-[#e5dfd3]">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Mailbox soundtrack'} />
      )}
    </div>
  );
};
export default CozyMailboxReveal;
