import React, { useMemo } from 'react';

export const AtmosphereEffects: React.FC = () => {
  // Generate random floating cherry blossom petals & embers
  const petals = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.4 + 0.3,
    }));
  }, []);

  return (
    <div className="atmosphere-overlay" aria-hidden="true">
      {/* Floating Sakura Petals */}
      {petals.map(p => (
        <div
          key={p.id}
          className="sakura-petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15,2 C18,8 26,10 24,18 C22,26 14,28 10,22 C6,16 12,10 15,2 Z"
              fill="rgba(255, 183, 197, 0.65)"
            />
          </svg>
        </div>
      ))}

      {/* Ambient Fog / Mist Layer */}
      <div className="ambient-mist-layer" />

      <style>{`
        .atmosphere-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          overflow: hidden;
        }

        .sakura-petal {
          position: absolute;
          top: -30px;
          animation: floatSakura linear infinite;
        }

        @keyframes floatSakura {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(25px);
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(-20px);
          }
        }

        .ambient-mist-layer {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 30%, rgba(192, 57, 43, 0.03) 0%, transparent 60%),
                      radial-gradient(circle at 80% 80%, rgba(85, 111, 68, 0.03) 0%, transparent 50%);
          animation: mistPulse 8s infinite alternate ease-in-out;
        }

        @keyframes mistPulse {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};
