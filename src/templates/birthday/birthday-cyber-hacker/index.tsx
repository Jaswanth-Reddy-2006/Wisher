import React, { useState, useEffect, useRef } from 'react';
import type { TemplateProps } from '../../types';
import './style.css';

interface DecryptNode {
  id: number;
  x: number;
  y: number;
  active: boolean;
  name: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

type CyberPhase = 'gate' | 'decrypt' | 'memories' | 'console';

export const BirthdayCyberHacker: React.FC<TemplateProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // High-Tech Cyber stages
  const [currentPhase, setCurrentPhase] = useState<CyberPhase>('gate');
  const [firewallDecrypted, setFirewallDecrypted] = useState<number>(0);
  const [glitchingTitle, setGlitchingTitle] = useState<string>('WISHER_DECRYPT_V1');
  
  // Custom glitched polaroids state
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>('');
  
  // Console finale
  const [showConsole, setShowConsole] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isConsoleComplete, setIsConsoleComplete] = useState<boolean>(false);
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [cakeBlownOut, setCakeBlownOut] = useState<boolean>(false);

  // Sound Synth & Sparkles
  const synthCtxRef = useRef<AudioContext | null>(null);
  const sparksRef = useRef<Spark[]>([]);

  // Synthesize digital alarms/ticks programmatically
  const playSound = (type: 'beep' | 'static' | 'decrypt' | 'alarm' | 'success' | 'power_down') => {
    try {
      if (!synthCtxRef.current) {
        synthCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;

      if (type === 'beep') {
        // High square-wave retro chiptune beep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(987.77, now); // B5
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'static') {
        // Decryption radio static white noise burst
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1500, now);
        filter.frequency.exponentialRampToValueAtTime(300, now + 0.25);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        source.start(now);
      } else if (type === 'decrypt') {
        // High-tech ascending laser sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(1600, now + 0.35);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'alarm') {
        // Glitch alarm buzzer sweep down
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(250, now);
        osc.frequency.setValueAtTime(200, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'success') {
        // Glitch computer victory arpeggio
        const notes = [659.25, 783.99, 1046.50, 1318.51]; // E5, G5, C6, E6
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(f, now + i * 0.06);
          gain.gain.setValueAtTime(0.04, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.2);
        });
      } else if (type === 'power_down') {
        // Bass drop down alarm sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.5);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Backing soundtrack loop
  useEffect(() => {
    if (data.musicUrl) {
      const audio = new Audio(data.musicUrl);
      audio.loop = true;
      audioRef.current = audio;
    }
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [data.musicUrl]);

  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Audio blocked:", err));
    }
  };

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error(err));
    }
  };

  // Falling Matrix rain codes canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId: number;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Matrix columns rain setup
    const fontSize = 14;
    const columns = Math.floor(width / fontSize) + 1;
    const drops = Array(columns).fill(1);
    const chars = "0101XYZ MATRIX SYSTEM EXPIRED BY WISHER DEC 2026 DECRYPT GATE".split("");

    const tick = () => {
      // translucent draw to give code trail blur effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0f0'; // matrix green text
      ctx.font = `bold ${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

      // Sparks rendering
      sparksRef.current.forEach(sp => {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.05; // gravity
        sp.alpha -= 0.015;

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.fillRect(Math.floor(sp.x), Math.floor(sp.y), 3, 3);
        ctx.globalAlpha = 1;
      });
      sparksRef.current = sparksRef.current.filter(sp => sp.alpha > 0);

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Title glitch flicker effect loop
  useEffect(() => {
    const glitchedWords = ['WISHER_DECRYPT_V1', 'W1SH3R_SYS_RST', 'WARNING_GLITCH_CRITICAL', 'DECRYPTING_MEMORIES'];
    const interval = setInterval(() => {
      if (Math.random() < 0.25) {
        setGlitchingTitle(glitchedWords[Math.floor(Math.random() * glitchedWords.length)]);
        setTimeout(() => setGlitchingTitle('WISHER_DECRYPT_V1'), 180);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Bypass firewalls minigame node structures
  const INITIAL_NODES: DecryptNode[] = [
    { id: 1, x: 25, y: 35, active: false, name: "CORE_SEC_A" },
    { id: 2, x: 75, y: 25, active: false, name: "FIREWALL_B" },
    { id: 3, x: 40, y: 70, active: false, name: "MEMORY_STK_C" },
    { id: 4, x: 80, y: 75, active: false, name: "DECRYPT_SYS_D" }
  ];
  const [nodes, setNodes] = useState<DecryptNode[]>(INITIAL_NODES);

  const handleNodeClick = (nodeId: number) => {
    if (currentPhase !== 'decrypt') return;
    playSound('beep');
    
    setNodes(prev => prev.map(n => {
      if (n.id === nodeId && !n.active) {
        // unlock particle burst
        for (let i = 0; i < 15; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = 1 + Math.random() * 2.5;
          sparksRef.current.push({
            x: window.innerWidth * (n.x / 100),
            y: window.innerHeight * (n.y / 100),
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            alpha: 1,
            color: '#00ff00'
          });
        }

        setFirewallDecrypted(p => {
          const next = p + 1;
          if (next >= 4) {
            playSound('success');
            setTimeout(() => {
              setCurrentPhase('memories');
            }, 1000);
          }
          return next;
        });

        return { ...n, active: true };
      }
      return n;
    }));
  };

  // Zoom Polaroid memories
  const handleZoomPolaroid = (photoUrl: string, caption: string) => {
    playSound('decrypt');
    setActivePhoto(photoUrl);
    setActiveTitle(caption);
  };

  // Proceeds to decryption logs console unspool
  const handleLoadConsole = () => {
    playSound('static');
    setCurrentPhase('console');
    setShowConsole(true);
  };

  // Candle blowing triggers
  const handleBlowCandle = (idx: number) => {
    if (cakeBlownOut) return;
    const nextLit = [...candlesLit];
    nextLit[idx] = false;
    setCandlesLit(nextLit);
    playSound('power_down');

    if (nextLit.every(v => !v)) {
      setCakeBlownOut(true);
      playSound('success');
      import('canvas-confetti').then((m) => {
        m.default({ particleCount: 60, spread: 80, colors: ['#00ff00', '#003300', '#ffffff'] });
      });
    }
  };

  // Simulated console logs typewriter
  const consoleStrings = [
    "> CONNECTING TO PORT_8080...",
    "> BYPASSING FIRMWARE CORE...",
    "> DECRYPTING MEMORY DATAPACKETS...",
    "> UNLOCKING CELSTIAL INVITATION SIGNATURES...",
    `> SYSTEM SUCCESS: NAVYA INVITATION DECIPHERED!`,
    `> HAPPY BIRTHDAY! NAVYA SYSTEM READY!`
  ];

  useEffect(() => {
    if (!showConsole) return;
    let i = 0;
    const logs: string[] = [];
    const interval = setInterval(() => {
      if (i < consoleStrings.length) {
        logs.push(consoleStrings[i]);
        setConsoleLogs([...logs]);
        playSound('beep');
        i++;
      } else {
        clearInterval(interval);
        setIsConsoleComplete(true);
        playSound('success');
      }
    }, 800);

    return () => clearInterval(interval);
  }, [showConsole]);

  const PHOTO_FALLBACKS = [
    data.photo1 || "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=80",
    data.photo2 || "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    data.photo3 || "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80"
  ];

  const MEMORY_CAPTIONS = [
    "SECTOR_A_MEMORIES ✨",
    "SECTOR_B_LAUGHTER 😂",
    "SECTOR_C_JOY ☀️"
  ];

  const messageText = data.message || "SYSTEM INITIALIZED: WISHING YOU A CELESTIAL SPECTACULAR YEAR FILLED WITH GLITCH-FREE JOY AND ENCRYPTED DISCOVERIES! HAPPY BIRTHDAY!";

  return (
    <div className="cyber-hacker-root select-none font-mono">
      {/* Falling binary matrix canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Retro green scanline overlay */}
      <div className="cyber-crt pointer-events-none" />

      {/* Sound player toggle */}
      <button onClick={toggleMusic} className="cyber-music-btn z-50">
        {isPlaying ? '[ AUDIO ON ]' : '[ AUDIO OFF ]'}
      </button>

      {/* 1. SECURE GATE OVERLAY (Phase 1) */}
      {currentPhase === 'gate' && (
        <div className="secure-gate-overlay flex flex-col items-center justify-center p-6 text-center z-10 w-full h-full">
          <div className="terminal-card p-8 bg-black/90 border border-green-500 rounded-lg max-w-sm animate-fadeIn">
            <div className="terminal-logo mb-6 text-green-500 text-4xl animate-pulse">☠</div>
            <h1 className="terminal-title text-green-500 font-bold">{glitchingTitle}</h1>
            <p className="terminal-subtitle text-green-400 mt-4 uppercase tracking-wider text-[10px]">
              IP logged: 127.0.0.1 - Crypt gate locked
            </p>
            <button onClick={() => { playSound('alarm'); startMusic(); setCurrentPhase('decrypt'); }} className="btn-decrypt mt-8">
              BYPASS CRYPT GATE
            </button>
          </div>
        </div>
      )}

      {/* 2. FIREWALL BYPASS NODES MAP (Phase 2) */}
      {currentPhase === 'decrypt' && (
        <div className="node-board flex flex-col items-center justify-center p-6 z-10 w-full h-full">
          <div className="firewall-bar-pill mb-12">
            [ FIREWALL DECRYPTING: {firewallDecrypted} / 4 NODES BYPASSED ]
          </div>

          <div className="node-map-panel relative w-full max-w-md h-[300px] border border-green-500/30 rounded bg-black/85">
            {nodes.map(n => (
              <div 
                key={n.id}
                onClick={() => handleNodeClick(n.id)}
                className={`cyber-node absolute flex flex-col items-center justify-center cursor-pointer`}
                style={{ top: `${n.y}%`, left: `${n.x}%` }}
              >
                <div className={`node-circle w-6 h-6 rounded-full border-2 ${n.active ? 'border-green-500 bg-green-500/20' : 'border-green-700 bg-black animate-pulse'} flex items-center justify-center`}>
                  <span className="text-[8px] text-green-500">{n.id}</span>
                </div>
                <span className="node-tag text-[7px] text-green-400 mt-1 uppercase font-bold tracking-wider">{n.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. GLITCHED DECRYPTED MEMORIES (Phase 3) */}
      {currentPhase === 'memories' && (
        <div className="decrypt-polaroids-viewport flex flex-col items-center justify-center p-6 z-10 w-full h-full">
          <div className="firewall-bar-pill mb-8">
            [ MEMORY CHIPS RECOVERED - TAP PACKETS TO ZOOM ]
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            {PHOTO_FALLBACKS.map((url, idx) => (
              <div 
                key={idx}
                onClick={() => handleZoomPolaroid(url, MEMORY_CAPTIONS[idx])}
                className="polaroid-packet p-3 bg-black border border-green-500 text-green-400 flex flex-col items-center cursor-pointer shadow-lg hover:scale-105 duration-200"
              >
                <img src={url} alt={MEMORY_CAPTIONS[idx]} className="packet-photo w-32 h-32 object-cover filter sepia hue-rotate-[90deg]" />
                <span className="packet-caption text-[9px] mt-3 font-bold tracking-widest">
                  {MEMORY_CAPTIONS[idx]}
                </span>
              </div>
            ))}
          </div>

          <button onClick={handleLoadConsole} className="btn-decrypt mt-10">
            LOAD FINAL DECRYPT KEY →
          </button>
        </div>
      )}

      {/* 4. CONSOLE TERMINAL FINALE & GLITCH CAKE (Phase 4) */}
      {showConsole && currentPhase === 'console' && (
        <div className="terminal-viewport flex flex-col items-center overflow-y-auto w-full h-full py-16 px-4 z-20">
          
          <div className="terminal-console-panel p-6 bg-black border border-green-500 rounded-lg max-w-xl text-left w-full shadow-2xl">
            <div className="terminal-topbar flex justify-between text-[8px] text-green-500 font-bold mb-4 border-b border-green-500/20 pb-2">
              <span>TERMINAL CORE V2</span>
              <span>SECURE PROTOCOL ACTIVE</span>
            </div>

            <div className="console-log-box flex flex-col gap-2 min-h-[160px]">
              {consoleLogs.map((log, idx) => (
                <div key={idx} className="console-line text-green-400 text-xs font-bold font-mono">
                  {log}
                </div>
              ))}
              {!isConsoleComplete && <div className="console-line text-green-400 text-xs font-bold font-mono animate-pulse">&gt; DECRYPTING DATAPACKET... <span className="custom-console-cursor">_</span></div>}
            </div>

            {isConsoleComplete && (
              <div className="decrypted-wishes-box mt-6 p-4 border border-dashed border-green-500/35 bg-green-500/5 animate-fadeIn">
                <p className="decrypted-greetings text-xs text-green-300 leading-relaxed font-mono uppercase tracking-wider text-center">
                  {messageText}
                </p>
                <div className="signature-terminal mt-6 flex flex-col items-center text-green-400 text-[10px] font-bold tracking-widest">
                  <span>SENDER_ID: {data.senderName || "WISHER"}</span>
                  <span className="mt-1 text-[8px] text-green-600">ENCRYPTION KEY APPROVED</span>
                </div>
              </div>
            )}
          </div>

          {/* Holographic glowing 3D Cake */}
          {isConsoleComplete && (
            <div className="console-cake-block flex flex-col items-center mt-12 animate-fadeIn">
              <div className="hologram-cake relative">
                
                {/* 3 Candles */}
                {candlesLit[0] && (
                  <div className="cnd" style={{ left: '33%' }} onClick={() => handleBlowCandle(0)}>
                    <div className="fl" />
                  </div>
                )}
                {candlesLit[1] && (
                  <div className="cnd" style={{ left: '50%' }} onClick={() => handleBlowCandle(1)}>
                    <div className="fl" />
                  </div>
                )}
                {candlesLit[2] && (
                  <div className="cnd" style={{ left: '67%' }} onClick={() => handleBlowCandle(2)}>
                    <div className="fl" />
                  </div>
                )}

                {/* Layer frames */}
                <div className="layer-cyber layer-cyber-3" />
                <div className="layer-cyber layer-cyber-2" />
                <div className="layer-cyber layer-cyber-1" />
                <div className="cake-cyber-plate" />
              </div>

              <p className="cake-cyber-tag mt-4 animate-pulse">
                {cakeBlownOut ? "☠ TEMPERATURE_DECREASE_COMPLETE: SECRET WISH SAVED! ☠" : "☠ CLICK THE THERMAL SIGNATURE FLAMES TO POWER DOWN! ☠"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 5. MODULAR POLAROID Zoom */}
      {activePhoto && (
        <div className="cyber-zoom-overlay" onClick={() => setActivePhoto(null)}>
          <div className="cyber-zoom-card animate-popIn" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-green-500 font-bold" onClick={() => setActivePhoto(null)}>
              ✕
            </button>
            <img src={activePhoto} alt={activeTitle} className="zoom-packet-img select-none w-full aspect-square object-cover border border-green-500 filter sepia hue-rotate-[90deg] brightness-[1.2]" />
            <div className="zoom-packet-footer text-center mt-3 text-green-400 text-[10px] font-bold tracking-widest">
              {activeTitle}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BirthdayCyberHacker;
