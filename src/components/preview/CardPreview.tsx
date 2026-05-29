import type { WishData } from '../../templates/types';

export const renderCardPreview = (id: WishData['templateType']) => {
  switch (id) {
    case 'birthday-universe':
      return (
        <div className="w-full h-full bg-[#0a0518] relative flex items-center justify-center overflow-hidden">
          {/* Glowing galaxy rings */}
          <div className="absolute w-32 h-32 rounded-full border border-dashed border-pink-500/20 animate-spin" style={{ animationDuration: '10s' }} />
          <div className="absolute w-24 h-24 rounded-full border border-dashed border-purple-500/30 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
          
          {/* Glowing core particle */}
          <div className="relative w-12 h-12 rounded-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.4)_0%,transparent_70%)] flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-transform duration-500 group-hover:scale-110">
            <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_10px_#fff] flex items-center justify-center">
              <span className="text-pink-600 text-[8px] animate-pulse">❤️</span>
            </div>
          </div>
          
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-pink-400 font-serif tracking-widest uppercase">Cosmic Universe</span>
          </div>
        </div>
      );
    case 'happy-birthday-classic':
      return (
        <div className="w-full h-full bg-[#120224] relative flex items-center justify-center overflow-hidden">
          {/* Floating tiny balloons */}
          <div className="absolute w-2.5 h-3 rounded-full bg-pink-500/40 top-4 left-3 animate-bounce" />
          <div className="absolute w-2 h-2.5 rounded-full bg-yellow-500/40 top-6 right-5 animate-bounce" style={{ animationDelay: '0.5s' }} />
          
          {/* Glowing cupcake / cake illustration */}
          <div className="relative flex flex-col items-center group-hover:scale-105 transition-all duration-300">
            {/* Candle */}
            <div className="w-1 h-3 bg-yellow-300/90 rounded-sm relative">
              <div className="w-2 h-2 rounded-full bg-orange-400 absolute -top-1.5 left-1/2 -translate-x-1/2 animate-pulse shadow-[0_0_8px_#fb923c]" />
            </div>
            {/* Cake bottom */}
            <div className="w-8 h-4 bg-pink-400/90 rounded-t-sm shadow-md border-b border-pink-500" />
            <div className="w-10 h-1 bg-yellow-400/80 rounded-full" />
          </div>
          
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-yellow-300 font-serif tracking-widest uppercase">Classic Party</span>
          </div>
        </div>
      );
    case 'pop-up-storybook':
      return (
        <div className="w-full h-full bg-[#fdfaf2] relative flex items-center justify-center overflow-hidden border border-[#5c3a21]/20">
          {/* Book frame details */}
          <div className="w-12 h-16 rounded border border-dashed border-[#5c3a21]/40 flex flex-col items-center justify-center bg-white shadow-md">
            <span className="text-[12px] text-[#5c3a21]">📖</span>
            <span className="text-[5px] text-[#5c3a21] uppercase tracking-tighter scale-90 mt-1 font-bold">Storybook</span>
          </div>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-[#5c3a21] font-serif tracking-widest uppercase">Pop-up Story</span>
          </div>
        </div>
      );
    case 'birthday-original':
      return (
        <div className="w-full h-full bg-[#FFDAB9] relative flex flex-col items-center justify-center overflow-hidden">
          {/* Mini Light Bulbs Row */}
          <div className="absolute top-1 left-0 right-0 flex justify-between px-2 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_4px_#facc15]" />
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_4px_#ef4444]" style={{ animationDelay: '0.2s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_4px_#3b82f6]" style={{ animationDelay: '0.4s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_4px_#22c55e]" style={{ animationDelay: '0.6s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse shadow-[0_0_4px_#ec4899]" style={{ animationDelay: '0.8s' }} />
          </div>
          
          {/* Glowing Cake representation */}
          <div className="relative flex flex-col items-center mt-2">
            <div className="w-0.5 h-2 bg-yellow-300 rounded-sm relative">
              <div className="w-1 h-1 rounded-full bg-orange-400 absolute -top-1 left-1/2 -translate-x-1/2 animate-pulse shadow-[0_0_4px_#fb923c]" />
            </div>
            <div className="w-6 h-3 bg-[#6d3826] rounded-t-sm shadow-md" />
            <div className="w-8 h-0.5 bg-white rounded-full" />
          </div>
          
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-[#C4515C] font-black tracking-widest uppercase">Retro Original</span>
          </div>
        </div>
      );
    case 'romantic-anime-birthday':
      return (
        <div className="w-full h-full bg-pink-50 relative flex items-center justify-center overflow-hidden border border-pink-100">
          {/* Animated drifting cherry blossoms (petals) */}
          <div className="absolute w-1 h-1 bg-pink-300 rounded-full top-3 left-4 animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="absolute w-1.5 h-1.5 bg-pink-400 rounded-full top-6 right-6 animate-bounce" style={{ animationDelay: '0.4s' }} />
          <div className="absolute w-1 h-1 bg-pink-200 rounded-full bottom-8 left-8 animate-bounce" style={{ animationDelay: '0.7s' }} />
          
          {/* Couple/heart anime vibe */}
          <div className="w-10 h-10 rounded-full bg-pink-200/50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
            <span className="text-[14px]">🌸</span>
          </div>
          
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-pink-500 font-serif tracking-widest uppercase">Anime Dream</span>
          </div>
        </div>
      );
    case 'cinematic-3d-birthday':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#12001e] to-[#030008] relative flex items-center justify-center overflow-hidden border border-purple-900/30">
          {/* Neon lights */}
          <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-fuchsia-500/20 blur-xl" />
          <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-cyan-500/20 blur-xl" />
          
          {/* Glassmorphic card preview */}
          <div className="w-14 h-18 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-1 group-hover:rotate-3 transition-transform duration-300">
            <div className="w-6 h-6 rounded-full bg-cyan-400/30 flex items-center justify-center animate-pulse">
              <span className="text-[8px] text-cyan-200">✨</span>
            </div>
            <div className="w-8 h-1 bg-fuchsia-400/50 rounded-full mt-2" />
          </div>
          
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-purple-300 font-serif tracking-widest uppercase">Cinematic 3D</span>
          </div>
        </div>
      );
    case 'galactic-3d-heart':
      return (
        <div className="w-full h-full bg-[#030014] relative flex items-center justify-center overflow-hidden border border-[#d4af37]/20">
          {/* Subtle gold stellar dust aura */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] animate-pulse" />
          
          <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <div className="w-8 h-8 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.3)_0%,transparent_70%)] absolute" />
            <span className="text-[#d4af37] text-lg animate-pulse filter drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]">❤️</span>
          </div>
          
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-[#d4af37] font-serif tracking-widest uppercase">Galactic Heart</span>
          </div>
        </div>
      );
    case 'birthday-glassmorphism-story':
      return (
        <div className="w-full h-full bg-[#1e1035] relative flex items-center justify-center overflow-hidden border border-[#7b2cbf]/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,44,191,0.2)_0%,transparent_70%)] animate-pulse" />
          <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-[#FFD700] text-xl animate-bounce">🎁</span>
          </div>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-purple-300 font-serif tracking-widest uppercase font-bold">Glassmorphism Story</span>
          </div>
        </div>
      );
    case 'birthday-surprise-engine':
      return (
        <div className="w-full h-full bg-[#fff5f8] relative flex items-center justify-center overflow-hidden border border-[#f472b6]/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.15)_0%,transparent_70%)] animate-pulse" />
          <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-[#ec4899] text-xl animate-bounce">🎂</span>
          </div>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-[#ec4899] font-serif tracking-widest uppercase font-bold">Surprise Engine</span>
          </div>
        </div>
      );
    case 'birthday-sky-lanterns':
      return (
        <div className="w-full h-full bg-[#050b1a] relative flex items-center justify-center overflow-hidden border border-amber-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.2)_0%,transparent_70%)] animate-pulse" />
          <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-[#fbbf24] text-xl animate-bounce">🏮</span>
          </div>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-[#fbbf24] font-serif tracking-widest uppercase font-bold">Sky Lanterns</span>
          </div>
        </div>
      );
    case 'birthday-pixel-arcade':
      return (
        <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden border border-rose-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15)_0%,transparent_70%)] animate-pulse" />
          {/* Retro scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
          <div className="relative w-12 h-12 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-rose-500 text-xl animate-bounce">👾</span>
          </div>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-rose-400 font-mono tracking-widest uppercase font-bold">Pixel Arcade</span>
          </div>
        </div>
      );
    case 'birthday-botanical-magic':
      return (
        <div className="w-full h-full bg-[#022c22] relative flex items-center justify-center overflow-hidden border border-emerald-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2)_0%,transparent_70%)] animate-pulse" />
          <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-[#34d399] text-xl animate-bounce">🌿</span>
          </div>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-[#34d399] font-serif tracking-widest uppercase font-bold">Secret Garden</span>
          </div>
        </div>
      );
    case 'birthday-vinyl-retro':
      return (
        <div className="w-full h-full bg-zinc-900 relative flex items-center justify-center overflow-hidden border border-rose-500/25">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.15)_0%,transparent_70%)] animate-pulse" />
          <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-rose-500 text-xl animate-bounce">💿</span>
          </div>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-rose-400 font-mono tracking-widest uppercase font-bold">Neon Vinyl</span>
          </div>
        </div>
      );
    case 'birthday-cyber-hacker':
      return (
        <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden border border-green-500/25">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.15)_0%,transparent_70%)] animate-pulse" />
          <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-green-500 text-xl animate-bounce">☠</span>
          </div>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-green-400 font-mono tracking-widest uppercase font-bold">Cyber Hacker</span>
          </div>
        </div>
      );
    case 'birthday-retro-camera':
      return (
        <div className="w-full h-full bg-[#3e2723] relative flex items-center justify-center overflow-hidden border border-amber-900/25">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_70%)] animate-pulse" />
          <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-amber-300 text-xl animate-bounce">📸</span>
          </div>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-amber-500 font-serif tracking-widest uppercase font-bold">Shutter Polaroid</span>
          </div>
        </div>
      );
    case 'wedding-classic-sonali':
      return (
        <div className="w-full h-full bg-[#fdfaf6] relative flex items-center justify-center overflow-hidden border border-[#674ea7]/10">
          {/* Subtle floral frame corners */}
          <div className="absolute top-1 left-1 w-6 h-6 border-t border-l border-[#674ea7]/20 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-1 right-1 w-6 h-6 border-t border-r border-[#674ea7]/20 rounded-tr-sm pointer-events-none" />
          
          {/* Central falling sakura indicator */}
          <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-[#674ea7] text-xl animate-bounce">🌸</span>
          </div>
          
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-[#674ea7] font-serif tracking-widest uppercase font-bold">Sonali Wedding</span>
          </div>
        </div>
      );
    case 'wedding-rampatra':
      return (
        <div className="w-full h-full bg-[#18181b] relative flex items-center justify-center overflow-hidden border border-[#f05f70]/20">
          {/* Parallax dark overlay */}
          <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://wedding.ramswaroop.me/img/hero-min.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/80" />
          
          {/* Logo illustration */}
          <div className="relative flex flex-col items-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-[#f05f70] text-xl font-serif font-black animate-pulse">💍</span>
            <span className="text-[6px] text-white/90 uppercase tracking-widest mt-1">Ram & Antara</span>
          </div>
          
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-[#f05f70] font-serif tracking-widest uppercase font-bold">Hitched Template</span>
          </div>
        </div>
      );
    case 'wedding-rehan-maulidan':
      return (
        <div className="w-full h-full bg-[#fcfcfc] relative flex items-center justify-center overflow-hidden border border-[#113468]/15">
          {/* Half circle flower illustration */}
          <div className="absolute top-0 w-24 h-12 bg-cover bg-center opacity-60 rounded-b-full border-b border-[#113468]/10" style={{ backgroundImage: "url('https://ngodingsolusi.github.io/the-wedding-of-rehan-maulidan/images/half%20circle%20flower-500.png')" }} />
          
          {/* Content display */}
          <div className="relative flex flex-col items-center mt-6 group-hover:scale-105 transition-transform duration-300">
            <span className="text-[#113468] text-sm font-serif font-extrabold italic">Rehan & Maulidan</span>
            <span className="text-[5px] text-[#828282] uppercase tracking-widest mt-1">Kami Mengundang Anda</span>
          </div>
          
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-[#113468] font-serif tracking-widest uppercase font-bold">Rehan Wedding</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
          <span className="text-xs text-slate-500">Preview Available</span>
        </div>
      );
  }
};
