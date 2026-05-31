import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Audio } from '../audio.js';
import { getCore } from '../wasm/core.js';

let core = null; getCore().then((c) => { core = c; });

// Neon Hunter — a reflex game. Hit the targets before time runs out.
export default function MiniGame({ title = 'Neon Hunter' }) {
  const [state, setState] = useState('idle'); // idle | playing | over
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [time, setTime] = useState(20);
  const [target, setTarget] = useState(null); // {x,y}
  const stageRef = useRef(null);
  const timerRef = useRef(null);

  const spawn = useCallback(() => {
    const el = stageRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const pad = 50;
    const rx = core ? core.randRange(pad, Math.max(pad + 1, r.width - pad)) : pad + Math.random() * (r.width - pad * 2);
    const ry = core ? core.randRange(pad, Math.max(pad + 1, r.height - pad)) : pad + Math.random() * (r.height - pad * 2);
    setTarget({ x: rx, y: ry, key: Math.random() });
  }, []);

  const start = () => {
    setScore(0); setTime(20); setState('playing'); spawn(); Audio.sfx('granted');
  };

  useEffect(() => {
    if (state !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) { clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [state]);

  useEffect(() => {
    if (state === 'playing' && time === 0) {
      setState('over');
      setBest((b) => Math.max(b, score));
      Audio.sfx('whoosh');
    }
  }, [time, state, score]);

  const hit = (e) => {
    e.stopPropagation();
    setScore((s) => s + 1);
    Audio.sfx('beep');
    spawn();
  };

  const miss = () => { if (state === 'playing') Audio.sfx('click'); };

  return (
    <div className="eu-minigame" data-cursor="card">
      <div className="eu-minigame-hud">
        <span>SCORE <b>{score}</b></span>
        <span>TIME <b>{time}s</b></span>
        <span>BEST <b>{best}</b></span>
        <span style={{ marginLeft: 'auto', color: 'var(--silver)' }}>{title} — Reflex Mission</span>
      </div>
      <div className="eu-minigame-stage" ref={stageRef} onClick={miss}>
        {state === 'playing' && target && (
          <button
            className="eu-minigame-target"
            data-cursor="button"
            style={{ left: target.x - 22, top: target.y - 22 }}
            key={target.key}
            onClick={hit}
            aria-label="Hit target"
          />
        )}
        {state !== 'playing' && (
          <div className="eu-minigame-overlay">
            <div>
              <div className="mg-title">{state === 'over' ? 'MISSION OVER' : title.toUpperCase()}</div>
              <div className="mg-sub">
                {state === 'over' ? `You scored ${score}. ${score >= 20 ? 'UNBOUND REFLEXES.' : 'Try again, shadow.'}` : 'Hit the crimson targets. 20 seconds. No mercy.'}
              </div>
              <button className="eu-btn primary" data-cursor="button" onClick={start}>
                {state === 'over' ? 'Play Again' : 'Start Mission'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
