import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { TEMPLATES } from '../../templates';
import { Sparkles, Gift, Heart, Home, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { renderCardPreview } from '../../components/preview/CardPreview';
import { serializeWishData } from '../../utils/serialization';
import { templateMockData } from '../../utils/mockData';

export const LandingPage: React.FC = () => {
  const heroTextRef = useRef<HTMLHeadingElement | null>(null);
  const heroSubRef = useRef<HTMLParagraphElement | null>(null);
  const heroCTARef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // GSAP landing reveal animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out', delay: 0.2 }
      );
      gsap.fromTo(
        heroSubRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out', delay: 0.4 }
      );
      gsap.fromTo(
        heroCTARef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)', delay: 0.6 }
      );
    });

    return () => ctx.revert();
  }, []);

  // Filter specific templates for the marquee slider
  const previewTemplates = TEMPLATES.filter(tmpl =>
    ['retro-box', 'neon-cyberpunk-vinyl', 'magical-balloon-release', 'elegant-card', 'modern-door'].includes(tmpl.id)
  );
  const doubledTemplates = [...previewTemplates, ...previewTemplates];

  return (
    <div className="min-h-screen bg-white text-[#111111] overflow-x-hidden relative flex flex-col">
      {/* Floating Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex-1 pt-32 pb-20 px-6 md:pt-40 md:pb-32 max-w-6xl mx-auto flex flex-col justify-center items-center text-center">
        {/* Sparkle Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#111111] py-1.5 px-4 font-display text-[10px] font-black uppercase tracking-widest text-[#ffd700] mb-6 shadow-md">
          <Sparkles className="h-3 w-3 fill-current text-gold" />
          Introducing Wisher v1.0
        </div>

        {/* Asymmetrical bold title */}
        <h1
          ref={heroTextRef}
          className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter text-[#111111] max-w-4xl leading-[0.95] mb-6"
        >
          Create custom <span className="text-[#d30f0f]">3D animated</span> pages for your wishes<span className="text-[#d30f0f]">.</span>
        </h1>

        <p
          ref={heroSubRef}
          className="font-display text-base md:text-lg text-[#5e5a52] max-w-xl mb-10 leading-relaxed font-semibold"
        >
          Customize premium templates, simulate live deployments, and share immersive, music-backed 3D moments with your loved ones instantly.
        </p>

        {/* Action Buttons */}
        <div ref={heroCTARef} className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/dashboard"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#d30f0f] py-4 px-8 font-display text-sm font-black uppercase tracking-wider text-white shadow-[0_10px_25px_rgba(211,15,15,0.35)] transition-all duration-300 hover:bg-[#b00c0c] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
          >
            Start Creating <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#works"
            className="inline-flex items-center justify-center gap-1 rounded-full border-2 border-[#111111] py-3.5 px-8 font-display text-sm font-black uppercase tracking-wider text-[#111111] transition-all hover:bg-[#111111] hover:text-white cursor-pointer"
          >
            Browse Works
          </a>
        </div>
      </section>

      {/* Interactive Mockup Grid */}
      <section id="about" className="py-20 bg-white border-y border-[#e5dfd3] px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#d30f0f] text-xs font-black uppercase tracking-widest block mb-3">
              Premium UI/UX Experience
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111] mb-6 leading-tight">
              Emotionally rich, cinematic, and mobile-optimized storytelling.
            </h2>
            <p className="font-display text-sm text-[#5e5a52] leading-relaxed mb-6 font-semibold">
              Don't settle for static cards. Wisher delivers gorgeous 3D interactive pages with synchronized soundscapes, canvas confetti engines, and realistic physics that load immediately on any mobile device.
            </p>

            <ul className="space-y-4">
              {[
                "GPU-Optimized 3D CSS and GSAP transform systems",
                "Browser-autoplay unlock sound overlay workarounds",
                "Instant live hosting url generations",
                "Self-contained downloadable single-page ZIP files"
              ].map((feat, idx) => (
                <li key={idx} className="flex items-center gap-3 font-display text-xs font-bold text-[#111111]">
                  <CheckCircle2 className="h-5 w-5 text-[#d30f0f] shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Graphical Representation */}
          <div className="relative aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-medium border border-[#e5dfd3] bg-neutral-50 p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-[#d30f0f]"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider bg-white px-2.5 py-1 rounded-full shadow-sm">
                wisher-sandbox
              </span>
            </div>

            <div className="my-auto flex flex-col items-center text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#d30f0f]/10 text-[#d30f0f] mb-4">
                <Gift className="h-8 w-8 animate-bounce" />
              </div>
              <h3 className="font-display text-lg font-black text-[#111111]">
                3D Exploding Gift Box Template
              </h3>
              <p className="text-xs text-[#5e5a52] mt-1 max-w-[280px]">
                Click the lid, explode the panels, release confetti, and reveal your birthday wish.
              </p>
            </div>

            <div className="w-full h-1 bg-[#e5dfd3] rounded-full overflow-hidden">
              <div className="w-[70%] h-full bg-[#d30f0f]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Works Slider Section */}
      <section id="works" className="py-20 bg-white border-y border-[#e5dfd3] w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#d30f0f] text-xs font-black uppercase tracking-widest block mb-3">
              Explore Our Templates
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111] leading-none">
              Choose your theme
            </h2>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#d30f0f] hover:text-[#111111] transition-colors mt-4 md:mt-0 cursor-pointer"
          >
            View all templates <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Showcase Cards Infinite Slider Track */}
        <div className="w-full relative py-4 overflow-hidden">
          <style>{`
            @keyframes marquee-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-container {
              overflow: hidden;
              width: 100%;
              mask-image: linear-gradient(to right, transparent, white 8%, white 92%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, white 8%, white 92%, transparent);
            }
            .marquee-track {
              display: flex;
              width: max-content;
              gap: 2.5rem;
              animation: marquee-scroll 45s linear infinite;
              padding-left: 2rem;
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>
          
          <div className="marquee-container">
            <div className="marquee-track">
              {doubledTemplates.map((tmpl, idx) => {
                const Icon = tmpl.id === 'retro-box' ? Gift : tmpl.id === 'elegant-card' ? Heart : Home;
                const mockData = templateMockData[tmpl.id];
                const token = mockData ? serializeWishData(mockData) : '';
                const liveDemoUrl = `/wish/${tmpl.id}?q=${token}`;

                return (
                  <div
                    key={`${tmpl.id}-${idx}`}
                    className="group w-[320px] shrink-0 rounded-3xl bg-white p-6 shadow-soft border border-[#e5dfd3] hover:shadow-medium hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* CSS/SVG Visual Preview */}
                      <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-6 bg-[#f9f9f9] border border-[#e5dfd3]">
                        {renderCardPreview(tmpl.id)}
                        <div className="absolute top-3 left-3 bg-[#111111] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 z-30 select-none">
                          <Icon className="h-3 w-3" />
                          {tmpl.category}
                        </div>
                      </div>

                      <h3 className="font-display text-lg font-black text-[#111111] mb-2 leading-tight">
                        {tmpl.name}
                      </h3>
                      <p className="text-xs text-[#5e5a52] leading-relaxed mb-6 font-semibold line-clamp-2">
                        {tmpl.description}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      {/* Live Demo Trigger */}
                      <a
                        href={liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center rounded-xl border border-[#111111] py-2.5 text-xs font-bold text-[#111111] hover:bg-[#111111] hover:text-white transition-all cursor-pointer text-center uppercase tracking-wider"
                      >
                        Live Demo
                      </a>

                      {/* Customize and edit */}
                      <Link
                        to={`/customizer?template=${tmpl.id}`}
                        className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#d30f0f] py-2.5 text-xs font-bold text-white hover:bg-[#b00c0c] transition-all cursor-pointer text-center uppercase tracking-wider"
                      >
                        Customize
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="steps" className="py-20 bg-white border-t border-[#e5dfd3] px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-[#d30f0f] text-xs font-black uppercase tracking-widest block mb-3">
            Workflow Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111]">
            Deploy in minutes
          </h2>
          <p className="text-xs text-[#5e5a52] mt-3 font-semibold">
            Follow three simple steps to publish your interactive wish page.
          </p>
        </div>

        {/* Vertical timeline steps */}
        <div className="max-w-xl mx-auto space-y-12 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#e5dfd3]">
          {[
            {
              step: "01",
              title: "Choose Template",
              desc: "Select from our gallery of 3D templates tailored for Birthdays, Weddings, and House Warmings.",
            },
            {
              step: "02",
              title: "Customize Live Content",
              desc: "Add your names, upload cover media, specify dates, customize background tracks, and tweak greeting letters inside our live synchronized editor.",
            },
            {
              step: "03",
              title: "Deploy & Share Link",
              desc: "Simulate CDN compiling logs. Receive a unique shareable short-link, or download a portable offline ZIP archive.",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-8 relative items-start">
              <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-white font-display text-sm font-black tracking-tighter">
                {item.step}
              </div>
              <div>
                <h3 className="font-display text-base font-extrabold text-[#111111] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5e5a52] leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-[#111111] text-white py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-black tracking-tighter mb-2">
              wisher<span className="text-[#d30f0f]">.</span>
            </h3>
            <p className="text-xs text-white/50 max-w-xs font-semibold">
              The world's premium canvas editor for 3D interactive wishes and event invitations.
            </p>
          </div>

          <div className="flex gap-6">
            <Link to="/dashboard" className="text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link to="/customizer" className="text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors">
              Customizer
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 gap-4">
          <span>&copy; {new Date().getFullYear()} Wisher Inc. All rights reserved.</span>
          <span>Designed with absolute luxury aesthetic in mind.</span>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
