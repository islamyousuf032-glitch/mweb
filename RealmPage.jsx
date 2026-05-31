import React, { useMemo } from 'react';
import { REALMS, REALM_CONTENT } from '../data.js';
import { Icon } from '../icons.jsx';
import { Reveal, SectionHeader } from './Reveal.jsx';
import { Audio } from '../audio.js';
import MiniGame from './MiniGame.jsx';

function Rain({ count = 40 }) {
  const drops = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 4,
    dur: 0.6 + Math.random() * 1.2,
    op: 0.2 + Math.random() * 0.6,
  })), [count]);
  return (
    <div className="eu-rain" aria-hidden="true">
      {drops.map((d, i) => (
        <i key={i} style={{ left: d.left + '%', animationDelay: d.delay + 's', animationDuration: d.dur + 's', opacity: d.op }} />
      ))}
    </div>
  );
}

export default function RealmPage({ realm, onBack, onNavigate, onOpen }) {
  const r = realm;
  const c = REALM_CONTENT[r.id];
  const isGame = r.id === 'game-district';

  return (
    <div className="eu-realmpage">
      <Rain />
      <div className="eu-energy-core" aria-hidden="true" />
      <div className="eu-energy-ring" aria-hidden="true" />

      <div className="eu-realm-back">
        <button className="eu-btn" data-cursor="button" onClick={() => { onBack(); Audio.sfx('whoosh'); }}>
          <Icon name="arrow" width="14" height="14" style={{ transform: 'rotate(180deg)' }} /> Back To Empire
        </button>
      </div>

      <header className="eu-realm-hero">
        <Reveal>
          <span className="rh-icon"><Icon name={r.icon} width="40" height="40" /></span>
        </Reveal>
        <Reveal delay={80}><div className="rh-sub">{r.sub}</div></Reveal>
        <Reveal delay={140}><h1 className="rh-title glitch-on-hover">{r.name}</h1></Reveal>
        <Reveal delay={220}><p className="rh-hero-text">{c.hero}</p></Reveal>
        <Reveal delay={300}>
          <span className="rh-status"><span className="dot" /> REALM STATUS: {r.status}</span>
        </Reveal>

        <Reveal delay={360}>
          <div className="eu-realm-stats">
            {c.stat.map(([v, k]) => (
              <div className="eu-realm-stat" key={k}><b>{v}</b><span>{k}</span></div>
            ))}
          </div>
        </Reveal>
      </header>

      <section className="eu-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal><p className="eu-realm-intro">{c.intro}</p></Reveal>

          {isGame && (
            <Reveal delay={100}>
              <div style={{ marginTop: 44 }}>
                <span className="eu-kicker">Playable Now</span>
                <h2 className="eu-h2" style={{ fontSize: 'clamp(1.8rem,5vw,3rem)' }}>Enter The Mission</h2>
                <MiniGame title="Neon Hunter" />
              </div>
            </Reveal>
          )}

          <div style={{ marginTop: 50 }}>
            <SectionHeader kicker="The Collection" title={r.sub} sub={r.tagline} />
            <div className="eu-realm-grid">
              {c.items.map((item, i) => (
                <Reveal key={item.t} delay={i * 60}>
                  <article
                    className="eu-realm-item"
                    data-cursor="card"
                    onMouseEnter={() => Audio.sfx('hover')}
                    onClick={() => onOpen({ title: item.t, cat: r.name, type: item.m, desc: item.d })}
                  >
                    <div className={`ri-visual a${item.accent}`} />
                    <span className="ri-ghost">{r.sub.split(' ')[0]}</span>
                    {item.play && <span className="ri-tag">PLAYABLE</span>}
                    {item.price && <span className="ri-price">PREMIUM</span>}
                    <div className="ri-body">
                      <div className="ri-meta">{item.m}</div>
                      <div className="ri-title">{item.t}</div>
                      <div className="ri-desc">{item.d}</div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          {/* cross-navigation to other realms */}
          <Reveal>
            <div className="eu-realm-cross">
              <h3>Travel To Another Realm</h3>
              <div className="eu-realm-cross-grid">
                {REALMS.filter((x) => x.id !== r.id).map((x) => (
                  <button key={x.id} data-cursor="button" onClick={() => { onNavigate(x); }}>
                    <span className="c-ic"><Icon name={x.icon} width="16" height="16" /></span>
                    {x.name}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
