import { createApp } from 'vue'
import { devtools } from '@/devtools'

import router from './routes'

import App from './App.vue'

createApp(App).use(devtools).use(router).mount('#app')
