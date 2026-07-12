<p align="center">
  <br />
  <img alt="Xai" src="https://img.shields.io/badge/Xai-Intelligence%20Workspace-06b6d4?style=flat-square&labelColor=0a0c11" />
</p>

<h1 align="center">Xai — Intelligence Workspace</h1>

<p align="center">
  <strong>From raw data to structured intelligence.</strong><br />
  An AI-native workspace that transforms scattered signals into clear, actionable decisions.
</p>

---

## Project Overview & Technical Approach

Xai is a single-page marketing and demonstration site built with **Next.js 16 (App Router)**. It walks users through a visual narrative mirroring the intelligence pipeline:

1. **Raw Data** — The `HeroSection` opens with a Three.js particle mesh (343 nodes, 7×7×7 grid) that morphs from random scatter to ordered structure as you scroll — symbolising chaos resolving into form.
2. **Structured Intelligence** — The `InsightFlow` section pins the viewport and scroll-scrubs through three pipeline phases (Ingest Data → Analyze with AI → Generate Insight), revealing how raw streams become queryable fabric.
3. **Actionable Insight** — The `NeuralCluster` canvas engine lets users interactively toggle between three topological layouts (Constellation, Orbit, Matrix), demonstrating real-time vector reorganisation driven by scroll velocity and trigonometric math.
4. **AI Automations** — The `DashboardPreview` renders a fully interactive mock workspace with sidebar navigation, animated SVG charts, live table filtering, and tab-state management — a calm command centre for decisions.
5. **Fully Responsive** — Every section adapts across mobile, tablet, and desktop breakpoints. Layouts stack vertically on small screens, canvas elements resize via `getBoundingClientRect`, and touch-friendly controls ensure the Neural Cluster and Dashboard remain usable on any device.

The motion architecture is intentionally **segregated by responsibility**:
- **GSAP + ScrollTrigger** handles the scroll-pinned timeline scrub — unmatched frame-accurate control for pinning and scrubbing.
- **Framer Motion** manages React-component-level choreography — `AnimatePresence` for tab transitions, `layoutId` for spring-animated indicators, path-length animations for the SVG chart.
- **Vanilla Canvas 2D** drives the NeuralCluster's 130-particle engine — avoiding React reconciliation overhead for per-frame `Math.sin`, `Math.atan2`, and scroll-velocity calculations.
- **Three.js (WebGL)** renders the Hero's background particle mesh — GPU-accelerated vertex morphing via buffer geometry and additive blending.

## Technology Stack

| Category | Technology | Version |
|---|---|---|
| Language | JavaScript (ES2022+) | — |
| Core Framework | Next.js (App Router) | 16.2.10 |
| UI Library | React | 19.2.4 |
| Scroll Animation | GSAP + ScrollTrigger + `@gsap/react` | 3.15.0 |
| Layout Animation | Framer Motion | 12.42.2 |
| 3D Graphics | Three.js | 0.185.1 |
| Styling | Tailwind CSS v4 + `tw-animate-css` | 4.x |
| UI Primitives | Base UI React + shadcn/ui | 1.6.0 / 4.13 |
| Icons | Lucide React | 1.24 |
| Utilities | `clsx` + `tailwind-merge` | latest |
| Fonts | Geist / Geist Mono (via `next/font`) | — |
| Analytics | `@vercel/analytics` | 2.0.1 |

## Instructions to Run the Project Locally

### Prerequisites

- **Node.js** >= 18.18
- **npm** (included with Node.js)

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd xai-intelligence

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

> The project uses `next dev --webpack` (turbopack disabled) with the React Compiler enabled via `babel-plugin-react-compiler`.

## Key Animation & Interaction Decisions — Video Walkthrough

A detailed technical walkthrough explaining the design, math, and motion choices behind every section is available here:

📺 **Watch the full walkthrough:** *[Insert Google Drive or YouTube link here]*

The walkthrough covers:
- **Hero Section** — GSAP staggered entrance with blurred-to-sharp reveals and the Three.js chaos-to-order particle morph.
- **Insight Flow** — ScrollTrigger pinning, scrub timing, progress line scaleY transitions, and pointer-events toggling between phases.
- **Neural Cluster** — Canvas particle engine architecture, scroll velocity smoothing, trigonometric layout calculations (`Math.sin`/`Math.atan2`), and dual-theme colour mapping.
- **Dashboard Preview** — Framer Motion `layoutId` spring navigation, SVG path-length chart animation, and `AnimatePresence` table filtering with popLayout exiting.

> *Note: A ready-to-read walkthrough script is included below this README for reference or recording purposes.*
