import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { LottieAnimation } from './LottieAnimation';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content reservation-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-title-text">
              <h2>{t.reserveTitle}</h2>
              <p>{t.reserveSubtitle}</p>
            </div>
            <div className="modal-lottie-container">
              <LottieAnimation 
                url="https://lottie.host/6aa43497-0225-40b5-91f2-08d1dd962dfe/7DRsVryMxt.json" 
                width="48px" 
                height="48px" 
              />
            </div>
          </div>
          <button className="close-button" onClick={onClose} aria-label={t.closeBtn}>
            <X size={24} />
          </button>
        </div>

        {/* Secure badge */}
        <div className="secure-badge">
          <ShieldCheck size={16} className="text-teal" />
          <span>Secure reservation powered by Gastro.site</span>
        </div>

        {/* Iframe container */}
        <div className="iframe-container">
          {isLoading && (
            <div className="iframe-loader">
              <div className="loader"></div>
            </div>
          )}
          <iframe
            src="https://www.gastro.site/reserve?id=BATM49A3abg1y&details=yes"
            title="Gastro.site Table Reservation"
            onLoad={() => setIsLoading(false)}
            className={`reservation-iframe ${isLoading ? 'loading' : ''}`}
            allow="payment"
          ></iframe>
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
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <style>{`
        .reservation-modal-content {
          max-width: 650px;
          height: 85vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .modal-title-text {
          display: flex;
          flex-direction: column;
        }

        .modal-lottie-container {
          flex-shrink: 0;
          background: var(--bg-secondary);
          padding: 4px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
        }

        .modal-header h2 {
          font-size: 1.5rem;
          margin-bottom: 4px;
        }

        .modal-header p {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .close-button {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 4px;
          border-radius: var(--radius-sm);
        }

        .close-button:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.05);
        }

        .secure-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          background: rgba(46, 196, 182, 0.05);
          border-bottom: 1px solid var(--border-color);
          padding: 8px 24px;
        }

        .text-teal {
          color: var(--color-matcha);
        }

        .iframe-container {
          flex-grow: 1;
          position: relative;
          background: #ffffff; /* White background for the gastro.site light form */
        }

        .iframe-loader {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--bg-secondary);
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
          padding: 16px 24px 24px;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
};
