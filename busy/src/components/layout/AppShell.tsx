import { NavLink, Outlet } from "react-router";

const navItems = [
  { to: "/", label: "Strategy" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/prototypes", label: "Prototypes" },
  { to: "/system", label: "System" },
] as const;

function toggleTheme() {
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === "dark" ? "" : "dark";
}

export default function AppShell() {
  return (
    <div
      style={{
        minHeight: "100svh",
        background: "var(--bg)",
        color: "var(--tx)",
      }}
    >
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 var(--space-4)",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "var(--radius-full)",
              background: "var(--ring-1)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: "var(--text-sm)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--tx)",
            }}
          >
            BUSY
          </span>
        </div>

        {/* Nav tabs */}
        <div style={{ display: "flex", gap: "var(--space-1)" }}>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              style={({ isActive }) => ({
                padding: "var(--space-1) var(--space-3)",
                fontSize: "var(--text-sm)",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                color: isActive ? "var(--color-primary)" : "var(--tx-2)",
                textDecoration: "none",
                borderRadius: "var(--radius-md)",
                background: isActive ? "var(--ring-1-dim)" : "transparent",
                transition: "var(--transition-fast)",
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-1) var(--space-2)",
            cursor: "pointer",
            fontSize: "var(--text-base)",
            color: "var(--tx-2)",
            lineHeight: 1,
            transition: "var(--transition-fast)",
          }}
        >
          <span className="theme-icon-light">&#9788;</span>
          <span className="theme-icon-dark">&#9789;</span>
        </button>
      </nav>

      <main style={{ padding: "var(--space-6)" }}>
        <Outlet />
      </main>
    </div>
  );
}
