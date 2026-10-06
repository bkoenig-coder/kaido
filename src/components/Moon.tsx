interface MoonProps { size?: number; className?: string }

/**
 * A limestone moon. Its shadow slides with the page's scroll position
 * (CSS var --scroll, set in App), so the moon moves through its phases.
 */
export function Moon({ size = 460, className = '' }: MoonProps) {
  return (
    <div className={`moon ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <div className="moon__disc">
        <span className="moon__shadow" />
      </div>
    </div>
  );
}
