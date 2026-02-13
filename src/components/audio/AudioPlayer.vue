<template>
   <div v-if="currentTrack"
      class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-lg z-50">
      <div class="container mx-auto flex flex-col md:flex-row items-center gap-4">
         <!-- Track Info -->
         <div class="flex-1 flex items-center gap-4 w-full md:w-auto">
            <div
               class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-600">
               <span class="text-xl">🎵</span>
            </div>
            <div>
               <h3 class="font-bold text-gray-800 dark:text-white font-arabic">{{ currentTrack.title }}</h3>
               <p class="text-sm text-gray-500 dark:text-gray-400 font-arabic">{{ currentTrack.reciterName }}</p>
            </div>
         </div>

         <!-- Controls -->
         <div class="flex flex-col items-center gap-2 flex-1 w-full md:w-auto">
            <div class="flex items-center gap-6">
               <button @click="store.previous()" :disabled="!store.hasPrevious"
                  class="text-gray-400 hover:text-emerald-600 disabled:opacity-50">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
               </button>

               <button @click="togglePlay"
                  class="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/30">
                  <svg v-if="isPlaying" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                  <svg v-else class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M8 5v14l11-7z" />
                  </svg>
               </button>

               <button @click="store.next()" :disabled="!store.hasNext"
                  class="text-gray-400 hover:text-emerald-600 disabled:opacity-50">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                  </svg>
               </button>
            </div>

            <!-- Progress Bar -->
            <div class="w-full flex items-center gap-3 text-xs text-gray-500 font-mono">
               <span>{{ formatTime(currentTime) }}</span>
               <input type="range" min="0" :max="duration" :value="currentTime" @input="seek"
                  class="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-emerald-600 [&::-webkit-slider-thumb]:rounded-full text-emerald-600">
               <span>{{ formatTime(duration) }}</span>
            </div>
         </div>

         <!-- Volume -->
         <div class="hidden md:flex items-center gap-2 flex-1 justify-end">
            <button @click="toggleMute" class="text-gray-400 hover:text-emerald-600">
               <svg v-if="volume === 0" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                     d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
               </svg>
               <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                     d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
               </svg>
            </button>
            <input type="range" min="0" max="1" step="0.1" :value="volume" @input="setVolume"
               class="w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-emerald-600 [&::-webkit-slider-thumb]:rounded-full">
         </div>
      </div>

      <audio ref="audioPlayer" :src="currentTrack.url" @timeupdate="updateTime" @loadedmetadata="updateDuration"
         @ended="onEnded"></audio>
   </div>
</template>

<script setup>
import { useAudioStore } from '@/stores/audio'
import { storeToRefs } from 'pinia'
import { nextTick, ref, watch } from 'vue'

const store = useAudioStore()
const { currentTrack, isPlaying, volume, currentTime, duration } = storeToRefs(store)
const audioPlayer = ref(null)

// Watch playback state (Play/Pause button toggle)
watch(isPlaying, (val) => {
   if (!audioPlayer.value) return
   if (val) audioPlayer.value.play().catch(e => console.error("Play error:", e))
   else audioPlayer.value.pause()
})

// Watch volume changes
watch(volume, (val) => {
   if (audioPlayer.value) audioPlayer.value.volume = val
})

// Watch track changes (e.g. clicking next/prev or new surah)
watch(currentTrack, async (newTrack) => {
   if (newTrack) {
      store.play() // Ensure state is 'playing'
      await nextTick() // Wait for DOM update of :src
      if (audioPlayer.value) {
         audioPlayer.value.play().catch(e => console.error("Autoplay error:", e))
      }
   }
})

const togglePlay = () => {
   store.togglePlay()
}

const seek = (e) => {
   const time = parseFloat(e.target.value)
   if (audioPlayer.value) {
      audioPlayer.value.currentTime = time
      store.setCurrentTime(time)
   }
}

const setVolume = (e) => {
   store.setVolume(parseFloat(e.target.value))
}

const toggleMute = () => {
   store.setVolume(volume.value === 0 ? 1 : 0)
}

const updateTime = (e) => {
   store.setCurrentTime(e.target.currentTime)
}

const updateDuration = (e) => {
   store.setDuration(e.target.duration)
}

const onEnded = () => {
   if (store.hasNext) {
      store.next()
   } else {
      store.pause()
   }
}

const formatTime = (seconds) => {
   if (!seconds || isNaN(seconds)) return '0:00'
   const mins = Math.floor(seconds / 60)
   const secs = Math.floor(seconds % 60)
   return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>
