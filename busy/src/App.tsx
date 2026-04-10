import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { LazyMotion } from 'motion/react'
import AppShell from './components/layout/AppShell'

const loadFeatures = () =>
  import('motion/react').then((m) => m.domAnimation)

const StrategyPage = lazy(() => import('./pages/StrategyPage'))
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'))
const InsightsPage = lazy(() => import('./pages/InsightsPage'))
const PrototypesPage = lazy(() => import('./pages/PrototypesPage'))
const SystemPage = lazy(() => import('./pages/SystemPage'))

function PageFallback() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        color: 'var(--tx-3)',
        letterSpacing: '0.05em',
      }}
    >
      ···
    </div>
  )
}

export default function App() {
  return (
    <LazyMotion features={loadFeatures} strict>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Suspense fallback={<PageFallback />}><StrategyPage /></Suspense>} />
            <Route path="roadmap" element={<Suspense fallback={<PageFallback />}><RoadmapPage /></Suspense>} />
            <Route path="insights" element={<Suspense fallback={<PageFallback />}><InsightsPage /></Suspense>} />
            <Route path="prototypes" element={<Suspense fallback={<PageFallback />}><PrototypesPage /></Suspense>} />
            <Route path="system" element={<Suspense fallback={<PageFallback />}><SystemPage /></Suspense>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LazyMotion>
  )
}
