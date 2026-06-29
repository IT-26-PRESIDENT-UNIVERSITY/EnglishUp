import { create } from "zustand";

const TARGET_DATE = new Date("2026-08-30T00:00:00");
const START_DATE = new Date("2026-06-29T00:00:00");

const LEVEL_TITLES = [
  "Pemula Semangat",
  "Pejuang Kata",
  "Pemburu Grammar",
  "Ahli Percakapan",
  "Master Inggris",
  "Legenda Bahasa",
];

function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    if (key === "em_progress") {
      import("../utils/supabase").then(({ supabase }) => {
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (user) {
            supabase.auth.updateUser({ data: { progress: value } });
          }
        });
      });
    }
  } catch {
  }
}

function getTodayString() {
  return new Date().toDateString();
}

function getCurrentDay() {
  const now = new Date();
  const diff = Math.floor((now - START_DATE) / 86400000);
  return Math.max(1, Math.min(diff + 1, 63));
}

const initialProgress = loadFromStorage("em_progress", {
  xp: 0,
  level: 1,
  streak: 0,
  wordsLearned: 0,
  lastDate: "",
  grammarCompleted: {},
  completedDays: {},
  dailyGoals: { vocab: 0, grammar: 0, quiz: 0 },
  dailyGoalsDate: "",
  vocabStats: {},
});

const initialTheme = loadFromStorage("em_theme", "light");

export const useStore = create((set, get) => ({
  user: null,
  progress: initialProgress,
  theme: initialTheme,
  toast: null,

  setUser(user) {
    set({ user });
  },

  toggleTheme() {
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      saveToStorage("em_theme", newTheme);
      return { theme: newTheme };
    });
  },

  getCountdown() {
    const now = new Date();
    const diff = TARGET_DATE - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  },

  getLevelTitle() {
    const { level } = get().progress;
    return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  },

  getXPNeeded() {
    return get().progress.level * 100;
  },

  getCurrentDay,

  getDailyGoals() {
    const p = get().progress;
    const today = getTodayString();
    if (p.dailyGoalsDate !== today) {
      return { vocab: 0, grammar: 0, quiz: 0 };
    }
    return p.dailyGoals;
  },

  addXP(amount, message) {
    set((state) => {
      const p = { ...state.progress };
      p.xp += amount;
      const xpNeeded = p.level * 100;
      let leveledUp = false;

      if (p.xp >= xpNeeded) {
        p.xp -= xpNeeded;
        p.level++;
        leveledUp = true;
      }

      const today = getTodayString();
      if (p.lastDate !== today) {
        if (p.lastDate) {
          const last = new Date(p.lastDate);
          const now = new Date();
          const dayDiff = Math.round((now - last) / 86400000);
          if (dayDiff > 1) {
            p.streak = 0;
          } else {
            p.streak = p.streak + 1;
          }
        } else {
          p.streak = 1;
        }
        p.lastDate = today;
      }

      saveToStorage("em_progress", p);

      const toastMsg = leveledUp
        ? `Level Up! Kamu sekarang Level ${p.level}!`
        : message
        ? `+${amount} XP - ${message}`
        : null;

      return { progress: p, toast: toastMsg };
    });
  },

  incrementVocab() {
    set((state) => {
      const p = { ...state.progress };
      p.wordsLearned++;
      const today = getTodayString();
      if (p.dailyGoalsDate !== today) {
        p.dailyGoals = { vocab: 0, grammar: 0, quiz: 0 };
        p.dailyGoalsDate = today;
      }
      p.dailyGoals = { ...p.dailyGoals, vocab: Math.min(p.dailyGoals.vocab + 1, 10) };
      saveToStorage("em_progress", p);
      return { progress: p };
    });
  },

  updateVocabStat(word, correct) {
    set((state) => {
      const p = { ...state.progress };
      if (!p.vocabStats) p.vocabStats = {};
      const currentMistakes = p.vocabStats[word] || 0;
      
      if (correct) {
        p.vocabStats[word] = Math.max(0, currentMistakes - 1);
      } else {
        p.vocabStats[word] = currentMistakes + 1;
      }
      
      saveToStorage("em_progress", p);
      return { progress: p };
    });
  },

  completeGrammar(id) {
    const { progress } = get();
    if (progress.grammarCompleted[id]) return false;
    set((state) => {
      const p = { ...state.progress };
      p.grammarCompleted = { ...p.grammarCompleted, [id]: true };
      const today = getTodayString();
      if (p.dailyGoalsDate !== today) {
        p.dailyGoals = { vocab: 0, grammar: 0, quiz: 0 };
        p.dailyGoalsDate = today;
      }
      p.dailyGoals = { ...p.dailyGoals, grammar: Math.min(p.dailyGoals.grammar + 1, 1) };
      saveToStorage("em_progress", p);
      return { progress: p };
    });
    return true;
  },

  incrementQuiz() {
    set((state) => {
      const p = { ...state.progress };
      const today = getTodayString();
      if (p.dailyGoalsDate !== today) {
        p.dailyGoals = { vocab: 0, grammar: 0, quiz: 0 };
        p.dailyGoalsDate = today;
      }
      p.dailyGoals = { ...p.dailyGoals, quiz: Math.min(p.dailyGoals.quiz + 1, 5) };
      saveToStorage("em_progress", p);
      return { progress: p };
    });
  },

  markDayComplete(dayNum) {
    set((state) => {
      const p = { ...state.progress };
      p.completedDays = { ...p.completedDays, [dayNum]: true };
      saveToStorage("em_progress", p);
      return { progress: p };
    });
  },

  clearToast() {
    set({ toast: null });
  },
}));
