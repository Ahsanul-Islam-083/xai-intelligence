

"use client"

import { useRef } from "react"
import { Database, BrainCircuit, LineChart } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    icon: Database,
    step: "01",
    title: "Ingest Data",
    description:
      "Connect any source — warehouses, APIs, logs, and files. Xai unifies raw streams into a single, queryable fabric.",
    color: "from-cyan-500/20 to-blue-500/0",
    accentColor: "rgb(6, 182, 212)",
    iconTextColor: "text-cyan-500 dark:text-cyan-400",
    iconGlow: "dark:shadow-[inset_0_0_12px_rgba(6,182,212,0.15)]",
    hoverText: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
  },
  {
    icon: BrainCircuit,
    step: "02",
    title: "Analyze with AI",
    description:
      "Reasoning models detect patterns, anomalies, and relationships across your data — continuously, in real time.",
    color: "from-purple-500/20 to-pink-500/0",
    accentColor: "rgb(168, 85, 247)",
    iconTextColor: "text-purple-500 dark:text-purple-400",
    iconGlow: "dark:shadow-[inset_0_0_12px_rgba(168,85,247,0.15)]",
    hoverText: "group-hover:text-purple-600 dark:group-hover:text-purple-400"
  },
  {
    icon: LineChart,
    step: "03",
    title: "Generate Insight",
    description:
      "Turn analysis into structured intelligence: summaries, forecasts, and decisions your team can act on instantly.",
    color: "from-emerald-500/20 to-teal-500/0",
    accentColor: "rgb(16, 185, 129)",
    iconTextColor: "text-emerald-500 dark:text-emerald-400",
    iconGlow: "dark:shadow-[inset_0_0_12px_rgba(16,185,129,0.15)]",
    hoverText: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
  },
]

export function InsightFlow() {
  const triggerRef = useRef(null)
  const sectionRef = useRef(null)

  useGSAP(() => {
    if (!sectionRef.current || !triggerRef.current) return

    const cards = sectionRef.current.querySelectorAll(".insight-card")
    const indicators = sectionRef.current.querySelectorAll(".progress-dot")
    const progressLines = sectionRef.current.querySelectorAll(".progress-line-inner")
    const headerElements = sectionRef.current.querySelectorAll(".flow-header > *")

    gsap.set(cards, { y: 60, opacity: 0, scale: 0.95, filter: "blur(4px)", pointerEvents: "none" })
    gsap.set(cards[0], { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", pointerEvents: "auto" })
    gsap.set(indicators, { backgroundColor: "rgba(156, 163, 175, 0.2)", scale: 1 })
    gsap.set(indicators[0], { backgroundColor: steps[0].accentColor, scale: 1.25 })
    gsap.set(progressLines, { scaleY: 0 })

    gsap.from(headerElements, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.5,
        snap: {
          snapTo: [0, 0.5, 1],
          duration: 0.4,
          delay: 0.02,
          ease: "power1.inOut",
        },
      },
    })

    tl.to(progressLines[0], { scaleY: 1, duration: 1, ease: "none" })
      .to(cards[0], { y: -60, opacity: 0, scale: 0.95, filter: "blur(4px)", pointerEvents: "none", duration: 1 }, "-=1")
      .to(indicators[0], { backgroundColor: "rgba(156, 163, 175, 0.2)", scale: 1, duration: 0.4 }, "-=1")
      .to(cards[1], { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", pointerEvents: "auto", duration: 1 }, "-=0.85")
      .to(indicators[1], { backgroundColor: steps[1].accentColor, scale: 1.25, duration: 0.4 }, "-=0.85")

    tl.to(progressLines[1], { scaleY: 1, duration: 1, ease: "none" })
      .to(cards[1], { y: -60, opacity: 0, scale: 0.95, filter: "blur(4px)", pointerEvents: "none", duration: 1 }, "-=1")
      .to(indicators[1], { backgroundColor: "rgba(156, 163, 175, 0.2)", scale: 1, duration: 0.4 }, "-=1")
      .to(cards[2], { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", pointerEvents: "auto", duration: 1 }, "-=0.85")
      .to(indicators[2], { backgroundColor: steps[2].accentColor, scale: 1.25, duration: 0.4 }, "-=0.85")

  }, { scope: triggerRef })

  return (
    <div ref={triggerRef} id="insight-flow" className="relative bg-zinc-50 dark:bg-zinc-950 w-full transition-colors duration-300">
      <section
        ref={sectionRef}
        className="flex min-h-[100dvh] w-full items-center py-16 md:py-0 px-6 md:px-12 overflow-hidden"
      >
        <div className="mx-auto w-full max-w-6xl grid md:grid-cols-12 gap-12 md:gap-8 items-center">

          {/* Left Block */}
          <div className="md:col-span-6 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left">
            <div className="hidden sm:flex flex-col items-center h-[180px] pt-2" aria-hidden="true">
              {steps.map((_, idx) => (
                <div key={`ind-${idx}`} className="flex flex-col items-center flex-1 last:flex-none">
                  <div className="progress-dot size-3 rounded-full border border-zinc-300 dark:border-zinc-800 transition-all duration-300" />
                  {idx < steps.length - 1 && (
                    <div className="progress-line-outer w-[2px] h-full bg-zinc-200 dark:bg-zinc-800/60 origin-top relative my-1">
                      <div className="progress-line-inner absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-emerald-500 origin-top transform scale-y-0" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flow-header">
              <span className="font-mono text-xs uppercase tracking-[0.3em] bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-semibold">
                The insight flow
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-5xl text-zinc-900 dark:text-zinc-100 leading-tight max-w-[15ch] mx-auto sm:mx-0 transition-colors">
                Three steps from <br className="hidden sm:block" />
                <span className="text-zinc-400 dark:text-zinc-500">noise to knowledge</span>
              </h2>
              <p className="mt-4 sm:mt-6 text-sm md:text-base leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-md mx-auto sm:mx-0 transition-colors">
                A single continuous pipeline that keeps your intelligence fresh, from
                the moment data lands to the second you decide.
              </p>
            </div>
          </div>

          {/* Right Block (Card Container) */}
          <div className="md:col-span-6 relative min-h-[320px] sm:min-h-[360px] w-full flex items-center justify-center">
            {steps.map((s) => (
              <div
                key={s.step}
                className="insight-card absolute inset-0 w-full h-full flex items-center justify-center"
              >
                <div className="group relative w-full overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none dark:hover:shadow-[0_0_50px_rgba(6,182,212,0.04)] p-6 sm:p-8 backdrop-blur-xl transition-all duration-500 hover:border-zinc-300 dark:hover:border-zinc-700">

                  <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-20 dark:opacity-30 transition-opacity duration-500 group-hover:opacity-40`} />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex items-center justify-between">
                      <div className={`flex size-12 sm:size-14 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 ${s.iconTextColor} ${s.iconGlow} shadow-sm transition-transform duration-500 group-hover:scale-110`}>
                        <s.icon className="size-5 sm:size-6" />
                      </div>
                      <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 bg-zinc-100/80 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-full">
                        PHASE {s.step}
                      </span>
                    </div>

                    <div>
                      <h3 className={`mt-6 sm:mt-8 text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 transition-colors duration-300 ${s.hoverText}`}>
                        {s.title}
                      </h3>
                      <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}