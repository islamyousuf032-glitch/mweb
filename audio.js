// =============================================================================
//  YOUSUF UNBOUND — SOUND ENGINE
//  All audio is synthesized with the Web Audio API (no external files), so the
//  cinematic ambience + SFX work fully offline and inside the sandbox.
// =============================================================================

let ctx = null;
let masterGain = null;
let musicGain = null;
let sfxGain = null;
let ambientNodes = [];
let started = false;
let sfxEnabled = true;
let beatValue = 0; // 0..1 live pulse used by visuals
let beatTimer = null;

function ensureCtx() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  masterGain = ctx.createGain();
  masterGain.gain.value = 0.7;
  masterGain.connect(ctx.destination);

  musicGain = ctx.createGain();
  musicGain.gain.value = 0.0;
  musicGain.connect(masterGain);

  sfxGain = ctx.createGain();
  sfxGain.gain.value = 0.6;
  sfxGain.connect(masterGain);
  return ctx;
}

function buildAmbient() {
  if (!ctx || ambientNodes.length) return;

  // Deep drone (two slightly detuned saws + lowpass)
  const drone = ctx.createGain();
  drone.gain.value = 0.14;
  drone.connect(musicGain);
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = 320; lp.Q.value = 0.7;
  lp.connect(drone);
  [55, 55.4, 82.5].forEach((f) => {
    const o = ctx.createOscillator();
    o.type = 'sawtooth'; o.frequency.value = f;
    const g = ctx.createGain(); g.gain.value = 0.4;
    o.connect(g); g.connect(lp); o.start();
    ambientNodes.push(o);
  });

  // Slow LFO that breathes the lowpass for movement
  const lfo = ctx.createOscillator();
  lfo.type = 'sine'; lfo.frequency.value = 0.06;
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 120;
  lfo.connect(lfoGain); lfoGain.connect(lp.frequency); lfo.start();
  ambientNodes.push(lfo);

  // Heartbeat-ish low pulse every ~1.6s
  const beat = () => {
    if (!ctx) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(64, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 0.22);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    o.connect(g); g.connect(musicGain); o.start(t); o.stop(t + 0.45);
    beatValue = 1;
  };
  beatTimer = setInterval(beat, 1600);
}

export const Audio = {
  available() { return !!(window.AudioContext || window.webkitAudioContext); },
  get beat() { return beatValue; },
  decayBeat(dt) { beatValue = Math.max(0, beatValue - dt * 2.2); },

  async startMusic() {
    ensureCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') await ctx.resume();
    buildAmbient();
    started = true;
    musicGain.gain.cancelScheduledValues(ctx.currentTime);
    musicGain.gain.setTargetAtTime(0.8, ctx.currentTime, 1.2);
  },
  stopMusic() {
    if (!ctx || !musicGain) return;
    musicGain.gain.setTargetAtTime(0.0, ctx.currentTime, 0.6);
    started = false;
  },
  isPlaying() { return started; },

  setMusicVolume(v) { if (musicGain && ctx) musicGain.gain.setTargetAtTime(v, ctx.currentTime, 0.1); },
  setSfxVolume(v) { if (sfxGain && ctx) sfxGain.gain.value = v; },
  setMasterVolume(v) { if (masterGain && ctx) masterGain.gain.value = v; },

  setSfxEnabled(v) { sfxEnabled = !!v; },
  isSfxEnabled() { return sfxEnabled; },

  // --- SFX -------------------------------------------------------------------
  sfx(type) {
    if (!sfxEnabled) return;
    ensureCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime;
    const make = (osc, freq, dur, gain = 0.4, type2 = 'sine', sweep = null) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type2; o.frequency.setValueAtTime(freq, t);
      if (sweep) o.frequency.exponentialRampToValueAtTime(sweep, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(sfxGain); o.start(t); o.stop(t + dur + 0.02);
    };
    switch (type) {
      case 'click':   make(null, 220, 0.08, 0.25, 'triangle', 120); break;
      case 'menu':    make(null, 520, 0.35, 0.3, 'sawtooth', 90); break;
      case 'hover':   make(null, 660, 0.06, 0.12, 'sine', 880); break;
      case 'beep':    make(null, 880, 0.05, 0.18, 'square', 1200); break;
      case 'granted': make(null, 90, 0.5, 0.5, 'sine', 45); break;
      case 'section': make(null, 140, 0.2, 0.18, 'sine', 80); break;
      case 'whoosh': {
        // noise sweep
        const bufLen = ctx.sampleRate * 0.4;
        const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / bufLen);
        const src = ctx.createBufferSource(); src.buffer = buf;
        const bp = ctx.createBiquadFilter(); bp.type = 'bandpass';
        bp.frequency.setValueAtTime(300, t); bp.frequency.exponentialRampToValueAtTime(3000, t + 0.35);
        const g = ctx.createGain(); g.gain.value = 0.25;
        src.connect(bp); bp.connect(g); g.connect(sfxGain); src.start(t);
        break;
      }
      default: make(null, 440, 0.08, 0.2, 'sine');
    }
  },

  cleanup() {
    if (beatTimer) clearInterval(beatTimer);
    ambientNodes.forEach((n) => { try { n.stop(); } catch (e) { /* noop */ } });
    ambientNodes = [];
  },
};
