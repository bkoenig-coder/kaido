import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenReservation: () => void;
  onOpenMenu: (tab?: 'regular' | 'lunch') => void;
}

const LINKS = [
  { id: 'gallery', de: 'Galerie', en: 'Gallery' },
  { id: 'signature', de: 'Signature', en: 'Signature' },
  { id: 'menu', tab: 'regular' as const, de: 'Speisekarte', en: 'Menu' },
  { id: 'menu', tab: 'lunch' as const, de: 'Mittagsmenü', en: 'Lunch' },
  { id: 'visit', de: 'Besuch', en: 'Visit' },
];

/** Hides while scrolling down, returns when scrolling up. */
export function Header({ onOpenReservation, onOpenMenu }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 300 && y > last.current + 4);
      if (y < last.current - 4 || y < 300) setHidden(false);
      last.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string, tab?: 'regular' | 'lunch') => {
    setOpen(false);
    if (id === 'menu') onOpenMenu(tab);
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const reserve = () => {
    setOpen(false);
    onOpenReservation();
  };

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${hidden && !open ? 'nav--hidden' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner">
        <button className="nav__logo" onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Kaido">
          <Logo />
        </button>
        <nav className="nav__links" aria-label="Main">
          {LINKS.map((l) => (
            <button key={l.de} className="nav__link" onClick={() => go(l.id, l.tab)}>
              <span>{language === 'de' ? l.de : l.en}</span>
            </button>
          ))}
          <button className="btn btn--primary nav__mobile-cta" onClick={reserve}>{t.navBook}</button>
        </nav>
        <div className="nav__right">
          <button className="lang" onClick={() => setLanguage(language === 'de' ? 'en' : 'de')} aria-label="Language">
            <b>{language === 'de' ? 'DE' : 'EN'}</b> / {language === 'de' ? 'EN' : 'DE'}
          </button>
          <button className="nav__cta" onClick={reserve} data-magnetic>{language === 'de' ? 'Reservieren' : 'Reserve'}</button>
          <button className="nav__burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
