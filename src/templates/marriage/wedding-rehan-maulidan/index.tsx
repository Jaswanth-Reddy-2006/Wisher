import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import { Calendar, Clock, MapPin, Heart, ChevronDown, CheckCircle2, User, Users, MessageSquare } from 'lucide-react';
import './style.css';

export const WeddingRehanMaulidan: React.FC<TemplateProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown timer states
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isOver: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false });

  // Guestbook comments
  const [guestName, setGuestName] = useState('');
  const [guestWish, setGuestWish] = useState('');
  const [comments, setComments] = useState<Array<{ name: string; wish: string; date: string }>>([
    { name: "Rayhan Yulanda", wish: "Mohon doanya agar pernikahan kami dilimpahi keberkahan dan kebahagiaan dunia akhirat. Aamiin.", date: "10 mins ago" },
    { name: "Maulidan Nashuha", wish: "Terima kasih untuk ucapan dan doa tulusnya! Semoga kebahagiaan ini juga menyelimuti kita semua.", date: "5 mins ago" }
  ]);

  // RSVP Form
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState('yes');
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

  // Countdown clock timer logic
  useEffect(() => {
    const targetDateStr = data.date || "2026-11-27T18:00:00";
    const targetTime = new Date(targetDateStr).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        setTimeLeft(prev => ({ ...prev, isOver: true }));
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [data.date]);

  // Buka Undangan (Open Invitation Gate)
  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Audio blocked by browser autoplay:", err));
    }
  };

  // Toggle playback from floating sidebar
  const togglePlayState = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Guestbook submit BGM
  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestWish) return;
    setComments([
      { name: guestName, wish: guestWish, date: "Just now" },
      ...comments
    ]);
    setGuestName('');
    setGuestWish('');
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName) return;
    setRsvpSubmitted(true);
  };

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : "Jumat, 27 November 2026";

  return (
    <div className={`rehan-root ${isOpen ? 'unlocked scrollable' : 'locked'}`}>
      
      {/* 1. INTERACTIVE GATE OVERLAY (BUKA UNDANGAN) */}
      {!isOpen && (
        <div id="overlay">
          <div className="content animate-fade-in">
            <div className="container">
              <div className="row text-center space-y-6">
                <div className="col-md-8 col-md-offset-2 flex justify-center">
                  <img 
                    src="https://ngodingsolusi.github.io/the-wedding-of-rehan-maulidan/images/half%20circle%20flower-500.png" 
                    alt="Flower Header Logo" 
                    className="couple-main max-w-[280px] drop-shadow-md select-none pointer-events-none" 
                  />
                </div>
                <div className="col-md-8 col-md-offset-2 space-y-4">
                  <h1 className="font-serif text-4xl md:text-6xl font-black text-neutral-800 tracking-tight">
                    {data.groomName || "Rehan"} & {data.brideName || "Maulidan"}
                  </h1>
                  <p className="text-xs text-neutral-500 font-semibold tracking-wider">Kepada Bapak/Ibu/Saudara/i</p>
                  <p className="text-sm font-medium text-neutral-600 max-w-sm mx-auto leading-relaxed">
                    Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami.
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={handleOpenInvitation}
                      className="btn btn-primary px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      Buka Undangan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FLOATING CONTROLS & BGM MUSIC SIDEBAR */}
      {isOpen && (
        <div id="floating-button" className="float animate-fade-in z-50">
          <div className="control-center open flex flex-col items-center gap-2">
            <button 
              onClick={togglePlayState}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg border border-white/20 transition-all cursor-pointer ${
                isPlaying ? 'bg-[#113468] animate-spin' : 'bg-rose-500'
              }`}
              style={{ animationDuration: '6s' }}
            >
              <Heart className="h-4 w-4 fill-current" />
            </button>
            <span className="text-[8px] bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full select-none font-bold">
              {isPlaying ? "Playing BGM" : "Music Paused"}
            </span>
          </div>
        </div>
      )}

      {/* 3. HERO COVER HEADER SECTION */}
      {isOpen && (
        <>
          <header id="fh5co-header" className="fh5co-cover min-h-[100dvh] flex flex-col items-center justify-center relative bg-gradient-to-b from-[#f9fafb] to-[#f3f4f6] px-4">
            {/* Corner traditional flower SVGs from original Netlify */}
            <img 
              src="https://ngodingsolusi.github.io/the-wedding-of-rehan-maulidan/images/background/flowers/top-right-1.svg" 
              alt="corner-flower" 
              className="absolute top-0 right-0 w-[45%] max-w-[280px] pointer-events-none select-none z-10" 
            />
            <img 
              src="https://ngodingsolusi.github.io/the-wedding-of-rehan-maulidan/images/background/flowers/top-left-1.svg" 
              alt="corner-flower-left" 
              className="absolute top-0 left-0 w-[45%] max-w-[280px] pointer-events-none select-none z-10 animate-fade-in" 
            />

            <div className="container text-center space-y-6 z-10 relative">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#113468]">Wedding Celebration</span>
              <h1 className="font-serif text-5xl md:text-7xl font-extrabold text-neutral-800 leading-tight">
                {data.groomName || "Rehan"} &amp; {data.brideName || "Maulidan"}
              </h1>
              <p className="text-xs uppercase tracking-widest font-black text-[#113468]">Kami Akan Menikah</p>
              
              {/* Simply Countdown Timer Blocks */}
              <div className="simply-countdown flex justify-center items-center gap-4 py-6">
                {[
                  { val: timeLeft.days, label: "Days" },
                  { val: timeLeft.hours, label: "Hours" },
                  { val: timeLeft.minutes, label: "Mins" },
                  { val: timeLeft.seconds, label: "Secs" }
                ].map((item, idx) => (
                  <div key={idx} className="simply-section bg-white border border-neutral-200/60 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center shadow-sm">
                    <span className="simply-amount text-sm md:text-base font-extrabold text-[#113468]">{item.val}</span>
                    <span className="simply-word text-[8px] md:text-[9px] uppercase font-bold text-neutral-500 mt-0.5">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a href="#couple" className="btn btn-accent uppercase tracking-widest text-[9px] font-black py-3 px-6 rounded-full shadow-md">
                  View Invitation
                </a>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce select-none pointer-events-none z-10">
              <ChevronDown className="h-6 w-6 text-[#113468]/60" />
            </div>
          </header>

          {/* 4. "COUPLE" SECTION */}
          <section id="couple" className="couple-section py-20 px-6 bg-white border-b border-neutral-100">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#113468]">The Happy Couple</span>
                <h2 className="font-serif text-3xl font-black text-neutral-800">Groom &amp; Bride</h2>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  Assalamu’alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk menghadiri pernikahan kami.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                {/* Groom Info */}
                <div className="text-center space-y-4">
                  <div className="w-40 h-40 rounded-full border-2 border-[#113468]/30 mx-auto overflow-hidden bg-neutral-100 flex items-center justify-center">
                    <span className="text-6xl">🤵</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#113468]">{data.groomName || "Rehan"}</h3>
                  <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                    Putra pertama dari pasangan Bapak H. Ahmad &amp; Ibu Hj. Siti
                  </p>
                </div>

                {/* Bride Info */}
                <div className="text-center space-y-4">
                  <div className="w-40 h-40 rounded-full border-2 border-[#113468]/30 mx-auto overflow-hidden bg-neutral-100 flex items-center justify-center">
                    <span className="text-6xl">👰</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#113468]">{data.brideName || "Maulidan"}</h3>
                  <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                    Putri kedua dari pasangan Bapak H. Yulian &amp; Ibu Hj. Ningsih
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. "EVENTS & MAPS" SECTION */}
          <section id="events" className="events-section py-20 px-6 bg-neutral-50 border-b border-neutral-100">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#113468]">Events Schedule</span>
                <h2 className="font-serif text-3xl font-black text-neutral-800">Acara Pernikahan</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Akad Nikah */}
                <div className="bg-white rounded-3xl p-8 border border-neutral-200/50 shadow-sm flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#113468]/15 text-[#113468]">
                      <Heart className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-neutral-800">Akad Nikah</h3>
                      <p className="text-[10px] text-neutral-500 font-bold mt-1">Acara ijab kabul sakral.</p>
                    </div>
                    <div className="space-y-2 border-t border-neutral-100 pt-4 text-xs font-bold text-neutral-600">
                      <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#113468]" /> {data.weddingTime || "09:00 WIB"}</div>
                      <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#113468]" /> {formattedDate}</div>
                      <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#113468]" /> {data.venueName || "Gedung Serbaguna, Jakarta"}</div>
                    </div>
                  </div>
                  {data.googleMapsUrl && (
                    <a href={data.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-center font-bold text-xs uppercase tracking-wider py-3 rounded-xl border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center gap-1.5 transition-all">
                      Petunjuk Arah Maps <MapPin className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                {/* Resepsi */}
                <div className="bg-white rounded-3xl p-8 border border-neutral-200/50 shadow-sm flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#113468]/15 text-[#113468]">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-neutral-800">Resepsi Pernikahan</h3>
                      <p className="text-[10px] text-neutral-500 font-bold mt-1">Perayaan walimatul ursy.</p>
                    </div>
                    <div className="space-y-2 border-t border-neutral-100 pt-4 text-xs font-bold text-neutral-600">
                      <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#113468]" /> 11:00 WIB - Selesai</div>
                      <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#113468]" /> {formattedDate}</div>
                      <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#113468]" /> {data.venueName || "Gedung Serbaguna, Jakarta"}</div>
                    </div>
                  </div>
                  <a href="#rsvp" className="btn btn-primary text-center font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md">
                    Konfirmasi RSVP <CheckCircle2 className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 6. "MEMORIES" PHOTO GALLERY */}
          <section id="gallery" className="gallery-section py-20 px-6 bg-white border-b border-neutral-100">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#113468]">Galeri Foto</span>
                <h2 className="font-serif text-3xl font-black text-neutral-800">Kenangan Bahagia</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[data.photo1, data.photo2, data.photo3, data.photo4].map((photo, i) => (
                  <div key={i} className="gallery-polaroid bg-white border border-neutral-200/60 p-3 pb-8 rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                    {photo ? (
                      <img src={photo} alt={`Memory ${i + 1}`} className="w-full aspect-square object-cover rounded-xl" />
                    ) : (
                      <div className="bg-neutral-50 aspect-square w-full rounded-xl flex items-center justify-center text-4xl text-[#113468]/30 select-none">
                        🌸
                      </div>
                    )}
                    <div className="text-center font-serif text-[10px] text-neutral-500 italic mt-3">
                      Moments #{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. "RSVP" REGISTRATION FORM */}
          <section id="rsvp" className="rsvp-section py-20 px-6 bg-neutral-50 border-b border-neutral-100">
            <div className="max-w-xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#113468]">Kehadiran</span>
                <h2 className="font-serif text-3xl font-black text-neutral-800">Apakah Anda Hadir?</h2>
                <p className="text-xs text-neutral-500 font-semibold max-w-xs mx-auto leading-relaxed">
                  Silahkan konfirmasi kehadiran Anda melalui form di bawah ini sebelum hari pelaksanaan.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-neutral-200/60 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#113468]" />
                
                {rsvpSubmitted ? (
                  <div className="text-center py-10 space-y-4 animate-scaleUp">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                    <h4 className="font-serif text-xl font-bold text-neutral-800">Konfirmasi RSVP Berhasil!</h4>
                    <p className="text-xs leading-relaxed text-neutral-500 font-semibold max-w-xs mx-auto">
                      Terima kasih atas konfirmasinya, {rsvpName}. Kehadiran Anda sangat berharga bagi kami. Sampai jumpa di hari bahagia!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-[#113468]" /> Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-[#113468] focus:ring-1 focus:ring-[#113468] transition-all"
                        placeholder="e.g. Rayhan Yulanda"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                        Kehadiran Anda
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('yes')}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                            rsvpStatus === 'yes'
                              ? 'border-[#113468] bg-[#113468]/5 text-[#113468]'
                              : 'border-neutral-200 bg-white text-neutral-500'
                          }`}
                        >
                          Hadir, Tentu! 🌸
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('no')}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                            rsvpStatus === 'no'
                              ? 'border-[#113468] bg-[#113468]/5 text-[#113468]'
                              : 'border-neutral-200 bg-white text-neutral-500'
                          }`}
                        >
                          Maaf, Tidak Bisa
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-sans text-xs font-black uppercase tracking-widest text-white transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-[#113468] hover:bg-[#0c254b]"
                    >
                      Kirim Kehadiran
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

          {/* 8. "WISHES / GUESTBOOK" Ucapan dan Doa Restu */}
          <section id="guestbook" className="guestbook-section py-20 px-6 bg-white border-b border-neutral-100">
            <div className="max-w-xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#113468]">Buku Tamu</span>
                <h2 className="font-serif text-3xl font-black text-neutral-800">Ucapan &amp; Doa Restu</h2>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                  Berikan ucapan hangat, doa, dan restu Anda bagi kedua mempelai bahagia.
                </p>
              </div>

              {/* Guestbook input form */}
              <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-200/60 shadow-sm">
                <form onSubmit={handleAddWish} className="space-y-4">
                  <div className="space-y-1.5">
                    <input 
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Nama Anda"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-800 focus:outline-none focus:border-[#113468] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <textarea 
                      required
                      rows={3}
                      value={guestWish}
                      onChange={(e) => setGuestWish(e.target.value)}
                      placeholder="Tulis ucapan & doa restu Anda disini..."
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-800 focus:outline-none focus:border-[#113468] transition-all resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#113468] text-white text-xs font-black uppercase tracking-wider hover:bg-[#0c254b] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Kirim Ucapan <MessageSquare className="h-4 w-4" />
                  </button>
                </form>
              </div>

              {/* Guestbook Wishes List Container */}
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mt-8 border-t border-neutral-100 pt-6">
                {comments.map((comment, idx) => (
                  <div key={idx} className="bg-neutral-50 p-5 rounded-2xl border border-neutral-100/60 space-y-2 text-left relative animate-scaleUp">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-[#113468]">{comment.name}</span>
                      <span className="text-[9px] text-neutral-400 font-bold">{comment.date}</span>
                    </div>
                    <p className="text-xs text-neutral-600 font-medium leading-relaxed italic">
                      "{comment.wish}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 9. FOOTER */}
          <footer className="footer-credits py-16 px-6 bg-[#1f2937] text-center text-white/50 text-xs">
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#f05f70] mb-2">Terima Kasih</p>
            <p>Merupakan kebahagiaan bagi kami apabila Anda berkenan hadir.</p>
            <p className="mt-4 text-[9px]">© 2026 {data.groomName || "Rehan"} &amp; {data.brideName || "Maulidan"}. All Rights Reserved.</p>
            
            {/* Traditional BGM toggle */}
            {data.musicUrl && (
              <p onClick={togglePlayState} className="mt-4 text-[#f05f70] font-black cursor-pointer hover:underline select-none">
                {isPlaying ? "🎵 Traditional BGM Playing (Tap to Pause) 🎵" : "🎵 Tap to Play Traditional BGM 🎵"}
              </p>
            )}
          </footer>
        </>
      )}
    </div>
  );
};

export default WeddingRehanMaulidan;
