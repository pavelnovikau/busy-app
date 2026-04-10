const agents = [
  { name: 'Claude Code', state: 'Thinking', color: 'var(--sl)' },
  { name: 'Codex', state: 'Needs approval', color: 'var(--ring-1)' },
  { name: 'Cursor', state: 'Writing', color: 'var(--sl)' },
]

export function AIAgentMonitor() {
  return (
    <div
      style={{
        width: 380,
        height: 500,
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface) 90%, var(--bg)) 0%, var(--surface) 100%)',
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
            AI Agent Monitor
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-3)', marginTop: 4 }}>
            physical status for vibe coding
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)' }}>3 agents</div>
      </div>

      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div
          style={{
            padding: 'var(--space-5)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid color-mix(in srgb, var(--sl) 18%, var(--border))',
            background: 'linear-gradient(180deg, color-mix(in srgb, var(--sl-bg) 82%, var(--surface)), var(--surface))',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            BUSY matrix state
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 4,
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--surface-2) 82%, var(--bg))',
              border: '1px solid var(--border)',
            }}
          >
            {Array.from({ length: 48 }).map((_, index) => {
              const group = index < 16 ? 'var(--sl)' : index < 32 ? 'var(--ring-1)' : 'var(--sl)'
              const opacity = index % 5 === 0 ? 1 : index % 3 === 0 ? 0.72 : 0.4

              return (
                <div
                  key={index}
                  style={{
                    aspectRatio: '1 / 1',
                    borderRadius: 3,
                    background: group,
                    opacity,
                    boxShadow: opacity > 0.9 ? `0 0 10px color-mix(in srgb, ${group} 38%, transparent)` : 'none',
                  }}
                />
              )
            })}
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Agent feed
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {agents.map((agent) => (
              <div
                key={agent.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: 'var(--space-3)',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: agent.color,
                    boxShadow: `0 0 12px color-mix(in srgb, ${agent.color} 36%, transparent)`,
                  }}
                />
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--tx)' }}>
                    {agent.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', marginTop: 2 }}>
                    unix hooks → BUSY Bar HTTP API
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    fontWeight: 700,
                    color: agent.color,
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-full)',
                    border: `1px solid color-mix(in srgb, ${agent.color} 32%, var(--border))`,
                    background: 'var(--surface)',
                  }}
                >
                  {agent.state}
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
          <StateMap state="thinking" color="var(--sl)" />
          <StateMap state="needs you" color="var(--ring-1)" />
        </div>
      </div>
    </div>
  )
}

function StateMap({ state, color }: { state: string; color: string }) {
  return (
    <div
      style={{
        padding: 'var(--space-3)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {state}
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color, marginTop: 8 }}>
        BUSY light pattern
      </div>
    </div>
  )
}
