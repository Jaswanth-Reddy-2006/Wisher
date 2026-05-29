import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import './style.css';

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  speedX: number;
  speedY: number;
  swayOffset: number;
  swaySpeed: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

type GardenPhase = 'gate' | 'watering' | 'blooming' | 'quiz' | 'finale';

export const BirthdayBotanicalMagic: React.FC<TemplateProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Garden Staged Phases
  const [currentPhase, setCurrentPhase] = useState<GardenPhase>('gate');
  
  // Phase 2: Watering Can drag/click state
  const [waterPoured, setWaterPoured] = useState<number>(0);
  const [isWatering, setIsWatering] = useState<boolean>(false);
  
  // Phase 3: Blooming state
  const [bloomPercent, setBloomPercent] = useState<number>(0);
  
  // Phase 4: Quiz
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizWrong, setQuizWrong] = useState<boolean>(false);
  const [quizSuccess, setQuizSuccess] = useState<boolean>(false);

  // Phase 5: Finale letter
  const [showScroll, setShowScroll] = useState<boolean>(false);
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [cakeBlownOut, setCakeBlownOut] = useState<boolean>(false);

  // Sound Synth references
  const synthCtxRef = useRef<AudioContext | null>(null);
  const sparklesRef = useRef<Sparkle[]>([]);

  // Synthesize chiptunes/nature ambient sounds programmatically
  const playSound = (type: 'breeze' | 'splash' | 'bloom' | 'success' | 'wrong' | 'blow') => {
    try {
      if (!synthCtxRef.current) {
        synthCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;

      if (type === 'breeze') {
        // Nature forest wind (modulated low-pass noise)
        const bufferSize = ctx.sampleRate * 1.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(800, now + 1.5);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (type === 'splash') {
        // Water splash droplet bubble noise
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'bloom') {
        // Growing glowing harp sweeps
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C major scale sweep
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.07);
          gain.gain.setValueAtTime(0.05, now + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.07);
          osc.stop(now + i * 0.07 + 0.25);
        });
      } else if (type === 'success') {
        // Celestial harp victory sweep
        const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.05);
          gain.gain.setValueAtTime(0.04, now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.05);
          osc.stop(now + i * 0.05 + 0.22);
        });
      } else if (type === 'wrong') {
        // Low wood block alert chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.setValueAtTime(150, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'blow') {
        // Blowing wind soft whistle
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn("Sound synthesis not active:", e);
    }
  };

  // Backing audio loop configuration
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
        .catch(err => console.error("Autoplay blocked:", err));
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

  // Canvas fireflies and sparkles loops
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

    // Glowing organic green/gold fireflies
    const fireflies: Firefly[] = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height * 0.85,
      size: 1.5 + Math.random() * 2,
      alpha: 0.1 + Math.random() * 0.7,
      speedX: -0.4 + Math.random() * 0.8,
      speedY: -0.3 - Math.random() * 0.4,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.01
    }));

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Fireflies rendering
      fireflies.forEach(f => {
        f.y += f.speedY;
        f.x += f.speedX + Math.sin(f.y * f.swaySpeed + f.swayOffset) * 0.4;
        
        if (f.y < -10) {
          f.y = height + 10;
          f.x = Math.random() * width;
        }

        // soft organic pulsation
        const pulsate = 0.6 + Math.sin(Date.now() * 0.002 + f.swayOffset) * 0.4;
        
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 3.5);
        grad.addColorStop(0, `rgba(16, 185, 129, ${f.alpha * pulsate})`); // beautiful emerald green
        grad.addColorStop(0.3, `rgba(245, 158, 11, ${f.alpha * pulsate * 0.4})`); // glowing warm amber gold
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Sparkling water drops or growth sparks
      sparklesRef.current.forEach(sp => {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.06; // gravity
        sp.alpha -= 0.012;

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.fillRect(Math.floor(sp.x), Math.floor(sp.y), Math.floor(sp.size), Math.floor(sp.size));
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

  // Enter botanical garden gate action
  const handleEnterGarden = () => {
    playSound('breeze');
    startMusic();
    setCurrentPhase('watering');
  };

  // Water pouring minigame action
  const handleWateringClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (currentPhase !== 'watering') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    setIsWatering(true);
    playSound('splash');

    // Create pouring water droplets
    for (let i = 0; i < 12; i++) {
      sparklesRef.current.push({
        x: clickX - 25 + Math.random() * 10, // offsets from watering spout
        y: clickY + 10,
        vx: -1 + Math.random() * 2,
        vy: 2 + Math.random() * 4,
        alpha: 1,
        size: 3 + Math.random() * 3,
        color: '#60a5fa' // crystal blue droplets
      });
    }

    setWaterPoured(prev => {
      const next = prev + 1;
      if (next >= 5) {
        // Unlock Blooming!
        setIsWatering(false);
        setTimeout(() => {
          setCurrentPhase('blooming');
          animateRoseBlooming();
        }, 800);
      }
      return next;
    });

    setTimeout(() => setIsWatering(false), 250);
  };

  // Slowly sprouts seed into glowing flower
  const animateRoseBlooming = () => {
    playSound('bloom');
    let percent = 0;
    const interval = setInterval(() => {
      percent += 1;
      setBloomPercent(percent);

      // spawn organic magic growth sparks
      if (percent % 4 === 0) {
        sparklesRef.current.push({
          x: window.innerWidth / 2 - 40 + Math.random() * 80,
          y: window.innerHeight / 2 - 120 + Math.random() * 120,
          vx: -1.5 + Math.random() * 3,
          vy: -1.5 + Math.random() * 3,
          alpha: 1,
          size: 2 + Math.random() * 2,
          color: '#fbbf24' // gold stardust
        });
      }

      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentPhase('quiz');
          playSound('breeze');
        }, 1500);
      }
    }, 45);
  };

  // Trivia Quiz validation
  const quizQ = data.quizQ1 || "What is my dream travel destination?";
  const quizA = data.quizA1a || "Paris 🗼";
  const quizB = data.quizA1b || "Maldives 🏝️";
  const quizC = data.quizA1c || "Tokyo 🗾";
  const quizD = data.quizA1d || "Switzerland 🏔️";
  const correctIdx = data.quizA1correct !== undefined ? data.quizA1correct : 1;

  const handleQuizAnswer = (idx: number) => {
    setSelectedOption(idx);
    if (idx === correctIdx) {
      setQuizWrong(false);
      setQuizSuccess(true);
      playSound('success');
      
      // Spawn stardust confetti
      import('canvas-confetti').then((m) => {
        m.default({ particleCount: 50, spread: 60, colors: ['#10b981', '#f59e0b', '#34d399'] });
      });

      setTimeout(() => {
        setCurrentPhase('finale');
        setShowScroll(true);
      }, 1500);
    } else {
      playSound('wrong');
      setQuizWrong(true);
      setTimeout(() => setQuizWrong(false), 600); // end shake
    }
  };

  // Blow candle action
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
        m.default({ particleCount: 50, spread: 60, colors: ['#10b981', '#fbbf24', '#ffffff'] });
      });
    }
  };

  // Typewriter cursive greetings
  const fullMessage = data.message || "Wishing you a birthday filled with celestial starlight, lovely memories, and dreams that fly as high as the lanterns in the sky. May your year be stellar!";
  
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
    <div className="botanical-magic-root select-none font-sans">
      {/* Background fireflies canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Forest Greenhouse Back Arch */}
      <div className="greenhouse-dome pointer-events-none" />

      {/* Floating Audio Soundtrack player */}
      <button onClick={toggleMusic} className="bgm-panel-btn z-50">
        {isPlaying ? '🔊 MUSIC ON' : '🔇 MUSIC OFF'}
      </button>

      {/* 1. GARDEN GATE FRONT PANEL (Phase 1) */}
      {currentPhase === 'gate' && (
        <div className="gate-cabinet flex flex-col items-center justify-center text-center p-6 z-10">
          <div className="glassmorphism-card p-10 max-w-md animate-fadeIn">
            <div className="garden-logo mb-6 animate-pulse">🌿</div>
            <h1 className="garden-title">BOTANICAL GARDEN</h1>
            <p className="garden-subtitle mt-4">
              AN INTERACTIVE MAGICAL BIRTHDAY PRESENT
            </p>
            <button onClick={handleEnterGarden} className="btn-enter-garden mt-8">
              ENTER BOTANICAL GARDEN
            </button>
          </div>
        </div>
      )}

      {/* 2. WATERING MINIGAME INTERACTIVE (Phase 2) */}
      {currentPhase === 'watering' && (
        <div className="watering-board flex flex-col items-center justify-center p-6 z-10 w-full h-full" onClick={handleWateringClick}>
          <div className="water-instruction-pill mb-12">
            💧 Tap the soil pot {5 - waterPoured} times to water the magical seed! 💧
          </div>

          <div className="garden-pot-container relative">
            {/* Soil Pot */}
            <div className="soil-pot relative">
              <div className="soil-inner" />
              {/* Sprout seed */}
              <div className="seed-dot" />
            </div>

            {/* Floating custom CSS/SVG Watering Can that tracks click locations */}
            <div className={`watering-can-svg absolute ${isWatering ? 'pouring' : ''}`}>
              <svg viewBox="0 0 100 80" className="w-16 h-12 fill-emerald-400">
                {/* Can body */}
                <path d="M20 30 h50 v30 h-50 z" />
                {/* Spout */}
                <path d="M70 40 l18 -12 l2 4 l-16 12 z" />
                {/* Handle */}
                <path d="M20 35 a12 12 0 0 0 0 20 z" fill="none" stroke="#10b981" strokeWidth="6" />
              </svg>
            </div>
          </div>

          <div className="watering-meter mt-10">
            <div className="watering-fill" style={{ width: `${(waterPoured / 5) * 100}%` }} />
          </div>
        </div>
      )}

      {/* 3. MAGIC SEED GROWING & BLOOMING SCENE (Phase 3) */}
      {currentPhase === 'blooming' && (
        <div className="blooming-stage flex flex-col items-center justify-center p-6 z-10 w-full h-full">
          <div className="water-instruction-pill mb-12 animate-pulse">
            🌱 Behold the magical growth of your birthday rose... 🌱
          </div>

          <div className="blooming-vibe-box relative flex items-center justify-center">
            {/* The sprouting Vine stem */}
            <div className="vine-stem" style={{ height: `${Math.min(100, bloomPercent * 1.5)}px` }} />

            {/* Unfolding Petals Layered Rose (only displays when vine grows up) */}
            {bloomPercent > 40 && (
              <div className="magic-rose-flower scale-up" style={{ transform: `scale(${(bloomPercent - 40) / 60})` }}>
                <div className="petal petal-outer-1" />
                <div className="petal petal-outer-2" />
                <div className="petal petal-middle-1" />
                <div className="petal petal-middle-2" />
                <div className="petal petal-inner" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. TRIVIA QUIZ GATED CARD (Phase 4) */}
      {currentPhase === 'quiz' && (
        <div className="quiz-panel z-30 flex items-center justify-center p-4 w-full h-full" onClick={e => e.stopPropagation()}>
          <div className={`quiz-box ${quizWrong ? 'animate-shake' : ''}`}>
            <div className="quiz-banner">LEVEL 2: GARDEN HINT</div>
            <p className="quiz-question-text">{quizQ}</p>
            
            <div className="options-vertical-grid">
              <button onClick={() => handleQuizAnswer(0)} className={`btn-opt ${selectedOption === 0 ? (correctIdx === 0 ? 'correct' : 'wrong') : ''}`}>
                [A] {quizA}
              </button>
              <button onClick={() => handleQuizAnswer(1)} className={`btn-opt ${selectedOption === 1 ? (correctIdx === 1 ? 'correct' : 'wrong') : ''}`}>
                [B] {quizB}
              </button>
              <button onClick={() => handleQuizAnswer(2)} className={`btn-opt ${selectedOption === 2 ? (correctIdx === 2 ? 'correct' : 'wrong') : ''}`}>
                [C] {quizC}
              </button>
              <button onClick={() => handleQuizAnswer(3)} className={`btn-opt ${selectedOption === 3 ? (correctIdx === 3 ? 'correct' : 'wrong') : ''}`}>
                [D] {quizD}
              </button>
            </div>

            {quizWrong && <p className="feedback-err mt-4">WRONG ANSWER! SEED BLOCKED! RETRY! 🌿</p>}
            {quizSuccess && <p className="feedback-ok mt-4">SUCCESS! REVEALING MAGICAL LETTERS... 🎉</p>}
          </div>
        </div>
      )}

      {/* 5. FINALE SCREEN - UNFOLDING VINTAGE SCROLL & CSS BIRTHDAY CAKE (Phase 5) */}
      {currentPhase === 'finale' && (
        <div className="finale-viewport flex flex-col items-center overflow-y-auto w-full h-full py-16 px-4 z-20">
          <div className="glass-letter-plate p-8 max-w-xl text-center w-full animate-fadeIn">
            <h2 className="letter-title tracking-widest">A FOREST GREETING</h2>
            <h3 className="letter-header mt-2 text-2xl font-bold text-emerald-300">
              Happy Birthday, {data.targetName || "Navya"}!
            </h3>

            <div className="organic-divider my-6" />

            <div className="letter-content-box">
              <pre className="letter-text leading-relaxed text-emerald-100 whitespace-pre-wrap text-sm font-serif">
                {typedMessage}
                {!isTypingComplete && <span className="custom-blink-cursor">|</span>}
              </pre>
            </div>

            {isTypingComplete && (
              <div className="signature-box mt-8 flex flex-col items-center animate-fadeIn">
                <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold">With Love,</span>
                <span className="signature-font-style text-emerald-200 text-3xl font-bold mt-1">
                  {data.senderName || "Wisher"}
                </span>
              </div>
            )}
          </div>

          {/* Special lit CSS cake at the bottom of the scroll */}
          {isTypingComplete && (
            <div className="finale-cake-block flex flex-col items-center mt-12 animate-fadeIn">
              <div className="cake-illustration relative">
                
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
                <div className="layer layer-3">
                  <div className="drps" style={{ backgroundColor: '#10b981', height: '5px' }} />
                </div>
                <div className="layer layer-2">
                  <div className="drps" style={{ backgroundColor: '#047857', height: '6px' }} />
                </div>
                <div className="layer layer-1">
                  <div className="drps" style={{ backgroundColor: '#10b981', height: '7px' }} />
                </div>
                <div className="cake-plate" />
              </div>

              <p className="cake-instruction mt-4 animate-pulse">
                {cakeBlownOut ? "✨ Make a silent wish in your heart! Happy Birthday! ✨" : "🎂 Tap the flames to blow out candles! 🎂"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BirthdayBotanicalMagic;
