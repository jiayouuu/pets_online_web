/*
 * @Author: 桂佳囿
 * @Date: 2025-01-16 14:32:28
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-05 12:52:17
 * @Description: 创建路由
 */

import { createRouter, createWebHistory } from 'vue-router'
// import { Storage } from '@/utils/storage'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_ROUTE),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/user-register.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user-login.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: ()=>import('@/components/upload-file.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: ()=>import('@/views/not-found.vue')
    }
  ],
})
// router.beforeEach((to,from,next)=>{
//   const permitNames:string[] = ['login','register','notFound']
//   if(permitNames.includes(to.name as string)){
//     next()
//     return;
//   }
//   if(Storage.parseJWT().exp<=Date.now()/1000){
//     next({name:'login'})
//   }else{
//     next()
//   }
// })
export default router
