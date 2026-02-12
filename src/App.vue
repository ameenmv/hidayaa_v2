<template>
  <div id="app" class="min-h-screen bg-[rgb(var(--color-bg-primary))] flex flex-col">
    <NavBar />
    <main class="flex-1 transition-all duration-300 pt-28" :class="[$route.name !== 'home' ? '' : '']">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Footer from '@components/layout/Footer.vue'
import NavBar from '@components/layout/NavBar.vue'
import { useThemeStore } from '@stores/theme'
import { onMounted } from 'vue'

const themeStore = useThemeStore()

onMounted(() => {
  // Initialize theme from localStorage
  themeStore.initTheme()
})
</script>

<style scoped>
#app {
  transition: background-color var(--transition-base), color var(--transition-base);
}
</style>
