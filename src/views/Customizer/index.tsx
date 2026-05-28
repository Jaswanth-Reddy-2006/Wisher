import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import PreviewFrame from '../../components/preview/PreviewFrame';
import { ArrowLeft, Rocket, Info, FileText, Music, Sparkles, Paintbrush, CalendarDays, Check } from 'lucide-react';
import { TEMPLATES, getTemplateById } from '../../templates';
import type { WishData } from '../../templates/types';

export const Customizer: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentWish, updateWish, setTemplate } = useStore();

  const activeTemplateId = currentWish.templateType;
  const activeTemplate = getTemplateById(activeTemplateId);

  // Read URL query parameter on mount to set initial template if requested
  useEffect(() => {
    const tmplParam = searchParams.get('template');
    const validTemplates: WishData['templateType'][] = [
      'retro-box', 'neon-cyberpunk-vinyl', 'pop-up-storybook', 'cosmic-constellation',
      'elegant-card', 'wax-seal-scroll', 'infinity-origami-fold', 'glass-botanical-box',
      'modern-door', 'blueprint-to-brick', 'isometric-neighborhood', 'cozy-mailbox-reveal'
    ];
    if (tmplParam && validTemplates.includes(tmplParam as any)) {
      if (currentWish.templateType !== tmplParam) {
        setTemplate(tmplParam as any);
      }
    }
  }, [searchParams, setTemplate, currentWish.templateType]);

  const handlePublish = () => {
    navigate('/deploy');
  };

  const handleTemplateChange = (id: WishData['templateType']) => {
    setTemplate(id);
  };

  const colorPresets = [
    { label: 'Crimson', hex: '#d30f0f' },
    { label: 'Gold', hex: '#d4af37' },
    { label: 'Ocean', hex: '#219ebc' },
    { label: 'Emerald', hex: '#2d6a4f' },
    { label: 'Grape', hex: '#7b2cbf' },
  ];

  const soundPresets = [
    { label: 'Birthday Piano', name: 'Happy Birthday Piano Tune', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { label: 'Marriage Waltz', name: 'Ethereal Marriage Waltz', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { label: 'Acoustic Guitar', name: 'Warm Home Acoustic', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { label: 'Silent / Muted', name: 'None', url: '' },
  ];

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden bg-white text-[#111111]">
      {/* LEFT SIDEBAR: CONTROLS */}
      <aside className="w-full md:w-[420px] h-1/2 md:h-full flex flex-col border-r border-[#e5dfd3] bg-white z-10 shrink-0">
        {/* Sidebar Header */}
        <div className="p-5 border-b border-[#e5dfd3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#5e5a52] hover:bg-[#f5f2eb] hover:text-[#111111] transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </button>
            <div>
              <h2 className="font-display text-sm font-black text-[#111111]">
                Wisher Editor
              </h2>
              <span className="text-[10px] text-[#5e5a52] font-semibold uppercase tracking-wider block">
                {activeTemplate.name}
              </span>
            </div>
          </div>

          <button
            onClick={handlePublish}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#d30f0f] py-2 px-4 font-display text-xs font-bold text-white transition-all hover:bg-[#b00c0c] hover:scale-105 active:scale-95 shadow-md cursor-pointer"
          >
            <Rocket className="h-3.5 w-3.5" />
            Deploy
          </button>
        </div>

        {/* Form controls container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
          {/* 1. Template switcher selector */}
          <div className="space-y-3">
            <label className="flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-[#111111]">
              <Sparkles className="h-3.5 w-3.5 text-[#d30f0f]" /> 1. Select Template
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => handleTemplateChange(tmpl.id)}
                  className={`rounded-xl p-2.5 text-left border transition-all cursor-pointer flex flex-col justify-between h-[80px] ${
                    activeTemplateId === tmpl.id
                      ? 'border-[#d30f0f] bg-[#d30f0f]/5 text-[#d30f0f]'
                      : 'border-[#e5dfd3] bg-white hover:bg-[#f5f2eb]'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5e5a52]">
                    {tmpl.category}
                  </span>
                  <span className="text-[10px] font-black text-[#111111] leading-tight truncate">
                    {tmpl.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Brand Color Palette Presets */}
          <div className="space-y-3">
            <label className="flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-[#111111]">
              <Paintbrush className="h-3.5 w-3.5 text-[#d30f0f]" /> 2. Accent Color
            </label>
            <div className="flex gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.hex}
                  onClick={() => updateWish({ primaryColor: preset.hex })}
                  className="relative h-8 w-8 rounded-full border border-black/10 cursor-pointer hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                  style={{ backgroundColor: preset.hex }}
                  title={preset.label}
                >
                  {currentWish.primaryColor === preset.hex && (
                    <Check className="h-3.5 w-3.5 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Event Setup metadata fields */}
          <div className="space-y-4">
            <label className="flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-[#111111]">
              <CalendarDays className="h-3.5 w-3.5 text-[#d30f0f]" /> 3. Event Setup
            </label>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                Event Heading
              </span>
              <input
                type="text"
                value={currentWish.title}
                onChange={(e) => updateWish({ title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f]"
                placeholder={activeTemplate.defaultTitle}
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                Celebrant / Hosts Names
              </span>
              <input
                type="text"
                value={currentWish.targetName}
                onChange={(e) => updateWish({ targetName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f]"
                placeholder="Name"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                Event Date & Time
              </span>
              <input
                type="datetime-local"
                value={currentWish.date}
                onChange={(e) => updateWish({ date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f]"
              />
            </div>
          </div>

          {/* 4. Greeting Text Block values */}
          <div className="space-y-4">
            <label className="flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-[#111111]">
              <FileText className="h-3.5 w-3.5 text-[#d30f0f]" /> 4. Invitation Letter
            </label>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                Main Invite Message
              </span>
              <textarea
                value={currentWish.message}
                onChange={(e) => updateWish({ message: e.target.value })}
                rows={4}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f] resize-none"
                placeholder="Message"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                Venue Details / Extra Info
              </span>
              <textarea
                value={currentWish.extraMessage}
                onChange={(e) => updateWish({ extraMessage: e.target.value })}
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f] resize-none"
                placeholder="Address / Directions"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                RSVP Contact Email
              </span>
              <input
                type="email"
                value={currentWish.rsvpEmail}
                onChange={(e) => updateWish({ rsvpEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f]"
                placeholder="rsvp@example.com"
              />
            </div>
          </div>

          {/* 5. Sound tracks settings */}
          <div className="space-y-4">
            <label className="flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-[#111111]">
              <Music className="h-3.5 w-3.5 text-[#d30f0f]" /> 5. Background Audio
            </label>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                Preset Soundtracks
              </span>
              <div className="grid grid-cols-2 gap-2">
                {soundPresets.map((sound) => (
                  <button
                    key={sound.label}
                    onClick={() => updateWish({ musicUrl: sound.url, musicName: sound.name })}
                    className={`rounded-xl p-2 text-left border transition-all text-[10px] font-bold cursor-pointer ${
                      currentWish.musicUrl === sound.url
                        ? 'border-[#d30f0f] bg-[#d30f0f]/5 text-[#d30f0f]'
                        : 'border-[#e5dfd3] bg-white hover:bg-[#f5f2eb]'
                    }`}
                  >
                    {sound.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                Custom Audio Track Link
              </span>
              <input
                type="text"
                value={currentWish.musicUrl}
                onChange={(e) => updateWish({ musicUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f]"
                placeholder="URL (e.g. mp3 file link)"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                Soundtrack Display Name
              </span>
              <input
                type="text"
                value={currentWish.musicName}
                onChange={(e) => updateWish({ musicName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f]"
                placeholder="Ambient Instrumental"
              />
            </div>
          </div>
        </div>

        {/* Builder Info Overlay tip */}
        <div className="p-4 border-t border-[#e5dfd3] bg-[#fdfdfb] flex gap-3 text-[#5e5a52]">
          <Info className="h-4.5 w-4.5 shrink-0 text-[#d30f0f] mt-0.5" />
          <p className="text-[10px] leading-relaxed font-semibold">
            All updates synchronize in real time. Switch device sizes in the toolbar to check mobile viewport fit.
          </p>
        </div>
      </aside>

      {/* RIGHT PREVIEW: LIVE DYNAMIC IFRAME */}
      <main className="flex-1 h-1/2 md:h-full overflow-hidden">
        <PreviewFrame />
      </main>
    </div>
  );
};
export default Customizer;
