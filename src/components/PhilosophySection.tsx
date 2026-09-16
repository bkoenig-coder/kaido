import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Utensils, CalendarDays, PhoneCall } from 'lucide-react';

interface PhilosophySectionProps {
  onOpenReservation?: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ onOpenReservation }) => {
  const { t, language } = useLanguage();

  const scrollToLunch = () => {
    window.dispatchEvent(new CustomEvent('switchMenuTab', { detail: 'lunch' }));
    const element = document.getElementById('menu');
    if (element) {
      const offset = 95;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const pillars = [
    {
      kanji: '鮮',
      kanjiChar: '鮮',
      roman: '01',
      title: t.pillar1Title,
      subtitle: t.pillar1Subtitle,
      desc: t.pillar1Desc,
    },
    {
      kanji: '技',
      kanjiChar: '技',
      roman: '02',
      title: t.pillar2Title,
      subtitle: t.pillar2Subtitle,
      desc: t.pillar2Desc,
    },
    {
      kanji: '昼',
      kanjiChar: '昼',
      roman: '03',
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
              <div className="pillar-header">
                <span className="pillar-roman">{pillar.roman}</span>
                <span className="pillar-kanji">{pillar.kanjiChar}</span>
              </div>

              <h3 className="pillar-title">{pillar.title}</h3>
              <h4 className="pillar-subtitle">{pillar.subtitle}</h4>
              
              <div className="pillar-divider" />

              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Functional Fast-Action Service Banner */}
        <div className="service-features-banner glass-card animate-fade-in">
          <div 
            className="feature-item interactive"
            onClick={scrollToLunch}
            role="button"
            tabIndex={0}
            title={language === 'de' ? 'Zum Mittagsmenü scrollen' : 'View Lunch Specials'}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToLunch(); }}
          >
            <div className="feature-icon-circle">
              <Utensils size={20} />
            </div>
            <div>
              <h4 className="feature-title">{language === 'de' ? 'Mittagsmenü 11:00 – 14:00 Uhr' : 'Lunch Specials 11:00 AM – 2:00 PM'}</h4>
              <p className="feature-subtitle">{language === 'de' ? 'Mo–Fr serviert mit Sommerrolle & Miso-Suppe' : 'Mon–Fri served with summer roll & miso soup'}</p>
            </div>
          </div>

          <div className="feature-divider" />

          <div 
            className="feature-item interactive"
            onClick={onOpenReservation}
            role="button"
            tabIndex={0}
            title={language === 'de' ? 'Online Tisch reservieren' : 'Book a table online'}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenReservation?.(); }}
          >
            <div className="feature-icon-circle">
              <CalendarDays size={20} />
            </div>
            <div>
              <h4 className="feature-title">{language === 'de' ? 'Tisch online reservieren' : 'Online Table Booking'}</h4>
              <p className="feature-subtitle">{language === 'de' ? 'Schnell, unkompliziert & sofort bestätigt' : 'Instant confirmation for your visit'}</p>
            </div>
          </div>

          <div className="feature-divider" />

          <a 
            href="tel:+4312126076" 
            className="feature-item interactive feature-link"
            title={language === 'de' ? 'Jetzt anrufen: 01 212 60 76' : 'Call takeaway: 01 212 60 76'}
          >
            <div className="feature-icon-circle">
              <PhoneCall size={20} />
            </div>
            <div>
              <h4 className="feature-title">{language === 'de' ? 'Telefonische Vorbestellung' : 'Telephone Takeaway Orders'}</h4>
              <p className="feature-subtitle">
                <span className="feature-phone-link">
                  01 212 60 76
                </span>
              </p>
            </div>
          </a>
        </div>
      </div>

      <style>{`
        .philosophy-section {
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          transition: background-color 0.35s ease;
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

        .service-features-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 32px 40px;
          border-radius: var(--radius-md);
          margin: 0 auto;
          max-width: 1060px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          background: rgba(14, 18, 24, 0.65);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        .feature-item.interactive {
          cursor: pointer;
          border-radius: 12px;
          padding: 10px 14px;
          margin: -10px -14px;
          transition: background-color 0.25s ease, transform 0.25s ease;
          text-decoration: none;
        }

        .feature-item.interactive:hover {
          background: rgba(212, 175, 55, 0.09);
          transform: translateY(-2px);
        }

        .feature-item.interactive:hover .feature-icon-circle {
          border-color: var(--color-gold);
          box-shadow: 0 0 14px rgba(212, 175, 55, 0.4);
          background: rgba(212, 175, 55, 0.16);
        }

        .feature-icon-circle {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid var(--color-gold);
          background: rgba(212, 175, 55, 0.08);
          color: var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-title {
          font-family: var(--font-eyebrow);
          font-size: 0.88rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 3px;
        }

        .feature-subtitle {
          font-size: 0.84rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .feature-phone-link {
          color: var(--color-gold);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: var(--transition-fast);
        }

        .feature-phone-link:hover {
          color: var(--color-gold-light);
          text-decoration: underline;
        }

        .feature-divider {
          width: 1px;
          height: 46px;
          background: rgba(212, 175, 55, 0.2);
        }

        @media (max-width: 960px) {
          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .service-features-banner {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px 20px;
            gap: 18px;
          }
          .feature-divider {
            width: 100%;
            height: 1px;
          }
        }

        @media (max-width: 768px) {
          .pillar-card {
            padding: 22px 18px;
          }
          .pillar-watermark-kanji {
            font-size: 3rem;
            right: 12px;
            top: 10px;
            opacity: 0.04;
          }
          .pillar-header {
            margin-bottom: 12px;
          }
          .pillar-numeral {
            font-size: 0.65rem;
            letter-spacing: 0.16em;
          }
          .pillar-kanji-sub {
            font-size: 0.72rem;
          }
          .pillar-title {
            font-size: 1.18rem;
            margin-bottom: 2px;
          }
          .pillar-subtitle {
            font-size: 0.62rem;
            letter-spacing: 0.12em;
            margin-bottom: 12px;
          }
          .pillar-divider {
            margin-bottom: 12px;
          }
          .pillar-desc {
            font-size: 0.78rem;
            line-height: 1.55;
          }
          .service-features-banner {
            padding: 18px 14px;
            gap: 14px;
          }
          .feature-icon-circle {
            width: 36px;
            height: 36px;
          }
          .feature-title {
            font-size: 0.72rem;
            letter-spacing: 0.08em;
          }
          .feature-subtitle {
            font-size: 0.68rem;
          }
          .feature-phone-link {
            font-size: 0.72rem;
          }
        }

        /* Day Mode Refinements */
        [data-theme="light"] .service-features-banner {
          background: #ffffff;
          border-color: rgba(160, 120, 25, 0.25);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(160, 120, 25, 0.06);
        }

        [data-theme="light"] .feature-icon-circle {
          background: #f4f0e6;
          border-color: var(--color-gold);
          color: #806216;
        }

        [data-theme="light"] .feature-title {
          color: #17181a;
          font-weight: 600;
        }

        [data-theme="light"] .feature-subtitle {
          color: #4a4c52;
        }

        [data-theme="light"] .feature-phone-link {
          color: #806216;
          font-weight: 600;
        }

        [data-theme="light"] .feature-phone-link:hover {
          color: #17181a;
        }

        [data-theme="light"] .feature-divider {
          background: rgba(160, 120, 25, 0.22);
        }
      `}</style>
    </section>
  );
};
