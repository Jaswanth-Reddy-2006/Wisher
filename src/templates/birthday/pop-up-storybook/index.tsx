import React, { useState, useEffect } from 'react';
import type { TemplateProps } from '../../types';
import AudioPlayer from '../../common/AudioPlayer';
import { fireConfetti } from '../../common/CanvasConfetti';
import { BookOpen, Book, Sparkles } from 'lucide-react';
import TemplateWebsiteLayout from '../../common/TemplateWebsiteLayout';
import './style.css';

const FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
];



export const PopUpStorybook: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [activeSheet, setActiveSheet] = useState(0); // 0 = closed, 1 = sheet 1 flipped, 2 = sheet 2 flipped, 3 = sheet 3 flipped, 4 = final spread (cake pops up!)
  const [showMusic, setShowMusic] = useState(false);

  const primaryColor = data.primaryColor || '#8b5cf6';
  const photos = [
    data.photo1 || FALLBACK_PHOTOS[0],
    data.photo2 || FALLBACK_PHOTOS[1],
    data.photo3 || FALLBACK_PHOTOS[2],
    data.photo4 || FALLBACK_PHOTOS[3],
  ];

  // Auto-reveal pages in live preview mode for the customizer
  useEffect(() => {
    if (isPreview) {
      const timer1 = setTimeout(() => setActiveSheet(1), 1000);
      const timer2 = setTimeout(() => setActiveSheet(4), 2500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isPreview]);

  // Play music when the book is first opened
  useEffect(() => {
    if (activeSheet > 0) {
      setShowMusic(true);
    }
  }, [activeSheet]);

  const handleOpenBook = () => {
    if (activeSheet === 0) {
      setActiveSheet(1);
    }
  };

  const getSheetStyle = (index: number) => {
    const isFlipped = activeSheet > index;
    const rotation = isFlipped ? -180 : 0;
    
    // Stacking index: unflipped sheets stack front-to-back, flipped sheets stack back-to-front
    let zIndex = 0;
    if (!isFlipped) {
      zIndex = 10 - index;
    } else {
      zIndex = 10 + index;
    }

    // Physical stacking offsets in Z-space to completely eliminate 3D overlap Z-fighting:
    const translateZ = isFlipped ? 0.1 * index : 0.1 * (10 - index);
    
    return {
      transform: `rotateY(${rotation}deg) translateZ(${translateZ}px)`,
      zIndex: zIndex,
    };
  };

  return (
    <div className={`storybook-viewport ${(activeSheet > 0) ? 'scrollable' : ''}`}>
      
      {/* 3D STORYBOOK CORE SCREEN */}
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center relative shrink-0 overflow-hidden py-10">
        
        {/* Soft paper patterns and subtle drop shadows */}
        <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:32px_32px]"></div>

        {/* Floating title hint */}
        {activeSheet === 0 && (
          <div className="absolute top-16 flex flex-col items-center gap-1.5 text-center pointer-events-none z-10 px-4 animate-fadeIn">
            <Book className="h-6 w-6 text-[#8b5a2b]" />
            <h2 className="font-display text-xl font-bold uppercase tracking-widest text-[#5c3a21]">
              Papercraft Fairytale
            </h2>
            <p className="text-xs text-[#5e5a52] font-semibold italic">Click the cover to unfold your chapter...</p>
          </div>
        )}

        {/* 3D BOOK BOUNDS */}
        <div className="storybook-scene-wrapper">
          <div className={`storybook-scene ${activeSheet > 0 ? 'scene-opened' : ''}`}>
            
            {/* BOOK PAGES ROOT CONTAINER */}
            <div className={`story-book-multi ${activeSheet > 0 ? 'opened' : ''}`}>
              
              {/* STATIONARY BACK COVER / BACKGROUND LEFT */}
              <div className="book-inside-left-static">
                <div className="w-full h-full flex flex-col justify-between items-center text-center p-4 bg-[#fbf8ee] rounded-l-xl">
                  <div className="border border-dashed border-[#5c3a21]/20 rounded-lg p-2 flex flex-col items-center justify-center w-full h-full">
                    <BookOpen className="h-6 w-6 text-[#d4af37] mb-2" />
                    <h4 className="font-wedding-serif text-sm font-black text-[#5c3a21] italic">Chapter of Life</h4>
                    <p className="text-[9px] text-[#5e5a52] leading-relaxed max-w-[120px] mx-auto mt-2">
                      A beautiful collection of memories created, shared, and treasured forever.
                    </p>
                  </div>
                </div>
              </div>

              {/* SHEET 0 (Front: Book Cover / Back: Left Page 1) */}
              <div className="book-sheet" style={getSheetStyle(0)}>
                {/* Front Side: Book Cover - Made fully clickable to open */}
                <div 
                  className="sheet-face front leather-cover cursor-pointer"
                  onClick={handleOpenBook}
                >
                  <div className="border-4 border-double border-[#d4af37]/60 p-5 h-full w-full rounded-lg flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center">
                      <BookOpen className="h-10 w-10 text-[#d4af37] animate-pulse" />
                      <span className="text-[7px] uppercase tracking-[0.25em] text-[#d4af37]/80 font-bold block mt-3">An Interactive Gift</span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-wedding-serif text-lg md:text-xl font-black text-[#d4af37] italic leading-tight">
                        {data.targetName || "Dear One"}'s Story
                      </h3>
                      <div className="h-[1px] w-12 bg-[#d4af37]/40 mx-auto my-2" />
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#d4af37]/65 block font-bold">
                        A celebration of alignment
                      </span>
                    </div>
                    <button 
                      onClick={handleOpenBook}
                      className="px-4 py-1.5 bg-[#d4af37] hover:bg-[#ffe082] text-amber-950 font-black uppercase text-[9px] tracking-widest rounded shadow-md transition-all active:scale-95"
                    >
                      Open Story 📖
                    </button>
                  </div>
                </div>
                {/* Back Side: Left Page 1 */}
                <div className="sheet-face back paper-page">
                  <div className="w-full h-full flex flex-col justify-between items-center text-center p-3">
                    <span className="text-[8px] uppercase tracking-widest font-black text-purple-600">Memory Lane</span>
                    <div className="w-[110px] aspect-square p-1.5 bg-white shadow-md border border-[#e5dfd3] rotate-[-3deg] my-2 relative">
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#cbd5e1]/40 border-b border-white/20 origin-center -rotate-12 z-10" />
                      <img src={photos[0]} className="w-full h-full object-cover rounded-xs" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_PHOTOS[0]; }} />
                    </div>
                    <p className="font-serif text-[9px] text-[#5c3a21]/90 leading-relaxed italic px-1 font-bold">
                      "Our journey together is a beautiful book of pages yet to be written."
                    </p>
                    <span className="text-[8px] text-slate-400 font-bold">Page 1</span>
                  </div>
                </div>
              </div>

              {/* SHEET 1 (Front: Right Page 2 / Back: Left Page 3) */}
              <div className="book-sheet" style={getSheetStyle(1)}>
                {/* Front Side: Right Page 2 */}
                <div className="sheet-face front paper-page">
                  <div className="w-full h-full flex flex-col justify-between items-center text-center p-3">
                    <span className="text-[8px] uppercase tracking-widest font-black text-purple-600">Our Notes</span>
                    <div className="flex-1 flex flex-col justify-center items-center px-1 py-3">
                      <h4 className="font-wedding-serif text-[11px] font-black text-[#5c3a21] italic mb-1.5">Chapter 1: The Spark</h4>
                      <p className="font-serif text-[9px] text-slate-600 leading-relaxed max-w-[125px] italic">
                        {data.message ? data.message.substring(0, 110) + '...' : "Remembering the early days when everything felt fresh and full of wonderful mystery. Every smile shared was a new chapter."}
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveSheet(2)}
                      className="text-[8px] font-black uppercase text-purple-700 tracking-widest hover:underline active:scale-95 transition-transform"
                    >
                      Turn Page ▶
                    </button>
                    <span className="text-[8px] text-slate-400 font-bold">Page 2</span>
                  </div>
                </div>
                {/* Back Side: Left Page 3 */}
                <div className="sheet-face back paper-page">
                  <div className="w-full h-full flex flex-col justify-between items-center text-center p-3">
                    <span className="text-[8px] uppercase tracking-widest font-black text-purple-600">Shared Smiles</span>
                    <div className="w-[110px] aspect-square p-1.5 bg-white shadow-md border border-[#e5dfd3] rotate-[4deg] my-2 relative">
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#cbd5e1]/40 border-b border-white/20 origin-center -rotate-12 z-10" />
                      <img src={photos[1]} className="w-full h-full object-cover rounded-xs" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_PHOTOS[1]; }} />
                    </div>
                    <p className="font-serif text-[9px] text-[#5c3a21]/90 leading-relaxed italic px-1 font-bold">
                      "Every shared laugh adds another splash of warm color to our story."
                    </p>
                    <span className="text-[8px] text-slate-400 font-bold">Page 3</span>
                  </div>
                </div>
              </div>

              {/* SHEET 2 (Front: Right Page 4 / Back: Left Page 5) */}
              <div className="book-sheet" style={getSheetStyle(2)}>
                {/* Front Side: Right Page 4 */}
                <div className="sheet-face front paper-page">
                  <div className="w-full h-full flex flex-col justify-between items-center text-center p-3">
                    <span className="text-[8px] uppercase tracking-widest font-black text-purple-600">Our Notes</span>
                    <div className="flex-1 flex flex-col justify-center items-center px-1 py-3">
                      <h4 className="font-wedding-serif text-[11px] font-black text-[#5c3a21] italic mb-1.5">Chapter 2: Growing Close</h4>
                      <p className="font-serif text-[9px] text-slate-600 leading-relaxed max-w-[125px] italic">
                        {data.extraMessage ? data.extraMessage.substring(0, 110) + '...' : "Through every peak and valley, we grew closer. Building a sanctuary of trust and sweet understanding that keeps us anchored."}
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveSheet(3)}
                      className="text-[8px] font-black uppercase text-purple-700 tracking-widest hover:underline active:scale-95 transition-transform"
                    >
                      Turn Page ▶
                    </button>
                    <span className="text-[8px] text-slate-400 font-bold">Page 4</span>
                  </div>
                </div>
                {/* Back Side: Left Page 5 */}
                <div className="sheet-face back paper-page">
                  <div className="w-full h-full flex flex-col justify-between items-center text-center p-3">
                    <span className="text-[8px] uppercase tracking-widest font-black text-purple-600">Golden Moments</span>
                    <div className="w-[110px] aspect-square p-1.5 bg-white shadow-md border border-[#e5dfd3] rotate-[-2deg] my-2 relative">
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#cbd5e1]/40 border-b border-white/20 origin-center -rotate-12 z-10" />
                      <img src={photos[2]} className="w-full h-full object-cover rounded-xs" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_PHOTOS[2]; }} />
                    </div>
                    <p className="font-serif text-[9px] text-[#5c3a21]/90 leading-relaxed italic px-1 font-bold">
                      "Unforgettable escapes that will linger in our hearts for a lifetime."
                    </p>
                    <span className="text-[8px] text-slate-400 font-bold">Page 5</span>
                  </div>
                </div>
              </div>

              {/* SHEET 3 (Front: Right Page 6 / Back: Left Page 7) */}
              <div className="book-sheet" style={getSheetStyle(3)}>
                {/* Front Side: Right Page 6 */}
                <div className="sheet-face front paper-page">
                  <div className="w-full h-full flex flex-col justify-between items-center text-center p-3">
                    <span className="text-[8px] uppercase tracking-widest font-black text-purple-600">Our Notes</span>
                    <div className="flex-1 flex flex-col justify-center items-center px-1 py-3">
                      <h4 className="font-wedding-serif text-[11px] font-black text-[#5c3a21] italic mb-1.5">Chapter 3: Alignment</h4>
                      <p className="font-serif text-[9px] text-slate-600 leading-relaxed max-w-[125px] italic">
                        "And now, we align coordinates to celebrate the most amazing star in the galaxy. Tap reveal to open your grand surprise!"
                      </p>
                    </div>
                    <button 
                      onClick={() => { setActiveSheet(4); fireConfetti(primaryColor); }}
                      className="text-[8px] font-black uppercase text-pink-600 tracking-widest hover:underline animate-pulse active:scale-95 transition-transform"
                    >
                      Reveal Surprise! 🎁
                    </button>
                    <span className="text-[8px] text-slate-400 font-bold">Page 6</span>
                  </div>
                </div>
                {/* Back Side: Left Page 7 */}
                <div className="sheet-face back paper-page">
                  <div className="w-full h-full flex flex-col justify-between items-center text-center p-3">
                    <span className="text-[8px] uppercase tracking-widest font-black text-purple-600">Sweet Alignment</span>
                    <div className="w-[110px] aspect-square p-1.5 bg-white shadow-md border border-[#e5dfd3] rotate-[3deg] my-2 relative">
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#cbd5e1]/40 border-b border-white/20 origin-center -rotate-12 z-10" />
                      <img src={photos[3]} className="w-full h-full object-cover rounded-xs" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_PHOTOS[3]; }} />
                    </div>
                    <p className="font-serif text-[9px] text-[#5c3a21]/90 leading-relaxed italic px-1 font-bold">
                      "To many more beautiful chapters and magical years together!"
                    </p>
                    <span className="text-[8px] text-slate-400 font-bold">Page 7</span>
                  </div>
                </div>
              </div>

              {/* STATIONARY RIGHT PAGE / BACKGROUND RIGHT (Page 8 - POPUP CLIMAX!) */}
              <div className="book-inside-right-static">
                <div className="w-full h-full flex flex-col justify-between items-center text-center p-4 bg-[#fbf8ee] rounded-r-xl border-l border-[#5c3a21]/10">
                  <div className="border border-dashed border-[#5c3a21]/20 rounded-lg p-3 flex flex-col justify-between w-full h-full text-center">
                    <div className="flex flex-col items-center">
                      <Sparkles className="h-6 w-6 text-yellow-600 animate-spin mb-1" style={{ animationDuration: '4s' }} />
                      <h3 className="font-wedding-serif text-sm font-black text-[#5c3a21] uppercase tracking-wider">
                        My Wishes For You
                      </h3>
                    </div>
                    <div className="h-[1px] w-12 bg-amber-200 mx-auto" />
                    <p className="font-serif text-[9px] md:text-[10px] text-[#5c3a21] leading-relaxed italic font-extrabold max-w-[130px] mx-auto">
                      "{data.message || 'Wishing you a grand year filled with endless sweetness, double the laughs, and all your beautiful wishes granted!'}"
                    </p>
                    <div className="text-[7px] font-black uppercase text-pink-600 bg-pink-100/50 px-2 py-0.5 rounded animate-pulse tracking-wide select-none">
                      💕 Wishes Sent to Stars!
                    </div>
                    <span className="text-[8px] text-slate-400 font-bold">Page 8</span>
                  </div>
                </div>
              </div>

            </div>

            {/* REAL 3D PAPERCRAFT POP-UP LAYER ON CENTER SPINE AREA */}
            <div className="popup-anchor">
              {/* Cardboard cake popping straight out of center crease at 90deg */}
              <div className={`popup-cardboard cake-layer ${activeSheet === 4 ? 'popped' : ''}`}>
                <svg width="110" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Cake Tier 3 */}
                  <rect x="15" y="90" width="90" height="40" rx="6" fill="#fbc4b2" stroke="#5c3a21" strokeWidth="2"/>
                  {/* Cake Tier 2 */}
                  <rect x="30" y="60" width="60" height="30" rx="4" fill="#a8dadc" stroke="#5c3a21" strokeWidth="2"/>
                  {/* Cake Tier 1 */}
                  <rect x="42" y="36" width="36" height="24" rx="3" fill="#e9c46a" stroke="#5c3a21" strokeWidth="2"/>
                  {/* Candles */}
                  <rect x="58" y="18" width="4" height="18" fill="#ffd166" stroke="#5c3a21" strokeWidth="1.5"/>
                  <path d="M60 4C62 10 60 14 60 14C60 14 58 10 60 4Z" fill="#ff4d6d" stroke="#5c3a21" strokeWidth="1" className="animate-pulse" />
                  {/* Sprinkles decoration */}
                  <circle cx="45" cy="110" r="3" fill="#ff5a5f"/>
                  <circle cx="75" cy="110" r="3" fill="#3d5a80"/>
                  <circle cx="60" cy="75" r="2.5" fill="#f28482"/>
                </svg>
              </div>

              {/* Pop-up Balloon left cluster */}
              <div className={`popup-cardboard balloon-layer-l ${activeSheet === 4 ? 'popped' : ''}`}>
                <svg width="70" height="110" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="35" cy="35" r="25" fill="#ff4d6d" stroke="#5c3a21" strokeWidth="2"/>
                  <circle cx="65" cy="45" r="20" fill="#ffd700" stroke="#5c3a21" strokeWidth="2"/>
                  <path d="M35 60C35 80 48 100 48 100" stroke="#5c3a21" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <path d="M65 65C65 80 52 100 52 100" stroke="#5c3a21" strokeWidth="1.5" strokeDasharray="3 3"/>
                </svg>
              </div>

              {/* Pop-up Balloon right cluster */}
              <div className={`popup-cardboard balloon-layer-r ${activeSheet === 4 ? 'popped' : ''}`}>
                <svg width="60" height="100" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="30" r="20" fill="#38bdf8" stroke="#5c3a21" strokeWidth="2"/>
                  <path d="M40 50C40 75 40 90 40 90" stroke="#5c3a21" strokeWidth="1.5" strokeDasharray="3 3"/>
                </svg>
              </div>
            </div>

            {/* FLOATING NAVIGATION OVERLAYS */}
            {activeSheet > 0 && (
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveSheet(prev => prev - 1); }}
                className="absolute left-[-48px] top-1/2 -translate-y-1/2 z-40 px-3.5 py-2.5 rounded-full bg-[#5c3a21] border border-[#d4af37]/45 text-white hover:bg-[#8b5a2b] transition-all hover:scale-105 active:scale-95 shadow-xl text-[10px] font-black tracking-widest font-serif"
              >
                ◀ BACK
              </button>
            )}
            {activeSheet < 4 && activeSheet > 0 && (
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveSheet(prev => prev + 1); }}
                className="absolute right-[-48px] top-1/2 -translate-y-1/2 z-40 px-3.5 py-2.5 rounded-full bg-[#5c3a21] border border-[#d4af37]/45 text-white hover:bg-[#8b5a2b] transition-all hover:scale-105 active:scale-95 shadow-xl text-[10px] font-black tracking-widest font-serif"
              >
                NEXT ▶
              </button>
            )}

          </div>
        </div>

        {/* Scroll Indicator */}
        {activeSheet === 4 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#5c3a21] animate-bounce select-none pointer-events-none z-30">
            <span className="text-[10px]">Read Blessings</span>
            <span className="text-sm">↓</span>
          </div>
        )}
      </div>

      {/* FULL SCROLLABLE WEBSITE SECTIONS (BELOW STORYBOOK COVER MOUNTED) */}
      {activeSheet > 0 && (
        <div className="w-full bg-[#fdfaf2] text-[#5c3a21] border-t border-[#5c3a21]/15 z-20 relative">
          <TemplateWebsiteLayout data={data} primaryColor={primaryColor} type={data.templateType} />
        </div>
      )}

      {/* Audio player */}
      {showMusic && data.musicUrl && (
        <AudioPlayer musicUrl={data.musicUrl} musicName={data.musicName || 'Storybook acoustic'} />
      )}
    </div>
  );
};
export default PopUpStorybook;
