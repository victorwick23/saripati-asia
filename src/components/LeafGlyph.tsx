type LeafGlyphProps = {
  className?: string;
};

/** Decorative mark echoing the almond segments in /logo/logo.png */
export function LeafGlyph({ className }: LeafGlyphProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="12" rx="6" ry="11" fill="currentColor" transform="rotate(-18 12 12)" />
      <ellipse cx="12" cy="12" rx="6" ry="11" fill="currentColor" opacity="0.55" transform="rotate(32 12 12)" />
    </svg>
  );
}
