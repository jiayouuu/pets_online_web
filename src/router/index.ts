/*
 * @Author: 桂佳囿
 * @Date: 2025-01-16 14:32:28
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-22 19:09:02
 * @Description: 创建路由
 */

import { createRouter, createWebHistory } from 'vue-router'
// import { Storage } from '@/utils/storage'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_ROUTE),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/upload-file.vue'),
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/auth-page.vue'),
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/components/user-login.vue'),
          meta: { title: '用户登录' },
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/components/user-register.vue'),
          meta: { title: '用户注册' },
        },
        {
          path: '',
          redirect: { name: 'Login' },
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('@/views/not-found.vue'),
    },
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
