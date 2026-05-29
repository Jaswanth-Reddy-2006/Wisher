import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import type { TemplateProps } from '../../types';

export const Cinematic3DBirthday: React.FC<TemplateProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth out the scroll for cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    mass: 0.5,
    stiffness: 80,
  });

  // --- SCENE 1: Intro (0.0 -> 0.25) ---
  const s1Opacity = useTransform(smoothProgress, [0, 0.2, 0.25], [1, 1, 0]);
  const s1Scale = useTransform(smoothProgress, [0, 0.25], [1, 3]);
  const s1Z = useTransform(smoothProgress, [0, 0.25], [0, 1000]);

  // --- SCENE 2: Gallery / Photo (0.2 -> 0.55) ---
  const s2Opacity = useTransform(smoothProgress, [0.15, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
  const s2Y = useTransform(smoothProgress, [0.15, 0.55], [200, -300]);
  const s2Blur = useTransform(smoothProgress, [0.15, 0.25, 0.45, 0.55], ['20px', '0px', '0px', '20px']);
  const s2Scale = useTransform(smoothProgress, [0.25, 0.55], [1, 1.5]);

  // --- SCENE 3: Floating Glass Card (0.45 -> 0.8) ---
  const s3Opacity = useTransform(smoothProgress, [0.45, 0.55, 0.75, 0.85], [0, 1, 1, 0]);
  const s3Y = useTransform(smoothProgress, [0.45, 0.85], [200, -200]);
  const s3RotateX = useTransform(smoothProgress, [0.45, 0.55], [45, 0]);
  const s3Blur = useTransform(smoothProgress, [0.45, 0.55, 0.75, 0.85], ['20px', '0px', '0px', '20px']);

  // --- SCENE 4: Finale (0.75 -> 1.0) ---
  const s4Opacity = useTransform(smoothProgress, [0.75, 0.9, 1], [0, 1, 1]);
  const s4Scale = useTransform(smoothProgress, [0.75, 1], [0.5, 1]);

  // Mouse Parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Background gradient shift based on scroll
  const bgGradient = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [
      'radial-gradient(circle at center, #2a0815 0%, #000000 100%)', // Intro: Dark red/black
      'radial-gradient(circle at center, #3d1022 0%, #000000 100%)', // Gallery: Deep Purple/Pink
      'radial-gradient(circle at center, #59152b 0%, #11050a 100%)', // Card: Warmer red
      'radial-gradient(circle at center, #8b0021 0%, #210008 100%)', // Finale: Glowing red
    ]
  );

  return (
    <motion.div ref={containerRef} className="relative w-full bg-black h-[1000vh]">
      
      {/* Sticky viewport container */}
      <motion.div 
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
        style={{ background: bgGradient, perspective: '1000px' }}
      >

        {/* Ambient Particles */}
        {[...Array(30)].map((_, i) => {
          const depth = Math.random() * 3 + 1; // 1 to 4
          const px = useTransform(mouseX, [-1, 1], [-50 * depth, 50 * depth]);
          const py = useTransform(mouseY, [-1, 1], [-50 * depth, 50 * depth]);
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                background: Math.random() > 0.5 ? '#ffb6c1' : '#ffffff',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                filter: `blur(${Math.random() * 2}px)`,
                x: px,
                y: py,
              }}
              animate={{
                y: [`0px`, `-${Math.random() * 100 + 50}px`],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          );
        })}

        {/* SCENE 1: Intro */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          style={{ opacity: s1Opacity, scale: s1Scale, z: s1Z }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8"
          >
            <Heart className="w-24 h-24 md:w-32 md:h-32 text-[#ff3366] fill-[#ff3366] filter drop-shadow-[0_0_30px_rgba(255,51,102,0.8)]" />
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#ffb6c1] drop-shadow-[0_0_20px_rgba(255,182,193,0.5)] text-center tracking-tight font-display">
            Happy Birthday<br/>{data.targetName} ❤️
          </h1>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-20 text-white/50 text-sm tracking-widest uppercase flex flex-col items-center gap-2"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-white overflow-hidden relative">
               <motion.div 
                  className="absolute top-0 w-full h-full bg-white"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
               />
            </div>
            Scroll to begin
          </motion.div>
        </motion.div>


        {/* SCENE 2: Gallery Frame */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ 
            opacity: s2Opacity, 
            y: s2Y, 
            filter: useTransform(s2Blur, (v) => `blur(${v})`),
            scale: s2Scale
          }}
        >
          <motion.div
            style={{
              rotateX: useTransform(mouseY, [-1, 1], [15, -15]),
              rotateY: useTransform(mouseX, [-1, 1], [-15, 15]),
            }}
            className="relative p-2 md:p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_0_50px_rgba(255,51,102,0.2)]"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ff3366]/20 to-transparent blur-md -z-10"></div>
            
            <img 
              src="/assets/anime_girl_portrait.png" 
              alt={data.targetName}
              className="w-[280px] h-[360px] md:w-[400px] md:h-[500px] object-cover rounded-2xl shadow-inner filter contrast-125"
            />

            {/* Glass reflection highlight */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 rounded-3xl pointer-events-none"
              style={{
                backgroundPosition: useTransform(mouseX, [-1, 1], ['200% 200%', '-100% -100%'])
              }}
            />

            {/* Floating ambient decorations */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-10 -right-10 text-white/50"><Sparkles className="w-16 h-16" /></motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -bottom-8 -left-8 text-[#ff3366]/50"><Star className="w-12 h-12" /></motion.div>
          </motion.div>
        </motion.div>

        {/* SCENE 3: Floating Glass Card */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-30 px-6 pointer-events-none"
          style={{
            opacity: s3Opacity,
            y: s3Y,
            rotateX: s3RotateX,
            filter: useTransform(s3Blur, (v) => `blur(${v})`)
          }}
        >
          <div className="max-w-2xl w-full p-8 md:p-12 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Inner glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffb6c1] to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff3366]/10 to-transparent -z-10"></div>
            
            <p className="text-xl md:text-3xl text-white font-serif leading-relaxed italic text-shadow-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
              "{data.message}"
            </p>
            
            <div className="mt-8 pt-6 border-t border-white/20 flex justify-center items-center gap-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/30"></div>
              <Heart className="w-6 h-6 text-[#ffb6c1] fill-[#ffb6c1]" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/30"></div>
            </div>
          </div>
        </motion.div>

        {/* SCENE 4: Finale */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none bg-gradient-to-t from-black/80 to-transparent"
          style={{ opacity: s4Opacity, scale: s4Scale }}
        >
          <motion.div
             animate={{ scale: [1, 1.1, 1], filter: ['drop-shadow(0 0 20px #ff3366)', 'drop-shadow(0 0 50px #ff3366)', 'drop-shadow(0 0 20px #ff3366)'] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="relative"
          >
             <Heart className="w-32 h-32 md:w-48 md:h-48 text-[#ff3366] fill-[#ff3366] opacity-80" />
             <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-16 h-16 md:w-24 md:h-24 text-white fill-white" />
             </div>
          </motion.div>
          <h2 className="mt-12 text-3xl md:text-6xl font-black text-white tracking-widest uppercase font-display drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
             {data.extraMessage || "Forever Yours ❤️"}
          </h2>
          <p className="mt-4 text-xl text-[#ffb6c1] font-serif italic">
             — {data.senderName || 'Arjun'}
          </p>
        </motion.div>
        
      </motion.div>
    </motion.div>
  );
};
