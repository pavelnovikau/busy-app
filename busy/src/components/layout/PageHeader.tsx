type PageHeaderProps = {
  title: string
  meta?: string
  description?: string
  subtitle?: React.ReactNode
  eyebrow?: string
  marginBottom?: string
  descriptionMaxWidth?: number
}

export default function PageHeader({
  title,
  meta,
  description,
  subtitle,
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
          marginBottom: subtitle || description ? 'var(--space-2)' : 0,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--tx)',
            margin: 0,
            lineHeight: 1.15,
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

      {subtitle ? (
        <div style={{ marginBottom: description ? 'var(--space-2)' : 0 }}>
          {subtitle}
        </div>
      ) : null}

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
