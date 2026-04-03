import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="lede">The page you are looking for does not exist or has been moved.</p>
        <div className="hero-actions">
          <Link href="/">Go home</Link>
        </div>
      </section>
    </main>
  );
}
