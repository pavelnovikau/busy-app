const breakdown = [
  { label: 'Slack / chat', count: 11, loss: '1h 18m' },
  { label: 'Коллеги в комнате', count: 7, loss: '56m' },
  { label: 'Phone checks', count: 5, loss: '48m' },
]

export function InterruptionCostReport() {
  return (
    <div
      style={{
        width: 380,
        height: 500,
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface) 90%, var(--bg)) 0%, var(--surface) 100%)',
        display: 'flex',
        flexDirection: 'column',
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
            Interruption Cost
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-3)', marginTop: 4 }}>
            weekly report
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)' }}>Week 15</div>
      </div>

      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 'var(--space-3)',
          }}
        >
          <HeroMetric title="23 прерывания" value="-3h 12m" subtitle="потеря deep work" accent />
          <HeroMetric title="Оценка потерь" value="$480" subtitle="по ставке $150/h" />
        </div>

        <div
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-xl)',
            background: 'color-mix(in srgb, var(--ring-1-dim) 76%, var(--surface))',
            border: '1px solid color-mix(in srgb, var(--ring-1) 24%, var(--border))',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ring-1)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
            Самый дорогой паттерн
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700, color: 'var(--tx)' }}>
            “Быстрый вопрос в середине блока”
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-2)', lineHeight: 1.55, marginTop: 8 }}>
            7 случаев дали 56 минут чистых потерь восстановления. BUSY считает не момент прерывания, а полное возвращение в рабочий ритм.
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
            Breakdown
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {breakdown.map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx)' }}>{item.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)' }}>{item.count}x · {item.loss}</span>
                </div>
                <div style={{ height: 8, borderRadius: 999, background: 'color-mix(in srgb, var(--surface-2) 80%, var(--bg))' }}>
                  <div
                    style={{
                      width: item.label === 'Slack / chat' ? '78%' : item.label === 'Коллеги в комнате' ? '56%' : '41%',
                      height: '100%',
                      borderRadius: 999,
                      background: 'linear-gradient(90deg, var(--ring-1), color-mix(in srgb, var(--ring-1) 62%, var(--sl)))',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border)',
            background: 'color-mix(in srgb, var(--surface-2) 75%, var(--bg))',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Recommendation
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx)', lineHeight: 1.6, marginTop: 8 }}>
            Ставить “quiet window” на 10:00–11:30 и синхронизировать его с Family URL + door sign. Это убирает самый дорогой тип прерываний сразу в трёх каналах.
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroMetric({ title, value, subtitle, accent = false }: { title: string; value: string; subtitle: string; accent?: boolean }) {
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
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 700, color: accent ? 'var(--ring-1)' : 'var(--tx)', marginTop: 10 }}>
        {value}
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-2)', marginTop: 6 }}>
        {subtitle}
      </div>
    </div>
  )
}
