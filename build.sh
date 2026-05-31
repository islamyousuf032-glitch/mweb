#!/usr/bin/env bash
# =============================================================================
#  YOUSUF UNBOUND — WASM build script
#  Rebuilds empire_core.wasm + glue from empire_core.cpp using Emscripten.
#  The compiled artifacts are committed to ../src/wasm so you DON'T need
#  Emscripten just to run the site — only to change the C++.
#
#  Setup (once):
#    git clone https://github.com/emscripten-core/emsdk.git
#    cd emsdk && ./emsdk install latest && ./emsdk activate latest
#    source ./emsdk_env.sh
#
#  Then from this folder:
#    bash build.sh
# =============================================================================
set -e
cd "$(dirname "$0")"

emcc empire_core.cpp -O3 \
  -s WASM=1 \
  -s MODULARIZE=1 \
  -s EXPORT_ES6=1 \
  -s ENVIRONMENT=web \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORTED_RUNTIME_METHODS='["cwrap","ccall","HEAPF32","HEAP32"]' \
  -s EXPORTED_FUNCTIONS='["_eu_seed","_eu_rand_range","_eu_value_noise","_eu_fbm","_eu_buffer","_eu_stride","_eu_count","_eu_init","_eu_resize","_eu_update","_eu_aura_level","_eu_aura_glow","_eu_card_tilt","_eu_waveform","_eu_spotlight","_malloc","_free"]' \
  -o empire_core.js

cp empire_core.js   ../src/wasm/empire_core.js
cp empire_core.wasm ../src/wasm/empire_core.wasm
echo "[build] empire_core.wasm + glue copied to ../src/wasm"
