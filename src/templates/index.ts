import { BirthdayUniverse } from './birthday/birthday-universe';
import { HappyBirthdayClassic } from './birthday/happy-birthday-classic';
import { PopUpStorybook } from './birthday/pop-up-storybook';

export const TEMPLATES = [
  {
    id: 'birthday-universe' as const,
    name: 'Cosmic Universe',
    description: 'A romantic interactive space odyssey. Tap to enter the universe, open the envelope, blow candles on the cake, and reveal surprise gift polaroids.',
    category: 'Birthday',
    component: BirthdayUniverse,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Happy Birthday!',
  },
  {
    id: 'happy-birthday-classic' as const,
    name: 'Happy Birthday Classic',
    description: 'A cheerful celebration with animated floating balloons, a personalized typing greeting, an interactive cake to blow out candles, and a precious memory polaroid carousel.',
    category: 'Birthday',
    component: HappyBirthdayClassic,
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Happy Birthday!',
  },
  {
    id: 'pop-up-storybook' as const,
    name: 'Pop-up Storybook',
    description: 'An elegant folding 3D fairytale book. Turn the vintage pages to watch a gorgeous pop-up castle and customized timeline narrative unfold.',
    category: 'Birthday',
    component: PopUpStorybook,
    thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Your Fairytale Chapter!',
  }
];

export type TemplateId = typeof TEMPLATES[number]['id'];

export const getTemplateById = (id: string) => {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
};
