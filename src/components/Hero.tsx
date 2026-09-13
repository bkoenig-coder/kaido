import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CalendarDays, Compass, Clock } from 'lucide-react';
import heroBgImg from '../assets/gallery/gallery3.jpg';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const { t, language } = useLanguage();
  const [openStatus, setOpenStatus] = useState<{ status: 'open' | 'closed' | 'closing', text: string }>({
    status: 'closed',
    text: ''
  });

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const viennaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Vienna' }));
      const day = viennaTime.getDay();
      const hour = viennaTime.getHours();
      const minute = viennaTime.getMinutes();
      const currentMinutes = hour * 60 + minute;

      const isSummer = true; 
      let isOpen = false;
      let closingSoon = false;
      let openHour = 0;
      const closeHour = 22;

      if (day === 2) {
        isOpen = false;
      } else if (day === 0 || day === 6) {
        openHour = 12;
        isOpen = currentMinutes >= (12 * 60) && currentMinutes < (closeHour * 60);
        closingSoon = isOpen && (currentMinutes >= ((closeHour - 1) * 60) + 30);
      } else {
        openHour = isSummer ? 17 : 11;
        isOpen = currentMinutes >= (openHour * 60) && currentMinutes < (closeHour * 60);
        closingSoon = isOpen && (currentMinutes >= ((closeHour - 1) * 60) + 30);
      }

      if (isOpen) {
        if (closingSoon) {
          setOpenStatus({
            status: 'closing',
            text: language === 'de' ? `Letzte Runde (${closeHour}:00 Uhr)` : `Service closing soon (${closeHour - 12}:00 PM)`
          });
        } else {
          setOpenStatus({
            status: 'open',
            text: t.statusOpen
          });
        }
      } else {
        let openingInfo = '';
        if (day === 2) {
          openingInfo = language === 'de' ? 'Morgen ab 17:00 geöffnet' : 'Seating resumes tomorrow from 5:00 PM';
        } else if (currentMinutes < (openHour * 60)) {
          openingInfo = language === 'de' ? `Öffnet heute um ${openHour}:00 Uhr` : `Opens today at ${openHour}:00`;
        } else {
          const nextDayOpenHour = (day === 1) ? 'Ruhetag' : (day === 5 || day === 6 ? '12:00' : '17:00');
          openingInfo = language === 'de' 
            ? `Nächster Service um ${nextDayOpenHour}` 
            : `Next service at ${nextDayOpenHour === 'Ruhetag' ? 'Wed 5:00 PM' : nextDayOpenHour}`;
        }
        setOpenStatus({
          status: 'closed',
          text: `${t.statusClosed} • ${openingInfo}`
        });
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, [t, language]);

  const scrollToMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('menu');
    if (element) {
      const offset = 85;
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

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg">
        <img
          className="hero-image-bg"
          src={heroBgImg}
          alt="Kaido Japanese Haute Cuisine Geisha Mural"
        />
        <div className="hero-overlay" />
      </div>
      
      {/* Left Hand Side Yin-Yang Viewport Emblem */}
      <div className="hero-yingyang-left">
        <svg viewBox="0 0 100 100" className="hero-yy-svg">
          <circle cx="50" cy="50" r="48" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.25" strokeDasharray="3 4" />
          <circle cx="50" cy="50" r="44" fill="rgba(8, 10, 13, 0.45)" stroke="var(--color-gold)" strokeWidth="1" opacity="0.35" />
          <path
            d="M 50,6 A 44,44 0 0,1 50,94 A 22,22 0 0,1 50,50 A 22,22 0 0,0 50,6"
            fill="var(--color-gold)"
            opacity="0.2"
          />
          <circle cx="50" cy="28" r="5" fill="#080a0d" opacity="0.6" />
          <circle cx="50" cy="72" r="5" fill="var(--color-gold)" opacity="0.4" />
        </svg>
        <span className="hero-yy-label">陰 • YIN</span>
      </div>

      {/* Right Hand Side Yin-Yang Viewport Emblem */}
      <div className="hero-yingyang-right">
        <svg viewBox="0 0 100 100" className="hero-yy-svg">
          <circle cx="50" cy="50" r="48" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.25" strokeDasharray="3 4" />
          <circle cx="50" cy="50" r="44" fill="rgba(8, 10, 13, 0.45)" stroke="var(--color-gold)" strokeWidth="1" opacity="0.35" />
          <path
            d="M 50,94 A 44,44 0 0,1 50,6 A 22,22 0 0,1 50,50 A 22,22 0 0,0 50,94"
            fill="var(--color-gold)"
            opacity="0.2"
          />
          <circle cx="50" cy="72" r="5" fill="#080a0d" opacity="0.6" />
          <circle cx="50" cy="28" r="5" fill="var(--color-gold)" opacity="0.4" />
        </svg>
        <span className="hero-yy-label">陽 • YANG</span>
      </div>

      <div className="hero-container container">
        <div className="hero-content animate-slide-up">
          {/* Hanko Artisan Seal Stamp */}
          <div className="hero-seal-wrapper animate-fade-in">
            <span className="hero-eyebrow-pill">{t.heroEyebrow}</span>
          </div>

          {/* Heading */}
          <h1 className="hero-title">{t.heroTitle}</h1>
          <div className="hairline-divider" style={{ margin: '14px 0 24px' }} />
          <p className="hero-description">{t.heroSubtitle}</p>

          {/* Service Status Pill */}
          <div className="hero-status-row animate-fade-in">
            <div className="status-badge-container">
              <span className={`status-dot ${openStatus.status}`} />
              <span className="status-text">{openStatus.text}</span>
            </div>
          </div>

          {/* Seasonal Concierge Note */}
          <div className="summer-concierge-notice">
            <Clock size={15} className="notice-icon" />
            <span>{language === 'de' ? 'Aktuelle Sommeröffnungszeiten: 17:00 – 22:00 Uhr' : 'Active Summer Evening Hours: 5:00 PM – 10:00 PM'}</span>
          </div>

          {/* CTAs */}
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onOpenReservation}>
              <CalendarDays size={16} />
              <span>{t.heroBookBtn}</span>
            </button>
            <button className="btn btn-secondary" onClick={scrollToMenu}>
              <Compass size={16} />
              <span>{t.heroMenuBtn}</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          padding: 140px 0 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg-primary);
          transition: background-color 0.35s ease;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .hero-image-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 35%;
          position: absolute;
          top: 0;
          left: 0;
          filter: brightness(0.6) contrast(1.1);
          animation: subtleKenBurns 30s ease-in-out infinite alternate;
        }

        @keyframes subtleKenBurns {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.06); }
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 45%,
            rgba(8, 10, 13, 0.45) 0%,
            rgba(8, 10, 13, 0.82) 65%,
            rgba(8, 10, 13, 0.98) 100%
          );
          pointer-events: none;
        }

        .hero-yingyang-left,
        .hero-yingyang-right {
          position: absolute;
          top: 25%;
          width: 140px;
          height: 140px;
          pointer-events: none;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: var(--transition-smooth);
        }

        .hero-yingyang-left {
          left: 4%;
          animation: floatYyLeft 14s ease-in-out infinite alternate;
        }

        .hero-yingyang-right {
          right: 4%;
          animation: floatYyRight 14s ease-in-out infinite alternate;
        }

        .hero-yy-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.2));
        }

        .hero-yy-label {
          font-family: var(--font-eyebrow);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          color: var(--color-gold);
          opacity: 0.7;
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
        }

        @keyframes ringSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes ringSpinReverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        @keyframes floatYyLeft {
          0% { transform: translateY(0); }
          100% { transform: translateY(-16px); }
        }

        @keyframes floatYyRight {
          0% { transform: translateY(0); }
          100% { transform: translateY(-16px); }
        }

        @media (max-width: 1280px) and (min-width: 1025px) {
          .hero-yingyang-left,
          .hero-yingyang-right {
            width: 86px;
            height: 86px;
            top: 20%;
          }
          .hero-yingyang-left {
            left: 2%;
          }
          .hero-yingyang-right {
            right: 2%;
          }
          .hero-yy-label {
            font-size: 0.58rem;
          }
        }

        @media (max-width: 1024px) {
          .hero-yingyang-left,
          .hero-yingyang-right {
            display: none;
          }
        }

        .hero-container {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          text-align: center;
        }

        .hero-content {
          max-width: 840px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-seal-wrapper {
          margin-bottom: 22px;
        }

        .hero-eyebrow-pill {
          display: inline-block;
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-gold);
          padding: 6px 18px;
          border: 1px solid rgba(212, 175, 55, 0.28);
          border-radius: var(--radius-full);
          background: rgba(14, 17, 21, 0.6);
          backdrop-filter: blur(8px);
        }

        .hero-title {
          font-size: clamp(2.8rem, 5.5vw, 4.8rem);
          line-height: 1.12;
          margin-bottom: 8px;
          font-weight: 300;
          color: var(--text-primary);
          letter-spacing: 0.03em;
        }

        .hero-description {
          font-size: clamp(1.05rem, 1.6vw, 1.25rem);
          color: var(--text-secondary);
          max-width: 680px;
          margin-bottom: 28px;
          line-height: 1.8;
          font-weight: 300;
        }

        .hero-status-row {
          margin-bottom: 22px;
        }

        .status-badge-container {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(14, 17, 21, 0.75);
          padding: 8px 20px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(212, 175, 55, 0.2);
          backdrop-filter: blur(10px);
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
        }

        .status-dot.open {
          background: #38bdf8;
          box-shadow: 0 0 10px #38bdf8;
        }

        .status-dot.closing {
          background: #f59e0b;
          box-shadow: 0 0 10px #f59e0b;
        }

        .status-dot.closed {
          background: #94a3b8;
          box-shadow: 0 0 8px rgba(148, 163, 184, 0.5);
        }

        .status-text {
          font-family: var(--font-eyebrow);
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-washi-white);
        }

        .summer-concierge-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-gold-light);
          font-size: 0.84rem;
          letter-spacing: 0.05em;
          margin-bottom: 38px;
          opacity: 0.9;
        }

        .notice-icon {
          color: var(--color-gold);
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 120px 0 60px;
          }

          .hero-actions {
            flex-direction: column;
            width: 100%;
            gap: 14px;
          }
          .hero-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
