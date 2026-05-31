import React, { useState } from 'react';
import { QUOTES } from '../data.js';
import { SectionHeader } from './Reveal.jsx';
import { useTypewriter } from '../hooks.js';
import { getCore } from '../wasm/core.js';
import { Audio } from '../audio.js';

let core = null; getCore().then((c) => { core = c; });

export default function QuoteGen() {
  const [idx, setIdx] = useState(0);
  const text = useTypewriter(QUOTES[idx], 28);

  const next = () => {
    let n;
    if (core) n = core.randRange(0, QUOTES.length);
    else n = Math.floor(Math.random() * QUOTES.length);
    if (n === idx) n = (n + 1) % QUOTES.length;
    setIdx(n);
    Audio.sfx('whoosh');
  };

  return (
    <section className="eu-section" id="quote">
      <div className="wrap">
        <SectionHeader kicker="Words From The Dark" title="Villain Codex" />
        <div className="eu-quote" data-cursor="card">
          <span className="q-mark">“</span>
          <div className="q-text">{text}</div>
          <button className="eu-btn" data-cursor="button" onClick={next} style={{ marginTop: 24 }}>Generate New Quote</button>
        </div>
      </div>
    </section>
  );
}
