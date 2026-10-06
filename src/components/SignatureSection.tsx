import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { regularMenu, type MenuItem } from '../data/menuData';
import { delay } from '../utils';
import { Photo } from './Photo';
import { SplitLines } from './SplitLines';
import k1 from '../assets/dishes/k1.jpg';
import k2 from '../assets/dishes/k2.jpg';
import k3 from '../assets/dishes/k3.jpg';
import r5 from '../assets/dishes/r5.jpg';
import sc2 from '../assets/dishes/sc2.jpg';
import s2 from '../assets/dishes/s2.jpg';

/** Which dishes are featured, and the photo shown for each on hover / scroll. */
const SIGNATURE: { code: string; src: string }[] = [
  { code: 'K1', src: k1 },
  { code: 'K2', src: k2 },
  { code: 'K3', src: k3 },
  { code: 'R5', src: r5 },
  { code: 'SC2', src: sc2 },
  { code: 'S2', src: s2 },
];

const euro = (n: number) => n.toLocaleString('de-AT', { style: 'currency', currency: 'EUR' });

interface SignatureSectionProps {
  onOpenMenu: (tab?: 'regular' | 'lunch') => void;
}

export function SignatureSection({ onOpenMenu }: SignatureSectionProps) {
  const { language, t } = useLanguage();
  const de = language === 'de';
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  const dishes = SIGNATURE.map((s) => {
    const cat = regularMenu.find((c) => c.items.some((i) => i.code === s.code))!;
    const item = cat.items.find((i) => i.code === s.code) as MenuItem;
    return { ...s, item, category: de ? cat.titleDe : cat.titleEn };
  });

  // Touch / small screens have no hover: the dish crossing the middle of the
  // screen as you scroll becomes the active one and opens its picture.
  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (max-width: 680px)');
    let io: IntersectionObserver | null = null;
    const setup = () => {
      io?.disconnect();
      io = null;
      if (!mq.matches || !wrap.current) return;
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }),
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
      );
      wrap.current.querySelectorAll('.dishrow').forEach((el) => io!.observe(el));
    };
    setup();
    mq.addEventListener('change', setup);
    return () => { mq.removeEventListener('change', setup); io?.disconnect(); };
  }, []);

  const move = (e: MouseEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r || !preview.current) return;
    preview.current.style.transform = `translate3d(${e.clientX - r.left}px, ${e.clientY - r.top}px, 0) translate(-50%, -50%)`;
  };

  return (
    <section className="section" id="signature">
      <div className="container grid-12">
        <p className="eyebrow">{t.menuEyebrow}</p>
        <div>
          <div className="section__head">
            <SplitLines lines={de ? ['Signature', 'Gerichte'] : ['Signature', 'plates']} className="h2" />
            <button className="text-link" onClick={() => onOpenMenu('regular')}>{de ? 'Ganze Speisekarte' : 'Full menu'} →</button>
          </div>
          <span className="rule" data-reveal="rule" />

          <div className={`dishlist ${active !== null ? 'has-active' : ''}`} ref={wrap} onMouseMove={move} onMouseLeave={() => setActive(null)}>
            {dishes.map((d, i) => (
              <article key={d.code} className={`dishrow ${active === i ? 'is-active' : ''}`} onMouseEnter={() => setActive(i)} data-i={i} data-reveal style={delay(i)}>
                <h3>{de ? d.item.nameDe : d.item.nameEn}</h3>
                <p>{de ? d.item.descriptionDe : d.item.descriptionEn}</p>
                <span className="dishrow__tag">{d.category}</span>
                <span className="dishrow__price">{d.item.priceLarge ? `${euro(d.item.price)} / ${euro(d.item.priceLarge)}` : euro(d.item.price)}</span>
                <Photo src={d.src} alt={de ? d.item.nameDe : d.item.nameEn} className="dishrow__mobile-photo" />
              </article>
            ))}
            <div className="dishlist__preview" ref={preview} aria-hidden="true">
              {dishes.map((d, i) => (
                <div key={d.code} className={`dishlist__img ${active === i ? 'is-on' : ''}`}>
                  <Photo src={d.src} alt="" />
                </div>
              ))}
            </div>
          </div>

          <p className="signature__more" data-reveal>
            <button className="text-link" onClick={() => onOpenMenu('lunch')}>{t.menuLunchTab} →</button>
          </p>
        </div>
      </div>
    </section>
  );
}
