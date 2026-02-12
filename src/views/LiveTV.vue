<template>
   <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <!-- Hero Section -->
      <div class="relative bg-emerald-900 text-white py-20 overflow-hidden">
         <div class="absolute inset-0 pattern-islamic opacity-10"></div>
         <div
            class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 opacity-90">
         </div>

         <div class="container-fluid max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
            <h1 class="text-4xl md:text-6xl font-bold font-arabic mb-4 animate-fade-in">البث المباشر</h1>
            <p class="text-emerald-100 text-lg md:text-xl font-arabic font-light max-w-2xl mx-auto animate-fade-in"
               style="animation-delay: 200ms;">
               تابع البث المباشر من الحرمين الشريفين على مدار الساعة
            </p>
         </div>
      </div>

      <div class="container-fluid max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 -mt-10 relative z-20">

         <!-- Loading State -->
         <div v-if="mediaStore.isLoadingLiveChannels" class="flex justify-center py-20">
            <div class="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
         </div>

         <!-- Error State -->
         <div v-else-if="mediaStore.error"
            class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-xl text-center font-arabic">
            {{ mediaStore.error }}
            <button @click="mediaStore.fetchLiveChannels()" class="mr-2 underline font-bold">حاول مرة أخرى</button>
         </div>

         <!-- Content -->
         <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <!-- Video Player (Main Content, Span 2 cols) -->
            <div class="lg:col-span-2 space-y-6">
               <div
                  class="bg-black rounded-2xl overflow-hidden shadow-2xl relative aspect-video border-4 border-emerald-500/30">

                  <!-- YouTube Iframe -->
                  <iframe
                     v-if="currentChannel && (currentChannel.url.includes('youtube.com') || currentChannel.url.includes('youtu.be'))"
                     :src="currentChannel.url" class="w-full h-full" frameborder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowfullscreen></iframe>

                  <!-- HLS Video Player -->
                  <video v-else ref="videoPlayer" controls class="w-full h-full object-cover"
                     :poster="posterImage"></video>

                  <!-- Channel Info Overlay -->
                  <div
                     class="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-white font-arabic flex items-center gap-2 pointer-events-none">
                     <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                     <span>مباشر | {{ currentChannel ? currentChannel.name : 'جاري التحميل...' }}</span>
                  </div>
               </div>

               <div
                  class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <h2 class="text-2xl font-bold font-arabic mb-2 dark:text-white">
                     {{ currentChannel ? currentChannel.name : '' }}
                  </h2>
                  <p class="text-gray-500 dark:text-gray-400 font-arabic">بث حي مباشر عالي الجودة</p>
               </div>
            </div>

            <!-- Channel List (Sidebar, Span 1 col) -->
            <div class="lg:col-span-1 space-y-4">
               <h3 class="text-xl font-bold font-arabic mb-4 dark:text-white px-2">القنوات المتاحة</h3>

               <div v-for="channel in mediaStore.liveChannels" :key="channel.id" @click="playChannel(channel)"
                  class="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all flex items-center gap-4"
                  :class="{ 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20': currentChannel?.id === channel.id }">
                  <!-- Thumbnail Placeholder -->
                  <div class="w-24 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative shrink-0">
                     <img
                        v-if="channel.id === 'makkah' || channel.name.includes('Makkah') || channel.name.includes('Quran')"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Kaaba_2024.jpg/800px-Kaaba_2024.jpg"
                        class="w-full h-full object-cover" />
                     <img
                        v-else-if="channel.id === 'madinah' || channel.name.includes('Madinah') || channel.name.includes('Sunna')"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Al-Masjid_an-Nabawi_-_Madinah%2C_Saudi_Arabia.jpg/800px-Al-Masjid_an-Nabawi_-_Madinah%2C_Saudi_Arabia.jpg"
                        class="w-full h-full object-cover" />
                     <div v-else
                        class="w-full h-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-2xl">
                        📺</div>

                     <div
                        class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span class="text-white text-lg">▶</span>
                     </div>
                  </div>

                  <div>
                     <h4 class="font-bold font-arabic dark:text-white group-hover:text-emerald-600 transition-colors">{{
                        channel.name }}</h4>
                     <span
                        class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md mt-1 inline-block">LIVE</span>
                  </div>
               </div>
            </div>

         </div>
      </div>
   </div>
</template>

<script setup>
import { useMediaStore } from '@stores/media'
import Hls from 'hls.js'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const mediaStore = useMediaStore()
const videoPlayer = ref(null)
const currentChannel = ref(null)
let hls = null

const posterImage = computed(() => {
   if (!currentChannel.value) return ''
   if (currentChannel.value.name.includes('Makkah') || currentChannel.value.name.includes('Quran')) return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Kaaba_2024.jpg/800px-Kaaba_2024.jpg'
   if (currentChannel.value.name.includes('Madinah') || currentChannel.value.name.includes('Sunna')) return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Al-Masjid_an-Nabawi_-_Madinah%2C_Saudi_Arabia.jpg/800px-Al-Masjid_an-Nabawi_-_Madinah%2C_Saudi_Arabia.jpg'
   return ''
})

onMounted(async () => {
   await mediaStore.fetchLiveChannels()
   if (mediaStore.liveChannels.length > 0) {
      playChannel(mediaStore.liveChannels[0])
   }
})

onUnmounted(() => {
   if (hls) {
      hls.destroy()
   }
})

function playChannel(channel) {
   currentChannel.value = channel
   const video = videoPlayer.value

   // Clean up previous HLS instance
   if (hls) {
      hls.destroy()
      hls = null
   }

   if (channel.url.includes('youtube.com') || channel.url.includes('youtu.be')) {
      // It's a YouTube embed
      // No HLS setup needed
      // Reset video element just in case
      video.pause()
      video.src = ''
      video.load()
   } else if (Hls.isSupported()) {
      hls = new Hls()
      hls.loadSource(channel.url)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
         video.play().catch(e => console.log('Autoplay blocked', e))
      })
   } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari
      video.src = channel.url
      video.addEventListener('loadedmetadata', () => {
         video.play().catch(e => console.log('Autoplay blocked', e))
      })
   }
}
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
