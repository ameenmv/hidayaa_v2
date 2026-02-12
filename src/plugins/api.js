import axios from 'axios'

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.quran.com/api/v4',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data)
      
      if (error.response.status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('auth_token')
        // window.location.href = '/login'
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request)
    } else {
      // Something else happened
      console.error('Error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

// API methods
export default {
  // Quran API
  quran: {
    getSurahs(language = 'ar') {
      return axios.get('https://www.mp3quran.net/api/v3/suwar', {
        params: { language }
      })
    },
    
    getSurah(id) {
      // Keep existing or update later if needed
      return apiClient.get(`/chapters/${id}`)
    },
    
    getAyahs(surahId) {
      return apiClient.get(`/verses/by_chapter/${surahId}`)
    },
    
    getAyah(surahId, ayahNumber) {
      return apiClient.get(`/verses/by_key/${surahId}:${ayahNumber}`)
    }
  },

  // Audio API
  audio: {
    async getReciters(params = {}) {
      // params: { language, reciter, rewaya, sura }
      const url = new URL('https://www.mp3quran.net/api/v3/reciters')
      if (params.language && params.language !== 'ar') {
        url.searchParams.append('language', params.language)
      }
      
      const response = await fetch(url.toString())
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return { data: await response.json() }
    },

    async getRecentReads(params = {}) {
      const url = new URL('https://www.mp3quran.net/api/v3/recent_reads')
      if (params.language && params.language !== 'ar') {
        url.searchParams.append('language', params.language)
      }
      
      const response = await fetch(url.toString())
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return { data: await response.json() }
    },

    async getLiveTV(params = {}) {
      const url = new URL('https://www.mp3quran.net/api/v3/live-tv')
      if (params.language && params.language !== 'ar') {
        url.searchParams.append('language', params.language)
      }
      
      const response = await fetch(url.toString())
      if (!response.ok) {
         // Fallback or retry logic could be added here
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return { data: await response.json() }
    },
    
    // Legacy method - keeping for reference or unused parts
    getRecitation(reciterId, surahId) {
       // Placeholder return
      return apiClient.get(`/recitations/${reciterId}/by_chapter/${surahId}`)
    }
  },

  // Generic methods
  get(url, config) {
    return apiClient.get(url, config)
  },

  post(url, data, config) {
    return apiClient.post(url, data, config)
  },

  put(url, data, config) {
    return apiClient.put(url, data, config)
  },

  delete(url, config) {
    return apiClient.delete(url, config)
  }
}
