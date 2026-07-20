import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

import gallery1 from '../assets/gallery/gallery1.jpg';
import gallery2 from '../assets/gallery/gallery2.jpg';
import gallery3 from '../assets/gallery/gallery3.jpg';
import gallery4 from '../assets/gallery/gallery4.jpg';
import gallery5 from '../assets/gallery/gallery5.jpg';

interface GalleryItem {
  id: number;
  src: string;
  titleDe: string;
  titleEn: string;
  titleJa: string;
  category: 'art' | 'interior' | 'ambiance';
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    src: gallery1,
    titleDe: 'Große Welle von Kanagawa Wandgemälde & Bar',
    titleEn: 'The Great Wave Mural & Wooden Sushi Bar',
    titleJa: '神奈川沖浪裏の壁画とカウンター席',
    category: 'art',
  },
  {
    id: 2,
    src: gallery2,
    titleDe: 'Tranquil Buddha Statur & Ausleuchtung',
    titleEn: 'Serene Buddha Statue & Warm Atmosphere Lighting',
    titleJa: '静寂な仏像と温もりあるライティング',
    category: 'ambiance',
  },
  {
    id: 3,
    src: gallery3,
    titleDe: 'Geisha & Rote Sonne Handbemalte Wand',
    titleEn: 'Hand-painted Geisha & Rising Sun Mural',
    titleJa: '手描きの芸者と日輪のモダンアート',
    category: 'art',
  },
  {
    id: 4,
    src: gallery4,
    titleDe: 'Japanisches Wandgemälde & Esstische',
    titleEn: 'Authentic Japanese Dining Table View',
    titleJa: '伝統美あふれるダイニングスペース',
    category: 'interior',
  },
  {
    id: 5,
    src: gallery5,
    titleDe: 'Gemütlicher Nook & Ukiyo-e Kunst',
    titleEn: 'Intimate Dining Nook featuring Ukiyo-e Wave Art',
    titleJa: '浮世絵アートに包まれたテーブル席',
    category: 'interior',
  },
];

export const GallerySection: React.FC = () => {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'art' | 'interior' | 'ambiance'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = galleryData.filter(
    item => activeFilter === 'all' || item.category === activeFilter
  );

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const getTitle = (item: GalleryItem) => {
    if (language === 'de') return item.titleDe;
    return item.titleEn;
  };

  return (
    <section id="gallery" className="gallery-section section" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-title animate-slide-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: 'var(--radius-full)', background: 'var(--accent-gold-glow)', color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px' }}>
            <Sparkles size={16} /> Kaido Atmosphere & Design
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            {language === 'de' ? 'Atmosphäre & Kunst handgefertigt' : 'Atmosphere & Artistic Design'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '12px auto 0', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {language === 'de' 
              ? 'Tauchen Sie ein in unser stilvolles japanisches Ambiente mit handbemalten Hokusai-Wandgemälden, fernöstlichen Akzenten und gemütlichen Holztischen.' 
              : 'Immerse yourself in our stylish Japanese dining space featuring hand-painted Great Wave murals, tranquil accents, and warm wooden counter craftsmanship.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {[
            { id: 'all', labelDe: 'Alle Fotos', labelEn: 'All Photos' },
            { id: 'art', labelDe: 'Wandgemälde & Kunst', labelEn: 'Murals & Art' },
            { id: 'interior', labelDe: 'Gastraum & Tische', labelEn: 'Dining & Tables' },
            { id: 'ambiance', labelDe: 'Stimmung & Beleuchtung', labelEn: 'Ambiance' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--border-color)',
                background: activeFilter === f.id ? 'var(--accent-gold)' : 'var(--bg-primary)',
                color: activeFilter === f.id ? '#ffffff' : 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                boxShadow: activeFilter === f.id ? '0 4px 15px var(--accent-gold-glow)' : 'none',
              }}
            >
              {language === 'de' ? f.labelDe : f.labelEn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                height: index === 0 || index === 2 ? '380px' : '320px',
              }}
              className="gallery-card-hover"
            >
              <img
                src={item.src}
                alt={getTitle(item)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
                className="gallery-img"
              />
              
              {/* Dark Gradient Overlay & Caption */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10, 10, 12, 0.88) 0%, rgba(10, 10, 12, 0.2) 60%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px',
                color: '#ffffff',
                transition: 'opacity 0.3s ease',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Kaido Gallery
                    </span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                      {getTitle(item)}
                    </h3>
                  </div>
                  <div style={{ padding: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)' }}>
                    <Maximize2 size={16} color="#ffffff" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 5, 8, 0.94)',
            backdropFilter: 'blur(12px)',
            zIndex: 1500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              padding: '10px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1510,
            }}
          >
            <X size={24} />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '24px',
              padding: '12px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1510,
            }}
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '24px',
              padding: '12px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1510,
            }}
          >
            <ChevronRight size={28} />
          </button>

          {/* Image & Title Container */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '1000px',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={filteredItems[lightboxIndex].src}
              alt={getTitle(filteredItems[lightboxIndex])}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                borderRadius: 'var(--radius-md)',
                objectFit: 'contain',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            />
            <div style={{ marginTop: '16px', textAlign: 'center', color: '#ffffff' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff' }}>
                {getTitle(filteredItems[lightboxIndex])}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                {lightboxIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-card-hover:hover .gallery-img {
          transform: scale(1.06);
        }
        .gallery-card-hover:hover {
          border-color: var(--accent-gold);
          box-shadow: 0 16px 40px rgba(192, 57, 43, 0.2);
        }
      `}</style>
    </section>
  );
};
