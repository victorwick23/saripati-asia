import type { ReactNode } from "react";
import type { CommodityCategoryId } from "@/data/commodities";

type CategoryArtProps = {
  categoryId: CommodityCategoryId;
  className?: string;
};

/** Lightweight SVG motifs inspired by the leaf geometry in /logo/logo.png */
export function CategoryArt({ categoryId, className }: CategoryArtProps) {
  const palette = {
    deep: "var(--color-brand-primary)",
    lime: "var(--color-brand-accent)",
    mist: "color-mix(in srgb, var(--color-brand-accent) 35%, white)",
  };

  const motifs: Record<CommodityCategoryId, ReactNode> = {
    "spices-roots-herbs": (
      <g>
        <circle cx="52" cy="48" r="26" fill="none" stroke={palette.deep} strokeWidth="3" opacity="0.35" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="52"
            cy="48"
            rx="10"
            ry="22"
            fill={deg % 120 === 0 ? palette.lime : palette.deep}
            opacity="0.85"
            transform={`rotate(${deg} 52 48)`}
          />
        ))}
      </g>
    ),
    "coconut-derivatives": (
      <g>
        <path
          d="M30 78c8-36 36-52 52-52s44 16 52 52c-18 10-36 14-52 14s-34-4-52-14z"
          fill={palette.mist}
          stroke={palette.deep}
          strokeWidth="2.5"
        />
        <circle cx="82" cy="38" r="8" fill={palette.lime} opacity="0.9" />
      </g>
    ),
    "charcoal-energy": (
      <g>
        <rect x="22" y="34" width="60" height="36" rx="6" fill="#1a1f1c" opacity="0.9" />
        <path d="M28 70h48" stroke={palette.lime} strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        <path d="M34 42h12M52 50h18" stroke={palette.mist} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      </g>
    ),
    "coffee-beans": (
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={i}
            cx={36 + i * 10}
            cy={48 + (i % 2) * 4}
            rx="7"
            ry="10"
            fill={i % 2 === 0 ? palette.deep : "#3b2f2f"}
            opacity="0.9"
            transform={`rotate(${-12 + i * 6} ${36 + i * 10} ${48 + (i % 2) * 4})`}
          />
        ))}
        <ellipse cx="78" cy="40" rx="9" ry="11" fill={palette.lime} opacity="0.55" transform="rotate(18 78 40)" />
      </g>
    ),
    "essential-oils-aromatic": (
      <g>
        <path d="M52 20v52" stroke={palette.deep} strokeWidth="4" strokeLinecap="round" />
        <path d="M52 72c-12 0-20 8-20 18h40c0-10-8-18-20-18z" fill={palette.mist} stroke={palette.deep} strokeWidth="2" />
        <circle cx="52" cy="32" r="14" fill="none" stroke={palette.lime} strokeWidth="3" opacity="0.9" />
      </g>
    ),
    "other-agricultural": (
      <g>
        <path
          d="M24 70c10-28 28-40 52-40s34 18 28 40c-10 4-20 6-28 6s-18-2-28-6z"
          fill={palette.lime}
          opacity="0.45"
        />
        <path d="M40 46c12-18 24-22 36-22s22 6 28 22" fill="none" stroke={palette.deep} strokeWidth="3" strokeLinecap="round" />
        <circle cx="64" cy="52" r="6" fill={palette.deep} />
      </g>
    ),
  };

  return (
    <svg
      viewBox="0 0 104 96"
      role="img"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="104" height="96" rx="18" fill="color-mix(in srgb, var(--color-brand-accent) 18%, white)" />
      {motifs[categoryId]}
    </svg>
  );
}
