<!--
 * @Author: 桂佳囿
 * @Date: 2025-01-16 14:32:28
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-01-19 13:15:24
 * @Description: 入口组件
-->

<template>
  <!-- <foot-animation />
  <div style="font-family:FangYuan;font-weight: 700;font-size: 50px;">测试字体</div>
  <input-slider /> -->
  <el-input v-model="nickname">
  </el-input>
  <el-button @click="submit">提交</el-button>
  <alive-router-view />
</template>
<script setup lang="ts">
import { addUser } from '@/service/user'
import {reactive,toRefs} from 'vue'
import { ElNotification } from 'element-plus'
import aliveRouterView from './components/alive-router-view.vue'
const formData= reactive({
  nickname:''
})


const submit = async () => {
  const {nickname}=formData
  const params = {
    nickname,
  }
  const {data:{code}} = await addUser(params)
  if (code === 200) ElNotification({
    title: '成功',
    message: '保存成功',
    duration: 1000,
  })
  else {
    ElNotification({
    title: '失败',
    message: '保存失败',
    duration: 1000,
  })
  }
}
const {nickname} =toRefs(formData)

</script>
<style scoped lang="scss">
</style>
