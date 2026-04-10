import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { useIsCompact } from '@lib/useIsCompact'

const navItems = [
  { to: '/', label: 'Стратегия' },
  { to: '/roadmap', label: 'Роадмап' },
  { to: '/insights', label: 'Инсайты' },
  { to: '/prototypes', label: 'Прототипы' },
  { to: '/system', label: 'Дизайн' },
] as const

const glass: React.CSSProperties = {
  background: 'color-mix(in srgb, var(--surface) 88%, var(--bg))',
  border: '1px solid color-mix(in srgb, var(--border) 84%, transparent)',
  backdropFilter: 'blur(18px) saturate(1.15)',
  boxShadow: 'var(--shadow-md)',
}

const THEME_STORAGE_KEY = 'busy-theme'

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function AppShell() {
  const location = useLocation()
  const isCompact = useIsCompact()
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme)

  const isStrategyPage = location.pathname === '/'

  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : ''
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div style={{ minHeight: '100svh', background: 'var(--bg)', color: 'var(--tx)' }}>
      {/* Main content — padded so non-fullscreen pages clear the floating bars */}
      <main
        style={{
          padding: isStrategyPage
            ? 0
            : isCompact
              ? 'var(--space-4) var(--space-4) var(--nav-clearance-compact)'
              : 'var(--space-6) var(--space-6) var(--nav-clearance)',
        }}
      >
        <Outlet />
      </main>

      {/* ── Bottom center: nav tabs ── */}
      <nav
        aria-label="Основная навигация"
        style={{
          ...glass,
          position: 'fixed',
          bottom: 'var(--space-3)',
          left: isCompact ? 12 : '50%',
          right: isCompact ? 12 : 'auto',
          transform: isCompact ? 'none' : 'translateX(-50%)',
          zIndex: 50,
          display: 'flex',
          gap: 'var(--space-1)',
          borderRadius: 'var(--radius-full)',
          padding: '5px',
          whiteSpace: 'nowrap',
          overflowX: 'auto',
          justifyContent: 'center',
        }}
      >
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              padding: isCompact ? '6px 10px' : '5px 14px',
              fontSize: isCompact ? 'var(--text-xs)' : 'var(--text-sm)',
              fontFamily: 'var(--font-sans)',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--tx)' : 'var(--tx-2)',
              textDecoration: 'none',
              borderRadius: 'var(--radius-full)',
              background: isActive ? 'color-mix(in srgb, var(--surface) 68%, var(--sl-bg))' : 'transparent',
              border: isActive ? '1px solid color-mix(in srgb, var(--sl) 22%, var(--border))' : '1px solid transparent',
              boxShadow: isActive ? '0 4px 14px color-mix(in srgb, var(--sl) 16%, transparent)' : 'none',
              transition: 'var(--transition-fast)',
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* ── Bottom right: zoom slot + theme toggle ── */}
      <div
        style={{
          ...glass,
          position: 'fixed',
          bottom: isCompact ? 'var(--nav-clearance-compact)' : 'var(--space-3)',
          right: 12,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-1)',
          borderRadius: 'var(--radius-md)',
          padding: isCompact ? '3px 5px' : '4px 7px',
        }}
      >
        {isStrategyPage && (
          <div id="nav-zoom-slot" style={{ display: 'flex', alignItems: 'center' }} />
        )}
        <Link
          to="/system"
          style={{
            fontSize: 11,
            color: 'var(--tx-3)',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
            opacity: 0.7,
          }}
        >
          sys
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: isCompact ? 9 : 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            background: 'color-mix(in srgb, var(--surface) 72%, var(--bg))',
            border: '1px solid color-mix(in srgb, var(--border) 80%, transparent)',
            borderRadius: 'var(--radius-md)',
            padding: isCompact ? '3px 7px' : '2px 7px',
            cursor: 'pointer',
            color: 'var(--tx-2)',
            boxShadow: 'var(--shadow-xs)',
            transition: 'var(--transition-fast)',
          }}
        >
          {theme === 'dark' ? 'LIGHT' : 'DARK'}
        </button>
      </div>
    </div>
  )
}
