import { createRouter, createWebHashHistory } from 'vue-router'
import HomeIndex from '@renderer/layouts/homeIndex.vue'
import ChromeIndex from '@renderer/layouts/chromeIndex.vue'
import ResourcesIndex from '@renderer/layouts/resourcesIndex.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeIndex },
    { path: '/chrome', component: ChromeIndex },
    { path: '/resources', component: ResourcesIndex }
  ]
})
export default router
