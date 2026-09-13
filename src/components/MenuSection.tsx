import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { regularMenu, lunchMenu } from '../data/menuData';
import { Search, Flame, Leaf, Wheat, Info } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeMenuType, setActiveMenuType] = useState<'regular' | 'lunch'>('regular');
  const [activeCategory, setActiveCategory] = useState<string>('starters');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dietary filter states
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterVegan, setFilterVegan] = useState(false);
  const [filterSpicy, setFilterSpicy] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);

  const resetFilters = () => {
    setFilterVeg(false);
    setFilterVegan(false);
    setFilterSpicy(false);
    setFilterGlutenFree(false);
  };

  React.useEffect(() => {
    const handleSwitch = (e: Event) => {
      const customEvent = e as CustomEvent<'regular' | 'lunch'>;
      if (customEvent.detail) {
        setActiveMenuType(customEvent.detail);
        resetFilters();
      }
    };
    window.addEventListener('switchMenuTab', handleSwitch);
    return () => window.removeEventListener('switchMenuTab', handleSwitch);
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('de-AT', { style: 'currency', currency: 'EUR' });
  };

  // Filter regular menu items
  const filteredRegularMenu = useMemo(() => {
    return regularMenu.map((category) => {
      const items = category.items.filter((item) => {
        const matchSearch = searchQuery.trim() === '' || 
          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.nameDe.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.descriptionDe && item.descriptionDe.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.descriptionEn && item.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchVeg = !filterVeg || item.isVegetarian || item.isVegan;
        const matchVegan = !filterVegan || item.isVegan;
        const matchSpicy = !filterSpicy || item.isSpicy;
        const matchGlutenFree = !filterGlutenFree || item.isGlutenFree;

        return matchSearch && matchVeg && matchVegan && matchSpicy && matchGlutenFree;
      });

      return {
        ...category,
        items
      };
    }).filter(category => category.items.length > 0);
  }, [searchQuery, filterVeg, filterVegan, filterSpicy, filterGlutenFree]);

  // Filter lunch menu items
  const filteredLunchMenu = useMemo(() => {
    return lunchMenu.filter((item) => {
      const matchSearch = searchQuery.trim() === '' || 
        `M${item.number}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameDe.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.descriptionDe.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase());

      const isVeg = item.nameDe.toLowerCase().includes('vegan') || item.descriptionDe.toLowerCase().includes('tofu') || item.descriptionDe.toLowerCase().includes('vegan');
      const matchVeg = !filterVeg || isVeg;
      const matchVegan = !filterVegan || item.nameDe.toLowerCase().includes('vegan') || item.descriptionDe.toLowerCase().includes('vegan');
      const matchSpicy = !filterSpicy || item.nameDe.toLowerCase().includes('curry') || item.descriptionDe.toLowerCase().includes('curry') || item.descriptionDe.toLowerCase().includes('spicy');
      const matchGlutenFree = !filterGlutenFree || false;

      return matchSearch && matchVeg && matchVegan && matchSpicy && matchGlutenFree;
    });
  }, [searchQuery, filterVeg, filterVegan, filterSpicy, filterGlutenFree]);

  const activeCategoryData = useMemo(() => {
    return filteredRegularMenu.find(cat => cat.id === activeCategory) || filteredRegularMenu[0];
  }, [filteredRegularMenu, activeCategory]);

  return (
    <section id="menu" className="menu-section section">
      <div className="container">
        {/* Haute Gastronomy Title Header */}
        <div className="section-title animate-slide-up">
          <span className="eyebrow-text">{t.menuEyebrow}</span>
          <h2>{t.menuTitle}</h2>
          <div className="hairline-divider" />
          <p style={{ marginTop: '16px' }}>{t.menuSubtitle}</p>
        </div>

        {/* Regular vs Lunch Menu Toggle */}
        <div className="menu-toggle-container">
          <button 
            className={`menu-toggle-btn ${activeMenuType === 'regular' ? 'active' : ''}`}
            onClick={() => { setActiveMenuType('regular'); resetFilters(); }}
          >
            {t.menuRegularTab}
          </button>
          <button 
            className={`menu-toggle-btn ${activeMenuType === 'lunch' ? 'active' : ''}`}
            onClick={() => { setActiveMenuType('lunch'); resetFilters(); }}
          >
            {t.menuLunchTab}
          </button>
        </div>

        {/* Lunch Menu Note */}
        {activeMenuType === 'lunch' && (
          <div className="lunch-note animate-fade-in glass-card">
            <Info size={18} className="text-gold" />
            <p>{t.menuLunchNote}</p>
          </div>
        )}

        {/* Search and Filters Bar */}
        <div className="search-filter-bar glass-card">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={16} />
            <input 
              type="text" 
              placeholder={t.menuSearchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="dietary-filters">
            <button 
              className={`filter-tag ${filterVeg ? 'active-veg' : ''}`}
              onClick={() => setFilterVeg(!filterVeg)}
            >
              <Leaf size={13} />
              <span>{t.filterVegetarian}</span>
            </button>
            <button 
              className={`filter-tag ${filterVegan ? 'active-vegan' : ''}`}
              onClick={() => setFilterVegan(!filterVegan)}
            >
              <Leaf size={13} />
              <span>{t.filterVegan}</span>
            </button>
            <button 
              className={`filter-tag ${filterSpicy ? 'active-spicy' : ''}`}
              onClick={() => setFilterSpicy(!filterSpicy)}
            >
              <Flame size={13} />
              <span>{t.filterSpicy}</span>
            </button>
            <button 
              className={`filter-tag ${filterGlutenFree ? 'active-gf' : ''}`}
              onClick={() => setFilterGlutenFree(!filterGlutenFree)}
            >
              <Wheat size={13} />
              <span>{t.filterGlutenFree}</span>
            </button>
          </div>
        </div>

        {/* Speisekarte Layout */}
        {activeMenuType === 'regular' ? (
          <div className="regular-menu-layout">
            {/* Category Navigation Tabs */}
            <div className="category-tabs-container">
              <div className="category-tabs">
                {regularMenu.map((cat, idx) => {
                  const isAvailable = filteredRegularMenu.some(fCat => fCat.id === cat.id);
                  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
                  return (
                    <button
                      key={cat.id}
                      className={`category-tab ${activeCategory === cat.id ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}`}
                      onClick={() => isAvailable && setActiveCategory(cat.id)}
                      disabled={!isAvailable}
                    >
                      <span className="cat-numeral">{romanNumerals[idx] || (idx + 1)}</span>
                      <span className="cat-label">{language === 'de' ? cat.titleDe : cat.titleEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Menu Items Grid */}
            {activeCategoryData ? (
              <div className="menu-grid animate-fade-in">
                {activeCategoryData.items.map((item) => (
                  <div key={item.code} className="menu-card glass-card">
                    <div className="menu-card-header">
                      <div className="menu-card-code-title">
                        <span className="item-code">{item.code}</span>
                        <h3 className="item-title">{language === 'de' ? item.nameDe : item.nameEn}</h3>
                      </div>
                      <div className="item-price-container">
                        {item.priceLarge ? (
                          <span className="item-price">
                            {formatPrice(item.price)} <span className="price-divider">/</span> {formatPrice(item.priceLarge)}
                          </span>
                        ) : (
                          <span className="item-price">{formatPrice(item.price)}</span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {(item.descriptionDe || item.descriptionEn) && (
                      <p className="item-description">
                        {language === 'de' ? item.descriptionDe : item.descriptionEn}
                      </p>
                    )}

                    {/* Dietary Badges */}
                    <div className="item-badges">
                      {item.isVegan && <span className="badge badge-subtle"><Leaf size={10} /> Vegan</span>}
                      {!item.isVegan && item.isVegetarian && <span className="badge badge-subtle"><Leaf size={10} /> Veggie</span>}
                      {item.isSpicy && <span className="badge badge-spice"><Flame size={10} /> Spicy</span>}
                      {item.isGlutenFree && <span className="badge badge-subtle"><Wheat size={10} /> Gluten-Free</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-menu glass-card">
                <p>{language === 'de' ? 'Keine Gerichte gefunden für Ihre Suchkriterien.' : 'No creations match your selected filters.'}</p>
                <button className="btn btn-secondary mt-16" onClick={resetFilters}>
                  {language === 'de' ? 'Filter zurücksetzen' : 'Reset Filters'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Lunch Menu Grid */
          <div className="lunch-menu-layout">
            <div className="lunch-selection-grid animate-fade-in">
              {filteredLunchMenu.map((item) => (
                <div key={item.number} className="menu-card glass-card">
                  <div className="menu-card-header">
                    <div className="menu-card-code-title">
                      <span className="item-code">M{item.number}</span>
                      <h3 className="item-title">{language === 'de' ? item.nameDe : item.nameEn}</h3>
                    </div>
                    <div className="item-price-container">
                      <span className="item-price">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                  <p className="item-description">
                    {language === 'de' ? item.descriptionDe : item.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="lunch-upgrade-notice glass-card">
              <span className="notice-crest">匠</span>
              <p>{t.lunchExtraOption}</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .menu-section {
          background: #0e1115;
          position: relative;
        }

        .menu-toggle-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 36px;
        }

        .menu-toggle-btn {
          font-family: var(--font-eyebrow);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 12px 32px;
          border-radius: var(--radius-sm);
          background: rgba(20, 23, 29, 0.6);
          border: 1px solid rgba(212, 175, 55, 0.2);
          color: var(--color-washi-dim);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .menu-toggle-btn:hover {
          border-color: var(--color-gold);
          color: #ffffff;
        }

        .menu-toggle-btn.active {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(191, 161, 95, 0.08) 100%);
          border-color: var(--color-gold);
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.15);
        }

        .lunch-note {
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 820px;
          margin: 0 auto 30px;
          padding: 16px 24px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          color: var(--color-washi-dim);
          font-size: 0.92rem;
        }

        .text-gold {
          color: var(--color-gold);
          flex-shrink: 0;
        }

        .search-filter-bar {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 24px 28px;
          margin-bottom: 40px;
          background: rgba(16, 19, 25, 0.7);
          border: 1px solid rgba(212, 175, 55, 0.18);
        }

        .search-input-wrapper {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-gold);
          opacity: 0.7;
        }

        .search-input {
          width: 100%;
          padding: 14px 18px 14px 48px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(10, 12, 16, 0.7);
          color: #ffffff;
          font-size: 0.92rem;
          transition: var(--transition-smooth);
        }

        .search-input:focus {
          border-color: var(--color-gold);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
        }

        .dietary-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .filter-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(20, 23, 29, 0.5);
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-washi-dim);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .filter-tag:hover {
          border-color: var(--color-gold);
          color: #ffffff;
        }

        .filter-tag.active-veg,
        .filter-tag.active-vegan,
        .filter-tag.active-gf {
          background: rgba(212, 175, 55, 0.12);
          border-color: var(--color-gold);
          color: var(--color-gold-light);
        }

        .filter-tag.active-spicy {
          background: rgba(138, 37, 37, 0.25);
          border-color: #a12f2f;
          color: #ff9999;
        }

        /* Category Tabs */
        .category-tabs-container {
          margin-bottom: 40px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .category-tabs {
          display: flex;
          gap: 10px;
          min-width: max-content;
        }

        .category-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(16, 19, 25, 0.6);
          color: var(--color-washi-dim);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .category-tab:hover {
          border-color: rgba(212, 175, 55, 0.4);
          color: #ffffff;
        }

        .category-tab.active {
          border-color: var(--color-gold);
          background: rgba(212, 175, 55, 0.12);
          color: #ffffff;
        }

        .cat-numeral {
          font-family: var(--font-eyebrow);
          font-size: 0.68rem;
          color: var(--color-gold);
          letter-spacing: 0.2em;
          margin-bottom: 2px;
        }

        .cat-label {
          font-family: var(--font-eyebrow);
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* Menu Grid */
        .menu-grid,
        .lunch-selection-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .menu-card {
          padding: 28px 30px;
          background: rgba(18, 21, 27, 0.75);
          border: 1px solid rgba(212, 175, 55, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .menu-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 12px;
        }

        .menu-card-code-title {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .item-code {
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          color: var(--color-gold);
          letter-spacing: 0.15em;
          opacity: 0.85;
        }

        .item-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: #ffffff;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        .item-price-container {
          flex-shrink: 0;
        }

        .item-price {
          font-family: var(--font-eyebrow);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-gold-light);
          letter-spacing: 0.05em;
        }

        .price-divider {
          opacity: 0.4;
          margin: 0 4px;
        }

        .item-description {
          font-size: 0.92rem;
          color: var(--color-washi-dim);
          line-height: 1.6;
          margin-bottom: 14px;
          font-weight: 300;
        }

        .item-badges {
          display: flex;
          gap: 8px;
        }

        .badge-subtle {
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-washi-dim);
        }

        .badge-spice {
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          background: rgba(138, 37, 37, 0.15);
          border: 1px solid rgba(138, 37, 37, 0.3);
          color: #ff9999;
        }

        .empty-menu {
          text-align: center;
          padding: 60px 20px;
        }

        .lunch-upgrade-notice {
          margin-top: 36px;
          padding: 24px 30px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          background: rgba(16, 19, 25, 0.6);
        }

        .notice-crest {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--color-gold);
        }

        @media (max-width: 900px) {
          .menu-grid,
          .lunch-selection-grid {
            grid-template-columns: 1fr;
          }
          .search-filter-bar {
            padding: 18px;
          }
        }
      `}</style>
    </section>
  );
};
