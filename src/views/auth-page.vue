<!--
 * @Author: 桂佳囿
 * @Date: 2025-03-20
 * @Description: 用户登录和注册页面
-->

<template>
  <v-container fluid class="auth-container pa-0">
    <v-row class="fill-height auth-row">
      <v-col cols="12" md="6" class="d-none d-md-flex bg-primary-container">
        <div class="welcome-section d-flex flex-column justify-center align-center h-100 pa-8">
          <h1 class="text-h3 text-center mb-6 green-text">萌宠在线</h1>
          <p class="text-body-1 text-center mb-8">
            加入萌宠在线，为宠物提供温暖的家，一起传递爱与责任。
          </p>
          <img src="@/assets/images/public/logo.png" alt="宠物插图" class="welcome-img" />
        </div>
      </v-col>

      <v-col cols="12" md="6" class="auth-form-container pa-4 pa-md-12">
        <!-- 路由视图 - 根据当前路由显示登录或注册组件 -->
          <router-view v-slot="{ Component }">
            <keep-alive>
            <component :is="Component" />
          </keep-alive>
          </router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// 不需要导入组件，因为它们会通过路由加载
</script>

<style scoped lang="scss">
.auth-container {
  background-color: #f8f9fa;
  .auth-row {
    min-height: 100vh;
  }
}

.bg-primary-container {
  background-color: #f0f7f0;
}

.welcome-section {
  max-width: 500px;
  margin: 0 auto;
}

.green-text {
  color: #4caf50;
}

.welcome-img {
  max-width: 80%;
  height: auto;
}

.auth-form-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
