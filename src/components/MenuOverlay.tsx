import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';
import { MenuSection } from './MenuSection';

interface MenuOverlayProps {
  tab: 'regular' | 'lunch' | null;
  onClose: () => void;
  onOpenReservation: () => void;
}

/** The complete menu (and lunch menu), opened on demand from the Signature section or nav. */
export function MenuOverlay({ tab, onClose, onOpenReservation }: MenuOverlayProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!tab) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [tab, onClose]);

  if (!tab) return null;

  return (
    <div className="menu-overlay" role="dialog" aria-modal="true" aria-label={t.menuTitle}>
      <div className="menu-overlay__bar">
        <Logo />
        <div className="menu-overlay__actions">
          <button className="nav__cta" onClick={() => { onClose(); onOpenReservation(); }}>{t.navBook}</button>
          <button className="round-btn" onClick={onClose} aria-label={t.closeBtn}>✕</button>
        </div>
      </div>
      <MenuSection key={tab} initialTab={tab} />
    </div>
  );
}
