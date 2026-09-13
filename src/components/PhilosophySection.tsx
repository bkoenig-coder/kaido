import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const PhilosophySection: React.FC = () => {
  const { t, language } = useLanguage();

  const pillars = [
    {
      kanji: 'おもてなし',
      kanjiChar: '和',
      roman: 'I',
      title: t.pillar1Title,
      subtitle: t.pillar1Subtitle,
      desc: t.pillar1Desc,
    },
    {
      kanji: '旬',
      kanjiChar: '旬',
      roman: 'II',
      title: t.pillar2Title,
      subtitle: t.pillar2Subtitle,
      desc: t.pillar2Desc,
    },
    {
      kanji: '職人',
      kanjiChar: '匠',
      roman: 'III',
      title: t.pillar3Title,
      subtitle: t.pillar3Subtitle,
      desc: t.pillar3Desc,
    },
  ];

  return (
    <section id="philosophy" className="philosophy-section section">
      {/* Background ambient watermarks */}
      <div className="philosophy-bg-glow" />

      <div className="container">
        {/* Section Header */}
        <div className="section-title animate-slide-up">
          <span className="eyebrow-text">{t.philosophyEyebrow}</span>
          <h2>{t.philosophyTitle}</h2>
          <div className="hairline-divider" />
          <p style={{ marginTop: '18px' }}>{t.philosophySubtitle}</p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="pillars-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card glass-card animate-slide-up">
              <div className="pillar-watermark-kanji">{pillar.kanjiChar}</div>
              
              <div className="pillar-header">
                <span className="pillar-numeral">{pillar.roman}</span>
                <span className="pillar-kanji-sub">{pillar.kanji}</span>
              </div>

              <h3 className="pillar-title">{pillar.title}</h3>
              <h4 className="pillar-subtitle">{pillar.subtitle}</h4>
              
              <div className="pillar-divider" />

              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Haute Gastronomy Quote Banner */}
        <div className="philosophy-quote-box glass-panel animate-fade-in">
          <span className="quote-mark">“</span>
          <blockquote className="quote-text">
            {language === 'de'
              ? 'Vollkommenheit entsteht nicht, wenn man nichts mehr hinzufügen kann, sondern wenn man nichts mehr weglassen kann.'
              : 'Perfection is attained not when there is nothing more to add, but when there is nothing left to take away.'}
          </blockquote>
          <cite className="quote-author">
            KAIDO • ATELIER WIEN
          </cite>
        </div>
      </div>

      <style>{`
        .philosophy-section {
          background: linear-gradient(180deg, #0e1115 0%, #12161d 50%, #0e1115 100%);
          position: relative;
          overflow: hidden;
        }

        .philosophy-bg-glow {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 70px;
        }

        .pillar-card {
          padding: 48px 36px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          background: rgba(20, 23, 29, 0.7);
          border: 1px solid rgba(212, 175, 55, 0.18);
          border-radius: var(--radius-md);
        }

        .pillar-watermark-kanji {
          position: absolute;
          right: 20px;
          top: 15px;
          font-family: var(--font-serif);
          font-size: 6.5rem;
          line-height: 1;
          color: var(--color-gold);
          opacity: 0.04;
          user-select: none;
          pointer-events: none;
          font-weight: 300;
        }

        .pillar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .pillar-numeral {
          font-family: var(--font-eyebrow);
          font-size: 0.85rem;
          color: var(--color-gold);
          letter-spacing: 0.25em;
        }

        .pillar-kanji-sub {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          color: rgba(212, 175, 55, 0.65);
          letter-spacing: 0.15em;
        }

        .pillar-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 4px;
          letter-spacing: 0.03em;
        }

        .pillar-subtitle {
          font-family: var(--font-eyebrow);
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-gold-light);
          margin-bottom: 20px;
        }

        .pillar-divider {
          width: 40px;
          height: 1px;
          background: rgba(212, 175, 55, 0.35);
          margin-bottom: 22px;
        }

        .pillar-desc {
          font-size: 0.98rem;
          line-height: 1.8;
          color: var(--color-washi-dim);
          font-weight: 300;
        }

        .philosophy-quote-box {
          border: 1px solid rgba(212, 175, 55, 0.22);
          padding: 48px 40px;
          border-radius: var(--radius-md);
          text-align: center;
          max-width: 880px;
          margin: 0 auto;
          position: relative;
          background: rgba(14, 17, 21, 0.65);
        }

        .quote-mark {
          font-family: var(--font-serif);
          font-size: 3.5rem;
          color: var(--color-gold);
          opacity: 0.4;
          line-height: 1;
          display: block;
          margin-bottom: -10px;
        }

        .quote-text {
          font-family: var(--font-serif);
          font-size: clamp(1.2rem, 2.2vw, 1.6rem);
          font-style: italic;
          color: #ffffff;
          line-height: 1.6;
          margin-bottom: 18px;
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        .quote-author {
          font-family: var(--font-eyebrow);
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          color: var(--color-gold);
          text-transform: uppercase;
          font-style: normal;
        }

        @media (max-width: 960px) {
          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .philosophy-quote-box {
            padding: 36px 24px;
          }
        }
      `}</style>
    </section>
  );
};
