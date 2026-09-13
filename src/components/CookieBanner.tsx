import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Check } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [prefNecessary] = useState(true);
  const [prefAnalytics, setPrefAnalytics] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('kaido_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = { necessary: true, analytics: true };
    localStorage.setItem('kaido_cookie_consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    const preferences = { necessary: true, analytics: false };
    localStorage.setItem('kaido_cookie_consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const preferences = { necessary: true, analytics: prefAnalytics };
    localStorage.setItem('kaido_cookie_consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className={`cookie-banner-container glass-panel animate-fade-in ${isVisible ? 'visible' : ''}`}>
        <div className="cookie-banner-content">
          <div className="cookie-header">
            <Shield size={18} className="text-gold" />
            <h3>{t.cookieTitle}</h3>
          </div>
          
          <p className="cookie-text">{t.cookieText}</p>

          {!showPreferences ? (
            <div className="cookie-actions">
              <button className="btn btn-secondary btn-xs" onClick={() => setShowPreferences(true)}>
                {t.cookieManage}
              </button>
              <div className="cookie-main-buttons">
                <button className="btn btn-secondary btn-xs" onClick={handleDeclineAll}>
                  {t.cookieDecline}
                </button>
                <button className="btn btn-primary btn-xs" onClick={handleAcceptAll}>
                  {t.cookieAcceptAll}
                </button>
              </div>
            </div>
          ) : (
            <div className="cookie-pref-panel animate-fade-in">
              <div className="pref-item">
                <label className="checkbox-container">
                  <input type="checkbox" checked={prefNecessary} disabled />
                  <span className="checkmark disabled">
                    <Check size={12} />
                  </span>
                  <div className="pref-label">
                    <span className="pref-name">{t.cookieNecessary}</span>
                    <span className="pref-desc">{t.cookieNecessaryDesc}</span>
                  </div>
                </label>
              </div>

              <div className="pref-item">
                <label className="checkbox-container cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={prefAnalytics} 
                    onChange={(e) => setPrefAnalytics(e.target.checked)} 
                  />
                  <span className="checkmark">
                    {prefAnalytics && <Check size={12} />}
                  </span>
                  <div className="pref-label">
                    <span className="pref-name">{t.cookieAnalytics}</span>
                    <span className="pref-desc">{t.cookieAnalyticsDesc}</span>
                  </div>
                </label>
              </div>

              <div className="cookie-actions mt-12">
                <button className="btn btn-secondary btn-xs" onClick={() => setShowPreferences(false)}>
                  Zurück
                </button>
                <button className="btn btn-primary btn-xs" onClick={handleSavePreferences}>
                  {t.cookieSave}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .cookie-banner-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          max-width: 460px;
          width: calc(100% - 48px);
          z-index: 999;
          border-radius: var(--radius-md);
          padding: 24px 28px;
          background: rgba(10, 12, 16, 0.94);
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 175, 55, 0.1);
        }

        .cookie-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .cookie-header h3 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: #ffffff;
          letter-spacing: 0.02em;
        }

        .cookie-text {
          font-size: 0.86rem;
          line-height: 1.6;
          color: var(--color-washi-dim);
          margin-bottom: 18px;
          font-weight: 300;
        }

        .cookie-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cookie-main-buttons {
          display: flex;
          gap: 8px;
        }

        .btn-xs {
          padding: 8px 16px;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
        }

        .cookie-pref-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 14px;
        }

        .pref-item {
          background: rgba(20, 23, 29, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
        }

        .checkbox-container {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .checkbox-container input {
          display: none;
        }

        .checkmark {
          width: 18px;
          height: 18px;
          border-radius: 3px;
          border: 1px solid var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--color-gold);
        }

        .checkmark.disabled {
          background: rgba(212, 175, 55, 0.2);
          opacity: 0.7;
        }

        .pref-label {
          display: flex;
          flex-direction: column;
        }

        .pref-name {
          font-family: var(--font-eyebrow);
          font-size: 0.75rem;
          color: #ffffff;
          letter-spacing: 0.08em;
        }

        .pref-desc {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        .mt-12 {
          margin-top: 12px;
        }

        @media (max-width: 480px) {
          .cookie-banner-container {
            bottom: 12px;
            right: 12px;
            left: 12px;
            width: auto;
            padding: 20px;
          }
          .cookie-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .cookie-main-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};
