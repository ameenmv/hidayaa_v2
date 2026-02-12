<template>
  <div class="min-h-screen pb-20">
    <!-- Hero Section -->
    <div class="relative bg-emerald-900 text-white py-20 overflow-hidden">
      <div class="absolute inset-0 pattern-islamic opacity-10"></div>
      <div
        class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 opacity-90">
      </div>

      <div class="container-fluid max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
        <h1 class="text-4xl md:text-6xl font-bold font-arabic mb-4 animate-fade-in">القرآن الكريم</h1>
        <p class="text-emerald-100 text-lg md:text-xl font-arabic font-light max-w-2xl mx-auto animate-fade-in"
          style="animation-delay: 200ms;">
          تصفح سور القرآن الكريم بسهولة ويسر، مع إمكانية البحث ومعرفة التفاصيل
        </p>

        <!-- Search & Filter -->
        <div class="mt-8 max-w-3xl mx-auto flex flex-col md:flex-row gap-4 animate-fade-in"
          style="animation-delay: 400ms;">
          <div class="relative flex-1">
            <input v-model="searchQuery" type="text" placeholder="ابحث عن اسم السورة..."
              class="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all pr-12" />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-200 text-xl">🔍</span>
          </div>
          <div class="flex gap-2">
            <button @click="filterType = 'all'"
              class="px-6 py-3 rounded-xl border border-white/20 transition-all font-bold font-arabic"
              :class="[filterType === 'all' ? 'bg-white text-emerald-900' : 'bg-white/5 text-white hover:bg-white/10']">
              الكل
            </button>
            <button @click="filterType = 'makkia'"
              class="px-6 py-3 rounded-xl border border-white/20 transition-all font-bold font-arabic"
              :class="[filterType === 'makkia' ? 'bg-white text-emerald-900' : 'bg-white/5 text-white hover:bg-white/10']">
              مكية
            </button>
            <button @click="filterType = 'madaniya'"
              class="px-6 py-3 rounded-xl border border-white/20 transition-all font-bold font-arabic"
              :class="[filterType === 'madaniya' ? 'bg-white text-emerald-900' : 'bg-white/5 text-white hover:bg-white/10']">
              مدنية
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Surahs Grid -->
    <div class="container-fluid max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
      <!-- Loading State -->
      <div v-if="quranStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="n in 12" :key="n" class="bg-white dark:bg-gray-800 rounded-2xl p-6 h-32 animate-pulse"></div>
      </div>

      <!-- Content -->
      <div v-else>
        <div v-if="filteredSurahs.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="surah in filteredSurahs" :key="surah.id"
            class="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden">
            <!-- Decorative Background Number -->
            <div
              class="absolute -left-4 -bottom-4 text-[8rem] font-bold text-gray-50 dark:text-gray-700/20 font-arabic opacity-50 select-none group-hover:scale-110 transition-transform duration-500">
              {{ surah.number }}
            </div>

            <div class="relative z-10 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <!-- Star Number -->
                <div
                  class="w-12 h-12 relative flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-lg group-hover:text-emerald-500 transition-colors">
                  <svg viewBox="0 0 100 100"
                    class="absolute inset-0 w-full h-full fill-current opacity-10 group-hover:opacity-20 transition-opacity">
                    <path d="M50 0L61 35H98L68 57L79 91L50 70L21 91L32 57L2 35H39L50 0Z" />
                  </svg>
                  <span class="relative font-arabic pt-1">{{ surah.number }}</span>
                </div>

                <div>
                  <h3
                    class="text-xl font-bold font-arabic text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {{ surah.name }}
                  </h3>
                  <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                    {{ surah.name_en }}
                  </span>
                </div>
              </div>
            </div>

            <div
              class="relative z-10 mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700/50 pt-4">
              <span class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full"
                  :class="surah.type === 'مكية' ? 'bg-orange-400' : 'bg-emerald-400'"></span>
                {{ surah.type }}
              </span>
              <span>{{ surah.ayahs }} آيات</span>
            </div>

            <!-- Hover Effect Line -->
            <div
              class="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-500">
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <p class="text-xl text-gray-500 font-arabic">لا توجد سور تطابق بحثك</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuranStore } from '@stores/quran'
import { computed, onMounted, ref } from 'vue'

const quranStore = useQuranStore()
const searchQuery = ref('')
const filterType = ref('all') // 'all', 'makkia', 'madaniya'

onMounted(() => {
  if (quranStore.surahs.length === 0) {
    quranStore.fetchSurahs()
  }
})

const filteredSurahs = computed(() => {
  return quranStore.surahs.filter(surah => {
    // Search Filter
    const matchesSearch = surah.name.includes(searchQuery.value) ||
      surah.id.toString().includes(searchQuery.value)

    // Type Filter
    const matchesType = filterType.value === 'all' ||
      (filterType.value === 'makkia' && surah.type === 'مكية') ||
      (filterType.value === 'madaniya' && surah.type === 'مدنية')

    return matchesSearch && matchesType
  })
})
</script>

<style scoped>
.font-arabic {
  font-family: var(--font-arabic);
}

.pattern-islamic {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
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
