"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    // Check initially in case the user loads half-way down the page
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e, id) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        scrolled ? "bg-background/80 backdrop-blur-md border-border shadow-sm" : "bg-transparent border-transparent py-2"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            onClick={(e) => {
              if (window.location.pathname === '/') {
                scrollToSection(e, 'top')
              }
            }}
            className="flex items-center gap-2 transition-opacity hover:opacity-80 relative z-50"
          >
            <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-sm font-bold">X</span>
            </div>
            <span className="font-semibold tracking-tight text-foreground">Xai</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#insight-flow" onClick={(e) => scrollToSection(e, 'insight-flow')} className="transition-colors hover:text-foreground">Insights</Link>
          <Link href="#dashboard-preview" onClick={(e) => scrollToSection(e, 'dashboard-preview')} className="transition-colors hover:text-foreground">Console</Link>
          <Link href="#neural-cluster" onClick={(e) => scrollToSection(e, 'neural-cluster')} className="transition-colors hover:text-foreground">Topology</Link>
        </nav>

        <div className="flex items-center gap-3 md:gap-4 relative z-50">
          <ThemeToggle />
          <Link href="#" className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block">
            Log in
          </Link>
          <Link href="#" className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-[0_0_0_1px_color-mix(in_oklch,var(--glow)_60%,transparent),0_8px_30px_-8px_var(--glow)] transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer">
            Get Started
          </Link>
          {/* Mobile Menu Toggle */}
          <button 
            className="flex items-center justify-center size-9 rounded-md md:hidden border border-border bg-background/50 backdrop-blur cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-[100dvh] bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 md:hidden">
          <nav className="flex flex-col items-center gap-6 text-lg font-medium text-muted-foreground">
            <Link href="#insight-flow" onClick={(e) => scrollToSection(e, 'insight-flow')} className="transition-colors hover:text-foreground">Insights</Link>
            <Link href="#dashboard-preview" onClick={(e) => scrollToSection(e, 'dashboard-preview')} className="transition-colors hover:text-foreground">Console</Link>
            <Link href="#neural-cluster" onClick={(e) => scrollToSection(e, 'neural-cluster')} className="transition-colors hover:text-foreground">Topology</Link>
            <Link href="#" onClick={() => setMobileMenuOpen(false)} className="transition-colors hover:text-foreground sm:hidden">Log in</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
