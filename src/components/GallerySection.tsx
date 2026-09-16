import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, ChevronRight, Maximize2, X, Pause, Play } from 'lucide-react';

import gallery1 from '../assets/gallery/gallery1.jpg';
import gallery2 from '../assets/gallery/gallery2.jpg';
import gallery3 from '../assets/gallery/gallery3.jpg';
import gallery4 from '../assets/gallery/gallery4.jpg';
import gallery5 from '../assets/gallery/gallery5.jpg';
import gallery6 from '../assets/gallery/gallery6.jpg';

interface GallerySlide {
  id: number;
  src: string;
  kanji: string;
  categoryDe: string;
  categoryEn: string;
  titleDe: string;
  titleEn: string;
  subtitleDe: string;
  subtitleEn: string;
}

const slides: GallerySlide[] = [
  {
    id: 1,
    src: gallery1,
    kanji: '檜',
    categoryDe: '01 / Der Meistertresen',
    categoryEn: '01 / The Cypress Counter',
    titleDe: 'Der Sushi-Tresen',
    titleEn: 'The Sushi Counter',
    subtitleDe: 'Frisches Sushi, meisterhaft und direkt vor Ihren Augen zubereitet.',
    subtitleEn: 'Fresh sushi, masterfully prepared right before your eyes.',
  },
  {
    id: 2,
    src: gallery2,
    kanji: '静',
    categoryDe: '02 / Gemütliches Ambiente',
    categoryEn: '02 / Cozy Environment',
    titleDe: 'Gemütliches Ambiente',
    titleEn: 'Cozy Environment',
    subtitleDe: 'Warme Beleuchtung und eine entspannte Stimmung zum Wohlfühlen.',
    subtitleEn: 'Warm lighting and a cozy, relaxing atmosphere to unwind.',
  },
  {
    id: 3,
    src: gallery3,
    kanji: '藝',
    categoryDe: '03 / Wandkunst',
    categoryEn: '03 / Wall Art',
    titleDe: 'Japanische Wandkunst',
    titleEn: 'Japanese Wall Art',
    subtitleDe: 'Traditionelle Kunstmotive für ein schönes, stimmungsvolles Ambiente.',
    subtitleEn: 'Traditional art motifs creating a lovely, stylish ambiance.',
  },
  {
    id: 4,
    src: gallery4,
    kanji: '座',
    categoryDe: '04 / Gästebereich',
    categoryEn: '04 / Dining Area',
    titleDe: 'Der Gästebereich',
    titleEn: 'Dining Area',
    subtitleDe: 'Bequeme Tische für ein genussvolles Essen mit Freunden und Familie.',
    subtitleEn: 'Comfortable seating for delicious meals with friends and family.',
  },
  {
    id: 5,
    src: gallery5,
    kanji: '庵',
    categoryDe: '05 / Private Nische',
    categoryEn: '05 / Private Seating',
    titleDe: 'Ungestörter Genuss',
    titleEn: 'Intimate Seating',
    subtitleDe: 'Ruhige Sitzecken für entspannte Abende und köstliche Gerichte.',
    subtitleEn: 'Quiet booths for relaxed evenings and delicious meals.',
  },
  {
    id: 6,
    src: gallery6,
    kanji: '匠',
    categoryDe: '06 / Atmosphäre',
    categoryEn: '06 / Atmosphere',
    titleDe: 'Kaido Architektur & Atmosphäre',
    titleEn: 'Kaido Architecture & Ambiance',
    subtitleDe: 'Gemütliches Ambiente, köstliche Speisen und herzliche Gastfreundschaft.',
    subtitleEn: 'Cozy environment, delicious meals, and warm hospitality.',
  },
];

