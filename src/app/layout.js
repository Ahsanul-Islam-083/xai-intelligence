import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/context/theme-context'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata = {
  title: 'Xai — Intelligence Workspace',
  description:
    'From raw data to structured intelligence. Xai turns messy signals into decisions with an AI-native workspace.',
  generator: 'v0.app',
}

export const viewport = {
  colorScheme: 'dark light',
  themeColor: '#0a0c11',
}

// This script runs synchronously before paint — it's the ONLY way to
// prevent FOUC. It reads localStorage (or falls back to prefers-color-scheme),
// then applies the .dark class to <html> before the browser renders a single
// pixel. React's suppressHydrationWarning on <html> lets the server-rendered
// markup (no class) and the client-applied class coexist without a warning.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('xai-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    // localStorage may be blocked in private browsing — silently fall through.
    document.documentElement.classList.add('dark');
  }
})();
`

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: The blocking script mutates the className
    // attribute before React hydrates. Without this prop, React would warn
    // that the server HTML (no class) doesn't match the client DOM (has .dark).
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* dangerouslySetInnerHTML bypasses React's escaping so the script
            runs as a real synchronous blocking script — not deferred. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-background font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
