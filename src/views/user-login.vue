<template>
    <v-container>
      <v-card max-width="400" class="mx-auto mt-10">
        <v-card-title>登录</v-card-title>
        <v-card-text>
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
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="form.captcha"
                  label="图片验证"
                  :rules="captchaRules"
                  required
                />
              </v-col>
              <v-col cols="4">
                <v-img :src="captchaImg" height="56" @click="refreshCaptcha" class="captcha-img"/>
              </v-col>
            </v-row>
            <v-checkbox v-model="form.remember" label="记住我" />
            <v-btn
              type="submit"
              color="primary"
              block
              :disabled="!valid"
              class="mt-4"
              @click="handleLogin"
            >
              登录
            </v-btn>
          </v-form>
          <div class="text-center mt-4">
            还没有账号? <router-link :to="{name:'register'}">立即注册</router-link>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
</template>
  
<script setup lang="ts">
import { ref ,onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { getImgCode, verifyImgCode ,login} from '@/service/user'
import { Storage } from '@/utils/storage'
//   import { useI18n } from 'vue-i18n';

// const { t, locale } = useI18n();

// setTimeout(() => {
//   locale.value = 'en';
// }, 3000);
interface Form {
  email: string
  password: string
  captcha: string
  remember: boolean
}

const router = useRouter()
const valid = ref(false)
const showPassword = ref(false)
const captchaImg = ref('') // 这里应该是后端提供的验证码图片URL

const form = ref<Form>({
  email: '',
  password: '',
  captcha: '',
  remember: false
})
let imgCodeId:string = ''
let imgCode:string = ''
const emailRules = [
  (v: string) => !!v || '请输入邮箱',
  (v: string) => /.+@.+\..+/.test(v) || '邮箱格式不正确'
]

const passwordRules = [
  (v: string) => !!v || '请输入密码',
  (v: string) => v.length >= 6 || '密码长度至少6位'
]

const captchaRules = [
  (v: string) => !!v || '请输入验证码',
  (v:string) => v.length === 5 || '验证码长度为5位',
  async (v:string) => {
    if(imgCode) return v.toLocaleLowerCase()===imgCode.toLocaleLowerCase() || '验证码错误'
    const { data: { code } } = await verifyImgCode({
      code: v,
      id: imgCodeId
    })
    if(code === 200) imgCode = v
    return imgCode.toLocaleLowerCase() === v.toLocaleLowerCase() || '验证码错误'
  }
]

  
/**
 * @description: 刷新图片验证码
 * @return {*}
 */
const refreshCaptcha = async():Promise<void> => {
  const { data: { data: { id, img } ,code} } = await getImgCode()
  if(code !== 200) return
  captchaImg.value = img
  imgCodeId = id
  form.value.captcha = ''
  imgCode = ''
}

const handleLogin = async():Promise<void> => {
  if (valid.value) {
    // 处理登录逻辑
    const {data:{ code,data}} =await login(form.value)
    if(code !== 200) return
    const {token} = data
    if(form.value.remember) Storage.setItem('token',token)
    else Storage.setItem('token',token,false)
    // 登录成功后跳转到首页
    router.push('/')
  }
}

onMounted(() => {
refreshCaptcha()
})
</script>
<style scoped lang="scss">
.captcha-img{
  cursor: pointer;
}
</style>