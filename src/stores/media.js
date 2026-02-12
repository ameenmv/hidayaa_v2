import { defineStore } from 'pinia'

export const useMediaStore = defineStore('media', {
  state: () => ({
    liveChannels: [],
    isLoadingLiveChannels: false,
    error: null
  }),

  actions: {
    async fetchLiveChannels(params = { language: 'ar' }) {
      this.isLoadingLiveChannels = true
      this.error = null
      
      // Static curated list of reliable YouTube Live Channels
      const curatedChannels = [
        {
          id: 'makkah',
          name: 'قناة القرآن الكريم | Makkah Live',
          url: 'https://www.youtube.com/embed/live_stream?channel=UCos52azQNBgW63_9uDJoPDA'
        },
        {
          id: 'madinah',
          name: 'قناة السنة النبوية | Madinah Live',
          url: 'https://www.youtube.com/embed/live_stream?channel=UCROKYPep-UuODNwyipe6JMw'
        },
        // {
        //   id: 'resalah',
        //   name: 'قناة الرسالة | Al Resalah TV',
        //   url: 'https://www.youtube.com/embed/live_stream?channel=UCBVUg4nQTryjzB2mQRNTJIw'
        // },
        // {
        //   id: 'zad',
        //   name: 'قناة زاد | Zad TV',
        //   url: 'https://www.youtube.com/embed/live_stream?channel=UCOll3M-P7oKs5cSrQ9ytt6g'
        // }
      ]

      try {
        // Try API first, but we will mostly rely on our curated list for now 
        // as api returns unstable links. We can merge if needed.
        // For now, let's just use the curated list as it's much better.
        
        // Simulate API delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500))
        
        this.liveChannels = curatedChannels
        
      } catch (error) {
        console.error('Error fetching live channels:', error)
        // Fallback to currated list even if API fails (though we aren't calling it now)
        this.liveChannels = curatedChannels
      } finally {
        this.isLoadingLiveChannels = false
      }
    }
  }
})
