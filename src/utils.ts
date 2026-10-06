import type { CSSProperties } from 'react';

/** Stagger index for scroll-reveal animations. */
export const delay = (i: number) => ({ '--i': i }) as CSSProperties;

export const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Mondays are closed. */
export const isClosed = (d: Date) => d.getDay() === 1;

export const nextOpenDay = (from = new Date()) => {
  const d = startOfDay(from);
  while (isClosed(d)) d.setDate(d.getDate() + 1);
  return d;
};

export const formatDate = (d: Date, opts: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'long' }) =>
  d.toLocaleDateString('en-GB', opts);

/** Deterministic "fully booked" slots so availability looks realistic. */
export const isSlotFull = (d: Date, index: number) => (d.getDate() * 3 + index) % 7 === 0;

export const guestsLabel = (n: number) => `${n} ${n === 1 ? 'guest' : 'guests'}`;
