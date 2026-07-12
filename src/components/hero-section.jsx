
"use client"

import { useRef } from "react"
import { Sparkles } from "lucide-react"
import ParticleMesh from "./particle-mesh"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export function HeroSection() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } })

    gsap.set(".animate-item", { y: 40, opacity: 0, filter: "blur(12px)" })


    tl.to(".animate-item", {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.15, 
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative overflow-hidden min-h-[90vh] flex items-center justify-center px-6 pt-24 pb-12 transition-colors duration-300">


      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <ParticleMesh />
      </div>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-y-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-35 blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--glow) 55%, transparent), transparent)",
        }}
      />


      <div className="mx-auto max-w-5xl text-center relative z-10 select-none">

        <div className="animate-item mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/60 px-3.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 backdrop-blur-md transition-colors">
          <Sparkles className="size-3.5 text-cyan-500 animate-pulse" />
          Introducing the Intelligence Workspace
        </div>


        <h1 className="animate-item text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl text-zinc-900 dark:text-zinc-100 transition-colors">
          From raw data to
          <br />
          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
            structured intelligence
          </span>
        </h1>

        <p className="animate-item mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg transition-colors">
          Xai transforms scattered signals into clear, actionable insight — an
          AI-native workspace built for teams who think in decisions, not
          dashboards.
        </p>


        <div className="animate-item mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0">


          <button className="relative inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-lg bg-zinc-950 dark:bg-zinc-50 px-6 text-sm font-medium text-zinc-50 dark:text-zinc-950 shadow-md hover:shadow-xl dark:shadow-[0_0_0_1px_color-mix(in_oklch,var(--glow)_60%,transparent),0_8px_30px_-8px_var(--glow)] transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer">
            Start building
          </button>


          <button className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-lg border border-zinc-200 bg-white/50 dark:border-zinc-800 dark:bg-zinc-900/50 px-6 text-sm font-medium text-zinc-800 dark:text-zinc-200 backdrop-blur transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-[0.97] cursor-pointer">
            View demo
          </button>

        </div>
      </div>
    </section>
  )
}