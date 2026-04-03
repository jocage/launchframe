'use client';

import { useEffect, useState, useRef } from 'react';

const LINES = [
  { text: '$ npx create-launchframe my-saas', type: 'command' as const, delay: 40 },
  { text: '', type: 'blank' as const, delay: 400 },
  { text: '  Template      dashboard', type: 'output' as const, delay: 80 },
  { text: '  Auth          email-password + github', type: 'output' as const, delay: 80 },
  { text: '  Database      postgres (pg)', type: 'output' as const, delay: 80 },
  { text: '  Billing       stripe', type: 'output' as const, delay: 80 },
  { text: '  Email         resend', type: 'output' as const, delay: 80 },
  { text: '  Deploy        docker', type: 'output' as const, delay: 80 },
  { text: '', type: 'blank' as const, delay: 300 },
  { text: '  ✔ Scaffolding project from dashboard template...', type: 'success' as const, delay: 60 },
  { text: '  ✔ Applying modules: auth, billing, email, db-pg, deploy-docker, ai-dx', type: 'success' as const, delay: 40 },
  { text: '  ✔ Installing dependencies...', type: 'success' as const, delay: 30 },
  { text: '', type: 'blank' as const, delay: 200 },
  { text: '  Done in 4.2s', type: 'done' as const, delay: 0 },
  { text: '', type: 'blank' as const, delay: 600 },
  { text: '$ cd my-saas && pnpm dev', type: 'command' as const, delay: 40 },
  { text: '', type: 'blank' as const, delay: 500 },
  { text: '  ▲ Next.js 16.2.0', type: 'output' as const, delay: 0 },
  { text: '  - Local:    http://localhost:3000', type: 'url' as const, delay: 0 },
  { text: '  ✔ Ready in 1.8s', type: 'success' as const, delay: 0 },
];

export function AnimatedTerminal() {
  const [rendered, setRendered] = useState<{ text: string; type: string; charIndex: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let lineIndex = 0;
    let charIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      if (lineIndex >= LINES.length) return;

      const line = LINES[lineIndex];

      if (line.type === 'blank' || line.type === 'output' || line.type === 'success' || line.type === 'done' || line.type === 'url') {
        setRendered((prev) => {
          const next = [...prev];
          if (next.length <= lineIndex) {
            next.push({ text: line.text, type: line.type, charIndex: line.text.length });
          }
          return next;
        });
        lineIndex++;
        charIndex = 0;
        timeout = setTimeout(tick, line.delay);
        return;
      }

      // Typing effect for commands
      charIndex++;
      setRendered((prev) => {
        const next = [...prev];
        if (next.length <= lineIndex) {
          next.push({ text: line.text.slice(0, charIndex), type: line.type, charIndex });
        } else {
          next[lineIndex] = { text: line.text.slice(0, charIndex), type: line.type, charIndex };
        }
        return next;
      });

      if (charIndex < line.text.length) {
        timeout = setTimeout(tick, line.delay);
      } else {
        lineIndex++;
        charIndex = 0;
        timeout = setTimeout(tick, 200);
      }
    }

    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [rendered]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a] shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-white/30 font-mono">terminal</span>
      </div>
      <div ref={containerRef} className="h-[380px] overflow-y-auto p-5 font-mono text-[13px] leading-6">
        {rendered.map((line, i) => (
          <div key={i} className={lineClass(line.type)}>
            {line.text}
            {line.type === 'command' && i === rendered.length - 1 && line.charIndex < (LINES[i]?.text.length ?? 0) && (
              <span className="animate-pulse text-emerald-400">▌</span>
            )}
          </div>
        ))}
        {rendered.length > 0 && rendered.length >= LINES.length && (
          <div className="mt-1 text-emerald-400/70">
            $ <span className="animate-pulse">▌</span>
          </div>
        )}
      </div>
    </div>
  );
}

function lineClass(type: string): string {
  switch (type) {
    case 'command':
      return 'text-emerald-400';
    case 'success':
      return 'text-emerald-400/80';
    case 'done':
      return 'text-emerald-300 font-semibold';
    case 'url':
      return 'text-sky-400';
    case 'output':
      return 'text-zinc-400';
    case 'blank':
      return 'h-5';
    default:
      return 'text-zinc-400';
  }
}
