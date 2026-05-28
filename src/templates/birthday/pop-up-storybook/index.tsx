import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import Countdown from '../../common/Countdown';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { BookOpen, Mail, Book } from 'lucide-react';
import './style.css';

export const PopUpStorybook: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
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
    <div className="storybook-viewport">
      {/* Background clouds details */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Floating Instructions */}
      {!isOpen && (
        <div className="absolute top-20 flex flex-col items-center gap-1 text-center pointer-events-none z-10 px-4">
          <Book className="h-6 w-6 text-[#8b5a2b]" />
          <h2 className="font-display text-xl font-bold uppercase tracking-widest text-[#5c3a21]">
            Papercraft Storybook
          </h2>
          <p className="text-xs text-[#5e5a52]">Click the book cover to open</p>
        </div>
      )}

      {/* 3D Book Scene */}
      <div 
        className="storybook-scene"
        onClick={isPreview ? undefined : handleOpen}
        style={{ pointerEvents: isPreview ? 'none' : 'auto' }}
      >
        <div className={`story-book ${isOpen ? 'opened' : ''}`}>
          
          {/* 1. FLIPPING FRONT COVER (Pivots left Y-180deg) */}
          <div className={`book-cover ${isOpen ? 'opened' : ''}`}>
            {/* Front leather cover */}
            <div className="cover-face front-side">
              <div className="border-2 border-dashed border-[#d4af37]/40 p-4 h-full w-full rounded-lg flex flex-col items-center justify-between">
                <BookOpen className="h-8 w-8 text-[#d4af37]" />
                <div>
                  <h3 className="font-wedding-serif text-lg font-black text-[#d4af37] italic leading-tight">
                    {data.targetName || "Nostalgic Tales"}
                  </h3>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#d4af37]/75 block mt-2 font-bold">
                    A Story of Celebration
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase text-[#d4af37] tracking-widest border border-[#d4af37] px-3 py-1 rounded">
                  Open
                </span>
              </div>
            </div>

            {/* Back face of cover (Inside Left Page) */}
            <div className="cover-face back-cover">
              <div className="flex flex-col justify-between h-full w-full text-center">
                <span className="text-[8px] uppercase tracking-widest font-black text-[#5e5a52]">
                  Chronicle
                </span>
                <div className="my-auto">
                  <h4 className="font-wedding-serif text-sm font-bold text-[#111111] italic mb-2">
                    Once upon a time...
                  </h4>
                  <p className="text-[10px] text-[#5e5a52] leading-relaxed max-w-[120px] mx-auto">
                    A beautiful soul named {data.targetName || "Alex"} was welcomed into the world.
                  </p>
                </div>
                <div className="text-[8px] text-[#5e5a52] border-t border-[#e5dfd3] pt-2">
                  Page 1 of 2
                </div>
              </div>
            </div>
          </div>

          {/* 2. STATIONARY BACKGROUND (Inside Right Page) */}
          <div className="book-inside-right">
            <div className="flex flex-col justify-between h-full w-full text-center">
              <span className="text-[8px] uppercase tracking-widest font-black text-[#5e5a52]">
                Calendar
              </span>
              <div className="my-auto scale-90">
                {/* Empty details space since it overlays the popped card details */}
              </div>
              <div className="text-[8px] text-[#5e5a52] border-t border-[#e5dfd3] pt-2">
                Page 2 of 2
              </div>
            </div>
          </div>

          {/* 3. LAYERED POP-UP CARDBOARDS (Tilt up rotateX-90deg) */}
          <div className="popup-anchor">
            {/* Cake cardboard center */}
            <div className={`popup-cardboard cake-layer ${isOpen ? 'popped' : ''}`}>
              <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Cake Tier 3 */}
                <rect x="15" y="90" width="90" height="40" rx="6" fill="#fbc4b2" stroke="#5c3a21" strokeWidth="2"/>
                {/* Cake Tier 2 */}
                <rect x="30" y="60" width="60" height="30" rx="4" fill="#a8dadc" stroke="#5c3a21" strokeWidth="2"/>
                {/* Cake Tier 1 */}
                <rect x="42" y="36" width="36" height="24" rx="3" fill="#e9c46a" stroke="#5c3a21" strokeWidth="2"/>
                {/* Candles */}
                <rect x="58" y="18" width="4" height="18" fill="#ffd166" stroke="#5c3a21" strokeWidth="1.5"/>
                <path d="M60 4C62 10 60 14 60 14C60 14 58 10 60 4Z" fill="#ff007f" stroke="#5c3a21" strokeWidth="1"/>
                {/* Sprinkles decoration */}
                <circle cx="45" cy="110" r="3" fill="#ff5a5f"/>
                <circle cx="75" cy="110" r="3" fill="#3d5a80"/>
                <circle cx="60" cy="75" r="2.5" fill="#f28482"/>
              </svg>
            </div>

            {/* Left Balloon cluster */}
            <div className={`popup-cardboard balloon-layer-l ${isOpen ? 'popped' : ''}`}>
              <svg width="100" height="130" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="35" r="25" fill={primaryColor} stroke="#5c3a21" strokeWidth="2"/>
                <circle cx="65" cy="45" r="20" fill="#ffd166" stroke="#5c3a21" strokeWidth="2"/>
                <path d="M35 60C35 80 48 100 48 100" stroke="#5c3a21" strokeWidth="1.5" strokeDasharray="3 3"/>
                <path d="M65 65C65 80 52 100 52 100" stroke="#5c3a21" strokeWidth="1.5" strokeDasharray="3 3"/>
              </svg>
            </div>

            {/* Right Balloon cluster */}
            <div className={`popup-cardboard balloon-layer-r ${isOpen ? 'popped' : ''}`}>
              <svg width="80" height="120" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="30" r="20" fill="#a8dadc" stroke="#5c3a21" strokeWidth="2"/>
                <path d="M40 50C40 75 40 90 40 90" stroke="#5c3a21" strokeWidth="1.5" strokeDasharray="3 3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 4. OVERLAY SCROLLING DETAILS PANEL */}
      <div className={`storybook-text-card ${isOpen ? 'visible' : ''}`}>
        <h1 className="font-wedding-serif text-2xl font-bold text-[#5c3a21] leading-tight mb-2">
          {data.title || "Happy Birthday!"}
        </h1>
        
        {data.date && (
          <div className="scale-90 mb-4">
            <Countdown targetDate={data.date} primaryColor={primaryColor} />
          </div>
        )}

        <p className="font-display text-xs text-[#5e5a52] leading-relaxed mb-4 max-w-[260px] mx-auto">
          {data.message || "Wishing you a beautiful day filled with memories."}
        </p>

        {data.extraMessage && (
          <div className="border-t border-[#e5dfd3] pt-3 text-[10px] text-[#5e5a52] italic mb-4 max-w-[200px] mx-auto">
            {data.extraMessage}
          </div>
        )}

        {data.rsvpEmail && (
          <a
            href={`mailto:${data.rsvpEmail}?subject=Storybook%20RSVP`}
            className="inline-flex items-center justify-center rounded-full py-2.5 px-6 text-[10px] font-bold text-white uppercase tracking-wider transition-all cursor-pointer hover:opacity-90 shadow-md"
            style={{ backgroundColor: primaryColor }}
          >
            <Mail className="h-3 w-3 mr-1.5" /> Confirm RSVP
          </a>
        )}
      </div>

      {/* Audio details */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Storybook acoustic'} />
      )}
    </div>
  );
};
export default PopUpStorybook;
