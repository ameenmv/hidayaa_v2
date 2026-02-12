import api from '@/plugins/api'
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
        const response = await api.quran.getSurahs()
        if (response.data && response.data.suwar) {
          this.surahs = response.data.suwar.map(surah => ({
            id: surah.id,
            number: surah.id,
            name: surah.name.trim(),
            type: surah.makkia === 1 ? 'مكية' : 'مدنية',
            ayahs: surah.verses_count || '?'
          }))
        }
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
