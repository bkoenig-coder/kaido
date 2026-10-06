import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT } from '../lib/hours';
import { Logo } from './Logo';
import certImg from '../assets/gallery/Certificate.jpeg';

type Legal = 'imprint' | 'privacy' | 'revocation';

interface FooterProps {
  onOpenReservation: () => void;
}

export function Footer({ onOpenReservation }: FooterProps) {
  const { t, language } = useLanguage();
  const de = language === 'de';
  const [legal, setLegal] = useState<Legal | null>(null);

  useEffect(() => {
    if (!legal) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLegal(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [legal]);

  const link = { color: 'inherit', textDecoration: 'underline' } as const;

  return (
    <>
      <footer className="footer">
        <div className="container footer__top">
          <div className="footer__brand">
            <Logo large />
            <p className="footer__tag">{de ? 'Frisches Sushi & japanische Küche in Wien.' : 'Fresh sushi & Japanese kitchen in Vienna.'}</p>
            <a className="footer__cert" href={RESTAURANT.guruUrl} target="_blank" rel="noopener noreferrer" aria-label="Restaurant Guru 2023 Recommended">
              <img src={certImg} alt="Restaurant Guru 2023 – Kaido Sushi Bar Recommended" loading="lazy" />
              <span>{de ? 'Urkunde' : 'Certificate'}<br />Restaurant Guru 2023</span>
            </a>
          </div>
          <div className="footer__cols">
            <div>
              <h4>{de ? 'Besuch' : 'Visit'}</h4>
              <button onClick={onOpenReservation}>{t.navBook}</button>
              <a href={RESTAURANT.mapsUrl} target="_blank" rel="noopener noreferrer">Rotensterngasse 3</a>
              <span>A-1020 Wien</span>
            </div>
            <div>
              <h4>{de ? 'Kontakt' : 'Contact'}</h4>
              <a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a>
              <a href={RESTAURANT.phoneHref}>{RESTAURANT.phone}</a>
              <a href={RESTAURANT.mobileHref}>{RESTAURANT.mobile}</a>
            </div>
            <div>
              <h4>{de ? 'Rechtliches' : 'Legal'}</h4>
              <button onClick={() => setLegal('imprint')}>{t.legalImprint}</button>
              <button onClick={() => setLegal('privacy')}>{t.legalPrivacy}</button>
              <button onClick={() => setLegal('revocation')}>{t.legalRevocation}</button>
            </div>
          </div>
        </div>
        <div className="footer__word" data-reveal="lines" aria-hidden="true"><span className="split__line"><span>KAIDO</span></span></div>
        <div className="container footer__bottom">
          <span>{t.copyright}</span>
          <span className="footer__legal">
            <a href={RESTAURANT.guruUrl} target="_blank" rel="noopener noreferrer">Restaurant Guru 2023</a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{de ? 'Nach oben ↑' : 'Back to top ↑'}</button>
          </span>
        </div>
      </footer>

      {legal && (
        <div className="modal" onClick={() => setLegal(null)}>
          <div className="modal__card modal__card--legal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="round-btn modal__close" onClick={() => setLegal(null)} aria-label={t.closeBtn}>✕</button>
            {legal === 'imprint' && (
              <div className="legal">
                <h2>Impressum</h2>
                <p><strong>Kaido KG</strong><br />Rotensterngasse 3<br />A-1020 Wien</p>
                <p><strong>E-Mail:</strong> <a style={link} href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a></p>
                <p><strong>FN:</strong> 583887 h, Handelsgericht Wien</p>
                <p><strong>Kammerzugehörigkeit:</strong> Wirtschaftskammer Wien, Fachgruppe Gastronomie</p>
                <p><strong>Anzuwendende Rechtsvorschriften (u.a.):</strong> Gewerbeordnung (einsehbar unter <a style={link} href="http://www.ris.bka.gv.at/" target="_blank" rel="noopener noreferrer">www.ris.bka.gv.at</a>)</p>
                <p><strong>Zuständige Gewerbebehörde:</strong> Magistrat der Stadt Wien</p>
                <p>Verbraucher haben die Möglichkeit, Beschwerden an die Online-Streitbeilegungsplattform der EU zu richten: <a style={link} href="http://ec.europa.eu/odr" target="_blank" rel="noopener noreferrer">http://ec.europa.eu/odr</a>. Sie können allfällige Beschwerde auch an die oben angegebene E-Mail-Adresse richten.</p>
              </div>
            )}
            {legal === 'privacy' && (
              <div className="legal">
                <h2>Datenschutzerklärung (DSGVO)</h2>
                <p>Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).</p>
                <h3>1. Tischreservierungen</h3>
                <p>Zur Abwicklung Ihrer Reservierung binden wir das gesicherte Reservierungsmodul von Gastro.site ein. Daten wie Name, Personenanzahl und Kontaktnummer werden streng zweckgebunden zur Organisation Ihres Besuches erhoben.</p>
                <h3>2. Ihre Rechte</h3>
                <p>Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu.</p>
              </div>
            )}
            {legal === 'revocation' && (
              <div className="legal">
                <h2>Widerrufsbelehrung</h2>
                <h3>Stornierung von Tischreservierungen</h3>
                <p>Reservierungen können bis zu 2 Stunden vor Beginn des gebuchten Zeitfensters kostenfrei über den Bestätigungslink oder telefonisch storniert werden.</p>
                <h3>Speisenbestellungen</h3>
                <p>Gemäß § 18 Abs. 1 Z 3 FAGG besteht kein Rücktrittsrecht bei Waren, die schnell verderben können oder deren Verfallsdatum schnell überschritten würde (frische Sushi- und Küchengerichte).</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
