import { create } from 'zustand';

export type TestStore = {
  testStore: string;
  setTestStore: (testStore: string) => void;
  resetTestStore: () => void;
};

export const useTestStore = create<TestStore>(set => ({
  testStore: '',
  setTestStore: testStore => set({ testStore }),
  resetTestStore: () => set({ testStore: '' }),
}));
