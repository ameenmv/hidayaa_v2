import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/quran',
      name: 'quran',
      component: () => import('@/views/Quran.vue')
    },
    {
      path: '/audio',
      name: 'audio',
      component: () => import('@/views/Audio.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('@/views/Video.vue')
    },
    {
      path: '/live',
      name: 'live',
      component: () => import('@/views/LiveTV.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
