import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import 'ant-design-vue/dist/reset.css'
import './style.less'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

app.use(pinia)
app.mount('#app')
