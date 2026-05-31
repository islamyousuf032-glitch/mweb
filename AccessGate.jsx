import React, { useEffect, useRef, useState } from 'react';
import { Audio } from '../audio.js';

const SCAN_LINES = [
  'INITIALIZING YOUSUF UNBOUND...',
  'SCANNING VISITOR IDENTITY...',
  'LOADING DARK ARCHIVE...',
  'CONNECTING TO 8 REALMS...',
  'ACCESS LEVEL: SHADOW GUEST',
  'EMPIRE STATUS: ONLINE',
];

export default function AccessGate({ onEnter }) {
  const [phase, setPhase] = useState('scan'); // scan -> ready -> closing
  const [visibleLines, setVisibleLines] = useState(0);
  const thunderRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (thunderRef.current) { thunderRef.current.classList.remove('flash'); void thunderRef.current.offsetWidth; thunderRef.current.classList.add('flash'); }
      if (i >= SCAN_LINES.length) { clearInterval(id); setTimeout(() => setPhase('ready'), 500); }
    }, 420);
    return () => clearInterval(id);
  }, []);

  const enter = async (withSound) => {
    if (withSound) { await Audio.startMusic(); Audio.sfx('granted'); }
    setPhase('closing');
    setTimeout(() => onEnter(withSound), 1050);
  };

  return (
    <div className={`eu-gate ${phase === 'closing' ? 'split-open' : ''}`}>
      <div className="eu-gate-split" />
      <div className="eu-gate-smoke" />
      <div ref={thunderRef} className="eu-gate-thunder" />
      <div className="eu-gate-inner">
        <div className="eu-gate-scan">
          {SCAN_LINES.slice(0, visibleLines).map((l, i) => (
            <div key={i} style={{ animationDelay: `${i * 0.05}s` }}>{'> ' + l}</div>
          ))}
        </div>
        {phase === 'ready' && (
          <>
            <div className="eu-gate-title glitch-on-hover">ENTER THE EMPIRE</div>
            <div className="eu-gate-actions">
              <button className="eu-btn primary" data-cursor="button" onClick={() => enter(true)}>Enter With Sound</button>
              <button className="eu-btn" data-cursor="button" onClick={() => enter(false)}>Enter Silently</button>
              <button className="eu-btn ghost" data-cursor="button" onClick={() => enter(false)}>Skip Intro</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
