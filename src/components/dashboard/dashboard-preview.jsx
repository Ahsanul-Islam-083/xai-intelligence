
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutGrid,
  Database,
  Workflow,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronRight,
} from "lucide-react"

import { OverviewContent } from "./overview-content"
import { SourcesContent } from "./sources-content"
import { PipelinesContent } from "./pipelines-content"
import { InsightsContent } from "./insights-content"
import { SettingsContent } from "./settings-content"

const navItems = [
  { id: "overview", icon: LayoutGrid, label: "Overview" },
  { id: "sources", icon: Database, label: "Sources" },
  { id: "pipelines", icon: Workflow, label: "Pipelines" },
  { id: "insights", icon: BarChart3, label: "Insights" },
  { id: "settings", icon: Settings, label: "Settings" },
]

const stats = [
  { label: "Signals processed", value: "1.24M", delta: "+18.2%" },
  { label: "Active pipelines", value: "36", delta: "+4" },
  { label: "Insight accuracy", value: "98.6%", delta: "+1.1%" },
]

const allRows = [
  { source: "Production DB", type: "PostgreSQL", records: "482,190", status: "Live" },
  { source: "Event Stream", type: "Kafka", records: "1,204,882", status: "Syncing" },
  { source: "Support Tickets", type: "Zendesk API", records: "38,411", status: "Live" },
  { source: "Billing Ledger", type: "Stripe", records: "96,027", status: "Idle" },
  { source: "Product Analytics", type: "Segment", records: "712,556", status: "Live" },
]


const statusStyles = {
  Live: "text-cyan-600 dark:text-cyan-400",
  Syncing: "text-purple-600 dark:text-purple-400",
  Idle: "text-zinc-400 dark:text-zinc-500",
}

export function DashboardPreview() {
  const [activeNav, setActiveNav] = useState("overview")
  const [activeFilter, setActiveFilter] = useState("All")


  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(3)


  const filteredRows = allRows.filter((row) => {
    const matchesFilter = activeFilter === "All" || row.status === activeFilter
    const matchesSearch = row.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.type.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })


  const renderTabContent = () => {
    if (activeNav === "overview") {
      return (
        <OverviewContent
          stats={stats}
          filteredRows={filteredRows}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          statusStyles={statusStyles}
        />
      )
    } else if (activeNav === "sources") {
      return <SourcesContent />
    } else if (activeNav === "pipelines") {
      return <PipelinesContent />
    } else if (activeNav === "insights") {
      return <InsightsContent />
    } else if (activeNav === "settings") {
      return <SettingsContent />
    }
    return null
  }

  return (
    <section id="dashboard-preview" className="relative px-6 py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950/20 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">

        {/* Title Block */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent font-semibold">
            Intelligence dashboard
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl text-zinc-900 dark:text-zinc-100 transition-colors">
            Your entire operation, understood
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400 transition-colors">
            A live command center where every source, pipeline, and insight lives
            in one calm, focused surface.
          </p>
        </div>

        {/* Dashboard Window */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/20 shadow-[0_8px_60px_-16px_rgba(0,0,0,0.08)] dark:shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-colors"
        >
          <div className="flex min-h-[420px] sm:min-h-[520px] md:min-h-[580px]">

            {/* Sidebar */}
            <aside className="hidden w-60 shrink-0 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-950/40 p-4 md:flex transition-colors">
              <div className="flex items-center gap-2 px-2 py-2">
                <div className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <span className="text-sm font-bold">X</span>
                </div>
                <span className="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-200">Xai</span>
              </div>

              {/* Sidebar Tabs */}
              <nav className="mt-6 flex flex-col gap-1">
                {navItems.map((item) => {
                  const isSelected = activeNav === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveNav(item.id)}
                      className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${isSelected
                          ? "text-cyan-600 dark:text-cyan-400"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                        }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute inset-0 bg-zinc-200/80 dark:bg-zinc-800/60 rounded-lg shadow-[inset_0_0_0_1px_rgba(6,182,212,0.15)] -z-10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <item.icon className="size-4 relative z-10" />
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  )
                })}
              </nav>

              <div className="mt-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950/50 p-3 transition-colors">
                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Workspace usage</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                </div>
                <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-500">72% of monthly compute</p>
              </div>
            </aside>

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col bg-transparent dark:bg-zinc-950/20">

              {/* Header */}
              <header className="flex items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 px-5 py-3.5 transition-colors">
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span>Workspace</span>
                  <ChevronRight className="size-3.5 text-zinc-400 dark:text-zinc-600" />
                  <span className="font-medium text-zinc-900 dark:text-zinc-200 capitalize">{activeNav}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Search */}
                  <div className="relative hidden items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 sm:flex focus-within:border-cyan-500/50 transition-all duration-300">
                    <Search className="size-3.5 text-zinc-500 dark:text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Search sources or types..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="ml-2 bg-transparent text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none w-40 focus:w-48 transition-all duration-300"
                    />
                  </div>

                  {/* Notification */}
                  <button
                    onClick={() => setNotifications(0)}
                    className="relative flex size-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 transition hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer"
                  >
                    <Bell className="size-4" />
                    <AnimatePresence>
                      {notifications > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-bold text-black shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                        >
                          {notifications}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                  <div className="size-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 border border-zinc-300/50 dark:border-zinc-700/50" />
                </div>
              </header>

              {/* Views */}
              <div className="flex-1 p-5 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {renderTabContent()}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}