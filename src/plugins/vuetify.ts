/*
 * @Author: 桂佳囿
 * @Date: 2025-01-22 14:32:57
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-02-23 23:38:28
 * @Description: 
 */
// 
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
//vuetify全局样式文件
import 'vuetify/styles'    
 
export const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
 