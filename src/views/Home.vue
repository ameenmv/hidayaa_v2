<template>
  <div class="home-page min-h-screen relative overflow-hidden flex flex-col">
    <!-- Background Decor -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[rgb(var(--color-primary-500))] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[rgb(var(--color-accent-500))] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-[rgb(var(--color-secondary-500))] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Header/Nav -->
    <header class="py-6 px-4 md:px-8 flex justify-between items-center z-10 w-full max-w-7xl mx-auto">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
          <span class="text-xl font-bold">هـ</span>
        </div>
        <span class="text-2xl font-bold tracking-tight text-[rgb(var(--color-text-primary))]">هداية</span>
      </div>
      <BaseButton variant="ghost" @click="toggleTheme" class="!rounded-full !w-10 !h-10 !p-0 flex items-center justify-center">
        {{ isDark ? '🌙' : '☀️' }}
      </BaseButton>
    </header>

    <!-- Hero Section -->
    <section class="hero flex-1 flex flex-col justify-center items-center py-20 px-4 text-center relative z-10">
      <div class="container-fluid max-w-5xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-primary-500))]/10 text-[rgb(var(--color-primary-600))] dark:text-[rgb(var(--color-primary-400))] mb-8 animate-fade-in border border-[rgb(var(--color-primary-500))]/20">
          <span class="flex h-2 w-2 rounded-full bg-[rgb(var(--color-primary-500))]"></span>
          <span class="text-sm font-medium">الإصدار الثاني متاح الآن</span>
        </div>

        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-tight animate-slide-up">
          <span class="block text-[rgb(var(--color-text-primary))]">اكتشف روعة</span>
          <span class="bg-gradient-to-r from-[rgb(var(--color-primary-500))] via-[rgb(var(--color-accent-500))] to-[rgb(var(--color-primary-500))] bg-clip-text text-transparent bg-300% animate-gradient">
            القرآن الكريم
          </span>
        </h1>
        
        <p class="text-xl md:text-2xl text-[rgb(var(--color-text-secondary))] mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
          منصة إسلامية شاملة تجمع بين التلاوات الخاشعة، القراءة التفاعلية، والمشاهدة السينمائية في مكان واحد.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
          <BaseButton variant="primary" size="lg" class="w-full sm:w-auto min-w-[160px] shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40" @click="navigateTo('/quran')">
            ابدأ القراءة
          </BaseButton>
          <BaseButton variant="outline" size="lg" class="w-full sm:w-auto min-w-[160px] backdrop-blur-sm" @click="navigateTo('/audio')">
            <span class="ml-2">▶</span>
            استمع الآن
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features py-24 px-4 relative z-10">
      <div class="container-fluid max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-primary))] mb-4">
            تجربة روحانية متكاملة
          </h2>
          <p class="text-[rgb(var(--color-text-secondary))] text-lg max-w-2xl mx-auto">
            صُممت هداية لتقدم لك تجربة مستخدم سلسة وعصرية مع الحفاظ على قدسية المحتوى
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BaseCard
            v-for="(feature, index) in features"
            :key="feature.id"
            variant="glass"
            hoverable
            class="text-center h-full border border-white/10 dark:border-white/5"
            v-scroll-reveal="{ delay: index * 100 }"
          >
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgb(var(--color-primary-500))]/10 to-[rgb(var(--color-accent-500))]/10 flex items-center justify-center mx-auto mb-6 text-3xl">
              {{ feature.icon }}
            </div>
            <h3 class="text-xl font-bold mb-3 text-[rgb(var(--color-text-primary))]">
              {{ feature.title }}
            </h3>
            <p class="text-[rgb(var(--color-text-secondary))] leading-relaxed">
              {{ feature.description }}
            </p>
          </BaseCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import BaseButton from '@components/base/BaseButton.vue'
import BaseCard from '@components/base/BaseCard.vue'
import { useThemeStore } from '@stores/theme'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const themeStore = useThemeStore()

const isDark = computed(() => themeStore.isDark)

const features = [
  {
    id: 1,
    icon: '📖',
    title: 'المصحف الذكي',
    description: 'نص عثماني فائق الدقة مع تفاعل لحظي وتفسير ميسر بضغطة زر'
  },
  {
    id: 2,
    icon: '🎧',
    title: 'الصوتيات',
    description: 'مكتبة صوتية ضخمة لأشهر القراء مع تحكم كامل وجودة عالية'
  },
  {
    id: 3,
    icon: '🎬',
    title: 'مرئيات',
    description: 'تلاوات مرئية خاشعة بجودة 4K وتصوير سينمائي مبهر'
  }
]

const navigateTo = (path) => {
  router.push(path)
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped>
.bg-300\% {
  background-size: 300% auto;
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-gradient {
  animation: gradient 8s linear infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
