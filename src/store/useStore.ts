import { create } from 'zustand';
import type { WishData } from '../templates/types';

interface StoreState {
  currentWish: WishData;
  isDeploying: boolean;
  logs: string[];
  deployedId: string | null;
  updateWish: (data: Partial<WishData>) => void;
  setTemplate: (template: WishData['templateType']) => void;
  resetWish: () => void;
  startDeploy: () => void;
  addLog: (log: string) => void;
  clearLogs: () => void;
  setDeployedId: (id: string | null) => void;
}

const getCategoryByTemplate = (template: WishData['templateType']): 'birthday' | 'wedding' | 'housewarming' | 'graduation' | 'babyshower' => {
  if (['retro-box', 'neon-cyberpunk-vinyl', 'pop-up-storybook', 'cosmic-constellation', 'magical-balloon-release', 'cosmic-galaxy-portal'].includes(template)) {
    return 'birthday';
  }
  if (['elegant-card', 'wax-seal-scroll', 'infinity-origami-fold', 'glass-botanical-box', 'silk-ribbon-envelope', 'garden-gate'].includes(template)) {
    return 'wedding';
  }
  if (['cap-toss', 'diploma-roll-unwrap', 'curtain-spotlight'].includes(template)) {
    return 'graduation';
  }
  if (['stork-delivery', 'nursery-mobile'].includes(template)) {
    return 'babyshower';
  }
  return 'housewarming';
};

const getDefaultWish = (template: WishData['templateType']): WishData => {
  const futureDate = new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 16); // 3 days in future
  const category = getCategoryByTemplate(template);

  if (category === 'wedding') {
    return {
      templateType: template,
      title: "Together Forever",
      targetName: "Sarah & David",
      date: futureDate,
      message: "We invite you to share our joy as we exchange our vows and begin our new life together. Your presence is our greatest gift.",
      primaryColor: "#102a43", // Skateboarding Lion Deep Navy Blue
      musicUrl: "",
      musicName: "",
      extraMessage: "Cocktails and reception dinner will follow the ceremony.",
      rsvpEmail: "wedding@wishes.net",
      venueName: "The Grand Plaza, Crystal Ballroom",
      googleMapsUrl: "https://maps.google.com",
      weddingTime: "17:00",
      brideName: "Sarah Jennings",
      groomName: "David Miller"
    };
  }

  if (category === 'graduation') {
    return {
      templateType: template,
      title: "Congratulations, Graduate!",
      targetName: "Michael Chang",
      date: futureDate,
      message: "Your hard work and dedication have paid off. Today we celebrate your great accomplishment and look forward to your bright future! Toss your cap to enter!",
      primaryColor: "#102a43", // Navy blue
      musicUrl: "",
      musicName: "",
      extraMessage: "Commencement afterparty starts at 7:00 PM. Dinner & drinks provided.",
      rsvpEmail: "graduate@wishes.net"
    };
  }

  if (category === 'babyshower') {
    return {
      templateType: template,
      title: "Welcome Sweet Bundle!",
      targetName: "Baby Boy Thompson",
      date: futureDate,
      message: "We're over the moon with joy and excited to invite you to celebrate our baby shower. A new little adventurer is on his way!",
      primaryColor: "#f5a18a", // Peach
      musicUrl: "",
      musicName: "",
      extraMessage: "Guacamole & baby punch served in the garden starting at 2:00 PM.",
      rsvpEmail: "babyshower@wishes.net"
    };
  }

  if (category === 'housewarming') {
    return {
      templateType: template,
      title: "Our New Home",
      targetName: "The Sharma Family",
      date: futureDate,
      message: "We have moved into our new nest! Join us for a housewarming party to bless our new home with your warmth and love.",
      primaryColor: "#2d6a4f", // House warming forest green
      musicUrl: "",
      musicName: "",
      extraMessage: "Dinner and drinks will be served. Address details are linked below.",
      rsvpEmail: "home@wisher.net"
    };
  }

  // default: birthday
  return {
    templateType: template,
    title: "Happy Birthday!",
    targetName: "Alex Mercer",
    date: futureDate,
    message: "Wishing you a beautiful day filled with love, laughter, and endless joy! You deserve all the happiness in the world. Tap the cover to reveal your surprise!",
    primaryColor: "#d30f0f", // Birthday crimson red
    musicUrl: "",
    musicName: "",
    extraMessage: "Let's gather and toast to another wonderful year of adventures! We are organizing a rooftop surprise party.",
    rsvpEmail: "birthday@wisher.net"
  };
};

export const useStore = create<StoreState>((set) => ({
  currentWish: getDefaultWish('retro-box'),
  isDeploying: false,
  logs: [],
  deployedId: null,

  updateWish: (data) =>
    set((state) => ({
      currentWish: { ...state.currentWish, ...data },
    })),

  setTemplate: (template) =>
    set(() => ({
      currentWish: getDefaultWish(template),
    })),

  resetWish: () =>
    set((state) => ({
      currentWish: getDefaultWish(state.currentWish.templateType),
      deployedId: null,
      logs: [],
      isDeploying: false,
    })),

  startDeploy: () =>
    set(() => ({
      isDeploying: true,
      logs: [],
      deployedId: null,
    })),

  addLog: (log) =>
    set((state) => ({
      logs: [...state.logs, log],
    })),

  clearLogs: () =>
    set(() => ({
      logs: [],
    })),

  setDeployedId: (id) =>
    set(() => ({
      deployedId: id,
      isDeploying: false,
    })),
}));
