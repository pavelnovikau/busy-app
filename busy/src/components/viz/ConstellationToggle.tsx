import { motion } from "motion/react"

interface Props {
  active: boolean
  onToggle: () => void
}

function ConstellationToggle({ active, onToggle }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderRadius: "var(--radius-full)",
        border: `1px solid ${active ? "var(--focus-cta-hover)" : "color-mix(in srgb, var(--focus-cta) 60%, var(--border))"}`,
        background: active
          ? "linear-gradient(135deg, var(--focus-cta-hover), var(--focus-cta))"
          : "linear-gradient(135deg, var(--focus-cta-bg), color-mix(in srgb, var(--focus-cta-bg) 55%, var(--surface)))",
        color: active ? "white" : "var(--focus-cta-active)",
        cursor: "pointer",
        userSelect: "none",
        outline: "none",
        boxShadow: active
          ? "var(--focus-cta-shadow)"
          : "var(--focus-cta-shadow-sm)",
        backdropFilter: "blur(8px)",
        transition: "background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, transform 0.15s ease",
      }}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <span
        style={{
          fontSize: 10,
          lineHeight: 1,
          color: active ? "rgba(255,255,255,0.95)" : "var(--focus-cta)",
          textShadow: active ? "0 0 12px rgba(255,255,255,0.28)" : "none",
        }}
      >
        ◉
      </span>
      Фокус
    </motion.button>
  )
}

export { ConstellationToggle }
