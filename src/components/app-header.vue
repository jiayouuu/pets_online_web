<!--
 * @Author: 桂佳囿
 * @Date: 2025-03-20
 * @Description: 应用头部组件
-->

<template>
  <v-app-bar app color="white" elevation="1" class="px-4">
    <div class="logo-container">
      <span class="logo-text green-text">萌宠在线</span>
    </div>

    <v-spacer></v-spacer>

    <div class="navigation">
      <router-link to="/" class="nav-link mx-2">首页</router-link>
      <router-link to="/pets" class="nav-link mx-2">宠物领养</router-link>
      <router-link to="/community" class="nav-link mx-2">社区论坛</router-link>
      <router-link to="/consultation" class="nav-link mx-2">在线问诊</router-link>
      <router-link to="/about" class="nav-link mx-2">关于我们</router-link>
    </div>

    <v-spacer></v-spacer>

    <div class="user-section">
      <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
        <template v-slot:activator="{ props }">
          <v-avatar
            v-bind="props"
            class="cursor-pointer"
            size="40"
            color="grey-lighten-1"
          >
            <v-img v-if="userStore.isLoggedIn && userStore.userInfo.avatar" :src="userStore.userInfo.avatar" alt="用户头像"></v-img>
            <v-icon v-else icon="mdi-account"></v-icon>
          </v-avatar>
        </template>
        <v-card min-width="200">
          <v-list v-if="userStore.isLoggedIn">
            <v-list-item>
              <v-list-item-title>{{ userStore.userInfo.nickname }}</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item to="/profile" prepend-icon="mdi-account-circle">
              <v-list-item-title>个人中心</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout" prepend-icon="mdi-logout">
              <v-list-item-title>退出登录</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item :to="{name:'Login'}" prepend-icon="mdi-login">
              <v-list-item-title>登录</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Storage } from '@/utils/storage'

// 路由
const router = useRouter()
const userStore = useUserStore()
const menu = ref(false)



// 方法
const logout = () => {
  // 实现登出逻辑
  Storage.removeItem('token')
  menu.value = false
  router.push({ name: 'Login' })
}
</script>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
}

.green-text {
  color: #4caf50;
}

.navigation {
  display: flex;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.2s;

  &:hover, &.router-link-active {
    color: #4caf50;
  }
}

.user-section {
  display: flex;
  align-items: center;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
