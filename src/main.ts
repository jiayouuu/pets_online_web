/*
 * @Author: 桂佳囿
 * @Date: 2025-01-16 14:32:28
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-02-21 09:14:55
 * @Description: vue入口文件
 */

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/stores'
import '@/assets/styles/main.scss'
import 'element-plus/dist/index.css'
import { vuetify } from '@/plugins/vuetify'
import { i18n } from '@/plugins/i18n'

const app = createApp(App)
app.use(store)
.use(router)
.use(vuetify)
.use(i18n)
.mount('#app')
