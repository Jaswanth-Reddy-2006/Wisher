import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart, Sparkles, Volume2, VolumeX, Gift, Star } from 'lucide-react';
import './style.css';

const FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
];

const FALLBACK_HERO = "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80";

export const HappyBirthdayClassic: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState<boolean[]>([false, false, false, false, false]);
  const [giftBoxOpen, setGiftBoxOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Typewriter states
  const [typedTitle, setTypedTitle] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  const [typedExtra, setTypedExtra] = useState('');
  const [activeStep, setActiveStep] = useState(0); // 0 = title typing, 1 = message typing, 2 = extra typing, 3 = typing complete

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const galleryScrollRef = useRef<HTMLDivElement | null>(null);

  // Gallery Drag to Scroll State
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const primaryColor = data.primaryColor || '#ffd700';
  const musicUrl = data.musicUrl || '';
  const heroImage = data.bgImage || FALLBACK_HERO;
  const photos = [
    data.photo1 || FALLBACK_PHOTOS[0],
    data.photo2 || FALLBACK_PHOTOS[1],
    data.photo3 || FALLBACK_PHOTOS[2],
    data.photo4 || FALLBACK_PHOTOS[3],
  ];

  // Auto-start in preview mode
  useEffect(() => {
    if (isPreview) {
      setHasStarted(true);
    }
  }, [isPreview]);

  // Audio control
  useEffect(() => {
    if (hasStarted && !isPreview && musicUrl) {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      audio.volume = 0.5;
      audio.play()
        .then(() => setIsPlayingAudio(true))
        .catch((e) => console.warn('Audio auto-play blocked:', e));
      audioRef.current = audio;
      return () => {
        audio.pause();
        audioRef.current = null;
      };
    }
  }, [hasStarted, isPreview, musicUrl]);

  // Typewriter effect trigger
  useEffect(() => {
    if (!hasStarted) return;

    const targetTitle = `Happy Birthday, ${data.targetName || 'Dear One'}! 🎂`;
    const targetMessage = data.message || "Wishing you a day filled with laughter, love, and sweet surprises!";
    const targetExtra = data.extraMessage || "May your journey through the cosmos be filled with magic and your dreams turn to reality.";

    let titleIndex = 0;
    let messageIndex = 0;
    let extraIndex = 0;

    const typeTitle = setInterval(() => {
      if (titleIndex < targetTitle.length) {
        setTypedTitle(targetTitle.substring(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(typeTitle);
        setActiveStep(1);
      }
    }, 60);

    let typeMsg: NodeJS.Timeout;
    let typeExt: NodeJS.Timeout;

    if (activeStep === 1) {
      typeMsg = setInterval(() => {
        if (messageIndex < targetMessage.length) {
          setTypedMessage(targetMessage.substring(0, messageIndex + 1));
          messageIndex++;
        } else {
          clearInterval(typeMsg);
          setActiveStep(2);
        }
      }, 40);
    }

    if (activeStep === 2) {
      typeExt = setInterval(() => {
        if (extraIndex < targetExtra.length) {
          setTypedExtra(targetExtra.substring(0, extraIndex + 1));
          extraIndex++;
        } else {
          clearInterval(typeExt);
          setActiveStep(3);
        }
      }, 30);
    }

    return () => {
      clearInterval(typeTitle);
      if (typeMsg) clearInterval(typeMsg);
      if (typeExt) clearInterval(typeExt);
    };
  }, [hasStarted, activeStep, data.targetName, data.message, data.extraMessage]);

  const handleStart = () => {
    setHasStarted(true);
    fireConfetti(primaryColor);
  };

  const handleBlowCandle = (idx: number) => {
    if (candlesBlown[idx]) return;
    const newCandles = [...candlesBlown];
    newCandles[idx] = true;
    setCandlesBlown(newCandles);

    // If all candles are blown, trigger a giant confetti explosion!
    if (newCandles.every(c => c)) {
      fireConfetti(primaryColor);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play().catch(err => console.error(err));
        setIsPlayingAudio(true);
      }
    }
  };

  // Drag Scroll handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDownRef.current = true;
    const el = galleryScrollRef.current;
    if (!el) return;
    el.classList.add('active');
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
    const el = galleryScrollRef.current;
    if (el) el.classList.remove('active');
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
    const el = galleryScrollRef.current;
    if (el) el.classList.remove('active');
  };

  const handleMouseMoveScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    const el = galleryScrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  // 12 Balloons generator
  const balloonColors = ['#ff4d6d', '#ffb703', '#219ebc', '#8ecae6', '#ff8c00', '#db2777', '#a855f7', '#10b981'];

  return (
    <div className={`classic-viewport ${hasStarted ? 'scrollable' : ''}`}>
      {/* Background Floating Balloons */}
      {hasStarted && (
        <div className="balloons-container">
          {Array.from({ length: 14 }).map((_, i) => {
            const color = balloonColors[i % balloonColors.length];
            const left = `${(i * 7) + 5}%`;
            const delay = `${i * 1.8}s`;
            const scale = 0.7 + (i % 4) * 0.15;
            return (
              <div 
                key={i} 
                className="balloon" 
                style={{ 
                  color: color, 
                  backgroundColor: `${color}dd`,
                  left: left, 
                  animationDelay: delay,
                  transform: `scale(${scale})`,
                }}
              >
                <div className="balloon-string" />
              </div>
            );
          })}
        </div>
      )}

      {/* Background Audio Toggle */}
      {hasStarted && !isPreview && musicUrl && (
        <button
          onClick={toggleAudio}
          className="fixed top-6 right-6 z-50 p-3.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all shadow-lg"
        >
          {isPlayingAudio ? <Volume2 className="h-5 w-5 text-yellow-300" /> : <VolumeX className="h-5 w-5" />}
        </button>
      )}

      {/* Start screen portal */}
      {!hasStarted ? (
        <div className="h-screen w-full flex flex-col items-center justify-center text-center px-4 relative z-20">
          <div className="space-y-6 max-w-xl animate-fadeIn">
            <Sparkles className="h-12 w-12 text-[#ffd700] mx-auto animate-pulse sparkle-icon" />
            <h1 className="text-4xl md:text-6xl font-serif font-black tracking-wide text-white leading-tight">
              A Special Gift <br />
              <span className="gold-glow">Awaits You</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 tracking-wide font-medium italic">
              "Turn on your sound & step inside the celebration."
            </p>
            <button
              onClick={handleStart}
              className="btn-gold-pulse px-10 py-5 rounded-full text-sm font-black transition-all hover:scale-105"
            >
              OPEN WISH 🎁
            </button>
          </div>
        </div>
      ) : (
        /* Celebration view container */
        <div className="w-full relative z-10 flex flex-col items-center bg-transparent max-w-4xl mx-auto py-16 px-4 space-y-24">
          
          {/* SECTION 1: HEADER BANNER */}
          <section className="w-full text-center space-y-6 pt-10">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-pink-300">
              <Star className="h-3 w-3 fill-pink-300" /> CELEBRATING YOU <Star className="h-3 w-3 fill-pink-300" />
            </div>
            
            <h1 className={`text-4xl md:text-7xl font-serif font-extrabold tracking-tight leading-tight ${activeStep >= 1 ? '' : 'typewriter-cursor'}`}>
              {typedTitle}
            </h1>
            
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mx-auto" />
            
            {activeStep >= 1 && (
              <p className={`text-lg md:text-2xl font-serif text-slate-200 leading-relaxed italic max-w-2xl mx-auto px-4 ${activeStep === 1 ? 'typewriter-cursor' : ''}`}>
                "{typedMessage}"
              </p>
            )}
          </section>

          {/* SECTION 2: HERO PICTURE IN GOLDEN FRAME */}
          <section className="w-full flex justify-center">
            <div className="relative group max-w-lg w-full bg-gradient-to-tr from-[#ffd700] via-[#ffd700] to-yellow-600 p-[3px] rounded-3xl shadow-[0_15px_50px_rgba(255,215,0,0.15)] hover:shadow-[0_20px_60px_rgba(255,215,0,0.25)] transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#ffd700] to-pink-500 opacity-20 blur-md group-hover:opacity-30 transition duration-500" />
              <img
                src={heroImage}
                alt="Celebration moment"
                className="w-full aspect-[4/3] md:aspect-[16/10] object-cover rounded-[21px] relative z-10"
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_HERO; }}
              />
            </div>
          </section>

          {/* SECTION 3: PERSONAL NOTE */}
          {activeStep >= 2 && (
            <section className="w-full classic-card p-8 md:p-14 rounded-3xl text-center space-y-6 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <Heart className="h-8 w-8 text-pink-400 mx-auto animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-serif text-[#ffd700]">My Wishes For You</h2>
              
              <p className={`text-base md:text-xl font-serif text-slate-300 leading-relaxed max-w-2xl mx-auto whitespace-pre-line ${activeStep === 2 ? 'typewriter-cursor' : ''}`}>
                {typedExtra}
              </p>
            </section>
          )}

          {/* SECTION 4: THE CAKE INTERACTION */}
          <section className="w-full text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-serif text-[#ffd700] font-bold">🎂 Make a Wish</h3>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Tap each candle to blow them out</p>
            </div>

            <div className="cake-interactive">
              <div className="cake-candles">
                {candlesBlown.map((blown, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleBlowCandle(idx)}
                    className="cake-candle"
                    style={{
                      background: `linear-gradient(to bottom, ${primaryColor}, #ffd700)`,
                    }}
                  >
                    {!blown && <div className="candle-flame-classic" />}
                  </div>
                ))}
              </div>
              <div className="cake-layer">
                <div className="cake-frosting" />
                <div className="cake-drips">
                  {Array.from({ length: 6 }).map((_, i) => <div key={i} className="cake-drip" />)}
                </div>
              </div>
              <div className="cake-layer-middle">
                <div className="cake-frosting" />
                <div className="cake-drips">
                  {Array.from({ length: 8 }).map((_, i) => <div key={i} className="cake-drip" />)}
                </div>
              </div>
              <div className="cake-layer-bottom">
                <div className="cake-frosting" />
                <div className="cake-drips">
                  {Array.from({ length: 10 }).map((_, i) => <div key={i} className="cake-drip" />)}
                </div>
              </div>
              <div className="cake-plate" />
            </div>

            {candlesBlown.every((c) => c) && (
              <div className="text-center animate-scaleUp space-y-2">
                <h4 className="text-xl md:text-2xl font-serif text-yellow-300 font-bold">Sparkling Year Ahead! ✨</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">May all your wishes and beautiful dreams come true!</p>
              </div>
            )}
          </section>

          {/* SECTION 5: SCROLLABLE PHOTO MEMORIES GALLERY */}
          <section className="w-full flex flex-col items-center justify-center py-8">
            <div className="max-w-4xl w-full text-center mb-10 px-4">
              <h3 className="text-3xl md:text-4xl font-serif text-[#ffd700] font-bold mb-3">📸 Precious Memories</h3>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Swipe or Drag to explore our journey</p>
            </div>
            
            <div 
              ref={galleryScrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMoveScroll}
              className="w-full px-8 overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-8 py-8 select-none cursor-grab active:cursor-grabbing scrollbar-hide gallery-scroll-container"
              style={{
                scrollPaddingInlineStart: '2rem',
                scrollPaddingInlineEnd: '2rem',
              }}
            >
              {[heroImage, ...photos].map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setZoomedImage(img)}
                  className="snap-center shrink-0 w-[260px] md:w-[320px] bg-white p-3 pb-8 rounded-sm shadow-2xl border border-slate-200/50 transform rotate-[-1.5deg] odd:rotate-[2deg] hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-zoom-in relative group"
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] origin-center -rotate-12 border-b border-white/10 z-10 pointer-events-none" />
                  
                  <div className="w-full aspect-square bg-slate-900 overflow-hidden rounded-sm mb-4 border border-slate-100">
                    <img
                      src={img}
                      alt={`Memory ${idx}`}
                      className="w-full h-full object-cover pointer-events-none select-none"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = idx === 0 ? FALLBACK_HERO : FALLBACK_PHOTOS[idx - 1];
                      }}
                    />
                  </div>
                  <div className="text-center font-serif text-slate-800 text-sm md:text-base italic select-none">
                    {idx === 0 ? "Perfect Memory ✨" : `Memory #${idx} ❤️`}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: SURPRISE GIFT BOX */}
          <section className="w-full flex flex-col items-center justify-center py-8 relative">
            {!giftBoxOpen ? (
              <div className="flex flex-col items-center space-y-6">
                <div
                  onClick={() => { setGiftBoxOpen(true); fireConfetti(primaryColor); }}
                  className="w-48 h-48 relative cursor-pointer group flex flex-col items-center justify-center"
                >
                  {/* Gift Box Lid */}
                  <div className="w-40 h-10 rounded-lg shadow-md transition-transform duration-300 group-hover:-translate-y-4 z-10 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #ffd700, #ffaa00)' }}
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-[#1e0b36]/30 flex items-center justify-center">
                      <span className="text-[#1e0b36] text-sm">🎀</span>
                    </div>
                  </div>
                  {/* Gift Box Body */}
                  <div className="w-36 h-32 rounded-b-xl flex items-center justify-center relative overflow-hidden mt-0.5 shadow-lg"
                    style={{ background: 'linear-gradient(180deg, #ffaa00, #d48800)' }}
                  >
                    <div className="absolute w-8 h-full bg-[#1e0b36]/10" />
                    <div className="absolute h-8 w-full bg-[#1e0b36]/10" />
                    <Gift className="relative z-10 h-10 w-10 text-white animate-bounce" />
                  </div>
                </div>
                <div className="text-center text-xs tracking-widest text-slate-400 uppercase">
                  Tap to unwrap your special surprise
                </div>
              </div>
            ) : (
              <div className="w-full classic-card p-8 md:p-12 rounded-3xl text-center space-y-6 border border-pink-500/10 shadow-[0_0_40px_rgba(255,215,0,0.1)] animate-scaleUp">
                <div className="flex flex-col items-center">
                  <Sparkles className="h-10 w-10 text-[#ffd700] mb-3 animate-bounce" />
                  <h3 className="text-2xl md:text-4xl font-serif text-white mb-2">"You are the most precious gift to the world."</h3>
                  <p className="text-xs text-slate-400 max-w-sm mt-2">Endless joy, health, and lovely surprises are heading your way!</p>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 7: FINAL WARM FOOTER */}
          <section className="w-full text-center space-y-6 py-12">
            <Heart className="h-6 w-6 text-rose-500 mx-auto animate-heartBeat" />
            <p className="text-sm uppercase tracking-[0.3em] font-extrabold text-[#ffd700]">Cheers to another beautiful year! 🥂</p>
          </section>

        </div>
      )}

      {/* Fullscreen Photo Zoom Modal */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <img
            src={zoomedImage}
            alt="Zoomed memory"
            className="max-w-full max-h-[90dvh] object-contain rounded-lg border border-white/10 shadow-2xl select-none"
          />
        </div>
      )}
    </div>
  );
};
