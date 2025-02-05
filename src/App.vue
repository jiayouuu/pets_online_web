<!--
 * @Author: 桂佳囿
 * @Date: 2025-01-16 14:32:28
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-01-22 16:12:19
 * @Description: 入口组件
-->

<template>
  <alive-router-view />
</template>
<script setup lang="ts">
// import { addUser } from '@/service/user'
// import {reactive } from 'vue'
// import { ElNotification } from 'element-plus'
import aliveRouterView from './components/alive-router-view.vue'
// const formData= reactive({
//   nickname:''
// })


  
//   const {data:{code}} = await addUser(params)
//   if (code === 200) ElNotification({
//     title: '成功',
//     message: '保存成功',
//     duration: 1000,
//   })
//   else {
//     ElNotification({
//     title: '失败',
//     message: '保存失败',
//     duration: 1000,
//   })
//   }


</script>
<style scoped lang="scss">
</style>
