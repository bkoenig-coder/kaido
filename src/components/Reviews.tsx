import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Award, ExternalLink, CheckCircle2 } from 'lucide-react';
import { LottieAnimation } from './LottieAnimation';
import restaurantGuruImg from '../assets/restaurant-guru.png';

interface Review {
  id: number;
  name: string;
  rating: number;
  textDe: string;
  textEn: string;
  dateDe: string;
  dateEn: string;
  avatarUrl?: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    name: 'Thomas L.',
    rating: 5,
    textDe: 'Sensationelle Sushi-Platten! Alles extrem frisch, handwerklich perfekt gerollt und wunderschön präsentiert. Für mich das beste Sushi in Wien!',
    textEn: 'Sensational sushi platters! Everything is extremely fresh, perfectly rolled, and beautifully presented. For me, the best sushi in Vienna!',
    dateDe: 'Vor einer Woche',
    dateEn: '1 week ago'
  },
  {
    id: 2,
    name: 'Sarah M.',
    rating: 5,
    textDe: 'Wirklich reizendes Personal. Der Service war aufmerksam, sympathisch und extrem freundlich. Man fühlt sich sofort willkommen und wie zu Hause!',
    textEn: 'Really lovely staff. The service was attentive, warm, and extremely friendly. You immediately feel welcome and at home!',
    dateDe: 'Vor 2 Wochen',
    dateEn: '2 weeks ago'
  },
  {
    id: 3,
    name: 'David K.',
    rating: 5,
    textDe: 'Unglaubliche Frische und liebevolle Präsentation. Die Platte des Küchenchefs war ein Kunstwerk und schmeckte hervorragend. Sehr faire Preise!',
    textEn: 'Amazing freshness and lovely presentation. The Chef’s Plate was a work of art and tasted outstanding. Very fair prices for the quality!',
    dateDe: 'Vor einem Monat',
    dateEn: '1 month ago'
  },
  {
    id: 4,
    name: 'Yuki S.',
    rating: 5,
    textDe: 'Ein gemütliches kleines Juwel im 2. Bezirk. Frischer Fisch, kreative Rollen und herzerwärmende Gastfreundschaft. Fühlt sich an wie ein Kurztrip nach Japan!',
    textEn: 'A cozy little gem in the 2nd district. Fresh fish, creative rolls, and heartwarming hospitality. Feels like a quick trip to Japan!',
    dateDe: 'Vor 2 Monaten',
    dateEn: '2 months ago'
  }
];

