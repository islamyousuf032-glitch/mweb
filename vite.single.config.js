import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Single-file build: everything (JS, CSS, WASM) inlined into one standalone.html
// so it opens directly in a browser / sandboxed preview with no network.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile({ removeViteModuleLoader: true })],
  build: {
    target: 'es2020',
    outDir: 'dist-single',
    assetsInlineLimit: 100_000_000, // inline everything, incl. the wasm
    cssCodeSplit: false,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
