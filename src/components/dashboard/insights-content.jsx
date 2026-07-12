
"use client"

import { motion } from "framer-motion"
import { BarChart3 } from "lucide-react"

export function InsightsContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      className="p-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10 rounded-xl space-y-3 text-center shadow-sm dark:shadow-none"
    >
      <BarChart3 className="size-8 text-cyan-600 dark:text-cyan-400 mx-auto" />
      <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-200">Automated Knowledge Graph</h4>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
        AI has cross-referenced 1.24M vector embeddings. No new structural anomalies found in the ledger files today.
      </p>
    </motion.div>
  )
}