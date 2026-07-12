"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // Initialize to null — we don't know the theme until we're on the client.
  // The blocking <script> in layout.js has already set the correct class on
  // <html> before this component ever mounts, so there is zero flicker.
  const [theme, setThemeState] = useState(null)

  // On first client render, read the class that the blocking script applied.
  useEffect(() => {
    const stored = localStorage.getItem("xai-theme")
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const resolved = stored ?? (systemDark ? "dark" : "light")
    setThemeState(resolved)
  }, [])

  const setTheme = useCallback((next) => {
    setThemeState(next)
    localStorage.setItem("xai-theme", next)
    // Toggle the .dark class on <html>. Tailwind's @custom-variant dark
    // uses (&:is(.dark *)) so this is the single source of truth.
    document.documentElement.classList.toggle("dark", next === "dark")
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>")
  return ctx
}
