import { motion } from "motion/react"

interface Props {
  active: boolean
  onToggle: () => void
}

function ConstellationToggle({ active, onToggle }: Props) {
  return (
    <motion.button
      onClick={onToggle}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 9999,
        border: active ? "1.5px solid transparent" : "1.5px solid var(--border-2)",
        background: active ? "var(--ring-1)" : "transparent",
        color: active ? "#fff" : "var(--tx-2)",
        cursor: "pointer",
        userSelect: "none",
        outline: "none",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <span style={{ fontSize: 10, lineHeight: 1 }}>◉</span>
      Focus Constellation
    </motion.button>
  )
}

export { ConstellationToggle }
