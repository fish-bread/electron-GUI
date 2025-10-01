import '@renderer/style/main.css'
import '@renderer/style/printIndex.css'
import '@renderer/style/tabsIndex.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
const app = createApp(App)

app.use(router)
app.use(VueDOMPurifyHTML)
app.mount('#app')
