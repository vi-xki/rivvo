import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Goal = {
  id: string;
  title: string;
  target: number;
  saved: number;
  createdAt: number;
  achieved?: boolean;
};

type GoalState = {
  goals: Goal[];
  createGoal: (title: string, target: number) => void;
  removeGoal: (id: string) => void;
  updateSaved: (id: string, delta: number) => void;
  setSaved: (id: string, saved: number) => void;
  markAchieved: (id: string) => void;
};

export const useGoals = create<GoalState>()(
  persist(
    (set, get) => ({
      goals: [],
      createGoal: (title: string, target: number) => {
        const id = `${Date.now().toString(36)}-${Math.floor(Math.random() * 10000)}`;
        const g: Goal = { id, title, target, saved: 0, createdAt: Date.now(), achieved: false };
        set({ goals: [g, ...get().goals] });
      },
      removeGoal: (id: string) => {
        set({ goals: get().goals.filter((g) => g.id !== id) });
      },
      updateSaved: (id: string, delta: number) => {
        set(({ goals }) => {
          const updated = goals.map((g) => {
            if (g.id !== id) return g;
            const saved = Math.max(0, g.saved + delta);
            const achieved = saved >= g.target;
            return { ...g, saved, achieved };
          });
          return { goals: updated };
        });
      },
      setSaved: (id: string, saved: number) => {
        set(({ goals }) => {
          const updated = goals.map((g) => (g.id !== id ? g : { ...g, saved: Math.max(0, saved), achieved: Math.max(0, saved) >= g.target }));
          return { goals: updated };
        });
      },
      markAchieved: (id: string) => {
        set(({ goals }) => ({ goals: goals.map((g) => (g.id === id ? { ...g, achieved: true, saved: Math.max(g.saved, g.target) } : g)) }));
      },
    }),
    { name: 'rivvo-goals' }
  )
);

export default useGoals;