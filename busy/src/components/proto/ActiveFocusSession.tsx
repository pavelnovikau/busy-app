export function ActiveFocusSession() {
  return (
    <div
      style={{
        width: 360,
        height: 500,
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface) 92%, var(--bg)) 0%, var(--surface) 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: 'var(--space-4) var(--space-5)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'color-mix(in srgb, var(--ring-1-dim) 75%, transparent)',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ring-1)',
            }}
          >
            Active Focus Session
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginTop: 4 }}>
            full-screen deep work mode
          </div>
        </div>
        <div
          style={{
            width: 12,
            height: 48,
            borderRadius: 999,
            background: 'linear-gradient(180deg, var(--ring-1), color-mix(in srgb, var(--ring-1) 50%, transparent))',
            boxShadow: '0 0 24px color-mix(in srgb, var(--ring-1) 40%, transparent)',
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          background: `
            radial-gradient(circle at 50% 28%, color-mix(in srgb, var(--ring-1-dim) 90%, transparent), transparent 40%),
            linear-gradient(180deg, transparent, color-mix(in srgb, var(--surface-2) 70%, transparent))
          `,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)' }}>15:42 · Tue</div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--ring-1)',
              border: '1px solid color-mix(in srgb, var(--ring-1) 45%, var(--border))',
              borderRadius: 'var(--radius-full)',
              padding: '4px 10px',
              background: 'color-mix(in srgb, var(--ring-1-dim) 80%, var(--surface))',
            }}
          >
            DO NOT DISTURB
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '10px solid color-mix(in srgb, var(--ring-1) 22%, var(--surface))',
              boxShadow: '0 0 0 1px color-mix(in srgb, var(--ring-1) 28%, var(--border)), inset 0 0 42px color-mix(in srgb, var(--ring-1) 14%, transparent), 0 22px 50px color-mix(in srgb, var(--ring-1) 18%, transparent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle, color-mix(in srgb, var(--surface) 86%, var(--ring-1-dim)) 0%, var(--surface) 72%)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 56, color: 'var(--tx)', lineHeight: 1 }}>42:18</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                block 3 of 4
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Current Project
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 600, color: 'var(--tx)', marginTop: 6 }}>
              Strategy Narrative
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-3)',
          }}
        >
          <MetricCard label="Slack" value="paused" />
          <MetricCard label="Doorbell" value="silent" />
          <MetricCard label="Next break" value="17 min" />
          <MetricCard label="Session score" value="88" accent />
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      style={{
        padding: 'var(--space-3)',
        borderRadius: 'var(--radius-lg)',
        border: `1px solid ${accent ? 'color-mix(in srgb, var(--ring-1) 36%, var(--border))' : 'var(--border)'}`,
        background: accent ? 'color-mix(in srgb, var(--ring-1-dim) 78%, var(--surface))' : 'var(--surface)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: accent ? 'var(--ring-1)' : 'var(--tx)', marginTop: 6 }}>
        {value}
      </div>
    </div>
  )
}
