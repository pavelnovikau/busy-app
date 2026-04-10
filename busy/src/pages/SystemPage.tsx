import { motion } from 'motion/react'
import { Button } from '@components/ui/button'

// ── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ marginBottom: 'var(--space-10)' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-5)',
          paddingBottom: 'var(--space-3)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          #{id}
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            color: 'var(--tx)',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  )
}

// ── Color swatch ─────────────────────────────────────────────────────────────

function Swatch({ varName, label }: { varName: string; label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', width: 72 }}>
      <div
        style={{
          width: 72,
          height: 48,
          background: `var(${varName})`,
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--tx-3)',
          wordBreak: 'break-all',
        }}
      >
        {label ?? varName}
      </span>
    </div>
  )
}

// ── Token row ─────────────────────────────────────────────────────────────────

function TokenRow({ name, value }: { name: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 'var(--space-4)',
        padding: 'var(--space-2) 0',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <code
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-sm)',
          color: 'var(--ring-3)',
          width: 200,
          flexShrink: 0,
        }}
      >
        {name}
      </code>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-sm)',
          color: 'var(--tx-2)',
        }}
      >
        {value}
      </span>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function SystemPage() {
  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--space-4)',
          padding: 'var(--space-4) 0',
          marginBottom: 'var(--space-8)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--tx)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 600,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Система дизайна
        </h1>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--tx-3)' }}>
          токены · типографика · компоненты
        </span>
      </div>

      {/* ── 1. Typography ── */}
      <Section title="Typography" id="typography">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>

          {/* Geist Sans */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Geist Sans Variable — Interface
            </div>
            {(['var(--text-4xl)', 'var(--text-2xl)', 'var(--text-base)', 'var(--text-sm)', 'var(--text-xs)'] as const).map((size, i) => (
              <div key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: size, color: 'var(--tx)', lineHeight: 1.3, marginBottom: 'var(--space-2)' }}>
                The quick brown fox jumps
              </div>
            ))}
          </div>

          {/* Geist Mono */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Geist Mono Variable — Code & Technical
            </div>
            {(['var(--text-4xl)', 'var(--text-2xl)', 'var(--text-base)', 'var(--text-sm)', 'var(--text-xs)'] as const).map((size, i) => (
              <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: size, color: 'var(--tx)', lineHeight: 1.3, marginBottom: 'var(--space-2)' }}>
                STRATEGY · r1 · 0–9m
              </div>
            ))}
          </div>

          {/* Geist Pixel Square */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Geist Pixel Square — Display & Accent
            </div>
            {(['var(--text-4xl)', 'var(--text-2xl)', 'var(--text-base)'] as const).map((size, i) => (
              <div key={i} style={{ fontFamily: 'var(--font-pixel)', fontSize: size, color: 'var(--ring-1)', lineHeight: 1.8, marginBottom: 'var(--space-2)' }}>
                BUSY
              </div>
            ))}
          </div>

          {/* Geist Pixel Grid */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Geist Pixel Grid — Display Variant
            </div>
            {(['var(--text-4xl)', 'var(--text-2xl)', 'var(--text-base)'] as const).map((size, i) => (
              <div key={i} style={{ fontFamily: 'var(--font-pixel-grid)', fontSize: size, color: 'var(--ring-3)', lineHeight: 1.8, marginBottom: 'var(--space-2)' }}>
                BUSY
              </div>
            ))}
          </div>

          {/* Scale reference */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            {[
              ['--text-xs', '11px'], ['--text-sm', '12px'], ['--text-base', '14px'],
              ['--text-lg', '16px'], ['--text-xl', '18px'], ['--text-2xl', '24px'],
              ['--text-3xl', '32px'], ['--text-4xl', '42px'],
            ].map(([token, val]) => (
              <div key={token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: `var(${token})`, color: 'var(--tx)', lineHeight: 1 }}>Aa</div>
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)' }}>{val}</code>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 2. Flexoki Palette ── */}
      <Section title="Flexoki Palette" id="flexoki">
        {/* Accent colors × 4 states */}
        <div style={{ marginBottom: 'var(--space-7)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            8 hues × 4 states (main · hover · active · bg tint)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {([
              ['sl',  'Slate'],
              ['re',  'Red'],
              ['or',  'Orange'],
              ['ye',  'Yellow'],
              ['gr',  'Green'],
              ['cy',  'Cyan'],
              ['bl',  'Blue'],
              ['pu',  'Purple'],
              ['ma',  'Magenta'],
            ] as const).map(([key, label]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
                  color: `var(--${key})`, width: 64, flexShrink: 0,
                  fontWeight: 700, letterSpacing: '0.06em',
                }}>
                  --{key}
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', width: 52, flexShrink: 0 }}>
                  {label}
                </span>
                {/* 4 state swatches */}
                {[
                  [`var(--${key})`,        'main'],
                  [`var(--${key}-2)`,      'hover'],
                  [`var(--${key}-active)`, 'active'],
                  [`var(--${key}-bg)`,     'bg tint'],
                ].map(([bg, stateLabel]) => (
                  <div key={stateLabel} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{
                      width: 40, height: 28,
                      background: bg,
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                    }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--tx-3)' }}>{stateLabel}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Extended 13-step ramps */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Extended scale — 13 steps per hue (50 → 950)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {([
              ['red',     'Re'],
              ['orange',  'Or'],
              ['yellow',  'Ye'],
              ['green',   'Gr'],
              ['cyan',    'Cy'],
              ['blue',    'Bl'],
              ['purple',  'Pu'],
              ['magenta', 'Ma'],
            ] as const).map(([name, short]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--tx-3)', width: 26, flexShrink: 0 }}>{short}</span>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[50,100,150,200,300,400,500,600,700,800,850,900,950].map((step) => (
                    <div
                      key={step}
                      title={`--${name}-${step}`}
                      style={{
                        width: 28, height: 22,
                        background: `var(--${name}-${step})`,
                        borderRadius: 2,
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 2, marginLeft: 2 }}>
                  {[50,100,150,200,300,400,500,600,700,800,850,900,950].map((step) => (
                    <span key={step} style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--tx-3)', width: 28, textAlign: 'center' }}>{step}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 3. Ring Colors ── */}
      <Section title="Ring Colors" id="ring-colors">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)' }}>
          {[
            ['--ring-0', 'Ring 0 · Core'], ['--ring-1', 'Ring 1 · Software'],
            ['--ring-2', 'Ring 2 · Platform'], ['--ring-3', 'Ring 3 · Ecosystem'],
          ].map(([v, l]) => <Swatch key={v} varName={v} label={l} />)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
          {[
            ['--ring-0-dim', 'ring-0 dim'], ['--ring-1-dim', 'ring-1 dim'],
            ['--ring-2-dim', 'ring-2 dim'], ['--ring-3-dim', 'ring-3 dim'],
          ].map(([v, l]) => <Swatch key={v} varName={v} label={l} />)}
        </div>
      </Section>

      {/* ── 3. Semantic Colors ── */}
      <Section title="Semantic Colors" id="semantic-colors">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Backgrounds</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              {['--bg', '--bg-2', '--surface', '--surface-2'].map((v) => <Swatch key={v} varName={v} />)}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Text</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              {['--tx', '--tx-2', '--tx-3'].map((v) => <Swatch key={v} varName={v} />)}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Intent</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {([
                ['primary', '--color-primary', '--color-primary-hover', '--color-primary-active'],
                ['success', '--color-success', '--color-success-hover', ''],
                ['warning', '--color-warning', '--color-warning-hover', ''],
                ['danger',  '--color-danger',  '--color-danger-hover',  ''],
                ['info',    '--color-info',    '--color-info-hover',    ''],
              ] as const).map(([label, main, hover, active]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', width: 52, flexShrink: 0 }}>{label}</span>
                  <Swatch varName={main} label="default" />
                  <Swatch varName={hover} label="hover" />
                  {active && <Swatch varName={active} label="active" />}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Borders</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              {['--border', '--border-2'].map((v) => <Swatch key={v} varName={v} />)}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 4. Spacing Tokens ── */}
      <Section title="Spacing" id="spacing">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            ['--space-1', '4px'], ['--space-2', '8px'], ['--space-3', '12px'],
            ['--space-4', '16px'], ['--space-5', '20px'], ['--space-6', '24px'],
            ['--space-7', '32px'], ['--space-8', '40px'], ['--space-9', '48px'],
            ['--space-10', '64px'], ['--space-11', '80px'], ['--space-12', '96px'],
          ].map(([token, val]) => (
            <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border)' }}>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--ring-3)', width: 120, flexShrink: 0 }}>{token}</code>
              <div style={{ width: `var(${token})`, height: 16, background: 'var(--ring-1)', borderRadius: 2, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--tx-3)' }}>{val}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. Radius Tokens ── */}
      <Section title="Radius" id="radius">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)' }}>
          {[
            ['--radius-sm', '4px'], ['--radius-md', '8px'], ['--radius-lg', '12px'],
            ['--radius-xl', '16px'], ['--radius-full', '9999px'],
          ].map(([token, val]) => (
            <div key={token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div style={{ width: 64, height: 64, border: '2px solid var(--ring-1)', borderRadius: `var(${token})` }} />
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)' }}>{val}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 6. Tokens Reference ── */}
      <Section title="All Tokens" id="all-tokens">
        <div>
          {[
            ['--font-sans', '"Geist Variable", ui-sans-serif'],
            ['--font-mono', '"Geist Mono Variable", ui-monospace'],
            ['--font-pixel', '"Geist Pixel Square", monospace'],
            ['--font-pixel-grid', '"Geist Pixel Grid", monospace'],
            ['--transition-fast', '100ms ease'],
            ['--transition-base', '200ms ease'],
            ['--transition-slow', '350ms ease'],
            ['--constellation-edge-local', 'cool gray — subtle edge within ring'],
            ['--constellation-edge-bridge', 'var(--re-2) — cross-ring edge'],
            ['--constellation-anchor', 'var(--re) — anchor node highlight'],
          ].map(([n, v]) => <TokenRow key={n} name={n} value={v} />)}
        </div>
      </Section>

      {/* ── 7. Components ── */}
      <Section title="Components" id="components">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>

          {/* Buttons */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Button variants (shadcn/ui)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* Ring badges */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Ring badges
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              {(['r0', 'r1', 'r2', 'r3'] as const).map((r) => (
                <span
                  key={r}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: `var(--ring-${r.replace('r', '')})`,
                    background: `var(--ring-${r.replace('r', '')}-dim)`,
                    padding: '2px 10px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  Ring {r.replace('r', '')}
                </span>
              ))}
            </div>
          </div>

          {/* Surface cards */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Surface levels
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              {(['--bg', '--bg-2', '--surface', '--surface-2'] as const).map((v) => (
                <div
                  key={v}
                  style={{
                    width: 120,
                    height: 80,
                    background: `var(${v})`,
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 'var(--space-2)',
                  }}
                >
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)' }}>{v}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
