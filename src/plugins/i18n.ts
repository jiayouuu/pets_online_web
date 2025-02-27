/*
 * @Author: 桂佳囿
 * @Date: 2025-02-20 18:55:31
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-02-20 19:31:38
 * @Description: i18n国际化配置
 */
import { createI18n } from 'vue-i18n';

// 引入翻译内容
import en from '@/assets/locales/en.json';
import zh from '@/assets/locales/zh.json';

// 创建 i18n 实例
export const i18n = createI18n({
    // 使用 Composition API 时需要设置为 false
    legacy: false, 
    // 设置默认语言
    locale: import.meta.env.VITE_I18N_LOCALE || 'zh', 
    messages: {
        en,
        zh,
    },
});