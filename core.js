// =============================================================================
//  YOUSUF UNBOUND — CORE LOADER
//  Tries to load the C++/WebAssembly engine (empire_core.wasm). If anything
//  fails, transparently falls back to the pure-JS mirror. Either way the
//  rest of the app talks to one identical API.
// =============================================================================
import { createFallbackCore } from './fallback.js';

let _corePromise = null;

async function loadWasmCore() {
  // Vite resolves these as URLs; the glue fetches the .wasm beside it.
  const factory = (await import('./empire_core.js')).default;
  const wasmUrl = (await import('./empire_core.wasm?url')).default;

  const Module = await factory({
    locateFile: (path) => (path.endsWith('.wasm') ? wasmUrl : path),
  });

  const cwrap = Module.cwrap;
  const api = {
    backend: 'wasm',
    seed: cwrap('eu_seed', null, ['number']),
    randRange: cwrap('eu_rand_range', 'number', ['number', 'number']),
    valueNoise: cwrap('eu_value_noise', 'number', ['number', 'number']),
    fbm: cwrap('eu_fbm', 'number', ['number', 'number', 'number']),
    _buffer: cwrap('eu_buffer', 'number', []),
    stride: cwrap('eu_stride', 'number', []),
    count: cwrap('eu_count', 'number', []),
    init: cwrap('eu_init', null, ['number', 'number', 'number']),
    resize: cwrap('eu_resize', null, ['number', 'number']),
    update: cwrap('eu_update', null, ['number', 'number', 'number', 'number']),
    auraLevel: cwrap('eu_aura_level', 'number', ['number']),
    auraGlow: cwrap('eu_aura_glow', 'number', ['number']),
    _cardTilt: cwrap('eu_card_tilt', 'number', ['number', 'number', 'number']),
    waveform: cwrap('eu_waveform', 'number', ['number', 'number']),
    _spotlight: cwrap('eu_spotlight', 'number', ['number', 'number', 'number']),
  };

  // Wrap pointer-returning fns so callers get a Float32Array view.
  api.buffer = () => {
    const ptr = api._buffer();
    const len = api.count() * api.stride();
    return Module.HEAPF32.subarray(ptr >> 2, (ptr >> 2) + len);
  };
  api.cardTilt = (dx, dy, maxDeg) => {
    const ptr = api._cardTilt(dx, dy, maxDeg);
    return Module.HEAPF32.subarray(ptr >> 2, (ptr >> 2) + 2);
  };
  api.spotlight = (tx, ty, k) => {
    const ptr = api._spotlight(tx, ty, k);
    return Module.HEAPF32.subarray(ptr >> 2, (ptr >> 2) + 2);
  };

  return api;
}

export function getCore() {
  if (_corePromise) return _corePromise;
  _corePromise = (async () => {
    try {
      if (typeof WebAssembly === 'undefined') throw new Error('no wasm');
      const core = await loadWasmCore();
      core.seed((Date.now() & 0x7fffffff) || 1);
      // eslint-disable-next-line no-console
      console.log('%c[YOUSUF UNBOUND] Empire Core online — backend: WASM (C++)', 'color:#ff0033');
      return core;
    } catch (e) {
      const core = createFallbackCore();
      core.seed((Date.now() & 0x7fffffff) || 1);
      // eslint-disable-next-line no-console
      console.log('%c[YOUSUF UNBOUND] Empire Core online — backend: JS fallback', 'color:#c9a44c', e?.message || '');
      return core;
    }
  })();
  return _corePromise;
}
