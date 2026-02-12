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
        const response = await api.audio.getReciters(params)
        if (response.data && response.data.reciters) {
          this.reciters = response.data.reciters.map(r => ({
            id: r.id,
            name: r.name,
            letter: r.letter,
            // Use the first moshaf for simplicity or handle multiple
            moshaf: r.moshaf ? r.moshaf.map(m => ({
              id: m.id,
              name: m.name,
              server: m.server,
              surahList: m.surah_list
            })) : []
          }))
        }
      } catch (error) {
        console.error('Error fetching reciters:', error)
        // Fallback to static data if API fails
        this.reciters = [
          { id: 1, name: 'أحمد بن علي العجمي', letter: 'A', moshaf: [] },
          { id: 2, name: 'عبدالرحمن السديس', letter: 'A', moshaf: [] },
          { id: 3, name: 'علي بن عبدالرحمن الحذيفي', letter: 'A', moshaf: [] },
          { id: 4, name: 'ناصر القطامي', letter: 'N', moshaf: [] },
          { id: 5, name: 'محمد أيوب', letter: 'M', moshaf: [] },
          { id: 6, name: 'محمود خليل الحصري', letter: 'M', moshaf: [] },
          { id: 7, name: 'محمود علي البنا', letter: 'M', moshaf: [] },
          { id: 8, name: 'محمد صديق المنشاوي', letter: 'M', moshaf: [] },
          { id: 9, name: 'مشاري العفاسي', letter: 'M', moshaf: [] },
          { id: 10, name: 'سعد الغامدي', letter: 'S', moshaf: [] }
        ]
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
