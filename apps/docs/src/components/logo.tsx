export function Logo({ size = 'default' }: { size?: 'default' | 'sm' }) {
  const iconSize = size === 'sm' ? 20 : 24;
  const textClass =
    size === 'sm'
      ? 'text-base font-semibold tracking-tight'
      : 'text-xl font-semibold tracking-tight';

  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          stroke="url(#logo-grad)"
          strokeWidth="2"
        />
        <path
          d="M9 8l3 3-3 3"
          stroke="url(#logo-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="14"
          y1="16"
          x2="18"
          y2="16"
          stroke="url(#logo-grad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#34d399" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
      <span className={textClass}>
        Launch
        <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
          frame
        </span>
      </span>
    </span>
  );
}
