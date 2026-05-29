import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EnvelopeLetterProps {
  targetName: string;
  senderName: string;
}

export const EnvelopeLetter: React.FC<EnvelopeLetterProps> = ({ targetName, senderName }) => {
  const [textStage, setTextStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setTextStage(1), 1000);
    const t2 = setTimeout(() => setTextStage(2), 2500);
    const t3 = setTimeout(() => setTextStage(3), 4000);
    const t4 = setTimeout(() => setTextStage(4), 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f4ebd8] relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-6" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')", boxShadow: "inset 0 0 80px rgba(92,64,51,0.3)" }}>
      
      {/* Decorative Borders */}
      <div className="absolute inset-3 md:inset-5 border border-[#5d4037]/30 pointer-events-none z-0">
        <div className="absolute inset-1 md:inset-2 border border-[#5d4037]/15"></div>
      </div>

      {/* Letter Content Container */}
      <motion.div 
        className="z-10 max-w-2xl w-full p-8 md:p-12 text-[#3e2723] font-serif leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <motion.p 
          className="text-2xl md:text-3xl mb-8 font-bold italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: textStage >= 1 ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          Dear {targetName},
        </motion.p>
        
        <motion.p 
          className="text-lg md:text-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: textStage >= 2 ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          Happy Birthday! May this universe of stars shine as brightly as you do. Every moment with you feels like discovering a new galaxy, full of wonder and endless beauty.
        </motion.p>

        <motion.p 
          className="text-lg md:text-xl mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: textStage >= 3 ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          I hope your day is filled with love, laughter, and all the magic you bring into the world. You are truly one of a kind.
        </motion.p>

        <motion.div 
          className="text-xl md:text-2xl text-right font-bold italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: textStage >= 4 ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          <p>With all my love,</p>
          <p className="mt-2">{senderName}</p>
        </motion.div>
      </motion.div>

      {/* Wax Seal Decoration */}
      <motion.div 
        className="absolute bottom-10 md:bottom-16 w-24 h-24 md:w-32 md:h-32 bg-[#a31414] rounded-full flex items-center justify-center z-0 opacity-80 mix-blend-multiply"
        style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ delay: 6, duration: 1, type: "spring" }}
      >
        <div className="w-20 h-20 md:w-28 md:h-28 border-2 border-[#ffb6c1]/50 rounded-full flex items-center justify-center">
            <span className="text-[#ffb6c1]/80 text-3xl md:text-5xl font-serif">❤️</span>
        </div>
      </motion.div>

    </div>
  );
};

export default EnvelopeLetter;
