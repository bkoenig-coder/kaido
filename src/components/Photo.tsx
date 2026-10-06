import type { CSSProperties, ReactNode } from 'react';

interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function Photo({ src, alt, className = '', style, children }: PhotoProps) {
  return (
    <div className={`photo ${className}`} style={style}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <span className="photo__shade" />
      {children}
    </div>
  );
}
