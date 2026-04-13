import { useRef, useEffect } from 'react'

// ── Logical canvas coordinate space ──────────────────────────────────────────
const SIZE = 320 // logical px; physical = SIZE * devicePixelRatio

// Ring definitions: colorVar, radius, dot spacing — all in logical px
const RING_SPECS = [
  { colorVar: '--ring-0', r: 28,  spacing: 3.8 },
  { colorVar: '--ring-1', r: 74,  spacing: 3.8 },
  { colorVar: '--ring-2', r: 118, spacing: 3.8 },
  { colorVar: '--ring-3', r: 156, spacing: 3.8 },
] as const

const DOT_SIZE = 2.0  // dot square width (logical px)
const JITTER   = 1.0  // max positional noise (logical px)
const LERP     = 0.10 // spring return coefficient

// Mouse repulsion
const MOUSE_R  = 88  // influence radius (logical px)
const MOUSE_F  = 36  // force multiplier

// Click shockwave
const WAVE_SPEED = 185  // wave front speed (logical px/s)
const WAVE_WIDTH = 28   // band thickness (logical px)
const WAVE_FORCE = 24   // displacement force
const WAVE_DUR   = 1800 // lifetime (ms)

// ── Types ─────────────────────────────────────────────────────────────────────

type Ring = {
  color: string
  bx: Float32Array; by: Float32Array // base positions (CSS px)
  dx: Float32Array; dy: Float32Array // displacement
  n: number
}

type S = {
  ctx: CanvasRenderingContext2D
  w: number; h: number
  scale: number
  rings: Ring[]
  mx: number; my: number; mActive: boolean
  waves: { x: number; y: number; t0: number }[]
  hasDx: boolean
}

// ── Helpers ───────────────────────────────────────────────────────────────────

// Resolve a CSS custom property to a real color value usable in canvas
function resolveCSSColor(varName: string): string {
  const el = document.createElement('span')
  el.style.cssText = `position:absolute;visibility:hidden;color:var(${varName})`
  document.body.appendChild(el)
  const val = getComputedStyle(el).color
  el.remove()
  return val
}

function buildState(canvas: HTMLCanvasElement): S {
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  const w = rect.width, h = rect.height
  canvas.width = w * dpr
  canvas.height = h * dpr
  const ctx = canvas.getContext('2d')!
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  // Scale factor: maps logical px → CSS px
  const scale = Math.min(w, h) / SIZE
  const cx = w / 2, cy = h / 2

  const rings: Ring[] = RING_SPECS.map(({ colorVar, r: rr, spacing }) => {
    const R = rr * scale  // radius in CSS px
    // Dot count is fixed in logical space (same density at any canvas size)
    const n = Math.max(1, Math.floor((2 * Math.PI * rr) / spacing))
    const bx = new Float32Array(n)
    const by = new Float32Array(n)

    for (let i = 0; i < n; i++) {
      const aJitter = (Math.random() - 0.5) * 0.06 // slight angular scatter
      const rJitter = (Math.random() - 0.5) * JITTER * 2 * scale
      const a = (i / n) * 2 * Math.PI + aJitter
      bx[i] = cx + Math.cos(a) * (R + rJitter)
      by[i] = cy + Math.sin(a) * (R + rJitter)
    }

    return {
      color: resolveCSSColor(colorVar),
      bx, by,
      dx: new Float32Array(n),
      dy: new Float32Array(n),
      n,
    }
  })

  return {
    ctx, w, h, scale, rings,
    mx: -9999, my: -9999, mActive: false,
    waves: [],
    hasDx: false,
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DitheredRings({ size = 320 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<S | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    stateRef.current = buildState(canvas)

    let raf: number | null = null

    function frame(ts: number) {
      raf = null
      const s = stateRef.current!
      const { scale, waves, rings } = s

      // Expire old waves
      for (let i = waves.length - 1; i >= 0; i--) {
        if (ts - waves[i].t0 > WAVE_DUR) waves.splice(i, 1)
      }

      const hasWaves = waves.length > 0
      s.hasDx = false

      for (const g of rings) {
        for (let i = 0; i < g.n; i++) {
          const px = g.bx[i] + g.dx[i]
          const py = g.by[i] + g.dy[i]
          let tx = 0, ty = 0

          // Mouse repulsion
          if (s.mActive) {
            const ex = px - s.mx, ey = py - s.my
            const d2 = ex * ex + ey * ey
            const mr = MOUSE_R * scale
            if (d2 < mr * mr && d2 > 0.01) {
              const d = Math.sqrt(d2)
              const t = 1 - d / mr
              const f = t * t * t * MOUSE_F * scale
              tx += (ex / d) * f
              ty += (ey / d) * f
            }
          }

          // Shockwaves
          for (const wave of waves) {
            const elMs = ts - wave.t0
            const front = (elMs / 1000) * WAVE_SPEED * scale
            const falloff = 1 - elMs / WAVE_DUR
            const ex = g.bx[i] - wave.x, ey = g.by[i] - wave.y
            const d = Math.sqrt(ex * ex + ey * ey)
            if (d < 0.01) continue
            const gap = Math.abs(d - front)
            if (gap < WAVE_WIDTH * scale) {
              const f = (1 - gap / (WAVE_WIDTH * scale)) * falloff * WAVE_FORCE * scale
              tx += (ex / d) * f
              ty += (ey / d) * f
            }
          }

          // Spring toward target displacement
          g.dx[i] += (tx - g.dx[i]) * LERP
          g.dy[i] += (ty - g.dy[i]) * LERP

          // Settle small residuals
          if (Math.abs(g.dx[i]) < 0.01) g.dx[i] = 0
          if (Math.abs(g.dy[i]) < 0.01) g.dy[i] = 0
          if (g.dx[i] !== 0 || g.dy[i] !== 0) s.hasDx = true
        }
      }

      if (hasWaves) s.hasDx = true

      // Render
      const { ctx, w, h } = s
      ctx.clearRect(0, 0, w, h)
      const ds = DOT_SIZE * scale

      for (const g of rings) {
        ctx.fillStyle = g.color
        for (let i = 0; i < g.n; i++) {
          ctx.fillRect(
            g.bx[i] + g.dx[i] - ds * 0.5,
            g.by[i] + g.dy[i] - ds * 0.5,
            ds,
            ds,
          )
        }
      }

      if (s.mActive || s.hasDx) {
        raf = requestAnimationFrame(frame)
      }
    }

    raf = requestAnimationFrame(frame)

    const getPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const s = stateRef.current!
      const { x, y } = getPos(e)
      s.mx = x; s.my = y; s.mActive = true
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      stateRef.current!.mActive = false
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onUp = (e: PointerEvent) => {
      const s = stateRef.current!
      const { x, y } = getPos(e)
      s.waves.push({ x, y, t0: performance.now() })
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onResize = () => {
      stateRef.current = buildState(canvas)
      if (!raf) raf = requestAnimationFrame(frame)
    }

    // Re-resolve colors on theme change
    const mo = new MutationObserver(() => {
      stateRef.current = buildState(canvas)
      if (!raf) raf = requestAnimationFrame(frame)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointerup', onUp)
    window.addEventListener('resize', onResize)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointerup', onUp)
      window.removeEventListener('resize', onResize)
      mo.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, display: 'block', cursor: 'crosshair' }}
    />
  )
}
