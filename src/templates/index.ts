import { BirthdayUniverse } from './birthday/birthday-universe';
import { HappyBirthdayClassic } from './birthday/happy-birthday-classic';
import { PopUpStorybook } from './birthday/pop-up-storybook';
import { RomanticAnimeBirthday } from './birthday/romantic-anime-birthday';
import { Cinematic3DBirthday } from './birthday/cinematic-3d-birthday';
import { BirthdayOriginal } from './birthday/happy-birthday-original';
import { Galactic3DHeart } from './birthday/galactic-3d-heart';
import { WeddingClassicSonali } from './marriage/wedding-classic-sonali';
import { WeddingRampatra } from './marriage/wedding-rampatra';
import { WeddingRehanMaulidan } from './marriage/wedding-rehan-maulidan';
import { BirthdayGlassmorphismStory } from './birthday/birthday-glassmorphism-story';
import { BirthdaySurpriseEngine } from './birthday/birthday-surprise-engine';
import { BirthdaySkyLanterns } from './birthday/birthday-sky-lanterns';
import { BirthdayPixelArcade } from './birthday/birthday-pixel-arcade';
import { BirthdayBotanicalMagic } from './birthday/birthday-botanical-magic';
import { BirthdayVinylRetro } from './birthday/birthday-vinyl-retro';
import { BirthdayCyberHacker } from './birthday/birthday-cyber-hacker';
import { BirthdayRetroCamera } from './birthday/birthday-retro-camera';

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
  },
  {
    id: 'galactic-3d-heart' as const,
    name: 'Galactic 3D Heart',
    description: 'A luxurious ivory-gold stellar universe with a custom 3D rotating heart particle engine, trailing cursor effects, sky lanterns, and candle-blowing cake interactions.',
    category: 'Birthday',
    component: Galactic3DHeart,
    thumbnail: 'https://images.unsplash.com/photo-1518199266791-5375a83164ba?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Happy Birthday Siri ❤️',
  },
  {
    id: 'birthday-glassmorphism-story' as const,
    name: 'Glassmorphism Storybook',
    description: 'A premium, narrative-driven digital gift featuring a modern glassmorphism design, a pulsing animated gift box, a golden key unlock step, and a sequentially flipping storybook with float ambient music.',
    category: 'Birthday',
    component: BirthdayGlassmorphismStory,
    thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'A Magical Birthday Story',
  },
  {
    id: 'birthday-surprise-engine' as const,
    name: 'Birthday Surprise Engine',
    description: 'A gorgeous interactive multi-section experience featuring a Secret Passcode Gate reveal, dynamic candle-blowing 3D CSS Birthday Cake, modular Polaroid Memories gallery, and a typed handwritten love letter.',
    category: 'Birthday',
    component: BirthdaySurpriseEngine,
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'A Beautiful Birthday Surprise',
  },
  {
    id: 'birthday-sky-lanterns' as const,
    name: 'Stellar Sky Lantern Release',
    description: 'A breathtaking premium midnight sky invitation. Tap anywhere to release glowing warm-amber sky lanterns with floating physical sway, pop open surprise polaroids, and click the crescent moon to pull down an unrolling vintage congratulations scroll.',
    category: 'Birthday',
    component: BirthdaySkyLanterns,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'A Stellar Birthday Celebration',
  },
  {
    id: 'birthday-pixel-arcade' as const,
    name: 'Retro Pixel Arcade',
    description: 'A retro chiptune neon CRT experience. Pop 10 balloons using your heart starship lasers, answer a vintage trivia box, and read a personal slow-typing scroll accompanied by synthesizers.',
    category: 'Birthday',
    component: BirthdayPixelArcade,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Level Complete! Happy Birthday!',
  },
  {
    id: 'birthday-botanical-magic' as const,
    name: '3D Magical Botanical Garden',
    description: 'A breathtaking emerald greenhouse invite. Enter the garden gates, water a mystical pot with a custom glowing watering can, grow a beautiful 3D-style rose, solve a riddle, and unwrap birthday cake and scrolling cursive wishes surrounded by fireflies and nature music.',
    category: 'Birthday',
    component: BirthdayBotanicalMagic,
    thumbnail: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Happy Birthday! Welcome to the Secret Garden!',
  },
  {
    id: 'birthday-vinyl-retro' as const,
    name: 'Virtual Turntable / Neon Vinyl Card',
    description: 'A gorgeous neon-retro vinyl turntable invitation. Enter the headphones gate, drop the metallic needle tonearm to play BGM, watch spinning vinyl and equalizers, flip through memory albums, and unspool private wishes on a cassette liner notes scroll with custom cake candle blowing.',
    category: 'Birthday',
    component: BirthdayVinylRetro,
    thumbnail: 'https://images.unsplash.com/photo-1484755560695-a4c7302c52e9?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Beats playing! Happy Birthday!',
  },
  {
    id: 'birthday-cyber-hacker' as const,
    name: 'Matrix Cyber Decryption Terminal',
    description: 'An extremely crazy hacker room decryption invite. Decrypt firewalls by dragging node coordinates, witness falling binary matrix code rains, decipher glitch ASCII memory Polaroids, and unroll high-tech console wishes carrying a custom green wireframe birthday cake.',
    category: 'Birthday',
    component: BirthdayCyberHacker,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'SYSTEM DECRYPT: Happy Birthday!',
  },
  {
    id: 'birthday-retro-camera' as const,
    name: 'Vintage Shutter Polaroid Camera',
    description: 'A crazy, incredibly cute vintage Shutter Polaroid Camera. Advance silver film cartridges, snap red shutter buttons with screen flash animations, eject physical Polaroid frames, shake them to reveal colors, and read cassette greetings scrolls.',
    category: 'Birthday',
    component: BirthdayRetroCamera,
    thumbnail: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Shutter clicked! Happy Birthday!',
  },
  {
    id: 'wedding-classic-sonali' as const,
    name: 'Sonali Classic Wedding',
    description: 'A luxurious royal wedding invitation featuring cascading sakura petals, interactive traditional background music (Din Shagna Da), dynamic countdown timer, and glassmorphic card design.',
    category: 'Wedding',
    component: WeddingClassicSonali,
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Are getting married',
  },
  {
    id: 'wedding-rampatra' as const,
    name: 'Hitched Elegant (Ram & Antara)',
    description: 'A beautiful single-page responsive wedding website template featuring background music, full story timeline, embedded Maps location, and customized RSVP system.',
    category: 'Wedding',
    component: WeddingRampatra,
    thumbnail: 'https://wedding.ramswaroop.me/img/hero-min.jpg',
    defaultTitle: 'Are getting hitched!',
  },
  {
    id: 'wedding-rehan-maulidan' as const,
    name: 'Hitched Romantic (Rehan & Maulidan)',
    description: 'A gorgeous open-source digital wedding invitation featuring background music (It\'s You), full story, quotes, health protocol guidelines, and customized RSVP system.',
    category: 'Wedding',
    component: WeddingRehanMaulidan,
    thumbnail: 'https://ngodingsolusi.github.io/the-wedding-of-rehan-maulidan/images/readme/half%20circle-200.png',
    defaultTitle: 'Are getting married',
  }
];

export type TemplateId = typeof TEMPLATES[number]['id'];

export const getTemplateById = (id: string) => {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
};
