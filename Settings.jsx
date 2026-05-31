import React from 'react';
import { Icon } from '../icons.jsx';
import { Audio } from '../audio.js';

function Toggle({ on, onChange }) {
  return <button className={`eu-toggle ${on ? 'on' : ''}`} data-cursor="button" role="switch" aria-checked={on}
    onClick={() => { onChange(!on); Audio.sfx('click'); }} />;
}

export default function Settings({ open, onClose, settings, set }) {
  return (
    <div className={`eu-settings ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="eu-settings-overlay" onClick={onClose} />
      <div className="eu-settings-panel">
        <button className="eu-settings-close" data-cursor="button" onClick={onClose} aria-label="Close"><Icon name="close" width="18" height="18" /></button>
        <h3>CONTROL VAULT</h3>
        <div className="ss-sub">TUNE YOUR EXPERIENCE</div>

        <div className="eu-set-row">
          <label>Music
            <span className="ss-hint">Dark cinematic ambient</span>
          </label>
          <Toggle on={settings.music} onChange={(v) => set('music', v)} />
        </div>

        <div className="eu-set-row">
          <label>Sound Effects
            <span className="ss-hint">Clicks, beeps, whooshes</span>
          </label>
          <Toggle on={settings.sfx} onChange={(v) => set('sfx', v)} />
        </div>

        <div className="eu-set-row">
          <label>Master Volume</label>
          <input className="eu-slider-ctrl" type="range" min="0" max="100" value={settings.volume}
            data-cursor="button" onChange={(e) => set('volume', Number(e.target.value))} />
        </div>

        <div className="eu-set-row">
          <label>Custom Cursor
            <span className="ss-hint">6-mode reactive cursor (desktop)</span>
          </label>
          <Toggle on={settings.cursor} onChange={(v) => set('cursor', v)} />
        </div>

        <div className="eu-set-row">
          <label>Deep Noir Mode
            <span className="ss-hint">Even darker, deeper crimson</span>
          </label>
          <Toggle on={settings.deepNoir} onChange={(v) => set('deepNoir', v)} />
        </div>

        <div className="eu-set-row">
          <label>Immersive Mode
            <span className="ss-hint">Hide UI chrome, full cinema</span>
          </label>
          <Toggle on={settings.immersive} onChange={(v) => set('immersive', v)} />
        </div>

        <div className="eu-set-row" style={{ borderBottom: 'none' }}>
          <label>Reduced Motion
            <span className="ss-hint">Calmer animations, fewer particles</span>
          </label>
          <Toggle on={settings.reducedMotion} onChange={(v) => set('reducedMotion', v)} />
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button className="eu-btn ghost sm" data-cursor="button" onClick={() => { set('music', false); set('sfx', false); Audio.sfx('click'); }}>
            Silent Mode
          </button>
          <button className="eu-btn primary sm" data-cursor="button" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
