import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Award, ExternalLink, Maximize2, X } from 'lucide-react';
import restaurantGuruImg from '../assets/restaurant-guru.png';
import certImg from '../assets/gallery/Certificate.jpeg';

interface Review {
  id: number;
  name: string;
  rating: number;
  textDe: string;
  textEn: string;
  dateDe: string;
  dateEn: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    name: 'Thomas L.',
    rating: 5,
    textDe: 'Sensationelle Sushi-Kompositionen. Alles von kompromissloser Frische, handwerklich makellos gerollt und mit vollendeter Ästhetik serviert. Eine Klasse für sich.',
    textEn: 'Sensational sushi compositions. Everything exhibits uncompromising freshness, rolled with master-level precision and plated with sublime grace.',
    dateDe: 'Kürzlich',
    dateEn: 'Recent Patron'
  },
  {
    id: 2,
    name: 'Sarah M.',
    rating: 5,
    textDe: 'Einfühlsamer, hochgradig diskreter Service. Man spürt vom ersten Moment an die gelebte Omotenashi-Tradition. Ein seltener Zufluchtsort des guten Geschmacks.',
    textEn: 'Attentive, profoundly discreet service. One senses true Omotenashi from the very first moment. A rare sanctuary of refined taste.',
    dateDe: 'Vergangener Monat',
    dateEn: 'Last Month'
  },
  {
    id: 3,
    name: 'David K.',
    rating: 5,
    textDe: 'Unglaubliche Klarheit der Aromen. Die Omakase-Auswahl des Meisters war ein kulinarisches Kunstwerk. Hier wird Sushi nicht zubereitet – es wird zelebriert.',
    textEn: 'Incredible clarity of flavors. The master’s omakase tasting was an edible masterpiece. Here, sushi is not merely prepared — it is reverently celebrated.',
    dateDe: 'Herbst 2025',
    dateEn: 'Autumn 2025'
  },
  {
    id: 4,
    name: 'Yuki S.',
    rating: 5,
    textDe: 'Ein authentisches Kleinod im 2. Wiener Bezirk. Frischester Fisch, meisterhafte Messerführung und unaufdringliche Eleganz wie in den besten Häusern Kyotos.',
    textEn: 'An authentic jewel in Vienna’s 2nd district. Pristine seasonal fish, immaculate blade work, and understated elegance reminiscent of Kyoto’s finest counters.',
    dateDe: 'Kürzlich',
    dateEn: 'Recent Patron'
  }
];

