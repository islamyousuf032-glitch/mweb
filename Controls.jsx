import React from 'react';
import { Icon } from '../icons.jsx';
import { Audio } from '../audio.js';

export function FabControls({ musicOn, toggleMusic, cursorOn, toggleCursor, musicHoldStart, musicHoldEnd, onSettings }) {
  return (
    <div className="eu-fab-stack">
      <button
        className={`eu-orb ${musicOn ? 'active' : ''}`}
        data-cursor="button"
        title="Music (M) — hold for Deep Cinema Mode"
        aria-label="Toggle music"
        onClick={toggleMusic}
        onMouseDown={musicHoldStart}
        onMouseUp={musicHoldEnd}
        onMouseLeave={musicHoldEnd}
        onTouchStart={musicHoldStart}
        onTouchEnd={musicHoldEnd}
      >
        <Icon name={musicOn ? 'sound' : 'mute'} width="22" height="22" />
      </button>
      <button
        className={`eu-orb ${cursorOn ? 'active' : ''}`}
        data-cursor="button"
        title="Custom cursor (C) — double-click for Blade"
        aria-label="Toggle custom cursor"
        onClick={toggleCursor}
        onDoubleClick={() => Audio.sfx('whoosh')}
      >
        <Icon name="cursor" width="20" height="20" />
      </button>
      <button
        className="eu-orb"
        data-cursor="button"
        title="Control Vault — settings (S)"
        aria-label="Open settings"
        onClick={onSettings}
      >
        <Icon name="spark" width="20" height="20" />
      </button>
    </div>
  );
}

export function AuraIndicator({ level }) {
  const label = level >= 5 ? 'UNBOUND' : String(level).padStart(2, '0');
  return (
    <div className="eu-aura-ind" aria-hidden="true">
      <span className="label">AURA LEVEL</span>
      <span className="lvl">{label}</span>
      <span className="bars">
        {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= level ? 'on' : ''} />)}
      </span>
    </div>
  );
}

export function BladeProgress({ progress }) {
  return <div className="eu-blade-progress" style={{ width: progress * 100 + '%' }} />;
}

export function AlertBanner({ show, text }) {
  return (
    <div className={`eu-alert ${show ? 'show' : ''}`} role="status">
      <span className="pulse" /> {text}
    </div>
  );
}

export function MobileBar({ onHome, onScrollTo, onVault }) {
  const items = [
    ['Home', 'crown', onHome],
    ['Trending', 'bolt', () => onScrollTo('trending')],
    ['Drops', 'tag', () => onScrollTo('drops')],
    ['Realms', 'grid', () => onScrollTo('realms')],
    ['Menu', 'search', onVault],
  ];
  return (
    <nav className="eu-mobilebar">
      {items.map(([label, icon, fn]) => (
        <button key={label} onClick={() => { fn(); Audio.sfx('click'); }}>
          <Icon name={icon} width="20" height="20" />
          {label}
        </button>
      ))}
    </nav>
  );
}

export function PageTransition({ state, text }) {
  if (!state) return null;
  return (
    <div className={`eu-transition ${state}`}>
      <div style={{ textAlign: 'center' }}>
        <div className="tr-text">{text}</div>
        <div className="tr-bar"><i /></div>
      </div>
    </div>
  );
}
