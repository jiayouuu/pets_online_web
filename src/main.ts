/*
 * @Author: 桂佳囿
 * @Date: 2025-01-16 14:32:28
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-01-18 20:22:41
 * @Description: vue入口文件
 */

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/stores'
import '@/assets/styles/main.scss'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
