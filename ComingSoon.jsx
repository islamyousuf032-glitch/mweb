import React from 'react';
import { COMING_SOON } from '../data.js';
import { SectionHeader, Reveal } from './Reveal.jsx';

export default function ComingSoon() {
  return (
    <section className="eu-section" id="soon">
      <div className="wrap">
        <SectionHeader kicker="Access Denied" title="Realms Still Awakening"
          sub="The empire is expanding. These gates are sealed — for now." />
        <Reveal>
          <div className="eu-soon-grid">
            {COMING_SOON.map((name) => (
              <div key={name} className="eu-soon" data-cursor="card">
                <div>
                  <div className="s-denied">ACCESS DENIED</div>
                  <div className="s-name">{name}</div>
                  <div className="s-lock">● REALM STILL AWAKENING</div>
                </div>
                <div className="s-hover">The Empire Is Expanding.</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
