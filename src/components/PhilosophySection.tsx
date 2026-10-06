import { useLanguage } from '../context/LanguageContext';
import { delay } from '../utils';
import { Photo } from './Photo';
import { SplitLines } from './SplitLines';
import gallery1 from '../assets/gallery/gallery1.jpg';
import gallery4 from '../assets/gallery/gallery4.jpg';

interface PhilosophySectionProps {
  onOpenReservation?: () => void;
}

export function PhilosophySection({ onOpenReservation }: PhilosophySectionProps) {
  const { t, language } = useLanguage();

  const pillars = [
    { k: '鮮', title: t.pillar1Title, desc: t.pillar1Subtitle },
    { k: '技', title: t.pillar2Title, desc: t.pillar2Subtitle },
    { k: '昼', title: t.pillar3Title, desc: t.pillar3Subtitle },
  ];

  const lines = language === 'de' ? ['Über', 'uns'] : ['About', 'us'];

  return (
    <section className="section story" id="story">
      <div className="container grid-12">
        <p className="eyebrow">{language === 'de' ? 'Über uns' : 'About us'}</p>
        <div className="story__body">
          <SplitLines lines={lines} className="h2" />
          <div className="story__cols">
            <p className="body" data-reveal>{t.philosophySubtitle}</p>
            <p className="body" data-reveal style={delay(1)}>{t.pillar1Desc}</p>
          </div>
          <div className="story__media">
            <div className="clip" data-reveal="clip"><Photo src={gallery1} alt="Kaido sushi counter" /></div>
            <div className="clip clip--small" data-reveal="clip" style={delay(2)}><Photo src={gallery4} alt="Kaido dining area" /></div>
          </div>
          <ul className="pillars">
            {pillars.map((p, i) => (
              <li key={p.k} data-reveal style={delay(i)}>
                <span className="pillars__k">{p.k}</span>
                <strong>{p.title}</strong>
                <span>{p.desc}</span>
              </li>
            ))}
          </ul>
          {onOpenReservation && (
            <p className="story__cta" data-reveal>
              <button className="text-link" onClick={onOpenReservation}>{t.navBook} →</button>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
