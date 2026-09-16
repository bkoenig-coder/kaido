import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ArrowUp, ExternalLink, Award } from 'lucide-react';
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
            <div className="logo-footer">
              <div className="logo-ring-footer">
                <img src={logoImg} className="logo-img" alt="Kaido Monogram" />
              </div>
              <div className="logo-titles">
                <span className="logo-text">KAIDO</span>
                <span className="logo-subtext">カイ堂 • HAUTE DINING WIEN</span>
              </div>
            </div>

            <p className="brand-motto">
              {language === 'de' 
                ? 'Authentisches Sushi, frische warme Gerichte und japanische Spezialitäten im 2. Bezirk in Wien — frisch zubereitet mit höchstem Qualitätsanspruch.' 
                : 'Authentic sushi, fresh hot dishes, and Japanese specialties in Vienna’s 2nd district — freshly prepared with superior quality.'}
            </p>

            {/* Distinction Link */}
            <a
              href="https://de.restaurantguru.com/Kaido-Sushi-Bar-Vienna?utm_source=rg_certificate9"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-distinction-link"
            >
              <Award size={15} />
              <span>Recommended on Restaurant Guru 2023</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Location Summary Col */}
          <div className="footer-contact">
            <h4>{language === 'de' ? 'Residenz & Atelier' : 'Residence & Atelier'}</h4>
            <p className="footer-address">Rotensterngasse 3</p>
            <p className="footer-address">A-1020 Wien • Leopoldstadt</p>
            <p className="footer-meta">sushibarkaido@gmail.com</p>
            <p className="footer-meta">Takeaway: 01 212 60 76</p>
            <p className="footer-meta">Mobil: +43 (0) 660 910 88 18</p>
          </div>

          {/* Legal / Discretion Col */}
          <div className="footer-links">
            <h4>{language === 'de' ? 'Rechtliches & Diskretion' : 'Legal & Discretion'}</h4>
            <button onClick={() => setActiveLegalModal('imprint')}>{t.legalImprint}</button>
            <button onClick={() => setActiveLegalModal('privacy')}>{t.legalPrivacy}</button>
            <button onClick={() => setActiveLegalModal('revocation')}>{t.legalRevocation}</button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="container footer-bottom-container">
            <p>{t.copyright}</p>
            <button className="scroll-to-top" onClick={handleScrollToTop} aria-label="Nach oben scrollen">
              <ArrowUp size={15} />
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
              <button className="close-button" onClick={closeModal} aria-label={t.closeBtn}>
                <X size={24} />
              </button>
            </div>

            <div className="legal-body">
              {activeLegalModal === 'imprint' && (
                <div className="legal-text-block">
                  <h3>Impressum</h3>
                  <p><strong>Kaido KG</strong></p>
                  <p>Rotensterngasse 3</p>
                  <p>A-1020 Wien</p>
                  <br />
                  <p><strong>E-Mail:</strong> <a href="mailto:sushibarkaido@gmail.com" style={{ color: 'var(--color-gold-light)', textDecoration: 'underline' }}>sushibarkaido@gmail.com</a></p>
                  <p><strong>FN:</strong> 583887 h, Handelsgericht Wien</p>
                  <p><strong>Kammerzugehörigkeit:</strong> Wirtschaftskammer Wien, Fachgruppe Gastronomie</p>
                  <p><strong>Anzuwendende Rechtsvorschriften (u.a.):</strong> Gewerbeordnung (einsehbar unter <a href="http://www.ris.bka.gv.at/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold-light)', textDecoration: 'underline' }}>www.ris.bka.gv.at</a>)</p>
                  <p><strong>Zuständige Gewerbebehörde:</strong> Magistrat der Stadt Wien</p>
                  <br />
                  <p>
                    Verbraucher haben die Möglichkeit, Beschwerden an die Online-Streitbeilegungsplattform der EU zu richten:{' '}
                    <a href="http://ec.europa.eu/odr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold-light)', textDecoration: 'underline' }}>
                      http://ec.europa.eu/odr
                    </a>
                    . Sie können allfällige Beschwerde auch an die oben angegebene E-Mail-Adresse richten.
                  </p>
                </div>
              )}

              {activeLegalModal === 'privacy' && (
                <div className="legal-text-block">
                  <h3>Datenschutzerklärung (DSGVO)</h3>
                  <p>Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).</p>
                  <h4>1. Tischreservierungen</h4>
                  <p>Zur Abwicklung Ihrer Reservierung binden wir das gesicherte Reservierungsmodul von Gastro.site ein. Daten wie Name, Personenanzahl und Kontaktnummer werden streng zweckgebunden zur Organisation Ihres Besuches erhoben.</p>
                  <h4>2. Ihre Rechte</h4>
                  <p>Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu.</p>
                </div>
              )}

              {activeLegalModal === 'revocation' && (
                <div className="legal-text-block">
                  <h3>Widerrufsbelehrung</h3>
                  <h4>Stornierung von Tischreservierungen</h4>
                  <p>Reservierungen können bis zu 2 Stunden vor Beginn des gebuchten Zeitfensters kostenfrei über den Bestätigungslink oder telefonisch storniert werden.</p>
                  <h4>Speisenbestellungen</h4>
                  <p>Gemäß § 18 Abs. 1 Z 3 FAGG besteht kein Rücktrittsrecht bei Waren, die schnell verderben können oder deren Verfallsdatum schnell überschritten würde (frische Sushi- und Küchengerichte).</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .footer-section {
          background: var(--color-sumi-black);
          border-top: 1px solid var(--border-color);
          padding: 80px 0 0;
          position: relative;
          transition: background-color 0.35s ease;
        }

        .footer-container {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 60px;
        }

        .logo-footer {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
        }

        .logo-ring-footer {
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          border-radius: 50%;
          border: 1.5px solid var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          background: var(--bg-secondary);
          box-shadow: 0 0 14px rgba(212, 175, 55, 0.25);
          overflow: hidden;
          flex-shrink: 0;
        }

        .logo-ring-footer .logo-img,
        .logo-footer .logo-img,
        .logo-img {
          width: 36px;
          height: 36px;
          max-width: 100%;
          max-height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        .logo-titles {
          display: flex;
          flex-direction: column;
        }

        .logo-text {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--text-primary);
          letter-spacing: 0.22em;
          line-height: 1;
        }

        .logo-subtext {
          font-family: var(--font-eyebrow);
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          color: var(--color-gold-light);
          margin-top: 4px;
        }

        .brand-motto {
          color: var(--color-washi-dim);
          font-size: 0.92rem;
          line-height: 1.8;
          max-width: 440px;
          margin-bottom: 22px;
          font-weight: 300;
        }

        .footer-distinction-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(212, 175, 55, 0.25);
          background: rgba(212, 175, 55, 0.05);
          color: var(--color-gold-light);
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: var(--transition-fast);
        }

        .footer-distinction-link:hover {
          border-color: var(--color-gold);
          color: #ffffff;
        }

        .footer-contact h4,
        .footer-links h4 {
          font-family: var(--font-eyebrow);
          font-size: 0.78rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 20px;
        }

        .footer-address {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .footer-meta {
          font-size: 0.88rem;
          color: var(--color-washi-dim);
          margin-top: 8px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .footer-links button {
          color: var(--color-washi-dim);
          font-size: 0.9rem;
          font-weight: 300;
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 2px 0;
        }

        .footer-links button:hover {
          color: var(--color-gold);
          padding-left: 4px;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 24px 0;
        }

        .footer-bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-bottom p {
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }

        .scroll-to-top {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.3);
          background: rgba(16, 19, 25, 0.6);
          color: var(--color-gold-light);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .scroll-to-top:hover {
          border-color: var(--color-gold);
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* Legal Modal */
        .legal-modal-content {
          max-width: 720px;
          background: #0d1015;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .legal-body {
          padding: 30px;
          max-height: 65vh;
          overflow-y: auto;
        }

        .legal-text-block h3 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .legal-text-block h4 {
          font-family: var(--font-eyebrow);
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          color: var(--color-gold);
          margin: 20px 0 8px;
        }

        .legal-text-block p {
          font-size: 0.92rem;
          color: var(--color-washi-dim);
          line-height: 1.7;
          margin-bottom: 10px;
        }

        @media (max-width: 900px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 768px) {
          .footer-section {
            padding: 40px 0 0;
          }
          .footer-container {
            padding-bottom: 28px;
            gap: 22px;
          }
          .logo-text {
            font-size: 1.05rem;
            letter-spacing: 0.14em;
          }
          .logo-subtext {
            font-size: 0.52rem;
          }
          .brand-motto {
            font-size: 0.72rem;
            line-height: 1.5;
            margin-bottom: 12px;
          }
          .footer-distinction-link {
            padding: 5px 12px;
            font-size: 0.6rem;
          }
          .footer-contact h4,
          .footer-links h4 {
            font-size: 0.62rem;
            letter-spacing: 0.12em;
            margin-bottom: 10px;
          }
          .footer-address {
            font-size: 0.82rem;
          }
          .footer-meta {
            font-size: 0.68rem;
          }
          .footer-links {
            gap: 6px;
          }
          .footer-links button {
            font-size: 0.72rem;
          }
          .footer-bottom {
            padding: 14px 0;
          }
          .footer-bottom p {
            font-size: 0.56rem;
            letter-spacing: 0.06em;
          }
          .legal-body {
            padding: 16px 14px;
          }
          .legal-text-block h3 {
            font-size: 1.1rem;
          }
          .legal-text-block h4 {
            font-size: 0.68rem;
          }
          .legal-text-block p {
            font-size: 0.74rem;
            line-height: 1.48;
          }
        }
      `}</style>
    </>
  );
};
