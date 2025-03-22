<template>
  <v-card class="login-card mx-auto" max-width="500px" elevation="3">
    <v-card-text>
      <div class="tabs-container d-flex">
        <div class="tab active">登录</div>
        <div class="tab" @click="goToRegister">注册</div>
      </div>

      <h2 class="text-center mb-6 mt-6">欢迎回来</h2>

      <v-form v-model="valid" @submit.prevent>
        <v-text-field
            v-model="form.email"
            label="邮箱"
            type="email"
            :rules="emailRules"
            required
          />
          <v-text-field
            v-model="form.password"
            label="密码"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="passwordRules"
            required
          />
              <v-text-field
                v-model="form.captcha"
                label="验证码"
                :rules="captchaRules"
                required
              >
            <template #append>
              <v-img :src="captchaImg" @click="refreshCaptcha" class="captcha-img" />
            </template>
            </v-text-field>

        <div class="d-flex justify-space-between align-center mb-6">
          <v-checkbox
            v-model="form.remember"
            label="记住我"
            hide-details
            density="compact"
            color="green"
          ></v-checkbox>
          <router-link to="/forgot-password" class="forgot-link">忘记密码?</router-link>
        </div>

        <v-btn
          @click="handleLogin"
          block
          color="green"
          type="submit"
          :loading="loading"
          :disabled="!valid || loading"
          class="login-btn mb-4"
        >
          登录
        </v-btn>
      </v-form>
    </v-card-text>

    <div class="text-center mb-4">
      还没有账号? <router-link :to="{ name: 'Register' }" class="register-link">立即注册</router-link>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getImgCode, verifyImgCode, login } from '@/service/user'
import { Storage } from '@/utils/storage'

interface Form {
  email: string
  password: string
  captcha: string
  remember: boolean
}

const router = useRouter()
const valid = ref(false)
const showPassword = ref(false)
const captchaImg = ref('')

const form:Form = reactive({
  email: '',
  password: '',
  captcha: '',
  remember: false,
})
const loading = ref(false)
let imgCodeId: string = ''
let imgCode: string = ''
const emailRules = [
  (v: string) => !!v || '请输入邮箱',
  (v: string) => /.+@.+\..+/.test(v) || '邮箱格式不正确',
]

const passwordRules = [
  (v: string) => !!v || '请输入密码',
  (v: string) => v.length >= 6 || '密码长度至少6位',
]

const captchaRules = [
  (v: string) => !!v || '请输入验证码',
  (v: string) => v.length === 5 || '验证码长度为5位',
  async(v: string) => {
    if (imgCode) return v.toLocaleLowerCase() === imgCode.toLocaleLowerCase() || '验证码错误'
    const {
      data: { code },
    } = await verifyImgCode({
      code: v,
      id: imgCodeId,
    })
    if (code === 200) imgCode = v
    return imgCode.toLocaleLowerCase() === v.toLocaleLowerCase() || '验证码错误'
  },
]

/**
 * @description: 刷新图片验证码
 * @return {*}
 */
const refreshCaptcha = async(): Promise<void> => {
  const {
    data: { data, code },
  } = await getImgCode()
  if (code !== 200) {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return refreshCaptcha()
  }
  const { id, img } = data
  captchaImg.value = img
  imgCodeId = id
  form.captcha = ''
  imgCode = ''
}

const handleLogin = async(): Promise<void> => {
  if (valid.value) {
    // 处理登录逻辑
    const {
      data: { code, data },
    } = await login(form)
    if (code !== 200) return
    const { token } = data
    if (form.remember) Storage.setItem('token', token)
    else Storage.setItem('token', token, false)
    // 登录成功后跳转到首页
    router.push({ name: 'Home' })
  }
}

const goToRegister = () => {
  router.push({ name: 'Register' })
}

onMounted(() => {
  refreshCaptcha()
})
</script>

<style scoped lang="scss">
:deep(.v-text-field) {
  width: 350px;
}
.login-card {
  padding: 1rem;
}

.tabs-container {
  border-bottom: 1px solid #eee;
}

.tab {
  font-size: 1rem;
  padding: 1rem 2rem;
  cursor: pointer;
  font-weight: 500;
  color: #666;

  &.active {
    color: #4caf50;
    border-bottom: 2px solid #4caf50;
  }
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.required {
  color: red;
}

.forgot-link,
.register-link {
  color: #4caf50;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}


.captcha-img {
  width: 120px;
  height: 56px;
  object-fit: cover;
  cursor: pointer;
}

.login-btn {
  letter-spacing: 1px;
  text-transform: none;
  font-weight: 500;
  height: 44px;
}
</style>
