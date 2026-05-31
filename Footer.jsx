import React from 'react';
import { REALMS } from '../data.js';
import { Audio } from '../audio.js';

export default function Footer({ onNavigate, onEmblem }) {
  return (
    <footer className="eu-footer">
      <div className="eu-footer-title glitch-on-hover">YOUSUF UNBOUND</div>
      <p className="eu-footer-text">A Dark Digital Empire of Cinema, Art, Sound, Games, Apps and Imagination.</p>
      <div className="eu-footer-links">
        {REALMS.map((r) => (
          <a key={r.id} href={'./' + r.page} data-cursor="text"
             onClick={(e) => { e.preventDefault(); onNavigate(r); }}>{r.name}</a>
        ))}
      </div>
      <div className="eu-footer-quote">“The Empire Does Not End Here.”</div>
      <div className="eu-footer-emblem" data-cursor="button" onClick={() => { onEmblem(); Audio.sfx('beep'); }} title="YU">YU</div>
      <div className="eu-footer-copy">© 2026 YOUSUF UNBOUND. All Realms Reserved.</div>
    </footer>
  );
}
