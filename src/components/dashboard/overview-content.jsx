

"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Filter, ArrowUpRight, TrendingUp } from "lucide-react"
import { InsightChart } from "./insight-chart"

export function OverviewContent({ stats, filteredRows, activeFilter, setActiveFilter, statusStyles }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors duration-200 p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.label}</p>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{s.value}</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-600 dark:text-cyan-400">
                <ArrowUpRight className="size-3" />
                {s.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-200">Signal throughput</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Insights generated per month</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-2.5 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-400">
            <TrendingUp className="size-3.5" />
            +34% YoY
          </span>
        </div>
        <div className="mt-4">
          <InsightChart />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 gap-3 bg-zinc-50/50 dark:bg-zinc-950/40">
          <div className="flex items-center gap-2">
            <Filter className="size-3.5 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-200">Connected sources</h3>
          </div>
          <div className="flex flex-wrap items-center gap-1 bg-zinc-100 dark:bg-zinc-900/80 p-1 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 w-full sm:w-auto">
            {["All", "Live", "Syncing", "Idle"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative flex-1 sm:flex-none px-3 py-1.5 sm:py-1 text-xs font-medium rounded-md transition-colors duration-300 ${activeFilter === filter ? "text-cyan-600 dark:text-cyan-400 font-semibold" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
              >
                {activeFilter === filter && (
                  <motion.div layoutId="activeFilterIndicator" className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-md shadow-sm dark:shadow-none" />
                )}
                <span className="relative z-10">{filter === "All" ? "All" : filter}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800/40 bg-zinc-50/30 dark:bg-transparent">
                <th className="px-4 py-2.5 font-medium">Source</th>
                <th className="px-4 py-2.5 font-medium">Type</th>
                <th className="px-4 py-2.5 font-medium">Records</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <motion.tbody layout className="divide-y divide-zinc-200 dark:divide-zinc-900">
              <AnimatePresence mode="popLayout">
                {filteredRows.map((r) => (
                  <motion.tr
                    layout
                    key={r.source}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="border-t border-zinc-200 dark:border-zinc-900/60 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-zinc-800 dark:text-zinc-300">{r.source}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{r.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">{r.records}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusStyles[r.status]}`}>
                        <span className="size-2 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
                        {r.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}