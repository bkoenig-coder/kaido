import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const KEY = 'kaido_cookie_consent';

export function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch { /* storage unavailable */ }
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const save = (a: boolean) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ necessary: true, analytics: a }));
    } catch { /* storage unavailable */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="cookie" role="dialog" aria-label={t.cookieTitle}>
      <h3>{t.cookieTitle}</h3>
      <p>{t.cookieText}</p>
      {custom && (
        <div className="cookie__prefs">
          <label><input type="checkbox" checked disabled /> <span><strong>{t.cookieNecessary}</strong><small>{t.cookieNecessaryDesc}</small></span></label>
          <label><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} /> <span><strong>{t.cookieAnalytics}</strong><small>{t.cookieAnalyticsDesc}</small></span></label>
        </div>
      )}
      <div className="cookie__actions">
        {custom ? (
          <button className="btn btn--primary btn--small" onClick={() => save(analytics)}>{t.cookieSave}</button>
        ) : (
          <>
            <button className="text-link" onClick={() => setCustom(true)}>{t.cookieManage}</button>
            <button className="btn btn--line btn--small" onClick={() => save(false)}>{t.cookieDecline}</button>
            <button className="btn btn--primary btn--small" onClick={() => save(true)}>{t.cookieAcceptAll}</button>
          </>
        )}
      </div>
    </aside>
  );
}
