import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content reservation-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Compact Luxury Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-mon-seal">席</span>
            <div className="modal-title-text">
              <div className="modal-title-row">
                <h2>{t.reserveTitle}</h2>
                <span className="engine-pill">
                  <ShieldCheck size={12} className="text-gold" />
                  <span>Gastro.site</span>
                </span>
              </div>
              <p className="modal-subtitle-compact">
                {language === 'de'
                  ? 'Echtzeit-Buchung • Pünktlichkeit sichert optimale Frische & Zubereitungsfolge'
                  : 'Live Booking • Punctual arrival ensures optimal freshness & course progression'}
              </p>
            </div>
          </div>

          <div className="modal-header-actions">
            <a
              href="https://www.gastro.site/reserve?id=BATM49A3abg1y&details=yes"
              target="_blank"
              rel="noopener noreferrer"
              className="open-tab-btn"
              title={t.reserveOpenNewTab}
            >
              <ExternalLink size={14} />
              <span className="open-tab-text">{language === 'de' ? 'Vollbild' : 'Full Screen'}</span>
            </a>
            <button className="close-button" onClick={onClose} aria-label={t.closeBtn}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Iframe container - maximized viewport so no scrolling is needed */}
        <div className="iframe-container">
          {isLoading && (
            <div className="iframe-loader">
              <div className="loader" />
            </div>
          )}
          <iframe
            src="https://www.gastro.site/reserve?id=BATM49A3abg1y&details=yes"
            title="Gastro.site Table Reservation"
            onLoad={() => setIsLoading(false)}
            className={`reservation-iframe ${isLoading ? 'loading' : ''}`}
            allow="payment"
          />
        </div>
      </div>

      <style>{`
        .reservation-modal-content {
          width: 95vw;
          max-width: 980px;
          height: 94vh;
          max-height: 940px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #0d1015;
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.15);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.25);
          background: #090b0e;
          flex-shrink: 0;
          gap: 12px;
        }

        .modal-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .modal-mon-seal {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 1rem;
          color: var(--color-gold);
          background: rgba(212, 175, 55, 0.08);
          flex-shrink: 0;
        }

        .modal-title-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .modal-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .modal-title-row h2 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: #ffffff;
          letter-spacing: 0.02em;
          line-height: 1.2;
          margin: 0;
        }

        .engine-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(212, 175, 55, 0.25);
          background: rgba(212, 175, 55, 0.08);
          color: var(--color-gold-light);
          font-size: 0.68rem;
          font-family: var(--font-eyebrow);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .modal-subtitle-compact {
          font-size: 0.75rem;
          color: var(--color-washi-dim);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .modal-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .open-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(212, 175, 55, 0.25);
          background: rgba(212, 175, 55, 0.06);
          color: var(--color-gold-light);
          font-size: 0.72rem;
          font-family: var(--font-eyebrow);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: var(--transition-fast);
        }

        .open-tab-btn:hover {
          border-color: var(--color-gold);
          color: #ffffff;
          background: rgba(212, 175, 55, 0.15);
        }

        .close-button {
          background: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: var(--color-washi-dim);
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        }

        .close-button:hover {
          color: #ffffff;
          border-color: var(--color-gold);
          background: rgba(212, 175, 55, 0.1);
        }

        .text-gold {
          color: var(--color-gold);
        }

        .iframe-container {
          flex: 1 1 0;
          min-height: 0;
          position: relative;
          background: #ffffff;
          display: flex;
        }

        .iframe-loader {
          position: absolute;
          inset: 0;
          background: #0d1015;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }

        .reservation-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
          transition: opacity 0.3s ease;
        }

        .reservation-iframe.loading {
          opacity: 0;
        }

        @media (max-width: 600px) {
          .reservation-modal-content {
            width: 100vw;
            height: 100vh;
            max-height: 100vh;
            border-radius: 0;
            border: none;
          }

          .modal-header {
            padding: 10px 14px;
          }

          .modal-subtitle-compact {
            display: none;
          }

          .open-tab-text {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
