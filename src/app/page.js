import { HeroSection } from "@/components/hero-section"
import { InsightFlow } from "@/components/insight-flow"
import { DashboardPreview } from "@/components/dashboard/dashboard-preview"
import { NeuralCluster } from "@/components/neural-cluster"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <InsightFlow />
      <DashboardPreview />
      <NeuralCluster/>
      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-xs font-bold">X</span>
            </div>
            <span className="font-medium text-foreground">Xai</span>
            <span>— Intelligence Workspace</span>
          </div>
          <span className="font-mono text-xs">© {new Date().getFullYear()} Xai Labs</span>
        </div>
      </footer>
    </main>
  )
}
