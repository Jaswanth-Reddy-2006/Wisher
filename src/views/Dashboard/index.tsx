import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { TEMPLATES } from '../../templates';
import { useStore } from '../../store/useStore';
import { Search, SlidersHorizontal, Gift, Heart, Home, Trophy, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { WishData } from '../../templates/types';
import { serializeWishData } from '../../utils/serialization';
import { templateMockData } from '../../utils/mockData';
import { renderCardPreview } from '../../components/preview/CardPreview';


export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const setTemplate = useStore((state) => state.setTemplate);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Birthday', 'Wedding', 'House Warming', 'Graduation', 'Baby Shower'];

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
    <div className="min-h-screen bg-[#faf8f5] text-[#121212] pb-20 relative flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 pt-32 w-full flex flex-col">
        {/* Full-bleed Header Toolbar & Filters */}
        <div className="w-full px-6 md:px-10 mb-8">
          {/* Header toolbar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#121212] placeholder:text-[#5e5a52] focus:outline-none focus:border-[#5a25e6] focus:ring-1 focus:ring-[#5a25e6] transition-all"
              />
            </div>
          </div>

          {/* Filter Categories pills (no border-b line) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 select-none scrollbar-none">
            <SlidersHorizontal className="h-4 w-4 text-[#5e5a52] mr-2 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 font-display text-[10px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-[#5a25e6] text-white border-[#5a25e6] shadow-md shadow-[#5a25e6]/20 hover:bg-[#4517bf] hover:border-[#4517bf]'
                    : 'bg-white/90 text-[#5e5a52] border-[#e5dfd3]/60 hover:bg-[#5a25e6]/5 hover:text-[#5a25e6] hover:border-[#5a25e6]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid Container - Full-bleed px-0 & gap-0 */}
        {filteredTemplates.length > 0 ? (
          <div className="w-full px-1 pb-16">
            <motion.div 
              layout 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px]"
            >
              <AnimatePresence mode="popLayout">
                {filteredTemplates.map((tmpl) => {
                  const Icon = tmpl.category === 'Birthday' ? Gift : 
                               tmpl.category === 'Wedding' ? Heart : 
                               tmpl.category === 'Graduation' ? Trophy : 
                               tmpl.category === 'Baby Shower' ? Sparkles : 
                               Home;
                  const mockData = templateMockData[tmpl.id];
                  const token = mockData ? serializeWishData(mockData) : '';
                  const liveDemoUrl = `/wish/${tmpl.id}?q=${token}`;

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      key={tmpl.id}
                      className="group flex flex-col justify-between bg-white p-3 rounded-none border-0 hover:bg-neutral-50/80 transition-all duration-300 relative"
                    >
                      <div>
                        {/* CSS/SVG cover preview */}
                        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3.5 bg-[#f9f9f9] border border-neutral-100/30">
                          {renderCardPreview(tmpl.id)}
                          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md border border-[#e5dfd3]/80 text-[#5a25e6] text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-30 select-none">
                            <Icon className="h-3 w-3" />
                            {tmpl.category}
                          </div>
                        </div>

                        <h3 className="font-display text-sm font-black text-[#121212] mb-1 leading-tight">
                          {tmpl.name}
                        </h3>
                        <p className="text-[10px] text-[#5e5a52] leading-relaxed mb-3 font-semibold line-clamp-2">
                          {tmpl.description}
                        </p>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        {/* Live Demo Trigger */}
                        <a
                          href={liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center rounded-xl border border-neutral-200/80 py-2.5 text-[10px] font-black text-[#5e5a52] hover:bg-[#121212] hover:text-white hover:border-[#121212] transition-all duration-300 cursor-pointer text-center uppercase tracking-widest"
                        >
                          Live Demo
                        </a>

                        {/* Customize and edit */}
                        <button
                          onClick={() => handleSelectTemplate(tmpl.id)}
                          className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#5a25e6] py-2.5 text-[10px] font-black text-white hover:bg-[#4517bf] hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#5a25e6]/15 hover:shadow-lg hover:shadow-[#5a25e6]/25 transition-all duration-300 cursor-pointer uppercase tracking-widest"
                        >
                          Customize
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center w-full bg-white border-y border-[#e5dfd3]">
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
