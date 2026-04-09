import { motion } from 'motion/react'

const WEEK_BARS = [
  { day: 'Пн', hours: 3.5, sessions: 4 },
  { day: 'Вт', hours: 5.0, sessions: 6 },
  { day: 'Ср', hours: 4.2, sessions: 5 },
  { day: 'Чт', hours: 6.0, sessions: 7 },
  { day: 'Пт', hours: 4.8, sessions: 5 },
  { day: 'Сб', hours: 1.5, sessions: 2 },
  { day: 'Вс', hours: 0.5, sessions: 1 },
]
const MAX_HRS = 6

const RECENT = [
  { label: 'Написание отчёта', duration: '1h 20m', score: '94', ring: 'r1' },
  { label: 'Code review', duration: '45m', score: '81', ring: 'r1' },
  { label: 'Читал стратегию', duration: '1h 05m', score: '88', ring: 'r3' },
]

const RING_COLOR: Record<string, string> = {
  r0: 'var(--ring-0)', r1: 'var(--ring-1)', r2: 'var(--ring-2)', r3: 'var(--ring-3)',
}

export function FocusProfilePage() {
  const todayIdx = 3 // Thursday

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        width: 360,
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* Top banner */}
      <div
        style={{
          background: 'var(--ring-3-dim)',
          borderBottom: '1px solid var(--border)',
          padding: 'var(--space-4) var(--space-5)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-full)',
            border: '3px solid var(--ring-3)',
            background: 'var(--surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            color: 'var(--ring-3)',
            flexShrink: 0,
          }}
        >
          AK
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              color: 'var(--tx)',
            }}
          >
            Alex Kovalev
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--tx-3)',
              marginTop: 2,
            }}
          >
            busy.app/status/alex
          </div>
        </div>
        {/* Status badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'var(--ring-1-dim)',
            border: '1px solid var(--ring-1)',
            borderRadius: 'var(--radius-full)',
            padding: '3px 10px',
            flexShrink: 0,
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ring-1)', flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--ring-1)',
              whiteSpace: 'nowrap',
            }}
          >
            DEEP WORK
          </span>
        </div>
      </div>

      {/* Today stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {[
          { val: '6h 00m', label: 'Фокус' },
          { val: '7', label: 'Сессий' },
          { val: '91%', label: 'Качество' },
          { val: '21🔥', label: 'Серия' },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              padding: 'var(--space-3) var(--space-2)',
              textAlign: 'center',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-base)',
                fontWeight: 700,
                color: 'var(--ring-3)',
                letterSpacing: '0.02em',
              }}
            >
              {s.val}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--tx-3)',
                marginTop: 2,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--border)' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 'var(--space-3)',
          }}
        >
          Неделя · часов фокуса
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 48 }}>
          {WEEK_BARS.map((b, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  height: Math.max(4, Math.round((b.hours / MAX_HRS) * 40)),
                  background: i === todayIdx ? 'var(--ring-1)' : 'var(--ring-3)',
                  borderRadius: 'var(--radius-sm)',
                  transformOrigin: 'bottom',
                  opacity: i === todayIdx ? 1 : 0.6,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  color: i === todayIdx ? 'var(--tx-2)' : 'var(--tx-3)',
                }}
              >
                {b.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Current goal */}
      <div
        style={{
          padding: 'var(--space-3) var(--space-5)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          background: 'var(--ring-3-dim)',
        }}
      >
        <span style={{ color: 'var(--ring-3)', fontSize: 'var(--text-base)' }}>◎</span>
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx)', fontWeight: 500 }}>
            Цель: 6h фокуса в день
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginTop: 2 }}>
            Достигнута сегодня · серия 21 день
          </div>
        </div>
        <span style={{ marginLeft: 'auto', color: 'var(--color-success)', fontSize: 'var(--text-base)' }}>✓</span>
      </div>

      {/* Recent sessions */}
      <div style={{ padding: 'var(--space-4) var(--space-5)' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 'var(--space-3)',
          }}
        >
          Недавние сессии
        </div>
        {RECENT.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-2) 0',
              borderBottom: i < RECENT.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div
              style={{
                width: 6,
                height: 28,
                borderRadius: 3,
                background: RING_COLOR[r.ring],
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx)' }}>
                {r.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)' }}>
                {r.duration}
              </div>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: RING_COLOR[r.ring],
                background: `${RING_COLOR[r.ring].replace('var(', 'var(').replace(')', '-dim)')}`,
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              {r.score}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
