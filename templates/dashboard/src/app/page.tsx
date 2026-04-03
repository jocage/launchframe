import Link from "next/link";

export default function HomePage() {
  return (
    <main className="landing">
      <nav className="landing-nav">
        <div className="logo">
          launch<span>frame</span>
        </div>
        <div className="landing-nav-links">
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up" className="nav-cta">Get started</Link>
        </div>
      </nav>

      <section className="landing-hero">
        <p className="eyebrow">Ship faster in 2026</p>
        <h1>
          Build your SaaS <em>without the boilerplate.</em>
        </h1>
        <p className="lede">
          Auth, billing, email, database — all wired up and ready.
          Stop rebuilding infrastructure and start shipping your product.
        </p>
        <div className="hero-actions">
          <Link href="/sign-up" className="btn-primary">Start building free</Link>
          <Link href="/dashboard" className="btn-secondary">Open dashboard</Link>
        </div>
      </section>

      <section className="social-proof">
        <p>Trusted by teams at</p>
        <div className="social-proof-logos">
          <span>Vercel</span>
          <span>Supabase</span>
          <span>Linear</span>
          <span>Resend</span>
        </div>
      </section>

      <section className="bento-section">
        <p className="eyebrow">Everything included</p>
        <h2>Production-ready from day one</h2>

        <div className="bento-grid">
          <div className="bento-card span-2">
            <div className="bento-card-icon">🔐</div>
            <h3>Authentication</h3>
            <p>
              Email and password auth with Better Auth. Session management, protected routes,
              and middleware — all pre-configured and type-safe.
            </p>
            <div className="tag-row">
              <span className="bento-tag">Better Auth</span>
              <span className="bento-tag">Server sessions</span>
              <span className="bento-tag">Edge middleware</span>
            </div>
          </div>

          <div className="bento-card">
            <div className="bento-card-icon">💳</div>
            <h3>Billing</h3>
            <p>
              Stripe and Polar checkout flows with a provider abstraction you can extend.
            </p>
            <div className="tag-row">
              <span className="bento-tag">Stripe</span>
              <span className="bento-tag">Polar</span>
            </div>
          </div>

          <div className="bento-card">
            <div className="bento-card-icon">🗄️</div>
            <h3>Database</h3>
            <p>
              Drizzle ORM with migrations, seeds, and a typed schema ready for your models.
            </p>
            <div className="tag-row">
              <span className="bento-tag">Drizzle</span>
              <span className="bento-tag">PostgreSQL</span>
            </div>
          </div>

          <div className="bento-card span-2">
            <div className="bento-card-icon">📧</div>
            <h3>Transactional email</h3>
            <p>
              Resend integration with HTML templates for welcome emails, password resets,
              and billing notifications. Test from the dashboard to verify wiring.
            </p>
            <div className="tag-row">
              <span className="bento-tag">Resend</span>
              <span className="bento-tag">HTML templates</span>
              <span className="bento-tag">Test harness</span>
            </div>
          </div>

          <div className="bento-card">
            <div className="bento-card-icon">🧪</div>
            <h3>Testing</h3>
            <p>
              Vitest for unit tests, Playwright for E2E. Pre-commit hooks enforce quality.
            </p>
            <div className="tag-row">
              <span className="bento-tag">Vitest</span>
              <span className="bento-tag">Playwright</span>
              <span className="bento-tag">Husky</span>
            </div>
          </div>

          <div className="bento-card">
            <div className="bento-card-icon">⚡</div>
            <h3>Next.js 16</h3>
            <p>
              App Router, React 19, server components, and the latest compiler out of the box.
            </p>
            <div className="tag-row">
              <span className="bento-tag">App Router</span>
              <span className="bento-tag">React 19</span>
            </div>
          </div>

          <div className="bento-card">
            <div className="bento-card-icon">🤖</div>
            <h3>Agent-friendly</h3>
            <p>
              AGENTS.md, explicit placeholders, and a flat file tree that AI coding assistants love.
            </p>
            <div className="tag-row">
              <span className="bento-tag">Cursor</span>
              <span className="bento-tag">Copilot</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to ship?</h2>
        <p>
          Generate your project in seconds. Everything is yours to customize —
          no vendor lock-in, no hidden abstractions.
        </p>
        <div className="hero-actions">
          <Link href="/sign-up" className="btn-primary">Create your account</Link>
          <Link href="/sign-in" className="btn-secondary">Sign in</Link>
        </div>
      </section>

      <footer className="landing-footer">
        <p>Built with Launchframe — open source SaaS starter for Next.js</p>
      </footer>
    </main>
  );
}
