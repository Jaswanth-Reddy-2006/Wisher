import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import PreviewFrame from '../../components/preview/PreviewFrame';
import { ArrowLeft, Rocket, Info, FileText, Music, Sparkles, Paintbrush, CalendarDays, Check, HelpCircle, Image, ChevronDown, ChevronUp } from 'lucide-react';
import { TEMPLATES, getTemplateById } from '../../templates';
import type { WishData } from '../../templates/types';

export const Customizer: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentWish, updateWish, setTemplate } = useStore();

  const activeTemplateId = currentWish.templateType;
  const activeTemplate = getTemplateById(activeTemplateId);

  // Collapsible quiz sections
  const [quizOpen, setQuizOpen] = useState<boolean[]>([true, false, false]);

  // Read URL query parameter on mount
  useEffect(() => {
    const tmplParam = searchParams.get('template');
    const validTemplates: WishData['templateType'][] = [
      'birthday-universe', 
      'happy-birthday-classic', 
      'pop-up-storybook'
    ];
    if (tmplParam && validTemplates.includes(tmplParam as WishData['templateType'])) {
      if (currentWish.templateType !== tmplParam) {
        setTemplate(tmplParam as WishData['templateType']);
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
    { label: 'Romantic Pink', hex: '#ffb6c1' },
    { label: 'Lavender', hex: '#b89df5' },
    { label: 'Coral', hex: '#f5a18a' },
    { label: 'Solar Yellow', hex: '#f7e8a3' },
    { label: 'Ocean Blue', hex: '#60a5fa' },
  ];

  const soundPresets = [
    { label: 'Classic Birthday', name: 'Classic Happy Birthday', url: 'https://raw.githubusercontent.com/ProgrammerGaurav/happy-birthday/master/Happy%20Birthday_files/music.mp3' },
    { label: 'Romantic Piano', name: 'Romantic Piano BGM', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { label: 'Dreamy Ambient', name: 'Dreamy Waltz BGM', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { label: 'Acoustic Guitar', name: 'Acoustic Guitar BGM', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { label: 'Silent / Muted', name: 'None', url: '' },
  ];

  const toggleQuizSection = (idx: number) => {
    const newOpen = [...quizOpen];
    newOpen[idx] = !newOpen[idx];
    setQuizOpen(newOpen);
  };

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
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#d30f0f] py-2 px-4 font-display text-xs font-bold text-white transition-all hover:bg-[#b00c0c] hover:scale-105 active:scale-95 shadow-md cursor-pointer"
          >
            <Rocket className="h-3.5 w-3.5" />
            Deploy
          </button>
        </div>

        {/* Form controls */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
          {/* 1. Template switcher */}
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

          {/* 2. Accent Color */}
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

          {/* 3. Birthday Setup */}
          <div className="space-y-4">
            <label className="flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-[#111111]">
              <CalendarDays className="h-3.5 w-3.5 text-[#d30f0f]" /> 3. Birthday Setup
            </label>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">Wish Heading</span>
              <input
                type="text"
                value={currentWish.title}
                onChange={(e) => updateWish({ title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f]"
                placeholder={activeTemplate.defaultTitle}
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">Birthday Person's Name</span>
              <input
                type="text"
                value={currentWish.targetName}
                onChange={(e) => updateWish({ targetName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f]"
                placeholder="Name"
              />
            </div>


          </div>

          {/* 4. Greeting Message */}
          <div className="space-y-4">
            <label className="flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-[#111111]">
              <FileText className="h-3.5 w-3.5 text-[#d30f0f]" /> 4. Messages
            </label>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">Birthday Wish Message</span>
              <textarea
                value={currentWish.message}
                onChange={(e) => updateWish({ message: e.target.value })}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f] resize-none"
                placeholder="Message"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">"My Heart" Letter Content</span>
              <textarea
                value={currentWish.extraMessage}
                onChange={(e) => updateWish({ extraMessage: e.target.value })}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f] resize-none"
                placeholder="Write your heartfelt letter here..."
              />
            </div>
          </div>

          {/* 5. Hero & Photo Gallery */}
          <div className="space-y-4">
            <label className="flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-[#111111]">
              <Image className="h-3.5 w-3.5 text-[#d30f0f]" /> 5. Photos
            </label>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">Hero Cover Photo URL</span>
              <input
                type="text"
                value={currentWish.bgImage || ''}
                onChange={(e) => updateWish({ bgImage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f]"
                placeholder="https://example.com/photo.jpg"
              />
              {currentWish.bgImage && (
                <img src={currentWish.bgImage} alt="Hero preview" className="w-full h-20 object-cover rounded-lg mt-1 border border-[#e5dfd3]" />
              )}
            </div>

            {[
              { key: 'photo1' as const, label: 'Memory Photo 1' },
              { key: 'photo2' as const, label: 'Memory Photo 2' },
              { key: 'photo3' as const, label: 'Memory Photo 3' },
              { key: 'photo4' as const, label: 'Memory Photo 4' },
            ].map((item) => (
              <div key={item.key} className="space-y-1">
                <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">{item.label}</span>
                <input
                  type="text"
                  value={currentWish[item.key] || ''}
                  onChange={(e) => updateWish({ [item.key]: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f]"
                  placeholder="https://example.com/photo.jpg"
                />
                {currentWish[item.key] && (
                  <img src={currentWish[item.key]} alt={item.label} className="w-full h-16 object-cover rounded-lg mt-1 border border-[#e5dfd3]" />
                )}
              </div>
            ))}
          </div>

          {/* 6. Interactive Quiz */}
          <div className="space-y-4">
            <label className="flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-[#111111]">
              <HelpCircle className="h-3.5 w-3.5 text-[#d30f0f]" /> 6. Quiz Questions
            </label>
            <p className="text-[10px] text-[#5e5a52] font-semibold leading-relaxed">
              Create a fun "How Well Do You Know Me?" quiz. Set 3 questions with 4 answer options each.
            </p>

            {/* Question 1 */}
            {[
              {
                idx: 0,
                qKey: 'quizQ1' as const,
                aKeys: ['quizA1a' as const, 'quizA1b' as const, 'quizA1c' as const, 'quizA1d' as const],
                correctKey: 'quizA1correct' as const,
              },
              {
                idx: 1,
                qKey: 'quizQ2' as const,
                aKeys: ['quizA2a' as const, 'quizA2b' as const, 'quizA2c' as const, 'quizA2d' as const],
                correctKey: 'quizA2correct' as const,
              },
              {
                idx: 2,
                qKey: 'quizQ3' as const,
                aKeys: ['quizA3a' as const, 'quizA3b' as const, 'quizA3c' as const, 'quizA3d' as const],
                correctKey: 'quizA3correct' as const,
              },
            ].map((q) => (
              <div key={q.idx} className="border border-[#e5dfd3] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleQuizSection(q.idx)}
                  className="w-full flex items-center justify-between p-3 bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <span className="text-[10px] font-black text-[#111111] uppercase tracking-wider">
                    Question {q.idx + 1}
                  </span>
                  {quizOpen[q.idx] ? <ChevronUp className="h-3.5 w-3.5 text-[#5e5a52]" /> : <ChevronDown className="h-3.5 w-3.5 text-[#5e5a52]" />}
                </button>

                {quizOpen[q.idx] && (
                  <div className="p-3 space-y-3 bg-white">
                    <input
                      type="text"
                      value={currentWish[q.qKey] || ''}
                      onChange={(e) => updateWish({ [q.qKey]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f]"
                      placeholder="Enter your question..."
                    />

                    {q.aKeys.map((aKey, ai) => (
                      <div key={aKey} className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-pink-500 w-4">{String.fromCharCode(65 + ai)}.</span>
                        <input
                          type="text"
                          value={currentWish[aKey] || ''}
                          onChange={(e) => updateWish({ [aKey]: e.target.value })}
                          className="flex-1 px-3 py-2 rounded-lg border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f]"
                          placeholder={`Answer ${String.fromCharCode(65 + ai)}`}
                        />
                      </div>
                    ))}

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">Correct:</span>
                      <select
                        value={currentWish[q.correctKey] ?? 0}
                        onChange={(e) => updateWish({ [q.correctKey]: parseInt(e.target.value) })}
                        className="px-3 py-1.5 rounded-lg border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f]"
                      >
                        <option value={0}>A</option>
                        <option value={1}>B</option>
                        <option value={2}>C</option>
                        <option value={3}>D</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 7. Background Audio */}
          <div className="space-y-4">
            <label className="flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-[#111111]">
              <Music className="h-3.5 w-3.5 text-[#d30f0f]" /> 7. Background Audio
            </label>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">Preset Soundtracks</span>
              <div className="grid grid-cols-2 gap-2">
                {soundPresets.map((sound) => (
                  <button
                    key={sound.label}
                    onClick={() => updateWish({ musicUrl: sound.url, musicName: sound.name })}
                    className={`rounded-xl p-2 text-left border transition-all text-[10px] font-bold cursor-pointer ${
                      currentWish.musicUrl === sound.url
                        ? 'border-[#d30f0f] bg-[#d30f0f]/5 text-[#d30f0f]'
                        : 'border-[#e5dfd3] bg-white hover:bg-neutral-100'
                    }`}
                  >
                    {sound.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">Custom Audio URL</span>
              <input
                type="text"
                value={currentWish.musicUrl}
                onChange={(e) => updateWish({ musicUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5dfd3] bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#d30f0f] focus:ring-1 focus:ring-[#d30f0f]"
                placeholder="URL (e.g. mp3 file link)"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#5e5a52] uppercase tracking-wider">Soundtrack Display Name</span>
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

        {/* Builder Info tip */}
        <div className="p-4 border-t border-[#e5dfd3] bg-[#fdfdfb] flex gap-3 text-[#5e5a52]">
          <Info className="h-4.5 w-4.5 shrink-0 text-[#d30f0f] mt-0.5" />
          <p className="text-[10px] leading-relaxed font-semibold">
            All updates synchronize in real time. Click <strong>Deploy</strong> to generate a shareable URL with all your customizations embedded.
          </p>
        </div>
      </aside>

      {/* RIGHT PREVIEW */}
      <main className="flex-1 h-1/2 md:h-full overflow-hidden">
        <PreviewFrame />
      </main>
    </div>
  );
};
export default Customizer;
