<!--
 * @Author: 桂佳囿
 * @Date: 2025-01-22 16:32:15
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-01-22 17:11:48
 * @Description: 404页面
-->
<template>
    <v-empty-state
        class="custom-empty-state"
        headline="啊偶~ 404"
        title="Page not found"
        text="您冲浪太快，把网页冲到月球上去了"
        :image="logo"
    />
</template>
<script setup lang="ts">
import logo from '@/assets/images/public/logo.png'
</script>
<style scoped lang="scss">
</style>