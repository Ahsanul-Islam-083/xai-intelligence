
"use client"

import { motion } from "framer-motion"
import { Database, Plus } from "lucide-react"

const sourcesList = [
  { name: "AWS S3 Bucket", size: "4.2 TB", region: "us-east-1", speed: "120MB/s" },
  { name: "Google Analytics", size: "120 GB", region: "Global", speed: "API Live" },
  { name: "PostgreSQL Production", size: "850 GB", region: "eu-west-1", speed: "Active Sync" },
]

export function SourcesContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Data Sources Configuration</h3>
        <button className="inline-flex items-center gap-1.5 text-xs font-medium bg-cyan-500 text-zinc-950 px-2.5 py-1.5 rounded-md hover:bg-cyan-400 dark:hover:bg-cyan-400 transition shadow-sm dark:shadow-none">
          <Plus className="size-3.5" /> Add Source
        </button>
      </div>
      <div className="grid gap-3">
        {sourcesList.map((src) => (
          <div key={src.name} className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/10 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors duration-200 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <Database className="size-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">{src.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{src.region} • {src.size}</p>
              </div>
            </div>
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800">
              {src.speed}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}