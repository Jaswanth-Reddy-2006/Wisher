import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import './style.css';

export const BirthdaySurpriseEngine: React.FC<TemplateProps> = ({ data }) => {
  const [showStartScreen, setShowStartScreen] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- 1. Passcode Gate States ---
  const [nameInput, setNameInput] = useState<string>('');
  const [wrongAttempt, setWrongAttempt] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [typingPhase, setTypingPhase] = useState<'typing1' | 'fading1' | 'typing2' | 'fading2' | 'done'>('typing1');
  const [typedText, setTypedText] = useState<string>('');

  const firstText = "Hey there... I have a special surprise for you... 💖";
  const secondText = "Let's first make sure it's really you... ✨";

  // Typing animation effect
  useEffect(() => {
    if (typingPhase === 'typing1' && typedText.length < firstText.length) {
      const timeout = setTimeout(() => {
        setTypedText(firstText.slice(0, typedText.length + 1));
      }, 70);
      return () => clearTimeout(timeout);
    } else if (typingPhase === 'typing1' && typedText.length === firstText.length) {
      const timeout = setTimeout(() => {
        setTypingPhase('fading1');
      }, 1200);
      return () => clearTimeout(timeout);
    } else if (typingPhase === 'fading1') {
      const timeout = setTimeout(() => {
        setTypedText('');
        setTypingPhase('typing2');
      }, 500);
      return () => clearTimeout(timeout);
    } else if (typingPhase === 'typing2' && typedText.length < secondText.length) {
      const timeout = setTimeout(() => {
        setTypedText(secondText.slice(0, typedText.length + 1));
      }, 60);
      return () => clearTimeout(timeout);
    } else if (typingPhase === 'typing2' && typedText.length === secondText.length) {
      const timeout = setTimeout(() => {
        setTypingPhase('fading2');
      }, 1200);
      return () => clearTimeout(timeout);
    } else if (typingPhase === 'fading2') {
      const timeout = setTimeout(() => {
        setTypingPhase('done');
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [typedText, typingPhase]);

  // Handle name verification
  const handleNameVerify = () => {
    const correctName = (data.targetName || "Jaswanth").toLowerCase().trim();
    const inputVal = nameInput.toLowerCase().trim();
    
    if (inputVal === correctName || correctName.includes(inputVal) && inputVal.length >= 3) {
      setShowStartScreen(false);
      triggerConfettiShowers();
      
      // Start background music
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsMuted(false))
          .catch(e => console.error("Autoplay failed:", e));
      }
    } else {
      setWrongAttempt(true);
      setShowHint(true);
    }
  };

  // Keyboard Enter key unlock
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameVerify();
    }
  };

  // --- 2. Interactive Birthday Cake States ---
  const [candlesLit, setCandlesLit] = useState<Array<boolean>>([true, true, true]);
  const [cakeBlownOut, setCakeBlownOut] = useState<boolean>(false);
  const [showCakeButton, setShowCakeButton] = useState<boolean>(false);

  const handleBlowCandle = (idx: number) => {
    if (cakeBlownOut) return;
    const nextLit = [...candlesLit];
    nextLit[idx] = false;
    setCandlesLit(nextLit);

    // Trigger single minor confetti pop on candle blow
    import('canvas-confetti').then((m) => {
      m.default({
        particleCount: 15,
        spread: 30,
        origin: { y: 0.6 }
      });
    });

    // Check if all candles are blown out
    if (nextLit.every(val => !val)) {
      setCakeBlownOut(true);
      triggerConfettiShowers();
      setTimeout(() => {
        setShowCakeButton(true);
      }, 1000);
    }
  };

  // --- 3. Typewriter Letter Section States ---
  const [displayedMessage, setDisplayedMessage] = useState<string>('');
  const [isTypingDone, setIsTypingDone] = useState<boolean>(false);
  
  const fullMessage = data.message || "Happy Birthday! Wishing you a year full of wonderful memories, endless opportunities, and infinite joy. You deserve the best!";

  useEffect(() => {
    if (showStartScreen || currentSection !== 2) return;
    
    let currentIdx = 0;
    const startDelay = setTimeout(() => {
      const typingTimer = setInterval(() => {
        if (currentIdx < fullMessage.length) {
          setDisplayedMessage(fullMessage.slice(0, currentIdx + 1));
          currentIdx++;
        } else {
          clearInterval(typingTimer);
          setIsTypingDone(true);
        }
      }, 30);
      return () => clearInterval(typingTimer);
    }, 500);

    return () => clearTimeout(startDelay);
  }, [showStartScreen, currentSection, fullMessage]);

  // --- BGM Audio Setup ---
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

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play()
        .then(() => {
          audioRef.current!.muted = false;
          setIsMuted(false);
        })
        .catch(e => console.error("Audio failed:", e));
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // --- Confetti helper ---
  const triggerConfettiShowers = () => {
    import('canvas-confetti').then((m) => {
      const confetti = m.default;
      const end = Date.now() + 4 * 1000;
      const colors = ['#ec4899', '#db2777', '#f472b6', '#ffffff', '#FFD700'];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.85 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.85 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    });
  };

  // Navigations
  const handleNextSection = () => {
    setCurrentSection(prev => Math.min(prev + 1, 2));
  };

  // Grid Photos mapping
  const PHOTO_FALLBACKS = [
    data.photo1 || "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    data.photo2 || "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80",
    data.photo3 || "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80",
    data.photo4 || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    data.photo5 || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    data.photo6 || "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1518199266791-5375a83164ba?auto=format&fit=crop&w=600&q=80"
  ];

  return (
    <div className="surprise-engine-root">
      
      {/* 1. SECURE PASSCODE GATE OVERLAY */}
      {showStartScreen && (
        <div className="start-screen">
          <div className="start-content">
            
            {/* Typewriter Header Prompts */}
            {typingPhase !== 'done' ? (
              <p className="typing-text">
                {typedText}
                <span className="typing-cursor">|</span>
              </p>
            ) : (
              <>
                <p className="start-question animate-fadeIn">Who are you?</p>
                <input 
                  type="text" 
                  className="name-input"
                  placeholder="Type your name here..."
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  autoFocus
                />
                
                {wrongAttempt && (
                  <p className="wrong-message">Hmm, that's not quite right... 🤔</p>
                )}
                
                {showHint && (
                  <p className="hint-message">💡 Hint: It's {data.targetName || "Jaswanth"}</p>
                )}
                
                <button 
                  onClick={handleNameVerify}
                  className="btn-primary start-button"
                >
                  Enter Surprise
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 2. MUSIC FLOATING TOGGLE PLAYER */}
      {!showStartScreen && (
        <button 
          onClick={toggleMute}
          className="music-toggle"
          aria-label="Toggle Music Player"
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      )}

      {/* 3. DYNAMIC TRANSITION SECTIONS */}
      {!showStartScreen && (
        <>
          {/* SECTION 0: INTERACTIVE CSS BIRTHDAY CAKE */}
          {currentSection === 0 && (
            <section className="hero-section">
              <h1 className="birthday-banner">Happy Birthday, {data.targetName || "Jaswanth"}!</h1>
              
              {/* CSS Interactive Cake layers */}
              <div className="cake-wrapper">
                
                {/* 3 Candles positioned on the top cake layer */}
                {candlesLit[0] && (
                  <div className="candle" style={{ left: '35%' }} onClick={() => handleBlowCandle(0)}>
                    <div className="flame" />
                  </div>
                )}
                {candlesLit[1] && (
                  <div className="candle" style={{ left: '50%' }} onClick={() => handleBlowCandle(1)}>
                    <div className="flame" />
                  </div>
                )}
                {candlesLit[2] && (
                  <div className="candle" style={{ left: '65%' }} onClick={() => handleBlowCandle(2)}>
                    <div className="flame" />
                  </div>
                )}

                {/* Cake Layers */}
                <div className="cake-tier cake-tier-3">
                  <div className="drip" style={{ backgroundColor: '#ec4899', height: '8px' }} />
                </div>
                <div className="cake-tier cake-tier-2">
                  <div className="drip" style={{ backgroundColor: '#db2777', height: '10px' }} />
                </div>
                <div className="cake-tier cake-tier-1">
                  <div className="drip" style={{ backgroundColor: '#ec4899', height: '12px' }} />
                </div>
                
                <div className="cake-base" />
              </div>

              <p className="cake-instruction">
                {cakeBlownOut ? "🎂 Yay! You blew out all the candles! 🎂" : "🕯️ Click on each candle to blow it out! 🕯️"}
              </p>

              {showCakeButton && (
                <button 
                  onClick={handleNextSection}
                  className="btn-primary hero-button animate-fadeIn"
                >
                  Uncover Memories 💖
                </button>
              )}
            </section>
          )}

          {/* SECTION 1: MODULAR POLAROID MEMORIES GRID */}
          {currentSection === 1 && (
            <section className="gallery-section">
              <div className="side-border-left">
                <span className="border-dot" />
                <span className="border-heart">♡</span>
                <span className="border-dot" />
                <span className="border-heart">❤</span>
                <span className="border-dot" />
              </div>
              <div className="side-border-right">
                <span className="border-dot" />
                <span className="border-heart">♡</span>
                <span className="border-dot" />
                <span className="border-heart">❤</span>
                <span className="border-dot" />
              </div>

              <h2 className="gallery-heading">My Favorite Memories of You</h2>
              
              <div className="photo-grid">
                {PHOTO_FALLBACKS.map((photoUrl, idx) => {
                  // Pre-defined random rotations for artsy polaroid look
                  const rotations = [-3, 2, -2, 3, -1, 2, -3, 1, -2];
                  return (
                    <div 
                      key={idx}
                      className="photo-frame"
                      style={{ transform: `rotate(${rotations[idx % rotations.length]}deg)` }}
                    >
                      <div className="polaroid">
                        <img src={photoUrl} alt={`Memory ${idx+1}`} className="photo" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={handleNextSection}
                className="btn-primary gallery-button"
              >
                Read Message 💌
              </button>
            </section>
          )}

          {/* SECTION 2: HANDWRITTEN LOVE LETTER WISH */}
          {currentSection === 2 && (
            <section className="letter-section">
              <h2 className="letter-heading">A Heartfelt Wish</h2>
              
              <div className="letter-card">
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />

                <div className="letter-content">
                  <pre className="message-text">
                    {displayedMessage}
                    {!isTypingDone && <span className="letter-cursor">|</span>}
                  </pre>
                </div>
              </div>

              {isTypingDone && (
                <h3 className="surprise-footer animate-fadeIn">
                  With Love, {data.senderName || "Wisher"}
                </h3>
              )}
            </section>
          )}
        </>
      )}

      {/* Decorative floral auras */}
      <div className="decor-circle-1" />
      <div className="decor-circle-2" />

    </div>
  );
};

export default BirthdaySurpriseEngine;
