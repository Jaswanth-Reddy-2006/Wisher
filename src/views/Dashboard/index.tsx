import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { TEMPLATES } from '../../templates';
import { useStore } from '../../store/useStore';
import { Search, SlidersHorizontal, Gift, Heart, Home, ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { WishData } from '../../templates/types';
import { serializeWishData } from '../../utils/serialization';
import { templateMockData } from '../../utils/mockData';

// Custom CSS/SVG preview modules representing their 3D interactive mechanics
const renderCardPreview = (id: WishData['templateType']) => {
  switch (id) {
    case 'retro-box':
      return (
        <div className="w-full h-full bg-gradient-to-tr from-[#9e0b0b] to-[#d30f0f] relative flex items-center justify-center overflow-hidden">
          {/* Floating balloons */}
          <div className="absolute w-4 h-6 rounded-full bg-[#ffd700] opacity-70 blur-[0.5px] top-12 left-10 transition-transform duration-700 group-hover:-translate-y-8" />
          <div className="absolute w-5 h-7 rounded-full bg-[#f5f2eb] opacity-85 blur-[0.5px] top-8 right-12 transition-transform duration-1000 group-hover:-translate-y-12 delay-75" />
          
          {/* Ribbon paths under the box */}
          <div className="absolute w-1 h-36 bg-[#ffd700]" />
          <div className="absolute h-1 w-36 bg-[#ffd700]" />
          
          {/* Gift Box Container */}
          <div className="relative w-20 h-20 flex flex-col items-center justify-center">
            {/* Lid */}
            <div className="w-22 h-5 bg-[#ffd700] rounded-sm shadow-md border border-[#b89512] transition-transform duration-500 transform group-hover:-translate-y-4 group-hover:rotate-6 z-10" />
            {/* Box Body */}
            <div className="w-20 h-16 bg-[#f5f2eb] rounded-b-md shadow-md border border-[#e5dfd3] flex items-center justify-center relative overflow-hidden mt-0.5">
              {/* Ribbon cross */}
              <div className="absolute w-4 h-full bg-[#ffd700]" />
              <span className="relative z-10 text-[10px] font-black text-[#9e0b0b] tracking-wider uppercase">Open</span>
            </div>
          </div>
        </div>
      );
    case 'neon-cyberpunk-vinyl':
      return (
        <div className="w-full h-full bg-[#111111] relative flex items-center justify-center overflow-hidden">
          {/* Tech grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
          
          {/* Container */}
          <div className="relative w-44 h-28 flex items-center">
            {/* Vinyl Record */}
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-[#222] via-[#050505] to-[#222] border border-[#ff007f]/50 flex items-center justify-center shadow-lg transition-all duration-700 transform translate-x-2 group-hover:translate-x-12 group-hover:rotate-180">
              <div className="w-20 h-20 rounded-full border border-zinc-800/80 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-zinc-800/60 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ffff] to-[#ff007f] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111111]" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Vinyl Sleeve */}
            <div className="absolute w-28 h-28 bg-[#1a1a1a] rounded-xl border border-[#ff007f]/30 flex flex-col justify-between p-3.5 shadow-2xl z-10 transition-transform duration-500 group-hover:scale-102">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ff007f] to-[#00ffff] opacity-80" />
              <div className="space-y-1">
                <div className="h-1.5 w-12 bg-[#ff007f]/60 rounded-full" />
                <div className="h-1 w-16 bg-[#00ffff]/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      );
    case 'pop-up-storybook':
      return (
        <div className="w-full h-full bg-[#eae3d2] relative flex items-center justify-center overflow-hidden">
          {/* Sparkles / Stars */}
          <div className="absolute w-2 h-2 bg-[#d4af37] rotate-45 top-10 left-16 opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-4" />
          <div className="absolute w-3 h-3 bg-[#d4af37] rotate-45 top-6 right-20 opacity-0 scale-50 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-6 delay-75" />
          <div className="absolute w-1.5 h-1.5 bg-[#d4af37] rotate-45 bottom-12 right-16 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-2" />

          {/* Open Storybook */}
          <div className="relative w-36 h-24 flex justify-center transition-all duration-500 transform group-hover:scale-105 [perspective:500px]">
            {/* Book Cover */}
            <div className="absolute inset-0 bg-[#5c3a21] rounded-lg shadow-xl border border-[#3d2514] transform rotate-1" />
            {/* Left Page */}
            <div className="absolute left-1 top-1 bottom-1 w-[66px] bg-[#f5f2eb] rounded-l-md border-r border-[#e5dfd3] shadow-inner p-2 origin-right transition-transform duration-500 group-hover:[transform:rotateY(-30deg)]">
              <div className="w-8 h-2 bg-[#d4af37]/30 rounded mb-1" />
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#5e5a52]/20 rounded-full" />
                <div className="h-1 w-5/6 bg-[#5e5a52]/20 rounded-full" />
              </div>
            </div>
            {/* Right Page */}
            <div className="absolute right-1 top-1 bottom-1 w-[66px] bg-[#f5f2eb] rounded-r-md shadow-inner p-2 origin-left transition-transform duration-500 group-hover:[transform:rotateY(30deg)]">
              <div className="w-6 h-6 rounded bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mb-1 float-right">
                <span className="text-[6px] text-[#d4af37] font-bold">♥</span>
              </div>
              <div className="space-y-1 clear-right">
                <div className="h-1 w-full bg-[#5e5a52]/20 rounded-full" />
                <div className="h-1 w-4/5 bg-[#5e5a52]/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      );
    case 'cosmic-constellation':
      return (
        <div className="w-full h-full bg-[#0a0813] relative flex items-center justify-center overflow-hidden">
          {/* Nebula glow */}
          <div className="absolute w-28 h-28 rounded-full bg-[#00ffff]/20 blur-2xl top-4 left-8 transition-transform duration-1000 group-hover:scale-125" />
          <div className="absolute w-24 h-24 rounded-full bg-[#ff00ff]/10 blur-2xl bottom-6 right-10 transition-transform duration-1000 group-hover:scale-125 delay-100" />
          
          {/* Stars & Constellation Lines SVG */}
          <svg className="w-32 h-32 relative z-10" viewBox="0 0 100 100">
            {/* Constellation Lines */}
            <line x1="20" y1="50" x2="45" y2="25" stroke="rgba(0, 255, 255, 0.4)" strokeWidth="0.75" strokeDasharray="100" strokeDashoffset="100" className="transition-all duration-700 group-hover:[stroke-dashoffset:0]" />
            <line x1="45" y1="25" x2="80" y2="40" stroke="rgba(0, 255, 255, 0.4)" strokeWidth="0.75" strokeDasharray="100" strokeDashoffset="100" className="transition-all duration-700 group-hover:[stroke-dashoffset:0] delay-100" />
            <line x1="80" y1="40" x2="65" y2="75" stroke="rgba(0, 255, 255, 0.4)" strokeWidth="0.75" strokeDasharray="100" strokeDashoffset="100" className="transition-all duration-700 group-hover:[stroke-dashoffset:0] delay-200" />
            <line x1="65" y1="75" x2="35" y2="70" stroke="rgba(0, 255, 255, 0.4)" strokeWidth="0.75" strokeDasharray="100" strokeDashoffset="100" className="transition-all duration-700 group-hover:[stroke-dashoffset:0] delay-300" />
            <line x1="35" y1="70" x2="20" y2="50" stroke="rgba(0, 255, 255, 0.4)" strokeWidth="0.75" strokeDasharray="100" strokeDashoffset="100" className="transition-all duration-700 group-hover:[stroke-dashoffset:0] delay-400" />

            {/* Dotted Star Nodes */}
            <circle cx="20" cy="50" r="3" fill="#ffffff" className="transition-transform duration-300 group-hover:scale-150" />
            <circle cx="45" cy="25" r="4" fill="#00ffff" className="transition-transform duration-300 group-hover:scale-120" />
            <circle cx="80" cy="40" r="3.5" fill="#ffffff" className="transition-transform duration-300 group-hover:scale-150" />
            <circle cx="65" cy="75" r="3" fill="#00ffff" className="transition-transform duration-300 group-hover:scale-120" />
            <circle cx="35" cy="70" r="4" fill="#ffffff" className="transition-transform duration-300 group-hover:scale-150" />
          </svg>
        </div>
      );
    case 'elegant-card':
      return (
        <div className="w-full h-full bg-[#f4f0e6] relative flex items-center justify-center overflow-hidden">
          {/* Royal Border */}
          <div className="absolute inset-4 border border-[#d4af37]/30 rounded-xl pointer-events-none" />
          
          {/* Flipping booklet */}
          <div className="relative w-36 h-24 flex items-center justify-center transition-all duration-500 transform group-hover:scale-105 [perspective:500px]">
            {/* Back layer */}
            <div className="absolute w-[130px] h-[80px] bg-white border border-[#d4af37]/40 shadow-lg rounded p-3 flex flex-col justify-between">
              <div className="text-center font-display text-[9px] font-bold text-[#d4af37] tracking-widest uppercase">The Wedding</div>
              <div className="space-y-1">
                <div className="h-0.5 w-16 bg-[#5e5a52]/30 mx-auto rounded-full" />
                <div className="h-0.5 w-12 bg-[#5e5a52]/30 mx-auto rounded-full" />
              </div>
            </div>
            
            {/* Flipping Cover Page */}
            <div className="absolute w-[65px] h-[80px] bg-[#fdfbf7] border border-[#d4af37]/40 border-r-0 shadow-md rounded-l left-[25px] origin-right transition-transform duration-500 group-hover:[transform:rotateY(-120deg)] flex flex-col justify-center items-center">
              <div className="w-6 h-6 rounded-full border border-[#d4af37]/50 flex items-center justify-center mb-1">
                <span className="text-[8px] text-[#d4af37] font-serif">S</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 'wax-seal-scroll':
      return (
        <div className="w-full h-full bg-[#f1ebd9] relative flex items-center justify-center overflow-hidden">
          <div className="relative w-28 h-28 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
            {/* Scroll Cylinder Background */}
            <div className="w-16 h-28 bg-[#fdfaf2] border-x border-[#dcd3ba] shadow-xl rounded-t-sm rounded-b-sm flex flex-col justify-between py-4 relative">
              <div className="absolute -top-1.5 left-0 right-0 h-3 bg-[#e8debe] border border-[#c4b998] rounded shadow-md transform scale-x-105 transition-transform duration-500 group-hover:-translate-y-1" />
              <div className="absolute -bottom-1.5 left-0 right-0 h-3 bg-[#e8debe] border border-[#c4b998] rounded shadow-md transform scale-x-105 transition-transform duration-500 group-hover:translate-y-1" />
              
              <div className="w-full h-full border-x border-[#ffd700]/30 px-2 flex flex-col items-center justify-center space-y-1.5">
                <div className="h-1 w-8 bg-[#b80c0c]/20 rounded-full" />
                <div className="h-0.5 w-10 bg-[#5e5a52]/20 rounded-full" />
                <div className="h-0.5 w-8 bg-[#5e5a52]/20 rounded-full" />
              </div>
            </div>
            
            {/* Wax Seal Stamp */}
            <div className="absolute w-10 h-10 rounded-full bg-[#b80c0c] border-2 border-[#800707] shadow-lg flex items-center justify-center z-10 transition-transform duration-500 transform group-hover:scale-110 group-hover:rotate-12">
              <div className="w-7 h-7 rounded-full border border-dashed border-[#ff6b6b]/40 flex items-center justify-center">
                <span className="text-[9px] text-[#ffdddd] font-serif font-black">W</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 'infinity-origami-fold':
      return (
        <div className="w-full h-full bg-[#fdfcf9] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#e5dfd3_1px,transparent_1px)] bg-[size:10px_10px] opacity-40" />
          
          <div className="relative w-24 h-24 grid grid-cols-2 gap-1.5 transition-transform duration-500 group-hover:rotate-6 [perspective:400px]">
            {/* Quadrant 1 */}
            <div className="w-11 h-11 bg-white border border-[#e5dfd3] shadow-sm rounded-md relative overflow-hidden transition-transform duration-500 origin-top-left group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 bg-[#d30f0f]/5 flex items-center justify-center">
                <div className="w-5 h-5 border-b border-r border-[#d30f0f]/30 border-dashed" />
              </div>
            </div>
            {/* Quadrant 2 */}
            <div className="w-11 h-11 bg-white border border-[#e5dfd3] shadow-sm rounded-md relative overflow-hidden transition-transform duration-500 origin-top-right group-hover:[transform:rotateY(-180deg)]">
              <div className="absolute inset-0 bg-neutral-50 flex items-center justify-center">
                <div className="w-5 h-5 border-b border-l border-[#5e5a52]/20 border-dashed" />
              </div>
            </div>
            {/* Quadrant 3 */}
            <div className="w-11 h-11 bg-white border border-[#e5dfd3] shadow-sm rounded-md relative overflow-hidden transition-transform duration-500 origin-bottom-left group-hover:[transform:rotateX(-180deg)]">
              <div className="absolute inset-0 bg-neutral-50 flex items-center justify-center">
                <div className="w-5 h-5 border-t border-r border-[#5e5a52]/20 border-dashed" />
              </div>
            </div>
            {/* Quadrant 4 */}
            <div className="w-11 h-11 bg-[#d30f0f] border border-[#b80c0c] shadow-sm rounded-md relative overflow-hidden transition-transform duration-500 origin-bottom-right group-hover:[transform:rotateX(180deg)] flex items-center justify-center">
              <span className="text-[8px] text-white font-bold font-display uppercase tracking-widest">Love</span>
            </div>
          </div>
        </div>
      );
    case 'glass-botanical-box':
      return (
        <div className="w-full h-full bg-[#f4f2ea] relative flex items-center justify-center overflow-hidden">
          <div className="absolute top-2 left-2 w-10 h-10 border-l border-t border-[#2d6a4f]/20 rounded-tl-full pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-10 h-10 border-r border-b border-[#2d6a4f]/20 rounded-br-full pointer-events-none" />
          
          <div className="relative w-36 h-24 bg-white/30 backdrop-blur-md border border-white/60 shadow-2xl rounded-2xl p-3 flex flex-col justify-between overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
            <div className="absolute inset-1.5 border border-[#d4af37]/60 rounded-xl" />
            <div className="relative z-10 flex justify-between h-full items-center px-2">
              <svg className="w-8 h-16 text-[#2d6a4f] opacity-80" viewBox="0 0 20 40">
                <path d="M10,40 Q5,20 10,0 Q15,20 10,40" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M10,30 Q0,25 2,20" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M10,15 Q20,10 18,5" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div className="w-16 h-10 bg-white/70 border border-[#d4af37]/40 rounded-lg flex flex-col items-center justify-center space-y-0.5 shadow-sm">
                <span className="text-[6px] uppercase tracking-wider font-extrabold text-[#2d6a4f]">Invite</span>
                <div className="h-0.5 w-8 bg-[#2d6a4f]/30 rounded-full" />
              </div>
              <svg className="w-8 h-16 text-[#2d6a4f] opacity-80 transform scale-x-[-1]" viewBox="0 0 20 40">
                <path d="M10,40 Q5,20 10,0 Q15,20 10,40" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M10,30 Q0,25 2,20" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      );
    case 'modern-door':
      return (
        <div className="w-full h-full bg-[#f2edd9] relative flex items-center justify-center overflow-hidden">
          <div className="absolute w-20 h-28 border-2 border-t-8 border-[#3d2c1f] rounded-t-md flex items-end justify-center relative overflow-hidden bg-[#ffd700]/20 shadow-inner [perspective:400px]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#ffd700]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Door swing */}
            <div className="absolute inset-0 bg-[#7a4b2c] border border-[#5c371e] rounded-t-xs shadow-md p-1.5 origin-left transition-all duration-700 transform group-hover:[transform:rotateY(-85deg)] flex flex-col justify-between items-end z-10">
              <div className="w-full h-1/2 border border-[#5c371e] bg-[#6c4023] rounded-sm mb-1" />
              <div className="w-full h-1/2 border border-[#5c371e] bg-[#6c4023] rounded-sm flex items-center justify-end pr-1">
                <div className="w-1.5 h-4 bg-[#ffd700] rounded-full border border-[#b89512] transition-transform duration-300 group-hover:rotate-12" />
              </div>
            </div>
            <span className="absolute bottom-10 text-[7px] font-black text-[#5c371e] uppercase tracking-widest z-0 animate-pulse">Welcome</span>
          </div>
        </div>
      );
    case 'blueprint-to-brick':
      return (
        <div className="w-full h-full bg-[#0d2b45] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b4965_1px,transparent_1px),linear-gradient(to_bottom,#1b4965_1px,transparent_1px)] bg-[size:10px_10px]" />
          <div className="absolute w-24 h-24 rounded-full border border-[#62b6cb]/20 top-4 right-4 pointer-events-none" />
          <svg className="w-24 h-24 relative z-10 transition-transform duration-500 transform group-hover:scale-110 group-hover:-translate-y-1" viewBox="0 0 100 100">
            <polygon points="50,75 80,60 50,45 20,60" fill="none" stroke="#62b6cb" strokeWidth="1" />
            <line x1="20" y1="60" x2="20" y2="40" stroke="#00ffff" strokeWidth="1.5" className="transition-all duration-700 group-hover:stroke-[#fff]" />
            <line x1="50" y1="75" x2="50" y2="55" stroke="#00ffff" strokeWidth="1.5" className="transition-all duration-700 group-hover:stroke-[#fff]" />
            <line x1="80" y1="60" x2="80" y2="40" stroke="#00ffff" strokeWidth="1.5" className="transition-all duration-700 group-hover:stroke-[#fff]" />
            <polygon points="50,55 80,40 50,25 20,40" fill="none" stroke="#00ffff" strokeWidth="1.5" strokeDasharray="100" strokeDashoffset="100" className="transition-all duration-1000 group-hover:[stroke-dashoffset:0]" />
            <line x1="50" y1="25" x2="50" y2="12" stroke="#ff007f" strokeWidth="1" strokeDasharray="5" />
          </svg>
        </div>
      );
    case 'isometric-neighborhood':
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#ffd269] to-[#ffd700]/30 relative flex items-center justify-center overflow-hidden">
          <div className="absolute w-24 h-6 rounded-full bg-white/40 top-4 left-4 blur-xs" />
          <div className="absolute bottom-0 w-full flex items-end justify-between px-2 gap-1.5">
            <div className="w-12 h-10 bg-[#5c4a37] rounded-t-md relative">
              <polygon points="0,10 6,0 12,10" className="fill-[#3d2c1f]" />
            </div>
            <div className="w-16 h-14 bg-[#4a3b2c] rounded-t-md relative flex flex-col justify-end items-center">
              <div className="absolute top-[-6px] right-2 w-3 h-6 bg-[#3d2c1f] rounded-t-xs" />
              <polygon points="-4,14 8,0 20,14" className="fill-[#d30f0f] transform scale-x-120 transition-transform duration-500 origin-bottom group-hover:-translate-y-1.5" />
            </div>
            <div className="w-10 h-8 bg-[#5c4a37] rounded-t-md" />
          </div>
          <div className="absolute top-2 flex flex-col items-center justify-center transition-all duration-700 transform group-hover:translate-y-8">
            <svg className="w-6 h-10 text-[#d4af37] drop-shadow-md animate-bounce" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <rect x="11" y="10" width="2" height="12" />
              <rect x="13" y="14" width="3" height="2" />
              <rect x="13" y="18" width="3" height="2" />
            </svg>
          </div>
        </div>
      );
    case 'cozy-mailbox-reveal':
      return (
        <div className="w-full h-full bg-[#e8f1f5] relative flex items-center justify-center overflow-hidden">
          <div className="absolute bottom-4 left-0 right-0 h-0.5 bg-[#5e5a52]/20" />
          <div className="absolute w-2 h-14 bg-[#8b5a2b] bottom-4 left-1/2 -translate-x-1/2" />
          <div className="absolute w-24 h-14 bg-[#4a5568] rounded-t-full border border-slate-700 bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-between px-3 shadow-lg transition-transform duration-500 group-hover:scale-105 [perspective:400px]">
            <div className="absolute right-[-4px] top-4 w-1.5 h-8 bg-[#d30f0f] origin-bottom transition-transform duration-500 transform group-hover:rotate-90" />
            <div className="absolute left-[-2px] bottom-0 w-8 h-10 bg-[#334155] border-r border-[#1e293b] origin-bottom transition-all duration-500 transform group-hover:[transform:rotateX(90deg)] flex items-center justify-center z-20">
              <div className="w-1.5 h-1.5 bg-[#cbd5e1] rounded-full" />
            </div>
            <div className="absolute w-12 h-8 bg-white border border-[#cbd5e1] rounded-xs shadow-md left-2 bottom-1.5 transition-all duration-700 transform translate-x-0 group-hover:-translate-x-6 z-10 flex flex-col justify-center p-1 space-y-0.5">
              <div className="w-3 h-3 bg-[#d30f0f]/10 rounded-full flex items-center justify-center self-end">
                <span className="text-[4px] text-[#d30f0f]">♥</span>
              </div>
              <div className="h-0.5 w-6 bg-[#94a3b8] rounded-full" />
            </div>
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

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const setTemplate = useStore((state) => state.setTemplate);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Birthday', 'Wedding', 'House Warming'];

  // Filter templates
  const filteredTemplates = TEMPLATES.filter((tmpl) => {
    const matchesCategory = selectedCategory === 'All' || tmpl.category === selectedCategory;
    const matchesSearch =
      tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectTemplate = (id: WishData['templateType']) => {
    setTemplate(id);
    navigate(`/customizer?template=${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#111111] pb-20 relative flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 pt-32 px-6 max-w-6xl mx-auto w-full">
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5e5a52] hover:text-[#111111] mb-3 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to home
            </Link>
            <h1 className="font-display text-4xl font-extrabold tracking-tighter text-[#111111] leading-none">
              Template Gallery
            </h1>
            <p className="text-xs text-[#5e5a52] mt-2 font-semibold">
              Select a baseline template layout and customize your 3D wish scene.
            </p>
          </div>

          {/* Search bar inputs */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5e5a52]" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] placeholder:text-[#5e5a52] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f] transition-all"
            />
          </div>
        </div>

        {/* Filter Categories pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#e5dfd3] select-none scrollbar-none">
          <SlidersHorizontal className="h-4 w-4 text-[#5e5a52] mr-2 shrink-0 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-white/60 text-[#5e5a52] border border-[#e5dfd3] hover:bg-white hover:text-[#111111]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid Container */}
        {filteredTemplates.length > 0 ? (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((tmpl) => {
                const Icon = tmpl.id === 'retro-box' ? Gift : tmpl.id === 'elegant-card' ? Heart : Home;
                const mockData = templateMockData[tmpl.id];
                const token = mockData ? serializeWishData(mockData) : '';
                const liveDemoUrl = `/wish/${tmpl.id}?q=${token}`;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={tmpl.id}
                    className="group flex flex-col justify-between rounded-3xl bg-white p-6 shadow-soft border border-[#e5dfd3] hover:shadow-medium transition-all duration-300"
                  >
                    <div>
                      {/* CSS/SVG cover preview */}
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 bg-[#f5f2eb] border border-[#e5dfd3]">
                        {renderCardPreview(tmpl.id)}
                        <div className="absolute top-3 left-3 bg-[#111111] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 z-30 select-none">
                          <Icon className="h-3.5 w-3.5" />
                          {tmpl.category}
                        </div>
                      </div>

                      <h3 className="font-display text-lg font-black text-[#111111] mb-2">
                        {tmpl.name}
                      </h3>
                      <p className="text-xs text-[#5e5a52] leading-relaxed mb-6 font-semibold">
                        {tmpl.description}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      {/* Live Demo Trigger */}
                      <a
                        href={liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center rounded-xl border border-[#111111] py-3 text-xs font-bold text-[#111111] hover:bg-[#111111] hover:text-white transition-all cursor-pointer text-center"
                      >
                        Live Demo
                      </a>

                      {/* Customize and edit */}
                      <button
                        onClick={() => handleSelectTemplate(tmpl.id)}
                        className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#d30f0f] py-3 text-xs font-bold text-white hover:bg-[#b00c0c] transition-all cursor-pointer"
                      >
                        Customize
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center border border-[#e5dfd3] mb-4 text-[#5e5a52]">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-extrabold text-[#111111] mb-1">
              No templates found
            </h3>
            <p className="text-xs text-[#5e5a52] max-w-xs font-semibold">
              Try adjusting your filters or search keywords to find your event type.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
export default Dashboard;
