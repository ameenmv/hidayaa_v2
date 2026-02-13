import api from '@/plugins/api'
import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
  state: () => ({
    reciters: [],
    recentReads: [],
    isLoadingReciters: false,
    
    isPlaying: false,
    currentTrack: null,
    playlist: [],
    volume: 1,
    currentTime: 0,
    duration: 0,
    repeat: false,
    shuffle: false
  }),

  getters: {
    progress: (state) => {
      if (!state.duration) return 0
      return (state.currentTime / state.duration) * 100
    },

    hasNext: (state) => {
      if (!state.currentTrack || !state.playlist.length) return false
      const currentIndex = state.playlist.findIndex(t => t.id === state.currentTrack.id)
      return currentIndex < state.playlist.length - 1
    },

    hasPrevious: (state) => {
      if (!state.currentTrack || !state.playlist.length) return false
      const currentIndex = state.playlist.findIndex(t => t.id === state.currentTrack.id)
      return currentIndex > 0
    }
  },

  actions: {
    play() {
      this.isPlaying = true
    },

    pause() {
      this.isPlaying = false
    },

    togglePlay() {
      this.isPlaying = !this.isPlaying
    },

    setCurrentTrack(track) {
      this.currentTrack = track
    },

    setPlaylist(playlist) {
      this.playlist = playlist
    },

    setVolume(volume) {
      this.volume = Math.max(0, Math.min(1, volume))
      localStorage.setItem('audioVolume', this.volume)
    },

    setCurrentTime(time) {
      this.currentTime = time
    },

    setDuration(duration) {
      this.duration = duration
    },

    toggleRepeat() {
      this.repeat = !this.repeat
    },

    toggleShuffle() {
      this.shuffle = !this.shuffle
    },

    async fetchReciters(params = { language: 'ar' }) {
      this.isLoadingReciters = true
      try {
        const response = await api.audio.getRecitationsList(params)
        if (response.recitations) {
          this.reciters = response.recitations.map(r => ({
            id: r.id,
            nameAr: r.translated_name?.name || r.reciter_name,
            style: r.style,
            // Revert to speculative image logic based on ID or fallback
            imageUrl: `https://static.qurancdn.com/images/reciters/images/${r.reciter_id}.jpeg` 
          })).sort((a, b) => a.nameAr.localeCompare(b.nameAr, 'ar'))
        }
      } catch (error) {
        console.error('Error fetching reciters:', error)
        this.reciters = []
      } finally {
        this.isLoadingReciters = false
      }
    },

    async fetchRecentReads(params = { language: 'ar' }) {
      try {
        const response = await api.audio.getRecentReads(params)
        if (response.data && response.data.reads) {
          this.recentReads = response.data.reads.map(r => ({
            id: r.id,
            name: r.name,
            letter: r.letter,
            date: r.recent_date,
            moshaf: r.moshaf || []
          }))
        }
      } catch (error) {
        console.error('Error fetching recent reads:', error)
      }
    },

    async getRecitationFiles(reciterId) {
      try {
        const response = await api.audio.getChapterRecitations(reciterId)
        if (response.audio_files) {
          // Map to a consistent track format
          return response.audio_files.map(file => ({
            id: file.chapter_id, 
            url: file.audio_url,
            format: file.format,
            title: `Surah ${file.chapter_id}` 
          }))
        }
        return []
      } catch (error) {
        console.error('Error fetching recitation:', error)
        return []
      }
    },

    next() {
      if (!this.hasNext) return
      
      const currentIndex = this.playlist.findIndex(t => t.id === this.currentTrack.id)
      this.currentTrack = this.playlist[currentIndex + 1]
    },

    previous() {
      if (!this.hasPrevious) return
      
      const currentIndex = this.playlist.findIndex(t => t.id === this.currentTrack.id)
      this.currentTrack = this.playlist[currentIndex - 1]
    }
  }
})
