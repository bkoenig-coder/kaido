import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, CalendarDays } from 'lucide-react';

export const ContactHours: React.FC = () => {
  const { t, language } = useLanguage();

  const viennaDay = useMemo(() => {
    try {
      const viennaTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Vienna' }));
      return viennaTime.getDay();
    } catch {
      return new Date().getDay();
    }
  }, []);

  const hoursList = [
    { dayIndex: 1, labelDe: 'Montag', labelEn: 'Monday', time: '11:00 – 22:00', timeEn: '11:00 AM – 10:00 PM', isClosed: false },
    { dayIndex: 2, labelDe: 'Dienstag', labelEn: 'Tuesday', time: 'Geschlossen (Ruhetag)', timeEn: 'Closed', isClosed: true },
    { dayIndex: 3, labelDe: 'Mittwoch', labelEn: 'Wednesday', time: '11:00 – 22:00', timeEn: '11:00 AM – 10:00 PM', isClosed: false },
    { dayIndex: 4, labelDe: 'Donnerstag', labelEn: 'Thursday', time: '11:00 – 22:00', timeEn: '11:00 AM – 10:00 PM', isClosed: false },
    { dayIndex: 5, labelDe: 'Freitag', labelEn: 'Friday', time: '11:00 – 22:00', timeEn: '11:00 AM – 10:00 PM', isClosed: false },
    { dayIndex: 6, labelDe: 'Samstag', labelEn: 'Saturday', time: '12:00 – 22:00', timeEn: '12:00 PM – 10:00 PM', isClosed: false },
    { dayIndex: 0, labelDe: 'Sonntag & Feiertage', labelEn: 'Sunday & Holidays', time: '12:00 – 22:00', timeEn: '12:00 PM – 10:00 PM', isClosed: false },
  ];

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        {/* Title */}
        <div className="section-title animate-slide-up">
          <span className="eyebrow-text">{t.contactEyebrow}</span>
          <h2>{t.contactTitle}</h2>
          <div className="hairline-divider" />
          <p style={{ marginTop: '16px' }}>
            {language === 'de' 
              ? 'Besuchen Sie uns in der Rotensterngasse 3 oder kontaktieren Sie uns direkt für Tischreservierungen und Vorbestellungen.' 
              : 'Visit us at Rotensterngasse 3 or contact us directly for table reservations and takeaway pre-orders.'}
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Side: Atelier Details & Map */}
          <div className="contact-details animate-slide-up">
            <div className="details-cards">
              {/* Address */}
              <a 
                href="https://maps.google.com/?q=Rotensterngasse+3,+1020+Wien" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="info-card glass-card"
              >
                <div className="info-icon-container">
                  <MapPin className="info-icon" size={20} />
                </div>
                <div className="info-text">
                  <span className="info-label">{t.contactAddress}</span>
                  <h3>Rotensterngasse 3, 1020 Wien</h3>
                  <span className="card-action-hint">{language === 'de' ? 'Auf Karte zeigen' : 'Show on map'} →</span>
                </div>
              </a>

              {/* Phone */}
              <a href="tel:+436609108818" className="info-card glass-card">
                <div className="info-icon-container">
                  <Phone className="info-icon" size={20} />
                </div>
                <div className="info-text">
                  <span className="info-label">{t.contactPhone}</span>
                  <h3>+43 (0) 660 910 88 18</h3>
                  <span className="card-action-hint">{language === 'de' ? 'Concierge anrufen' : 'Call Concierge'} →</span>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:sushibarkaido@gmail.com" className="info-card glass-card">
                <div className="info-icon-container">
                  <Mail className="info-icon" size={20} />
                </div>
                <div className="info-text">
                  <span className="info-label">{t.contactEmail}</span>
                  <h3>sushibarkaido@gmail.com</h3>
                  <span className="card-action-hint">{language === 'de' ? 'Nachricht senden' : 'Send message'} →</span>
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
              />
            </div>
          </div>

          {/* Right Side: Hours */}
          <div className="contact-hours glass-card animate-slide-up">
            <div className="hours-header">
              <div className="hours-header-title">
                <CalendarDays className="text-gold" size={24} />
                <div>
                  <h3>{t.hoursTitle}</h3>
                  <p className="summer-alert-subtitle">
                    {language === 'de' ? 'Küche durchgehend geöffnet bis 21:30 Uhr' : 'Continuous kitchen open until 9:30 PM'}
                  </p>
                </div>
              </div>
            </div>

            <div className="hours-list">
              {hoursList.map((h) => {
                const isToday = h.dayIndex === viennaDay;
                return (
                  <div key={h.dayIndex} className={`hours-row ${isToday ? 'today' : ''} ${h.isClosed ? 'closed' : ''}`}>
                    <div className="hours-day">
                      <span className="day-name">{language === 'de' ? h.labelDe : h.labelEn}</span>
                      {isToday && <span className="today-pill">{t.hoursToday}</span>}
                    </div>
                    <div className="hours-time">
                      <span className="summer-time">{h.isClosed ? (language === 'de' ? h.time : (h.timeEn || 'Closed')) : (language === 'de' ? h.time : (h.timeEn || h.time))}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hours-footer">
              <span className="hours-footer-seal">会</span>
              <p>
                {language === 'de'
                  ? 'Letzte Küchenannahme 30 Minuten vor Service-Ende. Reservierungen werden empfohlen.'
                  : 'Last culinary order 30 minutes prior to closing. Advance reservations recommended.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background: var(--bg-primary);
          position: relative;
          transition: background-color 0.35s ease;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 36px;
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
          padding: 22px 26px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
        }

        .info-icon-container {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gold);
          background: rgba(212, 175, 55, 0.08);
          flex-shrink: 0;
        }

        .info-text {
          flex-grow: 1;
        }

        .info-label {
          font-family: var(--font-eyebrow);
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-gold);
          display: block;
          margin-bottom: 2px;
        }

        .info-text h3 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--text-primary);
          letter-spacing: 0.02em;
          margin-bottom: 4px;
        }

        .card-action-hint {
          font-family: var(--font-eyebrow);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--color-gold-light);
          text-transform: uppercase;
          opacity: 0.85;
          transition: var(--transition-fast);
        }

        .info-card:hover .card-action-hint {
          opacity: 1;
          color: var(--color-gold);
        }

        /* Right Side: Hours Card */
        .contact-hours, .hours-card {
          padding: 40px 36px;
          display: flex;
          flex-direction: column;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
        }

        .hours-header {
          margin-bottom: 30px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 20px;
        }

        .hours-header-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .hours-header-title h3 {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--text-primary);
        }

        .summer-alert-subtitle {
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: var(--color-gold-light);
          margin-top: 4px;
        }

        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 30px;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.92rem;
          transition: var(--transition-fast);
        }

        .hours-row.today {
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .hours-day {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .day-name {
          color: #ffffff;
          font-weight: 400;
        }

        .today-pill {
          font-family: var(--font-eyebrow);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background: var(--color-gold);
          color: #0c0d10;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }

        .summer-time {
          font-family: var(--font-eyebrow);
          font-size: 0.85rem;
          color: var(--color-gold-light);
          letter-spacing: 0.05em;
        }

        .hours-row.closed .summer-time {
          color: #e57373;
          font-style: italic;
        }

        .hours-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .hours-footer-seal {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--color-gold);
          flex-shrink: 0;
        }

        .hours-footer p {
          font-size: 0.82rem;
          color: var(--color-washi-dim);
          line-height: 1.6;
        }

        @media (max-width: 960px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .contact-hours {
            padding: 28px 20px;
          }
        }
      `}</style>
    </section>
  );
};
