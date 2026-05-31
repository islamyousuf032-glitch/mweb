import React from 'react';
import { DROPS } from '../data.js';
import { SectionHeader, Reveal } from './Reveal.jsx';

export default function Drops() {
  return (
    <section className="eu-section" id="drops">
      <div className="wrap">
        <SectionHeader kicker="Fresh From The Dark Archive" title="Latest Drops"
          sub="Freshly released from the dark archive." />
        <div className="eu-timeline">
          {DROPS.map((d, i) => (
            <Reveal key={d.id} dir="left" delay={i * 80}>
              <div className="eu-drop">
                <div className="d-when">{d.when}</div>
                <div className="d-title">{d.title} <span className="eu-pill">{d.status}</span></div>
                <div className="d-cat">{d.cat}</div>
                <div className="d-desc">{d.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
