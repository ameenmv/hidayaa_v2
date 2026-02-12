import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import global styles
import './styles/main.css'

// Import plugins
import plugins from './plugins'

const app = createApp(App)

// Pinia Store
app.use(createPinia())

// Vue Router
app.use(router)

// PrimeVue with Aura theme
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  },
  ripple: true
})

// Custom Plugins
app.use(plugins)

app.mount('#app')
