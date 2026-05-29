import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import HeartParticles from './HeartParticles';

interface IntroScreenProps {
  targetName: string;
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ targetName, onEnter }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1500);
    const t2 = setTimeout(() => setStep(2), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        key="intro"
        className="fixed inset-0 z-40 bg-[#030014] flex flex-col items-center justify-center overflow-hidden"
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <HeartParticles />
          </Canvas>
        </div>
        
        <div className="z-10 flex flex-col items-center text-center space-y-8 mt-40">
          <motion.h1 
            className="text-4xl md:text-6xl font-serif px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ color: "#ffb6c1", textShadow: "0 0 20px rgba(255, 182, 193, 0.6)" }}
          >
            Happy Birthday {targetName} ❤️
          </motion.h1>

          {step >= 1 && (
            <motion.p
              className="text-xl md:text-3xl font-sans text-white italic drop-shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
            >
              A small universe made only for you...
            </motion.p>
          )}

          {step >= 2 && (
            <motion.button
              onClick={onEnter}
              className="mt-12 px-8 py-3 rounded-full border-2 border-[#ffb6c1] text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#ffb6c1]/20 transition-colors bg-[#ffb6c1]/10 backdrop-blur-md cursor-pointer"
              style={{ boxShadow: "0 0 15px rgba(255,182,193,0.5)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 182, 193, 0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ Enter Universe
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroScreen;
