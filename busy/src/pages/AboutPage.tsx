import PageHeader from '@components/layout/PageHeader'
import DitheredRings from '@components/viz/DitheredRings'

export default function AboutPage() {
  return (
    <div
      style={{
        maxWidth: 1040,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        paddingTop: 'var(--space-3)',
        paddingBottom: 'var(--space-10)',
      }}
    >
      {/* Dithered rings hero */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 'var(--space-8) 0 var(--space-4)',
        }}
      >
        <DitheredRings size={320} />
      </div>

      <PageHeader
        title="ABOUT"
        subtitle={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <a
              href="https://busy.bar/"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--or)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              busy.bar
            </a>
            <span style={{ color: 'var(--tx-3)', fontSize: 'var(--text-xs)' }}>·</span>
            <a
              href="https://busy.app/"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--or)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              busy.app
            </a>
          </div>
        }
        description="A speculative strategy environment: roadmap, ring logic, prototype concepts, and design system gathered into one interface."
      />

      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          padding: 'var(--space-6)',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--tx-3)',
          }}
        >
          Project Context
        </span>

        <p
          style={{
            margin: 0,
            maxWidth: 860,
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            lineHeight: 1.65,
            color: 'var(--tx-2)',
          }}
        >
          This interface is a speculative strategy tool. It presents an imagined
          product roadmap, ring model, prototype gallery, and design system for a
          fictional company built around{' '}
          <a
            href="https://busy.bar/"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--or)', textDecoration: 'none' }}
          >
            BUSY Bar
          </a>{' '}
          and{' '}
          <a
            href="https://busy.app/"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--or)', textDecoration: 'none' }}
          >
            BUSY App
          </a>
          .
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {[
          ['What it is', 'A strategic visualization and prototype environment.'],
          ['What it is not', 'Not an official product promise, release plan, or investor deck.'],
          ['How to read it', 'Think of it as a narrative model for how the product could evolve over time.'],
        ].map(([title, body]) => (
          <article
            key={title}
            style={{
              padding: 'var(--space-5)',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                marginBottom: 'var(--space-2)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: 'var(--tx-3)',
              }}
            >
              {title}
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-base)',
                lineHeight: 1.6,
                color: 'var(--tx)',
              }}
            >
              {body}
            </p>
          </article>
        ))}
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-5)',
          alignItems: 'start',
        }}
      >
        <article
          style={{
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              marginBottom: 'var(--space-3)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--tx-3)',
            }}
          >
            Why it exists
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-lg)',
              lineHeight: 1.65,
              color: 'var(--tx)',
            }}
          >
            <p style={{ margin: 0 }}>
              The goal of this project is to make strategy tangible. Instead of
              keeping the roadmap as static slides or fragmented notes, the plan is
              rendered as an explorable interface: rings, phases, gates, focus
              constellations, and speculative product screens.
            </p>
            <p style={{ margin: 0 }}>
              It is intentionally imaginative. The roadmap is designed to help a
              team think about sequencing, product logic, stakeholder value, and
              narrative coherence. Some concepts may never be built. Others may
              evolve into something very different.
            </p>
            <p style={{ margin: 0 }}>
              In short: this is a strategic artifact, not a commitment.
            </p>
          </div>
        </article>

        <aside
          style={{
            padding: 'var(--space-5)',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              marginBottom: 'var(--space-3)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--tx-3)',
            }}
          >
            Disclaimer
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base)',
              lineHeight: 1.6,
              color: 'var(--tx)',
            }}
          >
            <a
              href="https://busy.bar/"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--or)', textDecoration: 'none' }}
            >
              BUSY Bar
            </a>{' '}
            and{' '}
            <a
              href="https://busy.app/"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--or)', textDecoration: 'none' }}
            >
              BUSY App
            </a>{' '}
            are used here as the narrative frame for a fictional company roadmap.
            This page should be read as a concept piece and internal strategy
            exploration, not as an official announcement or public promise.
          </p>
        </aside>
      </section>

      <section
        style={{
          padding: 'var(--space-6)',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            marginBottom: 'var(--space-3)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--tx-3)',
          }}
        >
          Summary
        </div>
        <p
          style={{
            margin: 0,
            maxWidth: 860,
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            lineHeight: 1.65,
            color: 'var(--tx)',
          }}
        >
          This site should be understood as a fictional strategic narrative for
          an imagined BUSY company ecosystem. It is designed to explore how{' '}
          <a
            href="https://busy.bar/"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--or)', textDecoration: 'none' }}
          >
            BUSY Bar
          </a>{' '}
          and{' '}
          <a
            href="https://busy.app/"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--or)', textDecoration: 'none' }}
          >
            BUSY App
          </a>{' '}
          might evolve across product rings, roadmap phases, prototype concepts,
          and future platform directions.
        </p>
      </section>

      {/* Made by */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 'var(--space-4)',
        }}
      >
        <a
          href="https://thdts.com"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            opacity: 0.6,
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
        >
          thdts.com · the dots
        </a>
      </div>
    </div>
  )
}
