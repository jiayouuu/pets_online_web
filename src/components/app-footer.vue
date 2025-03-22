<!--
 * @Author: 桂佳囿
 * @Date: 2025-03-20
 * @Description: 应用底部组件
-->

<template>
  <v-footer class="bg-dark py-4">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h3 class="text-h6 text-white mb-4">关于我们</h3>
          <v-list class="bg-transparent pa-0">
            <v-list-item class="pa-0 mb-1">
              <router-link to="/about/intro" class="footer-link">平台介绍</router-link>
            </v-list-item>
            <v-list-item class="pa-0 mb-1">
              <router-link to="/about/team" class="footer-link">团队成员</router-link>
            </v-list-item>
            <v-list-item class="pa-0 mb-1">
              <router-link to="/about/contact" class="footer-link">联系我们</router-link>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="4">
          <h3 class="text-h6 text-white mb-4">服务与支持</h3>
          <v-list class="bg-transparent pa-0">
            <v-list-item class="pa-0 mb-1">
              <router-link to="/faq" class="footer-link">常见问题</router-link>
            </v-list-item>
            <v-list-item class="pa-0 mb-1">
              <router-link to="/terms" class="footer-link">用户协议</router-link>
            </v-list-item>
            <v-list-item class="pa-0 mb-1">
              <router-link to="/privacy" class="footer-link">隐私政策</router-link>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="4">
          <h3 class="text-h6 text-white mb-4">联系方式</h3>
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-email" color="white" class="mr-2"></v-icon>
            <a href="mailto:jiayouuu@foxmail.com" class="footer-link">jiayouuu@foxmail.com</a>
          </div>
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-phone" color="white" class="mr-2"></v-icon>
            <span class="text-white">400-888-8888</span>
          </div>
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-map-marker" color="white" class="mr-2"></v-icon>
            <span class="text-white">四川省宜宾市</span>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4 border-opacity-25"></v-divider>

      <div class="text-center text-white">
        <p>&copy; {{ currentYear }} 萌宠在线 - 宠物领养平台 版权所有</p>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 获取当前年份
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped lang="scss">
.bg-dark {
  background-color: #333333 !important;
}

.footer-link {
  color: #cccccc;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
}

:deep(.v-list-item__content) {
  padding: 0;
}

:deep(.v-list-item) {
  min-height: auto;
}
</style>
