// =============================================================================
//  YOUSUF UNBOUND — EMPIRE CORE  (C++ -> WebAssembly)
//  Compiled with Emscripten. Heavy realtime math runs here for 60fps visuals.
//  A full JS fallback exists in src/wasm/fallback.js if WASM fails to load.
// =============================================================================
#include <emscripten/emscripten.h>
#include <cmath>
#include <cstdint>

extern "C" {

// ---- Deterministic fast PRNG (xorshift32) ----------------------------------
static uint32_t s_rngState = 0x1337BEEFu;

EMSCRIPTEN_KEEPALIVE
void eu_seed(uint32_t seed) { s_rngState = seed ? seed : 0xC0FFEEu; }

static inline uint32_t xorshift32() {
  uint32_t x = s_rngState;
  x ^= x << 13; x ^= x >> 17; x ^= x << 5;
  s_rngState = x;
  return x;
}
static inline float frand() { return (xorshift32() >> 8) * (1.0f / 16777216.0f); }

EMSCRIPTEN_KEEPALIVE
int eu_rand_range(int lo, int hi) {
  if (hi <= lo) return lo;
  return lo + (int)(xorshift32() % (uint32_t)(hi - lo));
}

// ---- Value noise (smooth procedural field for backgrounds) -----------------
static inline float hash2(int x, int y) {
  uint32_t h = (uint32_t)(x * 374761393 + y * 668265263);
  h = (h ^ (h >> 13)) * 1274126177u;
  return ((h ^ (h >> 16)) & 0xFFFF) / 65535.0f;
}
static inline float smoothstep(float t) { return t * t * (3.0f - 2.0f * t); }

EMSCRIPTEN_KEEPALIVE
float eu_value_noise(float x, float y) {
  int xi = (int)floorf(x), yi = (int)floorf(y);
  float xf = x - xi, yf = y - yi;
  float u = smoothstep(xf), v = smoothstep(yf);
  float a = hash2(xi, yi),     b = hash2(xi + 1, yi);
  float c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  float ab = a + u * (b - a);
  float cd = c + u * (d - c);
  return ab + v * (cd - ab);
}

EMSCRIPTEN_KEEPALIVE
float eu_fbm(float x, float y, int octaves) {
  float sum = 0.0f, amp = 0.5f, freq = 1.0f;
  for (int i = 0; i < octaves; ++i) {
    sum += amp * eu_value_noise(x * freq, y * freq);
    freq *= 2.0f; amp *= 0.5f;
  }
  return sum;
}

// ---- Particle system --------------------------------------------------------
//  Layout per particle (8 floats): x, y, vx, vy, life, maxLife, size, hue
#define EU_STRIDE 8
#define EU_MAX_PARTICLES 4000
static float s_p[EU_MAX_PARTICLES * EU_STRIDE];
static int   s_count = 0;
static float s_w = 1280.0f, s_h = 720.0f;
static float s_time = 0.0f;

EMSCRIPTEN_KEEPALIVE
float* eu_buffer() { return s_p; }

EMSCRIPTEN_KEEPALIVE
int eu_stride() { return EU_STRIDE; }

EMSCRIPTEN_KEEPALIVE
int eu_count() { return s_count; }

EMSCRIPTEN_KEEPALIVE
void eu_init(int count, float w, float h) {
  if (count > EU_MAX_PARTICLES) count = EU_MAX_PARTICLES;
  if (count < 0) count = 0;
  s_count = count; s_w = w; s_h = h;
  for (int i = 0; i < count; ++i) {
    float* p = &s_p[i * EU_STRIDE];
    p[0] = frand() * w;             // x
    p[1] = frand() * h;             // y
    p[2] = (frand() - 0.5f) * 0.25f;// vx
    p[3] = -0.1f - frand() * 0.5f;  // vy (drift up)
    p[5] = 4.0f + frand() * 8.0f;   // maxLife (seconds)
    p[4] = frand() * p[5];          // life
    p[6] = 0.5f + frand() * 2.2f;   // size
    p[7] = frand();                 // hue seed
  }
}

EMSCRIPTEN_KEEPALIVE
void eu_resize(float w, float h) { s_w = w; s_h = h; }

// Update step. dt seconds, aura 0..1 intensity, beat 0..1 audio pulse, mode int
EMSCRIPTEN_KEEPALIVE
void eu_update(float dt, float aura, float beat, int mode) {
  s_time += dt;
  float speedBoost = 1.0f + aura * 1.6f + beat * 0.9f;
  float t = s_time * 0.15f;
  for (int i = 0; i < s_count; ++i) {
    float* p = &s_p[i * EU_STRIDE];
    // curl-ish flow from fbm noise field
    float nx = eu_fbm(p[0] * 0.0016f + t, p[1] * 0.0016f, 3) - 0.5f;
    float ny = eu_fbm(p[0] * 0.0016f, p[1] * 0.0016f - t, 3) - 0.5f;
    p[2] += nx * dt * 18.0f;
    p[3] += ny * dt * 12.0f - dt * 4.0f; // gentle upward bias
    // mode tweaks: 1 rain -> faster downward; 4 void -> calmer
    if (mode == 1) { p[3] += dt * 60.0f; p[2] *= 0.96f; }
    else if (mode == 4) { p[2] *= 0.985f; p[3] *= 0.985f; }
    // clamp velocity
    float vx = p[2], vy = p[3];
    float vmag = sqrtf(vx * vx + vy * vy);
    float vmax = 2.2f * speedBoost;
    if (vmag > vmax) { p[2] = vx / vmag * vmax; p[3] = vy / vmag * vmax; }
    p[0] += p[2] * dt * 60.0f;
    p[1] += p[3] * dt * 60.0f;
    p[4] += dt;
    // recycle on death / out of bounds
    bool dead = p[4] >= p[5] || p[1] < -20.0f || p[0] < -20.0f || p[0] > s_w + 20.0f || p[1] > s_h + 40.0f;
    if (dead) {
      p[4] = 0.0f;
      if (mode == 1) { p[0] = frand() * s_w; p[1] = -10.0f; p[2] = (frand()-0.5f)*0.1f; p[3] = 6.0f + frand()*4.0f; }
      else           { p[0] = frand() * s_w; p[1] = s_h + 10.0f; p[2] = (frand()-0.5f)*0.25f; p[3] = -0.1f - frand()*0.5f; }
      p[5] = 4.0f + frand() * 8.0f;
      p[6] = 0.5f + frand() * 2.2f;
      p[7] = frand();
    }
  }
}

// ---- Aura level calculation -------------------------------------------------
//  Maps scroll progress (0..1) to discrete aura level 1..5 plus continuous glow
EMSCRIPTEN_KEEPALIVE
int eu_aura_level(float progress) {
  if (progress < 0.0f) progress = 0.0f;
  if (progress > 1.0f) progress = 1.0f;
  int lvl = 1 + (int)(progress * 4.999f);
  if (lvl > 5) lvl = 5;
  return lvl;
}

EMSCRIPTEN_KEEPALIVE
float eu_aura_glow(float progress) {
  if (progress < 0.0f) progress = 0.0f;
  if (progress > 1.0f) progress = 1.0f;
  // ease-in glow curve
  return progress * progress * (0.4f + 0.6f * progress);
}

// ---- Magnetic / tilt math ---------------------------------------------------
//  Returns tilt as packed via out buffer [rx, ry] given pointer offsets -1..1
static float s_tilt[2];
EMSCRIPTEN_KEEPALIVE
float* eu_card_tilt(float dx, float dy, float maxDeg) {
  s_tilt[0] = -dy * maxDeg; // rotateX
  s_tilt[1] =  dx * maxDeg; // rotateY
  return s_tilt;
}

// ---- Audio waveform synthesis (visual only) --------------------------------
//  Produces a pseudo-waveform amplitude for cursor/orb pulse
EMSCRIPTEN_KEEPALIVE
float eu_waveform(float t, float intensity) {
  float a = sinf(t * 6.2831853f * 1.0f) * 0.5f;
  a += sinf(t * 6.2831853f * 2.3f + 1.1f) * 0.3f;
  a += sinf(t * 6.2831853f * 4.7f + 2.7f) * 0.2f;
  return fabsf(a) * (0.4f + 0.6f * intensity);
}

// ---- Spotlight smoothing (lerp toward target) ------------------------------
static float s_spot[2] = {0.5f, 0.5f};
EMSCRIPTEN_KEEPALIVE
float* eu_spotlight(float tx, float ty, float k) {
  s_spot[0] += (tx - s_spot[0]) * k;
  s_spot[1] += (ty - s_spot[1]) * k;
  return s_spot;
}

} // extern "C"
