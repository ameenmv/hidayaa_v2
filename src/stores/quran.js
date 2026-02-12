import { defineStore } from 'pinia'

export const useQuranStore = defineStore('quran', {
  state: () => ({
    surahs: [],
    currentSurah: null,
    currentAyah: null,
    reciter: null,
    isLoading: false,
    error: null
  }),

  getters: {
    totalSurahs: (state) => state.surahs.length,
    
    getSurahById: (state) => (id) => {
      return state.surahs.find(surah => surah.id === id)
    }
  },

  actions: {
    async fetchSurahs() {
      this.isLoading = true
      this.error = null
      
      try {
        // TODO: Replace with actual API call
        // const response = await axios.get('https://api.quran.com/api/v4/chapters')
        // this.surahs = response.data.chapters
        
        // Placeholder data
        this.surahs = []
      } catch (error) {
        this.error = error.message
        console.error('Error fetching surahs:', error)
      } finally {
        this.isLoading = false
      }
    },

    setCurrentSurah(surah) {
      this.currentSurah = surah
    },

    setCurrentAyah(ayah) {
      this.currentAyah = ayah
    },

    setReciter(reciter) {
      this.reciter = reciter
      localStorage.setItem('selectedReciter', JSON.stringify(reciter))
    }
  }
})
