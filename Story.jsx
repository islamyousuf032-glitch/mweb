import React from 'react';
import { CHAPTERS } from '../data.js';
import { Reveal } from './Reveal.jsx';

export default function Story() {
  return (
    <section className="eu-section" id="story">
      <div className="wrap">
        <Reveal>
          <p className="eu-manifesto glitch-on-hover">THE EMPIRE WAS NOT BUILT. IT WAS UNLEASHED.</p>
        </Reveal>
        {CHAPTERS.map((c, i) => (
          <Reveal key={c.n} delay={i * 100}>
            <div className="eu-chapter">
              <div className="c-n">{c.n}</div>
              <div className="c-title">Chapter {c.n} — {c.title}</div>
              <div className="c-text">{c.text}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
