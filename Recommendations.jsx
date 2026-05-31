import React, { useState } from 'react';
import { SectionHeader, Reveal } from './Reveal.jsx';
import { AI_SUGGESTIONS } from '../data.js';
import { getCore } from '../wasm/core.js';
import { Audio } from '../audio.js';

let core = null; getCore().then((c) => { core = c; });

const POOL = {
  Film: ['The Unbound Cut', 'Midnight Chase', 'Void Walker Reel', 'Throne Room'],
  'AI Art': ['Blood Moon Samurai', 'Red Silence', 'Crimson Mask', 'Shadow King'],
  Music: ['Dark Pulse', 'Dark Frequency Vol. 1', 'Aura Sampler', 'Underworld Bass'],
  Game: ['Neon Hunter', 'Reflex Trainer', 'Shadow Mission', 'Glow Runner'],
  Drop: ['Empire Wallpaper Pack', 'Blood Moon Poster Pack', 'Smoke Brushes', 'Merch Preview'],
};

function pick(kind, seedOffset) {
  const arr = POOL[kind];
  let i;
  if (core) i = core.randRange(0, arr.length);
  else i = (Math.floor(Math.random() * arr.length) + seedOffset) % arr.length;
  return arr[i];
}

export default function Recommendations() {
  const kinds = ['Film', 'AI Art', 'Music', 'Game', 'Drop'];
  const [picks, setPicks] = useState(() => kinds.map((k, i) => pick(k, i)));
  const [suggestion, setSuggestion] = useState(AI_SUGGESTIONS[0]);

  const refresh = () => {
    if (core) core.seed((Date.now() & 0x7fffffff) || 1);
    setPicks(kinds.map((k, i) => pick(k, i)));
    setSuggestion(AI_SUGGESTIONS[core ? core.randRange(0, AI_SUGGESTIONS.length) : Math.floor(Math.random() * AI_SUGGESTIONS.length)]);
    Audio.sfx('beep');
  };

  return (
    <section className="eu-section" id="chosen">
      <div className="wrap">
        <SectionHeader kicker="Chosen By The Empire" title="AI Core Suggests"
          sub="Dynamic picks based on the current aura." />
        <Reveal>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginTop: 18 }}>
            <span className="eu-ai-bar"><span className="blip" /> AI SIGNAL ONLINE</span>
            <span style={{ color: 'var(--silver)', fontFamily: 'var(--ff-tech)', letterSpacing: '.1em' }}>“{suggestion}”</span>
            <button className="eu-btn sm" data-cursor="button" onClick={refresh}>Regenerate</button>
          </div>
        </Reveal>
        <div className="eu-rec-grid">
          {kinds.map((k, i) => (
            <Reveal key={k} delay={i * 70}>
              <div className="eu-rec" data-cursor="card">
                <div className="eu-scanline-fx" style={{ animationDelay: `${i * 0.3}s` }} />
                <div>
                  <div className="r-kind">Recommended {k}</div>
                  <div className="r-title">{picks[i]}</div>
                </div>
                <span className="r-badge">Selected</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
