import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: 'inline',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'solid-play'
    },
    rollupOptions: {
      external: ['solid-js']
    }
  }
})
