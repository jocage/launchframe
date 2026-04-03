import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Launchframe</p>
        <h1>
          Start with a <em>clean SaaS baseline.</em>
        </h1>
        <p className="lede">
          Auth, billing, email, and database scaffolding — all wired up.
          A minimal foundation ready for real product work.
        </p>
        <div className="hero-actions">
          <Link href="/sign-up" className="btn-primary">Create account</Link>
          <Link href="/sign-in" className="btn-secondary">Sign in</Link>
          <Link href="/dashboard" className="btn-ghost">Open dashboard</Link>
        </div>
      </section>
    </main>
  );
}
