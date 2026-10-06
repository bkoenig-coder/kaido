import { FISH_PATH } from './fishPath';

/**
 * The koi from the Kaido logo, as a vector. It swims with the page: position,
 * tilt and tail-wiggle are driven by the CSS var --scroll (set in App), the
 * glossy shine sweeps across as you scroll, and it drifts gently when idle.
 */
export function Fish({ className = '' }: { className?: string }) {
  return (
    <div className={`fish ${className}`} aria-hidden="true">
      <svg viewBox="0 0 554 765" xmlns="http://www.w3.org/2000/svg" focusable="false">
        <defs>
          <linearGradient id="fish-body" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor="#ff9a57" />
            <stop offset="0.38" stopColor="#f2601f" />
            <stop offset="0.72" stopColor="#e24a0e" />
            <stop offset="1" stopColor="#b8330a" />
          </linearGradient>
          <linearGradient id="fish-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="fish-light" cx="0.3" cy="0.22" r="0.55">
            <stop offset="0" stopColor="#ffd2a8" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffd2a8" stopOpacity="0" />
          </radialGradient>
          <clipPath id="fish-clip"><path d={FISH_PATH} fillRule="evenodd" /></clipPath>
          <filter id="fish-soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="7" /></filter>
        </defs>

        <path d={FISH_PATH} fill="url(#fish-body)" fillRule="evenodd" />

        <g clipPath="url(#fish-clip)">
          <rect width="554" height="765" fill="url(#fish-light)" />
          {/* soft inner edge shading gives the flat shape some depth */}
          <path d={FISH_PATH} fill="none" stroke="#7d1d00" strokeOpacity="0.38" strokeWidth="22" filter="url(#fish-soft)" />
          <g transform="rotate(24)">
            <g className="fish__shine-idle">
              <rect className="fish__shine" x="-260" y="-420" width="150" height="1400" fill="url(#fish-shine)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
