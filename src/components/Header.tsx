import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Globe, CalendarDays, Sparkles, Utensils, Sun, Moon } from 'lucide-react';
import logoImg from '../assets/logo.png';

interface HeaderProps {
  onOpenReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReservation }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, menuTab?: 'regular' | 'lunch') => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveNav(targetId + (menuTab ? `-${menuTab}` : ''));

    if (menuTab) {
      window.dispatchEvent(new CustomEvent('switchMenuTab', { detail: menuTab }));
    }

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 95;
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
    <>
      <header className={`floating-header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="floating-navbar glass-card">
          
          {/* Brand Monogram & Live Seal */}
          <a 
            href="#hero" 
            className="navbar-brand" 
            onClick={(e) => handleNavClick(e, 'hero')}
          >
            <div className="navbar-logo-ring">
              <img src={logoImg} className="navbar-logo-img" alt="Kaido Monogram" />
              <span className="navbar-live-dot" title="Live status active" />
            </div>
            <div className="navbar-title-group">
              <span className="navbar-brand-name">KAIDO</span>
              <span className="navbar-brand-kanji">カイ堂 • WIEN</span>
            </div>
          </a>

          {/* 4 Focused Navigation Links */}
          <nav className="navbar-links-track">
            {/* 1. Home */}
            <a 
              href="#hero" 
              className={`nav-pill-item ${activeNav === 'hero' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'hero')}
            >
              <span>{t.navHome}</span>
            </a>

            {/* 2. Speisekarte */}
            <a 
              href="#menu" 
              className={`nav-pill-item ${activeNav === 'menu-regular' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'menu', 'regular')}
            >
              <span>{t.navMenu}</span>
            </a>

            {/* 3. Mittagsmenü (with special highlight indicator) */}
            <a 
              href="#menu" 
              className={`nav-pill-item nav-pill-lunch ${activeNav === 'menu-lunch' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'menu', 'lunch')}
            >
              <Utensils size={12} className="lunch-icon" />
              <span>{t.navLunch}</span>
              <span className="lunch-badge">11–14h</span>
            </a>

            {/* 4. Kontakt */}
            <a 
              href="#contact" 
              className={`nav-pill-item ${activeNav === 'contact' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              <span>{t.navContact}</span>
            </a>
          </nav>

          {/* Right Action Suite */}
          <div className="navbar-actions">
            {/* Day / Night Theme Switcher */}
            <button 
              className="navbar-theme-pill" 
              onClick={toggleTheme} 
              aria-label={theme === 'dark' ? 'Tag-Modus aktivieren' : 'Nacht-Modus aktivieren'}
              title={theme === 'dark' ? (language === 'de' ? 'Heller Tag-Modus' : 'Light Day Mode') : (language === 'de' ? 'Dunkler Nacht-Modus' : 'Dark Night Mode')}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={13} className="theme-sun-icon" />
                  <span className="theme-text">{language === 'de' ? 'TAG' : 'DAY'}</span>
                </>
              ) : (
                <>
                  <Moon size={13} className="theme-moon-icon" />
                  <span className="theme-text">{language === 'de' ? 'NACHT' : 'NIGHT'}</span>
                </>
              )}
            </button>

            {/* Language Switcher with Dual Pill */}
            <button 
              className="navbar-lang-pill" 
              onClick={toggleLanguage} 
              aria-label="Sprache wechseln"
            >
              <Globe size={13} className="lang-globe-icon" />
              <span className={`lang-opt ${language === 'de' ? 'selected' : ''}`}>DE</span>
              <span className="lang-slash">/</span>
              <span className={`lang-opt ${language === 'en' ? 'selected' : ''}`}>EN</span>
            </button>

            {/* High Luxury Reservation CTA */}
            <button 
              className="btn btn-primary navbar-reserve-btn" 
              onClick={onOpenReservation}
            >
              <CalendarDays size={14} />
              <span>{t.navBook}</span>
              <Sparkles size={11} className="reserve-sparkle" />
            </button>

            {/* Mobile Hamburger Menu */}
            <button 
              className="navbar-hamburger" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menü öffnen"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer (4 focused items) */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <div className="mobile-drawer-header">
            <div className="mobile-drawer-brand">
              <span className="mobile-eyebrow">HAUTE JAPANESE DINING</span>
              <h3>KAIDO</h3>
            </div>
            <button className="mobile-nav-close" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={26} />
            </button>
          </div>

          <nav className="mobile-nav-links">
            <a 
              href="#hero" 
              className={activeNav === 'hero' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'hero')}
            >
              <span className="mobile-nav-numeral">01</span>
              <span>{t.navHome}</span>
            </a>
            
            <a 
              href="#menu" 
              className={activeNav === 'menu-regular' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'menu', 'regular')}
            >
              <span className="mobile-nav-numeral">02</span>
              <span>{t.navMenu}</span>
            </a>
            
            <a 
              href="#menu" 
              className={`mobile-lunch-link ${activeNav === 'menu-lunch' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'menu', 'lunch')}
            >
              <span className="mobile-nav-numeral">03</span>
              <span className="mobile-lunch-text">
                {t.navLunch}
                <span className="mobile-lunch-tag">11:00 – 14:00</span>
              </span>
            </a>
            
            <a 
              href="#contact" 
              className={activeNav === 'contact' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              <span className="mobile-nav-numeral">04</span>
              <span>{t.navContact}</span>
            </a>
          </nav>

          <div className="mobile-nav-actions">
            <button className="mobile-theme-btn" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>
                {theme === 'dark' 
                  ? (language === 'de' ? 'Heller Modus (Tag)' : 'Day Mode (Light)') 
                  : (language === 'de' ? 'Dunkler Modus (Nacht)' : 'Night Mode (Dark)')}
              </span>
            </button>

            <button className="mobile-lang-btn" onClick={toggleLanguage}>
              <Globe size={16} />
              <span>{language === 'de' ? 'Sprache: Deutsch (DE)' : 'Language: English (EN)'}</span>
            </button>
            <button 
              className="btn btn-primary w-full" 
              onClick={() => { setIsMobileMenuOpen(false); onOpenReservation(); }}
            >
              <CalendarDays size={16} />
              <span>{t.navBook}</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* Floating Island Wrapper */
        .floating-header-wrapper {
          position: fixed;
          top: 18px;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          padding: 0 24px;
          pointer-events: none;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), top 0.4s ease;
        }

        .floating-header-wrapper.scrolled {
          top: 10px;
        }

        /* Floating Island Navbar Dock */
        .floating-navbar {
          pointer-events: auto;
          width: 100%;
          max-width: 1180px;
          height: 66px;
          padding: 0 20px 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-full);
          background: var(--bg-glass);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--border-color);
          box-shadow: 
            0 14px 40px rgba(0, 0, 0, 0.18),
            0 0 20px var(--color-gold-glow),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          transition: var(--transition-smooth);
        }

        .floating-header-wrapper.scrolled .floating-navbar {
          background: var(--bg-glass-heavy);
          border-color: var(--border-color-hover);
          box-shadow: 
            0 18px 45px rgba(0, 0, 0, 0.25),
            0 0 25px var(--color-gold-glow);
        }

        /* Brand Left */
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .navbar-logo-ring {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          background: var(--bg-secondary);
          box-shadow: 0 0 14px rgba(212, 175, 55, 0.25);
          position: relative;
        }

        .navbar-logo-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .navbar-live-dot {
          position: absolute;
          bottom: 0px;
          right: 0px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #38bdf8;
          border: 1.5px solid #0c0f14;
          box-shadow: 0 0 6px #38bdf8;
        }

        .navbar-title-group {
          display: flex;
          flex-direction: column;
        }

        .navbar-brand-name {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          letter-spacing: 0.2em;
          color: var(--text-primary);
          line-height: 1;
        }

        .navbar-brand-kanji {
          font-family: var(--font-eyebrow);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          color: var(--color-gold-muted);
          margin-top: 2px;
        }

        /* Center Pill Track (4 items) */
        .navbar-links-track {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 5px 6px;
          border-radius: var(--radius-full);
        }

        .nav-pill-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 18px;
          border-radius: var(--radius-full);
          font-family: var(--font-eyebrow);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-secondary);
          transition: var(--transition-smooth);
          position: relative;
        }

        .nav-pill-item:hover {
          color: var(--text-primary);
          background: rgba(212, 175, 55, 0.12);
        }

        .nav-pill-item.active {
          color: #0c0d10;
          background: linear-gradient(135deg, #d4af37 0%, #bfa15f 100%);
          font-weight: 600;
          box-shadow: 0 2px 14px rgba(212, 175, 55, 0.35);
        }

        /* Special Mittagsmenü Accent */
        .nav-pill-lunch {
          border: 1px solid rgba(212, 175, 55, 0.25);
          background: rgba(212, 175, 55, 0.05);
          color: var(--color-gold-light);
        }

        .nav-pill-lunch:hover {
          background: rgba(212, 175, 55, 0.16);
          border-color: var(--color-gold);
        }

        .lunch-icon {
          color: var(--color-gold);
          opacity: 0.85;
        }

        .lunch-badge {
          font-family: var(--font-eyebrow);
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          padding: 2px 6px;
          border-radius: var(--radius-full);
          background: rgba(212, 175, 55, 0.2);
          color: var(--color-gold-light);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .nav-pill-lunch.active .lunch-badge {
          background: rgba(0, 0, 0, 0.25);
          color: #0c0d10;
          border-color: transparent;
        }

        .nav-pill-lunch.active .lunch-icon {
          color: #0c0d10;
        }

        /* Right Actions */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .navbar-theme-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(212, 175, 55, 0.25);
          background: rgba(18, 22, 29, 0.7);
          cursor: pointer;
          font-family: var(--font-eyebrow);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--color-gold-light);
          transition: var(--transition-fast);
        }

        .navbar-theme-pill:hover {
          border-color: var(--color-gold);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .theme-sun-icon {
          color: #f59e0b;
        }

        .theme-moon-icon {
          color: var(--color-gold);
        }

        .theme-text {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
        }

        .navbar-lang-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(212, 175, 55, 0.25);
          background: rgba(18, 22, 29, 0.7);
          cursor: pointer;
          font-family: var(--font-eyebrow);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: var(--color-washi-dim);
          transition: var(--transition-fast);
        }

        .navbar-lang-pill:hover {
          border-color: var(--color-gold);
          color: #ffffff;
        }

        .lang-globe-icon {
          color: var(--color-gold);
        }

        .lang-opt.selected {
          color: var(--color-gold);
          font-weight: 700;
        }

        .lang-slash {
          opacity: 0.3;
        }

        .navbar-reserve-btn {
          padding: 9px 20px;
          font-size: 0.74rem;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 18px rgba(212, 175, 55, 0.28);
        }

        .reserve-sparkle {
          opacity: 0.75;
        }

        .navbar-hamburger {
          display: none;
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 6px;
        }

        /* Mobile Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 320px;
          height: 100vh;
          background: rgba(9, 11, 15, 0.98);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          z-index: 1000;
          border-left: 1px solid rgba(212, 175, 55, 0.25);
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -20px 0 50px rgba(0, 0, 0, 0.85);
        }

        .mobile-nav-drawer.open {
          right: 0;
        }

        .mobile-nav-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 32px 28px;
        }

        .mobile-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          padding-bottom: 20px;
        }

        .mobile-eyebrow {
          font-family: var(--font-eyebrow);
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          color: var(--color-gold);
          display: block;
          margin-bottom: 4px;
        }

        .mobile-drawer-brand h3 {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: #ffffff;
          letter-spacing: 0.2em;
        }

        .mobile-nav-close {
          background: none;
          border: none;
          color: var(--color-washi-dim);
          cursor: pointer;
          padding: 4px;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 22px;
          margin-bottom: auto;
        }

        .mobile-nav-links a {
          display: flex;
          align-items: baseline;
          gap: 16px;
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--color-washi-dim);
          letter-spacing: 0.05em;
          transition: var(--transition-fast);
        }

        .mobile-nav-links a:hover,
        .mobile-nav-links a.active {
          color: var(--color-gold);
          padding-left: 6px;
        }

        .mobile-nav-numeral {
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          color: var(--color-gold);
          letter-spacing: 0.15em;
        }

        .mobile-lunch-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-lunch-tag {
          font-family: var(--font-eyebrow);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: var(--color-gold-light);
          opacity: 0.8;
        }

        .mobile-nav-actions {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .mobile-theme-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(212, 175, 55, 0.25);
          background: rgba(18, 22, 29, 0.6);
          color: var(--color-gold-light);
          font-family: var(--font-eyebrow);
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .mobile-theme-btn:hover {
          border-color: var(--color-gold);
          color: #ffffff;
        }

        .mobile-lang-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(212, 175, 55, 0.2);
          background: rgba(18, 22, 29, 0.6);
          color: var(--color-gold-light);
          font-family: var(--font-eyebrow);
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          cursor: pointer;
        }

        /* Responsive Breakpoints */
        @media (max-width: 980px) {
          .navbar-links-track,
          .navbar-reserve-btn {
            display: none;
          }
          .navbar-hamburger {
            display: block;
          }
          .floating-navbar {
            padding: 0 16px 0 18px;
            height: 58px;
          }
          .navbar-brand-name {
            font-size: 1.18rem;
            letter-spacing: 0.16em;
          }
          .navbar-brand-kanji {
            font-size: 0.54rem;
            letter-spacing: 0.18em;
          }
        }

        @media (max-width: 768px) {
          .floating-header-wrapper {
            top: 8px;
            padding: 0 12px;
          }
          .floating-navbar {
            height: 50px;
            padding: 0 12px 0 14px;
          }
          .navbar-logo-ring {
            width: 30px;
            height: 30px;
          }
          .navbar-logo-img {
            width: 24px;
            height: 24px;
          }
          .navbar-brand-name {
            font-size: 0.98rem;
            letter-spacing: 0.12em;
          }
          .mobile-nav-content {
            padding: 22px 18px;
          }
          .mobile-drawer-header {
            margin-bottom: 24px;
            padding-bottom: 14px;
          }
          .mobile-drawer-brand h3 {
            font-size: 1.25rem;
            letter-spacing: 0.14em;
          }
          .mobile-eyebrow {
            font-size: 0.54rem;
            letter-spacing: 0.2em;
          }
          .mobile-nav-links {
            gap: 14px;
          }
          .mobile-nav-links a {
            font-size: 0.92rem;
            letter-spacing: 0.03em;
            gap: 10px;
          }
          .mobile-nav-numeral {
            font-size: 0.58rem;
          }
          .mobile-lunch-tag {
            font-size: 0.54rem;
          }
          .mobile-nav-actions {
            gap: 8px;
          }
          .mobile-theme-btn,
          .mobile-lang-btn {
            padding: 9px;
            font-size: 0.66rem;
            letter-spacing: 0.08em;
          }
          .mobile-nav-actions .btn {
            padding: 10px 16px;
            font-size: 0.68rem;
            letter-spacing: 0.12em;
          }
        }
      `}</style>
    </>
  );
};
