import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    
    // Auto-import Vue APIs
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          axios: [
            ['default', 'axios']
          ]
        }
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
        'src/utils'
      ],
      vueTemplate: true
    }),

    // Auto-import Components
    Components({
      resolvers: [
        PrimeVueResolver()
      ],
      dts: 'src/components.d.ts',
      dirs: [
        'src/components'
      ],
      extensions: ['vue'],
      deep: true
    })
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url))
    }
  },

  server: {
    port: 5173,
    open: true
  },

  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'primevue': ['primevue']
        }
      }
    }
  }
})
