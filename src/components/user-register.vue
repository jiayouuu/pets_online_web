<template>
  <v-card class="register-card mx-auto" max-width="500px" elevation="3">
    <v-card-text>
      <div class="tabs-container d-flex">
        <div class="tab" @click="goToLogin">登录</div>
        <div class="tab active">注册</div>
      </div>

      <h2 class="text-center mb-6 mt-6">创建新账号</h2>

      <v-form  v-model="valid" @submit.prevent>
        <v-text-field
            ref="emailField"
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
            v-model="form.confirmPassword"
            label="确认密码"
            :type="showPassword ? 'text' : 'password'"
            :rules="confirmPasswordRules"
            required
          />
              <v-text-field
                v-model="form.emailCode"
                label="邮箱验证"
                :rules="emailCodeRules"
                required
              >
            <template #append>
              <v-btn
                :disabled="countdown > 0"
                @click="requestEmailCode"
                small
                height="56"
              >
                {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
              </v-btn>
            </template>
            </v-text-field>
        <div class="d-flex align-center mb-6">
          <v-checkbox
            v-model="agreeTerms"
            :rules="[(v) => !!v || '您必须同意用户协议才能注册']"
            hide-details
            density="compact"
            color="green"
          ></v-checkbox>
          <span>我已阅读并同意 <a href="#" class="terms-link">用户协议</a></span>
        </div>

        <v-btn
          @click="handleRegister"
          block
          color="green"
          type="submit"
          :loading="loading"
          :disabled="!valid || loading"
          class="register-btn mb-4"
        >
          注册
        </v-btn>
      </v-form>
    </v-card-text>

    <div class="text-center mb-4">
      已有账号? <router-link :to="{ name: 'Login' }" class="login-link">立即登录</router-link>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getEmailCode, verifyEmailCode, register} from '@/service/user'

interface Form {
  email: string
  password: string
  confirmPassword: string
  captcha: string
  emailCode: string
}
const router = useRouter()
const valid = ref(false)
const showPassword = ref(false)
const countdown = ref(0)
const loading = ref(false)
const agreeTerms = ref(false)
const form = ref<Form>({
  email: '',
  password: '',
  confirmPassword: '',
  captcha: '',
  emailCode: ''
})
const emailField = ref()
let emailToken = ''

// 规则保持不变
const emailRules = [
  (v: string) => !!v || '请输入邮箱',
  (v: string) => /.+@.+\..+/.test(v) || '邮箱格式不正确'
]

const passwordRules = [
  (v: string) => !!v || '请输入密码',
  (v: string) => v.length >= 6 || '密码长度至少6位',
  (v: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(v) || '密码至少由大小写字母和数字组成'
]

const confirmPasswordRules = [
  (v: string) => !!v || '请确认密码',
  (v: string) => v === form.value.password || '两次密码不一致'
]
const emailCodeRules = [
  (v: string) => !!v || '请输入邮箱验证码'
]


/**
 * @description: 请求邮箱验证码
 * @param {*} Promise
 * @return {*}
 */
const requestEmailCode = async():Promise<void> => {
  const invalidArr = await emailField.value.validate()
  if (invalidArr.length) return
  const {data: { code, data }} = await getEmailCode({ email: form.value.email })
  if (code !== 200) return
  const { token } = data
  emailToken = token
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
}
/**
 * @description: 注册
 * @return {*}
 */
const handleRegister = async():Promise<void> => {
  if (!valid.value) return
  const params = {
    email: form.value.email,
    code: form.value.emailCode,
  }
  const {data: {data, code}} = await verifyEmailCode(params, emailToken)
  if (code !== 200) return
  const { token } = data
  const {data: {code: loginCode}} = await register(form.value, token)
  if (loginCode !== 200) return
}

const goToLogin = () => {
  router.push({ name: 'Login' })
}
</script>

<style scoped lang="scss">
:deep(.v-text-field) {
  width: 350px;
}
.register-card {
  padding: 1rem;
}

.tabs-container {
  border-bottom: 1px solid #eee;
}

.tab {
  padding: 1rem 2rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
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

.terms-link,
.login-link {
  color: #4caf50;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}
.register-btn {
  letter-spacing: 1px;
  text-transform: none;
  font-weight: 500;
  height: 44px;
}
</style>
