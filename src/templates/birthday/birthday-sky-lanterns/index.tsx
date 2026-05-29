import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import './style.css';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  flickerSpeed: number;
}

interface SkyLantern {
  id: number;
  x: number;
  y: number;
  targetX: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayOffset: number;
  alpha: number;
  flicker: number;
  photoIndex: number;
  isClicked: boolean;
}

interface Balloon {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  swaySpeed: number;
  swayOffset: number;
  isPopped: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  fadeSpeed: number;
}

type GamePhase = 'memories' | 'balloons' | 'quiz' | 'cake' | 'scroll';

export const BirthdaySkyLanterns: React.FC<TemplateProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Core sound synthesizer (Web Audio API for zero-request chimes)
  const synthAudioCtxRef = useRef<AudioContext | null>(null);

  const playChime = (type: 'spawn' | 'pop_lantern' | 'pop_balloon' | 'blow_candle' | 'success') => {
    try {
      if (!synthAudioCtxRef.current) {
        synthAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = synthAudioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;

      if (type === 'spawn') {
        // Soft high sine wave chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now); // E5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.35); // A5
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'pop_lantern') {
        // Magical ascending arpeggio sweep
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.08);
          gain.gain.setValueAtTime(0.05, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.3);
        });
      } else if (type === 'pop_balloon') {
        // High bubble pop sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'blow_candle') {
        // Soft breath wind whoosh noise + minor musical chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'success') {
        // High celestial victory shower
        const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.05);
          gain.gain.setValueAtTime(0.03, now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.05);
          osc.stop(now + i * 0.05 + 0.2);
        });
      }
    } catch (e) {
      console.warn("AudioContext failed:", e);
    }
  };

  // Narrative Flow States
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('memories');
  const [lanterns, setLanterns] = useState<SkyLantern[]>([]);
  
  // Phase 1: Memories Unlocked (need 5 unique clicks)
  const [uncoveredCount, setUncoveredCount] = useState<number>(0);
  const uncoveredSetRef = useRef<Set<number>>(new Set());
  
  // Phase 2: Popping 10 Balloons
  const [balloonsPopped, setBalloonsPopped] = useState<number>(0);
  
  // Phase 3: Quiz Selection
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizWrong, setQuizWrong] = useState<boolean>(false);
  const [quizSuccess, setQuizSuccess] = useState<boolean>(false);
  
  // Phase 4: CSS Cake Suspended by Lantern
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [cakeBlownOut, setCakeBlownOut] = useState<boolean>(false);
  const [showFinaleButton, setShowFinaleButton] = useState<boolean>(false);

  // Common interactive overlays
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [activeMemoryTitle, setActiveMemoryTitle] = useState<string>('');
  const [showScroll, setShowScroll] = useState<boolean>(false);
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  // Sparks and state references for canvas rendering
  const sparksRef = useRef<Spark[]>([]);
  const lanternsStateRef = useRef<SkyLantern[]>([]);
  const balloonsStateRef = useRef<Balloon[]>([]);
  const nextLanternIdRef = useRef<number>(1);
  const nextBalloonIdRef = useRef<number>(1);
  const phaseRef = useRef<GamePhase>('memories');

  useEffect(() => {
    phaseRef.current = currentPhase;
  }, [currentPhase]);

  // Backing audio soundtrack initialization
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

  // Mapped photo fallbacks
  const PHOTO_FALLBACKS = [
    data.photo1 || "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=80",
    data.photo2 || "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    data.photo3 || "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80",
    data.photo4 || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    data.photo5 || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    data.photo6 || "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=600&q=80"
  ];

  const MEMORY_TITLES = [
    "Magic Moments ✨",
    "Special Memories 🌸",
    "Infinite Laughter 😂",
    "Warm Hugs & Joy 🤗",
    "A Beautiful Day ☀️",
    "Best Memories Together ❤️"
  ];

  // Confetti particles generator
  const triggerConfetti = (intensity = 0.3) => {
    import('canvas-confetti').then((m) => {
      const confetti = m.default;
      confetti({
        particleCount: Math.floor(intensity * 120),
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#ffd700', '#fbbf24', '#fef3c7', '#ffffff', '#ec4899', '#f43f5e']
      });
    });
  };

  const triggerDoubleConfetti = () => {
    import('canvas-confetti').then((m) => {
      const confetti = m.default;
      const end = Date.now() + 2 * 1000;
      const colors = ['#f59e0b', '#fbbf24', '#fef3c7', '#ffffff', '#ec4899'];
      const frame = () => {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    });
  };

  // Helper to spawn a new sky lantern manually
  const spawnLantern = (x: number, y: number) => {
    startMusic();
    playChime('spawn');
    const id = nextLanternIdRef.current++;
    const photoIndex = Math.floor(Math.random() * PHOTO_FALLBACKS.length);
    const newLantern: SkyLantern = {
      id,
      x,
      y,
      targetX: x,
      size: 30 + Math.random() * 20,
      speedY: -(0.5 + Math.random() * 0.7),
      swaySpeed: 0.01 + Math.random() * 0.015,
      swayOffset: Math.random() * Math.PI * 2,
      alpha: 1,
      flicker: Math.random(),
      photoIndex,
      isClicked: false
    };

    setLanterns(prev => [...prev, newLantern]);
    lanternsStateRef.current.push(newLantern);
  };

  // Trigger phase 2 balloons populating
  const spawnBalloonsBatch = (width: number, height: number) => {
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#a855f7', '#f59e0b', '#ec4899'];
    const list: Balloon[] = [];
    for (let i = 0; i < 15; i++) {
      const bx = 50 + Math.random() * (width - 100);
      const by = height + 100 + Math.random() * 500; // staggered below bottom
      list.push({
        id: nextBalloonIdRef.current++,
        x: bx,
        y: by,
        size: 30 + Math.random() * 15,
        color: colors[i % colors.length],
        speedY: -(1.4 + Math.random() * 1.2), // float up slightly faster
        swaySpeed: 0.01 + Math.random() * 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        isPopped: false
      });
    }
    balloonsStateRef.current = list;
  };

  // Handle general screen clicks (releases lanterns or pops balloons/lanterns)
  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    startMusic();

    // 1. POPPING BALLOONS PHASE (Phase 2)
    if (currentPhase === 'balloons') {
      let clickedBalloon = false;
      const updatedBalloons = balloonsStateRef.current.map(b => {
        const dist = Math.hypot(b.x - clickX, b.y - clickY);
        // balloon hit box ellipse-friendly bounds
        if (dist < b.size + 15 && !b.isPopped) {
          clickedBalloon = true;
          playChime('pop_balloon');
          
          // Pop Sparks
          for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 3.5;
            sparksRef.current.push({
              x: b.x,
              y: b.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              alpha: 1,
              color: b.color
            });
          }

          setBalloonsPopped(prev => {
            const next = prev + 1;
            if (next >= 10) {
              // Transition to Phase 3: Trivia Quiz after 1.5 seconds!
              setTimeout(() => {
                setCurrentPhase('quiz');
                playChime('success');
                triggerConfetti(0.3);
              }, 1200);
            }
            return next;
          });

          triggerConfetti(0.12);
          return { ...b, isPopped: true };
        }
        return b;
      });

      if (clickedBalloon) {
        balloonsStateRef.current = updatedBalloons.filter(b => !b.isPopped);
        return;
      }
    }

    // 2. POPPING LANTERNS MEMORIES PHASE (Phase 1)
    if (currentPhase === 'memories') {
      let clickedLantern = false;
      const updatedLanterns = lanternsStateRef.current.map(l => {
        const dist = Math.hypot(l.x - clickX, l.y - clickY);
        if (dist < l.size + 15 && !l.isClicked) {
          clickedLantern = true;
          playChime('pop_lantern');
          
          // Spawn golden sparks
          for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            sparksRef.current.push({
              x: l.x,
              y: l.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              alpha: 1,
              color: `rgba(255, ${200 + Math.floor(Math.random() * 55)}, 60, 0.8)`
            });
          }

          // Uncover Polaroid snapshot
          setActivePhoto(PHOTO_FALLBACKS[l.photoIndex]);
          setActiveMemoryTitle(MEMORY_TITLES[l.photoIndex]);
          triggerConfetti(0.12);

          // Update unique uncovered count
          uncoveredSetRef.current.add(l.photoIndex);
          const currentSize = uncoveredSetRef.current.size;
          setUncoveredCount(currentSize);
          if (currentSize >= 5) {
            // Unlock Phase 2 (Balloons)
            setTimeout(() => {
              setCurrentPhase('balloons');
              playChime('success');
              const canvas = canvasRef.current;
              if (canvas) spawnBalloonsBatch(canvas.width, canvas.height);
              triggerDoubleConfetti();
            }, 2000);
          }

          return { ...l, isClicked: true };
        }
        return l;
      });

      if (clickedLantern) {
        lanternsStateRef.current = updatedLanterns.filter(l => !l.isClicked);
        setLanterns(lanternsStateRef.current);
        return;
      }
    }

    // Spawn a regular sky lantern if not hitting elements
    if (currentPhase === 'memories' || currentPhase === 'scroll') {
      spawnLantern(clickX, clickY);
    }
  };

  // Canvas loop rendering core animation frames
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

    // Build twinkling starry background
    const stars: Star[] = Array.from({ length: 90 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.75,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random(),
      flickerSpeed: 0.004 + Math.random() * 0.008
    }));

    const meteors: Meteor[] = [];

    // Prepopulate background lanterns for initial visual beauty
    if (lanternsStateRef.current.length === 0) {
      for (let i = 0; i < 7; i++) {
        const lx = Math.random() * width;
        const ly = height - Math.random() * height * 0.6;
        const size = 15 + Math.random() * 15;
        const id = nextLanternIdRef.current++;
        const photoIndex = Math.floor(Math.random() * PHOTO_FALLBACKS.length);
        const l: SkyLantern = {
          id,
          x: lx,
          y: ly,
          targetX: lx,
          size,
          speedY: -(0.25 + Math.random() * 0.35),
          swaySpeed: 0.005 + Math.random() * 0.01,
          swayOffset: Math.random() * Math.PI * 2,
          alpha: 0.6 + Math.random() * 0.4,
          flicker: Math.random(),
          photoIndex,
          isClicked: false
        };
        lanternsStateRef.current.push(l);
      }
      setLanterns([...lanternsStateRef.current]);
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Star Particles
      stars.forEach(s => {
        s.alpha += s.flickerSpeed;
        if (s.alpha > 1 || s.alpha < 0.2) {
          s.flickerSpeed = -s.flickerSpeed;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 1b. Spawns and Draws Meteors (Shooting Stars)
      if (Math.random() < 0.008 && meteors.length < 3) {
        meteors.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.3,
          length: 80 + Math.random() * 120,
          speed: 8 + Math.random() * 12,
          angle: Math.PI / 6 + Math.random() * (Math.PI / 12), // downwards diagonal sweep
          alpha: 1,
          fadeSpeed: 0.015 + Math.random() * 0.015
        });
      }

      meteors.forEach((m) => {
        // calculate endpoint of the streak
        const endX = m.x - Math.cos(m.angle) * m.length;
        const endY = m.y - Math.sin(m.angle) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, endX, endY);
        grad.addColorStop(0, `rgba(255, 243, 199, ${m.alpha})`);
        grad.addColorStop(0.4, `rgba(251, 191, 36, ${m.alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 + Math.random() * 1;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Move meteor
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= m.fadeSpeed;
      });

      // Filter faded meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        if (meteors[i].alpha <= 0 || meteors[i].x > width || meteors[i].y > height) {
          meteors.splice(i, 1);
        }
      }

      // 2. Draw Sky Lanterns
      lanternsStateRef.current.forEach((l) => {
        l.y += l.speedY;
        l.x = l.targetX + Math.sin(l.y * l.swaySpeed + l.swayOffset) * 20;
        l.flicker += 0.05;

        const lightFlicker = 0.85 + Math.sin(l.flicker) * 0.15;
        if (l.y < height * 0.25) {
          l.alpha -= 0.003;
        }

        // Ambient glow
        const glowRad = l.size * 2.5;
        const grad = ctx.createRadialGradient(l.x, l.y, l.size * 0.2, l.x, l.y, glowRad);
        grad.addColorStop(0, `rgba(255, 220, 100, ${l.alpha * lightFlicker * 0.8})`);
        grad.addColorStop(0.3, `rgba(255, 140, 0, ${l.alpha * lightFlicker * 0.45})`);
        grad.addColorStop(1, 'rgba(255, 100, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(l.x, l.y, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Lantern shape
        ctx.fillStyle = `rgba(255, 240, 200, ${l.alpha})`;
        ctx.strokeStyle = `rgba(255, 120, 0, ${l.alpha * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(l.x - l.size * 0.6, l.y + l.size * 0.5);
        ctx.quadraticCurveTo(l.x - l.size * 0.8, l.y - l.size * 0.4, l.x - l.size * 0.5, l.y - l.size * 0.7);
        ctx.lineTo(l.x + l.size * 0.5, l.y - l.size * 0.7);
        ctx.quadraticCurveTo(l.x + l.size * 0.8, l.y - l.size * 0.4, l.x + l.size * 0.6, l.y + l.size * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Lantern tassel
        ctx.strokeStyle = `rgba(220, 38, 38, ${l.alpha * 0.8})`;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y + l.size * 0.5);
        ctx.lineTo(l.x, l.y + l.size * 0.8);
        ctx.stroke();
      });
      lanternsStateRef.current = lanternsStateRef.current.filter(l => l.y > -l.size && l.alpha > 0.05);

      // 3. Draw Floating Balloons (Phase 2)
      if (phaseRef.current === 'balloons') {
        balloonsStateRef.current.forEach((b) => {
          b.y += b.speedY;
          b.x += Math.sin(b.y * b.swaySpeed + b.swayOffset) * 1.5;

          // Draw colorful ellipse balloon
          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.ellipse(b.x, b.y, b.size * 0.85, b.size, 0, 0, Math.PI * 2);
          ctx.fill();

          // Knot
          ctx.beginPath();
          ctx.moveTo(b.x, b.y + b.size);
          ctx.lineTo(b.x - 5, b.y + b.size + 7);
          ctx.lineTo(b.x + 5, b.y + b.size + 7);
          ctx.closePath();
          ctx.fillStyle = b.color;
          ctx.fill();

          // String
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(b.x, b.y + b.size + 7);
          ctx.quadraticCurveTo(b.x + Math.sin(b.y / 15) * 6, b.y + b.size + 22, b.x, b.y + b.size + 38);
          ctx.stroke();
        });

        // Filter and regenerate popped/offscreen balloons if needed during Phase 2
        balloonsStateRef.current = balloonsStateRef.current.filter(b => b.y > -b.size && !b.isPopped);
        if (balloonsStateRef.current.length < 5 && balloonsPopped < 10) {
          // Spawn a couple more to keep it fun
          const colors = ['#f43f5e', '#3b82f6', '#10b981', '#a855f7', '#f59e0b', '#ec4899'];
          balloonsStateRef.current.push({
            id: nextBalloonIdRef.current++,
            x: Math.random() * width,
            y: height + 50,
            size: 30 + Math.random() * 15,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: -(1.3 + Math.random() * 1),
            swaySpeed: 0.01,
            swayOffset: Math.random() * Math.PI * 2,
            isPopped: false
          });
        }
      }

      // 4. Draw Sparks animations
      sparksRef.current.forEach((sp) => {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.04; // gravity
        sp.alpha -= 0.015;

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      sparksRef.current = sparksRef.current.filter(sp => sp.alpha > 0);

      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [currentPhase, balloonsPopped]);

  // Trivia Quiz validation
  const quizQuestion = data.quizQ1 || "What makes the birthday star happiest?";
  const quizA = data.quizA1a || "Pink Balloons 💗";
  const quizB = data.quizA1b || "Golden Sky Lanterns 🏮";
  const quizC = data.quizA1c || "Delicious Birthday Cake 🎂";
  const quizD = data.quizA1d || "Being with premium friends 🥰";
  const correctIdx = data.quizA1correct !== undefined ? data.quizA1correct : 2;

  const handleQuizAnswer = (idx: number) => {
    setSelectedQuizOption(idx);
    if (idx === correctIdx) {
      setQuizWrong(false);
      setQuizSuccess(true);
      playChime('success');
      triggerConfetti(0.4);
      setTimeout(() => {
        // Transition to Phase 4 (Cake carried by sky lantern!)
        setCurrentPhase('cake');
      }, 1500);
    } else {
      setQuizWrong(true);
      setTimeout(() => setQuizWrong(false), 600); // end shake animation
    }
  };

  // Candle blowing logic for Phase 4 CSS cake
  const handleBlowCandle = (idx: number) => {
    if (cakeBlownOut) return;
    const nextLit = [...candlesLit];
    nextLit[idx] = false;
    setCandlesLit(nextLit);
    playChime('blow_candle');

    import('canvas-confetti').then((m) => {
      m.default({ particleCount: 15, spread: 35, origin: { y: 0.6 } });
    });

    if (nextLit.every(v => !v)) {
      setCakeBlownOut(true);
      playChime('success');
      triggerDoubleConfetti();
      setTimeout(() => {
        setShowFinaleButton(true);
      }, 1200);
    }
  };

  // Cursive scroll typewriter text animation
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
        triggerDoubleConfetti();
      }
    }, 35);

    return () => clearInterval(interval);
  }, [showScroll, fullMessage]);

  const handleOpenScroll = () => {
    setShowScroll(true);
  };

  const handleCloseScroll = () => {
    setShowScroll(false);
  };

  return (
    <div className="sky-lanterns-root font-sans" onClick={handleScreenClick}>
      {/* Background Animated Sky Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* HORIZON LANDSCAPE SILHOUETTE (Artsy SVG layers replacing Imgur blur placeholders) */}
      <div className="clouds-layer select-none pointer-events-none">
        <svg viewBox="0 0 1440 320" className="w-full h-full absolute bottom-0 left-0" preserveAspectRatio="none">
          {/* Back mountains layer */}
          <path 
            fill="rgba(8, 16, 36, 0.85)" 
            d="M0,224L60,218.7C120,213,240,203,360,192C480,181,600,171,720,181C840,192,960,224,1080,224C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
          {/* Front mountains layer */}
          <path 
            fill="#030611" 
            d="M0,288L80,277.3C160,267,320,245,480,240C640,235,800,245,960,256C1120,267,1280,277,1360,282.7L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>

      {/* 1. MUSIC CONTROL BUTTON */}
      <button 
        onClick={toggleMusic}
        className="music-toggle-btn z-40"
        aria-label="Toggle backing music"
      >
        {isPlaying ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-amber-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>

      {/* 2. GLOWING SILVER CRESCENT MOON (SCROLL INITIATOR - ALWAYS CLICKS TO PREVIEW MESSAGE) */}
      <div 
        className="crescent-moon-trigger select-none" 
        onClick={handleOpenScroll}
        title="Tap to reveal wishing scroll"
      >
        <div className="moon-glow" />
        <div className="moon-body" />
      </div>

      {/* 3. ACTIVE QUEST DIRECTIVE OVERLAY */}
      <div className="tap-instruction-overlay">
        
        {/* Phase 1: Uncover Memories */}
        {currentPhase === 'memories' && (
          <>
            <p className="instruction-main animate-pulse">
              🏮 Release and pop 5 sky lanterns to uncover memories! 🏮
            </p>
            <p className="instruction-sub">
              Memories Uncovered: {uncoveredCount} / 5
            </p>
          </>
        )}

        {/* Phase 2: Pop Balloons */}
        {currentPhase === 'balloons' && (
          <>
            <p className="instruction-main animate-pulse text-pink-300">
              🎈 Pop 10 floating balloons rising in the sky! 🎈
            </p>
            <p className="instruction-sub text-pink-100">
              Balloons Popped: {balloonsPopped} / 10
            </p>
          </>
        )}

        {/* Phase 3: Trivia Quiz */}
        {currentPhase === 'quiz' && (
          <>
            <p className="instruction-main animate-pulse text-amber-300">
              🧠 Answer the Trivia Quiz to unlock the Birthday Cake! 🧠
            </p>
            <p className="instruction-sub">
              Tap the correct option inside the popup card.
            </p>
          </>
        )}

        {/* Phase 4: CSS Cake Suspended by Lantern */}
        {currentPhase === 'cake' && (
          <>
            <p className="instruction-main animate-pulse text-yellow-300">
              🎂 Tap the cake flames to blow out candles and make a wish! 🎂
            </p>
            <p className="instruction-sub">
              {cakeBlownOut ? "🎂 Blow complete! Make your secret wish! 🎂" : "3 Candles are glowing suspended in the sky..."}
            </p>
          </>
        )}

        {/* Phase 5: Cursive scroll */}
        {currentPhase === 'scroll' && (
          <>
            <p className="instruction-main animate-pulse">
              ✨ Happy Birthday! The sky celebration is yours! ✨
            </p>
            <p className="instruction-sub">
              Tap anywhere to release more lanterns, or click the moon.
            </p>
          </>
        )}
      </div>

      {/* Floating active lanterns counter indicator */}
      <div className="active-lanterns-counter select-none">
        🏮 Active: {lanterns.length}
      </div>

      {/* 4. TRIVIA QUIZ SCREEN OVERLAY (Phase 3) */}
      {currentPhase === 'quiz' && (
        <div className="quiz-modal-overlay" onClick={e => e.stopPropagation()}>
          <div className={`quiz-card glassmorphism ${quizWrong ? 'animate-shake' : ''}`}>
            <h3 className="quiz-title font-serif">Birthday Trivia Challenge 🧠</h3>
            <p className="quiz-question font-semibold">{quizQuestion}</p>
            
            <div className="quiz-options">
              <button onClick={() => handleQuizAnswer(0)} className={`btn-quiz ${selectedQuizOption === 0 ? (correctIdx === 0 ? 'correct' : 'wrong') : ''}`}>
                A. {quizA}
              </button>
              <button onClick={() => handleQuizAnswer(1)} className={`btn-quiz ${selectedQuizOption === 1 ? (correctIdx === 1 ? 'correct' : 'wrong') : ''}`}>
                B. {quizB}
              </button>
              <button onClick={() => handleQuizAnswer(2)} className={`btn-quiz ${selectedQuizOption === 2 ? (correctIdx === 2 ? 'correct' : 'wrong') : ''}`}>
                C. {quizC}
              </button>
              <button onClick={() => handleQuizAnswer(3)} className={`btn-quiz ${selectedQuizOption === 3 ? (correctIdx === 3 ? 'correct' : 'wrong') : ''}`}>
                D. {quizD}
              </button>
            </div>
            
            {quizWrong && <p className="quiz-feedback-wrong animate-fadeIn">Oops! That's incorrect... Try again! 🤔</p>}
            {quizSuccess && <p className="quiz-feedback-correct animate-fadeIn">🎉 Brilliant! Unlocking the Giant Cake Lantern! 🎉</p>}
          </div>
        </div>
      )}

      {/* 5. DYNAMIC INTERACTIVE CAKE SUSPENDED BY GIANT LANTERN (Phase 4) */}
      {currentPhase === 'cake' && (
        <div className="cake-phase-overlay" onClick={e => e.stopPropagation()}>
          <div className="cake-lantern-group animate-floatCake">
            
            {/* Giant Sky Lantern carrying the cake */}
            <div className="giant-sky-lantern">
              <div className="lantern-crown" />
              <div className="lantern-glow-inner" />
            </div>

            {/* Suspended Ropes */}
            <div className="rope-left" />
            <div className="rope-right" />

            {/* Interactive lit CSS Birthday Cake */}
            <div className="cake-wrapper">
              
              {/* 3 Candles positioned on top layer */}
              {candlesLit[0] && (
                <div className="candle" style={{ left: '33%' }} onClick={() => handleBlowCandle(0)}>
                  <div className="flame" />
                </div>
              )}
              {candlesLit[1] && (
                <div className="candle" style={{ left: '50%' }} onClick={() => handleBlowCandle(1)}>
                  <div className="flame" />
                </div>
              )}
              {candlesLit[2] && (
                <div className="candle" style={{ left: '67%' }} onClick={() => handleBlowCandle(2)}>
                  <div className="flame" />
                </div>
              )}

              {/* Cake layers */}
              <div className="cake-tier cake-tier-3">
                <div className="drip" style={{ backgroundColor: '#d97706', height: '6px' }} />
              </div>
              <div className="cake-tier cake-tier-2">
                <div className="drip" style={{ backgroundColor: '#b45309', height: '8px' }} />
              </div>
              <div className="cake-tier cake-tier-1">
                <div className="drip" style={{ backgroundColor: '#d97706', height: '10px' }} />
              </div>
              
              <div className="cake-base" />
            </div>
            
            <p className="cake-hover-prompt animate-pulse">
              {cakeBlownOut ? "🕯️ All Candles Blown! 🕯️" : "🕯️ Click on each candle flame to blow it out! 🕯️"}
            </p>

            {showFinaleButton && (
              <button 
                onClick={() => {
                  setCurrentPhase('scroll');
                  setShowScroll(true);
                }}
                className="btn-primary animate-fadeIn mt-6"
              >
                Read Birthday Wishes 💌
              </button>
            )}
          </div>
        </div>
      )}

      {/* 6. VINTAGE MAGIC UNFOLDING SCROLL MODAL */}
      {showScroll && (
        <div className="scroll-modal-overlay" onClick={handleCloseScroll}>
          <div className="scroll-wrapper animate-scrollUnroll" onClick={e => e.stopPropagation()}>
            
            {/* Scroll wood handles */}
            <div className="scroll-wooden-rod top-rod" />
            
            {/* Scroll Parchment Body */}
            <div className="scroll-body flex flex-col items-center">
              <h2 className="scroll-title font-serif">A Celestial Greeting</h2>
              
              <h3 className="scroll-header font-serif text-amber-900 mt-2 text-2xl font-black text-center">
                Happy Birthday, {data.targetName || "Navya"}!
              </h3>

              <div className="scroll-parchment-divider" />
              
              <div className="scroll-message-box">
                <pre className="scroll-text font-serif leading-relaxed text-amber-950/90 whitespace-pre-wrap text-sm">
                  {typedMessage}
                  {!isTypingComplete && <span className="typing-cursor">|</span>}
                </pre>
              </div>

              {isTypingComplete && (
                <div className="scroll-signature animate-fadeIn mt-6 flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-widest text-amber-800/60 font-bold">With Love,</span>
                  <span className="signature-font font-serif text-amber-900 text-3xl font-bold mt-1">
                    {data.senderName || "Wisher"}
                  </span>
                </div>
              )}

              <button 
                onClick={handleCloseScroll}
                className="scroll-close-btn font-serif mt-6"
              >
                Close Scroll
              </button>
            </div>
            
            <div className="scroll-wooden-rod bottom-rod" />
          </div>
        </div>
      )}

      {/* 7. MODULAR POLAROID SURPRISE POPUP */}
      {activePhoto && (
        <div className="polaroid-modal-overlay" onClick={() => setActivePhoto(null)}>
          <div className="polaroid-popup-card animate-popIn" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 text-amber-900/50 hover:text-amber-900 text-lg font-bold p-1 cursor-pointer"
              onClick={() => setActivePhoto(null)}
            >
              ✕
            </button>
            <div className="polaroid-glow-frame">
              <img src={activePhoto} alt="Memory Snapshot" className="polaroid-photo select-none" />
              <div className="polaroid-footer text-center mt-3">
                <span className="memory-caption font-serif text-amber-900 font-bold text-sm">
                  {activeMemoryTitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BirthdaySkyLanterns;
