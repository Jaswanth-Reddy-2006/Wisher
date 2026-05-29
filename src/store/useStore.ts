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

const getDefaultWish = (template: WishData['templateType']): WishData => {
  const futureDate = new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 16); // 3 days in future

  return {
    templateType: template,
    title: "Happy Birthday!",
    targetName: "Preethi",
    date: futureDate,
    message: "Wishing you a beautiful day filled with love, laughter, and endless joy! Tap the cover to reveal your surprise!",
    primaryColor: "#ffb6c1",
    musicUrl: "https://raw.githubusercontent.com/ProgrammerGaurav/happy-birthday/master/Happy%20Birthday_files/music.mp3",
    musicName: "Classic Happy Birthday",
    extraMessage: "I wanted to make this space just to tell you everything I feel. Every single day with you feels like a gift. From the quiet mornings to our late-night laughs, you bring a light into my life that I never knew existed.",
    rsvpEmail: "birthday@wisher.net",
    bgImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",

    // Quiz defaults
    quizQ1: "What is my favorite color?",
    quizA1a: "Pink 💗",
    quizA1b: "Blue 💙",
    quizA1c: "Purple 💜",
    quizA1d: "Red ❤️",
    quizA1correct: 0,

    quizQ2: "What is my dream travel destination?",
    quizA2a: "Paris 🗼",
    quizA2b: "Maldives 🏝️",
    quizA2c: "Tokyo 🗾",
    quizA2d: "Switzerland 🏔️",
    quizA2correct: 1,

    quizQ3: "What makes me happiest?",
    quizA3a: "Good food 🍕",
    quizA3b: "Sunsets 🌅",
    quizA3c: "Being with you 🥰",
    quizA3d: "Music 🎵",
    quizA3correct: 2,

    // Photo gallery defaults
    photo1: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=80",
    photo2: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    photo3: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80",
    photo4: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  };
};

export const useStore = create<StoreState>((set) => ({
  currentWish: getDefaultWish('birthday-universe'),
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
