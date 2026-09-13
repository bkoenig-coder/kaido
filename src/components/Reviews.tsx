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

        {/* Official Distinction Showcase */}
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
                ? 'Kaido wurde von Restaurant Guru offiziell mit der Auszeichnungs-Urkunde für herausragende kulinarische Qualität geehrt.' 
                : 'Kaido was officially honored with the certificate of excellence by Restaurant Guru for superior culinary quality.'}
            </p>

            <div className="distinction-actions">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setIsCertModalOpen(true)}
              >
                <Maximize2 size={14} />
                <span>{language === 'de' ? 'Urkunde betrachten' : 'View Certificate'}</span>
              </button>

              <a 
                href="https://de.restaurantguru.com/Kaido-Sushi-Bar-Vienna?utm_source=rg_certificate9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="distinction-link"
              >
                <span>Restaurant Guru Profil</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          <div className="distinction-badge-wrapper" onClick={() => setIsCertModalOpen(true)}>
            <img 
              src={restaurantGuruImg} 
              alt="Restaurant Guru Distinction" 
              className="distinction-badge-img"
            />
            <span className="badge-hint">{language === 'de' ? 'Vergrößern' : 'Enlarge'}</span>
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
          background: #090b0e;
          position: relative;
        }

        .reviews-header-block {
          margin-bottom: 50px;
        }

        .section-title-text {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 0.02em;
        }

        .rating-summary-pill {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(20, 23, 29, 0.6);
          border: 1px solid rgba(212, 175, 55, 0.2);
          padding: 8px 20px;
          border-radius: var(--radius-full);
          font-family: var(--font-eyebrow);
          font-size: 0.78rem;
          color: var(--color-washi-dim);
          letter-spacing: 0.05em;
        }

        .stars-row {
          display: flex;
          gap: 4px;
        }

        .rating-value {
          color: var(--color-gold-light);
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
          border: 1px solid rgba(212, 175, 55, 0.28);
          background: linear-gradient(135deg, rgba(20, 24, 31, 0.8) 0%, rgba(13, 16, 21, 0.9) 100%);
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
          color: #ffffff;
          margin-bottom: 10px;
          letter-spacing: 0.02em;
        }

        .distinction-content p {
          color: var(--color-washi-dim);
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

        .distinction-badge-wrapper {
          flex-shrink: 0;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: rgba(10, 12, 16, 0.6);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: var(--radius-sm);
          transition: var(--transition-smooth);
        }

        .distinction-badge-wrapper:hover {
          border-color: var(--color-gold);
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.25);
          transform: translateY(-2px);
        }

        .distinction-badge-img {
          height: 100px;
          object-fit: contain;
        }

        .badge-hint {
          font-family: var(--font-eyebrow);
          font-size: 0.68rem;
          color: var(--color-gold-light);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        /* Reviews Grid */
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .review-card {
          padding: 36px 32px;
          background: rgba(16, 19, 25, 0.75);
          border: 1px solid rgba(212, 175, 55, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
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
          background: rgba(212, 175, 55, 0.05);
        }

        .review-author-name {
          font-family: var(--font-eyebrow);
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          color: #ffffff;
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
            padding: 30px 20px;
          }
          .distinction-actions {
            justify-content: center;
          }
          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
