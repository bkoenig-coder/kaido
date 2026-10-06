import { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { regularMenu, lunchMenu, type MenuItem } from '../data/menuData';
import { SplitLines } from './SplitLines';

const euro = (n: number) => n.toLocaleString('de-AT', { style: 'currency', currency: 'EUR' });

export function MenuSection({ initialTab = 'regular' }: { initialTab?: 'regular' | 'lunch' }) {
  const { t, language } = useLanguage();
  const de = language === 'de';
  const [menuType, setMenuType] = useState<'regular' | 'lunch'>(initialTab);
  const [category, setCategory] = useState('starters');
  const [query, setQuery] = useState('');
  const [hover, setHover] = useState<string | null>(null);
  const [diet, setDiet] = useState({ veg: false, vegan: false, spicy: false, gf: false });

  const resetFilters = () => setDiet({ veg: false, vegan: false, spicy: false, gf: false });
  const toggle = (k: keyof typeof diet) => setDiet((d) => ({ ...d, [k]: !d[k] }));

  const q = query.trim().toLowerCase();

  const filteredRegular = useMemo(
    () =>
      regularMenu
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((it) => {
            const hay = `${it.code} ${it.nameDe} ${it.nameEn} ${it.descriptionDe ?? ''} ${it.descriptionEn ?? ''}`.toLowerCase();
            return (
              (!q || hay.includes(q)) &&
              (!diet.veg || it.isVegetarian || it.isVegan) &&
              (!diet.vegan || it.isVegan) &&
              (!diet.spicy || it.isSpicy) &&
              (!diet.gf || it.isGlutenFree)
            );
          }),
        }))
        .filter((c) => c.items.length > 0),
    [q, diet],
  );

  const filteredLunch = useMemo(
    () =>
      lunchMenu.filter((it) => {
        const hay = `m${it.number} ${it.nameDe} ${it.nameEn} ${it.descriptionDe} ${it.descriptionEn}`.toLowerCase();
        const veganish = hay.includes('vegan');
        return (
          (!q || hay.includes(q)) &&
          (!diet.veg || veganish || hay.includes('tofu')) &&
          (!diet.vegan || veganish) &&
          (!diet.spicy || hay.includes('curry') || hay.includes('spicy')) &&
          !diet.gf
        );
      }),
    [q, diet],
  );

  const active = filteredRegular.find((c) => c.id === category) ?? filteredRegular[0];

  const tags = (it: MenuItem) =>
    [
      it.isVegan && t.filterVegan,
      !it.isVegan && it.isVegetarian && t.filterVegetarian,
      it.isSpicy && t.filterSpicy,
      it.isGlutenFree && t.filterGlutenFree,
    ]
      .filter(Boolean)
      .join(' · ');

  const price = (it: MenuItem) => (it.priceLarge ? `${euro(it.price)} / ${euro(it.priceLarge)}` : euro(it.price));

  const dietButtons: [keyof typeof diet, string][] = [
    ['veg', t.filterVegetarian],
    ['vegan', t.filterVegan],
    ['spicy', t.filterSpicy],
    ['gf', t.filterGlutenFree],
  ];

  return (
    <section className="section menu">
      <div className="container grid-12">
        <p className="eyebrow">{t.menuEyebrow}</p>
        <div>
          <div className="section__head">
            <SplitLines lines={de ? ['Speisekarte &', 'Mittagsmenü'] : ['Menu &', 'lunch specials']} className="h2" onLoad />
            <p className="body menu__intro">{t.menuSubtitle}</p>
          </div>

          <div className="menu__bar">
            <div className="segmented" role="tablist">
              <button role="tab" aria-selected={menuType === 'regular'} className={menuType === 'regular' ? 'is-active' : ''} onClick={() => { setMenuType('regular'); resetFilters(); }}>{t.menuRegularTab}</button>
              <button role="tab" aria-selected={menuType === 'lunch'} className={menuType === 'lunch' ? 'is-active' : ''} onClick={() => { setMenuType('lunch'); resetFilters(); }}>{t.menuLunchTab}</button>
            </div>
            <div className="input menu__search">
              <label className="sr-only" htmlFor="menu-search">{t.menuSearchPlaceholder}</label>
              <input id="menu-search" type="search" value={query} placeholder={de ? 'Gericht oder Zutat suchen' : 'Search dishes or ingredients'} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>

          <div className="filters menu__diet">
            {dietButtons.map(([k, label]) => (
              <button key={k} className={`filter ${diet[k] ? 'is-active' : ''}`} aria-pressed={diet[k]} onClick={() => toggle(k)}>{label}</button>
            ))}
          </div>

          {menuType === 'regular' && filteredRegular.length > 0 && (
            <div className="filters menu__cats">
              {filteredRegular.map((c) => (
                <button key={c.id} className={`filter ${active?.id === c.id ? 'is-active' : ''}`} onClick={() => setCategory(c.id)}>
                  {de ? c.titleDe : c.titleEn}
                </button>
              ))}
            </div>
          )}

          {menuType === 'lunch' && <p className="menu__note">{t.menuLunchNote}</p>}

          <span className="rule" />

          {menuType === 'regular' ? (
            <div className={`dishlist ${hover ? 'has-active' : ''}`} onMouseLeave={() => setHover(null)} key={`${active?.id}-${language}`}>
              {active?.items.map((it, i) => (
                <article key={it.code} className={`dishrow ${hover === it.code ? 'is-active' : ''}`} onMouseEnter={() => setHover(it.code)} style={{ '--i': Math.min(i, 12) } as React.CSSProperties}>
                  <h3><small className="dishrow__code">{it.code}</small>{de ? it.nameDe : it.nameEn}</h3>
                  <p>{de ? it.descriptionDe : it.descriptionEn}</p>
                  <span className="dishrow__tag">{tags(it)}</span>
                  <span className="dishrow__price">{price(it)}</span>
                </article>
              ))}
            </div>
          ) : (
            <div className={`dishlist ${hover ? 'has-active' : ''}`} onMouseLeave={() => setHover(null)}>
              {filteredLunch.map((it, i) => (
                <article key={it.number} className={`dishrow ${hover === `m${it.number}` ? 'is-active' : ''}`} onMouseEnter={() => setHover(`m${it.number}`)} style={{ '--i': i } as React.CSSProperties}>
                  <h3><small className="dishrow__code">M{it.number}</small>{de ? it.nameDe : it.nameEn}</h3>
                  <p>{de ? it.descriptionDe : it.descriptionEn}</p>
                  <span className="dishrow__tag" />
                  <span className="dishrow__price">{euro(it.price)}</span>
                </article>
              ))}
              <p className="menu__note menu__note--end">{t.lunchExtraOption}</p>
            </div>
          )}

          {((menuType === 'regular' && filteredRegular.length === 0) || (menuType === 'lunch' && filteredLunch.length === 0)) && (
            <p className="empty">{de ? 'Keine Gerichte gefunden.' : 'No dishes found.'}</p>
          )}
        </div>
      </div>
    </section>
  );
}
