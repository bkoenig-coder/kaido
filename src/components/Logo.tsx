import { RESTAURANT } from '../lib/hours';

export function Logo({ large = false }: { large?: boolean }) {
  return (
    <span className={`logo ${large ? 'logo--large' : ''}`}>
      <span className="logo__kanji">{RESTAURANT.kanji}</span>
      <span className="logo__word">{RESTAURANT.name.toUpperCase()}</span>
    </span>
  );
}
