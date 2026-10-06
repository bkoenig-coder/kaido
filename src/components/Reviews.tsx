import { useState, type CSSProperties, type MouseEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT } from '../lib/hours';
import { delay } from '../utils';
import { Lightbox } from './Lightbox';
import certImg from '../assets/gallery/Certificate.jpeg';

/** Public Google Maps listing for Kaido Sushi Bar. */
const GOOGLE_URL = 'https://www.google.com/maps/place/Kaido+Sushi+Bar,+Rotensterngasse,+Vienna/@48.2179637,16.3814502,17z/data=!4m6!3m5!1s0x476d07c2784dd305:0x3422c30c617d207b!8m2!3d48.2179637!4d16.3814502';

/** Overall rating shown in the Google summary. */
const RATING = 4.8;

interface GReview {
  name: string;
  stars: number;
  when: { de: string; en: string };
  de: string;
  en: string;
  color: string;
}

const reviews: GReview[] = [
  { name: 'Thomas L.', stars: 5, color: '#1a73e8', when: { de: 'vor einem Monat', en: 'a month ago' }, de: 'Sensationelle Sushi-Kompositionen. Alles von kompromissloser Frische, handwerklich makellos gerollt und mit vollendeter Ästhetik serviert.', en: 'Sensational sushi compositions. Everything exhibits uncompromising freshness, rolled with master-level precision and plated with sublime grace.' },
  { name: 'Sarah M.', stars: 5, color: '#e8710a', when: { de: 'vor 2 Monaten', en: '2 months ago' }, de: 'Einfühlsamer, hochgradig diskreter Service. Man spürt vom ersten Moment an die gelebte Omotenashi-Tradition.', en: 'Attentive, profoundly discreet service. One senses true Omotenashi from the very first moment.' },
  { name: 'David K.', stars: 5, color: '#188038', when: { de: 'vor 3 Monaten', en: '3 months ago' }, de: 'Unglaubliche Klarheit der Aromen. Hier wird Sushi nicht zubereitet – es wird zelebriert.', en: 'Incredible clarity of flavors. Here, sushi is not merely prepared — it is reverently celebrated.' },
  { name: 'Yuki S.', stars: 5, color: '#a142f4', when: { de: 'vor 4 Monaten', en: '4 months ago' }, de: 'Ein authentisches Kleinod im 2. Wiener Bezirk. Frischester Fisch und unaufdringliche Eleganz wie in den besten Häusern Kyotos.', en: 'An authentic jewel in Vienna’s 2nd district. Pristine fish and understated elegance reminiscent of Kyoto’s finest counters.' },
];

const STAR = 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="gstars" role="img" aria-label={`${value} / 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ '--s': i } as CSSProperties}>
            <defs>
              <linearGradient id={`gs-${size}-${i}-${value}`}>
                <stop offset={`${fill * 100}%`} stopColor="#fbbc04" />
                <stop offset={`${fill * 100}%`} stopColor="#dadce0" />
              </linearGradient>
            </defs>
            <path d={STAR} fill={`url(#gs-${size}-${i}-${value})`} />
          </svg>
        );
      })}
    </span>
  );
}

function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

/** Cursor-follow spotlight and a slight 3D tilt. */
const track = (e: MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  el.style.setProperty('--mx', `${x}px`);
  el.style.setProperty('--my', `${y}px`);
  el.style.setProperty('--rx', `${((y / r.height) - 0.5) * -6}deg`);
  el.style.setProperty('--ry', `${((x / r.width) - 0.5) * 6}deg`);
};
const untrack = (e: MouseEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
};

export function Reviews() {
  const { language, t } = useLanguage();
  const de = language === 'de';
  const [cert, setCert] = useState(false);
  const score = RATING.toLocaleString(de ? 'de-AT' : 'en-GB', { minimumFractionDigits: 1 });

  return (
    <section className="section" id="reviews">
      <div className="container grid-12">
        <p className="eyebrow">{de ? 'Stimmen unserer Gäste' : 'Guests'}</p>
        <div>
          <div className="greviews" data-reveal>
            <div className="greviews__summary">
              <span className="greviews__bar" aria-hidden="true" />
              <div className="greviews__brand"><GoogleG /><span>{de ? 'Google Rezensionen' : 'Google reviews'}</span></div>
              <div className="greviews__score">{score}</div>
              <Stars value={RATING} size={18} />
              <p className="greviews__count">{de ? '1.000+ Rezensionen' : '1,000+ reviews'}</p>
              <a className="gbtn" href={GOOGLE_URL} target="_blank" rel="noopener noreferrer">{de ? 'Alle Rezensionen auf Google Maps' : 'See all reviews on Google Maps'}</a>
            </div>
            <div className="greviews__list">
              {reviews.map((r, i) => (
                <div className="greview-wrap" key={r.name} data-reveal style={delay(i)}>
                <article className="greview" onMouseMove={track} onMouseLeave={untrack}>
                  <span className="greview__quote" aria-hidden="true">“</span>
                  <header>
                    <span className="greview__avatar" style={{ background: r.color }}>{r.name.charAt(0)}</span>
                    <div>
                      <strong>{r.name}</strong>
                      <span className="greview__meta">Google</span>
                    </div>
                  </header>
                  <div className="greview__row"><Stars value={r.stars} size={14} /><time>{de ? r.when.de : r.when.en}</time></div>
                  <p>{de ? r.de : r.en}</p>
                </article>
                </div>
              ))}
            </div>
          </div>
          <div className="guru" data-reveal>
            <button className="guru__cert" onClick={() => setCert(true)} data-cursor="view" aria-label={de ? 'Urkunde vergrößern' : 'Enlarge certificate'}>
              <img src={certImg} alt="Restaurant Guru 2023 – Kaido Sushi Bar Recommended" loading="lazy" />
            </button>
            <div className="guru__text">
              <p className="eyebrow">{de ? 'Auszeichnung' : 'Distinction'}</p>
              <h3>{de ? 'Ausgezeichnet auf Restaurant Guru' : 'Recommended on Restaurant Guru'}</h3>
              <p className="body">{de
                ? 'Kaido wurde von Restaurant Guru mit der Urkunde für herausragende kulinarische Qualität und Gastfreundschaft geehrt.'
                : 'Kaido was honoured by Restaurant Guru with a certificate for outstanding culinary quality and hospitality.'}</p>
              <p className="guru__links">
                <a className="text-link" href={RESTAURANT.guruUrl} target="_blank" rel="noopener noreferrer">{de ? 'Restaurant Guru Profil' : 'Restaurant Guru profile'} ↗</a>
                <button className="text-link" onClick={() => setCert(true)}>{de ? 'Urkunde vergrößern' : 'Enlarge certificate'}</button>
              </p>
            </div>
          </div>
        </div>
      </div>
      {cert && (
        <Lightbox
          items={[{ id: 'cert', src: certImg, title: 'Restaurant Guru', caption: de ? 'Original-Zertifikat · Restaurant Guru 2023' : 'Original certificate · Restaurant Guru 2023' }]}
          index={0}
          onIndex={() => {}}
          onClose={() => setCert(false)}
          closeLabel={t.closeBtn}
        />
      )}
    </section>
  );
}
