const automationRows = [
  { source: 'Focus mode', target: 'Hue lights', action: 'dim 35%' },
  { source: 'Focus mode', target: 'Door sign', action: 'turn on' },
  { source: 'Focus mode', target: 'Doorbell', action: 'silent' },
  { source: 'Session done', target: 'Coffee', action: 'warm up' },
]

export function SmartHomeScene() {
  return (
    <div
      style={{
        width: 380,
        height: 500,
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface) 88%, var(--bg)) 0%, var(--surface) 100%)',
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ring-1)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Smart Home Scene
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-3)', marginTop: 4 }}>
            Matter automation chain
          </div>
        </div>
        <div
          style={{
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid color-mix(in srgb, var(--ring-1) 36%, var(--border))',
            background: 'color-mix(in srgb, var(--ring-1-dim) 80%, var(--surface))',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            fontWeight: 700,
            color: 'var(--ring-1)',
          }}
        >
          LIVE
        </div>
      </div>

      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid color-mix(in srgb, var(--ring-1) 24%, var(--border))',
            background: 'linear-gradient(180deg, color-mix(in srgb, var(--ring-1-dim) 72%, var(--surface)), var(--surface))',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ring-1)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
            Trigger
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 700, color: 'var(--tx)' }}>Focus Mode On</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-2)', marginTop: 6 }}>
                BUSY Bar переключён в глубокую работу
              </div>
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'var(--ring-1)',
                boxShadow: '0 0 28px color-mix(in srgb, var(--ring-1) 34%, transparent)',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
          <DeviceCard title="Lights" state="dimmed" />
          <DeviceCard title="Door sign" state="busy" accent />
          <DeviceCard title="Doorbell" state="silent" />
          <DeviceCard title="Coffee" state="queued" />
        </div>

        <div
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Recipe chain
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {automationRows.map((row) => (
              <div
                key={`${row.source}-${row.target}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr auto 1fr',
                  gap: 'var(--space-2)',
                  alignItems: 'center',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--tx-2)',
                }}
              >
                <span style={{ color: 'var(--tx)' }}>{row.source}</span>
                <span style={{ color: 'var(--ring-1)' }}>→</span>
                <span>{row.target}</span>
                <span style={{ color: 'var(--tx-3)' }}>·</span>
                <span>{row.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DeviceCard({ title, state, accent = false }: { title: string; state: string; accent?: boolean }) {
  return (
    <div
      style={{
        padding: 'var(--space-3)',
        borderRadius: 'var(--radius-lg)',
        border: `1px solid ${accent ? 'color-mix(in srgb, var(--ring-1) 35%, var(--border))' : 'var(--border)'}`,
        background: accent ? 'color-mix(in srgb, var(--ring-1-dim) 78%, var(--surface))' : 'var(--surface)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {title}
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: accent ? 'var(--ring-1)' : 'var(--tx)', marginTop: 8 }}>
        {state}
      </div>
    </div>
  )
}
