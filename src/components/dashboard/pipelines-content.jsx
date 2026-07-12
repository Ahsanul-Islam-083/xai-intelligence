
"use client"

import { motion } from "framer-motion"
import { Workflow } from "lucide-react"

const pipelines = [
  { name: "Ingestion Pipeline", step: "Raw to Vector Store", health: "Healthy", rate: "99.8%" },
  { name: "LLM Enrichment", step: "Entity Extraction", health: "Processing", rate: "94.2%" },
]

export function PipelinesContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      className="space-y-4"
    >
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Active ETL Pipelines</h3>
      <div className="grid gap-3">
        {pipelines.map((p) => (
          <div key={p.name} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/10 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors duration-200 cursor-pointer space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Workflow className="size-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-200">{p.name}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${p.health === "Healthy"
                  ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                  : "bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-400"
                }`}>
                {p.health}
              </span>
            </div>
            <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>Current Block: <strong className="font-semibold text-zinc-800 dark:text-zinc-300">{p.step}</strong></span>
              <span>Efficiency: <strong className="font-semibold text-zinc-800 dark:text-zinc-300">{p.rate}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}