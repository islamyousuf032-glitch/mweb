import React from 'react';
import { Reveal } from './Reveal.jsx';
import MagneticButton from './MagneticButton.jsx';

const DASH = [
  ['Empire Signal', 'Stable', 'ok'],
  ['Realms Online', '08', ''],
  ['New Drops', '17', ''],
  ['Trending Now', 'Dark Pulse', ''],
  ['Visitor Rank', null, 'rank'],
];

function HeroTitle() {
  const words = ['YOUSUF', 'UNBOUND'];
  return (
    <h1 className="eu-hero-title glitch-on-hover" data-cursor="text">
      <div className="eu-hero-sweep" />
      {words.map((w, wi) => (
        <span className="line" key={wi}>
          {w.split('').map((c, i) => (
            <span className="ltr" key={i} style={{ animationDelay: `${(wi * 6 + i) * 0.12}s` }}>{c}</span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function Hero({ rank, onScrollTo, onVault }) {
  return (
    <section className="eu-hero" id="top">
      {/* subtle red energy core behind the hero */}
      <div className="eu-energy-core" aria-hidden="true" />
      <div className="eu-energy-ring" aria-hidden="true" />
      {/* dark throne silhouette */}
      <div className="eu-throne" aria-hidden="true" />

      <div className="eu-hero-grid">
        <div>
          <Reveal><span className="eu-kicker">The Empire Beyond Limits</span></Reveal>
          <HeroTitle />
          <Reveal delay={200}><p className="eu-hero-sub">A Dark Digital Empire Beyond Limits</p></Reveal>
          <Reveal delay={280}>
            <p className="eu-hero-desc">
              Films, photos, music, AI art, games, apps, drops and cinematic experiences —
              forged inside one unbound universe.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="eu-hero-actions">
              <MagneticButton className="primary" sound="granted" onClick={onVault}>Enter The Empire</MagneticButton>
              <MagneticButton onClick={() => onScrollTo('trending')}>Explore Trending</MagneticButton>
              <MagneticButton onClick={() => onScrollTo('drops')}>Unlock Latest Drops</MagneticButton>
              <MagneticButton className="ghost" sound="menu" onClick={onVault}>Open Command Vault</MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={440}>
            <p className="eu-hero-tags">No Chains • No Rules • No Boundaries</p>
          </Reveal>
        </div>

        <Reveal dir="right" delay={300}>
          <div className="eu-dash" data-cursor="card">
            <h4>Live Empire Dashboard</h4>
            {DASH.map(([k, v, cls]) => (
              <div className="eu-dash-row" key={k}>
                <span>{k}</span>
                <span className={cls === 'ok' ? 'ok' : cls === 'rank' ? 'blink' : ''}>
                  {cls === 'rank' ? rank : v}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
