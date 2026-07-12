
"use client"

import { motion } from "framer-motion"

const data = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 40 },
  { month: "Mar", value: 35 },
  { month: "Apr", value: 50 },
  { month: "May", value: 45 },
  { month: "Jun", value: 60 },
  { month: "Jul", value: 55 },
  { month: "Aug", value: 70 },
  { month: "Sep", value: 65 },
  { month: "Oct", value: 80 },
  { month: "Nov", value: 85 },
  { month: "Dec", value: 100 },
]

export function InsightChart() {
  const width = 500
  const height = 150
  const padding = 20


  const points = data.map((d, i) => {
    const x = padding + (i * (width - padding * 2)) / (data.length - 1)
    const y = height - padding - (d.value * (height - padding * 2)) / 100
    return { x, y }
  })

  const pathD = `M ${points.map((p) => `${p.x} ${p.y}`).join(" L ")}`


  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>


        {[0, 25, 50, 75, 100].map((val) => {
          const y = height - padding - (val * (height - padding * 2)) / 100
          return (
            <line
              key={val}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              className="stroke-zinc-200 dark:stroke-zinc-800/50"
              strokeDasharray="4 4"
            />
          )
        })}


        <motion.path
          d={areaD}
          fill="url(#chartGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />


        <motion.path
          d={pathD}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }} // Custom smooth ease
        />


        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            className="fill-cyan-500 stroke-white dark:stroke-zinc-950 stroke-[1.5px]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.05 }}
          />
        ))}
      </svg>


      <div className="flex justify-between px-2 mt-2 text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        {data.map((d) => (
          <span key={d.month}>{d.month}</span>
        ))}
      </div>
    </div>
  )
}