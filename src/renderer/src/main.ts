import '@renderer/style/main.css'
import '@renderer/style/printIndex.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')
