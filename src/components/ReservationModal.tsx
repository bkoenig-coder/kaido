import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

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
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-mon-seal">席</span>
            <div className="modal-title-text">
              <h2>{t.reserveTitle}</h2>
              <p>{t.reserveSubtitle}</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose} aria-label={t.closeBtn}>
            <X size={24} />
          </button>
        </div>

        {/* Concierge Protocol Notice */}
        <div className="etiquette-notice">
          <Sparkles size={14} className="text-gold" />
          <span>
            {language === 'de'
              ? 'Pünktlichkeit sichert den optimalen Ablauf der Schnitt- und Zubereitungsfolge.'
              : 'Punctual arrival ensures the deliberate progression of each culinary course.'}
          </span>
        </div>

        {/* Secure badge */}
        <div className="secure-badge">
          <ShieldCheck size={15} className="text-gold" />
          <span>Diskrete Online-Reservierung via Gastro.site Engine</span>
        </div>

        {/* Iframe container */}
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

        {/* Fallback instructions */}
        <div className="iframe-fallback">
          <p>{t.reserveFallback}</p>
          <a
            href="https://www.gastro.site/reserve?id=BATM49A3abg1y&details=yes"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <span>{t.reserveOpenNewTab}</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <style>{`
        .reservation-modal-content {
          max-width: 680px;
          height: 88vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #0d1015;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 28px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          background: #090b0e;
        }

        .modal-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .modal-mon-seal {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--color-gold);
          background: rgba(212, 175, 55, 0.08);
          flex-shrink: 0;
        }

        .modal-title-text h2 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: #ffffff;
          letter-spacing: 0.02em;
          margin-bottom: 2px;
        }

        .modal-title-text p {
          font-size: 0.88rem;
          color: var(--color-washi-dim);
        }

        .close-button {
          background: none;
          border: none;
          color: var(--color-washi-dim);
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 6px;
        }

        .close-button:hover {
          color: #ffffff;
        }

        .etiquette-notice {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-gold-light);
          background: rgba(212, 175, 55, 0.06);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          padding: 8px 28px;
        }

        .secure-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.76rem;
          color: var(--color-washi-dim);
          background: rgba(14, 17, 22, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 8px 28px;
        }

        .text-gold {
          color: var(--color-gold);
        }

        .iframe-container {
          flex-grow: 1;
          position: relative;
          background: #ffffff;
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
          transition: opacity 0.3s ease;
        }

        .reservation-iframe.loading {
          opacity: 0;
        }

        .iframe-fallback {
          padding: 16px 28px 22px;
          background: #090b0e;
          border-top: 1px solid rgba(212, 175, 55, 0.18);
          text-align: center;
          font-size: 0.84rem;
          color: var(--color-washi-dim);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .btn-sm {
          padding: 8px 20px;
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
};
