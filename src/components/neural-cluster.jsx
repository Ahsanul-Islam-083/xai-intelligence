"use client"

import { useEffect, useRef, useState } from "react"
import { Radio, Cpu, Sparkles } from "lucide-react"
import { useTheme } from "@/context/theme-context"

export function NeuralCluster() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [layout, setLayout] = useState("constellation")
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 120 })

  // Read the active theme from context.
  // The canvas animate() loop reads themeRef.current on every frame so it
  // always uses the latest value without needing to restart the animation.
  const { theme } = useTheme()
  const themeRef = useRef(theme)
  useEffect(() => { themeRef.current = theme }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    let animationFrameId
    let particles = []
    const particleCount = 130

    let scrollVelocity = 0
    let currentVelocity = 0
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0
    let scrollPhase = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY)
      scrollVelocity = Math.min(delta * 0.1, 4)
      lastScrollY = currentScrollY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    const resizeCanvas = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle colors:
    // Dark mode → vivid neon (cyan / blue / purple)
    // Light mode → muted, deeper hues that read against white
    const DARK_COLORS  = ["#06b6d4", "#3b82f6", "#a855f7"]
    const LIGHT_COLORS = ["#0891b2", "#2563eb", "#9333ea"]

    class Particle {
      constructor(index) {
        this.index = index
        this.resetPosition()
        this.size = Math.random() * 2 + 1
        this.alpha = Math.random() * 0.5 + 0.3
      }

      get color() {
        const palette = themeRef.current === "light" ? LIGHT_COLORS : DARK_COLORS
        return palette[this.index % 3]
      }

      resetPosition() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        this.tx = this.x
        this.ty = this.y
      }

      update() {
        const cx = canvas.width / 2
        const cy = canvas.height / 2

        if (layout === "constellation") {
          this.x += this.vx * (1 + currentVelocity * 2)
          this.y += this.vy * (1 + currentVelocity * 2)
          if (this.x < 0 || this.x > canvas.width) this.vx *= -1
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1
        } else if (layout === "orbit") {
          const angle = (this.index / particleCount) * Math.PI * 2 + scrollPhase
          const radius = 120 + (this.index % 4) * 25
          this.tx = cx + Math.cos(angle) * radius
          this.ty = cy + Math.sin(angle) * radius
          this.x += (this.tx - this.x) * 0.05
          this.y += (this.ty - this.y) * 0.05
        } else if (layout === "matrix") {
          const cols = 13
          const spacingX = canvas.width / (cols + 1)
          const spacingY = canvas.height / 12
          const col = this.index % cols
          const row = Math.floor(this.index / cols)
          const wave = Math.sin(scrollPhase * 3 + this.index) * (5 + currentVelocity * 10)
          this.tx = spacingX * (col + 1)
          this.ty = spacingY * (row + 1) + wave
          this.x += (this.tx - this.x) * 0.07
          this.y += (this.ty - this.y) * 0.07
        }

        const dx = this.x - mouseRef.current.x
        const dy = this.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius
          const angle = Math.atan2(dy, dx)
          this.x += Math.cos(angle) * force * 5
          this.y += Math.sin(angle) * force * 5
        }
      }

      draw() {
        // In light mode use a slightly lower alpha so particles feel airy
        const alphaMultiplier = themeRef.current === "light" ? 0.75 : 1
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha * alphaMultiplier
        // Glow only in dark mode — on white bg it creates muddy halation
        ctx.shadowBlur = layout !== "constellation" && themeRef.current === "dark" ? 8 : 0
        ctx.shadowColor = this.color
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(i))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      currentVelocity += (scrollVelocity - currentVelocity) * 0.05
      scrollVelocity *= 0.95
      scrollPhase += 0.005 + currentVelocity * 0.02

      particles.forEach((p) => {
        p.update()
        p.draw()
      })

      // Connection lines
      if (layout !== "matrix") {
        // Light mode: lower base alpha (0.08 vs 0.15) so lines don't overpower white bg
        const baseAlpha = themeRef.current === "light" ? 0.08 : 0.15
        ctx.globalAlpha = baseAlpha

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const maxDist = layout === "orbit" ? 50 : 75

            if (dist < maxDist) {
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              // Light mode: use the particle's muted color instead of neon.
              // The alpha is already lowered above, giving a soft ink-on-paper feel.
              ctx.strokeStyle = particles[i].color
              ctx.lineWidth = 0.5 * (1 - dist / maxDist)
              ctx.stroke()
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [layout])

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }

  const handleMouseLeave = () => {
    mouseRef.current.x = -1000
    mouseRef.current.y = -1000
  }

  return (
    <section
      ref={containerRef}
      id="neural-cluster"
      className="relative w-full h-[450px] sm:h-[520px] md:h-[600px]
        bg-zinc-50 dark:bg-zinc-950
        border border-zinc-200 dark:border-zinc-900
        rounded-3xl overflow-hidden group my-16 md:my-24
        shadow-[0_4px_40px_-8px_rgba(0,0,0,0.10)] dark:shadow-2xl"
    >
      {/* Grid background:
          Light → very soft gray lines  Dark → dark slate lines */}
      <div className="absolute inset-0
        bg-[linear-gradient(to_right,#e4e4e730_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e730_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)]
        bg-[size:4rem_4rem]" />

      {/* Vignette:
          Light → soft white radial fade to keep edges clean
          Dark  → dark radial vignette for depth */}
      <div className="absolute inset-0
        bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,250,250,0.6)_100%)]
        dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.8)_100%)]
        pointer-events-none z-10" />

      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 cursor-crosshair z-0"
      />

      {/* Control buttons */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20
        flex flex-wrap items-center justify-center gap-1.5 sm:gap-2
        bg-white/70 dark:bg-zinc-900/60
        p-1.5 sm:p-2 rounded-2xl
        border border-zinc-200/80 dark:border-zinc-800/80
        backdrop-blur-xl shadow-lg dark:shadow-2xl max-w-[90vw]">
        <button
          onClick={() => setLayout("constellation")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl transition-all duration-300 ${
            layout === "constellation"
              ? "bg-zinc-100 dark:bg-zinc-800/80 text-cyan-600 dark:text-cyan-400 border border-cyan-400/40 dark:border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.12)] dark:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 border border-transparent"
          }`}
        >
          <Radio className="size-4" /> Autonomous
        </button>
        <button
          onClick={() => setLayout("orbit")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl transition-all duration-300 ${
            layout === "orbit"
              ? "bg-zinc-100 dark:bg-zinc-800/80 text-blue-600 dark:text-blue-400 border border-blue-400/40 dark:border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.12)] dark:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 border border-transparent"
          }`}
        >
          <Cpu className="size-4" /> Neural Orbit
        </button>
        <button
          onClick={() => setLayout("matrix")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl transition-all duration-300 ${
            layout === "matrix"
              ? "bg-zinc-100 dark:bg-zinc-800/80 text-purple-600 dark:text-purple-400 border border-purple-400/40 dark:border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.12)] dark:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 border border-transparent"
          }`}
        >
          <Sparkles className="size-4" /> Quantum Grid
        </button>
      </div>

      {/* HUD Text overlay */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-20 pointer-events-none
        bg-white/60 dark:bg-zinc-950/40
        backdrop-blur-md
        border border-zinc-200/60 dark:border-zinc-800/60
        rounded-xl sm:rounded-2xl p-3 sm:p-5
        shadow-sm dark:shadow-2xl max-w-[55%] sm:max-w-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-500 font-semibold block">
          Core Engine Feature
        </span>
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-1 tracking-tight">
          Topology Matrix
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 max-w-[220px] leading-relaxed">
          Scroll the page or click below to witness reactive vector reorganization in real time.
        </p>
      </div>
    </section>
  )
}