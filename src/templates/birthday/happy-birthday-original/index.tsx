import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import './style.css';

const DEFAULT_STORY = `Today is...
as beautiful as other days
but you realize
another year has gone
in a blink of the eyes
however
Do you know..?
today is just special
so special to you
that's why
Let's make it...
the best celebration ever
and let me share...
a piece of happiness to you
I made all this...
as a birthday present to you
I'm glad we met on zzz
thanks for the friendship we made
thanks for everything
I wish you all the best
May your life be at ease
May all your wishes come true
Remember
your ambitions
you live as a free bird...
flying in the blue sky
Now things are different...
real story of your life
is just about to begin
indeed..
but...
don't worry
because...
God has your back
and
this year will be better
and I hope
you'll find...
happiness along the way
keep your spirit up
enjoy every single moment...
that you experience today
fill it with your most beautiful smile
and make it the best memory..
lastly...
I'd like to wish you one more time
a very happy birthday babyy ❤️`;

interface BalloonData {
  id: number;
  letter: string;
  color: string;
  left: string;
  bottom: string;
  top?: string;
  rotateClass: string;
}

export const BirthdayOriginal: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
  const [stage, setStage] = useState(0); // Stages 0 to 9
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Narrative/Story animation states
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [lineVisible, setLineVisible] = useState(false);

  // Parse lines of story
  const storyLines = (data.message || DEFAULT_STORY).split('\n').filter(line => line.trim() !== '');

  // Floating Balloons States
  const [balloons, setBalloons] = useState<BalloonData[]>([
    { id: 1, letter: 'H', color: '#F2B300', left: '10%', bottom: '-200px', rotateClass: 'balloons-rotate-behaviour-one' },
    { id: 2, letter: 'B', color: '#0719D4', left: '22%', bottom: '-200px', rotateClass: 'balloons-rotate-behaviour-two' },
    { id: 3, letter: 'D', color: '#D14D39', left: '34%', bottom: '-200px', rotateClass: 'balloons-rotate-behaviour-two' },
    { id: 4, letter: 'B', color: '#8FAD00', left: '46%', bottom: '-200px', rotateClass: 'balloons-rotate-behaviour-one' },
    { id: 5, letter: 'A', color: '#8377E4', left: '58%', bottom: '-200px', rotateClass: 'balloons-rotate-behaviour-one' },
    { id: 6, letter: 'B', color: '#99C96A', left: '70%', bottom: '-200px', rotateClass: 'balloons-rotate-behaviour-two' },
    { id: 7, letter: 'Y', color: '#20CFB4', left: '82%', bottom: '-200px', rotateClass: 'balloons-rotate-behaviour-one' },
  ]);

  // Target Celebrant Name
  const targetName = data.targetName || 'Navya';

  // Audio URL & 6 Photos
  const musicUrl = data.musicUrl || '/templates/birthday-original/audio/hbd.mp3';
  const personPhoto = data.bgImage || '/templates/birthday-original/images/person.png';
  const albumPhotos = [
    data.photo1 || '/templates/birthday-original/images/photo1.jpg',
    data.photo2 || '/templates/birthday-original/images/photo2.jpg',
    data.photo3 || '/templates/birthday-original/images/photo3.jpg',
    data.photo4 || '/templates/birthday-original/images/photo4.jpg',
    data.photo5 || '/templates/birthday-original/images/photo5.jpg',
    data.photo6 || 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
  ];

  // Specific position index classes
  const cardPositions = [
    'left-1', 'left-2', 'left-3',
    'right-1', 'right-2', 'right-3'
  ];

  // Auto-start and mute safeguards in preview mode
  useEffect(() => {
    if (isPreview) {
      setStage(7); // Jump straight to decorated stage with all elements showing
    }
  }, [isPreview]);

  // Audio setup
  useEffect(() => {
    if (!isPreview && musicUrl) {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      audio.volume = 0.6;
      audioRef.current = audio;

      return () => {
        audio.pause();
        audioRef.current = null;
      };
    }
  }, [isPreview, musicUrl]);

  // Balloon Float Loop logic (Stage 3 to 6)
  useEffect(() => {
    if (stage < 3 || stage >= 7) return;

    // Pick random coordinates for floating balloons
    const randomizeBalloons = () => {
      setBalloons(prev =>
        prev.map(balloon => ({
          ...balloon,
          left: `${15 + Math.random() * 70}%`,
          bottom: `${15 + Math.random() * 55}%`,
        }))
      );
    };

    // Trigger initial float coordinates
    randomizeBalloons();

    // Floating interval loop
    const floatInterval = setInterval(randomizeBalloons, 6000);

    return () => clearInterval(floatInterval);
  }, [stage]);

  // Story slide fading sequence loop (Stage 8)
  useEffect(() => {
    if (stage !== 8) return;

    let timer: NodeJS.Timeout;

    const playStoryLine = (index: number) => {
      if (index < storyLines.length - 1) {
        // Normal lines: fade in, wait, fade out, then play next
        setCurrentLineIdx(index);
        setLineVisible(true);

        timer = setTimeout(() => {
          setLineVisible(false); // fade out
          timer = setTimeout(() => {
            playStoryLine(index + 1);
          }, 800); // Wait for fade out transition before loading next
        }, 2200); // Active reading time
      } else {
        // Last line: fade in and stay visible + bring cake back
        setCurrentLineIdx(index);
        setLineVisible(true);
        setStage(9); // Completed stage, brings cake back
      }
    };

    playStoryLine(0);

    return () => clearTimeout(timer);
  }, [stage, storyLines.length]);

  // Actions for Stage Swapping Buttons
  const handleTurnOnLights = () => {
    setStage(1);
  };

  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlayingAudio(true))
        .catch(err => console.warn("Audio play blocked by browser:", err));
    }
    setStage(2);
  };

  const handleDecorate = () => {
    setStage(3);
  };

  const handleFlyBalloons = () => {
    setStage(4);
  };

  const handleCakeFadeIn = () => {
    setStage(5);
  };

  const handleLightCandle = () => {
    setStage(6);
  };

  const handleHappyBirthday = () => {
    const offsets = [-350, -250, -150, -50, 50, 150, 250];
    setBalloons(prev =>
      prev.map((balloon, idx) => ({
        ...balloon,
        left: `calc(50% + ${offsets[idx]}px)`,
        bottom: 'unset',
        top: '240px',
      }))
    );

    setStage(7);
  };

  const handleAmessageForYou = () => {
    setStage(8);
  };

  // Safe manual mute control
  const togglePlayMute = () => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(e => console.error(e));
      }
    }
  };

  // 1. Wired Yellow Light Nodes loop (Top, Right, Bottom, Left)
  const renderFairyLights = (side: 'top' | 'right' | 'bottom' | 'left', count: number) => {
    return Array.from({ length: count }).map((_, idx) => {
      const isOdd = idx % 2 === 0;
      const animClass = isOdd ? 'fairy-glow-odd' : 'fairy-glow-even';
      const activeClass = stage >= 1 ? `fairy-active ${stage >= 2 ? 'fairy-fast' : ''}` : '';

      return (
        <div
          key={idx}
          className={`fairy-light-node ${animClass} ${activeClass}`}
          style={{
            position: 'absolute',
            ...(side === 'top' && { left: `${(idx / (count - 1)) * 100}%`, top: '-5px' }),
            ...(side === 'bottom' && { left: `${(idx / (count - 1)) * 100}%`, bottom: '-5px' }),
            ...(side === 'left' && { top: `${(idx / (count - 1)) * 100}%`, left: '-5px' }),
            ...(side === 'right' && { top: `${(idx / (count - 1)) * 100}%`, right: '-5px' }),
          }}
        />
      );
    });
  };

  // 2. Golden Floating Particles loop
  const renderWarmParticles = () => {
    return Array.from({ length: 22 }).map((_, idx) => {
      const size = 3 + (idx % 4) * 2; // 3px, 5px, 7px, 9px
      const left = `${(idx * 8.3) % 100}%`;
      const delay = `${idx * 0.4}s`;
      const duration = `${12 + (idx % 5) * 3}s`; // 12s to 24s
      const opacity = 0.15 + (idx % 3) * 0.08;
      return (
        <div
          key={idx}
          className="warm-particle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: left,
            animationDelay: delay,
            animationDuration: duration,
            opacity: opacity,
          }}
        />
      );
    });
  };

  // Viewport background class
  const getViewportClass = () => {
    let classes = 'original-viewport';
    if (stage >= 5) classes += ' scrollable';
    if (stage === 1) classes += ' peach';
    if (stage >= 2) classes += ' peach peach-after';
    return classes;
  };

  const handleCardClick = (idx: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className={getViewportClass()}>
      
      {/* 4-Side Wires */}
      <div className="absolute inset-[4px] border border-slate-700/30 rounded pointer-events-none z-[999]" style={{ mixBlendMode: 'overlay' }} />

      {/* 4-Side Fairy String Lights Grid */}
      <div className="absolute top-[4px] left-[4px] right-[4px] pointer-events-none z-[9999]">
        <div className="relative w-full h-[1.5px] bg-slate-700/60 shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          {renderFairyLights('top', 24)}
        </div>
      </div>
      <div className="absolute bottom-[4px] left-[4px] right-[4px] pointer-events-none z-[9999]">
        <div className="relative w-full h-[1.5px] bg-slate-700/60 shadow-[0_-1px_2px_rgba(0,0,0,0.5)]">
          {renderFairyLights('bottom', 24)}
        </div>
      </div>
      <div className="absolute left-[4px] top-[4px] bottom-[4px] pointer-events-none z-[9999]">
        <div className="relative h-full w-[1.5px] bg-slate-700/60 shadow-[1px_0_2px_rgba(0,0,0,0.5)]">
          {renderFairyLights('left', 18)}
        </div>
      </div>
      <div className="absolute right-[4px] top-[4px] bottom-[4px] pointer-events-none z-[9999]">
        <div className="relative h-full w-[1.5px] bg-slate-700/60 shadow-[-1px_0_2px_rgba(0,0,0,0.5)]">
          {renderFairyLights('right', 18)}
        </div>
      </div>

      {/* Warm Floating Particles Background */}
      {stage >= 1 && (
        <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
          {renderWarmParticles()}
        </div>
      )}

      {/* Floating Audio Playback Indicator (Top Right) */}
      {stage >= 2 && !isPreview && (
        <button
          onClick={togglePlayMute}
          className="fixed top-6 right-6 z-[99999] px-4 py-2 text-xs font-bold text-[#ffe082] bg-amber-950/40 backdrop-blur-md border border-amber-500/30 rounded-full active:scale-95 duration-200 hover:bg-amber-950/60 shadow-lg"
        >
          {isPlayingAudio ? "🔊 Playing Music" : "🔇 Music Muted"}
        </button>
      )}

      {/* 6 Tilted 3D Flip Polaroid Photos */}
      {stage >= 3 && (
        <>
          {albumPhotos.map((imgUrl, idx) => {
            const isFlipped = flippedCards[idx];
            const positionClass = cardPositions[idx];
            return (
              <div
                key={idx}
                className={`polaroid-flip-container ${positionClass} ${isFlipped ? 'is-flipped' : ''}`}
                onClick={() => handleCardClick(idx)}
              >
                <div className="polaroid-flip-card">
                  {/* Card Back Cover */}
                  <div className="polaroid-card-back">
                    <span className="heart-deco">❤️</span>
                    <span className="text-tag">Memory #{idx + 1}</span>
                    <span className="tap-hint">Tap to Reveal</span>
                  </div>

                  {/* Card Front (Actual photo) */}
                  <div className="polaroid-card-front">
                    <img
                      src={imgUrl}
                      alt={`Memory ${idx + 1}`}
                      className="photo-img"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent flipping back when zooming
                        setZoomedImage(imgUrl);
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="photo-caption">Memory #{idx + 1} ✨</div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Zoom hint image */}
          <img
            src="/templates/birthday-original/images/can-zoom.png"
            alt="Can zoom hint"
            className="can-zoom"
          />
        </>
      )}

      {/* Banner */}
      {stage >= 3 && (
        <div className="w-full flex justify-center pt-16 z-30 relative pointer-events-none">
          <img
            src="/templates/birthday-original/images/banner.png"
            alt="Happy Birthday Banner"
            className="bannar bannar-come"
          />
        </div>
      )}

      {/* Balloon Border flying away (Stage 4) */}
      {stage >= 4 && (
        <img
          src="/templates/birthday-original/images/Balloon-Border.png"
          alt="Balloon Border"
          className="balloon-border"
          style={{
            transform: stage >= 4 ? 'translateY(-150vh)' : 'translateY(0)',
          }}
        />
      )}

      {/* Floating Individual Letter Balloons */}
      {stage >= 4 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
          {balloons.map((balloon) => (
            <div
              key={balloon.id}
              className={`balloons ${balloon.rotateClass}`}
              id={`b${balloon.id}`}
              style={{
                left: balloon.left,
                bottom: balloon.bottom,
                top: balloon.top || 'unset',
                transition: stage >= 7 ? 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)' : 'all 6s linear',
              }}
            >
              {stage >= 7 && (
                <h2
                  className="animate-fadeIn"
                  style={{
                    color: balloon.color,
                    animationDuration: '2s',
                  }}
                >
                  {balloon.letter}
                </h2>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Prominent Golden Name Celebration Title */}
      {stage >= 5 && stage !== 8 && (
        <div className="w-full text-center relative z-25 -mb-6 mt-12 animate-fadeIn">
          <h1 className="retro-birthday-title">
            HAPPY BIRTHDAY, <span className="gold-glow">{targetName.toUpperCase()}</span>!
          </h1>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
        </div>
      )}

      {/* Interactive Birthday Cake */}
      {(stage >= 5 && stage !== 8) && (
        <div className="w-full flex justify-center z-[15] relative pointer-events-auto">
          <div className="cake-cover">
            <div className="cake animate-fadeIn" style={{ display: 'block' }}>
              
              {/* Velas (Candles) */}
              <div className="velas">
                {stage >= 6 && (
                  <>
                    <div className="fuego" style={{ display: 'block' }} />
                    <div className="fuego" style={{ display: 'block' }} />
                    <div className="fuego" style={{ display: 'block' }} />
                    <div className="fuego" style={{ display: 'block' }} />
                    <div className="fuego" style={{ display: 'block' }} />
                  </>
                )}
              </div>

              {/* Frosting Cover */}
              <div className="cobertura" />

              {/* Profile Image embedded in the side of cake */}
              <img
                src={personPhoto}
                alt="Birthday Celebrant"
                className="profile-img animate-fadeIn"
                style={{ opacity: 1 }}
              />

              {/* Cake Sponge Layers */}
              <div className="bizcocho" />
            </div>
          </div>
        </div>
      )}

      {/* Story Note / Slide Message Paragraphs (Stage 8) */}
      {stage >= 8 && (
        <div className="w-full h-full flex items-center justify-center absolute inset-0 z-[2000] px-4 pointer-events-none">
          <div className="message" style={{ display: 'flex' }}>
            <p
              style={{
                display: 'block',
                opacity: lineVisible ? 1 : 0,
                transform: lineVisible ? 'scale(1)' : 'scale(0.95)',
                transition: 'all 0.5s ease-in-out',
              }}
            >
              {storyLines[currentLineIdx]}
            </p>
          </div>
        </div>
      )}

      {/* Step Swapper Actions Footer */}
      {!isPreview && (
        <div className="navbar navbar-fixed-bottom">
          {stage === 0 && (
            <button className="btn-primary-retro" onClick={handleTurnOnLights}>
              Turn On Lights
            </button>
          )}
          {stage === 1 && (
            <button className="btn-primary-retro animate-pulse" onClick={handlePlayMusic}>
              Play the Music Buddy
            </button>
          )}
          {stage === 2 && (
            <button className="btn-primary-retro" onClick={handleDecorate}>
              Let's Decorate
            </button>
          )}
          {stage === 3 && (
            <button className="btn-primary-retro" onClick={handleFlyBalloons}>
              Calm, i got you some baloons
            </button>
          )}
          {stage === 4 && (
            <button className="btn-primary-retro" onClick={handleCakeFadeIn}>
              Cake? of course!
            </button>
          )}
          {stage === 5 && (
            <button className="btn-primary-retro" onClick={handleLightCandle}>
              Don't forget to Light the Candle
            </button>
          )}
          {stage === 6 && (
            <button className="btn-primary-retro" onClick={handleHappyBirthday}>
              Happy Birthday
            </button>
          )}
          {stage === 7 && (
            <button className="btn-primary-retro animate-bounce" onClick={handleAmessageForYou}>
              A message for you
            </button>
          )}
        </div>
      )}

      {/* Fullscreen Polaroid Zoom Lightbox */}
      {zoomedImage && (
        <div className="lightbox" onClick={() => setZoomedImage(null)}>
          <img src={zoomedImage} alt="Enlarged Memory Polaroid" />
        </div>
      )}

    </div>
  );
};
