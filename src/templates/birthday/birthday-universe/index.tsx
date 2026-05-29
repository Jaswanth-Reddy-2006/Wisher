import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { TemplateProps } from '../../types';
import { fireConfetti } from '../../common/CanvasConfetti';
import { Heart, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Default fallback images ── */
const FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
];

const FALLBACK_HERO = "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80";

/* ── Helper: Build quiz questions from data ── */
function buildQuiz(data: TemplateProps['data']) {
  const questions = [];
  if (data.quizQ1) {
    questions.push({
      question: data.quizQ1,
      answers: [data.quizA1a || 'A', data.quizA1b || 'B', data.quizA1c || 'C', data.quizA1d || 'D'],
      correct: data.quizA1correct ?? 0
    });
  }
  if (data.quizQ2) {
    questions.push({
      question: data.quizQ2,
      answers: [data.quizA2a || 'A', data.quizA2b || 'B', data.quizA2c || 'C', data.quizA2d || 'D'],
      correct: data.quizA2correct ?? 0
    });
  }
  if (data.quizQ3) {
    questions.push({
      question: data.quizQ3,
      answers: [data.quizA3a || 'A', data.quizA3b || 'B', data.quizA3c || 'C', data.quizA3d || 'D'],
      correct: data.quizA3correct ?? 0
    });
  }
  return questions;
}

