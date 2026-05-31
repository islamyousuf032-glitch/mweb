import { useEffect, useRef, useState, useCallback } from 'react';

// Reveal-on-scroll using IntersectionObserver
export function useReveal(options = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.unobserve(e.target); } });
      },
      { threshold: options.threshold ?? 0.18, rootMargin: options.rootMargin ?? '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options.threshold, options.rootMargin]);
  return [ref, shown];
}

// Smoothed scroll progress 0..1 of whole page
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return p;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

export function useIsMobile(bp = 860) {
  const [m, setM] = useState(typeof window !== 'undefined' ? window.innerWidth < bp : false);
  useEffect(() => {
    const onR = () => setM(window.innerWidth < bp);
    window.addEventListener('resize', onR, { passive: true });
    return () => window.removeEventListener('resize', onR);
  }, [bp]);
  return m;
}

// Count-up number animation when revealed
export function useCountUp(target, active, dur = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0; const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, dur]);
  return val;
}

// Typewriter
export function useTypewriter(text, speed = 26, active = true) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!active) { setOut(text); return; }
    setOut('');
    let i = 0; let id = 0;
    const step = () => {
      i++; setOut(text.slice(0, i));
      if (i < text.length) id = setTimeout(step, speed);
    };
    id = setTimeout(step, speed);
    return () => clearTimeout(id);
  }, [text, speed, active]);
  return out;
}
