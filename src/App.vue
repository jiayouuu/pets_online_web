<!--
 * @Author: 桂佳囿
 * @Date: 2025-01-16 14:32:28
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-22 23:34:25
 * @Description: 入口组件
-->

<template>
  <v-app>
    <app-header />
    <v-main class="main-container">
      <router-view/>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
//   import { useI18n } from 'vue-i18n';

// const { t, locale } = useI18n();
</script>

<style scoped lang="scss">
.main-container {
  min-height: 100vh;
}
</style>