export const BirthdayUniverse: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [introStep, setIntroStep] = useState(0);

  // Interaction States
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState<boolean[]>([false, false, false, false, false]);
  const [giftBoxOpen, setGiftBoxOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Quiz states
  const [quizStep, setQuizStep] = useState(0); // 0 = not started, 1-3 = question index, 4 = results
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([null, null, null]);
  const [quizRevealed, setQuizRevealed] = useState<boolean[]>([false, false, false]);

  // References
  const starCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lanternsCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const journeyContainerRef = useRef<HTMLDivElement | null>(null);
  const journeyScrollRef = useRef<HTMLDivElement | null>(null);
  const galleryScrollRef = useRef<HTMLDivElement | null>(null);

  // Gallery Drag to Scroll State
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

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
    const walk = (x - startXRef.current) * 1.5; // scroll speed multiplier
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const primaryColor = data.primaryColor || '#ffb6c1';
  const musicUrl = data.musicUrl || '';
  const heroImage = data.bgImage || FALLBACK_HERO;
  const photos = [
    data.photo1 || FALLBACK_PHOTOS[0],
    data.photo2 || FALLBACK_PHOTOS[1],
    data.photo3 || FALLBACK_PHOTOS[2],
    data.photo4 || FALLBACK_PHOTOS[3],
  ];
  const quizQuestions = buildQuiz(data);

  // ── Intro steps delays ──
  useEffect(() => {
    if (isPreview) {
      setHasEntered(true);
      return;
    }
    const timer1 = setTimeout(() => setIntroStep(1), 1200);
    const timer2 = setTimeout(() => setIntroStep(2), 2400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isPreview]);

  // ── BGM audio controls ──
  useEffect(() => {
    if (hasEntered && !isPreview && musicUrl) {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      audio.volume = 0.5;
      audio.play().then(() => {
        setIsPlayingAudio(true);
      }).catch((e) => {
        console.warn('Audio auto-play blocked by browser.', e);
      });
      audioRef.current = audio;
      return () => {
        audio.pause();
        audioRef.current = null;
      };
    }
  }, [hasEntered, isPreview, musicUrl]);

  // ── Section reveal on scroll ──
  useEffect(() => {
    if (!hasEntered) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [hasEntered]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play();
        setIsPlayingAudio(true);
      }
    }
  };

  const handleEnter = () => {
    setHasEntered(true);
  };

  // ── 1. Starfield Galaxy Background ──
  useEffect(() => {
    const canvas = starCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.08;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.08;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const stars: Array<{
      x: number; y: number; z: number; px: number; py: number;
      size: number; color: string; speed: number; angle: number;
    }> = [];

    const colors = ['#ffffff', '#fbcfe8', '#e0f2fe', '#fed7aa', '#fef3c7', '#f0abfc'];

    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        px: 0, py: 0,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2
      });
    }

    const draw = () => {
      ctx.fillStyle = '#030014';
      ctx.fillRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Galaxy dust glow
      ctx.save();
      ctx.translate(width / 2 + mouseX * 0.5, height / 2 + mouseY * 0.5);
      const spiralGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.4);
      spiralGradient.addColorStop(0, 'rgba(139, 92, 246, 0.08)');
      spiralGradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.04)');
      spiralGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spiralGradient;
      ctx.beginPath();
      ctx.arc(0, 0, width * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      stars.forEach((s) => {
        s.z -= s.speed;
        if (s.z <= 0) {
          s.z = width;
          s.x = Math.random() * width - width / 2;
          s.y = Math.random() * height - height / 2;
        }
        const k = 128.0 / s.z;
        const px = s.x * k + width / 2 + mouseX;
        const py = s.y * k + height / 2 + mouseY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const r = s.size * (1 - s.z / width) * 2;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = Math.min(1, (1 - s.z / width) * 1.5);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // ── 2. Floating Sky Lanterns ──
  useEffect(() => {
    if (!hasEntered) return;
    const canvas = lanternsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const lanterns: Array<{
      x: number; y: number; width: number; height: number;
      speedY: number; sway: number; swaySpeed: number; opacity: number;
    }> = [];

    for (let i = 0; i < 20; i++) {
      lanterns.push({
        x: Math.random() * width,
        y: height + Math.random() * height,
        width: Math.random() * 12 + 10,
        height: Math.random() * 16 + 14,
        speedY: -(Math.random() * 0.6 + 0.4),
        sway: Math.random() * Math.PI,
        swaySpeed: Math.random() * 0.02 + 0.01,
        opacity: Math.random() * 0.5 + 0.4
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      lanterns.forEach((l) => {
        l.y += l.speedY;
        l.sway += l.swaySpeed;
        const xOffset = Math.sin(l.sway) * 1.5;

        if (l.y < -30) {
          l.y = height + 30;
          l.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(l.x + xOffset, l.y);
        ctx.globalAlpha = l.opacity;

        const lanternGlow = ctx.createLinearGradient(0, 0, 0, l.height);
        lanternGlow.addColorStop(0, '#f97316');
        lanternGlow.addColorStop(0.5, '#ea580c');
        lanternGlow.addColorStop(1, '#fef08a');

        ctx.fillStyle = lanternGlow;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(l.width / 2, -4, l.width, 0);
        ctx.lineTo(l.width * 0.85, l.height);
        ctx.lineTo(l.width * 0.15, l.height);
        ctx.closePath();
        ctx.fill();

        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 15;
        ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
        ctx.beginPath();
        ctx.arc(l.width / 2, l.height * 0.8, l.width * 0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [hasEntered]);

  // ── 3. GSAP Horizontal Journey Scroll ──
  useEffect(() => {
    if (!hasEntered) return;
    const scrollContainer = journeyContainerRef.current;
    const scrollStrip = journeyScrollRef.current;
    if (!scrollContainer || !scrollStrip) return;

    const ctx = gsap.context(() => {
      gsap.to(scrollStrip, {
        x: () => -(scrollStrip.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: scrollContainer,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: !0
        }
      });
    });

    return () => ctx.revert();
  }, [hasEntered]);

  // ── 4. Periodic Confetti ──
  useEffect(() => {
    if (!hasEntered) return;
    const interval = setInterval(() => {
      fireConfetti(primaryColor);
    }, 6000);
    return () => clearInterval(interval);
  }, [hasEntered, primaryColor]);

  // ── Candle blowing ──
  const blowCandle = (idx: number) => {
    if (candlesBlown[idx]) return;
    const next = [...candlesBlown];
    next[idx] = true;
    setCandlesBlown(next);
    fireConfetti(primaryColor);

    if (next.every((c) => c)) {
      setTimeout(() => {
        fireConfetti('#ffd700');
        setTimeout(() => fireConfetti('#60a5fa'), 200);
        setTimeout(() => fireConfetti('#f472b6'), 400);
      }, 500);
    }
  };

  const openGiftBox = () => {
    if (giftBoxOpen) return;
    setGiftBoxOpen(true);
    fireConfetti('#f43f5e');
    setTimeout(() => fireConfetti('#a78bfa'), 250);
  };

  // ── Quiz logic ──
  const handleQuizAnswer = useCallback((questionIdx: number, answerIdx: number) => {
    if (quizRevealed[questionIdx]) return;
    const newAnswers = [...quizAnswers];
    newAnswers[questionIdx] = answerIdx;
    setQuizAnswers(newAnswers);

    const newRevealed = [...quizRevealed];
    newRevealed[questionIdx] = true;
    setQuizRevealed(newRevealed);

    if (answerIdx === quizQuestions[questionIdx].correct) {
      fireConfetti('#22c55e');
    }

    // Auto advance after reveal
    setTimeout(() => {
      if (questionIdx < quizQuestions.length - 1) {
        setQuizStep(questionIdx + 2); // move to next question
      } else {
        setQuizStep(quizQuestions.length + 1); // show results
        // If all correct, big celebration
        const allCorrect = newAnswers.every((a, i) => a === quizQuestions[i]?.correct);
        if (allCorrect) {
          setTimeout(() => {
            fireConfetti('#ffd700');
            setTimeout(() => fireConfetti('#f472b6'), 200);
            setTimeout(() => fireConfetti('#8b5cf6'), 400);
          }, 300);
        }
      }
    }, 1500);
  }, [quizAnswers, quizRevealed, quizQuestions]);

  const quizScore = quizAnswers.filter((a, i) => a === quizQuestions[i]?.correct).length;

  // Journey items
  const journeyItems = [
    { year: "The Beginning", title: "First Met", desc: "The moment the stars aligned and the universe shifted.", image: photos[0] },
    { year: "Adventures", title: "Shared Dreams", desc: "Climbing hills, walking along coastlines, laughing in the rain.", image: photos[1] },
    { year: "Sweet Moments", title: "Endless Smiles", desc: "Late night talks, cozy movies, and your radiant laugh.", image: photos[2] },
    { year: "Our Future", title: "Together Forever", desc: "To many more chapters, stars, and beautiful years.", image: photos[3] }
  ];

  return (
    <div className={`universe-viewport ${hasEntered ? 'scrollable' : ''}`}>
      {/* BACKGROUND STARFIELD CANVAS */}
      <canvas ref={starCanvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />

      {/* AUDIO TOGGLE */}
      {hasEntered && !isPreview && musicUrl && (
        <button
          onClick={toggleAudio}
          className="fixed top-6 right-6 z-50 bg-black/40 border border-white/20 backdrop-blur-md p-3.5 rounded-full text-white cursor-pointer hover:bg-black/60 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          {isPlayingAudio ? <Volume2 className="h-5 w-5 text-pink-300 animate-pulse" /> : <VolumeX className="h-5 w-5" />}
        </button>
      )}

      {/* INTRO SCREEN */}
      {!hasEntered && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent pointer-events-auto">
          <div className="z-10 text-center flex flex-col items-center px-4 max-w-2xl">
            {/* Floating sparkle decorations */}
            <div className="absolute top-20 left-10 text-2xl animate-float opacity-50 select-none" style={{ animationDelay: '0s' }}>✨</div>
            <div className="absolute top-32 right-14 text-xl animate-float opacity-40 select-none" style={{ animationDelay: '1s' }}>💫</div>
            <div className="absolute bottom-40 left-20 text-xl animate-float opacity-30 select-none" style={{ animationDelay: '2s' }}>🌟</div>

            <Heart className="h-12 w-12 text-pink-400 mb-6 animate-heartBeat" />

            <h1
              className="text-4xl md:text-7xl font-serif text-white mb-6 select-none"
              style={{ textShadow: '0 0 25px rgba(255, 182, 193, 0.7)' }}
            >
              Happy Birthday, {data.targetName || 'Preethi'}! ❤️
            </h1>

            {introStep >= 1 && (
              <p className="text-xl md:text-3xl text-pink-200/90 font-serif italic text-glow drop-shadow-md select-none animate-fadeIn">
                A small universe made only for you...
              </p>
            )}

            {introStep >= 2 && (
              <button
                onClick={handleEnter}
                className="mt-14 px-9 py-3.5 rounded-full border-2 border-pink-400 text-white font-bold uppercase tracking-[0.25em] text-xs hover:bg-pink-400/20 transition-all bg-pink-400/10 backdrop-blur-md cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-bounce"
              >
                ✨ Enter Universe
              </button>
            )}
          </div>
        </div>
      )}

      {/* MAIN UNIVERSE SECTIONS */}
      {hasEntered && (
        <div className="w-full relative z-10 flex flex-col items-center bg-transparent">

          {/* ═══════════════ SECTION 1: GREETING CARD ═══════════════ */}
          <section className="min-h-[90vh] w-full flex items-center justify-center px-4 pt-20 section-reveal visible">
            <div className="max-w-3xl w-full glassmorphic-card p-10 md:p-16 rounded-3xl text-center space-y-6 md:space-y-8 shadow-[0_0_30px_rgba(255,182,193,0.15)] border border-pink-300/10">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-pink-400 block animate-pulse">
                ✨ Cosmic Alignment Event ✨
              </span>
              <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tight leading-tight">
                {data.title || "Happy Birthday!"}
              </h2>
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto" />
              <p className="text-lg md:text-2xl font-serif text-slate-300 leading-relaxed italic max-w-xl mx-auto">
                "{data.message}"
              </p>
              <div className="pt-4 text-xs font-bold uppercase tracking-widest text-slate-500 animate-bounce">
                Scroll Down to Wander ↓
              </div>
            </div>
          </section>

          {/* ═══════════════ SECTION 2: HERO IMAGE ═══════════════ */}
          <section className="w-full flex flex-col items-center justify-center px-4 py-24 section-reveal">
            <div className="hero-image-frame max-w-2xl w-full animate-float">
              <img
                src={heroImage}
                alt="Birthday celebration"
                className="w-full aspect-[16/10] object-cover rounded-3xl"
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_HERO; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <p className="text-sm text-pink-200 font-serif italic text-glow">
                  "Every moment with you is a page worth remembering."
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════ SECTION 4: "MY HEART" LETTER ═══════════════ */}
          <section className="min-h-screen w-full flex items-center justify-center px-4 py-24 section-reveal">
            <div className="max-w-4xl w-full glassmorphic-card p-10 md:p-16 rounded-3xl text-center space-y-6 md:space-y-8 border border-purple-500/10 shadow-[0_0_40px_rgba(139,92,246,0.1)]">
              <Heart className="h-8 w-8 text-pink-400 mx-auto animate-heartBeat" />
              <h2 className="text-4xl md:text-6xl font-serif text-purple-300">
                My Heart
              </h2>
              <div className="space-y-6 text-base md:text-xl font-serif text-slate-300 leading-relaxed max-w-2xl mx-auto">
                <p>{data.extraMessage || "I wanted to make this space just to tell you everything I feel. Every single day with you feels like a gift."}</p>
                <p>You are more than just my partner; you are my best friend, my confidante, and my greatest adventure. I love the way you smile, the way you care for others, and the beautiful way you see the world.</p>
                <p>As we celebrate your birthday, I just want you to know that I am endlessly proud of you. I promise to always hold your hand, to support your dreams, and to love you more with every passing day.</p>
              </div>
              <div className="pt-6 text-xl md:text-2xl font-serif text-pink-300 italic">
                Happy Birthday, my love. Let's make this year unforgettable. 💕
              </div>
            </div>
          </section>

          {/* ═══════════════ SECTION 5: INTERACTIVE QUIZ ═══════════════ */}
          {quizQuestions.length > 0 && (
            <section className="w-full flex flex-col items-center justify-center px-4 py-24 section-reveal">
              <div className="max-w-xl w-full glassmorphic-card p-8 md:p-12 rounded-3xl text-center border border-pink-500/10 shadow-[0_0_30px_rgba(244,114,182,0.1)]">
                <Sparkles className="h-6 w-6 text-pink-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-serif text-pink-300 mb-2">
                  How Well Do You Know Me? 🧠
                </h3>
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-8">
                  Take this fun quiz to find out!
                </p>

                {/* Quiz not started */}
                {quizStep === 0 && (
                  <button
                    onClick={() => setQuizStep(1)}
                    className="px-8 py-3 rounded-full border-2 border-pink-400 text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-pink-400/20 transition-all bg-pink-400/10 backdrop-blur-md cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                  >
                    🎮 Start Quiz
                  </button>
                )}

                {/* Questions */}
                {quizStep >= 1 && quizStep <= quizQuestions.length && (
                  <div className="quiz-card">
                    {(() => {
                      const qi = quizStep - 1;
                      const q = quizQuestions[qi];
                      const revealed = quizRevealed[qi];
                      const userAnswer = quizAnswers[qi];
                      return (
                        <div className="animate-slideUp">
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-xs text-slate-500 font-bold">Question {qi + 1} of {quizQuestions.length}</span>
                            <div className="flex gap-1.5">
                              {quizQuestions.map((_, i) => (
                                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${
                                  i < qi ? (quizAnswers[i] === quizQuestions[i].correct ? 'bg-green-400' : 'bg-red-400')
                                  : i === qi ? 'bg-pink-400 animate-pulse' : 'bg-slate-600'
                                }`} />
                              ))}
                            </div>
                          </div>
                          <h4 className="text-lg md:text-xl font-serif text-white mb-8">{q.question}</h4>
                          <div className="grid grid-cols-1 gap-3">
                            {q.answers.map((answer, ai) => {
                              let stateClass = '';
                              if (revealed) {
                                if (ai === q.correct) stateClass = 'correct selected-correct';
                                else if (ai === userAnswer) stateClass = 'wrong';
                              }
                              return (
                                <button
                                  key={ai}
                                  onClick={() => handleQuizAnswer(qi, ai)}
                                  disabled={revealed}
                                  className={`quiz-option w-full text-left px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-slate-200 hover:border-pink-400/40 disabled:cursor-default ${stateClass}`}
                                >
                                  <span className="text-pink-400 mr-3 font-bold">{String.fromCharCode(65 + ai)}.</span>
                                  {answer}
                                  {revealed && ai === q.correct && <span className="float-right text-green-400">✓</span>}
                                  {revealed && ai === userAnswer && ai !== q.correct && <span className="float-right text-red-400">✗</span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Results */}
                {quizStep > quizQuestions.length && (
                  <div className="animate-scaleUp space-y-6">
                    <div className="text-6xl mb-4">
                      {quizScore === quizQuestions.length ? '🎉' : quizScore >= quizQuestions.length / 2 ? '😊' : '💪'}
                    </div>
                    <h4 className="text-xl font-serif text-white">
                      You scored <span className="text-pink-400 font-bold">{quizScore}/{quizQuestions.length}</span>
                    </h4>
                    <p className="text-sm text-slate-400 italic">
                      {quizScore === quizQuestions.length
                        ? "Perfect! You know me better than anyone! 💕"
                        : quizScore >= quizQuestions.length / 2
                        ? "Great job! You know me pretty well! 🌟"
                        : "We have so much more to discover about each other! 💫"
                      }
                    </p>
                    <button
                      onClick={() => { setQuizStep(0); setQuizAnswers([null, null, null]); setQuizRevealed([false, false, false]); }}
                      className="mt-4 px-6 py-2.5 rounded-full border border-pink-400/50 text-xs text-pink-300 font-bold uppercase tracking-wider hover:bg-pink-400/10 transition-all cursor-pointer"
                    >
                      Retry Quiz
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ═══════════════ SECTION 6: TIMELINE JOURNEY (GSAP SCROLL) ═══════════════ */}
          <section ref={journeyContainerRef} className="relative w-full" style={{ height: '400vh' }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-transparent">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] max-h-[1000px] bg-pink-500/5 rounded-full blur-[130px] pointer-events-none" />

              <div ref={journeyScrollRef} className="flex h-[75vh] items-center pl-[10vw] w-max">
                {/* Intro slide */}
                <div className="w-[85vw] shrink-0 pr-[20vw] flex flex-col justify-center">
                  <h2 className="text-5xl md:text-8xl font-serif text-pink-300 mb-6">Our Journey</h2>
                  <p className="text-lg md:text-xl text-slate-400 font-serif max-w-md leading-relaxed">
                    Every moment with you is a treasure. Let's wander through some of our favorite memories...
                  </p>
                </div>

                {/* Journey slides */}
                {journeyItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setZoomedImage(item.image)}
                    className="w-[75vw] md:w-[440px] shrink-0 mx-[5vw] flex flex-col items-center group relative cursor-zoom-in"
                  >
                    <div className="w-full aspect-[3/4] p-4 glassmorphic-card rounded-2xl relative overflow-hidden transition-transform duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_0_35px_rgba(244,63,94,0.25)]">
                      <div
                        className="w-full h-full rounded-xl bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="mt-6 text-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs tracking-widest uppercase text-pink-400 block mb-2">{item.year}</span>
                      <h3 className="text-2xl font-serif text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-2 font-serif px-2">{item.desc}</p>
                    </div>
                  </div>
                ))}

                <div className="w-[50vw] shrink-0" />
              </div>
            </div>
          </section>

          {/* ═══════════════ SECTION 7: SEALED ENVELOPE ═══════════════ */}
          <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 relative section-reveal">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative w-[340px] h-[480px] flex items-center justify-center">
              <div
                onClick={() => !envelopeOpen && setEnvelopeOpen(true)}
                className={`envelope-container ${envelopeOpen ? 'open' : ''} cursor-pointer`}
              >
                <div className="envelope-back" />
                <div className="envelope-paper glassmorphic-card p-6 border border-pink-300/10">
                  <h3 className="text-xl font-serif text-pink-300 mb-4">My Dearest {data.targetName || 'Preethi'},</h3>
                  <p className="text-xs font-serif text-slate-300 leading-relaxed italic mb-4">
                    From the moment you entered my life, everything became brighter, warmer, and infinitely more beautiful.
                  </p>
                  <p className="text-xs font-serif text-slate-300 leading-relaxed italic">
                    This small universe was made just for you, to celebrate the incredible person you are. May this birthday be as magical and radiant as your smile.
                  </p>
                  <div className="text-right mt-6">
                    <span className="text-xs font-serif text-pink-400">Yours Forever ❤️</span>
                  </div>
                </div>
                <div className="envelope-left" />
                <div className="envelope-right" />
                <div className="envelope-bottom" />
                <div className="envelope-top" />
                {!envelopeOpen && (
                  <div className="envelope-seal">
                    <Heart className="h-5 w-5 text-red-500 fill-current animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {!envelopeOpen && (
              <div className="mt-8 text-center text-xs tracking-widest text-slate-400 uppercase animate-pulse">
                💌 Click the envelope to unseal & read
              </div>
            )}
          </section>

          {/* ═══════════════ SECTION 8: MAKE A WISH CAKE ═══════════════ */}
          <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 relative section-reveal">
            <div className="max-w-xl w-full glassmorphic-card p-10 rounded-3xl text-center space-y-8 border border-pink-500/10 shadow-[0_0_30px_rgba(251,113,133,0.08)]">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-serif text-pink-300">🎂 Make a Wish</h3>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Tap each candle to blow it out</p>
              </div>

              <div className="relative flex flex-col items-center mt-12 mb-6">
                {/* Candles */}
                <div className="flex gap-5 z-10 mb-[-4px]">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <div
                      key={idx}
                      onClick={() => blowCandle(idx)}
                      className="relative flex flex-col items-center cursor-pointer group"
                    >
                      {!candlesBlown[idx] && (
                        <div className="w-3 h-5 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-100 rounded-full candle-flame shadow-[0_0_12px_#ef4444] absolute -top-5 group-hover:scale-110 transition-transform" />
                      )}
                      <div
                        className="w-2 h-8 border border-white/10 rounded-sm"
                        style={{
                          background: `linear-gradient(to bottom, ${primaryColor}, ${primaryColor}88, #fef9c3)`
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Cake Body */}
                <div className="w-60 h-10 bg-pink-200/90 border border-pink-300/50 rounded-t-xl relative overflow-hidden shadow-md">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#ec4899_1.5px,transparent_1.5px)] [background-size:10px_10px]" />
                  <div className="absolute top-0 left-0 right-0 h-3 bg-pink-400 rounded-t-xl" />
                </div>
                <div className="w-64 h-12 bg-pink-100/90 border border-pink-200/50 relative overflow-hidden shadow-md">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:14px_14px]" />
                  <div className="absolute top-0 left-0 right-0 h-2.5 bg-rose-300" />
                </div>
                <div className="w-72 h-5 bg-slate-700/80 rounded-b-lg border border-slate-600/40 shadow-lg" />
              </div>

              {candlesBlown.every((c) => c) && (
                <div className="text-center animate-scaleUp">
                  <h4 className="text-xl md:text-2xl font-serif text-yellow-300 mb-2">May your smile shine forever ✨</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">Your wishes have been dispatched to the galaxy.</p>
                </div>
              )}
            </div>
          </section>

          {/* ═══════════════ SECTION 9: PHOTO MEMORIES GALLERY ═══════════════ */}
          <section className="w-full flex flex-col items-center justify-center py-24 section-reveal">
            <div className="max-w-4xl w-full text-center mb-10 px-4">
              <h3 className="text-3xl md:text-4xl font-serif text-pink-300 mb-3">📸 Our Memories</h3>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Swipe or Drag to explore our journey</p>
            </div>
            
            <div 
              ref={galleryScrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMoveScroll}
              className="w-full max-w-6xl px-8 overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-8 py-8 select-none cursor-grab active:cursor-grabbing scrollbar-hide gallery-scroll-container"
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
                    {idx === 0 ? "Our Shining Star ✨" : `Memory #${idx} ❤️`}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════ SECTION 10: GIFT BOX ═══════════════ */}
          <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 relative section-reveal">
            {!giftBoxOpen ? (
              <div className="flex flex-col items-center">
                <div
                  onClick={openGiftBox}
                  className="w-48 h-48 relative cursor-pointer group flex flex-col items-center justify-center"
                >
                  {/* Lid */}
                  <div className="w-40 h-10 rounded-lg shadow-md transition-transform duration-300 group-hover:-translate-y-4 z-10 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)` }}
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-yellow-300/80 flex items-center justify-center">
                      <span className="text-yellow-300 text-sm">🎀</span>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="w-36 h-32 rounded-b-xl flex items-center justify-center relative overflow-hidden mt-0.5 shadow-lg"
                    style={{ background: `linear-gradient(180deg, ${primaryColor}ee, ${primaryColor}88)` }}
                  >
                    <div className="absolute w-8 h-full bg-yellow-300/40" />
                    <div className="absolute h-8 w-full bg-yellow-300/40" />
                    <span className="relative z-10 text-sm font-black text-white uppercase tracking-widest select-none animate-pulse">
                      🎁 Open Me
                    </span>
                  </div>
                </div>
                <div className="mt-8 text-center text-xs tracking-widest text-slate-400 uppercase">
                  Tap box to unwrap your surprise
                </div>
              </div>
            ) : (
              <div className="max-w-4xl w-full glassmorphic-card p-8 md:p-12 rounded-3xl text-center space-y-10 border border-pink-500/10 shadow-[0_0_30px_rgba(244,63,94,0.1)] animate-scaleUp">
                <div className="flex flex-col items-center">
                  <Sparkles className="h-8 w-8 text-pink-400 mb-3 animate-bounce" />
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-2">You are the best gift I ever received.</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {photos.map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => setZoomedImage(photo)}
                      className="w-full aspect-square bg-white/5 border border-white/5 rounded-2xl overflow-hidden shadow-md cursor-zoom-in group hover:shadow-[0_0_15px_rgba(255,182,193,0.2)] hover:-translate-y-1 transition-all duration-300"
                    >
                      <img
                        src={photo}
                        alt={`Gift memory ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_PHOTOS[idx]; }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ═══════════════ SECTION 11: FINAL BANNER & SKY LANTERNS ═══════════════ */}
          <section className="h-screen w-full relative overflow-hidden flex flex-col items-center justify-center text-center">
            <canvas ref={lanternsCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
            <div className="z-10 px-4 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif text-pink-400 mb-4 uppercase tracking-widest">Happy Birthday</h2>
              <h1
                className="text-6xl md:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 font-bold mb-8"
                style={{ filter: 'drop-shadow(0 0 25px rgba(255, 182, 193, 0.45))' }}
              >
                {data.targetName || 'Preethi'} ❤️
              </h1>
              <p className="text-xl md:text-3xl font-serif text-white/80 italic text-glow drop-shadow-md">
                "You are my happiest place."
              </p>
              <div className="mt-12 flex justify-center">
                <Heart className="h-10 w-10 text-pink-400 animate-heartBeat" />
              </div>
            </div>
          </section>

        </div>
      )}

      {/* FULLSCREEN IMAGE ZOOM */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl cursor-zoom-out animate-fadeIn"
        >
          <img
            src={zoomedImage}
            alt="Zoomed Memory"
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_0_50px_rgba(244,63,94,0.3)] border border-white/10 animate-scaleUp"
          />
        </div>
      )}
    </div>
  );
};

export default BirthdayUniverse;
