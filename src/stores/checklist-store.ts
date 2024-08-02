import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ChecklistStore = {
  lastViewedChecklistId: number | null;
  setLastViewedChecklistId: (id: number | null) => void;
};

export const useChecklistStore = create(
  persist<ChecklistStore>(
    set => ({
      lastViewedChecklistId: null,
      setLastViewedChecklistId: (id: number | null) =>
        set({ lastViewedChecklistId: id }),
    }),
    {
      name: 'checklist-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
