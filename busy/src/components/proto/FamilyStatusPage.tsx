export function FamilyStatusPage() {
  return (
    <div
      style={{
        width: 340,
        height: 600,
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            busy.app/status/pavel
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx)', fontWeight: 600, marginTop: 4 }}>
            Family Status Page
          </div>
        </div>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--ring-1)',
            boxShadow: '0 0 18px color-mix(in srgb, var(--ring-1) 42%, transparent)',
          }}
        />
      </div>

      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div
          style={{
            padding: 'var(--space-5)',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(180deg, color-mix(in srgb, var(--ring-1-dim) 82%, var(--surface)), var(--surface))',
            border: '1px solid color-mix(in srgb, var(--ring-1) 28%, var(--border))',
            textAlign: 'center',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ring-1)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Сейчас
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 700, color: 'var(--tx)', marginTop: 10 }}>
            В фокусе
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-2)', marginTop: 8, lineHeight: 1.5 }}>
            До 16:25 лучше не отвлекать.
            <br />
            Потом будет 10 минут окна.
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-3)',
          }}
        >
          <MiniInfo title="Следующее окно" value="16:25" />
          <MiniInfo title="Сегодня" value="3 блока" accent />
        </div>

        <div
          style={{
            padding: 'var(--space-4)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--surface)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Можно зайти?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <ActionRow label="Срочно, на 30 секунд" accent />
            <ActionRow label="Подожду до следующего окна" />
            <ActionRow label="Оставить сообщение" />
          </div>
        </div>

        <div
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            background: 'color-mix(in srgb, var(--surface-2) 86%, var(--bg))',
            border: '1px dashed var(--border)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx)', fontWeight: 600 }}>
            Последний статус для семьи
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-2)', lineHeight: 1.55, marginTop: 8 }}>
            «Пишу важный документ. Если что-то срочное, нажми первую кнопку и BUSY Bar мигнёт мягким оранжевым».
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniInfo({ title, value, accent = false }: { title: string; value: string; accent?: boolean }) {
  return (
    <div
      style={{
        padding: 'var(--space-3)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        background: accent ? 'color-mix(in srgb, var(--ring-1-dim) 72%, var(--surface))' : 'var(--surface)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {title}
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: accent ? 'var(--ring-1)' : 'var(--tx)', marginTop: 8 }}>
        {value}
      </div>
    </div>
  )
}

function ActionRow({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <button
      type="button"
      style={{
        textAlign: 'left',
        padding: '10px 12px',
        borderRadius: 'var(--radius-md)',
        border: `1px solid ${accent ? 'color-mix(in srgb, var(--ring-1) 45%, var(--border))' : 'var(--border)'}`,
        background: accent ? 'color-mix(in srgb, var(--ring-1-dim) 82%, var(--surface))' : 'var(--surface)',
        color: accent ? 'var(--ring-1)' : 'var(--tx)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}
