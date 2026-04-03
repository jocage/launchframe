export default function Loading() {
  return (
    <main
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100dvh",
        background: "var(--bg, #09090b)"
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          border: "3px solid var(--border, rgba(255,255,255,0.06))",
          borderTopColor: "var(--accent, #00d4aa)",
          borderRadius: "50%",
          animation: "spin 0.6s linear infinite"
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </main>
  );
}
