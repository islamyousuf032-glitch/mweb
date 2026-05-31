import React, { useEffect, useRef } from 'react';
import { getCore } from '../wasm/core.js';
import { Audio } from '../audio.js';
import { useIsMobile, usePrefersReducedMotion } from '../hooks.js';

// Scroll progress -> background mood
const MOODS = ['moon', 'core', 'smoke', 'void']; // mapped by scroll bands

export default function Background({ progressRef, auraGlowRef, musicOn }) {
  const canvasRef = useRef(null);
  const moodRef = useRef(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let raf = 0, core = null, running = true, last = performance.now();
    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });

    const particleCount = reduced ? 0 : (isMobile ? 90 : 240);

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (core) core.resize(W, H);
    };

    getCore().then((c) => {
      core = c;
      resize();
      core.init(particleCount, W, H);
    });

    const onResize = () => resize();
    window.addEventListener('resize', onResize, { passive: true });

    const onVis = () => { running = !document.hidden; if (running) { last = performance.now(); loop(last); } };
    document.addEventListener('visibilitychange', onVis);

    let lastMoodIdx = -1;

    const loop = (now) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      raf = requestAnimationFrame(loop);
      if (!core) return;

      const progress = progressRef.current || 0;
      const auraGlow = auraGlowRef.current || 0;

      // mood switch
      const idx = Math.min(MOODS.length - 1, Math.floor(progress * MOODS.length));
      if (idx !== lastMoodIdx && moodRef.current) {
        lastMoodIdx = idx;
        moodRef.current.className = `eu-bg-mood eu-bg-${MOODS[idx]}`;
      }

      // audio beat decay
      if (musicOn.current) Audio.decayBeat(dt);
      const beat = musicOn.current ? Audio.beat : 0;

      const mode = idx === 1 ? 0 : (idx === 0 ? 0 : idx === 2 ? 0 : 4);
      core.update(dt, auraGlow, beat, mode);

      // draw
      ctx.clearRect(0, 0, W, H);
      const buf = core.buffer();
      const stride = core.stride();
      const count = core.count();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < count; i++) {
        const o = i * stride;
        const x = buf[o], y = buf[o + 1];
        const life = buf[o + 4], maxLife = buf[o + 5];
        const size = buf[o + 6] * (1 + beat * 0.6 + auraGlow * 0.5);
        const fade = Math.sin((life / maxLife) * Math.PI); // ease in-out alpha
        const a = Math.max(0, fade) * (0.5 + auraGlow * 0.4);
        const hue = buf[o + 7];
        // red-to-gold embers
        const r = 255, g = Math.floor(20 + hue * 70), b = Math.floor(30 + hue * 30);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    if (particleCount > 0) raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [isMobile, reduced]); // eslint-disable-line

  return (
    <div className="eu-bg" aria-hidden="true">
      <div ref={moodRef} className="eu-bg-mood eu-bg-moon" />
      <canvas ref={canvasRef} />
    </div>
  );
}
