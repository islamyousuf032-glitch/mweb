import React, { useRef } from 'react';
import { REALMS } from '../data.js';
import { Icon } from '../icons.jsx';
import { SectionHeader, Reveal } from './Reveal.jsx';
import { getCore } from '../wasm/core.js';
import { Audio } from '../audio.js';

let coreRef = null;
getCore().then((c) => { coreRef = c; });

function PortalCard({ r, onNavigate, delay }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    let rx, ry;
    if (coreRef) { const t = coreRef.cardTilt(dx, dy, 10); rx = t[0]; ry = t[1]; }
    else { rx = -dy * 10; ry = dx * 10; }
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };

  return (
    <Reveal delay={delay}>
      <article
        ref={ref}
        className="eu-portal"
        data-cursor="card"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={() => Audio.sfx('hover')}
      >
        <span className="pi"><Icon name={r.icon} width="26" height="26" /></span>
        <div className="p-sub">{r.sub}</div>
        <div className="p-name">{r.name}</div>
        <div className="p-stats">
          <span>Featured<b>{r.featured}</b></span>
          <span>New<b>{r.fresh}</b></span>
        </div>
        <div className="p-foot">
          <span className="p-status">● {r.status}</span>
          <button className="eu-btn sm" data-cursor="button" onClick={() => onNavigate(r)}>{r.btn}</button>
        </div>
      </article>
    </Reveal>
  );
}

export default function Realms({ onNavigate }) {
  return (
    <section className="eu-section" id="realms">
      <div className="wrap">
        <SectionHeader kicker="Eight Realms. One Core." title="Featured Realms"
          sub="Eight portals. One unbound empire. Choose a gate and step through." />
        <div className="eu-realms-grid">
          {REALMS.map((r, i) => <PortalCard key={r.id} r={r} onNavigate={onNavigate} delay={i * 60} />)}
        </div>
      </div>
    </section>
  );
}
