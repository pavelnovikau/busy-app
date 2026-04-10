const rows = [
  { project: 'Busy App Strategy', source: 'Calendar + active window', time: '6h 20m', confidence: '97%' },
  { project: 'Customer interviews', source: 'Meet + notes + tags', time: '2h 10m', confidence: '91%' },
  { project: 'Internal sync', source: 'Slack + call detection', time: '1h 05m', confidence: '88%' },
]

export function AutoTimesheetOps() {
  return (
    <div
      style={{
        width: 380,
        height: 500,
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--surface) 90%, var(--bg)) 0%, var(--surface) 100%)',
      }}
    >
      <div
        style={{
          padding: 'var(--space-4) var(--space-5)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--ring-1)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Auto Timesheet Ops
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--tx-3)',
              marginTop: 4,
            }}
          >
            zero manual tracking
          </div>
        </div>
        <div
          style={{
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid color-mix(in srgb, var(--ring-1) 34%, var(--border))',
            background: 'color-mix(in srgb, var(--ring-1-dim) 78%, var(--surface))',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            fontWeight: 700,
            color: 'var(--ring-1)',
          }}
        >
          READY TO EXPORT
        </div>
      </div>

      <div
        style={{
          padding: 'var(--space-5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-3)',
          }}
        >
          <MetricCard title='Week total' value='9h 35m' subtitle='captured automatically' accent />
          <MetricCard title='Manager review' value='4 min' subtitle='instead of manual entry' />
        </div>

        <div
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid color-mix(in srgb, var(--ring-1) 24%, var(--border))',
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--ring-1-dim) 72%, var(--surface)), var(--surface))',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--ring-1)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 10,
            }}
          >
            B2B wedge
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 21,
              fontWeight: 700,
              color: 'var(--tx)',
            }}
          >
            Sell the reporting layer, not the timer.
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--tx-2)',
              lineHeight: 1.55,
              marginTop: 8,
            }}
          >
            BUSY reconstructs timesheets from status signals, calendar blocks,
            app context, and call activity. Teams get billable structure without
            forcing people to track time manually.
          </div>
        </div>

        <div
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--tx-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 10,
            }}
          >
            Auto-captured entries
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {rows.map((row) => (
              <div
                key={row.project}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr auto',
                  gap: 'var(--space-3)',
                  alignItems: 'start',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--tx)' }}>
                    {row.project}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--tx-2)', marginTop: 4 }}>
                    {row.source}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--tx)' }}>
                    {row.time}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ring-1)', marginTop: 4 }}>
                    {row.confidence}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-3)',
          }}
        >
          <ExportPill label='Harvest' />
          <ExportPill label='Jira / Tempo' />
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  subtitle,
  accent = false,
}: {
  title: string
  value: string
  subtitle: string
  accent?: boolean
}) {
  return (
    <div
      style={{
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-xl)',
        border: `1px solid ${accent ? 'color-mix(in srgb, var(--ring-1) 24%, var(--border))' : 'var(--border)'}`,
        background: accent ? 'color-mix(in srgb, var(--ring-1-dim) 72%, var(--surface))' : 'var(--surface)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {title}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: accent ? 'var(--ring-1)' : 'var(--tx)', marginTop: 10 }}>
        {value}
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-2)', marginTop: 6 }}>
        {subtitle}
      </div>
    </div>
  )
}

function ExportPill({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: '10px 12px',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed color-mix(in srgb, var(--ring-1) 28%, var(--border))',
        background: 'color-mix(in srgb, var(--surface-2) 78%, var(--bg))',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        color: 'var(--ring-1)',
        textAlign: 'center',
      }}
    >
      {label}
    </div>
  )
}
