import React, { useMemo } from 'react';

export const AtmosphereEffects: React.FC = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 12 + 12, // 12px to 24px
      duration: Math.random() * 14 + 18, // 18s to 32s (slow, tranquil drift)
      delay: Math.random() * 15,
      swayDuration: Math.random() * 5 + 4,
      opacity: Math.random() * 0.3 + 0.25,
    }));
  }, []);

  return (
    <div className="atmosphere-overlay" aria-hidden="true">
      {/* Floating Delicate Sakura Silk Petals */}
      {petals.map(p => (
        <div
          key={p.id}
          className="sakura-container"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          <div
            className="sakura-sway"
            style={{ animationDuration: `${p.swayDuration}s` }}
          >
            <svg viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id={`sakuraGrad-${p.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f7e6d4" />
                  <stop offset="50%" stopColor="#e8b4b8" />
                  <stop offset="100%" stopColor="#bfa15f" />
                </linearGradient>
              </defs>
              <path
                d="M20,2 C28,10 38,18 36,32 C34,44 24,48 20,48 C16,48 6,44 4,32 C2,18 12,10 20,2 Z"
                fill={`url(#sakuraGrad-${p.id})`}
              />
              <path
                d="M20,6 C22,14 28,20 26,30 C25,36 21,40 20,42"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      ))}

      {/* Subtle Warm Candlelight & Gold Mist Layer */}
      <div className="ambient-mist-layer" />

      <style>{`
        .atmosphere-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          overflow: hidden;
        }

        .sakura-container {
          position: absolute;
          top: -40px;
          animation: floatSakura linear infinite;
        }

        .sakura-sway {
          width: 100%;
          height: 100%;
          animation: swaySakura ease-in-out infinite alternate;
          transform-origin: center center;
        }

        @keyframes floatSakura {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(108vh);
          }
        }

        @keyframes swaySakura {
          0% {
            transform: rotate(-20deg) translateX(-10px) rotateY(0deg);
          }
          50% {
            transform: rotate(10deg) translateX(15px) rotateY(90deg);
          }
          100% {
            transform: rotate(25deg) translateX(-8px) rotateY(180deg);
          }
        }

        .ambient-mist-layer {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 15% 15%, rgba(212, 175, 55, 0.03) 0%, transparent 60%),
            radial-gradient(circle at 85% 85%, rgba(138, 37, 37, 0.02) 0%, transparent 60%);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
