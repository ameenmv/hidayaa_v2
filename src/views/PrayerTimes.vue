<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert">
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">{{ error }}</span>
    </div>

    <div v-else class="space-y-8">
      <!-- Header -->
      <div class="text-center space-y-4 max-w-2xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold font-arabic text-gray-800 dark:text-white">مواقيت الصلاة</h1>
        <div class="text-gray-600 dark:text-gray-300 flex flex-col items-center gap-1 font-arabic">
          <span class="text-lg">{{ formattedDate }}</span>
          <span class="text-sm opacity-75">{{ hijriDate }}</span>
        </div>

        <!-- Location Selector Component -->
        <div
          class="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
          <LocationSelector />
        </div>
      </div>

      <!-- Prayer Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div v-for="prayer in visualPrayers" :key="prayer.key"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:translate-y-[-4px] transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ prayer.name }}</h3>
            <div class="p-2 bg-primary/10 rounded-lg">
              <span class="text-2xl" v-if="prayer.key === 'Fajr'">🌅</span>
              <span class="text-2xl" v-else-if="prayer.key === 'Sunrise'">☀️</span>
              <span class="text-2xl" v-else-if="prayer.key === 'Dhuhr'">🕛</span>
              <span class="text-2xl" v-else-if="prayer.key === 'Asr'">⛅</span>
              <span class="text-2xl" v-else-if="prayer.key === 'Maghrib'">🌇</span>
              <span class="text-2xl" v-else-if="prayer.key === 'Isha'">🌙</span>
            </div>
          </div>
          <div class="text-3xl font-bold text-primary text-center py-4">
            {{ formatTime(prayer.time) }}
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div
        class="max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 text-sm text-gray-600 dark:text-gray-400">
        <h4 class="font-semibold mb-3 text-center">Additional Times</h4>
        <div class="flex flex-wrap justify-center gap-6">
          <div v-for="(time, name) in additionalTimings" :key="name" class="flex items-center gap-2">
            <span class="font-medium">{{ name }}:</span>
            <span>{{ formatTime(time) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LocationSelector from '@/components/prayer/LocationSelector.vue'
import { usePrayerStore } from '@/stores/prayer'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

const store = usePrayerStore()
const { timings, date, meta, city, country, loading, error } = storeToRefs(store)

onMounted(() => {
  store.fetchPrayerTimes()
})

// Main prayers to display prominently
const mainPrayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

const prayerNamesAr = {
  Fajr: 'الفجر',
  Sunrise: 'الشروق',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Sunset: 'الغروب',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
  Imsak: 'الإمساك',
  Midnight: 'منتصف الليل',
  Firstthird: 'الثلث الأول',
  Lastthird: 'الثلث الأخير'
}

const visualPrayers = computed(() => {
  if (!timings.value) return {}
  return mainPrayers.map(key => ({
    name: prayerNamesAr[key] || key,
    time: timings.value[key],
    key: key
  })).filter(p => p.time)
})

const additionalTimings = computed(() => {
  if (!timings.value) return {}
  const prayers = {}
  Object.keys(timings.value).forEach(key => {
    if (!mainPrayers.includes(key)) {
      prayers[prayerNamesAr[key] || key] = timings.value[key]
    }
  })
  return prayers
})

const formattedDate = computed(() => {
  if (!date.value) return ''
  return date.value.readable // e.g. "13 Feb 2026"
})

const hijriDate = computed(() => {
  if (!date.value || !date.value.hijri) return ''
  const h = date.value.hijri
  return `${h.day} ${h.month.en} ${h.year} (${h.weekday.en})`
})

// Helper to ensure 12h format if needed, but API returns 24h usually
// Assuming simpler display for now.
const formatTime = (time) => {
  if (!time) return ''
  // The API returns "HH:mm" (24h). We can convert to 12h if desired.
  // For now, let's keep it as is or do simple conversion.
  // Let's do 12h format for better readability in Egypt/US.
  const [hours, minutes] = time.split(':')
  let h = parseInt(hours, 10)
  const ampm = h >= 12 ? 'م' : 'ص'
  h = h % 12
  h = h ? h : 12
  return `${h}:${minutes} ${ampm}`
}
</script>

<style scoped>
.font-arabic {
  font-family: var(--font-arabic);
}

.text-primary {
  color: #10b981;
  /* Example emerald color */
}

.bg-primary\/10 {
  background-color: rgba(16, 185, 129, 0.1);
}

.border-primary {
  border-color: #10b981;
}
</style>
