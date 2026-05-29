import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import './style.css';

export const BirthdayGlassmorphismStory: React.FC<TemplateProps> = ({ data }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [giftOpen, setGiftOpen] = useState<boolean>(false);
  const [keyUnlocking, setKeyUnlocking] = useState<boolean>(false);
  
  // Book animation states
  const [bookVisible, setBookVisible] = useState<boolean>(false);
  const [bookOpening, setBookOpening] = useState<boolean>(false);
  const [coverFlipped, setCoverFlipped] = useState<boolean>(false);
  const [page1Flipped, setPage1Flipped] = useState<boolean>(false);
  const [page2Flipped, setPage2Flipped] = useState<boolean>(false);
  
  // Audio playback
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Floating background particles
  const [particles, setParticles] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    // Generate background floating stardust particles
    const list = Array.from({ length: 40 }).map((_, i) => {
      const size = Math.random() * 5 + 2;
      return {
        id: i,
        style: {
          position: 'absolute' as const,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          animation: `float ${Math.random() * 15 + 10}s linear infinite`,
          opacity: 0.3 + Math.random() * 0.5,
        }
      };
    });
    setParticles(list);
  }, []);

  // Initialize Music
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

  // Confetti trigger upon reaching step 5 (Finale)
  useEffect(() => {
    if (currentStep === 5) {
      import('canvas-confetti')
        .then((module) => {
          const confetti = module.default;
          // Center burst
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#7b2cbf', '#9d4edd', '#8ec5fc', '#FFD700', '#ff007f']
          });
          // Left side shoot
          setTimeout(() => {
            confetti({
              particleCount: 60,
              angle: 60,
              spread: 55,
              origin: { x: 0, y: 0.8 },
              colors: ['#7b2cbf', '#8ec5fc', '#FFD700']
            });
          }, 250);
          // Right side shoot
          setTimeout(() => {
            confetti({
              particleCount: 60,
              angle: 120,
              spread: 55,
              origin: { x: 1, y: 0.8 },
              colors: ['#9d4edd', '#c3e8fc', '#FFD700']
            });
          }, 500);
        })
        .catch(err => console.error("Confetti animation failed to trigger:", err));
    }
  }, [currentStep]);

  // Step 1: Open Gift Box
  const handleGiftClick = () => {
    if (giftOpen) return;
    setGiftOpen(true);
    
    // Play BGM immediately on first interaction (Autoplay compliant)
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Audio autoplay blocked or failed:", err));
    }
    
    // Transit to step 2 after lid flips off
    setTimeout(() => {
      setCurrentStep(2);
    }, 800);
  };

  // Step 2: Unlock with Golden Key
  const handleKeyClick = () => {
    if (keyUnlocking) return;
    setKeyUnlocking(true);
    
    setTimeout(() => {
      setCurrentStep(3);
      
      // Load book cover frame transition
      setTimeout(() => {
        setBookVisible(true);
      }, 100);
      
      // Start sequential book flipping narrative
      setTimeout(startStorybookSequence, 1500);
    }, 600);
  };

  // Step 3 & 4: Storybook Flip sequence
  const startStorybookSequence = () => {
    // 1. Zoom/Center book
    setBookOpening(true);
    
    // 2. Open Cover
    setTimeout(() => {
      setCoverFlipped(true);
    }, 1000);
    
    // 3. Turn Page 1
    setTimeout(() => {
      setPage1Flipped(true);
    }, 2800);
    
    // 4. Turn Page 2
    setTimeout(() => {
      setPage2Flipped(true);
    }, 4800);
    
    // 5. Open Final Congratulations Step
    setTimeout(() => {
      setCurrentStep(5);
    }, 6800);
  };

  // Floating BGM toggle in finale
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("BGM failed to play:", e));
    }
  };

  return (
    <div className="glassmorphism-story-root select-none">
      
      {/* Moving shifting gradient background */}
      <div className="background-container" />
      
      {/* Float particles wrapper */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {particles.map(p => (
          <div key={p.id} style={p.style} />
        ))}
      </div>

      {/* STEP 1: FLOATING SURPRISE GIFT BOX */}
      <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
        <div className={`gift-container ${giftOpen ? 'open' : ''}`} onClick={handleGiftClick}>
          <div className="gift-box flex items-center justify-center">
            <div className="gift-lid" />
            <div className="gift-bow" />
            <span className="text-white text-5xl">🎁</span>
          </div>
          <p className="instruction-text font-serif">A surprise is waiting...</p>
        </div>
      </div>

      {/* STEP 2: DRAWING GOLDEN KEY UNLOCK */}
      <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
        <div className={`key-container ${keyUnlocking ? 'unlocking' : ''}`} onClick={handleKeyClick}>
          <svg className="key-svg" viewBox="0 0 100 100">
            <path 
              id="animatedKey"
              d="M60,20 Q50,10 40,20 T20,20 Q10,25 20,30 T40,30 Q50,35 40,40 L40,70 L35,75 L35,80 L40,85 L45,80 L45,75 L40,70" 
              strokeWidth="5" 
              strokeLinecap="round" 
              fill="none"
            />
          </svg>
          <p className="instruction-text font-serif">Click the key to unlock the magic...</p>
        </div>
      </div>

      {/* STEP 3: FLIPPING BOOK PAGES STORYBOOK */}
      <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
        <div className={`storybook-container ${bookVisible ? 'visible' : ''} ${bookOpening ? 'opening' : ''}`}>
          <div className="book">
            {/* 1. Cover Page */}
            <div className={`book-cover ${coverFlipped ? 'flipped' : ''}`}>
              <div className="cover-front">
                <h2 className="book-title">Your Story</h2>
              </div>
              <div className="cover-back" />
            </div>
            
            {/* 2. Page 1 */}
            <div className={`page ${page1Flipped ? 'flipped' : ''}`} id="page1">
              <div className="page-front">
                <p className="page-text font-serif">A new chapter begins today...</p>
              </div>
              <div className="page-back">
                <p className="page-text font-serif">Filled with promise and beautiful adventures...</p>
              </div>
            </div>
            
            {/* 3. Page 2 */}
            <div className={`page ${page2Flipped ? 'flipped' : ''}`} id="page2">
              <div className="page-front">
                <p className="page-text font-serif">May it be your best chapter yet...</p>
              </div>
              <div className="page-back">
                <p className="page-text font-serif">Full of endless laughter, joy, and light...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 5: FINALE GLASSMORPHIC CARD OVERLAY */}
      <div className={`step ${currentStep === 5 ? 'active' : ''}`}>
        <div className="finale-container">
          <div className="finale-card">
            <svg className="floral-svg" viewBox="0 0 400 400">
              <path id="vine1" d="M10,200 C40,100 150,100 200,200 S360,300 390,200" />
              <path id="vine2" d="M10,210 C40,310 150,310 200,210 S360,110 390,210" />
            </svg>
            <h1 className="finale-greeting">Happy Birthday</h1>
            <h2 className="finale-name">{data.targetName || "Sapthesh!"}</h2>
            <p className="finale-wish">
              {data.message || "Wishing you a day as magical as this story, and a year filled with wonderful new beginnings. May all your dreams blossom."}
            </p>
            
            {/* BGM watermark play controller */}
            {data.musicUrl && (
              <p onClick={togglePlay} className="music-playing-indicator select-none">
                {isPlaying ? "🎵 Magical BGM Playing (Tap to Pause) 🎵" : "🎵 Tap to Play Background Music 🎵"}
              </p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default BirthdayGlassmorphismStory;
