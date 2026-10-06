import { useEffect, useState } from 'react';

type Lang = 'de' | 'en';

export interface DayHours {
  dayIndex: number;
  labelDe: string;
  labelEn: string;
  /** Opening hour (24h); null when closed all day. */
  open: number | null;
  close: number;
}

export const hoursList: DayHours[] = [
  { dayIndex: 1, labelDe: 'Montag', labelEn: 'Monday', open: 11, close: 22 },
  { dayIndex: 2, labelDe: 'Dienstag', labelEn: 'Tuesday', open: null, close: 22 },
  { dayIndex: 3, labelDe: 'Mittwoch', labelEn: 'Wednesday', open: 11, close: 22 },
  { dayIndex: 4, labelDe: 'Donnerstag', labelEn: 'Thursday', open: 11, close: 22 },
  { dayIndex: 5, labelDe: 'Freitag', labelEn: 'Friday', open: 11, close: 22 },
  { dayIndex: 6, labelDe: 'Samstag', labelEn: 'Saturday', open: 12, close: 22 },
  { dayIndex: 0, labelDe: 'Sonntag & Feiertage', labelEn: 'Sunday & Holidays', open: 12, close: 22 },
];

export const viennaNow = () => {
  try {
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Vienna' }));
  } catch {
    return new Date();
  }
};

const hour12 = (h: number) => `${h % 12 || 12}:00 ${h >= 12 ? 'PM' : 'AM'}`;

export const formatRange = (d: DayHours, lang: Lang) => {
  if (d.open === null) return lang === 'de' ? 'Ruhetag' : 'Closed';
  return lang === 'de' ? `${d.open}:00 – ${d.close}:00` : `${hour12(d.open)} – ${hour12(d.close)}`;
};

export type OpenState = 'open' | 'closing' | 'closed';

export const getStatus = (lang: Lang): { state: OpenState; text: string; today: DayHours } => {
  const now = viennaNow();
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = hoursList.find((h) => h.dayIndex === day)!;

  if (today.open !== null && mins >= today.open * 60 && mins < today.close * 60) {
    const closing = mins >= today.close * 60 - 30;
    if (closing) return { state: 'closing', today, text: lang === 'de' ? 'Letzte Runde · bis 22:00' : 'Last orders · until 10 PM' };
    return { state: 'open', today, text: lang === 'de' ? 'Jetzt geöffnet · bis 22:00' : 'Open now · until 10 PM' };
  }

  if (today.open !== null && mins < today.open * 60) {
    return {
      state: 'closed',
      today,
      text: lang === 'de' ? `Öffnet heute um ${today.open}:00` : `Opens today at ${hour12(today.open)}`,
    };
  }

  const next = hoursList.find((h) => h.dayIndex === (day + 1) % 7)!;
  const nextOpen = next.open ?? 11;
  const nextDay = next.open === null ? hoursList.find((h) => h.dayIndex === (day + 2) % 7)! : next;
  const label = next.open === null ? (lang === 'de' ? nextDay.labelDe : nextDay.labelEn) : lang === 'de' ? 'morgen' : 'tomorrow';
  const openAt = nextDay.open ?? nextOpen;
  return {
    state: 'closed',
    today,
    text: lang === 'de' ? `Geschlossen · öffnet ${label} um ${openAt}:00` : `Closed · opens ${label} at ${hour12(openAt)}`,
  };
};

export const useOpenStatus = (lang: Lang) => {
  const [status, setStatus] = useState(() => getStatus(lang));
  useEffect(() => {
    setStatus(getStatus(lang));
    const t = setInterval(() => setStatus(getStatus(lang)), 30000);
    return () => clearInterval(t);
  }, [lang]);
  return status;
};

export const RESTAURANT = {
  name: 'Kaido',
  kanji: 'カイ堂',
  address: 'Rotensterngasse 3, 1020 Wien',
  mapsUrl: 'https://maps.google.com/?q=Rotensterngasse+3,+1020+Wien',
  phone: '01 212 60 76',
  phoneHref: 'tel:+4312126076',
  mobile: '+43 (0) 660 910 88 18',
  mobileHref: 'tel:+436609108818',
  email: 'sushibarkaido@gmail.com',
  bookingUrl: 'https://www.gastro.site/reserve?id=BATM49A3abg1y&details=yes',
  guruUrl: 'https://de.restaurantguru.com/Kaido-Sushi-Bar-Vienna?utm_source=rg_certificate9',
};
