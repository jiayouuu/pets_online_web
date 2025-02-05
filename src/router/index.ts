/*
 * @Author: 桂佳囿
 * @Date: 2025-01-16 14:32:28
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-01-22 16:35:15
 * @Description: 创建路由
 */

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_ROUTE),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/user-register.vue'),
      meta:{
        keepAlive: true
      }
    },
    {
      path: '/input',
      name: 'input-slider',
      component: () => import('@/components/input-slider.vue'),
      meta:{
        keepAlive: true
      }
    },
    {
      path: '/foot',
      name: 'foot-animation',
      component: () => import('@/components/foot-animation.vue'),
      meta:{
        keepAlive: true
      }
    },
    {
      path:'/:catchAll(.*)',
      name:'not-found',
      component:()=>import('@/components/not-found.vue')
    }
  ],
})

export default router
