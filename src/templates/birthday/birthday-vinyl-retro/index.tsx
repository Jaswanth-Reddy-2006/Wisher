import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import './style.css';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

type VinylPhase = 'gate' | 'turntable' | 'polaroid' | 'scroll';

export const BirthdayVinylRetro: React.FC<TemplateProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Turntable staged flow
  const [currentPhase, setCurrentPhase] = useState<VinylPhase>('gate');
  const [needleDropped, setNeedleDropped] = useState<boolean>(false);
  const [isRecordSpinning, setIsRecordSpinning] = useState<boolean>(false);
  
  // Custom Polaroids slide out
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [activeMemoryTitle, setActiveMemoryTitle] = useState<string>('');
  
  // Cassette unspool final
  const [showScroll, setShowScroll] = useState<boolean>(false);
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [cakeBlownOut, setCakeBlownOut] = useState<boolean>(false);

  // Sound Synth & Sparkles
  const synthCtxRef = useRef<AudioContext | null>(null);
  const sparklesRef = useRef<Sparkle[]>([]);

  // Synthesize chiptunes/needle drops programmatically
  const playSound = (type: 'scratch' | 'click' | 'chime' | 'success' | 'blow') => {
    try {
      if (!synthCtxRef.current) {
        synthCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;

      if (type === 'scratch') {
        // High fidelity white noise scratch
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          channelData[i] = Math.random() * 2 - 1;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, now);
        filter.frequency.exponentialRampToValueAtTime(100, now + 0.4);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        source.start(now);
      } else if (type === 'click') {
        // Cassette click noise
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'chime') {
        // High crystalline chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now); // E5
        osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.3); // B5
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'success') {
        // Celestial chiptune arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.07);
          gain.gain.setValueAtTime(0.06, now + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.07);
          osc.stop(now + i * 0.07 + 0.22);
        });
      } else if (type === 'blow') {
        // Soft breath breeze noise
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.25);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (e) {
      console.warn("Sound synthesis not active:", e);
    }
  };

  // Backing soundtrack player
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

  // Canvas dynamic particles loops
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

      // Render sparkles and music particles
      sparklesRef.current.forEach(sp => {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.012;

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

  // Enter vinyl player BGM room gate
  const handleEnterGate = () => {
    playSound('chime');
    setCurrentPhase('turntable');
  };

  // Click Stylus needle arm places it on rotating disc
  const handleDropNeedle = () => {
    if (needleDropped) return;
    playSound('scratch');
    setNeedleDropped(true);
    setIsRecordSpinning(true);
    
    // Stagger music playing by 400ms to follow the needle scratch
    setTimeout(() => {
      startMusic();
      playSound('success');
    }, 450);
  };

  // Open album covers slides
  const handleOpenAlbum = () => {
    playSound('click');
    setCurrentPhase('polaroid');
  };

  // Clicking individual polaroids zooms
  const handleZoomPolaroid = (photoUrl: string, title: string) => {
    playSound('chime');
    setActivePhoto(photoUrl);
    setActiveMemoryTitle(title);
  };

  // Opens Cassette tapes scroll wishes
  const handleOpenCassette = () => {
    playSound('click');
    setCurrentPhase('scroll');
    setShowScroll(true);
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
        m.default({ particleCount: 50, spread: 60, colors: ['#ec4899', '#f59e0b', '#ffffff'] });
      });
    }
  };

  // Mapped photo gallery
  const PHOTO_FALLBACKS = [
    data.photo1 || "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=80",
    data.photo2 || "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    data.photo3 || "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80"
  ];

  const MEMORY_TITLES = [
    "Magic Memories ✨",
    "Infinite Laughter 😂",
    "A Beautiful Day ☀️"
  ];

  // Typing greeting script
  const fullMessage = data.message || "HAPPY BIRTHDAY! YOU HAVE REVEALED THE CELESTIAL MUSIC AND MEMORIES! WISHING YOU A SPECTACULAR RETRO YEAR AHEAD!";
  
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
    <div className="vinyl-retro-root select-none font-mono">
      {/* Background canvas sparks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Retro CRT scanline grids */}
      <div className="vinyl-crt pointer-events-none" />

      {/* 1. RETRO HEADPHONES GATE (Phase 1) */}
      {currentPhase === 'gate' && (
        <div className="gate-screen flex flex-col items-center justify-center text-center p-6 z-10 w-full h-full">
          <div className="neon-border-box p-10 bg-black/85 rounded-xl max-w-sm animate-fadeIn">
            <div className="neon-headphones-icon mb-6 animate-bounce">🎧</div>
            <h1 className="neon-room-title">RETRO VINYL CARD</h1>
            <p className="neon-room-subtitle mt-4">
              TURN UP THE STYLUS NEEDLE SOUND
            </p>
            <button onClick={handleEnterGate} className="btn-enter-room mt-8">
              ENTER TURNTABLE ROOM
            </button>
          </div>
        </div>
      )}

      {/* 2. DYNAMIC VINYL TURNTABLE DECK PLAYER (Phase 2 & 3) */}
      {currentPhase === 'turntable' && (
        <div className="turntable-cabinet flex flex-col items-center justify-center p-4 z-10 w-full h-full">
          
          <div className="turntable-instruction mb-8">
            {needleDropped ? "💿 Spinning Happy Birthday Beats! 💿" : "💿 Click the stylus needle tonearm to drop onto the record! 💿"}
          </div>

          <div className="deck-wrapper relative flex items-center justify-center bg-[#2b2b2b] p-8 rounded-2xl border-4 border-[#3a3a3a] shadow-2xl">
            {/* Spinning Vinyl Record */}
            <div 
              className={`vinyl-record relative rounded-full bg-black shadow-inner ${isRecordSpinning ? 'spinning' : ''}`}
              onClick={handleDropNeedle}
            >
              <div className="vinyl-groove-circle w-[90%] h-[90%] border border-zinc-900 rounded-full absolute top-[5%] left-[5%]" />
              <div className="vinyl-groove-circle w-[80%] h-[80%] border border-zinc-900 rounded-full absolute top-[10%] left-[10%]" />
              <div className="vinyl-groove-circle w-[70%] h-[70%] border border-zinc-900 rounded-full absolute top-[15%] left-[15%]" />
              
              {/* Record Center Label (Album Art) */}
              <div className="vinyl-center-label flex items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 absolute">
                <div className="vinyl-center-hole w-4 h-4 bg-[#2b2b2b] rounded-full" />
              </div>
            </div>

            {/* Turntable Metallic Tonearm / Needle */}
            <div 
              className={`tonearm-metal absolute ${needleDropped ? 'arm-dropped' : ''}`}
              onClick={handleDropNeedle}
              title="Click needle to drop onto the record"
            >
              <svg viewBox="0 0 40 120" className="w-12 h-36">
                {/* Arm pivot base */}
                <circle cx="20" cy="20" r="14" fill="#a1a1aa" />
                <circle cx="20" cy="20" r="8" fill="#71717a" />
                {/* Metallic rod */}
                <rect x="18" y="20" width="4" height="85" fill="#d4d4d8" />
                {/* Needle cartridge */}
                <rect x="14" y="105" width="12" height="15" fill="#f43f5e" rx="2" />
              </svg>
            </div>

            {/* Glowing Equalizer bars visualizer at the bottom of the turntable */}
            {isRecordSpinning && (
              <div className="neon-visualizer-bars absolute bottom-4 left-6 right-6 flex justify-between px-4">
                <div className="bar bar-pink animate-visual1" />
                <div className="bar bar-amber animate-visual2" />
                <div className="bar bar-pink animate-visual3" />
                <div className="bar bar-amber animate-visual4" />
                <div className="bar bar-pink animate-visual5" />
                <div className="bar bar-amber animate-visual6" />
              </div>
            )}
          </div>

          {/* Nav buttons */}
          {needleDropped && (
            <div className="turntable-nav-grid mt-10 flex gap-4 animate-fadeIn">
              <button onClick={handleOpenAlbum} className="btn-deck">
                FLIP ALBUM MEMORIES 📂
              </button>
              <button onClick={handleOpenCassette} className="btn-deck bg-rose-500 hover:bg-rose-600">
                READ LINER NOTES 💌
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. ALBUM COVER MEMORY POLAROID GRID (Phase 3) */}
      {currentPhase === 'polaroid' && (
        <div className="album-sleeve-screen flex flex-col items-center justify-center p-6 z-10 w-full h-full">
          <div className="sleeve-instruction mb-6">
            📂 Click each Polaroid to zoom into your magic birthday album! 📂
          </div>

          <div className="sleeve-card-container grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            {PHOTO_FALLBACKS.map((url, idx) => (
              <div 
                key={idx}
                onClick={() => handleZoomPolaroid(url, MEMORY_TITLES[idx])}
                className="polaroid-sleeve flex flex-col items-center p-3 bg-[#fdfdfd] text-[#111] shadow-xl hover:scale-105 duration-200 cursor-pointer"
              >
                <img src={url} alt={MEMORY_TITLES[idx]} className="sleeve-photo aspect-square object-cover w-full rounded-sm" />
                <span className="sleeve-caption font-serif mt-3 text-xs font-bold text-slate-800">
                  {MEMORY_TITLES[idx]}
                </span>
              </div>
            ))}
          </div>

          <button onClick={() => { playSound('click'); setCurrentPhase('turntable'); }} className="btn-deck mt-10">
            ← BACK TO TURNTABLE
          </button>
        </div>
      )}

      {/* 4. CASSETTE LINER NOTES & CSS CAKE (Phase 4) */}
      {showScroll && currentPhase === 'scroll' && (
        <div className="cassette-viewport flex flex-col items-center overflow-y-auto w-full h-full py-16 px-4 z-20">
          
          <div className="cassette-tape-card p-8 bg-zinc-950 border border-rose-500/35 rounded-xl max-w-xl text-center w-full animate-fadeIn shadow-2xl">
            <div className="cassette-header flex justify-between px-2 text-[9px] text-rose-400 font-bold mb-4 uppercase tracking-widest">
              <span>SIDE A</span>
              <span>WISHER STEREO</span>
            </div>

            {/* Glowing Cassette spindle holes */}
            <div className="cassette-spindles flex justify-center gap-16 my-8">
              <div className="spindle w-12 h-12 rounded-full border-4 border-dashed border-rose-500/40 flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
                <div className="w-4 h-4 bg-zinc-900 rounded-full" />
              </div>
              <div className="spindle w-12 h-12 rounded-full border-4 border-dashed border-rose-500/40 flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
                <div className="w-4 h-4 bg-zinc-900 rounded-full" />
              </div>
            </div>

            <h3 className="liner-header mt-2 text-xl font-bold text-rose-300">
              HAPPY BIRTHDAY, {data.targetName || "Navya"}!
            </h3>

            <div className="liner-divider my-4" />

            <div className="liner-message-box">
              <pre className="liner-text leading-relaxed text-rose-100 whitespace-pre-wrap text-[11px] text-center font-mono">
                {typedMessage}
                {!isTypingComplete && <span className="liner-blink-cursor">_</span>}
              </pre>
            </div>

            {isTypingComplete && (
              <div className="signature-box mt-6 flex flex-col items-center animate-fadeIn">
                <span className="text-[8px] uppercase tracking-widest text-rose-400 font-bold">WITH LOVE,</span>
                <span className="signature-font text-rose-200 text-2xl font-bold mt-1">
                  {data.senderName || "Wisher"}
                </span>
              </div>
            )}
          </div>

          {/* Interactive lit CSS birthday cake at the bottom of liner scroll */}
          {isTypingComplete && (
            <div className="liner-cake-box flex flex-col items-center mt-12 animate-fadeIn">
              <div className="cake-draw relative">
                
                {/* 3 Candles */}
                {candlesLit[0] && (
                  <div className="cndle" style={{ left: '33%' }} onClick={() => handleBlowCandle(0)}>
                    <div className="flam" />
                  </div>
                )}
                {candlesLit[1] && (
                  <div className="cndle" style={{ left: '50%' }} onClick={() => handleBlowCandle(1)}>
                    <div className="flam" />
                  </div>
                )}
                {candlesLit[2] && (
                  <div className="cndle" style={{ left: '67%' }} onClick={() => handleBlowCandle(2)}>
                    <div className="flam" />
                  </div>
                )}

                {/* Cake layers */}
                <div className="lyr lyr-3">
                  <div className="drp" style={{ backgroundColor: '#ec4899', height: '5px' }} />
                </div>
                <div className="lyr lyr-2">
                  <div className="drp" style={{ backgroundColor: '#f43f5e', height: '6px' }} />
                </div>
                <div className="lyr lyr-1">
                  <div className="drp" style={{ backgroundColor: '#ec4899', height: '7px' }} />
                </div>
                <div className="cake-plate" />
              </div>

              <p className="cake-prompt mt-4 animate-pulse">
                {cakeBlownOut ? "✨ Make your silent birthday wish! Happy Birthday! ✨" : "🎂 Tap the flames to blow out candles! 🎂"}
              </p>

              <button onClick={() => { playSound('click'); setCurrentPhase('turntable'); }} className="btn-deck mt-8">
                ← BACK TO TURNTABLE
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. MODULAR POLAROID PHOTO ZOOM */}
      {activePhoto && (
        <div className="sleeve-zoom-overlay" onClick={() => setActivePhoto(null)}>
          <div className="zoom-sleeve-polaroid animate-popIn" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-slate-800 text-sm font-bold" onClick={() => setActivePhoto(null)}>
              ✕
            </button>
            <img src={activePhoto} alt="Memory Snapshot" className="sleeve-zoom-img select-none w-full aspect-square object-cover" />
            <div className="sleeve-zoom-footer text-center mt-3 font-serif font-bold text-xs text-slate-800">
              {activeMemoryTitle}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BirthdayVinylRetro;
