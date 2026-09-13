import React from 'react';

export const ViewportCarpet: React.FC = () => {
  return (
    <div className="viewport-carpet-system" aria-hidden="true">
      {/* LEFT VIEWPORT CARPET RUNNER */}
      <aside className="viewport-carpet carpet-left">
        {/* Top Ornate Yin-Yang Crest */}
        <div className="carpet-crest-wrapper">
          <div className="yingyang-disc left-yingyang">
            <svg viewBox="0 0 100 100" className="yingyang-svg">
              <defs>
                <linearGradient id="yyGoldGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5e1b5" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#9c7a23" />
                </linearGradient>
              </defs>

              {/* Outer Golden Aura Ring */}
              <circle cx="50" cy="50" r="47" fill="none" stroke="url(#yyGoldGradLeft)" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
              <circle cx="50" cy="50" r="43" fill="rgba(10, 12, 16, 0.7)" stroke="url(#yyGoldGradLeft)" strokeWidth="1.2" />

              {/* Yin Half (Dark with gold rim) */}
              <path
                d="M 50,7 A 43,43 0 0,1 50,93 A 21.5,21.5 0 0,1 50,50 A 21.5,21.5 0 0,0 50,7"
                fill="url(#yyGoldGradLeft)"
                opacity="0.85"
              />
              
              {/* Yang Half (Deep Kuro) */}
              <path
                d="M 50,93 A 43,43 0 0,1 50,7 A 21.5,21.5 0 0,1 50,50 A 21.5,21.5 0 0,0 50,93"
                fill="#0a0d12"
                stroke="url(#yyGoldGradLeft)"
                strokeWidth="0.8"
              />

              {/* Complementary Dot (Top dot in Gold field) */}
              <circle cx="50" cy="28.5" r="5" fill="#0a0d12" stroke="url(#yyGoldGradLeft)" strokeWidth="0.8" />

              {/* Complementary Dot (Bottom dot in Dark field) */}
              <circle cx="50" cy="71.5" r="5" fill="url(#yyGoldGradLeft)" />
            </svg>
          </div>
          <span className="carpet-kanji-label">陰</span>
        </div>

        {/* Vertical Woven Carpet Runner Line */}
        <div className="carpet-vertical-track">
          <div className="carpet-hairline" />
          <div className="carpet-knot knot-top" />
          <div className="carpet-pattern-segment" />
          <div className="carpet-knot knot-mid" />
          <div className="carpet-pattern-segment" />
          <div className="carpet-knot knot-bot" />
          <div className="carpet-hairline" />
        </div>

        {/* Mid-screen floating Yin-Yang watermark */}
        <div className="carpet-mid-yingyang">
          <svg viewBox="0 0 100 100" className="yingyang-watermark-svg">
            <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-gold)" strokeWidth="0.75" opacity="0.2" strokeDasharray="2 3" />
            <path
              d="M 50,4 A 46,46 0 0,1 50,96 A 23,23 0 0,1 50,50 A 23,23 0 0,0 50,4"
              fill="var(--color-gold)"
              opacity="0.08"
            />
            <circle cx="50" cy="27" r="4" fill="#080a0d" />
            <circle cx="50" cy="73" r="4" fill="var(--color-gold)" opacity="0.3" />
          </svg>
        </div>

        <div className="carpet-bottom-marker">
          <span className="carpet-marker-text">KAIDO • 陰</span>
        </div>
      </aside>

      {/* RIGHT VIEWPORT CARPET RUNNER */}
      <aside className="viewport-carpet carpet-right">
        {/* Top Ornate Yin-Yang Crest */}
        <div className="carpet-crest-wrapper">
          <div className="yingyang-disc right-yingyang">
            <svg viewBox="0 0 100 100" className="yingyang-svg">
              <defs>
                <linearGradient id="yyGoldGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5e1b5" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#9c7a23" />
                </linearGradient>
              </defs>

              {/* Outer Golden Aura Ring */}
              <circle cx="50" cy="50" r="47" fill="none" stroke="url(#yyGoldGradRight)" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
              <circle cx="50" cy="50" r="43" fill="rgba(10, 12, 16, 0.7)" stroke="url(#yyGoldGradRight)" strokeWidth="1.2" />

              {/* Inverted flow for cosmic Yang harmony */}
              <path
                d="M 50,93 A 43,43 0 0,1 50,7 A 21.5,21.5 0 0,1 50,50 A 21.5,21.5 0 0,0 50,93"
                fill="url(#yyGoldGradRight)"
                opacity="0.85"
              />
              
              <path
                d="M 50,7 A 43,43 0 0,1 50,93 A 21.5,21.5 0 0,1 50,50 A 21.5,21.5 0 0,0 50,7"
                fill="#0a0d12"
                stroke="url(#yyGoldGradRight)"
                strokeWidth="0.8"
              />

              <circle cx="50" cy="71.5" r="5" fill="#0a0d12" stroke="url(#yyGoldGradRight)" strokeWidth="0.8" />
              <circle cx="50" cy="28.5" r="5" fill="url(#yyGoldGradRight)" />
            </svg>
          </div>
          <span className="carpet-kanji-label">陽</span>
        </div>

        {/* Vertical Woven Carpet Runner Line */}
        <div className="carpet-vertical-track">
          <div className="carpet-hairline" />
          <div className="carpet-knot knot-top" />
          <div className="carpet-pattern-segment" />
          <div className="carpet-knot knot-mid" />
          <div className="carpet-pattern-segment" />
          <div className="carpet-knot knot-bot" />
          <div className="carpet-hairline" />
        </div>

        {/* Mid-screen floating Yin-Yang watermark */}
        <div className="carpet-mid-yingyang">
          <svg viewBox="0 0 100 100" className="yingyang-watermark-svg">
            <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-gold)" strokeWidth="0.75" opacity="0.2" strokeDasharray="2 3" />
            <path
              d="M 50,96 A 46,46 0 0,1 50,4 A 23,23 0 0,1 50,50 A 23,23 0 0,0 50,96"
              fill="var(--color-gold)"
              opacity="0.08"
            />
            <circle cx="50" cy="73" r="4" fill="#080a0d" />
            <circle cx="50" cy="27" r="4" fill="var(--color-gold)" opacity="0.3" />
          </svg>
        </div>

        <div className="carpet-bottom-marker">
          <span className="carpet-marker-text">陽 • KAIDO</span>
        </div>
      </aside>

      <style>{`
        .viewport-carpet-system {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 40;
          overflow: hidden;
        }

        .viewport-carpet {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 70px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 100px 0 30px;
          opacity: 0.85;
          transition: opacity 0.4s ease;
        }

        .carpet-left {
          left: 14px;
        }

        .carpet-right {
          right: 14px;
        }

        /* Top Crest & Kanji */
        .carpet-crest-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .yingyang-disc {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: gentleBreathe 8s ease-in-out infinite alternate;
        }

        .left-yingyang {
          animation: gentleRotateLeft 60s linear infinite;
        }

        .right-yingyang {
          animation: gentleRotateRight 60s linear infinite;
        }

        @keyframes gentleRotateLeft {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes gentleRotateRight {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        @keyframes gentleBreathe {
          0% { filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.2)); }
          100% { filter: drop-shadow(0 0 16px rgba(212, 175, 55, 0.45)); }
        }

        .yingyang-svg {
          width: 100%;
          height: 100%;
        }

        .carpet-kanji-label {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--color-gold);
          opacity: 0.85;
          letter-spacing: 0.05em;
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }

        /* Vertical Carpet Track */
        .carpet-vertical-track {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-grow: 1;
          margin: 16px 0;
          position: relative;
        }

        .carpet-hairline {
          width: 1px;
          flex-grow: 1;
          background: linear-gradient(
            to bottom,
            rgba(212, 175, 55, 0.35) 0%,
            rgba(212, 175, 55, 0.15) 50%,
            rgba(212, 175, 55, 0.35) 100%
          );
        }

        .carpet-knot {
          width: 7px;
          height: 7px;
          border: 1px solid var(--color-gold);
          transform: rotate(45deg);
          background: #0e1115;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
          margin: 12px 0;
        }

        .carpet-pattern-segment {
          width: 12px;
          height: 90px;
          opacity: 0.18;
          background-image: repeating-linear-gradient(
            0deg,
            var(--color-gold),
            var(--color-gold) 1px,
            transparent 1px,
            transparent 6px
          );
        }

        /* Mid Ying-Yang watermark */
        .carpet-mid-yingyang {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 64px;
          height: 64px;
          pointer-events: none;
          animation: floatYyWatermark 12s ease-in-out infinite alternate;
        }

        @keyframes floatYyWatermark {
          0% { transform: translateY(-50%) scale(0.96); opacity: 0.7; }
          100% { transform: translateY(-55%) scale(1.04); opacity: 1; }
        }

        .yingyang-watermark-svg {
          width: 100%;
          height: 100%;
        }

        /* Bottom marker */
        .carpet-bottom-marker {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }

        .carpet-marker-text {
          font-family: var(--font-eyebrow);
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          color: var(--color-gold-muted);
          opacity: 0.6;
          text-transform: uppercase;
        }

        /* Responsive scaling for tablets and mobile viewports */
        @media (max-width: 1380px) {
          .viewport-carpet {
            width: 44px;
            padding: 85px 0 20px;
          }
          .carpet-left {
            left: 8px;
          }
          .carpet-right {
            right: 8px;
          }
          .yingyang-disc {
            width: 38px;
            height: 38px;
          }
          .carpet-kanji-label {
            font-size: 0.9rem;
          }
          .carpet-pattern-segment {
            width: 8px;
            height: 60px;
          }
          .carpet-mid-yingyang {
            width: 44px;
            height: 44px;
          }
          .carpet-marker-text {
            font-size: 0.52rem;
          }
        }

        @media (max-width: 768px) {
          .viewport-carpet {
            width: 28px;
            padding: 82px 0 16px;
            opacity: 0.9;
          }
          .carpet-left {
            left: 6px;
          }
          .carpet-right {
            right: 6px;
          }
          .yingyang-disc {
            width: 26px;
            height: 26px;
            box-shadow: 0 0 14px rgba(212, 175, 55, 0.45);
          }
          .carpet-kanji-label {
            font-size: 0.72rem;
            margin-top: 1px;
          }
          .carpet-vertical-track {
            margin: 10px 0;
          }
          .carpet-knot {
            width: 4px;
            height: 4px;
            margin: 8px 0;
          }
          .carpet-pattern-segment {
            width: 5px;
            height: 34px;
          }
          .carpet-mid-yingyang {
            width: 26px;
            height: 26px;
          }
          .carpet-bottom-marker {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
