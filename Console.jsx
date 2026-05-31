import React, { useState, useRef, useEffect } from 'react';
import { SectionHeader } from './Reveal.jsx';
import { Audio } from '../audio.js';

const HELP = [
  'help', 'open vault', 'show trending', 'latest drops', 'play music', 'stop music',
  'aura level', 'unlock secret', 'system status', 'who is yousuf', 'enter dreamforge', 'clear',
];

export default function Console({ api }) {
  const [lines, setLines] = useState([
    { c: 'sys', t: 'YOUSUF UNBOUND CONSOLE v1.0 — type "help" to begin.' },
  ]);
  const [val, setVal] = useState('');
  const outRef = useRef(null);

  useEffect(() => { if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight; }, [lines]);

  const print = (arr) => setLines((p) => [...p, ...arr]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    Audio.sfx('beep');
    print([{ c: 'user', t: '> ' + raw }]);

    const reply = (out) => {
      // fake loading dots then output
      print([{ c: 'dim', t: 'processing...' }]);
      setTimeout(() => {
        setLines((p) => p.filter((l) => l.t !== 'processing...').concat(out));
      }, 380);
    };

    switch (cmd) {
      case 'help':
        reply([{ c: 'sys', t: 'AVAILABLE COMMANDS:' }, { c: 'dim', t: '  ' + HELP.join('   ') }]);
        break;
      case 'clear': setLines([]); break;
      case 'open vault': reply([{ c: 'sys', t: 'OPENING COMMAND VAULT...' }]); api.openVault(); break;
      case 'show trending': reply([{ c: 'sys', t: 'SCROLLING TO TRENDING NODE...' }]); api.scrollTo('trending'); break;
      case 'latest drops': reply([{ c: 'sys', t: 'SCROLLING TO DROPS ARCHIVE...' }]); api.scrollTo('drops'); break;
      case 'enter dreamforge': reply([{ c: 'sys', t: 'ACTIVATING AI DREAMFORGE...' }]); api.openRealm('ai-dreamforge'); break;
      case 'play music': reply([{ c: 'sys', t: 'DARK FREQUENCY ENGAGED.' }]); api.music(true); break;
      case 'stop music': reply([{ c: 'sys', t: 'SILENCE RESTORED.' }]); api.music(false); break;
      case 'aura level': reply([{ c: 'sys', t: `CURRENT AURA LEVEL: ${api.auraLabel()}` }]); break;
      case 'unlock secret':
        reply([{ c: 'warn', t: 'SECRET NODE FOUND' }, { c: 'sys', t: 'MESSAGE: THE UNBOUND NEVER SLEEPS' }]);
        api.toast('Secret Node Found');
        break;
      case 'system status':
        reply([
          { c: 'sys', t: 'YOUSUF UNBOUND CORE: ONLINE' },
          { c: 'sys', t: 'REALMS CONNECTED: 08' },
          { c: 'sys', t: `AURA LEVEL: ${api.auraLabel()}` },
          { c: 'sys', t: `VISITOR RANK: ${api.rank()}` },
          { c: 'sys', t: `ENGINE BACKEND: ${api.backend().toUpperCase()}` },
          { c: 'sys', t: 'ACCESS: GRANTED' },
        ]);
        break;
      case 'who is yousuf':
        reply([{ c: 'sys', t: 'A CREATOR BUILDING AN EMPIRE BEYOND LIMITS.' }]);
        break;
      case 'shadow king':
        reply([{ c: 'warn', t: 'KING MODE ACTIVATED' }]);
        api.kingMode();
        break;
      default:
        reply([{ c: 'warn', t: `UNKNOWN COMMAND: ${cmd}` }, { c: 'dim', t: 'type "help" for options.' }]);
    }
  };

  return (
    <section className="eu-section" id="console">
      <div className="wrap">
        <SectionHeader kicker="Command The Empire" title="Empire Console"
          sub="Type. Trigger. Unlock." />
        <div className="eu-console" data-cursor="card">
          <div className="eu-console-bar">
            <span className="dots"><i /><i /><i /></span>
            EMPIRE://core/terminal
          </div>
          <div className="eu-console-out" ref={outRef}>
            {lines.map((l, i) => <div key={i} className={`cl ${l.c}`}>{l.t}</div>)}
          </div>
          <form className="eu-console-input" onSubmit={(e) => { e.preventDefault(); run(val); setVal(''); }}>
            <span className="prompt">&gt;</span>
            <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="type a command..." data-cursor="text" autoComplete="off" spellCheck="false" />
          </form>
        </div>
        <div className="eu-console-chips">
          {['help', 'system status', 'show trending', 'latest drops', 'play music', 'unlock secret', 'who is yousuf', 'aura level', 'enter dreamforge', 'clear'].map((c) => (
            <button key={c} data-cursor="button" onClick={() => run(c)}>{c}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
