import { RetroBox } from './birthday/retro-box';
import { NeonCyberpunkVinyl } from './birthday/neon-cyberpunk-vinyl';
import { PopUpStorybook } from './birthday/pop-up-storybook';
import { CosmicConstellation } from './birthday/cosmic-constellation';

import { ElegantCard } from './marriage/elegant-card';
import { WaxSealScroll } from './marriage/wax-seal-scroll';
import { InfinityOrigamiFold } from './marriage/infinity-origami-fold';
import { GlassBotanicalBox } from './marriage/glass-botanical-box';

import { ModernDoor } from './housewarming/modern-door';
import { BlueprintToBrick } from './housewarming/blueprint-to-brick';
import { IsometricNeighborhood } from './housewarming/isometric-neighborhood';
import { CozyMailboxReveal } from './housewarming/cozy-mailbox-reveal';

export const TEMPLATES = [
  // Birthday Category
  {
    id: 'retro-box' as const,
    name: 'Retro 3D Gift Box',
    description: 'A 3D exploding gift box with ribbon details, custom balloons, and a rising birthday greeting card.',
    category: 'Birthday',
    component: RetroBox,
    thumbnail: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Happy Birthday!',
  },
  {
    id: 'neon-cyberpunk-vinyl' as const,
    name: 'Neon Cyberpunk Vinyl',
    description: 'A dark retro-future synthwave sleeve hosting a glowing spinning vinyl record disc and holographic details.',
    category: 'Birthday',
    component: NeonCyberpunkVinyl,
    thumbnail: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Synthwave B-Day',
  },
  {
    id: 'pop-up-storybook' as const,
    name: 'Papercraft Storybook',
    description: 'A rustic leather fairytale book popping open with layered cardboard balloons, birthday cakes, and old parchment messages.',
    category: 'Birthday',
    component: PopUpStorybook,
    thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Fairytale Tale',
  },
  {
    id: 'cosmic-constellation' as const,
    name: 'Stellar Constellation',
    description: 'A celestial stardust sky backdrop where connecting star nodes draw lines, forming spelling-maps of your name.',
    category: 'Birthday',
    component: CosmicConstellation,
    thumbnail: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Written in Stars',
  },

  // Wedding/Marriage Category
  {
    id: 'elegant-card' as const,
    name: 'Elegant Booklet Page Flip',
    description: 'A gold-foiled wedding invitation card featuring elegant serif typography and realistic 3D flipping page waltz.',
    category: 'Wedding',
    component: ElegantCard,
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Together Forever',
  },
  {
    id: 'wax-seal-scroll' as const,
    name: 'Royal Wax Seal Scroll',
    description: 'An ivory linen paper roll bound by a 3D crimson wax stamp seal which splits open, vertically rolling out invite cylinder sheets.',
    category: 'Wedding',
    component: WaxSealScroll,
    thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Royal Union',
  },
  {
    id: 'infinity-origami-fold' as const,
    name: 'Infinity Origami Fold',
    description: 'A geometric grid card with square folding flaps that flip open 180-degrees (up/down/sideways) showing layers of content.',
    category: 'Wedding',
    component: InfinityOrigamiFold,
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Endless Origami',
  },
  {
    id: 'glass-botanical-box' as const,
    name: 'Glass Botanical Box',
    description: 'A clear glassmorphic showcase capsule decorated with golden frames and botanical vine layers with device orientation tilt.',
    category: 'Wedding',
    component: GlassBotanicalBox,
    thumbnail: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Botanical Case',
  },

  // Housewarming Category
  {
    id: 'modern-door' as const,
    name: 'Modern Entrance Unlock',
    description: 'A contemporary front door entrance with virtual key-unlock sweep and immersive interior invitation reveal.',
    category: 'House Warming',
    component: ModernDoor,
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Our New Home',
  },
  {
    id: 'blueprint-to-brick' as const,
    name: 'Blueprint to Brick',
    description: 'A technical grid drawing draft morphing dynamically into vertical wireframe structural walls, raising a 3D isometric house.',
    category: 'House Warming',
    component: BlueprintToBrick,
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Built from Blueprints',
  },
  {
    id: 'isometric-neighborhood' as const,
    name: 'Isometric Neighborhood Key',
    description: 'A low-poly 3D angled neighborhood block where a gold key descends down the chimney, popping open the house roof to peer inside.',
    category: 'House Warming',
    component: IsometricNeighborhood,
    thumbnail: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Neighborhood Key',
  },
  {
    id: 'cozy-mailbox-reveal' as const,
    name: 'Curbside Mailbox Reveal',
    description: 'A vintage metal lawn mailbox where pulling down the red indicator flag opens the front lid, sliding a sealed letter card forward.',
    category: 'House Warming',
    component: CozyMailboxReveal,
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Letter in Mailbox',
  }
];

export type TemplateId = typeof TEMPLATES[number]['id'];

export const getTemplateById = (id: string) => {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
};
