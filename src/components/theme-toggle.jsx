"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/context/theme-context"

// Animation variants for the icon container
const iconVariants = {
  initial: { opacity: 0, scale: 0.5, rotate: -90, y: 6 },
  animate: { opacity: 1, scale: 1, rotate: 0, y: 0 },
  exit:    { opacity: 0, scale: 0.5, rotate: 90,  y: -6 },
}

const transition = {
  duration: 0.22,
  ease: [0.32, 0.72, 0, 1],
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  // theme is null on the server and during the first render — render nothing
  // so the hydrated HTML matches the server HTML exactly (no mismatch).
  if (theme === null) {
    return <div className="size-8" aria-hidden="true" />
  }

  const isDark = theme === "dark"

  return (
    <motion.button
      role="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggleTheme}
      // Track hover/tap state for the button ring/scale micro-interaction
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={transition}
      className="relative flex size-8 items-center justify-center rounded-lg border border-border bg-background/50 text-foreground backdrop-blur transition-colors hover:border-border/80 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* AnimatePresence swaps icons with a vertical slide + rotate + fade */}
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="size-4 text-primary" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="size-4 text-amber-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
