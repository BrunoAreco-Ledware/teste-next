"use client";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface ThemeContextType {
  dark: boolean;
  setDark: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      if (typeof window !== "undefined") {
        // Prioriza a classe já aplicada no documentElement pelo script inline
        if (document.documentElement.classList.contains("dark")) return true;
        const stored = localStorage.getItem("theme");
        return stored === "dark";
      }
    } catch (e) {}
    return false;
  });

  // Sincroniza a classe .dark no body
  useEffect(() => {
    if (typeof document !== "undefined") {
      const hasDark = document.documentElement.classList.contains("dark");
      if (dark && !hasDark) {
        document.documentElement.classList.add("dark");
      } else if (!dark && hasDark) {
        document.documentElement.classList.remove("dark");
      }
      try {
        localStorage.setItem("theme", dark ? "dark" : "light");
      } catch (e) {}
      try {
        // Persist theme in cookie so server can render matching HTML
        document.cookie = `theme=${dark ? 'dark' : 'light'}; path=/; max-age=${60 * 60 * 24 * 365}`;
      } catch (e) {}
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
