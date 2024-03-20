import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Tetris from '../views/tetris/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tetris',
      name: 'tetris',
      component: Tetris
    }
  ]
})

export default router
