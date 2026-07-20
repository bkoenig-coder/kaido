import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';

export const JapaneseEntranceIntro: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Start door opening after 800ms welcome crest display
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 900);

    // Completely unmount/hide overlay after doors fully part (1.8s)
    const removeTimer = setTimeout(() => {
      setIsRemoved(true);
    }, 2200);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      className={`japanese-intro-overlay ${isOpen ? 'open' : ''}`}
      onClick={() => { setIsOpen(true); setTimeout(() => setIsRemoved(true), 800); }}
    >
      {/* Left Shoji Panel */}
      <div className="shoji-panel panel-left">
        <div className="shoji-lattice" />
      </div>

      {/* Right Shoji Panel */}
      <div className="shoji-panel panel-right">
        <div className="shoji-lattice" />
      </div>

      {/* Center Gold Japanese Crest Monogram */}
      <div className={`intro-crest ${isOpen ? 'fade-out' : ''}`}>
        <div className="crest-gold-ring">
          <img src={logoImg} alt="Kaido Monogram" className="crest-logo" />
        </div>
        <span className="crest-kanji">海道</span>
        <span className="crest-text">KAIDO SUSHI BAR</span>
        <span className="crest-sub">ようこそ • WELCOME</span>
      </div>

      <style>{`
        .japanese-intro-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
          cursor: pointer;
        }

        .japanese-intro-overlay.open {
          pointer-events: none;
        }

        /* Panels */
        .shoji-panel {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          background: #092226; /* Deep Japanese teal sumi tone */
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.8);
          transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 1;
        }

        .panel-left {
          left: 0;
          border-right: 2px solid var(--accent-gold);
        }

        .panel-right {
          right: 0;
          border-left: 2px solid var(--accent-gold);
        }

        /* Shoji Door Sliding Action */
        .japanese-intro-overlay.open .panel-left {
          transform: translateX(-102%);
        }

        .japanese-intro-overlay.open .panel-right {
          transform: translateX(102%);
        }

        /* Lattice Pattern */
        .shoji-lattice {
          position: absolute;
          inset: 0;
          opacity: 0.12;
          background-image: linear-gradient(var(--accent-gold) 1px, transparent 1px),
                            linear-gradient(90deg, var(--accent-gold) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* Center Crest */
        .intro-crest {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #ffffff;
          transition: opacity 0.6s ease, transform 0.6s ease;
          animation: pulseCrest 1.8s ease-in-out infinite alternate;
        }

        .intro-crest.fade-out {
          opacity: 0;
          transform: scale(1.15);
        }

        .crest-gold-ring {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 2px solid var(--accent-gold);
          box-shadow: 0 0 30px rgba(192, 57, 43, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(12, 45, 51, 0.85);
          margin-bottom: 14px;
        }

        .crest-logo {
          width: 54px;
          height: 54px;
          object-fit: cover;
          border-radius: 50%;
        }

        .crest-kanji {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--accent-gold);
          letter-spacing: 0.3em;
          margin-bottom: 4px;
        }

        .crest-text {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .crest-sub {
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
        }

        @keyframes pulseCrest {
          0% { transform: scale(0.98); }
          100% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
};
