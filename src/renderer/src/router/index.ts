import { createRouter, createWebHashHistory } from 'vue-router'
import HomeIndex from '@renderer/layouts/homeIndex.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: HomeIndex}
  ]
})
export default router
