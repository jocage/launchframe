import Link from 'next/link';
import { AnimatedTerminal } from '@/components/terminal';

const FEATURES = [
  {
    icon: '🔐',
    title: 'Authentication',
    description: 'Better Auth with email/password, GitHub OAuth, session management, and middleware protection.',
  },
  {
    icon: '💳',
    title: 'Billing',
    description: 'Stripe or Polar checkout, portal sessions, and subscription management out of the box.',
  },
  {
    icon: '✉️',
    title: 'Email',
    description: 'Resend integration with transactional templates and delivery tracking.',
  },
  {
    icon: '🗄️',
    title: 'Database',
    description: 'Drizzle ORM with PostgreSQL. Type-safe schemas, migrations, and seeding included.',
  },
  {
    icon: '🧪',
    title: 'Testing',
    description: 'Vitest for unit tests, Playwright for E2E. Pre-configured and ready to run.',
  },
  {
    icon: '🤖',
    title: 'AI-First DX',
    description: 'Agent rules for Cursor, Claude Code, Copilot, Gemini. AGENTS.md, ARCHITECTURE.md, and llms.txt.',
  },
  {
    icon: '🚀',
    title: 'Deploy',
    description: 'Docker multi-stage builds, GitHub Actions CI/CD, Vercel-ready configuration.',
  },
  {
    icon: '🧩',
    title: 'Modular',
    description: 'Pick what you need. Every capability is an independent module you can enable or skip.',
  },
];

const STACK = [
  'Next.js 16',
  'React 19',
  'TypeScript 5.9',
  'Tailwind CSS 4',
  'Drizzle ORM',
  'Better Auth',
  'Stripe',
  'Resend',
  'Vitest',
  'Playwright',
];

const STEPS = [
  {
    step: '01',
    title: 'Generate',
    description: 'One command. Pick your template, database, auth, billing, and deploy target.',
    code: 'npx create-launchframe my-saas',
  },
  {
    step: '02',
    title: 'Configure',
    description: 'Add your env vars, customize the UI, and adjust settings to your needs.',
    code: 'cp .env.example .env.local',
  },
  {
    step: '03',
    title: 'Ship',
    description: 'Deploy to Vercel, Docker, or any platform. Auth, billing, and email just work.',
    code: 'pnpm build && pnpm start',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Launchframe
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/docs" className="text-zinc-400 transition-colors hover:text-white">
            Docs
          </Link>
          <a
            href="https://github.com/jocage/launchframe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-32">
        <div>
          <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
            v0.1.0 — Next.js 16 + React 19
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Ship your SaaS
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              in minutes
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
            Opinionated Next.js 16 starter with auth, billing, email, database, and AI-first DX.
            One command to scaffold. Zero config to start building.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started →
            </Link>
            <a
              href="https://github.com/jocage/launchframe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10"
            >
              View on GitHub
            </a>
          </div>
        </div>
        <div>
          <AnimatedTerminal />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight">Everything you need</h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-zinc-400">
          Production-grade modules that work together. Pick the ones you need, skip the rest.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
            >
              <div className="mb-3 text-2xl">{f.icon}</div>
              <h3 className="mb-2 font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight">Built with</h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {STACK.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm text-zinc-300"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-16 text-center text-3xl font-bold tracking-tight">How it works</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
              <div className="mb-4 text-sm font-bold text-emerald-400">{s.step}</div>
              <h3 className="mb-3 text-xl font-semibold">{s.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">{s.description}</p>
              <div className="rounded-lg bg-black/50 px-4 py-3 font-mono text-xs text-zinc-400">
                <span className="text-emerald-400">$ </span>{s.code}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
          <div className="text-sm text-zinc-500">
            MIT License · Launchframe
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/docs" className="transition-colors hover:text-white">
              Docs
            </Link>
            <a
              href="https://github.com/jocage/launchframe"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              GitHub
            </a>
            <Link href="/llms.txt" className="transition-colors hover:text-white">
              llms.txt
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl px-6 text-center text-xs text-zinc-600">
          Are you an LLM? View{' '}
          <Link href="/llms.txt" className="underline hover:text-zinc-400">
            /llms.txt
          </Link>{' '}
          for optimized Markdown documentation, or{' '}
          <Link href="/llms-full.txt" className="underline hover:text-zinc-400">
            /llms-full.txt
          </Link>{' '}
          for the full documentation bundle.
        </div>
      </footer>
    </main>
  );
}
