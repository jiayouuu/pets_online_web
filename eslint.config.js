/*
 * @Author: 桂佳囿
 * @Date: 2025-01-16 14:32:28
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-05 23:04:24
 * @Description:
 */
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  {
    // 添加自定义规则
    rules: {
      // 缩进使用 4 个空格
      indent: ['error', 2],
      // 代码块前加空格
      'space-before-blocks': ['error', 'always'],
      // 操作符周围必须有空格
      'space-infix-ops': 'error',
      // 禁止多余的空格
      'no-multi-spaces': 'error',
      // 函数名和括号之间无空格
      'space-before-function-paren': ['error', 'never'],
      // 对象键值对空格
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      // 控制操作符（如 ||）周围的空格
      'space-infix-ops': ['error', { 'int32Hint': false }],
      // 控制逗号后的空格
      'comma-spacing': ['error', { 'before': false, 'after': true }],
    },
  },
]
