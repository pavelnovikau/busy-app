import { motion } from 'motion/react'

type SimpleBusyBarMotifProps = {
  status: string
  color: string
  index: number
  total: number
}

export default function SimpleBusyBarMotif({ status, color, index, total }: SimpleBusyBarMotifProps) {
  const colorVar = `var(${color})`
  const segmentCount = 24
  const filledSegments = Math.ceil((index / total) * segmentCount)
  const displayFontSize = status.length > 16 ? 16 : status.length > 12 ? 19 : 22

  return (
    <motion.div
      whileHover={{ y: -2, rotate: -0.4 }}
      transition={{ duration: 0.2 }}
      style={{
        width: 210,
        marginLeft: 'auto',
        marginBottom: 'var(--space-7)',
        position: 'relative',
        filter: 'drop-shadow(0 14px 22px color-mix(in srgb, black 18%, transparent))',
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: 16,
          padding: '11px 14px 10px',
          background: `
            radial-gradient(circle at 78% 8%, color-mix(in srgb, white 18%, transparent), transparent 24%),
            radial-gradient(circle at 50% 36%, color-mix(in srgb, ${colorVar} 8%, transparent), transparent 54%),
            linear-gradient(180deg, #30302f 0%, #151515 48%, #0b0b0b 100%)
          `,
          border: '1px solid color-mix(in srgb, white 13%, transparent)',
          boxShadow: `
            inset 0 1px 0 color-mix(in srgb, white 18%, transparent),
            inset 0 -16px 26px color-mix(in srgb, black 48%, transparent)
          `,
        }}
      >
        <div
          style={{
            padding: '1px 2px 5px',
            background: 'transparent',
            border: 0,
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 48,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-pixel-grid)',
              fontSize: displayFontSize,
              letterSpacing: '0.045em',
              color: '#ffffff',
              fontWeight: 700,
              textTransform: 'uppercase',
              lineHeight: 1.05,
              textAlign: 'center',
              textShadow: `
                0 0 2px color-mix(in srgb, white 90%, transparent),
                0 0 10px color-mix(in srgb, white 38%, transparent),
                0 0 22px color-mix(in srgb, ${colorVar} 55%, transparent)
              `,
            }}
          >
            {status}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${segmentCount}, 1fr)`,
            gap: 2,
            marginTop: 6,
            padding: '0 2px',
          }}
        >
          {Array.from({ length: segmentCount }).map((_, pixelIndex) => {
            const active = pixelIndex < filledSegments
            return (
              <span
                key={pixelIndex}
                style={{
                  height: 3,
                  borderRadius: 1,
                  background: active ? colorVar : 'color-mix(in srgb, white 7%, transparent)',
                  opacity: active ? 1 : 0.22,
                  boxShadow: active ? `0 0 8px color-mix(in srgb, ${colorVar} 56%, transparent)` : 'none',
                }}
              />
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
