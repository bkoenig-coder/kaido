import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Cookie, Check } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Cookie preference states
  const [prefNecessary] = useState(true); // always true
  const [prefAnalytics, setPrefAnalytics] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('kaido_cookie_consent');
    if (!consent) {
      // Trigger slide-in after 1.5 seconds
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
            <Cookie size={20} className="text-gold" />
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
                  {language === 'de' ? 'Zurück' : 'Back'}
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
          bottom: 30px;
          right: 30px;
          width: 380px;
          max-width: calc(100vw - 60px);
          border-radius: var(--radius-lg);
          padding: 24px;
          z-index: 999;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          border: 1px solid var(--border-color);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .cookie-banner-container.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cookie-banner-content {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cookie-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cookie-header h3 {
          font-size: 1.1rem;
          font-weight: 700;
          font-family: var(--font-heading);
        }

        .cookie-text {
          font-size: 0.82rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .cookie-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }

        .cookie-main-buttons {
          display: flex;
          gap: 8px;
        }

        .btn-xs {
          padding: 6px 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .mt-12 {
          margin-top: 12px;
        }

        /* Preference checkbox style */
        .cookie-pref-panel {
          background: rgba(0,0,0,0.2);
          border-radius: var(--radius-md);
          padding: 12px;
          border: 1px solid rgba(255,255,255,0.02);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pref-item {
          display: flex;
          align-items: flex-start;
        }

        .checkbox-container {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          position: relative;
          user-select: none;
        }

        .checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          height: 18px;
          width: 18px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-gold);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checkmark.disabled {
          opacity: 0.5;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.02);
        }

        .checkbox-container:hover input:not(:disabled) ~ .checkmark {
          border-color: var(--accent-gold);
        }

        .checkbox-container input:checked ~ .checkmark {
          background-color: rgba(212, 175, 55, 0.1);
          border-color: var(--accent-gold);
        }

        .pref-label {
          display: flex;
          flex-direction: column;
        }

        .pref-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .pref-desc {
          font-size: 0.72rem;
          color: var(--text-muted);
          line-height: 1.3;
        }

        .cursor-pointer {
          cursor: pointer;
        }

        @media (max-width: 480px) {
          .cookie-banner-container {
            bottom: 20px;
            right: 20px;
            width: calc(100vw - 40px);
            padding: 16px;
          }
          .cookie-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .cookie-main-buttons {
            justify-content: space-between;
          }
          .cookie-main-buttons .btn {
            flex: 1;
          }
        }
      `}</style>
    </>
  );
};
