<!--
 * @Author: 桂佳囿
 * @Date: 2025-01-19 13:02:18
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-05 23:15:50
 * @Description: 
-->
<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="aliveRoute" :max="10">
            <component :is="Component"/>
        </keep-alive>
    </router-view>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const aliveRoute:Array<string> = reactive([])
router.beforeEach((to, from, next)=>{
  const routeName = String(to.name)
  if (to.meta.keepAlive && !aliveRoute.includes(routeName)) {
    aliveRoute.push(routeName)
  }
  next()

})
</script>