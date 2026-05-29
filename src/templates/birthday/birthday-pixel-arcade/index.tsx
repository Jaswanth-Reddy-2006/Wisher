import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import './style.css';

interface Bullet {
  x: number;
  y: number;
  width: number;
  height: number;
  speedY: number;
}

interface PixelBalloon {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speedY: number;
  swaySpeed: number;
  swayOffset: number;
  isPopped: boolean;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
}

type ArcadePhase = 'insert_coin' | 'game' | 'quiz' | 'scroll';

export const BirthdayPixelArcade: React.FC<TemplateProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Arcade Flow States
  const [currentPhase, setCurrentPhase] = useState<ArcadePhase>('insert_coin');
  const [gameScore, setGameScore] = useState<number>(0);
  
  // Quiz Options
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizWrong, setQuizWrong] = useState<boolean>(false);
  const [quizSuccess, setQuizSuccess] = useState<boolean>(false);

  // Wishing scroll typewriter
  const [showScroll, setShowScroll] = useState<boolean>(false);
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  // Core sound synthesizer (Web Audio API for zero-request 8-bit sound effects)
  const synthAudioCtxRef = useRef<AudioContext | null>(null);

  const playSound = (type: 'shoot' | 'pop' | 'success' | 'wrong' | 'coin') => {
    try {
      if (!synthAudioCtxRef.current) {
        synthAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = synthAudioCtxRef.current;
      
      // Safety unlock for browser suspend
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'coin') {
        // Double high-pitch blip
        osc.type = 'square';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'shoot') {
        // Laser sweep up
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'pop') {
        // Exploding sweep down
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'success') {
        // Chiptune Victory arpeggio
        osc.type = 'square';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'wrong') {
        // Low buzzer
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130.81, now); // C3
        osc.frequency.setValueAtTime(110.00, now + 0.15); // A2
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      console.warn("Web Audio Synth not available or blocked:", e);
    }
  };

  // Backing soundtrack configuration
  useEffect(() => {
    if (data.musicUrl) {
      const audio = new Audio(data.musicUrl);
      audio.loop = true;
      audioRef.current = audio;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [data.musicUrl]);

  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Audio autoplay blocked:", err));
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

  // 8-Bit Balloon Shooter Canvas Engine
  const shipXRef = useRef<number>(200);
  const bulletsRef = useRef<Bullet[]>([]);
  const balloonsRef = useRef<PixelBalloon[]>([]);
  const scoreRef = useRef<number>(0);
  const nextBalloonIdRef = useRef<number>(1);
  const phaseRef = useRef<ArcadePhase>('insert_coin');

  useEffect(() => {
    phaseRef.current = currentPhase;
  }, [currentPhase]);

  // Click Insert Coin triggers start
  const handleInsertCoin = () => {
    playSound('coin');
    startMusic();
    setCurrentPhase('game');
    triggerPixelConfetti(0.3);
  };

  // Screen mouse/touch trail handles ship position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (currentPhase !== 'game') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    shipXRef.current = Math.max(20, Math.min(rect.width - 20, x));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (currentPhase !== 'game') return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      const x = e.touches[0].clientX - rect.left;
      shipXRef.current = Math.max(20, Math.min(rect.width - 20, x));
    }
  };

  // Main Canvas game ticks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial stars field
    const stars: Star[] = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      alpha: Math.random(),
      speed: 0.2 + Math.random() * 0.5
    }));

    let lastShotTime = 0;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Star Parallax background
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > height) {
          s.y = 0;
          s.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        // pixel block drawing
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y), Math.floor(s.size), Math.floor(s.size));
      });

      // 2. ONLY DRAW GAMEPLAY OBJECTS IN 'game' PHASE
      if (phaseRef.current === 'game') {
        const now = Date.now();

        // 2a. Shoot bullet laser automatically every 350ms
        if (now - lastShotTime > 350) {
          bulletsRef.current.push({
            x: shipXRef.current - 2,
            y: height - 60,
            width: 4,
            height: 12,
            speedY: -6
          });
          playSound('shoot');
          lastShotTime = now;
        }

        // 2b. Populate new balloons
        if (balloonsRef.current.length < 5 && scoreRef.current < 10) {
          const colors = ['#f43f5e', '#3b82f6', '#10b981', '#a855f7', '#f59e0b', '#ec4899'];
          balloonsRef.current.push({
            id: nextBalloonIdRef.current++,
            x: Math.random() * (width - 60) + 30,
            y: height + 50,
            width: 32,
            height: 40,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: -(1.2 + Math.random() * 1.5),
            swaySpeed: 0.01 + Math.random() * 0.015,
            swayOffset: Math.random() * Math.PI * 2,
            isPopped: false
          });
        }

        // 2c. Update and draw bullets
        ctx.fillStyle = '#f59e0b';
        bulletsRef.current.forEach((b) => {
          b.y += b.speedY;
          // pixel laser
          ctx.fillRect(Math.floor(b.x), Math.floor(b.y), Math.floor(b.width), Math.floor(b.height));
        });
        bulletsRef.current = bulletsRef.current.filter(b => b.y > 0);

        // 2d. Update and draw balloons
        balloonsRef.current.forEach((b) => {
          b.y += b.speedY;
          b.x += Math.sin(b.y * b.swaySpeed + b.swayOffset) * 1.2;

          ctx.fillStyle = b.color;
          // 8-Bit Pixel Balloon Oval Body
          ctx.fillRect(Math.floor(b.x - b.width / 2), Math.floor(b.y - b.height / 2), Math.floor(b.width), Math.floor(b.height));
          // string knot block
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(Math.floor(b.x - 2), Math.floor(b.y + b.height / 2), 4, 4);

          // Check collisions with bullets
          bulletsRef.current.forEach((bul) => {
            const hitX = bul.x > b.x - b.width / 2 && bul.x < b.x + b.width / 2;
            const hitY = bul.y > b.y - b.height / 2 && bul.y < b.y + b.height / 2;

            if (hitX && hitY && !b.isPopped) {
              b.isPopped = true;
              bul.y = -100; // discard bullet
              playSound('pop');

              scoreRef.current += 1;
              setGameScore(scoreRef.current);

              if (scoreRef.current >= 10) {
                // Game victory! Arpeggio blip and move to quiz
                playSound('success');
                triggerPixelConfetti(0.4);
                setTimeout(() => {
                  setCurrentPhase('quiz');
                }, 1500);
              }
            }
          });
        });
        balloonsRef.current = balloonsRef.current.filter(b => b.y > -b.height && !b.isPopped);

        // 2e. Draw Space Ship (Pixel Heart Starship)
        const sX = shipXRef.current;
        const sY = height - 40;
        ctx.fillStyle = '#ec4899';
        // Draw little heart pixel outline
        // top left block
        ctx.fillRect(Math.floor(sX - 10), Math.floor(sY - 8), 6, 6);
        // top right block
        ctx.fillRect(Math.floor(sX + 4), Math.floor(sY - 8), 6, 6);
        // middle block
        ctx.fillRect(Math.floor(sX - 14), Math.floor(sY - 2), 28, 6);
        // lower center blocks
        ctx.fillRect(Math.floor(sX - 10), Math.floor(sY + 4), 20, 6);
        ctx.fillRect(Math.floor(sX - 4), Math.floor(sY + 10), 8, 6);
      }

      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [currentPhase]);

  // Pixel Confetti bursts (using block particles)
  const triggerPixelConfetti = (intensity = 0.3) => {
    import('canvas-confetti').then((m) => {
      const confetti = m.default;
      confetti({
        particleCount: Math.floor(intensity * 120),
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#f59e0b', '#3b82f6', '#ec4899', '#10b981']
      });
    });
  };

  // Quiz details
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
      triggerPixelConfetti(0.4);
      setTimeout(() => {
        setCurrentPhase('scroll');
        setShowScroll(true);
      }, 1500);
    } else {
      playSound('wrong');
      setQuizWrong(true);
      setTimeout(() => setQuizWrong(false), 500);
    }
  };

  // Types messages cursive parchment
  const fullMessage = data.message || "HAPPY BIRTHDAY! YOU SUCCESSFULLY COMPLETED THE ARCADE ADVENTURE! WISHING YOU A PIXEL-PERFECT YEAR FULL OF STUNNING DISCOVERIES AND UNFORGETTABLE VICTORIES! GAME OVER? NO, YOUR LEVEL 2 IS JUST STARTING!";
  
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
        triggerPixelConfetti(0.4);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [showScroll, fullMessage]);

  return (
    <div 
      className="pixel-arcade-root select-none font-mono"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Parallax Star Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Retro CRT Scanline overlay effect */}
      <div className="crt-scanlines pointer-events-none" />

      {/* Floating BGM Toggle */}
      <button onClick={toggleMusic} className="bgm-player-btn z-50" aria-label="Toggle retro soundtrack">
        {isPlaying ? '🔊 MUSIC ON' : '🔇 MUSIC OFF'}
      </button>

      {/* 1. INSERT COIN FRONT SCREEN (Phase 1) */}
      {currentPhase === 'insert_coin' && (
        <div className="cabinet-front flex flex-col items-center justify-center text-center z-10 p-6">
          <div className="glowing-border-wrap p-8 bg-black/80 rounded-lg">
            <h1 className="game-title animate-bounce">WISHER ARCADE</h1>
            <h2 className="birthday-banner-pixel mt-4">BIRTHDAY INVITATION</h2>
            <div className="divider-pixel" />
            
            <p className="instruction-start mt-6 animate-pulse">
              LEVEL 1: BALLOON SHOOTER GAME
            </p>
            <p className="instruction-sub-pixel mt-2 text-rose-400">
              POP 10 BALLOONS TO UNLOCK SECRETS
            </p>

            <button onClick={handleInsertCoin} className="btn-insert-coin mt-8">
              INSERT COIN / START GAME
            </button>

            <p className="text-[8px] text-gray-500 mt-6 tracking-widest uppercase">
              © 2026 WISHER ENGINE - PRESS START
            </p>
          </div>
        </div>
      )}

      {/* 2. MINIGAME GAMEPLAY SCORE PANEL (Phase 2) */}
      {currentPhase === 'game' && (
        <div className="fixed top-6 left-6 z-40 bg-black/60 border border-rose-500/40 px-4 py-2 rounded text-[10px] text-rose-400 tracking-wider">
          SCORE: {gameScore} / 10 <br />
          AUTOSHOOT ACTIVE - SWIPE TO MOVE HEART SHIP
        </div>
      )}

      {/* 3. TRIVIA QUIZ DIALOG BOX (Phase 3) */}
      {currentPhase === 'quiz' && (
        <div className="quiz-overlay-panel z-30 flex items-center justify-center p-4" onClick={e => e.stopPropagation()}>
          <div className={`quiz-box-card ${quizWrong ? 'animate-shake' : ''}`}>
            <div className="card-header-pixel">LEVEL 2: TRIVIA CHALLENGE</div>
            <p className="quiz-question-pixel">{quizQ}</p>
            
            <div className="quiz-options-grid">
              <button onClick={() => handleQuizAnswer(0)} className={`btn-pixel-quiz ${selectedOption === 0 ? (correctIdx === 0 ? 'correct' : 'wrong') : ''}`}>
                [A] {quizA}
              </button>
              <button onClick={() => handleQuizAnswer(1)} className={`btn-pixel-quiz ${selectedOption === 1 ? (correctIdx === 1 ? 'correct' : 'wrong') : ''}`}>
                [B] {quizB}
              </button>
              <button onClick={() => handleQuizAnswer(2)} className={`btn-pixel-quiz ${selectedOption === 2 ? (correctIdx === 2 ? 'correct' : 'wrong') : ''}`}>
                [C] {quizC}
              </button>
              <button onClick={() => handleQuizAnswer(3)} className={`btn-pixel-quiz ${selectedOption === 3 ? (correctIdx === 3 ? 'correct' : 'wrong') : ''}`}>
                [D] {quizD}
              </button>
            </div>

            {quizWrong && <p className="feedback-wrong-pixel mt-4">WRONG ANSWER! SHIELD DAMAGED! TRY AGAIN! ❌</p>}
            {quizSuccess && <p className="feedback-correct-pixel mt-4">SUCCESS! LOADING CONGRATULATIONS SCROLL... 🎉</p>}
          </div>
        </div>
      )}

      {/* 4. UNFOLDING VINTAGE PARCHMENT SCROLL (Phase 4) */}
      {showScroll && (
        <div className="scroll-modal-overlay-pixel" onClick={() => setShowScroll(false)}>
          <div className="scroll-wrapper-pixel animate-scrollUnroll" onClick={e => e.stopPropagation()}>
            <div className="scroll-wooden-rod top-rod" />
            <div className="scroll-body flex flex-col items-center">
              <h2 className="scroll-title font-mono tracking-widest text-[#78350f]">VICTORY SCROLL</h2>
              <h3 className="scroll-header mt-2 text-2xl font-black text-[#78350f] text-center">
                HAPPY BIRTHDAY, {data.targetName || "NAVYA"}!
              </h3>
              
              <div className="scroll-parchment-divider" />
              
              <div className="scroll-message-box">
                <pre className="scroll-text-pixel font-mono leading-relaxed text-[#451a03] whitespace-pre-wrap text-xs text-center">
                  {typedMessage}
                  {!isTypingComplete && <span className="typing-cursor-pixel">_</span>}
                </pre>
              </div>

              {isTypingComplete && (
                <div className="scroll-signature-pixel mt-6 flex flex-col items-center animate-fadeIn">
                  <span className="text-[8px] uppercase tracking-widest text-[#78350f]/60 font-bold">WITH LOVE,</span>
                  <span className="signature-font-pixel text-[#78350f] text-2xl font-bold mt-1">
                    {data.senderName || "WISHER"}
                  </span>
                </div>
              )}

              <button onClick={() => setShowScroll(false)} className="scroll-close-btn-pixel mt-6">
                CLOSE SCROLL
              </button>
            </div>
            <div className="scroll-wooden-rod bottom-rod" />
          </div>
        </div>
      )}

    </div>
  );
};

export default BirthdayPixelArcade;
