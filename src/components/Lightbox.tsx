import { useEffect, useRef } from 'react';
import { Photo } from './Photo';

export interface LightboxItem {
  id: number | string;
  src: string;
  title: string;
  caption: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
  closeLabel?: string;
}

export function Lightbox({ items, index, onClose, onIndex, closeLabel = 'Close' }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const many = items.length > 1;
  const prev = () => onIndex((index - 1 + items.length) % items.length);
  const next = () => onIndex((index + 1) % items.length);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (many && e.key === 'ArrowLeft') prev();
      if (many && e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  });

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <Photo key={item.id} src={item.src} alt={item.title} className="lightbox__photo" />
        <div className="lightbox__caption">
          <p>{item.caption}</p>
          {many && <span>{index + 1} / {items.length}</span>}
        </div>
      </div>
      {many && (
        <>
          <button className="round-btn lightbox__prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); prev(); }}>←</button>
          <button className="round-btn lightbox__next" aria-label="Next" onClick={(e) => { e.stopPropagation(); next(); }}>→</button>
        </>
      )}
      <button ref={closeRef} className="round-btn lightbox__close" aria-label={closeLabel} onClick={onClose}>✕</button>
    </div>
  );
}
