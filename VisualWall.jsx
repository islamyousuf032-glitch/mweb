import React from 'react';
import { VISUAL_WALL } from '../data.js';
import { SectionHeader, Reveal } from './Reveal.jsx';

export default function VisualWall({ onOpen }) {
  return (
    <section className="eu-section" id="wall">
      <div className="wrap">
        <SectionHeader kicker="Collage" title="Visual Power Wall"
          sub="A glimpse into the empire's visual arsenal." />
        <Reveal>
          <div className="eu-wall">
            {VISUAL_WALL.map((v) => (
              <div key={v.id} className={`eu-wall-cell ${v.span}`} data-cursor="card"
                onClick={() => onOpen({ title: v.label, cat: v.cat, type: 'Visual Drop', desc: `${v.label} — a forged ${v.cat.toLowerCase()} fragment from the dark archive.` })}>
                <span className="w-ghost">{v.label}</span>
                <div className="eu-wall-label">
                  <div className="w-cat">{v.cat}</div>
                  <div className="w-name">{v.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
