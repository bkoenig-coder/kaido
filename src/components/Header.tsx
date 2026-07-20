import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe, CalendarDays } from 'lucide-react';
import logoImg from '../assets/logo.png';

interface HeaderProps {
  onOpenReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReservation }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of sticky header
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
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container container">
          {/* Logo */}
          <a href="#hero" className="logo" onClick={(e) => handleNavLinkClick(e, 'hero')}>
            <img src={logoImg} className="logo-img" alt="Kaido Logo" />
            <span className="logo-text">KAIDO</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <a href="#hero" onClick={(e) => handleNavLinkClick(e, 'hero')}>{t.navHome}</a>
            <a href="#gallery" onClick={(e) => handleNavLinkClick(e, 'gallery')}>{language === 'de' ? 'Galerie' : 'Gallery'}</a>
            <a href="#menu" onClick={(e) => handleNavLinkClick(e, 'menu')}>{t.navMenu}</a>
            <a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')}>{t.navContact}</a>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            {/* Language Switcher */}
            <button className="lang-switcher" onClick={toggleLanguage} aria-label="Toggle language">
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Reservation Button */}
            <button className="btn btn-primary btn-header" onClick={onOpenReservation}>
              <CalendarDays size={18} />
              <span>{t.navBook}</span>
            </button>

            {/* Hamburger Button */}
            <button 
              className="hamburger" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <button className="mobile-nav-close" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={28} />
          </button>
          <nav className="mobile-nav-links">
            <a href="#hero" onClick={(e) => handleNavLinkClick(e, 'hero')}>{t.navHome}</a>
            <a href="#menu" onClick={(e) => handleNavLinkClick(e, 'menu')}>{t.navMenu}</a>
            <a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')}>{t.navContact}</a>
          </nav>
          <div className="mobile-nav-actions">
            <button className="lang-switcher" onClick={toggleLanguage}>
              <Globe size={20} />
              <span>{language.toUpperCase()}</span>
            </button>
            <button className="btn btn-primary w-full" onClick={() => { setIsMobileMenuOpen(false); onOpenReservation(); }}>
              <CalendarDays size={18} />
              <span>{t.navBook}</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          z-index: 100;
          display: flex;
          align-items: center;
          transition: var(--transition-smooth);
          background: var(--color-teal); /* Same deep teal as logo and footer */
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
        }
        
        .header.scrolled {
          height: 70px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 1.6rem;
          letter-spacing: 0.1em;
          color: var(--text-primary);
        }

        .logo-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid var(--accent-gold);
          object-fit: cover;
          box-shadow: 0 0 12px rgba(192, 57, 43, 0.25);
        }

        .logo-text {
          font-family: var(--font-heading);
          color: #ffffff;
          transition: var(--transition-smooth);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 36px;
        }

        .desktop-nav a {
          font-size: 0.95rem;
          font-weight: 600; /* Make it more appearing and legible */
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.85); /* Bright white over dark hero */
          position: relative;
          padding: 6px 0;
          transition: var(--transition-smooth);
        }

        .desktop-nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent-gold);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }

        .desktop-nav a:hover {
          color: #ffffff;
        }

        .desktop-nav a:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .lang-switcher {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.05);
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.85);
          transition: var(--transition-smooth);
        }
        
        .lang-switcher:hover {
          border-color: #ffffff;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        .btn-header {
          padding: 8px 18px;
          font-size: 0.85rem;
        }

        .hamburger {
          display: none;
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 4px;
          transition: var(--transition-smooth);
        }

        /* Scrolled Header Overrides */
        .header.scrolled .lang-switcher:hover {
          border-color: #ffffff;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Mobile Menu Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 300px;
          height: 100vh;
          background: var(--bg-glass-heavy);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 1000;
          border-left: 1px solid var(--border-color);
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
        }

        .mobile-nav-drawer.open {
          right: 0;
        }

        .mobile-nav-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 40px 30px;
        }

        .mobile-nav-close {
          align-self: flex-end;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          margin-bottom: 40px;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: auto;
        }

        .mobile-nav-links a {
          font-size: 1.3rem;
          font-family: var(--font-heading);
          font-weight: 500;
          color: var(--text-secondary);
        }

        .mobile-nav-links a:hover {
          color: var(--accent-gold);
          padding-left: 6px;
        }

        .mobile-nav-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-nav-actions .lang-switcher {
          justify-content: center;
          padding: 12px;
        }

        .w-full {
          width: 100%;
        }

        @media (max-width: 900px) {
          .desktop-nav,
          .btn-header {
            display: none;
          }
          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
};
