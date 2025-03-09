<template>
  <v-container>
    <v-card max-width="400" class="mx-auto mt-10">
      <v-card-title>注册</v-card-title>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent>
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
          
          <v-row >
            <v-col cols="8">
              <v-text-field
                v-model="form.captcha"
                label="图片验证"
                :rules="captchaRules"
                required
                :readonly="isCaptchaVerified"
              />
            </v-col>
            <v-col cols="4">
              <v-img 
                v-if="!isCaptchaVerified"
                :src="captchaImg" 
                height="56"
                @click="refreshCaptcha" 
                class="captcha-img"
              />
              <v-btn
                v-else
                :disabled="countdown > 0 || !form.captcha"
                @click="requestEmailCode"
                small
                height="56"
              >
                {{ countdown > 0 ? `${countdown}s` : '邮箱验证' }}
              </v-btn>
            </v-col>
          </v-row>
              <v-text-field
                v-if="isCaptchaVerified"
                v-model="form.emailCode"
                label="邮箱验证码"
                :rules="emailCodeRules"
                required
              />
          <v-btn
            type="submit"
            color="primary"
            block
            :disabled="!valid"
            class="mt-4"
            @click="handleRegister"
          >
            注册
          </v-btn>
        </v-form>
        <div class="text-center mt-4">
          已有账号? <router-link :to="{name:'login'}">立即登录</router-link>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
  <v-snackbar
      v-model="showSnmckbar"
      :timeout="3000" 
      location="top"
      elevation="2"
    >
      注册成功！{{ goLoginTime }}后跳转至登录页
      <template v-slot:actions>
        <v-btn color="white" @click="goLogin">登录</v-btn>
      </template>
    </v-snackbar>
  
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getImgCode, verifyImgCode, getEmailCode, verifyEmailCode, register} from '@/service/user'

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
const captchaImg = ref('')
const isCaptchaVerified = ref(false) // 新增状态控制图片/按钮显示

const form = ref<Form>({
  email: '',
  password: '',
  confirmPassword: '',
  captcha: '',
  emailCode: ''
})
const emailField = ref()
const showSnmckbar = ref(false)
const goLoginTime = ref(3)
let imgCodeId = ''
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

const captchaRules = [
  (v: string) => !!v || '请输入验证码',
  (v: string) => v.length === 5 || '验证码长度为5位',
  async(v: string) => {
    if(isCaptchaVerified.value) return true
    const { data: {code} } = await verifyImgCode({ code: v, id: imgCodeId })
    if (code === 200) {
      isCaptchaVerified.value = true
    }
    return isCaptchaVerified.value || '验证码错误'
  }

]
const emailCodeRules = [
  (v: string) => !!v || '请输入邮箱验证码'
]


/**
 * @description: 刷新图片验证码
 * @return {*}
 */
const refreshCaptcha = async():Promise<void> => {
  const { data: { data, code} } = await getImgCode()
  if(code !== 200) {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    refreshCaptcha()
    return}
  const { id, img } = data
  captchaImg.value = img
  imgCodeId = id
  form.value.captcha = ''
}


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
  showSnmckbar.value = true
  const timer = setInterval(() => {
    goLoginTime.value -= 1
    if (goLoginTime.value <= 0) {
      clearInterval(timer)
      showSnmckbar.value = false
      router.push({name: 'login'})
    }
  }, 1000); 
}
/**
 * @description: 跳转至登录页
 * @param {*} void
 * @return {*}
 */
const goLogin = ():void=>{
  router.push({name: 'login'})
}

onMounted(() => {
  refreshCaptcha()
})
</script>

<style scoped>
.captcha-img {
  cursor: pointer;
}
.v-snackbar {
  /* 默认背景淡化 */
  /* background-color: rgba(255, 255, 255, 0.9) !important; */
  color: #333 !important; /* 文字颜色 */
}
</style>