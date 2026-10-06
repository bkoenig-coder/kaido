import { useCallback, useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SignatureSection } from './components/SignatureSection';
import { MenuOverlay } from './components/MenuOverlay';
import { GallerySection } from './components/GallerySection';
import { Reviews } from './components/Reviews';
import { ContactHours } from './components/ContactHours';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { CookieBanner } from './components/CookieBanner';
import { Cursor } from './components/Cursor';

const AppContent = () => {
  const [reserving, setReserving] = useState(false);
  const open = useCallback(() => setReserving(true), []);
  const close = useCallback(() => setReserving(false), []);
  const [menuTab, setMenuTab] = useState<'regular' | 'lunch' | null>(null);
  const openMenu = useCallback((tab: 'regular' | 'lunch' = 'regular') => setMenuTab(tab), []);
  const closeMenu = useCallback(() => setMenuTab(null), []);

  // Expose scroll progress (in viewport heights) for the moon phase and parallax,
  // and reveal anything in view (backs up the IntersectionObserver below).
  useEffect(() => {
    let raf = 0;
    const revealInView = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh + 60 && r.bottom > -60) el.classList.add('is-visible');
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--scroll', String(Math.min(window.scrollY / window.innerHeight, 2)));
        revealInView();
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll-reveal: fade/slide sections in as they enter the viewport.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0, rootMargin: '0px 0px 80px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Header onOpenReservation={open} onOpenMenu={openMenu} />
      <main id="main">
        <Hero onOpenReservation={open} onOpenMenu={openMenu} />
        <GallerySection />
        <SignatureSection onOpenMenu={openMenu} />
        <Reviews />
        <ContactHours />
      </main>
      <Footer onOpenReservation={open} />
      <MenuOverlay tab={menuTab} onClose={closeMenu} onOpenReservation={open} />
      <ReservationModal isOpen={reserving} onClose={close} />
      <CookieBanner />
    </>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
