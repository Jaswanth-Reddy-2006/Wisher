import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === '/dashboard';

  const handleScrollTo = (id: string) => {
    // If not on landing page, navigate there first
    if (window.location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (isDashboard) {
    return (
      <div className="absolute top-6 left-6 md:top-8 md:left-12 z-50">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-display text-lg font-black tracking-tighter text-[#111111]"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-red text-white transition-transform duration-300 hover:rotate-12">
            <Sparkles className="h-4 w-4 fill-current" />
          </div>
          wishes<span className="text-accent-red">.</span>
        </Link>
      </div>
    );
  }

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="glassmorphism rounded-full px-6 py-3 flex items-center justify-between shadow-soft border border-white/40">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-display text-lg font-black tracking-tighter text-[#111111]"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-red text-white transition-transform duration-300 hover:rotate-12">
            <Sparkles className="h-4 w-4 fill-current" />
          </div>
          wishes<span className="text-accent-red">.</span>
        </Link>

        {/* Navigation Links - Hidden on Dashboard */}
        {!isDashboard && (
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleScrollTo('about')}
              className="font-display text-xs font-bold text-[#5e5a52] uppercase tracking-widest hover:text-[#111111] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handleScrollTo('works')}
              className="font-display text-xs font-bold text-[#5e5a52] uppercase tracking-widest hover:text-[#111111] transition-colors cursor-pointer"
            >
              Works
            </button>
            <button
              onClick={() => handleScrollTo('steps')}
              className="font-display text-xs font-bold text-[#5e5a52] uppercase tracking-widest hover:text-[#111111] transition-colors cursor-pointer"
            >
              How it works
            </button>
          </nav>
        )}

        {/* Call to Action - Hidden on Dashboard */}
        {!isDashboard && (
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="rounded-full bg-[#111111] py-2 px-5 font-display text-xs font-extrabold uppercase tracking-wider text-white transition-all duration-300 hover:bg-accent-red-hover hover:scale-105 active:scale-95 shadow-md"
            >
              Start
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Navbar;
