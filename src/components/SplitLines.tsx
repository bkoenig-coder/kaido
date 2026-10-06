import type { ElementType } from 'react';
import { delay } from '../utils';

interface SplitLinesProps { lines: string[]; as?: ElementType; className?: string; onLoad?: boolean }

/** Each line rises out of its own mask. `onLoad` plays immediately; otherwise on scroll. */
export function SplitLines({ lines, as: Tag = 'h2', className = '', onLoad = false }: SplitLinesProps) {
  return (
    <Tag className={`split ${className}`} {...(onLoad ? { 'data-play': '' } : { 'data-reveal': 'lines' })} aria-label={lines.join(' ')}>
      {lines.map((l, i) => (
        <span className="split__line" key={i} aria-hidden="true">
          <span style={delay(i)}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
