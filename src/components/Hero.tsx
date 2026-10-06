import { useLanguage } from '../context/LanguageContext';
import { formatRange, RESTAURANT, useOpenStatus } from '../lib/hours';
import { Fish } from './Fish';
import { SplitLines } from './SplitLines';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

const stripEmoji = (s: string) => s.replace(/[\u{1F300}-\u{1FAFF}☀-➿]/gu, '').trim();

export function Hero({ onOpenReservation, onOpenMenu }: HeroProps) {
  const { language, t } = useLanguage();
  const status = useOpenStatus(language);
  const lede = stripEmoji(t.heroSubtitle);

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <SplitLines as="h1" className="hero__title" lines={['Kaido', 'Sushi Bar', 'Wien']} onLoad />
        <Fish className="hero__fish" />
        <div className="hero__side">
          <p className="hero__lede">{lede}{/[.!?]$/.test(lede) ? '' : '.'}</p>
          <div className="hero__ctas">
            <button className="btn btn--primary" onClick={onOpenReservation} data-magnetic>{t.heroBookBtn}</button>
            <button className="btn btn--line" onClick={onOpenMenu}>{t.heroMenuBtn}</button>
          </div>
        </div>
      </div>
      <div className="container hero__bottom">
        <div className="quickbar">
          <div className="quickbar__field">
            <span>{language === 'de' ? 'Heute' : 'Today'}</span>
            <b className="quickbar__status"><i className={`dot dot--${status.state}`} />{status.text}</b>
          </div>
          <div className="quickbar__field">
            <span>{language === 'de' ? 'Öffnungszeit' : 'Hours today'}</span>
            <b>{formatRange(status.today, language)}</b>
          </div>
          <div className="quickbar__field">
            <span>{t.contactAddress}</span>
            <b>{RESTAURANT.address}</b>
          </div>
          <button className="btn btn--primary" onClick={onOpenReservation} data-magnetic>{t.navBook}</button>
        </div>
      </div>
    </section>
  );
}
