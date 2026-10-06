import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { delay } from '../utils';
import { Lightbox } from './Lightbox';
import { Photo } from './Photo';
import { SplitLines } from './SplitLines';

import gallery1 from '../assets/gallery/gallery1.jpg';
import gallery2 from '../assets/gallery/gallery2.jpg';
import gallery3 from '../assets/gallery/gallery3.jpg';
import gallery4 from '../assets/gallery/gallery4.jpg';
import gallery5 from '../assets/gallery/gallery5.jpg';
import gallery6 from '../assets/gallery/gallery6.jpg';

const slides = [
  { id: 1, src: gallery1, titleDe: 'Der Sushi-Tresen', titleEn: 'The Sushi Counter', subDe: 'Frisches Sushi, meisterhaft und direkt vor Ihren Augen zubereitet.', subEn: 'Fresh sushi, masterfully prepared right before your eyes.' },
  { id: 2, src: gallery2, titleDe: 'Gemütliches Ambiente', titleEn: 'Cozy Environment', subDe: 'Warme Beleuchtung und eine entspannte Stimmung zum Wohlfühlen.', subEn: 'Warm lighting and a cozy, relaxing atmosphere to unwind.' },
  { id: 3, src: gallery3, titleDe: 'Japanische Wandkunst', titleEn: 'Japanese Wall Art', subDe: 'Traditionelle Kunstmotive für ein schönes, stimmungsvolles Ambiente.', subEn: 'Traditional art motifs creating a lovely, stylish ambiance.' },
  { id: 4, src: gallery4, titleDe: 'Der Gästebereich', titleEn: 'Dining Area', subDe: 'Bequeme Tische für ein genussvolles Essen mit Freunden und Familie.', subEn: 'Comfortable seating for delicious meals with friends and family.' },
  { id: 5, src: gallery5, titleDe: 'Ungestörter Genuss', titleEn: 'Intimate Seating', subDe: 'Ruhige Sitzecken für entspannte Abende und köstliche Gerichte.', subEn: 'Quiet booths for relaxed evenings and delicious meals.' },
  { id: 6, src: gallery6, titleDe: 'Kaido Atmosphäre', titleEn: 'Kaido Ambiance', subDe: 'Gemütliches Ambiente, köstliche Speisen und herzliche Gastfreundschaft.', subEn: 'Cozy environment, delicious meals, and warm hospitality.' },
];

export function GallerySection() {
  const { language, t } = useLanguage();
  const de = language === 'de';
  const [open, setOpen] = useState<number | null>(null);
  const items = slides.map((s) => ({ id: s.id, src: s.src, title: de ? s.titleDe : s.titleEn, caption: de ? s.subDe : s.subEn }));
  const strip = [0, 1, 2, 3, 4];

  return (
    <section className="section section--stone" id="gallery">
      <div className="container grid-12">
        <p className="eyebrow">{de ? 'Das Lokal' : 'The room'}</p>
        <div className="section__head">
          <SplitLines lines={de ? ['Ein Abend', 'bei Kaido'] : ['An evening', 'at Kaido']} className="h2" />
          <button className="text-link" onClick={() => setOpen(0)}>{de ? 'Alle Bilder ansehen' : 'View all photos'}</button>
        </div>
      </div>
      <div className="strip" role="list">
        {strip.map((n, i) => (
          <button key={items[n].id} role="listitem" className={`strip__item strip__item--${i + 1} clip`} data-reveal="clip" data-cursor="view" style={delay(i)} onClick={() => setOpen(n)} aria-label={items[n].title}>
            <Photo src={items[n].src} alt={items[n].title} />
          </button>
        ))}
      </div>
      {open !== null && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} closeLabel={t.closeBtn} />}
    </section>
  );
}
