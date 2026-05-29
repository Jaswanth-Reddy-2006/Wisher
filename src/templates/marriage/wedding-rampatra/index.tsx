import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import { Calendar, Clock, MapPin, Heart, ChevronDown, CheckCircle2, User, Mail, Users, ExternalLink } from 'lucide-react';
import './style.css';

export const WeddingRampatra: React.FC<TemplateProps> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpAttending, setRsvpAttending] = useState('yes');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Initialize background BGM
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

  // Autoplay music on any document click
  const handleContainerClick = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Audio playback blocked:", err));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName) return;
    setRsvpSubmitted(true);
  };

  // Format date for displays
  const getFormattedDate = () => {
    if (!data.date) return "November 27, 2026";
    try {
      return new Date(data.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return "November 27, 2026";
    }
  };

  const formattedDate = getFormattedDate();

  // Create Add to Calendar url
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${data.brideName || "Antara"} & ${data.groomName || "Ram"} Wedding`);
    const details = encodeURIComponent(data.message || "We would like to invite you to our big day!");
    const location = encodeURIComponent(data.venueName || "Grand Lawn, Bangalore");
    
    let dateStr = "20261127T180000Z/20261127T220000Z";
    if (data.date) {
      try {
        const start = new Date(data.date);
        const end = new Date(start.getTime() + 4 * 60 * 60 * 1000); // +4 hours
        const formatCalDate = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
        dateStr = `${formatCalDate(start)}/${formatCalDate(end)}`;
      } catch {}
    }
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}&details=${details}&location=${location}`;
  };

  // Create Uber link
  const getUberUrl = () => {
    const venue = encodeURIComponent(data.venueName || "Grand Lawn, Bangalore");
    return `https://m.uber.com/ul/?action=setPickup&dropoff[formattedAddress]=${venue}`;
  };

  return (
    <div className="rampatra-root" onClick={handleContainerClick}>
      {/* 1. STICKY HEADER NAVIGATION */}
      <section className="navigation">
        <header>
          <div className="header-content">
            <div className="logo">
              <a href="#top">
                <span className="font-serif text-[#f05f70] font-black tracking-widest text-lg md:text-xl">
                  {data.brideName ? data.brideName[0] : "A"}&{data.groomName ? data.groomName[0] : "R"}
                </span>
              </a>
            </div>
            <div className="header-nav">
              <nav>
                <ul className="primary-nav">
                  <li><a href="#invitation">Hitched</a></li>
                  <li><a href="#story">Our Story</a></li>
                  <li><a href="#events">Events</a></li>
                  <li><a href="#gallery">Gallery</a></li>
                </ul>
                <ul className="member-actions">
                  <li><a href="#rsvp" className="btn-white btn-small">RSVP</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </section>

      {/* 2. FULLSCREEN PARALLAX HERO SECTION */}
      <section id="top" className="hero-section" style={{ backgroundImage: `url('${data.bgImage || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80"}')` }}>
        <div className="hero-overlay" />
        
        <div className="hero-container z-10 text-center text-white px-4">
          <div className="space-y-6">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center bg-black/10 backdrop-blur-sm animate-pulse">
                <Heart className="h-8 w-8 fill-[#f05f70] text-[#f05f70]" />
              </div>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
              {data.brideName || "Antara"} <span className="text-xl md:text-2xl font-normal block md:inline my-2 md:mx-4 font-sans text-white/70">and</span> {data.groomName || "Ram"}
            </h1>
            
            <p className="text-base md:text-lg uppercase tracking-[0.25em] font-extrabold text-[#f05f70] drop-shadow-md select-none mt-2">
              Are Getting Hitched!
            </p>

            <div className="pt-8">
              <a href="#rsvp" className="btn btn-accent uppercase tracking-widest text-xs font-black shadow-lg">
                RSVP Now
              </a>
            </div>
          </div>
        </div>

        <div className="down-arrow floating-arrow z-10">
          <a href="#invitation">
            <ChevronDown className="h-8 w-8 text-white/80 hover:text-white" />
          </a>
        </div>
      </section>

      {/* 3. THE INVITATION SPLASH */}
      <section id="invitation" className="invitation-section py-20 px-6 text-center bg-white border-b border-neutral-100 relative">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="font-serif text-3xl font-black text-[#1f2937]">We are getting hitched!</h3>
          <p className="text-sm md:text-base text-neutral-500 font-medium leading-relaxed">
            {data.message || "We request the pleasure of your company as we celebrate our marriage committment. The ceremony dates are set, and we would absolutely love for you to be a part of it."}
          </p>
          <div className="h-0.5 w-16 bg-[#f05f70] mx-auto mt-4" />
        </div>
      </section>

      {/* 4. "OUR STORY" TIMELINE */}
      <section id="story" className="story-section py-20 px-6 bg-neutral-50 border-b border-neutral-100">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#f05f70]">Our Timeline</span>
            <h2 className="font-serif text-3xl font-black text-[#1f2937]">How We Met</h2>
          </div>

          <div className="relative border-l-2 border-[#f05f70]/30 ml-4 md:ml-1/2 md:translate-x-[-1px] space-y-12 pl-8 md:pl-0">
            {/* Timeline Item 1 */}
            <div className="relative md:w-1/2 md:ml-auto md:pl-12">
              <div className="absolute -left-[42px] md:-left-[9px] top-1 w-4 h-4 rounded-full border-2 border-[#f05f70] bg-white z-10" />
              <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-2 hover:shadow-md transition-shadow">
                <span className="text-xs font-bold text-[#f05f70] tracking-wider block">First Introduction</span>
                <h4 className="font-serif text-lg font-bold text-neutral-800">The First Meeting</h4>
                <p className="text-xs leading-relaxed text-neutral-500 font-medium">
                  We met through common circles, finding an instant spark of understanding, shared laughter, and stories.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative md:w-1/2 md:mr-auto md:pr-12 md:text-right">
              <div className="absolute -left-[42px] md:left-auto md:-right-[9px] top-1 w-4 h-4 rounded-full border-2 border-[#f05f70] bg-white z-10" />
              <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-2 hover:shadow-md transition-shadow">
                <span className="text-xs font-bold text-[#f05f70] tracking-wider block">First Date</span>
                <h4 className="font-serif text-lg font-bold text-neutral-800">Coffee & Endless Chat</h4>
                <p className="text-xs leading-relaxed text-neutral-500 font-medium">
                  A quick hour coffee date turned into a beautiful four-hour chat, discussing everything under the sky.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative md:w-1/2 md:ml-auto md:pl-12">
              <div className="absolute -left-[42px] md:-left-[9px] top-1 w-4 h-4 rounded-full border-2 border-[#f05f70] bg-white z-10" />
              <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-2 hover:shadow-md transition-shadow">
                <span className="text-xs font-bold text-[#f05f70] tracking-wider block">The Proposal</span>
                <h4 className="font-serif text-lg font-bold text-neutral-800">Saying Yes! ❤️</h4>
                <p className="text-xs leading-relaxed text-neutral-500 font-medium">
                  Under the glowing starry sky, we promised each other a lifetime of love, growth, and sharing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "EVENTS" CARDS & UBER SERVICE */}
      <section id="events" className="events-section py-20 px-6 bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#f05f70]">Celebrations</span>
            <h2 className="font-serif text-3xl font-black text-[#1f2937]">Wedding Schedule</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event 1 */}
            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f05f70]/10 text-[#f05f70]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-neutral-800">Ceremony & Hitching</h3>
                  <p className="text-xs text-neutral-500 font-semibold mt-1">The grand exchanging of vows.</p>
                </div>
                <div className="space-y-2 border-t border-neutral-200/60 pt-4 text-xs font-bold text-neutral-600">
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#f05f70]" /> {data.weddingTime || "6:00 PM onwards"}</div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#f05f70]" /> {formattedDate}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#f05f70]" /> {data.venueName || "Grand Lawn, Bangalore"}</div>
                </div>
              </div>
              <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-center font-bold text-xs uppercase tracking-wider py-3 rounded-xl border border-neutral-200 flex items-center justify-center gap-1.5 hover:bg-neutral-100 transition-colors">
                Add to Calendar <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Event 2 */}
            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f05f70]/10 text-[#f05f70]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-neutral-800">Wedding Banquet</h3>
                  <p className="text-xs text-neutral-500 font-semibold mt-1">Dinner, dancing, toasts, and cake.</p>
                </div>
                <div className="space-y-2 border-t border-neutral-200/60 pt-4 text-xs font-bold text-neutral-600">
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#f05f70]" /> + 2 Hours from Ceremony</div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#f05f70]" /> {formattedDate}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#f05f70]" /> Main Banquet Gardens</div>
                </div>
              </div>
              <a href={getUberUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-accent text-center font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md">
                🚕 Book ride with Uber
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "MEMORIES" PHOTO GALLERY */}
      <section id="gallery" className="gallery-section py-20 px-6 bg-neutral-50 border-b border-neutral-100">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#f05f70]">Our Memories</span>
            <h2 className="font-serif text-3xl font-black text-[#1f2937]">Engagement Gallery</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[data.photo1, data.photo2, data.photo3, data.photo4].map((photo, i) => (
              <div key={i} className="rampatra-polaroid bg-white border border-neutral-200/60 p-3 pb-8 rounded shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                {photo ? (
                  <img src={photo} alt={`Engagement ${i + 1}`} className="w-full aspect-square object-cover rounded-sm" />
                ) : (
                  <div className="bg-neutral-100 aspect-square w-full rounded flex items-center justify-center text-4xl text-[#f05f70]/30 select-none">
                    💖
                  </div>
                )}
                <div className="text-center font-serif text-[10px] text-neutral-500 italic mt-3">
                  Engagement Day #{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. "VENUE MAP" SECTION */}
      {data.googleMapsUrl && (
        <section id="map" className="map-section py-20 px-6 bg-white border-b border-neutral-100">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#f05f70]">Location Map</span>
              <h2 className="font-serif text-3xl font-black text-[#1f2937]">How to Reach Venue</h2>
            </div>
            
            <div className="bg-neutral-50 p-4 rounded-3xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col items-center">
              <div className="w-full h-80 bg-neutral-200 rounded-2xl overflow-hidden flex items-center justify-center relative">
                {/* Embed standard maps iframe dynamically or clean coordinate image */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15552.023249051833!2d77.580234!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjciTiA3N8KwMzQnNDguOCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                  className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-300"
                  allowFullScreen
                  loading="lazy"
                  title="Venue Maps"
                />
              </div>
              <a href={data.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary font-bold text-xs uppercase tracking-widest mt-4 py-3 px-8 rounded-xl border border-neutral-200 flex items-center gap-1.5 hover:bg-neutral-100 transition-colors">
                <MapPin className="h-4 w-4 text-[#f05f70]" /> Navigate with Maps
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 8. "RSVP" FORM SUBMIT */}
      <section id="rsvp" className="rsvp-section py-20 px-6 bg-neutral-50 text-[#1f2937]">
        <div className="max-w-xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#f05f70]">Confirm Presence</span>
            <h2 className="font-serif text-3xl font-black">Will You Attend?</h2>
            <p className="text-xs text-neutral-500 font-medium max-w-xs mx-auto">
              Please RSVP by submitting the attendance form below before November.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-neutral-200/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#f05f70]" />
            
            {rsvpSubmitted ? (
              <div className="text-center py-10 space-y-4 animate-scaleUp">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-neutral-800">RSVP Confirmed!</h4>
                <p className="text-xs leading-relaxed text-neutral-500 font-semibold max-w-xs mx-auto">
                  Thank you, {rsvpName}! We are extremely thrilled to celebrate this memorable day with you! Hosts have been updated.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-[#f05f70]" /> Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-[#1f2937] focus:outline-none focus:border-[#f05f70] focus:ring-1 focus:ring-[#f05f70] transition-all"
                    placeholder="e.g. Ram Prasad"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-[#f05f70]" /> Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={rsvpEmail}
                    onChange={(e) => setRsvpEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-[#1f2937] focus:outline-none focus:border-[#f05f70] focus:ring-1 focus:ring-[#f05f70] transition-all"
                    placeholder="e.g. guest@wisher.net"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-[#f05f70]" /> Number of Guests
                  </label>
                  <select
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-[#1f2937] focus:outline-none focus:border-[#f05f70] focus:ring-1 focus:ring-[#f05f70] transition-all"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                    Are You Attending?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('yes')}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        rsvpAttending === 'yes'
                          ? 'border-[#f05f70] bg-[#f05f70]/5 text-[#f05f70]'
                          : 'border-neutral-200 bg-white text-neutral-500'
                      }`}
                    >
                      Yes, Hitched! 🎉
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('no')}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        rsvpAttending === 'no'
                          ? 'border-[#f05f70] bg-[#f05f70]/5 text-[#f05f70]'
                          : 'border-neutral-200 bg-white text-neutral-500'
                      }`}
                    >
                      Sorry, Cannot
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-sans text-xs font-black uppercase tracking-widest text-white transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-[#f05f70] hover:bg-[#d04958]"
                >
                  Send RSVP
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="footer-credits py-12 px-6 bg-[#18181b] text-center text-white/50 text-xs">
        <p>Built with love for the beautiful day.</p>
        <p className="mt-2 text-[10px]">© 2026 {data.brideName || "Antara"} & {data.groomName || "Ram"}. All Rights Reserved.</p>
        
        {/* Play/Pause indicator for background music */}
        {data.musicUrl && (
          <p className="mt-4 text-[#f05f70] font-bold cursor-pointer hover:underline select-none">
            {isPlaying ? "🎵 Traditional BGM Playing (Tap anywhere to restart) 🎵" : "🎵 Tap anywhere to play traditional BGM 🎵"}
          </p>
        )}
      </footer>
    </div>
  );
};

export default WeddingRampatra;
