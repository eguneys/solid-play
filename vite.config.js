import { resolve } from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solidPlugin({ hot: false }),
  ],
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
