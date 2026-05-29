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
    case 'romantic-anime-birthday':
      return (
        <div className="w-full h-full bg-[#fff0f5] relative flex items-center justify-center overflow-hidden">
          {/* Cherry blossoms drifting preview */}
          <div className="absolute w-2 h-2 rounded-full bg-pink-300/60 top-2 left-6 animate-pulse" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-pink-200/50 bottom-4 right-8" />
          
          <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-pink-400 text-xl animate-bounce">🌸</span>
          </div>
          
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-pink-500 font-serif tracking-widest uppercase">Anime Dream</span>
          </div>
        </div>
      );
    case 'cinematic-3d-birthday':
      return (
        <div className="w-full h-full bg-[#050505] relative flex items-center justify-center overflow-hidden border border-red-500/10">
          <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-red-500 text-xl filter drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">✨</span>
          </div>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[7px] text-red-500 font-serif tracking-widest uppercase">Cinematic 3D</span>
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
    default:
      return (
        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
          <span className="text-xs text-slate-500">Preview Available</span>
        </div>
      );
  }
};
