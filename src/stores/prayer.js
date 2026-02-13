import api from '@/plugins/api'
import { defineStore } from 'pinia'

export const usePrayerStore = defineStore('prayer', {
  state: () => ({
    timings: null,
    date: null,
    meta: null,
    city: 'Mansoura',
    country: 'Egypt',
    cityAr: 'المنصورة', // Arabic name for display
    countryAr: 'مصر',   // Arabic name for display
    method: 5, // Egyptian General Authority of Survey
    isLoading: false,
    error: null
  }),

  getters: {
    nextPrayer: (state) => {
      if (!state.timings) return null
      
      const now = new Date()
      const timeFormat = 'HH:mm'
      // Implementation logic to find next prayer
      // This might require a library like moment or dayjs if available, or custom logic
      // For now returning null or implementing simple check
      return null 
    }
  },

  actions: {
    async fetchPrayerTimes(date = null) {
      this.isLoading = true
      this.error = null
      
      try {
        let targetDate = date
        if (!targetDate) {
          const d = new Date()
          const day = String(d.getDate()).padStart(2, '0')
          const month = String(d.getMonth() + 1).padStart(2, '0')
          const year = d.getFullYear()
          targetDate = `${day}-${month}-${year}`
        }
        
        const params = {
          city: this.city,
          country: this.country,
          method: this.method
        }

        const response = await api.prayer.getTimingsByCity(targetDate, params)
        
        if (response.data) {
          this.timings = response.data.timings
          this.date = response.data.date
          this.meta = response.data.meta
        }
      } catch (error) {
        this.error = error.message
        console.error('Error fetching prayer times:', error)
      } finally {
        this.isLoading = false
      }
    },

    setLocation(city, country, cityAr, countryAr) {
      this.city = city
      this.country = country
      if (cityAr) this.cityAr = cityAr
      if (countryAr) this.countryAr = countryAr
      
      this.fetchPrayerTimes()
    },
    
    setMethod(methodId) {
      this.method = methodId
    }
  }
})
