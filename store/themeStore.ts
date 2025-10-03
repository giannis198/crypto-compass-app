// store/themeStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemePreference = "system" | "light" | "dark";

interface ThemeStore {
  themePreference: ThemePreference;
  setThemePreference: (theme: ThemePreference) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themePreference: "system",
      setThemePreference: (themePreference) => set({ themePreference }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Optional: Export a hook with selectors for better performance
export const useThemePreference = () =>
  useThemeStore((state) => state.themePreference);

export const useSetThemePreference = () =>
  useThemeStore((state) => state.setThemePreference);
