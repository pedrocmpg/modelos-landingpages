import { business, nav } from "../content";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-dark)",
        color: "var(--color-cream)",
        padding: "40px 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
          {business.name}
        </span>
        <nav style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="link-underline" style={{ fontSize: 14 }}>
              {item.label}
            </a>
          ))}
        </nav>
        <span style={{ fontSize: 13, color: "rgba(255,246,229,0.6)" }}>
          © {new Date().getFullYear()} {business.name}. Site de demonstração.
        </span>
      </div>
    </footer>
  );
}