export const Reviews: React.FC = () => {
  const { language } = useLanguage();
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  return (
    <section id="reviews" className="reviews-section section">
      <div className="container">
        {/* Header Block with Rating */}
        <div className="reviews-header-block animate-slide-up">
          <div className="reviews-title-area">
            <span className="eyebrow-text">
              {language === 'de' ? 'Stimmen unserer Gäste' : 'Patron Reflections'}
            </span>
            <h2 className="section-title-text">
              {language === 'de' ? 'Resonanz & Würdigung' : 'Reflections & Accolades'}
            </h2>
            <div className="hairline-divider" style={{ margin: '14px 0 24px' }} />
            
            {/* Rating Summary */}
            <div className="rating-summary-pill">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--color-gold)" color="var(--color-gold)" />
                ))}
              </div>
              <span className="rating-value">4.8 / 5.0</span>
              <span className="rating-divider">•</span>
              <span className="reviews-count">
                {language === 'de' ? 'Hervorragende Bewertung über 450+ Rezensionen' : 'Exceptional rating across 450+ guest reviews'}
              </span>
            </div>
          </div>
        </div>

        {/* Official Distinction Showcase - Large Always-Visible Certificate */}
        <div className="distinction-card glass-card animate-slide-up">
          <div className="distinction-content">
            <div className="distinction-tag">
              <Award size={16} />
              <span>{language === 'de' ? 'Gastronomische Würdigung' : 'Culinary Distinction'}</span>
            </div>

            <h3>
              {language === 'de' ? 'Ausgezeichnet auf Restaurant Guru' : 'Recommended on Restaurant Guru'}
            </h3>

            <p>
              {language === 'de' 
                ? 'Kaido wurde von Restaurant Guru offiziell mit der Auszeichnungs-Urkunde für herausragende kulinarische Qualität und Gastfreundschaft geehrt.' 
                : 'Kaido was officially honored with the certificate of excellence by Restaurant Guru for superior culinary quality and hospitality.'}
            </p>

            <div className="distinction-actions">
              <a 
                href="https://de.restaurantguru.com/Kaido-Sushi-Bar-Vienna?utm_source=rg_certificate9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="distinction-link"
              >
                <span>Restaurant Guru Profil</span>
                <ExternalLink size={13} />
              </a>

              <div className="distinction-seal-badge">
                <img src={restaurantGuruImg} alt="Restaurant Guru Badge" className="seal-badge-img" />
                <span className="seal-badge-text">2023 Recommended</span>
              </div>
            </div>
          </div>

          {/* Large Visible Certificate Display */}
          <div className="distinction-cert-display">
            <div className="cert-frame-wrapper" onClick={() => setIsCertModalOpen(true)} title={language === 'de' ? 'Klicken für Vollbild' : 'Click for fullscreen'}>
              <img 
                src={certImg} 
                alt="Kaido Restaurant Guru Original Certificate" 
                className="cert-prominent-image" 
              />
              <div className="cert-frame-border" />
              <div className="cert-hover-hint">
                <Maximize2 size={15} />
                <span>{language === 'de' ? 'Vollbild' : 'Fullscreen'}</span>
              </div>
            </div>
            <span className="cert-display-caption">
              {language === 'de' ? 'Original-Zertifikat • Restaurant Guru 2023' : 'Original Certificate • Restaurant Guru 2023'}
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviewsData.map((review) => (
            <div key={review.id} className="review-card glass-card animate-slide-up">
              <div className="review-card-header">
                <div className="review-author-group">
                  <span className="review-author-initial">{review.name.charAt(0)}</span>
                  <div>
                    <h4 className="review-author-name">{review.name}</h4>
                    <span className="review-date">{language === 'de' ? review.dateDe : review.dateEn}</span>
                  </div>
                </div>
                <div className="review-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="var(--color-gold)" color="var(--color-gold)" />
                  ))}
                </div>
              </div>

              <blockquote className="review-quote">
                “{language === 'de' ? review.textDe : review.textEn}”
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {isCertModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCertModalOpen(false)}>
          <div className="modal-content cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal-header">
              <div className="cert-modal-title">
                <Award size={18} className="text-gold" />
                <h3>{language === 'de' ? 'Offizielle Auszeichnung 2023' : 'Official Distinction 2023'}</h3>
              </div>
              <button 
                className="cert-modal-close" 
                onClick={() => setIsCertModalOpen(false)}
                aria-label="Schließen"
              >
                <X size={22} />
              </button>
            </div>
            <div className="cert-modal-body">
              <img 
                src={certImg} 
                alt="Kaido Restaurant Guru Original Certificate" 
                className="cert-full-image" 
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .reviews-section {
          background: var(--bg-primary);
          position: relative;
          transition: background-color 0.35s ease;
        }

        .reviews-header-block {
          margin-bottom: 50px;
        }

        .section-title-text {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 400;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }

        .rating-summary-pill {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 8px 20px;
          border-radius: var(--radius-full);
          font-family: var(--font-eyebrow);
          font-size: 0.78rem;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .stars-row {
          display: flex;
          gap: 4px;
        }

        .rating-value {
          color: var(--color-gold);
          font-weight: 600;
        }

        .rating-divider {
          opacity: 0.3;
        }

        /* Distinction Showcase Card */
        .distinction-card {
          margin-bottom: 60px;
          padding: 44px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 36px;
          border: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }

        .distinction-content {
          max-width: 620px;
        }

        .distinction-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--color-gold);
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .distinction-content h3 {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 10px;
          letter-spacing: 0.02em;
        }

        .distinction-content p {
          color: var(--text-secondary);
          font-size: 0.98rem;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .distinction-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .distinction-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-eyebrow);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: var(--color-gold-light);
          text-transform: uppercase;
          opacity: 0.85;
          transition: var(--transition-fast);
        }

        .distinction-link:hover {
          color: #ffffff;
          opacity: 1;
        }

        .distinction-seal-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(14, 18, 24, 0.7);
          border: 1px solid rgba(212, 175, 55, 0.2);
          padding: 6px 14px;
          border-radius: var(--radius-full);
        }

        .seal-badge-img {
          height: 26px;
          object-fit: contain;
        }

        .seal-badge-text {
          font-family: var(--font-eyebrow);
          font-size: 0.7rem;
          color: var(--color-gold-light);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* Large Prominent Certificate Display */
        .distinction-cert-display {
          flex: 0 0 380px;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .cert-frame-wrapper {
          position: relative;
          width: 100%;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.65), 0 0 30px rgba(212, 175, 55, 0.15);
          border: 2px solid rgba(212, 175, 55, 0.45);
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          background: #000000;
        }

        .cert-frame-wrapper:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: var(--color-gold);
          box-shadow: 0 22px 48px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 175, 55, 0.35);
        }

        .cert-prominent-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .cert-frame-border {
          position: absolute;
          inset: 6px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          pointer-events: none;
        }

        .cert-hover-hint {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(10, 12, 16, 0.88);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: var(--color-gold-light);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-family: var(--font-eyebrow);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.92;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .cert-frame-wrapper:hover .cert-hover-hint {
          opacity: 1;
          transform: scale(1.05);
        }

        .cert-display-caption {
          font-family: var(--font-eyebrow);
          font-size: 0.72rem;
          color: var(--color-gold-muted);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-align: center;
          opacity: 0.85;
        }

        /* Reviews Grid */
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .review-card {
          padding: 36px 32px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: var(--radius-md);
        }

        .review-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .review-author-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .review-author-initial {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--color-gold);
          background: rgba(212, 175, 55, 0.08);
        }

        .review-author-name {
          font-family: var(--font-eyebrow);
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          color: var(--text-primary);
        }

        .review-date {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          display: block;
        }

        .review-stars {
          display: flex;
          gap: 3px;
        }

        .review-quote {
          font-family: var(--font-serif);
          font-size: 1.12rem;
          font-style: italic;
          color: var(--color-washi-dim);
          line-height: 1.7;
          font-weight: 300;
        }

        /* Cert Modal */
        .cert-modal-content {
          max-width: 600px;
          background: #0b0d11;
          border: 1px solid rgba(212, 175, 55, 0.35);
        }

        .cert-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        .cert-modal-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cert-modal-title h3 {
          font-family: var(--font-eyebrow);
          font-size: 0.9rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #ffffff;
        }

        .cert-modal-close {
          background: none;
          border: none;
          color: var(--color-washi-dim);
          cursor: pointer;
        }

        .cert-modal-body {
          padding: 24px;
          display: flex;
          justify-content: center;
        }

        .cert-full-image {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: var(--radius-sm);
        }

        @media (max-width: 900px) {
          .distinction-card {
            flex-direction: column;
            text-align: center;
            padding: 36px 20px;
            gap: 30px;
          }
          .distinction-content {
            max-width: 100%;
          }
          .distinction-actions {
            justify-content: center;
            flex-wrap: wrap;
            gap: 16px;
          }
          .distinction-cert-display {
            flex: 1 1 auto;
            width: 100%;
            max-width: 380px;
          }
          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .rating-summary-pill {
            padding: 5px 12px;
            font-size: 0.64rem;
            gap: 7px;
          }
          .distinction-card {
            padding: 18px 14px;
            gap: 16px;
            margin-bottom: 28px;
          }
          .distinction-tag {
            font-size: 0.58rem;
            letter-spacing: 0.14em;
            margin-bottom: 6px;
          }
          .distinction-content h3 {
            font-size: 1.15rem;
            margin-bottom: 6px;
          }
          .distinction-content p {
            font-size: 0.76rem;
            line-height: 1.5;
            margin-bottom: 14px;
          }
          .distinction-link {
            font-size: 0.62rem;
          }
          .distinction-seal-badge {
            padding: 3px 8px;
            gap: 5px;
          }
          .seal-badge-text {
            font-size: 0.56rem;
          }
          .cert-display-caption {
            font-size: 0.6rem;
          }
          .cert-hover-hint {
            font-size: 0.56rem;
            padding: 3px 8px;
          }
          .reviews-grid {
            gap: 14px;
          }
          .review-card {
            padding: 15px 14px;
          }
          .review-author-initial {
            width: 28px;
            height: 28px;
            font-size: 0.85rem;
          }
          .review-author-name {
            font-size: 0.72rem;
          }
          .review-date {
            font-size: 0.6rem;
          }
          .review-quote {
            font-size: 0.78rem;
            line-height: 1.5;
          }
          .cert-modal-header {
            padding: 12px 16px;
          }
          .cert-modal-title h3 {
            font-size: 0.72rem;
          }
        }

        /* Day Mode Refinements for Reviews & Distinction */
        [data-theme="light"] .distinction-seal-badge {
          background: #f4f0e6;
          border-color: rgba(160, 120, 25, 0.28);
        }

        [data-theme="light"] .seal-badge-text {
          color: #806216;
        }

        [data-theme="light"] .distinction-link {
          color: #806216;
        }

        [data-theme="light"] .distinction-link:hover {
          color: #17181a;
        }

        [data-theme="light"] .cert-display-caption {
          color: #806216;
        }

        [data-theme="light"] .review-date {
          color: #64676e;
        }

        [data-theme="light"] .cert-modal-header {
          background: #fbf9f4;
          border-bottom-color: rgba(160, 120, 25, 0.25);
        }

        [data-theme="light"] .cert-modal-title h3 {
          color: #17181a;
        }

        [data-theme="light"] .cert-modal-close {
          color: #17181a;
        }
      `}</style>
    </section>
  );
};
