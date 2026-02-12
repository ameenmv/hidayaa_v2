<template>
  <div class="space-y-24 pb-20 overflow-x-hidden">
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center pt-20">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#0f5132] to-[#198754] -z-20"></div>
      <div class="absolute inset-0 opacity-10 pattern-islamic -z-10"></div>

      <!-- Content Container -->
      <div
        class="container-fluid max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content (Right) -->
        <div class="text-right order-2 lg:order-1 space-y-8">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-100 text-sm font-medium animate-fade-in">
            <span class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            الإصدار الثاني - تجربة روحانية متكاملة
          </div>

          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.6] text-white font-arabic drop-shadow-lg">
            <span class="block animate-slide-right opacity-0"
              style="animation-delay: 200ms; animation-fill-mode: forwards;">يَا أَيُّهَا النَّاسُ</span>
            <span class="block animate-slide-right opacity-0"
              style="animation-delay: 400ms; animation-fill-mode: forwards;">قَدْ جَاءَتْكُم مَّوْعِظَةٌ</span>
            <span
              class="block text-transparent bg-clip-text bg-gradient-to-l from-yellow-200 via-yellow-400 to-yellow-200 animate-slide-right opacity-0"
              style="animation-delay: 600ms; animation-fill-mode: forwards;">مِّن رَّبِّكُمْ وَشِفَاءٌ</span>
            <span class="block animate-slide-right opacity-0"
              style="animation-delay: 800ms; animation-fill-mode: forwards;">لِّمَا فِي الصُّدُورِ</span>
          </h1>

          <p class="text-lg md:text-xl text-emerald-100/90 leading-relaxed font-arabic font-light max-w-2xl ml-auto animate-fade-in opacity-0"
            style="animation-delay: 1000ms; animation-fill-mode: forwards;">
            تطبيق إسلامي شامل يتيح لك قراءة وسماع القرآن الكريم بصوت أشهر قراء العالم الإسلامي وبمختلف الروايات، معرفة
            مواقيت الصلاة، الأذكار، وقريباً السيرة النبوية، الأحكام الفقهية، قصص الأنبياء، حياة الصحابة وغيرها الكثير.
          </p>

          <div class="flex flex-wrap gap-4 justify-end pt-4 animate-fade-in opacity-0"
            style="animation-delay: 1200ms; animation-fill-mode: forwards;">
            <BaseButton variant="primary" size="lg" icon="📖">
              ابدأ التلاوة
            </BaseButton>
            <BaseButton variant="outline" size="lg" icon="🕌">
              مواقيت الصلاة
            </BaseButton>
          </div>
        </div>

        <!-- Hero Images (Left) -->
        <div class="relative h-[500px] hidden lg:block order-1 lg:order-2 animate-float">
          <!-- Decorative Blob -->
          <div class="absolute inset-0 bg-emerald-400/20 blur-[100px] rounded-full"></div>

          <!-- Collage Container -->
          <div class="relative w-full h-full">
            <!-- Image 1: Main Center -->
            <div
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 z-20 transition-transform duration-500 hover:scale-105 hover:z-30">
              <div class="h-full w-full rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl relative">
                <img src="https://i.pinimg.com/736x/8b/4f/2d/8b4f2d0434b971488da152cf23348873.jpg"
                  alt="محمود خليل الحصري" class="object-cover w-full h-full" />
                <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
                  <span class="text-white font-arabic text-sm">الشيخ الحصري</span>
                </div>
              </div>
            </div>

            <!-- Image 2: Right Back -->
            <div
              class="absolute top-10 right-10 w-48 h-60 z-10 transform rotate-6 transition-transform duration-500 hover:rotate-0 hover:z-30 hover:scale-110">
              <div
                class="h-full w-full rounded-2xl overflow-hidden border-4 border-white/10 shadow-xl relative opacity-90 hover:opacity-100">
                <img src="https://i1.sndcdn.com/artworks-000373033104-5q6q3g-t500x500.jpg" alt="محمد صديق المنشاوي"
                  class="object-cover w-full h-full" />
                <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
                  <span class="text-white font-arabic text-sm">الشيخ المنشاوي</span>
                </div>
              </div>
            </div>

            <!-- Image 3: Left Back -->
            <div
              class="absolute bottom-10 left-10 w-52 h-64 z-10 transform -rotate-6 transition-transform duration-500 hover:rotate-0 hover:z-30 hover:scale-110">
              <div
                class="h-full w-full rounded-2xl overflow-hidden border-4 border-white/10 shadow-xl relative opacity-90 hover:opacity-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Mohamed_Mahmoud_Tablawi.jpg"
                  alt="محمد الطبلاوي" class="object-cover w-full h-full" />
                <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
                  <span class="text-white font-arabic text-sm">الشيخ الطبلاوي</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave Separator -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg class="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="fill-[rgb(var(--color-bg-primary))]"></path>
        </svg>
      </div>
    </section>

    <div class="container-fluid max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 space-y-24">

      <!-- Reciters Section -->
      <section>
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-3xl font-bold font-arabic text-emerald-900 dark:text-emerald-50 relative">
            <span class="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-8 bg-emerald-500 rounded-l-full"></span>
            القُرَّاء
          </h2>
          <button
            class="text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2">
            المزيد من القراء
            <span>←</span>
          </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div v-for="reciter in reciters" :key="reciter.id" class="group cursor-pointer">
            <div
              class="relative overflow-hidden rounded-2xl aspect-[3/4] mb-3 shadow-md hover:shadow-xl transition-all duration-300">
              <!-- Placeholder or generic image since API doesn't provide images -->
              <div
                class="w-full h-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-4xl">
                👤
              </div>
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity">
              </div>
              <div class="absolute bottom-0 inset-x-0 p-3 text-center">
                <h3 class="text-white font-arabic font-bold text-lg leading-snug">{{ reciter.name }}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Surahs Section -->
      <section
        class="bg-emerald-50/50 dark:bg-emerald-900/10 -mx-6 sm:-mx-8 lg:-mx-12 px-6 sm:px-8 lg:px-12 py-16 rounded-3xl">
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-3xl font-bold font-arabic text-emerald-900 dark:text-emerald-50 relative">
            <span class="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-8 bg-emerald-500 rounded-l-full"></span>
            السُّوَر
          </h2>
          <button
            class="text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2">
            المزيد من السور
            <span>←</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="surah in surahs" :key="surah.number"
            class="bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800">
            <div
              class="w-14 h-14 relative flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xl">
              <!-- Geometric Star SVG -->
              <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full fill-current opacity-10">
                <path d="M50 0L61 35H98L68 57L79 91L50 70L21 91L32 57L2 35H39L50 0Z" />
              </svg>
              <span class="relative">{{ surah.number }}</span>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-xl font-arabic text-gray-800 dark:text-gray-100">{{ surah.name }}</h3>
              <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>{{ surah.type }}</span>
                <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>{{ surah.ayahs }} آيات</span>
              </div>
            </div>
            <button
              class="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-emerald-500 transition-colors">
              ▶
            </button>
          </div>
        </div>
      </section>

      <!-- Prayer Times Section -->
      <section>
        <div
          class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-white/5">
          <div class="p-8 border-b border-gray-100 dark:border-gray-700">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-3xl font-bold font-arabic text-emerald-900 dark:text-emerald-50">مواقيت الصلاة</h2>
              <div class="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
                <span class="flex items-center gap-2">
                  📅 {{ currentDate.hijri }}
                </span>
                <span class="w-px h-4 bg-gray-300"></span>
                <span class="flex items-center gap-2">
                  🗓️ {{ currentDate.gregorian }}
                </span>
              </div>
            </div>

            <div class="flex flex-col md:flex-row items-end gap-6">
              <div class="flex-1 w-full space-y-2">
                <label class="block text-sm font-medium text-gray-600 dark:text-gray-300">اختر البلد</label>
                <select
                  class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all">
                  <option>مصر</option>
                </select>
              </div>
              <div class="flex-1 w-full space-y-2">
                <label class="block text-sm font-medium text-gray-600 dark:text-gray-300">اختر المدينة</label>
                <select
                  class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all">
                  <option>الفيوم</option>
                </select>
              </div>
              <button
                class="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
                عرض المواقيت
              </button>
            </div>
          </div>

          <div class="p-8 bg-gray-50 dark:bg-gray-900/50">
            <div class="flex flex-col lg:flex-row gap-8 items-center">
              <!-- Count Down -->
              <div
                class="w-full lg:w-1/3 bg-emerald-600 text-white rounded-2xl p-6 text-center relative overflow-hidden">
                <div class="absolute inset-0 opacity-10 pattern-islamic"></div>
                <div class="relative z-10">
                  <p class="text-emerald-100 font-medium mb-2">الصلاة القادمة: الفجر</p>
                  <h3 class="text-4xl font-bold mb-4 font-arabic">05:12 ص</h3>
                  <div class="inline-block bg-black/20 rounded-lg px-4 py-2 backdrop-blur-sm text-sm">
                    الوقت المتبقي: 5 ساعات - 30 دقيقة
                  </div>
                </div>
              </div>

              <!-- Times Grid -->
              <div class="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div v-for="prayer in prayerTimes" :key="prayer.name"
                  class="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center gap-2"
                  :class="{ 'ring-2 ring-emerald-500 dark:ring-emerald-400': prayer.active }">
                  <span class="text-2xl mb-1">{{ prayer.icon }}</span>
                  <span class="block text-gray-500 dark:text-gray-400 text-xs font-medium">{{ prayer.name }}</span>
                  <span class="block text-lg font-bold font-arabic text-emerald-900 dark:text-white">{{ prayer.time
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Azkar & Radio Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Azkar -->
        <section>
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-bold font-arabic text-emerald-900 dark:text-emerald-50 relative">
              <span class="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-8 bg-emerald-500 rounded-l-full"></span>
              الأذكار
            </h2>
            <button class="text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors">المزيد</button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="zekr in azkar" :key="zekr.title"
              class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <div class="flex items-start justify-between mb-4">
                <h3
                  class="text-lg font-bold font-arabic text-gray-800 dark:text-gray-100 group-hover:text-emerald-600 transition-colors">
                  {{ zekr.title }}</h3>
                <span
                  class="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center text-xs font-bold">{{
                    zekr.count }}</span>
              </div>
              <p class="text-sm text-gray-400">اقرأ الأذكار</p>
            </div>
          </div>
        </section>

        <!-- Radio -->
        <section>
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-bold font-arabic text-emerald-900 dark:text-emerald-50 relative">
              <span class="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-8 bg-emerald-500 rounded-l-full"></span>
              المحطات الإذاعية
            </h2>
            <button class="text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors">المزيد</button>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div v-for="station in radioStations" :key="station.name"
              class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center gap-3">
              <div
                class="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center text-xl">
                📻
              </div>
              <h3 class="font-bold font-arabic text-sm text-gray-700 dark:text-gray-200">{{ station.name }}</h3>
            </div>
          </div>
        </section>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useAudioStore } from '@stores/audio'
import { useQuranStore } from '@stores/quran'
import { computed, onMounted, ref } from 'vue'

const quranStore = useQuranStore()
const audioStore = useAudioStore()

const reciters = computed(() => audioStore.reciters.slice(0, 5))
const surahs = computed(() => quranStore.surahs.slice(0, 6))

onMounted(() => {
  quranStore.fetchSurahs()
  audioStore.fetchReciters()
})

const currentDate = ref({
  hijri: '22 شَعْبان 1447',
  gregorian: '10 فبراير 2026'
})

const prayerTimes = ref([
  { name: 'الفجر', time: '5:12 ص', icon: '🌅', active: true },
  { name: 'الشروق', time: '6:39 ص', icon: '☀️', active: false },
  { name: 'الظهر', time: '12:10 م', icon: '🕛', active: false },
  { name: 'العصر', time: '3:18 م', icon: '🌤️', active: false },
  { name: 'المغرب', time: '5:42 م', icon: '🌇', active: false },
  { name: 'العشاء', time: '7:00 م', icon: '🌙', active: false },
])

const azkar = ref([
  { title: 'أذكار الصباح', count: 31 },
  { title: 'أذكار المساء', count: 30 },
  { title: 'أذكار الاستيقاظ', count: 4 },
  { title: 'دعاء لبس الثوب', count: 1 },
])

const radioStations = ref([
  { name: 'إذاعة إبراهيم الأخضر' },
  { name: 'إذاعة أبو بكر الشاطري' },
  { name: 'إذاعة أحمد العجمي' },
  { name: 'إذاعة أحمد الحواشي' },
])
</script>

<style scoped>
.font-arabic {
  font-family: var(--font-arabic);
}

.pattern-islamic {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-slide-right {
  animation: slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideRight {
  from {
    transform: translateX(50px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
