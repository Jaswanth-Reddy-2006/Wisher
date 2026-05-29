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

  const isWedding = ['elegant-card', 'wax-seal-scroll', 'infinity-origami-fold', 'glass-botanical-box'].includes(activeTemplateId);
  const isHousewarming = ['modern-door', 'blueprint-to-brick', 'isometric-neighborhood', 'cozy-mailbox-reveal'].includes(activeTemplateId);
  const isBirthday = !isWedding && !isHousewarming;

  // Read URL query parameter on mount to set initial template if requested
  useEffect(() => {
    const tmplParam = searchParams.get('template');
    const validTemplates: WishData['templateType'][] = [
      'retro-box', 'neon-cyberpunk-vinyl', 'pop-up-storybook', 'cosmic-constellation', 'magical-balloon-release',
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
    { label: 'Skate Navy', hex: '#102a43' },
    { label: 'Lavender', hex: '#b89df5' },
    { label: 'Coral', hex: '#f5a18a' },
    { label: 'Solar Yellow', hex: '#f7e8a3' },
    { label: 'Emerald', hex: '#2d6a4f' },
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
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#5e5a52] hover:bg-neutral-100 hover:text-[#111111] transition-colors cursor-pointer"
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
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#102a43] py-2 px-4 font-display text-xs font-bold text-white transition-all hover:bg-[#1e3d64] hover:scale-105 active:scale-95 shadow-md cursor-pointer"
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
              <Sparkles className="h-3.5 w-3.5 text-[#102a43]" /> 1. Select Template
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => handleTemplateChange(tmpl.id)}
                  className={`rounded-xl p-2.5 text-left border transition-all cursor-pointer flex flex-col justify-between h-[80px] ${
                    activeTemplateId === tmpl.id
                      ? 'border-[#102a43] bg-[#102a43]/5 text-[#102a43]'
                      : 'border-[#e5dfd3] bg-white hover:bg-neutral-100'
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
              <Paintbrush className="h-3.5 w-3.5 text-[#102a43]" /> 2. Accent Color
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
              <CalendarDays className="h-3.5 w-3.5 text-[#102a43]" /> 3. {
                isBirthday ? "Birthday Setup" : 
                isWedding ? "Wedding Setup" : 
                activeTemplate.category === 'Graduation' ? "Graduation Setup" :
                activeTemplate.category === 'Baby Shower' ? "Baby Shower Setup" :
                "Event Setup"
              }
            </label>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                {isBirthday ? "Wish Heading" : "Event Heading"}
              </span>
              <input
                type="text"
                value={currentWish.title}
                onChange={(e) => updateWish({ title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43]"
                placeholder={activeTemplate.defaultTitle}
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                {isBirthday ? "Birthday Person's Name" : "Celebrant / Hosts Names"}
              </span>
              <input
                type="text"
                value={currentWish.targetName}
                onChange={(e) => updateWish({ targetName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43]"
                placeholder="Name"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                {isBirthday ? "Birth Date / Celebration Date" : "Event Date"}
              </span>
              <input
                type="datetime-local"
                value={currentWish.date}
                onChange={(e) => updateWish({ date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43]"
              />
            </div>

            {/* Wedding specific fields */}
            {isWedding && (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                    Bride's Name
                  </span>
                  <input
                    type="text"
                    value={currentWish.brideName || ''}
                    onChange={(e) => updateWish({ brideName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43]"
                    placeholder="e.g. Sarah Jennings"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                    Groom's Name
                  </span>
                  <input
                    type="text"
                    value={currentWish.groomName || ''}
                    onChange={(e) => updateWish({ groomName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43]"
                    placeholder="e.g. David Miller"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                    Ceremony Time
                  </span>
                  <input
                    type="text"
                    value={currentWish.weddingTime || ''}
                    onChange={(e) => updateWish({ weddingTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43]"
                    placeholder="e.g. 5:00 PM"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                    Venue Name
                  </span>
                  <input
                    type="text"
                    value={currentWish.venueName || ''}
                    onChange={(e) => updateWish({ venueName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43]"
                    placeholder="e.g. The Grand Plaza, Crystal Ballroom"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                    Venue Google Maps URL
                  </span>
                  <input
                    type="text"
                    value={currentWish.googleMapsUrl || ''}
                    onChange={(e) => updateWish({ googleMapsUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43]"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </>
            )}
          </div>

          {/* 4. Greeting Text Block values */}
          <div className="space-y-4">
            <label className="flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-[#111111]">
              <FileText className="h-3.5 w-3.5 text-[#102a43]" /> 4. {isBirthday ? "Wishing Message" : "Invitation Letter"}
            </label>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                {isBirthday ? "Birthday Wish Message" : "Main Invite Message"}
              </span>
              <textarea
                value={currentWish.message}
                onChange={(e) => updateWish({ message: e.target.value })}
                rows={4}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43] resize-none"
                placeholder="Message"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                {isBirthday ? "Extra Greeting / P.S. (Optional)" : "Venue Details / Extra Info"}
              </span>
              <textarea
                value={currentWish.extraMessage}
                onChange={(e) => updateWish({ extraMessage: e.target.value })}
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43] resize-none"
                placeholder={isBirthday ? "e.g. Hope your day is super magical!" : "Address / Directions"}
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">
                {isBirthday ? "Contact Email (Optional)" : "RSVP Contact Email"}
              </span>
              <input
                type="email"
                value={currentWish.rsvpEmail}
                onChange={(e) => updateWish({ rsvpEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43]"
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* 5. Sound tracks settings */}
          <div className="space-y-4">
            <label className="flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-[#111111]">
              <Music className="h-3.5 w-3.5 text-[#102a43]" /> 5. Background Audio
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
                        ? 'border-[#102a43] bg-[#102a43]/5 text-[#102a43]'
                        : 'border-[#e5dfd3] bg-white hover:bg-neutral-100'
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43]"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#102a43] focus:ring-1 focus:ring-[#102a43]"
                placeholder="Ambient Instrumental"
              />
            </div>
          </div>
        </div>

        {/* Builder Info Overlay tip */}
        <div className="p-4 border-t border-[#e5dfd3] bg-[#fdfdfb] flex gap-3 text-[#5e5a52]">
          <Info className="h-4.5 w-4.5 shrink-0 text-[#102a43] mt-0.5" />
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
