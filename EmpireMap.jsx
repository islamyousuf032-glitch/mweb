import React, { useState } from 'react';
import { REALMS } from '../data.js';
import { Icon } from '../icons.jsx';
import { SectionHeader } from './Reveal.jsx';
import { useIsMobile } from '../hooks.js';
import { Audio } from '../audio.js';

export default function EmpireMap({ onNavigate }) {
  const [info, setInfo] = useState('Hover a node to scan its realm.');
  const isMobile = useIsMobile(760);
  const R = 220; // orbit radius

  return (
    <section className="eu-section" id="map">
      <div className="wrap">
        <SectionHeader kicker="Eight Realms. One Core. No Boundaries." title="The Empire Map"
          sub="Not a list — a living map of the unbound universe." />

        {isMobile ? (
          <div className="eu-map">
            <div className="eu-map-core">YOUSUF<br />UNBOUND</div>
            <div className="eu-map-scroll">
              {REALMS.map((r) => (
                <div key={r.id} className="eu-map-node" data-cursor="card" onClick={() => onNavigate(r)}>
                  <span className="n-icon"><Icon name={r.icon} width="22" height="22" /></span>
                  <span className="n-name">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="eu-map">
            <div className="eu-map-orbit" style={{ width: R * 2, height: R * 2 }} />
            <div className="eu-map-core">YOUSUF<br />UNBOUND</div>
            {REALMS.map((r, i) => {
              const ang = (i / REALMS.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(ang) * R, y = Math.sin(ang) * R;
              const len = R;
              const deg = (ang * 180) / Math.PI;
              return (
                <React.Fragment key={r.id}>
                  <div className="eu-map-line" style={{ width: len, transform: `rotate(${deg}deg)` }} />
                  <div
                    className="eu-map-node"
                    data-cursor="card"
                    style={{ left: `calc(50% + ${x}px - 48px)`, top: `calc(50% + ${y}px - 48px)` }}
                    onMouseEnter={() => { setInfo(`${r.name.toUpperCase()} — ${r.status}`); Audio.sfx('hover'); }}
                    onClick={() => onNavigate(r)}
                  >
                    <span className="n-icon"><Icon name={r.icon} width="24" height="24" /></span>
                    <span className="n-name">{r.name}</span>
                  </div>
                </React.Fragment>
              );
            })}
            <div className="eu-map-info">{info}</div>
          </div>
        )}
      </div>
    </section>
  );
}
