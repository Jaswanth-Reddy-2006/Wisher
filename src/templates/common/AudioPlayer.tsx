import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import gsap from 'gsap';

interface AudioPlayerProps {
  musicUrl?: string;
  musicName?: string;
  autoPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  musicUrl = '',
  musicName = 'Ambient Tune',
  autoPlay = true,
}) => {
  if (!musicUrl) {
    return null;
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [needGesture, setNeedGesture] = useState(autoPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Instantiate audio object
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0; // Start at 0 for fade in
    audioRef.current = audio;

    // Try to autoplay
    if (autoPlay) {
      audio.play()
        .then(() => {
          // If successful (browser allowed it), remove gesture overlay
          setNeedGesture(false);
          setIsPlaying(true);
          // Fade volume to 0.7
          gsap.to(audio, { volume: 0.7, duration: 2.5 });
        })
        .catch(() => {
          // Blocked by browser autoplay policy - require gesture overlay
          setNeedGesture(true);
        });
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [musicUrl, autoPlay]);

  const handleUnlock = () => {
    if (!audioRef.current) return;

    // GSAP animation to scale and fade out the overlay
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        onComplete: () => {
          setNeedGesture(false);
        },
      });
    } else {
      setNeedGesture(false);
    }

    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        // Smoothly fade in volume to 0.7
        gsap.to(audioRef.current, { volume: 0.7, duration: 2.0 });
      })
      .catch((err) => {
        console.error('Audio playback failed after gesture:', err);
      });
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // Fade out and pause
      gsap.to(audioRef.current, {
        volume: 0,
        duration: 0.5,
        onComplete: () => {
          audioRef.current?.pause();
          setIsPlaying(false);
        },
      });
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      // Fade back in
      gsap.to(audioRef.current, { volume: 0.7, duration: 1.0 });
    }
  };

  return (
    <>
      {/* Gesture overlay */}
      {needGesture && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-500"
        >
          <div className="mx-4 max-w-md rounded-3xl bg-[#f5f2eb] p-8 text-center shadow-2xl border border-white/20">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d30f0f]/10 text-[#d30f0f]">
              <Music className="h-8 w-8 animate-pulse" />
            </div>
            <h3 className="mb-2 font-display text-2xl font-bold text-[#111111]">
              Unlock Sound Experience
            </h3>
            <p className="mb-6 font-display text-sm text-[#5e5a52]">
              This site features a custom background soundtrack. Please unmute to enjoy the full 3D animated experience!
            </p>
            <button
              onClick={handleUnlock}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d30f0f] py-4 px-6 font-display text-base font-semibold text-white transition-all duration-300 hover:bg-[#b00c0c] hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_20px_rgba(211,15,15,0.3)] cursor-pointer"
            >
              <Volume2 className="h-5 w-5" />
              Unmute & Start Experience
            </button>
          </div>
        </div>
      )}

      {/* Floating corner control */}
      {!needGesture && (
        <div className="fixed top-4 right-4 z-40 flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-md px-4 py-2 shadow-lg border border-[#e5dfd3] select-none hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-semibold text-[#5e5a52] uppercase tracking-wider">Soundtrack</span>
            <span className="max-w-[120px] truncate text-xs font-bold text-[#111111]">{musicName}</span>
          </div>
          <button
            onClick={togglePlayback}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d30f0f] text-white hover:bg-[#b00c0c] active:scale-90 transition-all cursor-pointer shadow-md"
            aria-label={isPlaying ? 'Mute' : 'Unmute'}
          >
            {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      )}
    </>
  );
};
export default AudioPlayer;
