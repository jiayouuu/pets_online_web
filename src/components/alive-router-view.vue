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
router.beforeEach((to,from,next)=>{
    const routeName= String(to.name)
    if (to.meta.keepAlive && !aliveRoute.includes(routeName)) {
        aliveRoute.push(routeName)
    }
    next()
})
</script>