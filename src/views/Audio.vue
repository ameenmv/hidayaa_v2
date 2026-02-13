<template>
  <div class="audio-page min-h-screen pb-32 pt-24 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="container mx-auto max-w-7xl">
      <!-- Header -->
      <div class="text-center mb-12 space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold font-arabic text-emerald-950 dark:text-emerald-50">
          القرآن الكريم صوتياً
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 font-arabic max-w-2xl mx-auto">
          استمع إلى تلاوات خاشعة بأصوات أشهر القراء في العالم الإسلامي بجودة عالية
        </p>
      </div>

      <!-- Reciters Grid (if no reciter selected) -->
      <div v-if="!selectedReciter" class="space-y-8 animate-fade-in">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 class="text-2xl font-bold font-arabic text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <span class="w-2 h-8 bg-emerald-500 rounded-full"></span>
            اختر القارئ
          </h2>
          <div class="relative w-full md:w-96">
            <input v-model="searchQuery" type="text" placeholder="ابحث عن قارئ..."
              class="w-full px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-arabic text-right pr-12">
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>

        <div v-if="audioStore.isLoadingReciters" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="reciter in filteredReciters" :key="reciter.id" @click="selectReciter(reciter)"
            class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 group">
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                👤
              </div>
              <div>
                <h3
                  class="font-bold text-lg font-arabic text-gray-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                  {{ reciter.nameAr }}
                </h3>
                <span v-if="reciter.style"
                  class="text-xs text-gray-500 dark:text-gray-400 font-arabic bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md mt-1 inline-block">
                  {{ reciter.style }}
                </span>
                <span v-else class="text-xs text-gray-500 dark:text-gray-400 font-arabic">
                  {{ reciter.nameAr }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Surah List (if reciter selected) -->
      <div v-else class="space-y-8 animate-fade-in">
        <!-- Back Button & Reciter Info -->
        <div
          class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-6 mb-8">
          <button @click="selectedReciter = null"
            class="absolute top-6 right-6 md:static text-gray-400 hover:text-emerald-600 transition-colors bg-gray-50 dark:bg-gray-700/50 p-2 rounded-full">
            <svg class="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <div
            class="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-4xl shadow-inner">
            👤
          </div>

          <div class="text-center md:text-right flex-1">
            <h2 class="text-3xl font-bold font-arabic text-gray-800 dark:text-white mb-2">
              {{ selectedReciter.nameAr }}
            </h2>
            <p v-if="selectedReciter.style" class="text-emerald-600 dark:text-emerald-400 font-medium font-arabic">
              {{ selectedReciter.style }}
            </p>
          </div>
        </div>

        <!-- Surahs Grid -->
        <div v-if="audioStore.isLoadingReciters" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
        </div>

        <div v-else
          class="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 gap-px bg-gray-100 dark:bg-gray-700">
            <div v-for="surah in combinedSurahs" :key="surah.number"
              class="bg-white dark:bg-gray-800 p-4 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex items-center justify-between group cursor-pointer"
              @click="playSurah(surah)">
              <div class="flex items-center gap-4">
                <div
                  class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center font-bold text-sm font-mono group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {{ surah.number }}
                </div>
                <div>
                  <h4
                    class="font-bold font-arabic text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {{ surah.name }}
                  </h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ surah.type }} • {{ surah.ayahs }} آية
                  </p>
                </div>
              </div>

              <button
                class="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white transition-all shadow-sm">
                <svg v-if="isCurrentSurah(surah) && audioStore.isPlaying" class="w-4 h-4" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                <svg v-else class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Persistent Player -->
    <AudioPlayer />
  </div>
</template>

<script setup>
import AudioPlayer from '@/components/audio/AudioPlayer.vue'
import { useAudioStore } from '@/stores/audio'
import { useQuranStore } from '@/stores/quran'
import { computed, onMounted, ref } from 'vue'

const audioStore = useAudioStore()
const quranStore = useQuranStore()

const selectedReciter = ref(null)
const recitationFiles = ref([])

const searchQuery = ref('')

onMounted(async () => {
  if (quranStore.surahs.length === 0) {
    await quranStore.fetchSurahs()
  }
  await audioStore.fetchReciters()
})

const filteredReciters = computed(() => {
  if (!searchQuery.value) return audioStore.reciters || []
  const query = searchQuery.value.toLowerCase()
  return (audioStore.reciters || []).filter(r =>
    (r.nameAr && r.nameAr.toLowerCase().includes(query))
  )
})

const selectReciter = async (reciter) => {
  selectedReciter.value = reciter
  try {
    recitationFiles.value = await audioStore.getRecitationFiles(reciter.id) || []
  } catch (err) {
    console.error('Failed to fetch recitations', err)
    recitationFiles.value = []
  }
}

const combinedSurahs = computed(() => {
  if (!quranStore.surahs.length || !recitationFiles.value.length) return []

  return quranStore.surahs.map(surah => {
    const file = recitationFiles.value.find(f => f.id === surah.id)
    return {
      ...surah,
      audioUrl: file ? file.url : null
    }
  }).filter(s => s.audioUrl) // Only show surahs with audio
})

const isCurrentSurah = (surah) => {
  return audioStore.currentTrack?.id === surah.id
}

const playSurah = (surah) => {
  // If clicking same surah
  if (isCurrentSurah(surah)) {
    audioStore.togglePlay()
    return
  }

  // Create playlist from current view
  const playlist = combinedSurahs.value.map(s => ({
    id: s.id,
    title: `سورة ${s.name}`,
    reciterName: selectedReciter.value.nameAr,
    url: s.audioUrl
  }))

  audioStore.setPlaylist(playlist)

  const track = playlist.find(t => t.id === surah.id)
  if (track) {
    audioStore.setCurrentTrack(track)
    audioStore.play()
  }
}
</script>

<style scoped>
.font-arabic {
  font-family: var(--font-arabic, sans-serif);
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
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
