const devices = [
  { name: 'MacBook Pro', state: 'Calendar block · active', detail: 'Design review in 4 min', accent: true },
  { name: 'iPhone', state: 'Focus mode · on', detail: 'Notifications silenced' },
  { name: 'iPad', state: 'Slack idle · ignored', detail: 'Second-screen noise filtered' },
]

export function MultiDevicePresence() {
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
            Multi-Device Presence
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--tx-3)',
              marginTop: 4,
            }}
          >
            one physical source of truth
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
          }}
        >
          3 devices
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
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid color-mix(in srgb, var(--ring-1) 24%, var(--border))',
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--ring-1-dim) 76%, var(--surface)), var(--surface))',
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
            BUSY decision engine
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 'var(--space-4)',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 24,
                  fontWeight: 700,
                  color: 'var(--tx)',
                }}
              >
                One light, three devices.
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
                BUSY merges laptop context, mobile focus state, and secondary device noise into one room-level signal.
              </div>
            </div>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--ring-1)',
                boxShadow: '0 0 28px color-mix(in srgb, var(--ring-1) 34%, transparent)',
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          {devices.map((device) => (
            <div
              key={device.name}
              style={{
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                border: `1px solid ${device.accent ? 'color-mix(in srgb, var(--ring-1) 26%, var(--border))' : 'var(--border)'}`,
                background: device.accent
                  ? 'color-mix(in srgb, var(--ring-1-dim) 72%, var(--surface))'
                  : 'var(--surface)',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 'var(--space-3)',
                alignItems: 'center',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--tx)',
                  }}
                >
                  {device.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--tx-2)',
                    marginTop: 4,
                  }}
                >
                  {device.state}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: 'var(--tx-3)',
                    marginTop: 6,
                  }}
                >
                  {device.detail}
                </div>
              </div>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: device.accent ? 'var(--ring-1)' : 'var(--tx-3)',
                  boxShadow: device.accent
                    ? '0 0 12px color-mix(in srgb, var(--ring-1) 34%, transparent)'
                    : 'none',
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border)',
            background: 'color-mix(in srgb, var(--surface-2) 78%, var(--bg))',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--tx-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Why it matters
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--tx)',
              lineHeight: 1.6,
              marginTop: 8,
            }}
          >
            Most people do not work on a single screen anymore. BUSY becomes the
            only ambient surface that sees the whole setup and converts it into one
            unambiguous physical status.
          </div>
        </div>
      </div>
    </div>
  )
}
