import React, { useState } from 'react';
import { Calendar, MapPin, Mail, Clock, Heart, CheckCircle2, Home, Gift, Sparkles, Cake, Trophy } from 'lucide-react';
import type { WishData } from '../types';
import Countdown from './Countdown';
import { fireConfetti } from './CanvasConfetti';
import { getTemplateById } from '../index';

interface TemplateWebsiteLayoutProps {
  data: WishData;
  primaryColor: string;
  type: WishData['templateType'];
}

export const TemplateWebsiteLayout: React.FC<TemplateWebsiteLayoutProps> = ({
  data,
  primaryColor,
  type,
}) => {
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpGuestCount, setRsvpGuestCount] = useState('1');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  
  // Birthday interactive states
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);
  const [openedGifts, setOpenedGifts] = useState<{ [key: number]: boolean }>({ 0: false, 1: false, 2: false });

  const activeTemplate = getTemplateById(type);
  const category = activeTemplate?.category || 'Birthday';

  const isWedding = category === 'Wedding';
  const isHousewarming = category === 'House Warming';
  const isGraduation = category === 'Graduation';
  const isBabyShower = category === 'Baby Shower';
  const isBirthday = category === 'Birthday';

  const handleBlowOut = () => {
    if (candlesBlownOut) return;
    setCandlesBlownOut(true);
    fireConfetti(primaryColor);
    setTimeout(() => fireConfetti('#38bdf8'), 250);
    setTimeout(() => fireConfetti('#f43f5e'), 500);
  };

  const handleOpenGift = (index: number) => {
    if (openedGifts[index]) return;
    setOpenedGifts({
      ...openedGifts,
      [index]: true
    });
    fireConfetti(primaryColor);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName) return;
    setRsvpSubmitted(true);
    fireConfetti(primaryColor);
  };

  // Format date nicely
  const getFormattedDate = () => {
    if (!data.date) return null;
    try {
      const d = new Date(data.date);
      return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return null;
    }
  };

  const getFormattedTime = () => {
    if (!data.date) return null;
    try {
      const d = new Date(data.date);
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return null;
    }
  };

  const formattedDate = getFormattedDate();
  const formattedTime = getFormattedTime();

  if (isBirthday) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 pb-24 space-y-16 mt-12 z-20 text-[#111111] font-sans relative">
        <style>{`
          @keyframes float-balloon {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(-20vh) rotate(20deg); opacity: 0; }
          }
          .balloon-1 { animation: float-balloon 15s infinite linear; left: 5%; }
          .balloon-2 { animation: float-balloon 12s infinite linear 3s; left: 25%; }
          .balloon-3 { animation: float-balloon 18s infinite linear 6s; left: 65%; }
          .balloon-4 { animation: float-balloon 14s infinite linear 9s; left: 85%; }
          
          @keyframes flicker {
            0% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.1) rotate(5deg); opacity: 1; }
            100% { transform: scale(1) rotate(-5deg); opacity: 0.9; }
          }
          .candle-flame {
            animation: flicker 0.6s infinite ease-in-out;
          }
        `}</style>

        {/* Floating Balloons overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <div className="absolute bottom-0 w-8 h-10 rounded-t-full rounded-b-3xl balloon-1 flex items-center justify-center" style={{ backgroundColor: `${primaryColor}60` }}>
            <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60 absolute top-2 left-2" />
          </div>
          <div className="absolute bottom-0 w-10 h-12 rounded-t-full rounded-b-3xl balloon-2 flex items-center justify-center" style={{ backgroundColor: '#38bdf860' }}>
            <div className="w-2 h-2 bg-white rounded-full opacity-60 absolute top-2 left-2" />
          </div>
          <div className="absolute bottom-0 w-7 h-9 rounded-t-full rounded-b-3xl balloon-3 flex items-center justify-center" style={{ backgroundColor: '#fbbf2460' }}>
            <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60 absolute top-2 left-2" />
          </div>
          <div className="absolute bottom-0 w-9 h-11 rounded-t-full rounded-b-3xl balloon-4 flex items-center justify-center" style={{ backgroundColor: '#34d39960' }}>
            <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60 absolute top-2 left-2" />
          </div>
        </div>

        {/* SECTION 1: THE BIRTHDAY GREETING CARD */}
        <section className="bg-white/85 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-[#e5dfd3] shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl z-10">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400" />
          
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#5e5a52] mb-3">
                Birthday Wishes
              </span>
              <Cake className="h-8 w-8 mb-4 animate-bounce text-pink-500" style={{ color: primaryColor }} />
              <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-2">
                Happy Birthday, {data.targetName || "Celebrant"}!
              </h2>
            </div>

            <h3 className="text-lg font-bold tracking-tight italic" style={{ color: primaryColor }}>
              "{data.title || "Celebrating another wonderful year!"}"
            </h3>

            <div className="h-[1px] w-20 mx-auto my-6 bg-gradient-to-r from-transparent via-[#cbd5e1] to-transparent" />

            <p className="text-base md:text-lg text-[#334155] leading-relaxed font-semibold italic">
              "{data.message || "May this special day be filled with laughter, love, and all the sweet moments you deserve. Cheers to another beautiful year of memories!"}"
            </p>
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE CAKE (BLOW OUT CANDLES) */}
        <section className="bg-white/85 backdrop-blur-md rounded-3xl p-8 border border-[#e5dfd3] shadow-lg text-center space-y-6 z-10 relative flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#111111]">
              Make a Birthday Wish
            </h3>
          </div>
          
          <div className="flex flex-col items-center gap-4 my-2">
            {/* The Cake */}
            <div 
              onClick={handleBlowOut}
              className="relative cursor-pointer group hover:scale-[1.03] transition-all duration-300 flex flex-col items-center select-none"
            >
              {/* Flames / Candles */}
              <div className="flex gap-6 mb-[-2px] z-10">
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="relative flex flex-col items-center">
                    {/* Flame */}
                    {!candlesBlownOut && (
                      <div className="w-3.5 h-5 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-200 rounded-full candle-flame shadow-[0_0_10px_#f97316] absolute -top-5" />
                    )}
                    {/* Candle Body */}
                    <div className="w-2.5 h-8 bg-gradient-to-b from-blue-300 via-pink-200 to-yellow-200 border-l border-r border-slate-400/10 rounded-sm" />
                  </div>
                ))}
              </div>

              {/* Cake Body */}
              <div className="w-48 h-20 bg-amber-50/90 border border-amber-100/50 rounded-t-2xl relative overflow-hidden shadow-md flex flex-col justify-end">
                {/* Sprinkles decoration */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ec4899_1.5px,transparent_1.5px)] [background-size:12px_12px]" />
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] [background-position:6px_6px]" />
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:14px_14px] [background-position:4px_10px]" />
                
                {/* Icing drip */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-pink-300 rounded-t-2xl" style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }} />
                {/* Cake plate */}
                <div className="w-56 h-3 bg-slate-200 border-b border-slate-300 rounded-full mx-auto" />
              </div>
            </div>
            
            {/* Help / Greeting Text */}
            <div className="text-center">
              {candlesBlownOut ? (
                <div className="animate-scaleUp text-center space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200">
                    <Sparkles className="h-3.5 w-3.5" /> Wishes Sent to the Stars!
                  </span>
                  <p className="text-xs font-semibold text-[#5e5a52] mt-1">
                    May all your birthday dreams and wishes come true!
                  </p>
                </div>
              ) : (
                <p className="text-xs font-extrabold text-[#5e5a52] animate-pulse">
                  🎂 Click the cake to blow out the candles & make a wish!
                </p>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 3: VIRTUAL GIFTS UNWRAPPING */}
        <section className="bg-white/85 backdrop-blur-md rounded-3xl p-8 border border-[#e5dfd3] shadow-lg text-center space-y-6 z-10 relative">
          <div className="flex flex-col items-center gap-1.5">
            <Gift className="h-5 w-5 text-purple-500" />
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#111111]">
              Unwrap Your Birthday Gifts
            </h3>
            <p className="text-[10px] text-[#5e5a52] font-semibold">
              Click each gift box to reveal a special blessing!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Gift of Joy", icon: "🎈", message: "Wishing you a year filled with laughter, adventure, and endless happy moments! 🌟", color: "from-rose-500 to-pink-500", ribbon: "bg-amber-300" },
              { title: "Gift of Wisdom", icon: "🕊️", message: "May this new chapter bring you clarity, peace of mind, and meaningful connections! ✨", color: "from-sky-500 to-indigo-500", ribbon: "bg-yellow-400" },
              { title: "Gift of Sweetness", icon: "🍰", message: "Sending you double the smiles, triple the warmth, and infinite sweet memories today! 🧁", color: "from-purple-500 to-fuchsia-500", ribbon: "bg-pink-300" }
            ].map((gift, idx) => {
              const isOpened = openedGifts[idx];
              return (
                <div 
                  key={idx}
                  onClick={() => handleOpenGift(idx)}
                  className={`bg-white border border-[#e5dfd3] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[160px] cursor-pointer shadow-sm transition-all duration-500 select-none ${
                    isOpened ? 'scale-[1.02] shadow-md border-purple-200 bg-purple-50/10' : 'hover:scale-[1.04] active:scale-[0.98]'
                  }`}
                >
                  {isOpened ? (
                    <div className="text-center space-y-3 animate-scaleUp">
                      <span className="text-3xl">{gift.icon}</span>
                      <h4 className="font-display text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                        {gift.title}
                      </h4>
                      <p className="text-[11px] text-[#5e5a52] font-medium leading-relaxed">
                        {gift.message}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 w-full h-full relative">
                      {/* Wrapped Gift Box */}
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${gift.color} relative shadow-md flex items-center justify-center transition-all duration-300`}>
                        {/* Horizontal ribbon */}
                        <div className={`absolute top-1/2 left-0 right-0 h-3 -translate-y-1/2 ${gift.ribbon} opacity-90`} />
                        {/* Vertical ribbon */}
                        <div className={`absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 ${gift.ribbon} opacity-90`} />
                        {/* Ribbon Bow */}
                        <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-3 rounded-full ${gift.ribbon} opacity-95`} />
                        
                        <span className="text-xl relative z-10 text-white font-bold">?</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider block mt-1">
                        Unwrap {gift.title}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: PHOTO GALLERY / MEMORIES */}
        <section className="bg-white/85 backdrop-blur-md rounded-3xl p-8 border border-[#e5dfd3] shadow-lg text-center space-y-6 z-10 relative">
          <div className="flex flex-col items-center gap-1.5">
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#111111]">
              Birthday Memories
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 py-2">
            {/* Polaroid 1 */}
            <div className="bg-[#faf8f5] border border-[#e5dfd3] p-3 pb-8 rounded shadow-md rotate-[-4deg] w-[200px] hover:rotate-0 hover:scale-105 transition-all duration-300 shrink-0">
              <div className="bg-gradient-to-tr from-pink-100 to-rose-200 aspect-square w-full rounded-sm flex items-center justify-center text-4xl">
                🎂
              </div>
              <div className="text-center font-wedding-serif text-xs italic text-[#5e5a52] mt-3">
                Making a Wish
              </div>
            </div>

            {/* Polaroid 2 */}
            <div className="bg-[#faf8f5] border border-[#e5dfd3] p-3 pb-8 rounded shadow-md rotate-[2deg] w-[210px] hover:rotate-0 hover:scale-105 transition-all duration-300 shrink-0">
              {data.bgImage ? (
                <img 
                  src={data.bgImage} 
                  alt="Birthday Memory" 
                  className="w-full aspect-square object-cover rounded-sm"
                />
              ) : (
                <div className="bg-gradient-to-tr from-amber-100 to-yellow-200 aspect-square w-full rounded-sm flex items-center justify-center text-4xl">
                  🎉
                </div>
              )}
              <div className="text-center font-wedding-serif text-xs italic text-[#5e5a52] mt-3">
                Best Day Ever!
              </div>
            </div>

            {/* Polaroid 3 */}
            <div className="bg-[#faf8f5] border border-[#e5dfd3] p-3 pb-8 rounded shadow-md rotate-[-2deg] w-[200px] hover:rotate-0 hover:scale-105 transition-all duration-300 shrink-0">
              <div className="bg-gradient-to-tr from-purple-100 to-indigo-200 aspect-square w-full rounded-sm flex items-center justify-center text-4xl">
                🎈
              </div>
              <div className="text-center font-wedding-serif text-xs italic text-[#5e5a52] mt-3">
                Laughter & Fun
              </div>
            </div>
          </div>
        </section>


      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 pb-24 space-y-16 mt-12 z-20 text-[#111111] font-sans">
      
      {/* SECTION 1: THE LETTER SECTION */}
      <section className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-[#e5dfd3] shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: primaryColor }} />
        
        <div className="text-center max-w-2xl mx-auto space-y-6">
          {isWedding ? (
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#5e5a52] mb-3">
                Wedding Invitation
              </span>
              <Heart className="h-6 w-6 mb-4 animate-pulse" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                {data.brideName && data.groomName ? `${data.brideName} & ${data.groomName}` : (data.targetName || "Sarah & David")}
              </h2>
              {data.brideName && data.groomName && (
                <div className="mt-6 grid grid-cols-2 gap-8 w-full max-w-md mx-auto bg-neutral-50/50 p-6 rounded-2xl border border-neutral-100">
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider block mb-1">Bride</span>
                    <span className="font-serif text-base font-bold text-neutral-800">{data.brideName}</span>
                  </div>
                  <div className="text-center border-l border-neutral-200">
                    <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider block mb-1">Groom</span>
                    <span className="font-serif text-base font-bold text-neutral-800">{data.groomName}</span>
                  </div>
                </div>
              )}
            </div>
          ) : isHousewarming ? (
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#5e5a52] mb-3">
                Housewarming Ceremony
              </span>
              <Home className="h-6 w-6 mb-4" style={{ color: primaryColor }} />
              <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-2">
                {data.targetName || "The Sharma Family"}
              </h2>
            </div>
          ) : isGraduation ? (
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#5e5a52] mb-3">
                Graduation Commencement
              </span>
              <Trophy className="h-6 w-6 mb-4 text-amber-500 animate-bounce" style={{ color: primaryColor }} />
              <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-2">
                {data.targetName || "The Graduate"}
              </h2>
            </div>
          ) : isBabyShower ? (
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#5e5a52] mb-3">
                Baby Shower Celebration
              </span>
              <Sparkles className="h-6 w-6 mb-4 text-rose-400 animate-spin" style={{ animationDuration: '3s', color: primaryColor }} />
              <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-2">
                {data.targetName || "Baby Boy Thompson"}
              </h2>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#5e5a52] mb-3">
                Birthday Celebration
              </span>
              <Gift className="h-6 w-6 mb-4" style={{ color: primaryColor }} />
              <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-2">
                {data.targetName || "Alex Mercer"}
              </h2>
            </div>
          )}

          <h3 className="text-lg font-bold tracking-tight italic" style={{ color: primaryColor }}>
            "{data.title || "Join Us in Celebrating!"}"
          </h3>

          <div className="h-[1px] w-20 mx-auto my-6 bg-gradient-to-r from-transparent via-[#cbd5e1] to-transparent" />

          <p className="text-sm md:text-base text-[#5e5a52] leading-relaxed font-medium">
            {data.message || "We invite you to join us for a beautiful celebration filled with joy, sharing, and memories that will last a lifetime. Your presence is our most cherished gift."}
          </p>
        </div>
      </section>

      {/* SECTION 2: COUNTDOWN TIMER */}
      {data.date && (
        <section className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#e5dfd3] shadow-lg text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5" style={{ color: primaryColor }} />
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#111111]">
              Event Countdown
            </h3>
          </div>
          <div className="w-full flex justify-center">
            <Countdown targetDate={data.date} primaryColor={primaryColor} />
          </div>
        </section>
      )}

      {/* SECTION 3: EVENT DETAILS & TIMELINE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date & Location Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#e5dfd3] shadow-lg flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#111111] border-b border-[#e5dfd3] pb-3">
              Event Details
            </h3>
            
            {formattedDate && (
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 shrink-0 mt-0.5" style={{ color: primaryColor }} />
                <div>
                  <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider block">Date</span>
                  <span className="text-xs font-extrabold text-[#111111]">{formattedDate}</span>
                </div>
              </div>
            )}

            {(formattedTime || (isWedding && data.weddingTime)) && (
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 shrink-0 mt-0.5" style={{ color: primaryColor }} />
                <div>
                  <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider block">Time</span>
                  <span className="text-xs font-extrabold text-[#111111]">
                    {isWedding && data.weddingTime ? data.weddingTime : formattedTime}
                  </span>
                </div>
              </div>
            )}

            {(data.venueName || data.extraMessage) && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" style={{ color: primaryColor }} />
                <div>
                  <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider block">Venue</span>
                  {isWedding && data.venueName ? (
                    data.googleMapsUrl ? (
                      <a
                        href={data.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-extrabold text-[#102a43] hover:underline flex items-center gap-1"
                        style={{ color: primaryColor }}
                      >
                        {data.venueName} <span className="text-[9px] font-medium opacity-80">(View on Maps)</span>
                      </a>
                    ) : (
                      <span className="text-xs font-extrabold text-[#111111]">{data.venueName}</span>
                    )
                  ) : (
                    <span className="text-xs font-extrabold text-[#111111]">{data.extraMessage}</span>
                  )}
                  {isWedding && data.venueName && data.extraMessage && (
                    <span className="text-[11px] text-[#5e5a52] block mt-1 font-semibold">{data.extraMessage}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {data.rsvpEmail && (
            <a
              href={`mailto:${data.rsvpEmail}?subject=Inquiry%20Regarding%20Invitation`}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#e5dfd3] bg-[#fdfdfb] py-3 text-xs font-bold text-[#5e5a52] hover:bg-[#f5f2eb] hover:text-[#111111] transition-all cursor-pointer shadow-sm"
            >
              <Mail className="h-4 w-4" /> Contact Hosts
            </a>
          )}
        </div>

        {/* Schedule Timeline */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#e5dfd3] shadow-lg space-y-6">
          <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#111111] border-b border-[#e5dfd3] pb-3">
            Schedule of Events
          </h3>

          <div className="relative border-l border-[#e5dfd3] ml-2.5 pl-6 space-y-6">
            <div className="relative">
              <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 bg-white" style={{ borderColor: primaryColor }} />
              <span className="text-[10px] font-bold text-[#5e5a52] tracking-wider block">Start</span>
              <span className="text-xs font-extrabold text-[#111111]">Grand Welcome & Assembly</span>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 bg-white" style={{ borderColor: primaryColor }} />
              <span className="text-[10px] font-bold text-[#5e5a52] tracking-wider block">+ 1 Hour</span>
              <span className="text-xs font-extrabold text-[#111111]">Main Ceremony & Speeches</span>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 bg-white" style={{ borderColor: primaryColor }} />
              <span className="text-[10px] font-bold text-[#5e5a52] tracking-wider block">+ 2 Hours</span>
              <span className="text-xs font-extrabold text-[#111111]">Gala Banquet & Fine Dining</span>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 bg-white" style={{ borderColor: primaryColor }} />
              <span className="text-[10px] font-bold text-[#5e5a52] tracking-wider block">+ 3 Hours</span>
              <span className="text-xs font-extrabold text-[#111111]">Music, Dance & Celebration</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE RSVP FORM */}
      <section className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#e5dfd3] shadow-lg max-w-xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-display text-lg font-black uppercase tracking-tight text-[#111111]">
            Are You Attending?
          </h3>
          <p className="text-xs text-[#5e5a52] font-semibold">
            Please RSVP by submitting the attendance form below.
          </p>
        </div>

        {rsvpSubmitted ? (
          <div className="text-center py-8 space-y-4 animate-scaleUp">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h4 className="font-display text-base font-bold text-[#111111]">RSVP Received!</h4>
            <p className="text-xs text-[#5e5a52] leading-relaxed max-w-xs mx-auto">
              Thank you for confirming your attendance! We're excited to have you join us. Confirmation sent to hosts.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRsvpSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider block">Your Name</label>
              <input
                type="text"
                required
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                placeholder="e.g. Emily Watson"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider block">Number of Guests</label>
              <select
                value={rsvpGuestCount}
                onChange={(e) => setRsvpGuestCount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5+ People</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-display text-xs font-bold text-white transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              Confirm Attendance
            </button>
          </form>
        )}
      </section>


    </div>
  );
};

export default TemplateWebsiteLayout;
