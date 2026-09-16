import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';

export const JapaneseEntranceIntro: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Start sliding shoji panels after brief crest contemplation
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1100);

    // Unmount after smooth parting
    const removeTimer = setTimeout(() => {
      setIsRemoved(true);
    }, 2400);

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
      {/* Left Shoji Lacquer Panel */}
      <div className="shoji-panel panel-left">
        <div className="shoji-lattice" />
      </div>

      {/* Right Shoji Lacquer Panel */}
      <div className="shoji-panel panel-right">
        <div className="shoji-lattice" />
      </div>

      {/* Center Haute Monogram Crest */}
      <div className={`intro-crest ${isOpen ? 'fade-out' : ''}`}>
        <span className="crest-eyebrow">HAUTE CUISINE JAPONAISE</span>
        <div className="crest-gold-ring">
          <img src={logoImg} alt="Kaido Monogram" className="crest-logo" />
        </div>
        <h1 className="crest-brand">KAIDO</h1>
        <span className="crest-sub">WIEN • ROTENSTERNGASSE</span>
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

        /* Shoji Lacquer Panels */
        .shoji-panel {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          background: #080a0d;
          box-shadow: inset 0 0 120px rgba(0, 0, 0, 0.95);
          transition: transform 1.3s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 1;
        }

        .panel-left {
          left: 0;
          border-right: 1px solid rgba(212, 175, 55, 0.4);
        }

        .panel-right {
          right: 0;
          border-left: 1px solid rgba(212, 175, 55, 0.4);
        }

        .japanese-intro-overlay.open .panel-left {
          transform: translateX(-101%);
        }

        .japanese-intro-overlay.open .panel-right {
          transform: translateX(101%);
        }

        .shoji-lattice {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          background-image: 
            linear-gradient(var(--color-gold) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-gold) 1px, transparent 1px);
          background-size: 70px 70px;
        }

        /* Center Crest */
        .intro-crest {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #ffffff;
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .intro-crest.fade-out {
          opacity: 0;
          transform: scale(1.08);
        }

        .crest-eyebrow {
          font-family: var(--font-eyebrow);
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          color: var(--color-gold);
          margin-bottom: 16px;
        }

        .crest-gold-ring {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 1.5px solid var(--color-gold);
          box-shadow: 0 0 35px rgba(212, 175, 55, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(14, 17, 21, 0.9);
          margin-bottom: 16px;
          padding: 8px;
        }

        .crest-logo {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 50%;
        }

        .crest-brand {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 400;
          letter-spacing: 0.28em;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .crest-sub {
          font-family: var(--font-eyebrow);
          font-size: 0.7rem;
          letter-spacing: 0.28em;
          color: var(--color-washi-dim);
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .crest-gold-ring {
            width: 80px;
            height: 80px;
            margin-bottom: 12px;
          }
          .crest-logo {
            width: 54px;
            height: 54px;
          }
          .crest-eyebrow {
            font-size: 0.6rem;
            letter-spacing: 0.25em;
            margin-bottom: 12px;
          }
          .crest-brand {
            font-size: 1.55rem;
            letter-spacing: 0.2em;
          }
          .crest-sub {
            font-size: 0.62rem;
            letter-spacing: 0.2em;
          }
        }
      `}</style>
    </div>
  );
};
