import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT } from '../lib/hours';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const { t, language } = useLanguage();
  const de = language === 'de';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal modal--booking" onClick={onClose}>
      <div className="booking" role="dialog" aria-modal="true" aria-label={t.reserveTitle} onClick={(e) => e.stopPropagation()}>
        <header className="booking__head">
          <div>
            <h2>{t.reserveTitle}</h2>
            <p>{de ? 'Echtzeit-Buchung über Gastro.site' : 'Live booking via Gastro.site'}</p>
          </div>
          <div className="booking__actions">
            <a className="text-link" href={RESTAURANT.bookingUrl} target="_blank" rel="noopener noreferrer">{t.reserveOpenNewTab} ↗</a>
            <button className="round-btn" onClick={onClose} aria-label={t.closeBtn}>✕</button>
          </div>
        </header>
        <div className="booking__frame">
          {loading && <div className="booking__loading">{de ? 'Wird geladen …' : 'Loading …'}</div>}
          <iframe src={RESTAURANT.bookingUrl} title="Gastro.site Table Reservation" onLoad={() => setLoading(false)} allow="payment" />
        </div>
      </div>
    </div>
  );
}