export const Reviews: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="reviews" className="reviews-section section">
      {/* Decorative background accent */}
      <div className="reviews-bg-pattern"></div>

      <div className="container">
        {/* Header Block with Rating and Lucky Cat Lottie */}
        <div className="reviews-header-block animate-slide-up">
          <div className="reviews-title-area">
            <span className="section-subtitle">
              {language === 'de' ? 'Kundenstimmen' : 'Testimonials'}
            </span>
            <h2 className="section-title-text">
              {language === 'de' ? 'Was unsere Gäste sagen' : 'What Our Guests Say'}
            </h2>
            
            {/* Google Rating Summary */}
            <div className="google-rating-summary">
              <div className="google-logo-wrapper">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
              </div>
              <div className="rating-text-wrapper">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  ))}
                  <span className="rating-value">4.8 / 5</span>
                </div>
                <span className="reviews-count">
                  {language === 'de' ? 'basierend auf 450+ Google-Bewertungen' : 'based on 450+ Google reviews'}
                </span>
              </div>
            </div>
          </div>

          {/* Cute Animation next to Rating */}
          <div className="reviews-lottie-badge">
            <LottieAnimation 
              url="https://lottie.host/7b34dc46-b0c2-4b31-ae1b-9aef57e74ea8/R4k9Jo6VVC.json" 
              width="90px" 
              height="90px" 
            />
            <span className="lottie-cat-bubble">
              {language === 'de' ? 'Danke! ❤️' : 'Thank You! ❤️'}
            </span>
          </div>
        </div>

        {/* Official Restaurant Guru Certificate Showcase Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(192, 57, 43, 0.06) 0%, rgba(12, 45, 51, 0.08) 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid rgba(192, 57, 43, 0.3)',
          padding: '28px 32px',
          marginBottom: '48px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.06)',
          flexWrap: 'wrap'
        }} className="animate-slide-up">
          {/* Certificate Image Frame */}
          <a
            href="https://de.restaurantguru.com/Kaido-Sushi-Bar-Vienna?utm_source=rg_certificate9"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.18)',
              border: '2px solid var(--accent-gold)',
              transition: 'transform 0.3s ease',
              flexShrink: 0,
              maxWidth: '210px',
              cursor: 'pointer'
            }}
          >
            <img
              src={restaurantGuruImg}
              alt="Recommended on Restaurant Guru 2023 - Kaido Sushi Bar"
              style={{ width: '100%', display: 'block' }}
            />
          </a>

          {/* Certificate Info Details */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              <Award size={18} /> Offizielle Auszeichnung 2023
            </div>

            <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {language === 'de' ? 'Empfohlen auf Restaurant Guru' : 'Recommended on Restaurant Guru'}
              <CheckCircle2 size={22} color="#2ecc71" fill="rgba(46, 204, 113, 0.15)" />
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.6, marginBottom: '20px', maxWidth: '620px' }}>
              {language === 'de' 
                ? 'Kaido wurde von Restaurant Guru offiziell als eine der besten Adressen für erstklassiges Sushi & japanische Spezialitäten in Wien ausgezeichnet.' 
                : 'Kaido has been officially recognized by Restaurant Guru as one of the recommended destinations for premium sushi and Japanese dining in Vienna.'}
            </p>

            <a
              href="https://de.restaurantguru.com/Kaido-Sushi-Bar-Vienna?utm_source=rg_certificate9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', fontSize: '0.9rem' }}
            >
              <span>{language === 'de' ? 'Zertifikat auf Restaurant Guru ansehen' : 'View Award on Restaurant Guru'}</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviewsData.map((review) => (
            <div key={review.id} className="review-card glass-card animate-fade-in">
              <div className="review-card-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="reviewer-name">{review.name}</h4>
                    <span className="review-date">
                      {language === 'de' ? review.dateDe : review.dateEn}
                    </span>
                  </div>
                </div>
                <div className="google-badge-mini">
                  <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>
              
              <div className="review-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                ))}
              </div>
              
              <p className="review-text">
                "{language === 'de' ? review.textDe : review.textEn}"
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .reviews-section {
          background: var(--bg-secondary);
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }

        .reviews-bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.02;
          background-image: radial-gradient(var(--color-ink) 1px, transparent 0);
          background-size: 24px 24px;
          pointer-events: none;
        }

        .reviews-header-block {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 50px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 30px;
        }

        .reviews-title-area {
          flex-grow: 1;
        }

        .section-subtitle {
          display: block;
          font-size: 0.9rem;
          text-transform: uppercase;
          color: var(--accent-coral);
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .section-title-text {
          font-size: 2.2rem;
          font-family: var(--font-heading);
          color: var(--text-primary);
          margin-bottom: 16px;
          font-weight: 700;
        }

        .google-rating-summary {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: var(--bg-primary);
          padding: 12px 20px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
        }

        .google-logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          padding: 8px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
        }

        .rating-text-wrapper {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stars-row {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .rating-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-left: 8px;
        }

        .reviews-count {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .reviews-lottie-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 10px 15px;
          box-shadow: var(--shadow-sm);
        }

        .lottie-cat-bubble {
          font-size: 0.75rem;
          font-weight: 700;
          background: var(--accent-gold);
          color: #ffffff;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          margin-top: -4px;
          box-shadow: 0 2px 6px rgba(192, 57, 43, 0.15);
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        .review-card {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: var(--bg-primary);
          transition: var(--transition-smooth);
        }

        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(40, 30, 20, 0.08);
          border-color: var(--accent-gold);
        }

        .review-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
        }

        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .reviewer-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--accent-coral);
          color: #ffffff;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          box-shadow: 0 2px 8px rgba(85, 111, 68, 0.15);
        }

        .reviewer-name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .review-date {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: block;
          margin-top: 2px;
        }

        .google-badge-mini {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          padding: 6px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
        }

        .review-stars {
          display: flex;
          gap: 2px;
        }

        .review-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          font-style: italic;
        }

        @media (max-width: 991px) {
          .reviews-grid {
            grid-template-columns: 1fr;
          }
          .reviews-header-block {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .reviews-lottie-badge {
            align-self: center;
          }
        }
      `}</style>
    </section>
  );
};
