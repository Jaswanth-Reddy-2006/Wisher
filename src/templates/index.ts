import { RetroBox } from './birthday/retro-box';
import { NeonCyberpunkVinyl } from './birthday/neon-cyberpunk-vinyl';
import { PopUpStorybook } from './birthday/pop-up-storybook';
import { CosmicConstellation } from './birthday/cosmic-constellation';
import { MagicalBalloonRelease } from './birthday/magical-balloon-release';

import { ElegantCard } from './marriage/elegant-card';
import { WaxSealScroll } from './marriage/wax-seal-scroll';
import { InfinityOrigamiFold } from './marriage/infinity-origami-fold';
import { GlassBotanicalBox } from './marriage/glass-botanical-box';

import { ModernDoor } from './housewarming/modern-door';
import { BlueprintToBrick } from './housewarming/blueprint-to-brick';
import { IsometricNeighborhood } from './housewarming/isometric-neighborhood';
import { CozyMailboxReveal } from './housewarming/cozy-mailbox-reveal';

import { CapToss } from './graduation/cap-toss';
import { StorkDelivery } from './babyshower/stork-delivery';

import { SilkRibbonEnvelope } from './marriage/silk-ribbon-envelope';
import { GoldenKeycard } from './housewarming/golden-keycard';

import { CosmicGalaxyPortal } from './birthday/cosmic-galaxy-portal';
import { DiplomaRollUnwrap } from './graduation/diploma-roll-unwrap';

import { CurtainSpotlight } from './graduation/curtain-spotlight';
import { NurseryMobile } from './babyshower/nursery-mobile';
import { GardenGate } from './marriage/garden-gate';
import { RingDoorbell } from './housewarming/ring-doorbell';

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
  {
    id: 'magical-balloon-release' as const,
    name: 'Magical Balloon Release',
    description: 'A cluster of colorful helium balloons bound by a custom gift tag. Pop the knot to release the balloons and unveil the wishes.',
    category: 'Birthday',
    component: MagicalBalloonRelease,
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Birthday Wishes',
  },
  {
    id: 'cosmic-galaxy-portal' as const,
    name: 'Cosmic Galaxy Portal',
    description: 'Spinning stellar dust portal in dark space. Tap the galaxy core to reveal the stars and birthday details.',
    category: 'Birthday',
    component: CosmicGalaxyPortal,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'A Galactic Surprise',
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
  {
    id: 'silk-ribbon-envelope' as const,
    name: 'Silk Ribbon Envelope',
    description: 'A textured premium wedding envelope wrapped in a silk bow ribbon. Untie the ribbon to slide open the invitation.',
    category: 'Wedding',
    component: SilkRibbonEnvelope,
    thumbnail: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'A Ribbon Knot',
  },
  {
    id: 'garden-gate' as const,
    name: 'Secret Garden Gate',
    description: 'An ornate 3D floral iron gate wrapped in climbing roses. Unlock the golden padlock to swing the gates open.',
    category: 'Wedding',
    component: GardenGate,
    thumbnail: 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'A Secret Garden',
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
  },
  {
    id: 'golden-keycard' as const,
    name: 'Golden Smart-Keycard',
    description: 'A futuristic electronic slot panel. Slide the golden keycard to activate the smart house lock and details.',
    category: 'House Warming',
    component: GoldenKeycard,
    thumbnail: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Unlock Our Nest',
  },
  {
    id: 'ring-doorbell' as const,
    name: 'Ring the Doorbell',
    description: 'A contemporary porch doorbell plaque. Press the button to ring, turn on the porch lights, and open the front door.',
    category: 'House Warming',
    component: RingDoorbell,
    thumbnail: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Ring Our Bell',
  },
  {
    id: 'cap-toss' as const,
    name: 'Graduation Cap Toss',
    description: 'Throw your virtual caps into the sky! Toss the caps to reveal the official graduation scroll and details.',
    category: 'Graduation',
    component: CapToss,
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Class of 2026',
  },
  {
    id: 'diploma-roll-unwrap' as const,
    name: 'Diploma Banner Unroll',
    description: 'A leather-bound scroll tied in silk ribbon. Click to unroll the diploma downward like a graduation banner.',
    category: 'Graduation',
    component: DiplomaRollUnwrap,
    thumbnail: 'https://images.unsplash.com/photo-1525921429624-479b6c294560?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'The Scholar Honor',
  },
  {
    id: 'curtain-spotlight' as const,
    name: 'Stage Curtain Spotlight',
    description: 'A grand theater velvet curtain stage. Pull the golden tassel rope to raise curtains and cast a dramatic stage spotlight.',
    category: 'Graduation',
    component: CurtainSpotlight,
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Stage is Set',
  },
  {
    id: 'stork-delivery' as const,
    name: 'Stork Baby Delivery',
    description: 'A special delivery from the sky! Click the stork bundle wrap to unravel the cute baby invitation details.',
    category: 'Baby Shower',
    component: StorkDelivery,
    thumbnail: 'https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'A Sweet Bundle',
  },
  {
    id: 'nursery-mobile' as const,
    name: 'Nursery Sky Mobile',
    description: 'A whimsical cotton cloud and wooden star nursery mobile. Tap the hanging elements to spin it into stardust portals.',
    category: 'Baby Shower',
    component: NurseryMobile,
    thumbnail: 'https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&w=600&q=80',
    defaultTitle: 'Over the Moon',
  }
];

export type TemplateId = typeof TEMPLATES[number]['id'];

export const getTemplateById = (id: string) => {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
};
