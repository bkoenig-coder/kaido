import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, CalendarDays, Compass } from 'lucide-react';
import { LottieAnimation } from './LottieAnimation';

export const ContactHours: React.FC = () => {
  const { t, language } = useLanguage();

  // Get current day in Vienna time (0: Sunday, 1: Monday, etc.)
  const viennaDay = useMemo(() => {
    try {
      const viennaTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Vienna' }));
      return viennaTime.getDay();
    } catch {
      return new Date().getDay();
    }
  }, []);

  const hoursList = [
    { dayIndex: 1, labelDe: 'Montag', labelEn: 'Monday', regular: '11:00 - 22:00', summer: '17:00 - 22:00' },
    { dayIndex: 2, labelDe: 'Dienstag', labelEn: 'Tuesday', regular: 'Geschlossen (Ruhetag)', summer: 'Geschlossen (Ruhetag)', isClosed: true },
    { dayIndex: 3, labelDe: 'Mittwoch', labelEn: 'Wednesday', regular: '11:00 - 22:00', summer: '17:00 - 22:00' },
    { dayIndex: 4, labelDe: 'Donnerstag', labelEn: 'Thursday', regular: '11:00 - 22:00', summer: '17:00 - 22:00' },
    { dayIndex: 5, labelDe: 'Freitag', labelEn: 'Friday', regular: '11:00 - 22:00', summer: '17:00 - 22:00' },
    { dayIndex: 6, labelDe: 'Samstag', labelEn: 'Saturday', regular: '12:00 - 22:00', summer: '12:00 - 22:00' },
    { dayIndex: 0, labelDe: 'Sonntag & Feiertage', labelEn: 'Sunday & Holidays', regular: '12:00 - 22:00', summer: '12:00 - 22:00' },
  ];

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <div className="section-title animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '8px' }}>
            <LottieAnimation
              url="https://lottie.host/8e6862f5-71f4-4ab1-b783-2ff842ea97d8/szV4j1T5vz.json"
              width="85px"
              height="85px"
            />
          </div>
          <h2>{t.navContact}</h2>
          <p>{language === 'de' ? 'Kommen Sie vorbei oder kontaktieren Sie uns für Bestellungen und Fragen.' : 'Stop by or contact us for takeout orders and general inquiries.'}</p>
        </div>

        <div className="contact-grid">
          {/* Left Side: Contact details & Map */}
          <div className="contact-details animate-slide-up">
            <div className="details-cards">
              {/* Address card */}
              <a 
                href="https://maps.google.com/?q=Rotensterngasse+3,+1020+Wien" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="info-card glass-card"
              >
                <div className="info-icon-container">
                  <MapPin className="info-icon" size={22} />
                </div>
                <div className="info-text">
                  <h3>{t.contactAddress}</h3>
                  <p>Rotensterngasse 3, 1020 Wien</p>
                  <span className="card-action-hint">{language === 'de' ? 'Auf Karte zeigen' : 'Show on map'} →</span>
                </div>
              </a>

              {/* Phone card */}
              <a href="tel:+436609108818" className="info-card glass-card">
                <div className="info-icon-container">
                  <Phone className="info-icon" size={22} />
                </div>
                <div className="info-text">
                  <h3>{t.contactPhone}</h3>
                  <p>+43 (0) 660 910 88 18</p>
                  <span className="card-action-hint">{language === 'de' ? 'Jetzt anrufen' : 'Call now'} →</span>
                </div>
              </a>

              {/* Email card */}
              <a href="mailto:sushibarkaido@gmail.com" className="info-card glass-card">
                <div className="info-icon-container">
                  <Mail className="info-icon" size={22} />
                </div>
                <div className="info-text">
                  <h3>{t.contactEmail}</h3>
                  <p>sushibarkaido@gmail.com</p>
                  <span className="card-action-hint">{language === 'de' ? 'E-Mail schreiben' : 'Send email'} →</span>
                </div>
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="map-container">
              <iframe
                title="Kaido Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.7397686563604!2d16.381156676882207!3d48.216399045330366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d07bbbb5cc52f%3A0xe21287c88cd2615!2sRotensterngasse%203%2C%201020%20Wien%2C%20Austria!5e0!3m2!1sen!2sat!4v1716123456789!5m2!1sen!2sat"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Side: Hours */}
          <div className="contact-hours glass-card animate-slide-up">
            <div className="hours-header">
              <div className="hours-header-left">
                <CalendarDays className="text-gold" size={28} />
                <div>
                  <h3>{t.hoursTitle}</h3>
                  <p className="summer-alert-subtitle">
                    {t.hoursSummerValidity}
                  </p>
                </div>
              </div>
              <div className="hours-lottie-container">
                <LottieAnimation 
                  url="https://lottie.host/6aa43497-0225-40b5-91f2-08d1dd962dfe/7DRsVryMxt.json" 
                  width="60px" 
                  height="60px" 
                />
              </div>
            </div>

            {/* Summer hours notice box */}
            <div className="summer-notice-box">
              <Clock size={16} />
              <span>{language === 'de' ? 'Derzeit gelten die Sommer-Öffnungszeiten (werktags ab 17 Uhr)' : 'Summer hours are currently active (opening 5 PM on weekdays)'}</span>
            </div>

            <div className="hours-table">
              {hoursList.map((row) => {
                const isToday = row.dayIndex === viennaDay;
                return (
                  <div 
                    key={row.dayIndex} 
                    className={`hours-row ${isToday ? 'today-row' : ''} ${row.isClosed ? 'closed-day' : ''}`}
                  >
                    <div className="hours-day">
                      {language === 'de' ? row.labelDe : row.labelEn}
                      {isToday && <span className="today-badge">{t.hoursToday}</span>}
                    </div>
                    <div className="hours-time">
                      <span className="summer-time-highlight">{row.summer}</span>
                      <span className="regular-time-small">({language === 'de' ? 'regulär' : 'regular'}: {row.regular})</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hours-footer">
              <Compass size={16} />
              <p>
                {language === 'de' 
                  ? 'Alle Gerichte können auch telefonisch zur Abholung vorbestellt werden.' 
                  : 'Takeout orders can be pre-ordered by phone.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: stretch;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .details-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .info-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
        }

        .info-icon-container {
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid var(--border-color);
          color: var(--accent-gold);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: var(--transition-smooth);
        }

        .info-card:hover .info-icon-container {
          background: var(--accent-gold);
          color: #120f0d;
          box-shadow: 0 0 15px var(--accent-gold-glow);
        }

        .info-text h3 {
          font-size: 1.05rem;
          margin-bottom: 4px;
          font-family: var(--font-heading);
          color: var(--text-secondary);
        }

        .info-text p {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .card-action-hint {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 4px;
          transition: var(--transition-fast);
        }

        .info-card:hover .card-action-hint {
          color: var(--accent-gold);
          transform: translateX(4px);
        }

        /* Hours side styling */
        .contact-hours {
          padding: 40px;
          display: flex;
          flex-direction: column;
        }

        .hours-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }

        .hours-header h3 {
          font-size: 1.6rem;
          margin-bottom: 4px;
        }

        .summer-alert-subtitle {
          font-size: 0.85rem;
          color: var(--accent-coral);
          font-weight: 600;
        }

        .summer-notice-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(224, 90, 71, 0.08);
          border: 1px solid rgba(224, 90, 71, 0.2);
          color: var(--accent-coral);
          padding: 12px 16px;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .hours-table {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: auto;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border-bottom: 1px solid rgba(255, 255, 255, 0.02);
          transition: var(--transition-fast);
        }

        .hours-day {
          font-weight: 500;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .today-badge {
          background: var(--accent-gold);
          color: #120f0d;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
        }

        .hours-time {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-family: var(--font-heading);
        }

        .summer-time-highlight {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .regular-time-small {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .today-row {
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.2);
        }
        
        .today-row .summer-time-highlight {
          color: var(--accent-gold);
        }

        .closed-day .summer-time-highlight {
          color: var(--text-muted);
          font-weight: 500;
        }

        .hours-footer {
          margin-top: 30px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);
          font-size: 0.88rem;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-color);
          padding: 12px 16px;
          border-radius: var(--radius-md);
        }

        .hours-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .hours-header-left {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .hours-lottie-container {
          flex-shrink: 0;
          margin-top: -10px;
        }

        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>
    </section>
  );
};
