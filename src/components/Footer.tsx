import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ArrowUp } from 'lucide-react';
import logoImg from '../assets/logo.png';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeLegalModal, setActiveLegalModal] = useState<'imprint' | 'privacy' | 'revocation' | null>(null);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const closeModal = () => setActiveLegalModal(null);

  return (
    <>
      <footer className="footer-section">
        <div className="footer-container container">
          {/* Brand Col */}
          <div className="footer-brand">
            <div className="logo logo-footer">
              <img src={logoImg} className="logo-img" alt="Kaido Logo" />
              <span className="logo-text">KAIDO</span>
            </div>
            <p className="brand-motto">
              {language === 'de' 
                ? 'Traditionelle japanische Kunst trifft auf moderne Gemütlichkeit im Herzen Wiens.' 
                : 'Traditional Japanese art meets modern coziness in the heart of Vienna.'}
            </p>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Contact Summary Col */}
          <div className="footer-contact">
            <h3>{language === 'de' ? 'Adresse' : 'Location'}</h3>
            <p>Rotensterngasse 3</p>
            <p>A-1020 Wien</p>
            <p className="mt-8">sushibarkaido@gmail.com</p>
          </div>

          {/* Legal / Quicklinks Col */}
          <div className="footer-links">
            <h3>{language === 'de' ? 'Rechtliches' : 'Legal'}</h3>
            <button onClick={() => setActiveLegalModal('imprint')}>{t.legalImprint}</button>
            <button onClick={() => setActiveLegalModal('privacy')}>{t.legalPrivacy}</button>
            <button onClick={() => setActiveLegalModal('revocation')}>{t.legalRevocation}</button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="container footer-bottom-container">
            <p>{t.copyright}</p>
            <button className="scroll-to-top" onClick={handleScrollToTop} aria-label="Scroll to top">
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </footer>

      {/* LEGAL MODALS */}
      {activeLegalModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content legal-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {activeLegalModal === 'imprint' && t.legalImprint}
                {activeLegalModal === 'privacy' && t.legalPrivacy}
                {activeLegalModal === 'revocation' && t.legalRevocation}
              </h2>
              <button className="close-button" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            
            <div className="legal-text-body">
              {/* IMPRESSUM CONTENT */}
              {activeLegalModal === 'imprint' && (
                <div className="legal-markdown">
                  <h3>Kaido KG</h3>
                  <p>Rotensterngasse 3, 1020 Wien, Österreich</p>
                  
                  <h4>Kontakt</h4>
                  <p>Telefon: +43 660 910 88 18</p>
                  <p>E-Mail: sushibarkaido@gmail.com</p>
                  
                  <h4>Firmenbuchdaten</h4>
                  <p>Firmenbuchnummer: FN 583887 h</p>
                  <p>Firmenbuchgericht: Handelsgericht Wien</p>
                  
                  <h4>Kammerzugehörigkeit</h4>
                  <p>Wirtschaftskammer Wien, Fachgruppe Gastronomie</p>
                  
                  <h4>Aufsichtsbehörde</h4>
                  <p>Magistrat der Stadt Wien</p>

                  <h4>Gewerbe- und berufsrechtliche Vorschriften</h4>
                  <p>Gewerbeordnung (GewO) – abrufbar unter www.ris.bka.gv.at</p>
                  
                  <h4>Haftungsausschluss</h4>
                  <p>Diese Website enthält Verweise (Links) auf Websites Dritter. Für den Inhalt dieser verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
                </div>
              )}

              {/* PRIVACY POLICY CONTENT */}
              {activeLegalModal === 'privacy' && (
                <div className="legal-markdown">
                  <h3>Datenschutzerklärung (GDPR)</h3>
                  <p>Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).</p>
                  
                  <h4>1. Datenerfassung bei Tischreservierungen</h4>
                  <p>Wenn Sie über den auf unserer Website integrierten Gastro.site-Dienst einen Tisch reservieren, werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, Telefonnummer, Datum, Uhrzeit, Personenanzahl) direkt an Gastro.site übermittelt und zur Durchführung der Reservierung verarbeitet. Details zur dortigen Datenverarbeitung entnehmen Sie bitte der Datenschutzerklärung von Gastro.site.</p>
                  
                  <h4>2. Cookies und Webanalyse</h4>
                  <p>Unsere Website verwendet Cookies zur Speicherung von Spracheinstellungen und Reservierungspräferenzen. Wenn Sie Ihre Zustimmung geben, nutzen wir anonymisierte Webanalyse-Cookies, um die Leistung unserer Seite zu bewerten.</p>
                  
                  <h4>3. Ihre Rechte</h4>
                  <p>Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenden Sie sich hierzu bitte an sushibarkaido@gmail.com.</p>
                </div>
              )}

              {/* REVOCATION POLICY CONTENT */}
              {activeLegalModal === 'revocation' && (
                <div className="legal-markdown">
                  <h3>Widerrufsbelehrung</h3>
                  <p>Verbraucher haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
                  
                  <h4>Widerrufsrecht bei Tischreservierungen</h4>
                  <p>Bitte beachten Sie, dass eine Tischreservierung eine Dienstleistung im Zusammenhang mit Freizeitbetätigungen zu einem spezifischen Termin darstellt. Gemäß § 18 Abs. 1 Z 10 FAGG besteht für solche Dienstleistungen kein gesetzliches Widerrufsrecht.</p>
                  
                  <h4>Stornierungsbedingungen</h4>
                  <p>Falls Sie Ihre Reservierung nicht wahrnehmen können, bitten wir Sie, uns mindestens 2 Stunden vorher telefonisch unter +43 660 910 88 18 zu informieren, damit wir den Tisch wieder freigeben können. Vielen Dank für Ihr Verständnis.</p>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={closeModal}>
                {t.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .footer-section {
          background: #0c2d33; /* Deep teal to match the logo background */
          border-top: 1px solid var(--border-color);
          padding: 60px 0 0;
          color: #beb8ab; /* Light readable gray on dark background */
        }

        .footer-container {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .logo-footer {
          font-size: 1.8rem;
        }

        .logo-footer .logo-text {
          color: #ffffff;
        }

        .brand-motto {
          font-size: 0.9rem;
          line-height: 1.6;
          max-width: 320px;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }

        .social-links a:hover {
          border-color: var(--accent-gold);
          color: var(--accent-gold);
          background: rgba(212, 175, 55, 0.05);
          box-shadow: 0 0 10px var(--accent-gold-glow);
        }

        .footer-contact h3,
        .footer-links h3 {
          font-family: var(--font-heading);
          color: #faf8f5; /* Light readable headlines */
          font-size: 1.1rem;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .footer-contact p {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #beb8ab;
        }

        .mt-8 {
          margin-top: 8px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .footer-links button {
          font-size: 0.9rem;
          color: #beb8ab;
          cursor: pointer;
          background: none;
          border: none;
          text-align: left;
          transition: var(--transition-fast);
        }

        .footer-links button:hover {
          color: var(--accent-gold);
          padding-left: 4px;
        }

        /* Bottom bar */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.02);
          padding: 24px 0;
          font-size: 0.8rem;
        }

        .footer-bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .scroll-to-top {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #beb8ab;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .scroll-to-top:hover {
          border-color: var(--accent-gold);
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          background: rgba(212, 175, 55, 0.05);
        }

        /* Legal Modal */
        .legal-modal-content {
          max-width: 600px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
        }

        .legal-text-body {
          padding: 24px;
          overflow-y: auto;
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .legal-markdown h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .legal-markdown h4 {
          font-size: 1rem;
          margin: 20px 0 6px;
          color: var(--text-primary);
        }

        .legal-markdown p {
          margin-bottom: 12px;
        }

        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: flex-end;
          background: var(--bg-tertiary);
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .footer-bottom-container {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};
