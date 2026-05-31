import React, { useState, useEffect, useRef } from 'react';
import { REALMS } from '../data.js';
import { Icon } from '../icons.jsx';
import { Audio } from '../audio.js';

export default function CommandVault({ open, setOpen, onNavigate, onLogoClick, searchFocusRef }) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);

  useEffect(() => { searchFocusRef.current = () => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 350); }; }, []); // eslint-disable-line
  useEffect(() => { if (open) { Audio.sfx('menu'); setTimeout(() => inputRef.current?.focus(), 400); } }, [open]);

  const filtered = REALMS.filter((r) =>
    !q || r.name.toLowerCase().includes(q.toLowerCase()) || r.sub.toLowerCase().includes(q.toLowerCase()) || r.tagline.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <div className="eu-header">
        <button className="eu-logo" data-cursor="text" onClick={onLogoClick} aria-label="YOUSUF UNBOUND home">
          <span className="yu">YU</span> YOUSUF UNBOUND
        </button>
        <button
          className={`eu-vault-btn ${open ? 'open' : ''}`}
          data-cursor="menu"
          aria-label="Open Command Vault"
          aria-expanded={open}
          onClick={() => { setOpen(!open); if (!open) Audio.sfx('whoosh'); else Audio.sfx('click'); }}
        >
          <i /><i /><i />
        </button>
      </div>

      <div className={`eu-vault ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="eu-vault-overlay" onClick={() => setOpen(false)} />
        <div className="eu-vault-scan" />
        <div className="eu-vault-panel">
          <div className="eu-vault-head">
            <div>
              <span className="eu-kicker">Choose A Realm</span>
              <h3 className="eu-vault-title">COMMAND VAULT</h3>
            </div>
            <label className="eu-vault-search">
              <Icon name="search" width="16" height="16" />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search The Empire..." data-cursor="text" />
            </label>
          </div>

          <div className="eu-vault-list">
            {filtered.map((r, i) => (
              <button
                key={r.id}
                className="eu-vault-item"
                data-cursor="card"
                style={{ animationDelay: `${0.15 + i * 0.05}s` }}
                onMouseEnter={() => Audio.sfx('hover')}
                onClick={() => { setOpen(false); onNavigate(r); }}
              >
                <span className="vi-icon"><Icon name={r.icon} width="22" height="22" /></span>
                <span style={{ textAlign: 'left' }}>
                  <span className="vi-sub">{r.sub}</span>
                  <span className="vi-name" style={{ display: 'block' }}>{r.name}</span>
                  <span className="vi-tag">{r.tagline}</span>
                </span>
                <span className="vi-thumb" aria-hidden="true">
                  <span className="vt-fill" />
                  <span className="vt-ic"><Icon name={r.icon} width="26" height="26" /></span>
                </span>
                <span className="vi-go eu-btn sm">Access Realm <Icon name="arrow" width="14" height="14" /></span>
              </button>
            ))}
            {!filtered.length && <div className="eu-empty">Nothing Found In The Shadows</div>}
          </div>

          <div className="eu-vault-foot">Choose A Realm. Enter Without Fear.</div>
        </div>
      </div>
    </>
  );
}
