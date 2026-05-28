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

const getCategoryByTemplate = (template: WishData['templateType']): 'birthday' | 'wedding' | 'housewarming' => {
  if (['retro-box', 'neon-cyberpunk-vinyl', 'pop-up-storybook', 'cosmic-constellation'].includes(template)) {
    return 'birthday';
  }
  if (['elegant-card', 'wax-seal-scroll', 'infinity-origami-fold', 'glass-botanical-box'].includes(template)) {
    return 'wedding';
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
      primaryColor: "#d4af37", // Wedding gold
      musicUrl: "",
      musicName: "",
      extraMessage: "The wedding ceremony will start at 4:00 PM, followed by cocktails and reception.",
      rsvpEmail: "wedding@wisher.net"
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
