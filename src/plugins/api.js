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
    getSurahs() {
      return apiClient.get('/chapters')
    },
    
    getSurah(id) {
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
    getReciters() {
      return apiClient.get('/resources/recitations')
    },
    
    getRecitation(reciterId, surahId) {
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
