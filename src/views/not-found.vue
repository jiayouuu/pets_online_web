<!--
 * @Author: 桂佳囿
 * @Date: 2025-01-22 16:32:15
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-02-28 21:05:37
 * @Description: 404页面
-->
<template>
    <v-empty-state
        class="custom-empty-state"
        :headline ="t('notFound.headline')"
        :title="t('notFound.title')"
        :text="t('notFound.text')"
        :image="logo"
    />
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import logo from '@/assets/images/public/logo.png'

const { t } = useI18n();
</script>
<style scoped lang="scss">
.custom-empty-state {
    :deep(.v-empty-state__text){
        max-width: 600px!important;
    }
}
</style>