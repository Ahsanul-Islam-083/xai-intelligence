

"use client"

import { motion } from "framer-motion"

export function SettingsContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      className="p-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10 rounded-xl space-y-4 shadow-sm dark:shadow-none"
    >
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Workspace Configurations</h3>
      <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
        <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-900/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors duration-200 cursor-pointer">
          <span>Model Base</span>
          <span className="text-zinc-900 dark:text-zinc-200 font-mono font-medium">Xai-native-v1.5</span>
        </div>
        <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-900/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors duration-200 cursor-pointer">
          <span>API Key Status</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">● Active</span>
        </div>
        <div className="flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors duration-200 cursor-pointer py-2">
          <span>Auto-scaling compute</span>
          <span className="text-zinc-900 dark:text-zinc-200 font-mono font-medium">Enabled</span>
        </div>
      </div>
    </motion.div>
  )
}