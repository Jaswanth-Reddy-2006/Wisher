import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import './style.css';

export const WeddingClassicSonali: React.FC<TemplateProps> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
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

  // Click-to-Play dynamic document trigger (traditional autoplay)
  const handleContainerClick = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.error("Audio playback blocked or failed:", err);
        });
    }
  };

  // Dynamic Date Formatting
  const getFormattedDate = () => {
    if (!data.date) return "29 November 2020";
    try {
      const d = new Date(data.date);
      const day = d.getDate();
      const month = d.toLocaleString('en-US', { month: 'long' });
      const year = d.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return "29 November 2020";
    }
  };

  const formattedDate = getFormattedDate();

  return (
    <div className="sonali-root" onClick={handleContainerClick}>
      {/* Falling Sakura Particles */}
      <div className="sakura-falling">
        {Array.from({ length: 18 }).map((_, i) => {
          const size = 10 + Math.random() * 12;
          return (
            <div
              key={i}
              className="sakura"
              style={{
                left: `${Math.random() * 95}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 8}s`,
                opacity: 0.5 + Math.random() * 0.5,
              }}
            />
          );
        })}
      </div>

      {/* Decorative Corner Flowers */}
      <img src="https://i.imgur.com/dGOOfnA.png" alt="image-top-right" className="top-right-decoration select-none pointer-events-none" />
      <img src="https://i.imgur.com/t6ffnbn.png" alt="image-top-left" className="top-left-decoration select-none pointer-events-none" />

      {/* Media section (Optional empty placeholder for matching original signature) */}
      <section id="media"></section>

      {/* Main Wrap Container */}
      <div className="wrap">
        <div className="title">
          <h1>{data.brideName || "Sonali"}</h1>
          <h2>&</h2>
          <h1>{data.groomName || "Gagan"}</h1>
          <h3>Are getting married</h3>
          <p>
            on <span className="date">{formattedDate}</span>, At <span className="place">{data.venueName || "Ashirwad Garden, Ratu Road, Ranchi"}</span>
          </p>
        </div>
      </div>

      {/* Countdown Timer Block (Replaced with exact static bubble as per screenshot) */}
      <div id="time">
        <span className="end-msg">Bless the married couple for happy life!</span>
      </div>

      {/* Dinner & Dancing Subtitle */}
      <p className="dance-med">{data.extraMessage || "dinner & dancing to follow"}</p>

      {/* Action Buttons */}
      <div className="actions">
        {data.googleMapsUrl && (
          <a href={data.googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <div className="venue">SEE THE VENUE</div>
          </a>
        )}
        <a 
          href={data.rsvpEmail ? `mailto:${data.rsvpEmail}?subject=RSVP%20Confirmation` : "https://github.com/vinitshahdeo/vinitshahdeo/raw/master/docs/Sonali%20%26%20Gagan.pdf"} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <div className="venue">
            {data.rsvpEmail ? "RSVP BY EMAIL" : "DOWNLOAD INVITATION CARD"}
          </div>
        </a>
      </div>

      {/* Footer Contact Details */}
      <p className="footer">
        Can't wait to celebrate auspicious moment of our family with you! <br />
        Just a ping away for any queries: {data.rsvpEmail || "+91 8210050314"}
        <span></span>
      </p>

      {/* Happiness & Social footer */}
      <p className="happiness" style={{ color: '#874562', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>
        Join us in our happiness!<br />
        <a href="https://twitter.com/Vinit_Shahdeo" target="_blank" rel="noopener noreferrer" className="twitter" style={{ color: '#874562' }}>
          <span style={{ fontSize: '18px', display: 'inline-block', marginTop: '8px' }}>🐦</span>
        </a>
      </p>

      {/* Play/Pause indicator for background music */}
      {data.musicUrl && (
        <p className="music-playing-indicator" style={{ fontSize: '11px', color: '#874562', fontStyle: 'italic', marginTop: '10px', textAlign: 'center' }}>
          {isPlaying ? "🎵 Music Playing (Click anywhere to restart) 🎵" : "🎵 Click anywhere to play traditional music 🎵"}
        </p>
      )}
    </div>
  );
};

export default WeddingClassicSonali;