export const GallerySection: React.FC = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[(currentIndex + 1) % slides.length];

  // Auto-play timer with smooth progress
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalTime = 60; // 60ms tick
    const totalTime = 6000;  // 6 seconds per slide
    const increment = (intervalTime / totalTime) * 100;

    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((oldIdx) => (oldIdx + 1) % slides.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  return (
    <section id="gallery" className="gallery-section section">
      {/* Subtle background ambient aura */}
      <div className="gallery-ambient-glow" />

      <div className="container">
        {/* Section Header */}
        <div className="section-title animate-slide-up">
          <span className="eyebrow-text">
            {language === 'de' ? 'Raum & Atmosphäre' : 'Ambiance & Atmosphere'}
          </span>
          <h2>{language === 'de' ? 'Architektur & Atmosphäre' : 'Architecture & Atmosphere'}</h2>
          <div className="hairline-divider" />
          <p style={{ marginTop: '16px' }}>
            {language === 'de'
              ? 'Gemütliches Ambiente, warme Atmosphäre und köstliche japanische Küche zum Wohlfühlen.'
              : 'Cozy environment, warm ambiance, and delicious Japanese meals to enjoy.'}
          </p>
        </div>

        {/* Modern Split-Stage Slideshow */}
        <div className="modern-slideshow-container glass-card">
          
          {/* LEFT: Editorial Narrative Panel */}
          <div className="slideshow-editorial-panel">
            {/* Top Row: Slide Counter & Auto-play control */}
            <div className="editorial-topbar">
              <div className="slide-counter-group">
                <span className="current-slide-num">0{currentIndex + 1}</span>
                <span className="slide-counter-sep">/</span>
                <span className="total-slides-num">0{slides.length}</span>
              </div>

              <div className="autoplay-control-group">
                <div className="progress-ring-container">
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <button
                  className="autoplay-toggle-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                </button>
              </div>
            </div>

            {/* Kanji Watermark Accent */}
            <div className="editorial-kanji-watermark">{currentSlide.kanji}</div>

            {/* Slide Category & Headings */}
            <div className="editorial-content-body">
              <span className="editorial-tag">
                {language === 'de' ? currentSlide.categoryDe : currentSlide.categoryEn}
              </span>
              
              <h3 className="editorial-title">
                {language === 'de' ? currentSlide.titleDe : currentSlide.titleEn}
              </h3>
              
              <div className="editorial-divider" />

              <p className="editorial-description">
                {language === 'de' ? currentSlide.subtitleDe : currentSlide.subtitleEn}
              </p>
            </div>

            {/* Quick Slide Category Selectors */}
            <div className="editorial-selectors">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  className={`selector-chip ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(idx)}
                >
                  <span className="chip-dot" />
                  <span className="chip-text">
                    {language === 'de' ? s.categoryDe.split('/')[1] : s.categoryEn.split('/')[1]}
                  </span>
                </button>
              ))}
            </div>

            {/* Modern Navigation Controls */}
            <div className="editorial-nav-controls">
              <div className="nav-arrows-group">
                <button 
                  className="modern-arrow-btn" 
                  onClick={handlePrev} 
                  aria-label="Vorheriges Bild"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  className="modern-arrow-btn" 
                  onClick={handleNext} 
                  aria-label="Nächstes Bild"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <button
                className="modern-lightbox-trigger"
                onClick={() => setIsLightboxOpen(true)}
              >
                <Maximize2 size={14} />
                <span>{language === 'de' ? 'Großansicht' : 'Enlarge'}</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Cinema Stage with Depth Peek */}
          <div className="slideshow-stage-panel">
            {/* Active Main Slide */}
            <div className="active-slide-frame" onClick={() => setIsLightboxOpen(true)}>
              <img
                key={currentSlide.id}
                src={currentSlide.src}
                alt={language === 'de' ? currentSlide.titleDe : currentSlide.titleEn}
                className="active-slide-image animate-fade-in"
              />
              <div className="slide-image-vignette" />

              {/* Floating Mon Seal */}
              <div className="slide-floating-seal">
                <span>{currentSlide.kanji}</span>
              </div>
            </div>

            {/* Next Slide Depth Preview Card */}
            <div className="next-slide-peek" onClick={handleNext} title={language === 'de' ? 'Nächstes Motiv' : 'Next preview'}>
              <img
                src={nextSlide.src}
                alt="Next preview"
                className="peek-image"
              />
              <div className="peek-overlay">
                <span className="peek-label">{language === 'de' ? 'Weiter' : 'Next'}</span>
                <ChevronRight size={16} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Museum Lightbox */}
      {isLightboxOpen && (
        <div className="modal-overlay lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>
            <X size={26} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={currentSlide.src} alt={currentSlide.titleDe} className="lightbox-image" />
            <div className="lightbox-info">
              <span className="lightbox-tag">
                {language === 'de' ? currentSlide.categoryDe : currentSlide.categoryEn}
              </span>
              <h4>{language === 'de' ? currentSlide.titleDe : currentSlide.titleEn}</h4>
              <p>{language === 'de' ? currentSlide.subtitleDe : currentSlide.subtitleEn}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-section {
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          transition: background-color 0.35s ease;
        }

        .gallery-ambient-glow {
          position: absolute;
          top: 40%;
          left: 60%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Modern Container Box */
        .modern-slideshow-container {
          display: grid;
          grid-template-columns: 1.15fr 1.85fr;
          min-height: 640px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 175, 55, 0.06);
        }

        /* LEFT: Editorial Panel */
        .slideshow-editorial-panel {
          padding: 48px 42px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid var(--border-color);
          position: relative;
          background: var(--bg-secondary);
        }

        .editorial-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .slide-counter-group {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .current-slide-num {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          line-height: 1;
          color: var(--color-gold);
          font-weight: 400;
        }

        .slide-counter-sep {
          color: var(--color-text-muted);
          font-size: 1rem;
        }

        .total-slides-num {
          font-family: var(--font-eyebrow);
          font-size: 0.85rem;
          color: var(--color-text-muted);
          letter-spacing: 0.1em;
        }

        .autoplay-control-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .progress-bar-track {
          width: 80px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--color-gold);
          transition: width 0.08s linear;
        }

        .autoplay-toggle-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.25);
          background: rgba(20, 24, 31, 0.8);
          color: var(--color-gold-light);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .autoplay-toggle-btn:hover {
          border-color: var(--color-gold);
          color: #ffffff;
        }

        .editorial-kanji-watermark {
          position: absolute;
          right: 24px;
          top: 80px;
          font-family: var(--font-serif);
          font-size: 8rem;
          line-height: 1;
          color: var(--color-gold);
          opacity: 0.035;
          pointer-events: none;
          user-select: none;
        }

        .editorial-content-body {
          margin: auto 0;
          padding: 20px 0;
        }

        .editorial-tag {
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--color-gold);
          display: block;
          margin-bottom: 12px;
        }

        .editorial-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 2.8vw, 2.6rem);
          color: var(--text-primary);
          line-height: 1.22;
          letter-spacing: 0.02em;
          margin-bottom: 16px;
          font-weight: 400;
        }

        .editorial-divider {
          width: 48px;
          height: 1px;
          background: rgba(212, 175, 55, 0.35);
          margin-bottom: 18px;
        }

        .editorial-description {
          font-size: 0.96rem;
          line-height: 1.75;
          color: var(--text-secondary);
          font-weight: 300;
        }

        /* Quick selectors */
        .editorial-selectors {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }

        .selector-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(14, 17, 22, 0.6);
          color: var(--color-text-muted);
          font-family: var(--font-eyebrow);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .selector-chip:hover {
          border-color: rgba(212, 175, 55, 0.3);
          color: var(--color-washi-dim);
        }

        .selector-chip.active {
          border-color: var(--color-gold);
          background: rgba(212, 175, 55, 0.1);
          color: var(--color-gold-light);
        }

        .chip-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: currentColor;
        }

        /* Nav controls */
        .editorial-nav-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-arrows-group {
          display: flex;
          gap: 10px;
        }

        .modern-arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.25);
          background: rgba(20, 24, 31, 0.8);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .modern-arrow-btn:hover {
          border-color: var(--color-gold);
          background: rgba(212, 175, 55, 0.15);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
          transform: translateY(-1px);
        }

        .modern-lightbox-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-gold-light);
          cursor: pointer;
          opacity: 0.8;
          transition: var(--transition-fast);
        }

        .modern-lightbox-trigger:hover {
          color: #ffffff;
          opacity: 1;
        }

        /* RIGHT: Cinema Stage with Depth Peek */
        .slideshow-stage-panel {
          position: relative;
          display: flex;
          overflow: hidden;
          background: #060709;
        }

        .active-slide-frame {
          flex: 1;
          position: relative;
          height: 100%;
          overflow: hidden;
          cursor: pointer;
        }

        .active-slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .active-slide-frame:hover .active-slide-image {
          transform: scale(1.03);
        }

        .slide-image-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(11, 13, 18, 0.5) 0%,
            transparent 30%,
            transparent 70%,
            rgba(6, 7, 9, 0.7) 100%
          );
          pointer-events: none;
        }

        .slide-floating-seal {
          position: absolute;
          bottom: 28px;
          right: 28px;
          width: 48px;
          height: 48px;
          border-radius: 4px;
          border: 1px solid var(--color-gold);
          background: rgba(10, 12, 16, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--color-gold);
          pointer-events: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        /* Next Peek Card */
        .next-slide-peek {
          width: 90px;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-left: 1px solid rgba(212, 175, 55, 0.2);
          transition: width 0.35s ease;
        }

        .next-slide-peek:hover {
          width: 120px;
        }

        .peek-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.35) blur(1px);
          transition: filter 0.3s ease;
        }

        .next-slide-peek:hover .peek-image {
          filter: brightness(0.55);
        }

        .peek-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #ffffff;
          font-family: var(--font-eyebrow);
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: rgba(8, 10, 14, 0.4);
        }

        /* Lightbox */
        .lightbox-overlay {
          padding: 30px;
        }

        .lightbox-close {
          position: absolute;
          top: 24px;
          right: 28px;
          color: #ffffff;
          cursor: pointer;
          z-index: 1010;
        }

        .lightbox-content {
          max-width: 1100px;
          width: 100%;
          background: #0a0d11;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .lightbox-image {
          width: 100%;
          max-height: 70vh;
          object-fit: cover;
        }

        .lightbox-info {
          padding: 24px 32px;
        }

        .lightbox-tag {
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          color: var(--color-gold);
          letter-spacing: 0.25em;
          display: block;
          margin-bottom: 6px;
        }

        .lightbox-info h4 {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: #ffffff;
          margin-bottom: 6px;
        }

        @media (max-width: 1024px) {
          .modern-slideshow-container {
            grid-template-columns: 1fr;
          }
          .slideshow-editorial-panel {
            border-right: none;
            border-bottom: 1px solid rgba(212, 175, 55, 0.16);
            padding: 36px 28px;
          }
          .slideshow-stage-panel {
            height: 440px;
          }
          .next-slide-peek {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .slideshow-editorial-panel {
            padding: 24px 18px;
          }
          .slideshow-stage-panel {
            height: 300px;
          }
          .current-slide-num {
            font-size: 1.25rem;
          }
          .total-slides-num {
            font-size: 0.62rem;
          }
          .editorial-tag {
            font-size: 0.54rem;
            letter-spacing: 0.16em;
            margin-bottom: 6px;
          }
          .editorial-title {
            font-size: 1.15rem;
            line-height: 1.25;
            margin-bottom: 8px;
          }
          .editorial-divider {
            margin-bottom: 10px;
          }
          .editorial-description {
            font-size: 0.76rem;
            line-height: 1.55;
          }
          .editorial-content-body {
            padding: 10px 0;
          }
          .editorial-selectors {
            gap: 5px;
            margin-bottom: 16px;
          }
          .selector-chip {
            font-size: 0.56rem;
            padding: 3px 8px;
            letter-spacing: 0.05em;
          }
          .modern-arrow-btn {
            width: 36px;
            height: 36px;
          }
          .modern-lightbox-trigger {
            font-size: 0.58rem;
          }
          .slide-floating-seal {
            width: 32px;
            height: 32px;
            font-size: 0.95rem;
            bottom: 12px;
            right: 12px;
          }
          .lightbox-info {
            padding: 14px 18px;
          }
          .lightbox-info h4 {
            font-size: 1.1rem;
          }
          .lightbox-tag {
            font-size: 0.58rem;
          }
        }

        /* =========================================
           Day Mode (Light Theme) Gallery Refinements
           ========================================= */
        [data-theme="light"] .modern-slideshow-container {
          background: #ffffff;
          border-color: rgba(160, 120, 25, 0.22);
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.06), 0 2px 10px rgba(160, 120, 25, 0.05);
        }

        [data-theme="light"] .slideshow-editorial-panel {
          background: #ffffff;
          border-color: rgba(160, 120, 25, 0.16);
        }

        @media (max-width: 1024px) {
          [data-theme="light"] .slideshow-editorial-panel {
            border-bottom-color: rgba(160, 120, 25, 0.18);
          }
        }

        [data-theme="light"] .current-slide-num {
          color: var(--color-gold);
        }

        [data-theme="light"] .slide-counter-sep,
        [data-theme="light"] .total-slides-num {
          color: #64676e;
        }

        [data-theme="light"] .progress-bar-track {
          background: rgba(0, 0, 0, 0.08);
        }

        [data-theme="light"] .autoplay-toggle-btn {
          background: #f4f0e6;
          border-color: rgba(160, 120, 25, 0.35);
          color: #806216;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        [data-theme="light"] .autoplay-toggle-btn:hover {
          background: #ebe4d5;
          border-color: var(--color-gold);
          color: #17181a;
          box-shadow: 0 4px 12px rgba(160, 120, 25, 0.18);
        }

        [data-theme="light"] .editorial-kanji-watermark {
          color: var(--color-gold);
          opacity: 0.055;
        }

        [data-theme="light"] .editorial-tag {
          color: var(--color-gold);
        }

        [data-theme="light"] .editorial-title {
          color: #17181a;
        }

        [data-theme="light"] .editorial-divider {
          background: rgba(160, 120, 25, 0.35);
        }

        [data-theme="light"] .editorial-description {
          color: #3a3c42;
        }

        /* Light Mode Chips: Warm washi parchment pill with crisp Sumi-ink typography */
        [data-theme="light"] .selector-chip {
          background: #f4f0e6;
          border: 1px solid rgba(160, 120, 25, 0.24);
          color: #2b2d32;
          font-weight: 500;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
        }

        [data-theme="light"] .selector-chip:hover {
          background: #eae2d1;
          border-color: var(--color-gold);
          color: #17181a;
          transform: translateY(-1px);
        }

        [data-theme="light"] .selector-chip.active {
          background: rgba(160, 120, 25, 0.16);
          border-color: var(--color-gold);
          color: #806216;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(160, 120, 25, 0.14);
        }

        /* Light Mode Arrow Navigation: Crisp ivory background with warm gold borders */
        [data-theme="light"] .modern-arrow-btn {
          background: #ffffff;
          border: 1px solid rgba(160, 120, 25, 0.35);
          color: #17181a;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
        }

        [data-theme="light"] .modern-arrow-btn:hover {
          background: #f4f0e6;
          border-color: var(--color-gold);
          color: #806216;
          box-shadow: 0 4px 16px rgba(160, 120, 25, 0.2);
          transform: translateY(-1px);
        }

        [data-theme="light"] .modern-lightbox-trigger {
          color: #806216;
          opacity: 0.92;
        }

        [data-theme="light"] .modern-lightbox-trigger:hover {
          color: #17181a;
          opacity: 1;
        }

        [data-theme="light"] .slide-floating-seal {
          background: rgba(255, 255, 255, 0.9);
          border-color: var(--color-gold);
          color: var(--color-gold);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
        }

        [data-theme="light"] .lightbox-content {
          background: #ffffff;
          border-color: rgba(160, 120, 25, 0.3);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
        }

        [data-theme="light"] .lightbox-info h4 {
          color: #17181a;
        }

        [data-theme="light"] .lightbox-close {
          color: #17181a;
          background: rgba(255, 255, 255, 0.85);
          border-radius: 50%;
          padding: 6px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
};
