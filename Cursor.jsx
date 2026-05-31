import React, { useEffect, useRef } from 'react';
import { getCore } from '../wasm/core.js';
import { Audio } from '../audio.js';

// Custom cursor with 6 modes detected from hovered element data-cursor attr.
export default function Cursor({ enabled, musicOn, spotXRef, spotYRef }) {
  const cursorRef = useRef(null);
  const trailsRef = useRef([]);

  useEffect(() => {
    if (!enabled) { document.body.classList.remove('eu-custom-cursor'); return; }
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices
    document.body.classList.add('eu-custom-cursor');

    const el = cursorRef.current;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y, raf = 0, core = null;
    getCore().then((c) => { core = c; });

    // trail pool
    const pool = [];
    for (let i = 0; i < 8; i++) {
      const d = document.createElement('div');
      d.className = 'eu-cursor-trail';
      d.style.opacity = '0';
      document.body.appendChild(d);
      pool.push({ el: d, x, y, life: 0 });
    }
    trailsRef.current = pool;

    const setMode = (mode) => {
      el.className = `eu-cursor ${mode} ${musicOn.current ? 'pulse wavepulse' : ''}`;
    };

    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      // spotlight target (normalized)
      spotXRef.current = tx / window.innerWidth;
      spotYRef.current = ty / window.innerHeight;
      const t = e.target.closest('[data-cursor]');
      const mode = t ? t.getAttribute('data-cursor') : 'shadow';
      const map = { button: 'blade', card: 'ring', text: 'scan', menu: 'portal', shadow: '' };
      setMode(map[mode] ?? '');
    };

    const onDown = (e) => {
      const r = document.createElement('div');
      r.className = 'eu-ripple';
      r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px';
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 600);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });

    let modeIsPulse = false;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      x += (tx - x) * 0.35; y += (ty - y) * 0.35;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      // smoothed spotlight via core
      if (core) {
        const s = core.spotlight(spotXRef.current, spotYRef.current, 0.08);
        document.documentElement.style.setProperty('--spot-x', (s[0] * 100).toFixed(2) + '%');
        document.documentElement.style.setProperty('--spot-y', (s[1] * 100).toFixed(2) + '%');
        // music-pulse cursor: feed WASM waveform into a CSS var for glow
        if (musicOn.current) {
          const w = core.waveform(performance.now() / 1000, 0.6 + Audio.beat * 0.4);
          el.style.setProperty('--wave', w.toFixed(3));
          if (!modeIsPulse && !el.className.includes('wavepulse')) { el.className += ' pulse wavepulse'; modeIsPulse = true; }
        } else {
          el.style.setProperty('--wave', '0');
        }
      }
      // trail follow
      const pool2 = trailsRef.current;
      let px = x, py = y;
      pool2.forEach((p, i) => {
        p.x += (px - p.x) * 0.4; p.y += (py - p.y) * 0.4;
        px = p.x; py = p.y;
        p.el.style.left = p.x + 'px'; p.el.style.top = p.y + 'px';
        p.el.style.opacity = String(0.4 - i * 0.045);
        p.el.style.width = p.el.style.height = `${6 - i * 0.5}px`;
      });
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.body.classList.remove('eu-custom-cursor');
      pool.forEach((p) => p.el.remove());
    };
  }, [enabled]); // eslint-disable-line

  if (!enabled) return null;
  return <div ref={cursorRef} className="eu-cursor"><div className="dot" /></div>;
}
