import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { delay } from '../utils';
import { formatRange, hoursList, RESTAURANT, useOpenStatus, viennaNow } from '../lib/hours';
import { SplitLines } from './SplitLines';

const clockFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Vienna', hour: '2-digit', minute: '2-digit' });

function ViennaClock() {
  const { language } = useLanguage();
  const status = useOpenStatus(language);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);
  const isOpen = status.state !== 'closed';
  return (
    <p className="clock">
      <span className="clock__time">{clockFmt.format(now)}<small> Wien</small></span>
      <span className="clock__state"><i className={isOpen ? 'is-open' : ''} />{status.text}</span>
    </p>
  );
}

export function ContactHours() {
  const { t, language } = useLanguage();
  const de = language === 'de';
  const today = viennaNow().getDay();

  const info: [string, React.ReactNode][] = [
    [t.contactAddress, <a href={RESTAURANT.mapsUrl} target="_blank" rel="noopener noreferrer">{RESTAURANT.address}</a>],
    [de ? 'Telefon & Vorbestellung' : 'Phone & takeaway', <a href={RESTAURANT.phoneHref}>{RESTAURANT.phone}</a>],
    [de ? 'Mobil' : 'Mobile', <a href={RESTAURANT.mobileHref}>{RESTAURANT.mobile}</a>],
    [t.contactEmail, <a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a>],
  ];

  return (
    <section className="section section--stone" id="visit">
      <div className="container grid-12">
        <p className="eyebrow">{t.contactEyebrow}</p>
        <div className="location">
          <div className="location__info">
            <SplitLines lines={de ? ['Rotensterngasse 3,', 'Leopoldstadt'] : ['Rotensterngasse 3,', 'Leopoldstadt']} className="h2" />
            <ViennaClock />
            <dl className="info-list">
              {info.map(([k, v], i) => (
                <div key={k} data-reveal style={delay(i)}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
              <div data-reveal style={delay(info.length)}>
                <dt>{t.hoursTitle}</dt>
                <dd className="hours">
                  {hoursList.map((h) => (
                    <span key={h.dayIndex} className={`${h.dayIndex === today ? 'is-today' : ''} ${h.open === null ? 'is-closed' : ''}`}>
                      <em>{de ? h.labelDe : h.labelEn}</em>
                      <b>{formatRange(h, language)}</b>
                    </span>
                  ))}
                  <small>{t.hoursSummerValidity}</small>
                </dd>
              </div>
            </dl>
            <div className="location__ctas">
              <a className="btn btn--primary" href={RESTAURANT.mapsUrl} target="_blank" rel="noopener noreferrer" data-magnetic>{de ? 'Route anzeigen' : 'Get directions'}</a>
              <a className="btn btn--line" href={RESTAURANT.phoneHref}>{de ? 'Anrufen' : 'Call us'}</a>
            </div>
          </div>
          <div className="map">
            <iframe
              title="Kaido map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.7397686563604!2d16.381156676882207!3d48.216399045330366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d07bbbb5cc52f%3A0xe21287c88cd2615!2sRotensterngasse%203%2C%201020%20Wien%2C%20Austria!5e0!3m2!1sen!2sat!4v1716123456789!5m2!1sen!2sat"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
