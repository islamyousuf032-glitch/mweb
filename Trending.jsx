import React, { useState } from 'react';
import { TRENDING } from '../data.js';
import { SectionHeader, Reveal } from './Reveal.jsx';
import { useReveal, useCountUp } from '../hooks.js';
import { Audio } from '../audio.js';

function TrendCard({ t, rank, onOpen, onShare }) {
  const [ref, shown] = useReveal();
  const views = useCountUp(t.views, shown);
  const [saved, setSaved] = useState(false);
  return (
    <div ref={ref} className={`eu-trend-card reveal ${shown ? 'in' : ''}`} data-cursor="card"
         onMouseEnter={() => Audio.sfx('hover')}>
      <span className="eu-trend-rank">{rank}</span>
      <div className="t-cat">{t.cat}</div>
      <div className="t-title glitch-on-hover">
        {t.title}{t.hot && <span className="eu-hot">HOT</span>}
      </div>
      <div className="t-type">{t.type}</div>
      <div className="eu-meter"><i style={{ width: shown ? t.pop + '%' : 0 }} /></div>
      <div className="eu-trend-foot">
        <span className="views">Popularity <b>{t.pop}%</b> · <b>{views.toLocaleString()}</b> views</span>
        <span style={{ display: 'flex', gap: 8 }}>
          <button className="eu-icobtn" data-cursor="button" title="Save"
            onClick={() => { setSaved(!saved); Audio.sfx('beep'); }}
            style={{ color: saved ? 'var(--crimson)' : '' }}>♥</button>
          <button className="eu-icobtn" data-cursor="button" title="Share"
            onClick={() => { Audio.sfx('beep'); onShare?.(t); }}>⇗</button>
          <button className="eu-icobtn" data-cursor="button" title="Open" onClick={() => onOpen(t)}>↗</button>
        </span>
      </div>
    </div>
  );
}

export default function Trending({ onOpen, onShare }) {
  return (
    <section className="eu-section" id="trending">
      <div className="wrap">
        <SectionHeader kicker="Live Now" title="Trending In The Empire"
          sub="The realm is watching. The shadows are moving." />
        <div className="eu-trend-grid">
          {TRENDING.map((t, i) => <TrendCard key={t.id} t={t} rank={i + 1} onOpen={onOpen} onShare={onShare} />)}
        </div>
      </div>
    </section>
  );
}
