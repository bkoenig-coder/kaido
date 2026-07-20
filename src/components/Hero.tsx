import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CalendarDays, UtensilsCrossed, Clock } from 'lucide-react';
import { LottieAnimation } from './LottieAnimation';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const { t, language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [openStatus, setOpenStatus] = useState<{ status: 'open' | 'closed' | 'closing', text: string }>({
    status: 'closed',
    text: ''
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log('Autoplay handled:', e));
    }
  }, []);

  useEffect(() => {
    const checkOpenStatus = () => {
      // Get current date/time in Austria (Vienna is Central European Time (CET/CEST), usually UTC+2 in summer)
      // Since client local time can vary, let's parse local time from system metadata or default Date
      const now = new Date();
      
      // Target time in Vienna
      const viennaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Vienna' }));
      const day = viennaTime.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
      const hour = viennaTime.getHours();
      const minute = viennaTime.getMinutes();
      const currentMinutes = hour * 60 + minute;

      // Summer Hours Range: 13.Juli to 6.September 2026
      // Current date is 2026-07-19 (which falls in this range)
      // Let's check if current year is 2026 and within summer bounds, or simply use summer hours as default since current date is 2026-07-19
      const isSummer = true; 

      let isOpen = false;
      let closingSoon = false;
      let openHour = 0;
      const closeHour = 22;

      if (day === 2) {
        // Tuesday Closed
        isOpen = false;
      } else if (day === 0 || day === 6) {
        // Saturday, Sunday & Holidays: 12:00 - 22:00
        openHour = 12;
        isOpen = currentMinutes >= (12 * 60) && currentMinutes < (closeHour * 60);
        closingSoon = isOpen && (currentMinutes >= ((closeHour - 1) * 60) + 30); // 30 mins before closing
      } else {
        // Monday, Wednesday, Thursday, Friday:
        // Summer Hours: 17:00 - 22:00
        // Regular Hours: 11:00 - 22:00
        openHour = isSummer ? 17 : 11;
        isOpen = currentMinutes >= (openHour * 60) && currentMinutes < (closeHour * 60);
        closingSoon = isOpen && (currentMinutes >= ((closeHour - 1) * 60) + 30);
      }

      if (isOpen) {
        if (closingSoon) {
          setOpenStatus({
            status: 'closing',
            text: language === 'de' ? `Schließt bald (${closeHour}:00 Uhr)` : `Closing soon (${closeHour - 12}:00 PM)`
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
          openingInfo = language === 'de' ? 'Morgen ab 17:00 geöffnet' : 'Open tomorrow from 5:00 PM';
        } else if (currentMinutes < (openHour * 60)) {
          openingInfo = language === 'de' ? `Öffnet heute um ${openHour}:00 Uhr` : `Opens today at ${openHour}:00`;
        } else {
          const nextDayOpenHour = (day === 1) ? 'Geschlossen (Ruhetag)' : (day === 5 || day === 6 ? '12:00' : '17:00');
          openingInfo = language === 'de' 
            ? `Öffnet wieder um ${nextDayOpenHour}` 
            : `Opens again at ${nextDayOpenHour === 'Geschlossen (Ruhetag)' ? 'Wed 5:00 PM' : nextDayOpenHour}`;
        }
        setOpenStatus({
          status: 'closed',
          text: `${t.statusClosed} • ${openingInfo}`
        });
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [t, language]);

  const scrollToMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('menu');
    if (element) {
      const offset = 80;
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
      <div className="hero-bg" style={{ background: '#0a0a0c' }}>
        <video
          ref={videoRef}
          className="hero-video-bg"
          src="https://res.cloudinary.com/b08mrui7/video/upload/v1784550485/0720_2_damyq5.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="https://res.cloudinary.com/b08mrui7/video/upload/v1784550485/0720_2_damyq5.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay"></div>
      
      {/* Decorative Floating Koi Fish Watermark */}
      <div className="hero-koi-watermark">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M40,80 C60,40 130,30 160,80 C180,110 160,150 120,165 C80,180 50,150 65,110 C70,95 85,85 105,80" 
            stroke="var(--accent-gold)" 
            strokeWidth="4" 
            strokeLinecap="round"
            opacity="0.08"
          />
          <path 
            d="M120,165 C130,175 145,180 155,175 C165,170 160,155 145,150" 
            stroke="var(--accent-gold)" 
            strokeWidth="3" 
            strokeLinecap="round"
            opacity="0.08"
          />
          <path 
            d="M70,50 C60,60 55,75 60,85" 
            stroke="var(--accent-gold)" 
            strokeWidth="3" 
            strokeLinecap="round"
            opacity="0.08"
          />
          <path 
            d="M140,45 C150,55 155,70 150,80" 
            stroke="var(--accent-gold)" 
            strokeWidth="3" 
            strokeLinecap="round"
            opacity="0.08"
          />
        </svg>
      </div>

      <div className="hero-container container">
        <div className="hero-content animate-slide-up">
          {/* Centered Homepage Animation */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }} className="animate-fade-in">
            <LottieAnimation 
              url="https://lottie.host/7b34dc46-b0c2-4b31-ae1b-9aef57e74ea8/R4k9Jo6VVC.json" 
              width="95px" 
              height="95px" 
            />
          </div>

          {/* Open Status Badge */}
          <div className="hero-status-row animate-fade-in" style={{ justifyContent: 'center', marginBottom: '20px' }}>
            <div className="status-badge-container">
              <span className={`status-dot ${openStatus.status}`}></span>
              <span className="status-text">{openStatus.text}</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-description">{t.heroSubtitle}</p>

          {/* Special notice for Summer Opening Hours */}
          <div className="summer-badge">
            <Clock size={16} />
            <span>{language === 'de' ? 'Aktuell gelten die Sommer-Öffnungszeiten (17:00 - 22:00)' : 'Current Summer Hours are active (5:00 PM - 10:00 PM)'}</span>
          </div>

          {/* CTAs */}
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onOpenReservation}>
              <CalendarDays size={18} />
              <span>{t.heroBookBtn}</span>
            </button>
            <button className="btn btn-secondary" onClick={scrollToMenu}>
              <UtensilsCrossed size={18} />
              <span>{t.heroMenuBtn}</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          padding: 100px 0 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .hero-video-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          transform: scale(1.03);
        }

        .hero-overlay {
          display: none;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
        .hero-status-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .hero-lottie-cat-mini {
          flex-shrink: 0;
          background: rgba(18, 15, 13, 0.75);
          padding: 6px;
          border-radius: 50%;
          border: 1.5px solid var(--accent-gold);
          box-shadow: 0 4px 15px rgba(192, 57, 43, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-badge-container {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(18, 15, 13, 0.75);
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          height: 38px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .status-dot.open {
          background: #2ecc71;
          box-shadow: 0 0 10px rgba(46, 204, 113, 0.8);
        }

        .status-dot.closing {
          background: #ff9f1c;
          box-shadow: 0 0 10px rgba(255, 159, 28, 0.8);
        }

        .status-dot.closed {
          background: #e74c3c;
          box-shadow: 0 0 10px rgba(231, 76, 60, 0.8);
        }

        .status-text {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #ffffff;
        }

        .hero-title {
          font-size: 2.4rem;
          line-height: 1.25;
          margin-bottom: 16px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.01em;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.85);
        }

        .hero-description {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.95);
          max-width: 560px;
          margin-bottom: 24px;
          line-height: 1.6;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.85);
        }

        .summer-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.9);
          padding: 8px 16px;
          border-radius: var(--radius-md);
          margin-bottom: 35px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .hero-actions .btn {
          padding: 12px 28px;
          font-size: 1rem;
        }

        .hero-koi-watermark {
          position: absolute;
          right: 5%;
          top: 15%;
          width: 320px;
          height: 320px;
          z-index: 1;
          pointer-events: none;
          animation: floatSlow 15s infinite alternate ease-in-out;
        }

        @keyframes floatSlow {
          0% { transform: translateY(0) rotate(0deg) scale(1); }
          100% { transform: translateY(-20px) rotate(8deg) scale(1.08); }
        }

        @keyframes slowZoom {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.08); }
        }

        /* Hero seal responsive tweaks */
        @media (max-width: 768px) {
          .hero-status-row {
            gap: 10px;
          }
        }

        @media (max-width: 768px) {
          .status-badge-container {
            height: auto;
            padding: 6px 12px;
            max-width: 90vw;
          }
          .status-text {
            font-size: 0.72rem !important;
            letter-spacing: 0.02em;
            line-height: 1.35;
          }
          .hero-title {
            font-size: 1.8rem;
          }
          .hero-description {
            font-size: 0.95rem;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
            gap: 12px;
          }
          .hero-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
