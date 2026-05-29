import { BirthdayUniverse } from './birthday/birthday-universe';
import { HappyBirthdayClassic } from './birthday/happy-birthday-classic';
import { PopUpStorybook } from './birthday/pop-up-storybook';
import { RomanticAnimeBirthday } from './birthday/romantic-anime-birthday';
import { Cinematic3DBirthday } from './birthday/cinematic-3d-birthday';
import { BirthdayOriginal } from './birthday/happy-birthday-original';

export const TEMPLATES = [
  // BIRTHDAYS
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
  },
  {
    id: 'romantic-anime-birthday' as const,
    name: 'Romantic Anime Dream',
    description: 'A deeply romantic, cute, and cinematic anime-style birthday experience with floating balloons, confetti, and emotional love letters.',
    category: 'Birthday',
    component: RomanticAnimeBirthday,
    thumbnail: 'https://images.unsplash.com/photo-1518199266791-5375a83164ba?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Happy Birthday My Love!',
  },
  {
    id: 'cinematic-3d-birthday' as const,
    name: 'Cinematic 3D Dream',
    description: 'An ultra-premium futuristic 3D cinematic birthday experience with glassmorphism, depth parallax, and glowing romantic scenes.',
    category: 'Birthday',
    component: Cinematic3DBirthday,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Happy Birthday Navya ❤️',
  },
  {
    id: 'birthday-original' as const,
    name: 'Birthday Original (Retro)',
    description: 'The legendary interactive step-by-step birthday present. Turn on lights, play music, mount banners, fly balloons, fade in the cake, light candles, and read a personal slow-typing story note.',
    category: 'Birthday',
    component: BirthdayOriginal,
    thumbnail: '/templates/birthday-original/images/photo1.jpg',
    defaultTitle: 'Happy Birthday!',
  }
];

export type TemplateId = typeof TEMPLATES[number]['id'];

export const getTemplateById = (id: string) => {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
};
