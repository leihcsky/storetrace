import Link from "next/link";

interface LogoProps {
  /** Logo height in pixels — matches navbar (~28px at text-xl scale) */
  height?: number;
  className?: string;
  href?: string;
  showIcon?: boolean;
}

/**
 * StoreTrace wordmark — BuiltWith-inspired two-tone sans wordmark.
 * "Store" in slate, "Trace" in brand purple.
 */
export function Logo({
  height = 28,
  className = "",
  href = "/",
  showIcon = true,
}: LogoProps) {
  const width = showIcon ? 168 : 148;
  const scale = height / 28;

  const svg = (
    <svg
      width={width * scale}
      height={height}
      viewBox={`0 0 ${width} 28`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      {showIcon && (
        <g transform="translate(0, 2)">
          <rect x="0" y="0" width="24" height="24" rx="5" fill="#4608AD" />
          <path
            d="M6 8h12v1.5H6V8zm0 4h9v1.5H6v-1.5zm0 4h12v1.5H6V16z"
            fill="white"
            opacity="0.95"
          />
          <circle cx="18" cy="18" r="3" fill="#9B6FD4" />
        </g>
      )}
      <text
        x={showIcon ? 30 : 0}
        y="21"
        fontFamily="var(--font-logo), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.6"
      >
        <tspan fill="#0F172A">Store</tspan>
        <tspan fill="#4608AD">Trace</tspan>
      </text>
    </svg>
  );

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ring focus-visible:ring-offset-2"
      aria-label="StoreTrace home"
    >
      {svg}
    </Link>
  );
}

/** Compact mark for favicon / small spaces */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="32" height="32" rx="7" fill="#4608AD" />
      <path
        d="M7 10h18v2H7v-2zm0 5h14v2H7v-2zm0 5h18v2H7v-2z"
        fill="white"
      />
      <circle cx="24" cy="24" r="4" fill="#9B6FD4" />
    </svg>
  );
}
