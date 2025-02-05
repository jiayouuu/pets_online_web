/*
 * @Author: 桂佳囿
 * @Date: 2025-01-16 14:32:28
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-01-19 12:43:38
 * @Description: 
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig(({ mode })=>{
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_PUBLIC_PATH,
    build: {
      outDir: 'static',
    },
    plugins: [
      vue(),
      vueDevTools(),
      // element-plus 按需引入
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // vuetify按需引入
      vuetify({
        autoImport: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
