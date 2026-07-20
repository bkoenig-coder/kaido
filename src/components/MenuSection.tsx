import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { regularMenu, lunchMenu } from '../data/menuData';
import { Search, Flame, Leaf, Wheat, Info, Sparkles } from 'lucide-react';
import { LottieAnimation } from './LottieAnimation';

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

  // Helper to format price
  const formatPrice = (price: number) => {
    return price.toLocaleString('de-AT', { style: 'currency', currency: 'EUR' });
  };

  // Filter regular menu items
  const filteredRegularMenu = useMemo(() => {
    return regularMenu.map((category) => {
      const items = category.items.filter((item) => {
        // Search query check
        const matchSearch = searchQuery.trim() === '' || 
          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.nameDe.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.descriptionDe && item.descriptionDe.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.descriptionEn && item.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()));

        // Dietary tags check
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
      const matchGlutenFree = !filterGlutenFree || false; // Lunch does not specify gluten free directly

      return matchSearch && matchVeg && matchVegan && matchSpicy && matchGlutenFree;
    });
  }, [searchQuery, filterVeg, filterVegan, filterSpicy, filterGlutenFree]);

  // Find active category index
  const activeCategoryData = useMemo(() => {
    return filteredRegularMenu.find(cat => cat.id === activeCategory) || filteredRegularMenu[0];
  }, [filteredRegularMenu, activeCategory]);

  return (
    <section id="menu" className="menu-section section">
      {/* Decorative background koi */}
      <div className="menu-koi-watermark">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M160,120 C140,160 70,170 40,120 C20,90 40,50 80,35 C120,20 150,50 135,90 C130,105 115,115 95,120" 
            stroke="var(--accent-coral)" 
            strokeWidth="4" 
            strokeLinecap="round"
            opacity="0.05"
          />
          <path 
            d="M80,35 C70,25 55,20 45,25 C35,30 40,45 55,50" 
            stroke="var(--accent-coral)" 
            strokeWidth="3" 
            strokeLinecap="round"
            opacity="0.05"
          />
          <path 
            d="M130,150 C140,140 145,125 140,115" 
            stroke="var(--accent-coral)" 
            strokeWidth="3" 
            strokeLinecap="round"
            opacity="0.05"
          />
        </svg>
      </div>

      <div className="container">
        {/* Title */}
        <div className="section-title animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '8px' }}>
            <LottieAnimation
              url="https://lottie.host/02e5eb5c-5613-41a1-b0db-4dc732ae71e6/LVmd5JB8nz.json"
              width="80px"
              height="80px"
            />
          </div>
          <h2>{t.menuTitle}</h2>
          <p>{t.menuSubtitle}</p>
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
          <div className="lunch-note animate-fade-in">
            <Info size={20} className="text-gold" />
            <p>{t.menuLunchNote}</p>
          </div>
        )}

        {/* Search and Filters Bar */}
        <div className="search-filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
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
              <Leaf size={14} />
              <span>{t.filterVegetarian}</span>
            </button>
            <button 
              className={`filter-tag ${filterVegan ? 'active-vegan' : ''}`}
              onClick={() => setFilterVegan(!filterVegan)}
            >
              <Leaf size={14} />
              <span>{t.filterVegan}</span>
            </button>
            <button 
              className={`filter-tag ${filterSpicy ? 'active-spicy' : ''}`}
              onClick={() => setFilterSpicy(!filterSpicy)}
            >
              <Flame size={14} />
              <span>{t.filterSpicy}</span>
            </button>
            <button 
              className={`filter-tag ${filterGlutenFree ? 'active-gf' : ''}`}
              onClick={() => setFilterGlutenFree(!filterGlutenFree)}
            >
              <Wheat size={14} />
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
                {regularMenu.map((cat) => {
                  const isAvailable = filteredRegularMenu.some(fCat => fCat.id === cat.id);
                  return (
                    <button
                      key={cat.id}
                      className={`category-tab ${activeCategory === cat.id ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}`}
                      onClick={() => isAvailable && setActiveCategory(cat.id)}
                      disabled={!isAvailable}
                    >
                      {language === 'de' ? cat.titleDe : cat.titleEn}
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
                      {item.isVegan && <span className="badge badge-green"><Leaf size={10} /> Vegan</span>}
                      {!item.isVegan && item.isVegetarian && <span className="badge badge-green"><Leaf size={10} /> Veggie</span>}
                      {item.isSpicy && <span className="badge badge-coral"><Flame size={10} /> Spicy</span>}
                      {item.isGlutenFree && <span className="badge badge-gold"><Wheat size={10} /> Gluten-Free</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-items-found">
                <p>{language === 'de' ? 'Keine Gerichte gefunden. Bitte Filter anpassen.' : 'No items found. Try adjusting your filters.'}</p>
              </div>
            )}
          </div>
        ) : (
          /* Lunch Menu Grid */
          <div className="lunch-menu-layout">
            <div className="lunch-container">
              <div className="lunch-grid animate-fade-in">
                {filteredLunchMenu.map((item) => {
                  const isVeg = item.nameDe.toLowerCase().includes('vegan') || item.descriptionDe.toLowerCase().includes('tofu') || item.descriptionDe.toLowerCase().includes('vegan');
                  const isSpicy = item.nameDe.toLowerCase().includes('curry') || item.descriptionDe.toLowerCase().includes('curry') || item.descriptionDe.toLowerCase().includes('spicy');
                  
                  return (
                    <div key={item.number} className="menu-card glass-card">
                      <div className="menu-card-header">
                        <div className="menu-card-code-title">
                          <span className="item-code">M{item.number}</span>
                          <h3 className="item-title">{language === 'de' ? item.nameDe : item.nameEn}</h3>
                        </div>
                        <span className="item-price">{formatPrice(item.price)}</span>
                      </div>
                      <p className="item-description">
                        {language === 'de' ? item.descriptionDe : item.descriptionEn}
                      </p>
                      <div className="item-badges">
                        {isVeg && <span className="badge badge-green"><Leaf size={10} /> Veggie</span>}
                        {isSpicy && <span className="badge badge-coral"><Flame size={10} /> Spicy</span>}
                      </div>
                    </div>
                  );
                })}
                {filteredLunchMenu.length === 0 && (
                  <div className="no-items-found w-full col-span-2">
                    <p>{language === 'de' ? 'Keine Mittagsmenüs gefunden.' : 'No lunch items found.'}</p>
                  </div>
                )}
              </div>
              
              {/* Promo Banner inside Lunch section */}
              <div className="menu-promo-banner glass-card animate-fade-in">
                <div className="promo-lottie-split">
                  <div className="promo-lottie-container">
                    <LottieAnimation 
                      url="https://lottie.host/9e416a9a-32d7-466d-9721-a47781b0a8eb/J40xO1Hplk.json" 
                      width="100px" 
                      height="100px" 
                    />
                  </div>
                  <div className="promo-content-split">
                    <div className="promo-badge"><Sparkles size={14} /> Freshness</div>
                    <h4>{language === 'de' ? 'Qualität, die man schmeckt' : 'Quality You Can Taste'}</h4>
                    <p>{language === 'de' ? 'Unser Fisch wird täglich geliefert. Jedes Sushi wird frisch für Sie gerollt, um maximale Qualität zu garantieren.' : 'Our fish is delivered daily. Every piece of sushi is rolled fresh for you to guarantee maximum quality.'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .menu-section {
          background: var(--bg-primary);
        }

        .menu-toggle-container {
          display: flex;
          justify-content: center;
          background: var(--bg-secondary);
          padding: 6px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          max-width: 400px;
          margin: 0 auto 30px;
        }

        .menu-toggle-btn {
          flex: 1;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .menu-toggle-btn.active {
          background: var(--accent-gold);
          color: #ffffff; /* White text for readability */
        }

        .lunch-note {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.2);
          color: var(--text-primary);
          padding: 16px 20px;
          border-radius: var(--radius-md);
          max-width: 800px;
          margin: 0 auto 30px;
          font-size: 0.95rem;
        }

        .text-gold {
          color: var(--accent-gold);
        }

        .search-filter-bar {
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 20px;
          margin-bottom: 40px;
        }

        .search-input-wrapper {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 48px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 0.95rem;
          color: var(--text-primary);
          transition: var(--transition-smooth);
        }

        .search-input:focus {
          border-color: var(--accent-gold);
          box-shadow: 0 0 10px var(--accent-gold-glow);
        }

        .dietary-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .filter-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .filter-tag:hover {
          border-color: var(--accent-gold);
          color: var(--text-primary);
        }

        .filter-tag.active-veg {
          background: rgba(85, 111, 68, 0.08);
          color: var(--accent-coral);
          border-color: rgba(85, 111, 68, 0.25);
        }
        .filter-tag.active-vegan {
          background: rgba(85, 111, 68, 0.12);
          color: var(--accent-coral);
          border-color: var(--accent-coral);
        }
        .filter-tag.active-spicy {
          background: rgba(224, 90, 71, 0.1);
          color: var(--accent-coral);
          border-color: var(--accent-coral);
        }
        .filter-tag.active-gf {
          background: rgba(212, 175, 55, 0.1);
          color: var(--accent-gold);
          border-color: var(--accent-gold);
        }

        /* Category tabs */
        .category-tabs-container {
          overflow-x: auto;
          margin-bottom: 35px;
          padding-bottom: 5px;
        }
        
        .category-tabs-container::-webkit-scrollbar {
          height: 4px;
        }
        
        .category-tabs-container::-webkit-scrollbar-thumb {
          background: var(--border-color);
        }

        .category-tabs {
          display: flex;
          gap: 8px;
          width: max-content;
        }

        .category-tab {
          padding: 10px 18px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .category-tab:hover:not(.disabled) {
          border-color: var(--accent-gold);
          color: var(--text-primary);
        }

        .category-tab.active {
          background: var(--accent-gold);
          color: #ffffff; /* White text for readability */
          border-color: var(--accent-gold);
        }

        .category-tab.disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Grid */
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .menu-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 140px;
        }

        .menu-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 10px;
        }

        .menu-card-code-title {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .item-code {
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid var(--border-color);
          color: var(--accent-gold);
          font-weight: 700;
          font-size: 0.75rem;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          font-family: var(--font-heading);
        }

        .item-title {
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .item-price-container {
          white-space: nowrap;
        }

        .item-price {
          color: var(--accent-gold);
          font-weight: 700;
          font-size: 1.15rem;
          font-family: var(--font-heading);
        }

        .price-divider {
          color: var(--text-muted);
          font-weight: 300;
          margin: 0 4px;
        }

        .item-description {
          color: var(--text-secondary);
          font-size: 0.88rem;
          line-height: 1.5;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .item-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .no-items-found {
          grid-column: span 2;
          text-align: center;
          padding: 60px 0;
          color: var(--text-secondary);
          border: 1px dashed var(--border-color);
          border-radius: var(--radius-lg);
          background: var(--bg-secondary);
        }

        /* Lunch menu structures */
        .lunch-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .lunch-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .menu-promo-banner {
          position: relative;
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 250px;
        }

        .promo-lottie-split {
          display: flex;
          align-items: center;
          gap: 24px;
          width: 100%;
        }

        .promo-lottie-container {
          flex-shrink: 0;
          background: rgba(250, 248, 245, 0.7);
          border-radius: 50%;
          padding: 12px;
          border: 1px solid var(--border-color);
          box-shadow: 0 4px 15px rgba(85, 111, 68, 0.05);
        }

        .promo-content-split {
          flex-grow: 1;
        }

        .promo-content-split h4 {
          font-size: 1.3rem;
          margin-bottom: 6px;
          color: var(--text-primary);
        }

        .promo-content-split p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .promo-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--accent-gold);
          color: #120f0d;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
        }

        .promo-content h4 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .promo-content p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .menu-section {
          position: relative;
          overflow: hidden;
        }

        .menu-koi-watermark {
          position: absolute;
          left: 5%;
          bottom: 10%;
          width: 300px;
          height: 300px;
          z-index: 0;
          pointer-events: none;
          animation: floatSlowReverse 18s infinite alternate ease-in-out;
        }

        @keyframes floatSlowReverse {
          0% { transform: translateY(0) rotate(0deg) scale(1.05); }
          100% { transform: translateY(15px) rotate(-8deg) scale(0.95); }
        }

        @media (max-width: 991px) {
          .lunch-container {
            grid-template-columns: 1fr;
          }
          .menu-promo-banner {
            min-height: 250px;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .menu-grid {
            grid-template-columns: 1fr;
          }
          .no-items-found {
            grid-column: span 1;
          }
          .search-filter-bar {
            padding: 14px;
          }
        }
      `}</style>
    </section>
  );
};
