import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
    primaryColor: 'emerald',
    fontSize: 'base'
  }),

  getters: {
    theme: (state) => state.isDark ? 'dark' : 'light',
    
    currentThemeClass: (state) => {
      return state.isDark ? 'dark' : ''
    }
  },

  actions: {
    initTheme() {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme')
      
      if (savedTheme) {
        this.isDark = savedTheme === 'dark'
      } else {
        // Check system preference
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      
      this.applyTheme()
    },

    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      localStorage.setItem('theme', this.theme)
    },

    setTheme(theme) {
      this.isDark = theme === 'dark'
      this.applyTheme()
      localStorage.setItem('theme', this.theme)
    },

    applyTheme() {
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },

    setPrimaryColor(color) {
      this.primaryColor = color
      localStorage.setItem('primaryColor', color)
    },

    setFontSize(size) {
      this.fontSize = size
      localStorage.setItem('fontSize', size)
    }
  }
})
