<!--
 * @Author: 桂佳囿
 * @Date: 2025-01-22 15:32:32
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-01-22 17:15:11
 * @Description: 
-->
<template>
    <v-form v-model="valid" @submit.prevent="submit">
      <v-row>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="formData.email"
            :counter="10"
            :rules="formRules.email"
            label="账户"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="formData.nickname"
            :rules="formRules.nickname"
            label="昵称"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="formData.password"
            :counter="10"
            :rules="formRules.password"
            label="密码"
            required
            type="password"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
        >
          <v-text-field
            v-model="formData.passwordConfirmation"
            :rules="formRules.passwordConfirmation"
            label="确认密码"
            required
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
        class="mt-2"
        text="提交"
        type="submit"
        block
      ></v-btn>
  </v-form>
</template>
<script setup lang="ts">
import { register } from '@/service/user'
import { reactive, toRefs } from 'vue'

const state=reactive({
    valid:false,
    formData:{
        email:'',
        password:'',
        passwordConfirmation:'',
        nickname:'',
    }
})

const formRules = {
    email:[
        (value:string)=>value?true:'请输入邮箱',
        (value:string) => /.+@.+\..+/.test(value) || '请输入正确的邮箱',
    ],
    nickname:[
        (value:string)=>value?true:'请输入昵称',
        (value:string) => value.length >= 2 || '昵称长度不能小于2位',
        (value:string) => value.length <= 10 || '昵称长度不能大于10位',
    ],
    password:[
        (value:string)=>value?true:'请输入密码',
        (value:string) => value.length >= 6 || '密码长度不能小于6位',
    ],
    passwordConfirmation:[
        (value:string)=>value?true:'请输入确认密码',
        (value:string) => value === state.formData.password || '两次密码不一致',
    ]
}

const submit =async () => {
    if(!state.valid) return
    try {
    const { email, password, nickname } = state.formData
    const params = {
        email,
        password,
        nickname,
    }
    const {data:{ code }}=await register(params)
    if (code !==200) throw new Error()
  } catch{
      
    }
}

const { valid, formData  } = toRefs(state)
</script>