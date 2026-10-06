import { useEffect, useRef } from 'react';

/**
 * A custom cursor that trails the pointer, grows into a "View" disc over
 * [data-cursor="view"] and a ring over links. Also makes [data-magnetic]
 * elements lean towards the pointer. Disabled on touch and reduced motion.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = dot.current;
    if (!fine || calm || !el) return;
    document.documentElement.classList.add('has-cursor');

    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;
    let magnet: HTMLElement | null = null;

    const loop = () => {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement;
      const view = t.closest('[data-cursor="view"]');
      const link = t.closest('a, button, select, input, textarea, label');
      el.dataset.state = view ? 'view' : link ? 'link' : '';

      const m = t.closest<HTMLElement>('[data-magnetic]');
      if (magnet && magnet !== m) { magnet.style.transform = ''; }
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.36;
        m.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    const leave = () => { el.dataset.state = 'hidden'; };
    const enter = () => { el.dataset.state = ''; };

    raf = requestAnimationFrame(loop);
    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return <div ref={dot} className="cursor" aria-hidden="true"><span>View</span></div>;
}
