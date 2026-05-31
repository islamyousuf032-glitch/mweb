import React, { useEffect, useState } from 'react';
import { Audio } from '../audio.js';

const MSGS = [
  'The Empire Is Waking Up...',
  'Forging Visual Engine...',
  'Synchronizing Dark Frequency...',
  'Unlocking Dreamforge...',
  'Preparing Cinematic Interface...',
];

export default function Loader({ onDone, soundOn }) {
  const [pct, setPct] = useState(0);
  const [msg, setMsg] = useState(MSGS[0]);
  const [granted, setGranted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0, mi = 0;
    const id = setInterval(() => {
      p += Math.random() * 9 + 4;
      if (p >= 100) p = 100;
      setPct(Math.floor(p));
      const idx = Math.min(MSGS.length - 1, Math.floor((p / 100) * MSGS.length));
      if (idx !== mi) { mi = idx; setMsg(MSGS[idx]); }
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => { setGranted(true); if (soundOn) Audio.sfx('granted'); }, 250);
        setTimeout(() => setDone(true), 1300);
        setTimeout(() => onDone(), 2100);
      }
    }, 180);
    return () => clearInterval(id);
  }, []); // eslint-disable-line

  return (
    <div className={`eu-loader ${done ? 'done' : ''}`}>
      <div style={{ textAlign: 'center' }}>
        <div className="eu-loader-core">
          <span className="eu-scanner" />
          <span className="eu-scanner r2" />
          <span className="eu-scanner r3" />
          {granted
            ? <span className="eu-granted">ACCESS GRANTED</span>
            : <span className="eu-emblem">YU</span>}
        </div>
        {!granted ? (
          <>
            <div className="eu-loader-text">{msg}</div>
            <div className="eu-loader-bar"><i style={{ width: pct + '%' }} /></div>
            <div className="eu-loader-pct">{pct}%</div>
          </>
        ) : (
          <div className="eu-loader-text" style={{ color: 'var(--gold)', marginTop: 26 }}>WELCOME TO YOUSUF UNBOUND</div>
        )}
      </div>
    </div>
  );
}
