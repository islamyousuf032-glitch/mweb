import React, { useState, useEffect, useRef } from 'react';
import { SLIDES } from '../data.js';
import { SectionHeader } from './Reveal.jsx';
import { Icon } from '../icons.jsx';
import { Audio } from '../audio.js';

const DURATION = 5000;

export default function Slider() {
  const [idx, setIdx] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [paused, setPaused] = useState(false);
  const [prog, setProg] = useState(0);
  const touch = useRef({ x: 0 });

  const go = (n) => {
    setGlitch(true); Audio.sfx('whoosh');
    setTimeout(() => setGlitch(false), 500);
    setIdx((n + SLIDES.length) % SLIDES.length);
    setProg(0);
  };

  useEffect(() => {
    if (paused) return;
    let start = performance.now() - prog * DURATION;
    let raf = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      setProg(p);
      if (p >= 1) { go(idx + 1); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [idx, paused]); // eslint-disable-line

  return (
    <section className="eu-section" id="showcase">
      <div className="wrap">
        <SectionHeader kicker="Cinematic Showcase" title="The Featured Cut"
          sub="Full-width cinematic drops from across the empire." />
        <div
          className="eu-slider"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => { touch.current.x = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touch.current.x;
            if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
          }}
        >
          {SLIDES.map((s, i) => (
            <div key={s.id} className={`eu-slide ${i === idx ? 'active' : ''}`}>
              <div className={`eu-slide-bg g${i}`} />
              <div className="eu-slide-spot" />
              <div className="eu-slide-content">
                <div className="s-cat">{s.cat}</div>
                <div className="s-title glitch-on-hover">{s.title}</div>
                <div className="s-desc">{s.desc}</div>
                <button className="eu-btn primary" data-cursor="button">Access Now <Icon name="arrow" width="14" height="14" /></button>
              </div>
            </div>
          ))}
          <div className={`eu-slide-glitch ${glitch ? 'go' : ''}`} />
          <button className="eu-slider-arrow left" data-cursor="button" onClick={() => go(idx - 1)} aria-label="Previous"><Icon name="arrow" width="18" height="18" style={{ transform: 'rotate(180deg)' }} /></button>
          <button className="eu-slider-arrow right" data-cursor="button" onClick={() => go(idx + 1)} aria-label="Next"><Icon name="arrow" width="18" height="18" /></button>
          <div className="eu-slider-nav">
            {SLIDES.map((_, i) => (
              <button key={i} className={i === idx ? 'on' : ''} data-cursor="button" onClick={() => go(i)} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
          <div className="eu-slider-prog" style={{ width: prog * 100 + '%' }} />
        </div>
      </div>
    </section>
  );
}
