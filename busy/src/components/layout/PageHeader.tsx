type PageHeaderProps = {
  title: string
  meta?: string
  description?: string
  eyebrow?: string
  marginBottom?: string
  descriptionMaxWidth?: number
}

export default function PageHeader({
  title,
  meta,
  description,
  eyebrow,
  marginBottom = 'var(--space-6)',
  descriptionMaxWidth = 620,
}: PageHeaderProps) {
  return (
    <div style={{ marginBottom }}>
      {eyebrow ? (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--tx-3)',
            marginBottom: 'var(--space-2)',
          }}
        >
          {eyebrow}
        </div>
      ) : null}

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          marginBottom: description ? 'var(--space-2)' : 0,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--tx)',
            margin: 0,
          }}
        >
          {title}
        </h1>

        {meta ? (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              color: 'var(--tx-3)',
            }}
          >
            {meta}
          </span>
        ) : null}
      </div>

      {description ? (
        <p
          style={{
            margin: 0,
            maxWidth: descriptionMaxWidth,
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            lineHeight: 1.6,
            color: 'var(--tx-3)',
          }}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
