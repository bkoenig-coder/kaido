import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles } from 'lucide-react';

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
  subtitleDe: string;
  subtitleEn: string;
  tag: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    src: gallery1,
    titleDe: 'Die Große Welle & die Sushi Bar',
    titleEn: 'The Great Wave & Handcrafted Wooden Bar',
    subtitleDe: 'Eindrucksvolles Hokusai-Wandgemälde gepaart mit traditioneller Holzkunst.',
    subtitleEn: 'Iconic Hokusai mural paired with traditional Japanese sushi counter craftsmanship.',
    tag: '01 / ATMOSPHERE',
  },
  {
    id: 2,
    src: gallery2,
    titleDe: 'Erhabene Buddha-Skulptur & Stimmung',
    titleEn: 'Serene Buddha Statue & Ambient Illumination',
    subtitleDe: 'Stimmungsvolle Beleuchtung und meditative Akzente für Ihre Entspannung.',
    subtitleEn: 'Warm lighting and zen spiritual accents creating a tranquil dining ambiance.',
    tag: '02 / AMBIANCE',
  },
  {
    id: 3,
    src: gallery3,
    titleDe: 'Moderne Geisha Wandkunst',
    titleEn: 'Contemporary Geisha & Crimson Sun Mural',
    subtitleDe: 'Handgemalte Kunstwerke, die Tradition und modernen Spirit verbinden.',
    subtitleEn: 'Hand-painted artwork blending timeless Japanese elegance with modern design.',
    tag: '03 / ARTISTRY',
  },
  {
    id: 4,
    src: gallery4,
    titleDe: 'Traditionelles Ukiyo-e Ambiente',
    titleEn: 'Traditional Ukiyo-e Dining Hall',
    subtitleDe: 'Gemütliche Tische umrahmt von meisterhafter japanischer Malerei.',
    subtitleEn: 'Spacious dining layout framed by vibrant Japanese sea waves and warm lamps.',
    tag: '04 / INTERIOR',
  },
  {
    id: 5,
    src: gallery5,
    titleDe: 'Intime Tisch-Nische',
    titleEn: 'Intimate Dining Table Nook',
    subtitleDe: 'Der perfekte Ort für ungestörte Abende und exklusive Genussmomente.',
    subtitleEn: 'The ideal setting for private dinners and memorable culinary moments.',
    tag: '05 / DINING',
  },
];

export const GallerySection: React.FC = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentItem = galleryData[activeIndex];

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + galleryData.length) % galleryData.length);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % galleryData.length);
  };

  return (
    <section id="gallery" className="gallery-section section" style={{ background: 'var(--bg-secondary)', padding: '90px 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1140px' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent-gold)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px'
          }}>
            <Sparkles size={14} /> Atmosphere & Interieur
          </span>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            {language === 'de' ? 'Einblicke in Kaido' : 'The Kaido Experience'}
          </h2>
          <div style={{ width: '50px', height: '2px', background: 'var(--accent-gold)', margin: '16px auto 0' }} />
        </div>

        {/* Featured Main Cinema Stage */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: '#0a0a0c',
          border: '1px solid var(--border-color)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          marginBottom: '24px'
        }}>
          {/* Main Image */}
          <div style={{ position: 'relative', width: '100%', height: '540px', overflow: 'hidden' }}>
            <img
              src={currentItem.src}
              alt={language === 'de' ? currentItem.titleDe : currentItem.titleEn}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />

            {/* Dark Vignette Gradient */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(12, 12, 16, 0.92) 0%, rgba(12, 12, 16, 0.3) 50%, rgba(12, 12, 16, 0.4) 100%)'
            }} />

            {/* Top Bar Info & Fullscreen Button */}
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '28px',
              right: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 3
            }}>
              <span style={{
                background: 'rgba(18, 15, 13, 0.75)',
                backdropFilter: 'blur(8px)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--accent-gold)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.15em'
              }}>
                {currentItem.tag}
              </span>

              <button
                onClick={() => setIsLightboxOpen(true)}
                style={{
                  background: 'rgba(18, 15, 13, 0.75)',
                  backdropFilter: 'blur(8px)',
                  padding: '10px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                title="Vollbild anzeigen"
              >
                <Maximize2 size={18} />
              </button>
            </div>

            {/* Navigation Arrows on Stage */}
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(18, 15, 13, 0.65)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 3,
                transition: 'var(--transition-fast)'
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(18, 15, 13, 0.65)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 3,
                transition: 'var(--transition-fast)'
              }}
            >
              <ChevronRight size={24} />
            </button>

            {/* Bottom Luxury Caption */}
            <div style={{
              position: 'absolute',
              bottom: '28px',
              left: '32px',
              right: '32px',
              zIndex: 3,
              color: '#ffffff'
            }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                {language === 'de' ? currentItem.titleDe : currentItem.titleEn}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.02rem', maxWidth: '680px', lineHeight: 1.5 }}>
                {language === 'de' ? currentItem.subtitleDe : currentItem.subtitleEn}
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Luxury Thumbnail Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '14px'
        }}>
          {galleryData.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  position: 'relative',
                  height: '100px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: isActive ? '2px solid var(--accent-gold)' : '1px solid var(--border-color)',
                  opacity: isActive ? 1 : 0.65,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                  background: '#000000',
                  boxShadow: isActive ? '0 8px 20px rgba(192, 57, 43, 0.3)' : 'none'
                }}
              >
                <img
                  src={item.src}
                  alt={language === 'de' ? item.titleDe : item.titleEn}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.4s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: isActive ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
                  transition: 'background 0.3s ease'
                }} />
              </button>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 5, 8, 0.95)',
            backdropFilter: 'blur(16px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '28px',
              padding: '12px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={26} />
          </button>

          <img
            src={currentItem.src}
            alt={language === 'de' ? currentItem.titleDe : currentItem.titleEn}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '92vw',
              maxHeight: '85vh',
              borderRadius: 'var(--radius-md)',
              objectFit: 'contain',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)'
            }}
          />
        </div>
      )}

      <style>{`
        .gallery-main-stage {
          height: 540px;
        }

        @media (max-width: 768px) {
          .gallery-main-stage {
            height: 340px !important;
          }
          .gallery-stage-title {
            font-size: 1.25rem !important;
          }
          .gallery-stage-subtitle {
            font-size: 0.85rem !important;
          }
          .gallery-thumb-strip {
            gap: 8px !important;
          }
          .gallery-thumb-btn {
            height: 65px !important;
          }
        }

        @media (max-width: 480px) {
          .gallery-main-stage {
            height: 280px !important;
          }
          .gallery-nav-arrow {
            width: 36px !important;
            height: 36px !important;
          }
          .gallery-stage-caption {
            bottom: 16px !important;
            left: 16px !important;
            right: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};
