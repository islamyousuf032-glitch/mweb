// =============================================================================
//  YOUSUF UNBOUND — JS FALLBACK CORE
//  Pure-JS mirror of empire_core.cpp. Used when WebAssembly is unavailable
//  (old browsers, blocked binaries, prefers-reduced-motion fast path, etc).
//  API is intentionally identical to the WASM wrapper in core.js.
// =============================================================================

const STRIDE = 8;
const MAX = 4000;

export function createFallbackCore() {
  let rng = 0x1337beef >>> 0;
  const seed = (s) => { rng = (s >>> 0) || 0xc0ffee; };
  const xs = () => {
    let x = rng;
    x ^= x << 13; x >>>= 0;
    x ^= x >> 17;
    x ^= x << 5; x >>>= 0;
    rng = x >>> 0;
    return rng;
  };
  const frand = () => (xs() >>> 8) * (1 / 16777216);
  const randRange = (lo, hi) => (hi <= lo ? lo : lo + (xs() % (hi - lo)));

  const hash2 = (x, y) => {
    let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) >>> 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
    return ((h ^ (h >>> 16)) & 0xffff) / 65535;
  };
  const ss = (t) => t * t * (3 - 2 * t);
  const valueNoise = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = ss(xf), v = ss(yf);
    const a = hash2(xi, yi), b = hash2(xi + 1, yi);
    const c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
    const ab = a + u * (b - a);
    const cd = c + u * (d - c);
    return ab + v * (cd - ab);
  };
  const fbm = (x, y, oct) => {
    let sum = 0, amp = 0.5, freq = 1;
    for (let i = 0; i < oct; i++) { sum += amp * valueNoise(x * freq, y * freq); freq *= 2; amp *= 0.5; }
    return sum;
  };

  const buf = new Float32Array(MAX * STRIDE);
  let count = 0, W = 1280, H = 720, time = 0;
  const tilt = new Float32Array(2);
  const spot = new Float32Array([0.5, 0.5]);

  const init = (c, w, h) => {
    count = Math.max(0, Math.min(MAX, c)); W = w; H = h;
    for (let i = 0; i < count; i++) {
      const o = i * STRIDE;
      buf[o] = frand() * w;
      buf[o + 1] = frand() * h;
      buf[o + 2] = (frand() - 0.5) * 0.25;
      buf[o + 3] = -0.1 - frand() * 0.5;
      buf[o + 5] = 4 + frand() * 8;
      buf[o + 4] = frand() * buf[o + 5];
      buf[o + 6] = 0.5 + frand() * 2.2;
      buf[o + 7] = frand();
    }
  };
  const resize = (w, h) => { W = w; H = h; };

  const update = (dt, aura, beat, mode) => {
    time += dt;
    const speedBoost = 1 + aura * 1.6 + beat * 0.9;
    const t = time * 0.15;
    for (let i = 0; i < count; i++) {
      const o = i * STRIDE;
      const nx = fbm(buf[o] * 0.0016 + t, buf[o + 1] * 0.0016, 3) - 0.5;
      const ny = fbm(buf[o] * 0.0016, buf[o + 1] * 0.0016 - t, 3) - 0.5;
      buf[o + 2] += nx * dt * 18;
      buf[o + 3] += ny * dt * 12 - dt * 4;
      if (mode === 1) { buf[o + 3] += dt * 60; buf[o + 2] *= 0.96; }
      else if (mode === 4) { buf[o + 2] *= 0.985; buf[o + 3] *= 0.985; }
      const vx = buf[o + 2], vy = buf[o + 3];
      const vmag = Math.hypot(vx, vy);
      const vmax = 2.2 * speedBoost;
      if (vmag > vmax) { buf[o + 2] = vx / vmag * vmax; buf[o + 3] = vy / vmag * vmax; }
      buf[o] += buf[o + 2] * dt * 60;
      buf[o + 1] += buf[o + 3] * dt * 60;
      buf[o + 4] += dt;
      const dead = buf[o + 4] >= buf[o + 5] || buf[o + 1] < -20 || buf[o] < -20 || buf[o] > W + 20 || buf[o + 1] > H + 40;
      if (dead) {
        buf[o + 4] = 0;
        if (mode === 1) { buf[o] = frand() * W; buf[o + 1] = -10; buf[o + 2] = (frand() - 0.5) * 0.1; buf[o + 3] = 6 + frand() * 4; }
        else { buf[o] = frand() * W; buf[o + 1] = H + 10; buf[o + 2] = (frand() - 0.5) * 0.25; buf[o + 3] = -0.1 - frand() * 0.5; }
        buf[o + 5] = 4 + frand() * 8;
        buf[o + 6] = 0.5 + frand() * 2.2;
        buf[o + 7] = frand();
      }
    }
  };

  const auraLevel = (p) => {
    p = Math.max(0, Math.min(1, p));
    return Math.min(5, 1 + Math.floor(p * 4.999));
  };
  const auraGlow = (p) => { p = Math.max(0, Math.min(1, p)); return p * p * (0.4 + 0.6 * p); };
  const cardTilt = (dx, dy, maxDeg) => { tilt[0] = -dy * maxDeg; tilt[1] = dx * maxDeg; return tilt; };
  const waveform = (t, intensity) => {
    let a = Math.sin(t * 6.2831853) * 0.5;
    a += Math.sin(t * 6.2831853 * 2.3 + 1.1) * 0.3;
    a += Math.sin(t * 6.2831853 * 4.7 + 2.7) * 0.2;
    return Math.abs(a) * (0.4 + 0.6 * intensity);
  };
  const spotlight = (tx, ty, k) => {
    spot[0] += (tx - spot[0]) * k;
    spot[1] += (ty - spot[1]) * k;
    return spot;
  };

  return {
    backend: 'js',
    seed, randRange, valueNoise, fbm,
    buffer: () => buf, stride: () => STRIDE, count: () => count,
    init, resize, update,
    auraLevel, auraGlow, cardTilt, waveform, spotlight,
  };
}
