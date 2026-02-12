<template>
  <div id="app" class="min-h-screen">
    <RouterView />
  </div>
</template>

<script setup>
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
