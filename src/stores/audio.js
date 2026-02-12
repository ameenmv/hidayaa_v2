import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
  state: () => ({
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
