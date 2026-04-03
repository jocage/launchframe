"use client";

import Link from "next/link";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Error</p>
        <h1>Something went wrong</h1>
        <p className="lede">{error.message || "An unexpected error occurred."}</p>
        <div className="hero-actions">
          <button type="button" onClick={reset}>
            Try again
          </button>
          <Link href="/">Go home</Link>
        </div>
      </section>
    </main>
  );
}
