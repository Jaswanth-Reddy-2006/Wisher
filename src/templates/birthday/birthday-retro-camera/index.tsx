import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import './style.css';

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

type CameraPhase = 'gate' | 'camera' | 'shake' | 'scroll';

export const BirthdayRetroCamera: React.FC<TemplateProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Staged Camera phases
  const [currentPhase, setCurrentPhase] = useState<CameraPhase>('gate');
  const [leverAdvanced, setLeverAdvanced] = useState<boolean>(false);
  const [isFlashActive, setIsFlashActive] = useState<boolean>(false);
  const [filmSliding, setFilmSliding] = useState<boolean>(false);
  
  // Shake mechanics
  const [shakeCount, setShakeCount] = useState<number>(0);
  const [shakeProgress, setShakeProgress] = useState<number>(0); // 0 to 100%
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);
  
  // Scroll unroll final
  const [showScroll, setShowScroll] = useState<boolean>(false);
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [cakeBlownOut, setCakeBlownOut] = useState<boolean>(false);

  // Audio & Sparkles
  const synthCtxRef = useRef<AudioContext | null>(null);
  const sparklesRef = useRef<Sparkle[]>([]);

  // Synthesize camera sounds programmatically
  const playSound = (type: 'lever' | 'shutter' | 'whine' | 'success' | 'blow') => {
    try {
      if (!synthCtxRef.current) {
        synthCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;

      if (type === 'lever') {
        // Mechanical spring click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.setValueAtTime(300, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'shutter') {
        // High fidelity snap shutter click
        const bufferSize = ctx.sampleRate * 0.15;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(now);
      } else if (type === 'whine') {
        // Camera flash charging whine (ascending pitch oscillator)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(3000, now + 1.2);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 1.0);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
      } else if (type === 'success') {
        // Cute happy mechanical melody
        const notes = [523.25, 587.33, 659.25, 783.99]; // C5, D5, E5, G5
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.08);
          gain.gain.setValueAtTime(0.05, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.2);
        });
      } else if (type === 'blow') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.25);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Backing soundtrack loop
  useEffect(() => {
    if (data.musicUrl) {
      const audio = new Audio(data.musicUrl);
      audio.loop = true;
      audioRef.current = audio;
    }
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [data.musicUrl]);

  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Audio blocked:", err));
    }
  };

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error(err));
    }
  };

  // Canvas sparkles particle loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId: number;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      sparklesRef.current.forEach(sp => {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.05; // gravity
        sp.alpha -= 0.015;

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      sparklesRef.current = sparklesRef.current.filter(sp => sp.alpha > 0);

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Enter room gate
  const handleEnterGate = () => {
    playSound('lever');
    startMusic();
    setCurrentPhase('camera');
  };

  // Click film advance lever
  const handleAdvanceLever = () => {
    if (leverAdvanced) return;
    playSound('lever');
    setLeverAdvanced(true);
    
    // flash whine starts charging
    setTimeout(() => {
      playSound('whine');
    }, 400);
  };

  // Press big shutter button triggers flash and ejects polaroid
  const handlePressShutter = () => {
    if (!leverAdvanced || filmSliding) return;
    playSound('shutter');
    setIsFlashActive(true);
    setLeverAdvanced(false);

    // Turn off screen flash overlay after 120ms
    setTimeout(() => {
      setIsFlashActive(false);
      setFilmSliding(true);
    }, 120);

    // Film ejection slides out over 2 seconds
    setTimeout(() => {
      setFilmSliding(false);
      setCurrentPhase('shake');
      setShakeProgress(0);
    }, 2200);
  };

  // Shaking the polaroid by mouse/touch dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (currentPhase !== 'shake' || shakeProgress >= 100) return;
    const { clientX, clientY } = e;
    processShake(clientX, clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (currentPhase !== 'shake' || shakeProgress >= 100) return;
    const { clientX, clientY } = e.touches[0];
    processShake(clientX, clientY);
  };

  const processShake = (x: number, y: number) => {
    const last = lastPosRef.current;
    if (last.x !== 0 && last.y !== 0) {
      const dist = Math.hypot(x - last.x, y - last.y);
      if (dist > 8) {
        // Accumulate progress
        setShakeProgress(prev => {
          const next = prev + 1.5;
          
          if (next % 20 < 1.5) {
            playSound('shutter');
            // burst stardust sparks
            sparklesRef.current.push({
              x: window.innerWidth / 2 - 50 + Math.random() * 100,
              y: window.innerHeight / 2 + 100 + Math.random() * 50,
              vx: -1.5 + Math.random() * 3,
              vy: -1.5 + Math.random() * 3,
              alpha: 1,
              size: 2 + Math.random() * 2,
              color: '#d4af37'
            });
          }

          if (next >= 100) {
            playSound('success');
            // Once fully shaken/revealed, increment polaroid photo index
            setTimeout(() => {
              setShakeCount(p => {
                const nextCount = p + 1;
                if (nextCount >= 3) {
                  // Reveal scroll final
                  setCurrentPhase('scroll');
                  setShowScroll(true);
                } else {
                  // Prepare next camera shot
                  setCurrentPhotoIdx(nextCount);
                  setCurrentPhase('camera');
                }
                return nextCount;
              });
            }, 1800);
          }
          return Math.min(100, next);
        });
      }
    }
    lastPosRef.current = { x, y };
  };

  // Candle blowing triggers
  const handleBlowCandle = (idx: number) => {
    if (cakeBlownOut) return;
    const nextLit = [...candlesLit];
    nextLit[idx] = false;
    setCandlesLit(nextLit);
    playSound('blow');

    if (nextLit.every(v => !v)) {
      setCakeBlownOut(true);
      playSound('success');
      import('canvas-confetti').then((m) => {
        m.default({ particleCount: 50, spread: 60, colors: ['#a855f7', '#fbbf24', '#ffffff'] });
      });
    }
  };

  const PHOTO_FALLBACKS = [
    data.photo1 || "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=80",
    data.photo2 || "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    data.photo3 || "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80"
  ];

  const MEMORY_TITLES = [
    "PHOTO_SECTOR_A ✨",
    "PHOTO_SECTOR_B 😂",
    "PHOTO_SECTOR_C 🌸"
  ];

  // Typing greetings scroll
  const fullMessage = data.message || "HAPPY BIRTHDAY! YOU SUCCESSFULLY SHOT AND DEVELOPED ALL POLAROID PHOTOS! WISHING YOU A BEAUTIFUL SPECTACULAR RETRO YEAR!";
  
  useEffect(() => {
    if (!showScroll) {
      setTypedMessage('');
      setIsTypingComplete(false);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i < fullMessage.length) {
        setTypedMessage(fullMessage.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTypingComplete(true);
        playSound('success');
      }
    }, 35);

    return () => clearInterval(interval);
  }, [showScroll, fullMessage]);

  return (
    <div 
      className="retro-camera-root select-none font-sans"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Background canvas sparks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Screen Flash white overlay */}
      <div className={`camera-flash-overlay pointer-events-none ${isFlashActive ? 'flashing' : ''}`} />

      {/* Music player controls */}
      <button onClick={toggleMusic} className="bgm-camera-btn z-50">
        {isPlaying ? '🔊 MUSIC ON' : '🔇 MUSIC OFF'}
      </button>

      {/* 1. CAMERA ROOM GATES PANEL (Phase 1) */}
      {currentPhase === 'gate' && (
        <div className="gate-overlay flex flex-col items-center justify-center p-6 text-center z-10 w-full h-full">
          <div className="wooden-frame-card p-10 bg-amber-50/95 border-4 border-amber-900 rounded-2xl max-w-sm animate-fadeIn shadow-2xl">
            <div className="vintage-logo mb-6 text-amber-900 text-4xl animate-bounce">📸</div>
            <h1 className="vintage-title">SHUTTER CAMERA</h1>
            <p className="vintage-subtitle mt-4">
              TAKE 3 POLAROIDS TO REVEAL WISHES
            </p>
            <button onClick={handleEnterGate} className="btn-enter-camera mt-8">
              ENTER CAMERA SHED
            </button>
          </div>
        </div>
      )}

      {/* 2. DYNAMIC CAMERA BODY PANEL (Phase 2) */}
      {currentPhase === 'camera' && (
        <div className="camera-viewport flex flex-col items-center justify-center p-6 z-10 w-full h-full">
          
          <div className="camera-instruction-bar mb-8">
            {!leverAdvanced ? "🎞️ Drag the top silver film lever to load cartridge! 🎞️" : "📸 Click the big red shutter button to click a Polaroid! 📸"}
          </div>

          <div className="camera-body-wrap relative bg-zinc-200 p-8 rounded-3xl border-8 border-zinc-400 shadow-2xl flex flex-col items-center">
            
            {/* Top plate metallic dials */}
            <div className="camera-top-plate absolute top-[-25px] left-0 right-0 h-6 flex justify-between px-10">
              {/* Silver film level */}
              <div 
                onClick={handleAdvanceLever}
                className={`film-lever w-16 h-4 bg-zinc-400 rounded-sm cursor-pointer ${leverAdvanced ? 'lever-advanced' : ''}`}
                title="Click/Drag to advance film"
              />
              {/* Shutter button */}
              <div 
                onClick={handlePressShutter}
                className={`shutter-red-button w-8 h-6 bg-rose-500 rounded-t-md cursor-pointer border-t-2 border-rose-400 ${!leverAdvanced ? 'locked' : ''}`}
                title="Click shutter button"
              />
            </div>

            {/* Leatherette camera grip body */}
            <div className="camera-grip-panel w-[260px] h-[150px] bg-zinc-900 border-2 border-zinc-800 rounded flex items-center justify-center relative">
              
              {/* Flash light bulb */}
              <div className="camera-flash-light w-8 h-8 rounded-full bg-zinc-700 border-2 border-zinc-600 absolute top-4 left-6 flex items-center justify-center">
                <div className={`w-3 h-3 rounded-full bg-amber-400 ${leverAdvanced ? 'animate-pulse' : 'opacity-40'}`} />
              </div>

              {/* Camera circular lens */}
              <div className="camera-glass-lens w-24 h-24 rounded-full bg-slate-900 border-4 border-zinc-600 flex items-center justify-center relative shadow-inner">
                <div className="lens-reflection-arc absolute top-2 left-2 w-16 h-8 border-t-4 border-l-4 border-white/20 rounded-t-full rotate-[-30deg]" />
                <div className="w-8 h-8 rounded-full bg-zinc-950" />
              </div>
            </div>

            {/* Slide-out slot at bottom ejects polaroid */}
            <div className="camera-bottom-slot w-[200px] h-2 bg-zinc-950 rounded-b absolute bottom-[-4px]" />

            {/* Polaroid ejecting slide animation */}
            {filmSliding && (
              <div className="polaroid-eject-slide absolute animate-ejectFilm">
                <div className="w-[140px] h-[170px] bg-slate-700 rounded shadow-md border-b-8 border-slate-800 flex items-center justify-center">
                  <span className="text-[10px] text-slate-500 animate-pulse font-serif uppercase tracking-widest font-bold">Developing...</span>
                </div>
              </div>
            )}
          </div>

          <div className="film-indicator mt-8 text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
            🎞️ Shakes complete: {shakeCount} / 3
          </div>
        </div>
      )}

      {/* 3. SHAKING THE POLAROID CARD (Phase 3) */}
      {currentPhase === 'shake' && (
        <div className="shake-card-viewport flex flex-col items-center justify-center p-6 z-10 w-full h-full">
          <div className="camera-instruction-bar mb-10">
            👋 Click and shake/drag your mouse/touch to develop the Polaroid! ({Math.floor(shakeProgress)}%) 👋
          </div>

          <div className="polaroid-shake-wrap animate-float">
            <div className="shake-polaroid-frame p-3 bg-white text-[#111] shadow-2xl flex flex-col items-center">
              {/* Photo develops by fading in opacity */}
              <div className="polaroid-canvas relative bg-zinc-800 w-[180px] h-[180px] overflow-hidden rounded-sm">
                <img 
                  src={PHOTO_FALLBACKS[currentPhotoIdx]} 
                  alt={MEMORY_TITLES[currentPhotoIdx]} 
                  className="w-full h-full object-cover rounded-sm transition-opacity duration-200"
                  style={{ opacity: shakeProgress / 100 }}
                />
                {/* dark overlay represent undeveloped state */}
                <div 
                  className="undeveloped-mask absolute inset-0 bg-zinc-800 transition-opacity duration-200"
                  style={{ opacity: 1 - (shakeProgress / 100) }}
                />
              </div>

              <span className="polaroid-foot-caption mt-4 font-serif font-black text-xs text-amber-900 tracking-wider">
                {MEMORY_TITLES[currentPhotoIdx]}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. CASSETTE SCROLL & GLOW CAKE FINALE (Phase 4) */}
      {showScroll && currentPhase === 'scroll' && (
        <div className="final-scroll-viewport flex flex-col items-center overflow-y-auto w-full h-full py-16 px-4 z-20">
          
          <div className="wooden-frame-card p-8 bg-amber-50/95 border-4 border-amber-900 rounded-2xl max-w-xl text-center w-full shadow-2xl animate-fadeIn">
            <div className="vintage-header flex justify-between px-2 text-[8px] text-amber-800 font-bold mb-4 uppercase tracking-widest">
              <span>PHOTO REGISTER COMPLETE</span>
              <span>WISHER SHUTTER V3</span>
            </div>

            <h3 className="vintage-header-title mt-2 text-2xl font-bold text-amber-900 font-serif">
              Happy Birthday, {data.targetName || "Navya"}!
            </h3>

            <div className="vintage-divider my-4" />

            <div className="vintage-message-box">
              <pre className="vintage-letter-text leading-relaxed text-amber-950 whitespace-pre-wrap text-sm font-serif italic font-semibold">
                {typedMessage}
                {!isTypingComplete && <span className="custom-blink-cursor">|</span>}
              </pre>
            </div>

            {isTypingComplete && (
              <div className="signature-box mt-6 flex flex-col items-center animate-fadeIn">
                <span className="text-[8px] uppercase tracking-widest text-amber-850/60 font-bold">WITH LOVE,</span>
                <span className="signature-styled-font text-amber-900 text-3xl font-bold mt-1">
                  {data.senderName || "Wisher"}
                </span>
              </div>
            )}
          </div>

          {/* Interactive lit CSS birthday cake at the bottom of letter scroll */}
          {isTypingComplete && (
            <div className="final-cake-block flex flex-col items-center mt-12 animate-fadeIn">
              <div className="vintage-cake relative">
                
                {/* 3 Candles */}
                {candlesLit[0] && (
                  <div className="cndl" style={{ left: '33%' }} onClick={() => handleBlowCandle(0)}>
                    <div className="flm" />
                  </div>
                )}
                {candlesLit[1] && (
                  <div className="cndl" style={{ left: '50%' }} onClick={() => handleBlowCandle(1)}>
                    <div className="flm" />
                  </div>
                )}
                {candlesLit[2] && (
                  <div className="cndl" style={{ left: '67%' }} onClick={() => handleBlowCandle(2)}>
                    <div className="flm" />
                  </div>
                )}

                {/* Cake layers */}
                <div className="lyr lyr-3">
                  <div className="drp" style={{ backgroundColor: '#b45309', height: '5px' }} />
                </div>
                <div className="lyr lyr-2">
                  <div className="drp" style={{ backgroundColor: '#78350f', height: '6px' }} />
                </div>
                <div className="lyr lyr-1">
                  <div className="drp" style={{ backgroundColor: '#b45309', height: '7px' }} />
                </div>
                <div className="plate" />
              </div>

              <p className="cake-instruction mt-4 animate-pulse">
                {cakeBlownOut ? "🕯️ Secret wish registered completes! Happy Birthday! 🕯️" : "🕯️ Click on each candle flame to blow it out! 🕯️"}
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default BirthdayRetroCamera;
