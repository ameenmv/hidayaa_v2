<template>
  <nav class="z-50 w-full transition-all duration-300" :class="[
    isScrolled
      ? 'fixed top-0 left-0 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl shadow-lg border-b border-gray-100 dark:border-white/5 py-3 animate-slide-down'
      : 'absolute top-0 left-0 bg-transparent py-6'
  ]">
    <div class="container-fluid max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
      <div class="flex items-center justify-between">

        <!-- Logo (Right) -->
        <div class="flex-shrink-0 flex items-center gap-4 cursor-pointer group" @click="router.push('/')">
          <div class="relative w-14 h-14 flex items-center justify-center">
            <div
              class="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-yellow-500 rounded-2xl rotate-3 shadow-lg group-hover:rotate-6 transition-transform duration-300">
            </div>
            <div
              class="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-sm">
              <span
                class="text-3xl font-bold font-arabic text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-emerald-800 dark:from-emerald-400 dark:to-emerald-600 pb-2">هـ</span>
            </div>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-3xl font-bold tracking-tight font-arabic transition-colors duration-300"
              :class="[isScrolled ? 'text-gray-900 dark:text-white' : 'text-white']">هداية</h1>
            <p class="text-[10px] tracking-[0.3em] uppercase opacity-80 font-medium"
              :class="[isScrolled ? 'text-emerald-800 dark:text-emerald-400' : 'text-emerald-100']">The Guidance</p>
          </div>
        </div>

        <!-- Desktop Navigation (Center) -->
        <div
          class="hidden md:flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 min-w-[500px] justify-center"
          :class="[isScrolled ? 'bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200/50 dark:border-white/5' : 'bg-transparent border border-transparent shadow-none']">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path"
            class="nav-item flex items-center gap-3 px-6 py-3 rounded-full text-base font-bold font-arabic transition-all duration-300 relative group overflow-hidden"
            active-class="!text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400/20" :class="[
              route.path === item.path
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                : isScrolled
                  ? 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-emerald-600'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
            ]">
            <span class="text-xl relative z-10 transition-transform group-hover:scale-110 duration-200">{{ item.icon
              }}</span>
            <span class="relative z-10">{{ item.name }}</span>
          </router-link>
        </div>

        <!-- Actions (Left) -->
        <div class="flex items-center gap-4">
          <!-- Prayer Time Mini (Expanded) -->
          <div class="hidden xl:flex items-center gap-3 mr-4 border-l border-white/20 pl-6 py-1"
            :class="[isScrolled ? 'border-gray-200 dark:border-gray-700' : '']">
            <div class="text-right">
              <span class="block text-[10px] uppercase tracking-wider font-bold mb-0.5 opacity-80"
                :class="[isScrolled ? 'text-gray-500 dark:text-gray-400' : 'text-emerald-200']">الصلاة القادمة</span>
              <span class="block text-sm font-bold font-arabic"
                :class="[isScrolled ? 'text-emerald-700 dark:text-emerald-400' : 'text-white']">العصر ٣:٤٥ م</span>
            </div>
            <div class="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
              :class="[isScrolled ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-white/10 border-white/20 text-white']">
              🌙
            </div>
          </div>

          <BaseButton variant="ghost" @click="toggleTheme"
            class="!rounded-full !w-12 !h-12 !p-0 flex items-center justify-center transition-colors duration-300 border border-transparent hover:border-white/20"
            :class="[isScrolled ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10']">
            {{ isDark ? '🌙' : '☀️' }}
          </BaseButton>

          <!-- Mobile Menu Button -->
          <BaseButton variant="ghost" class="md:hidden !rounded-full !w-12 !h-12 !p-0 flex items-center justify-center"
            :class="[isScrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white']"
            @click="isMobileMenuOpen = !isMobileMenuOpen">
            <span class="text-2xl">☰</span>
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMobileMenuOpen"
      class="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-xl border-t border-gray-100 dark:border-gray-800 animate-slide-up">
      <div class="px-4 pt-2 pb-6 space-y-1">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors"
          active-class="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
          :class="[route.path !== item.path ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800' : '']"
          @click="isMobileMenuOpen = false">
          <span class="text-xl">{{ item.icon }}</span>
          <span>{{ item.name }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import BaseButton from '@components/base/BaseButton.vue'
import { useThemeStore } from '@stores/theme'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const isDark = computed(() => themeStore.isDark)

const navItems = [
  { name: 'الرئيسية', path: '/', icon: '🏠' },
  { name: 'القرآن', path: '/quran', icon: '📖' },
  { name: 'القراء', path: '/audio', icon: '🎙️' },
  { name: 'بث مباشر', path: '/live', icon: '📺' },
  { name: 'الإذاعة', path: '/radio', icon: '📻' },
  { name: 'مواقيت الصلاة', path: '/prayers', icon: '🕌' },
  { name: 'الأذكار', path: '/azkar', icon: '📿' }
]

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const handleScroll = () => {
  // Update threshold to 100px so user feels the "scroll away" effect before reveal
  isScrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.font-arabic {
  font-family: var(--font-arabic);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-down {
  animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
