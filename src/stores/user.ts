/*
 * @Author: 桂佳囿
 * @Date: 2025-03-13 23:31:14
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-22 21:30:25
 * @Description:
 */
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { Storage } from '@/utils/storage'
import { emitter } from '@/utils/mitt'

interface UserInfo {
  id: number | null
  email: string | null
  role: string | null
  nickname: string | null
  avatar: string | null
}
export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({}) as UserInfo
  const isLoggedIn = ref<boolean>(false)
  const updateUserInfo = ():void=>{
    const tokenInfo = Storage.parseJWT()
    if(tokenInfo) {
      isLoggedIn.value = true
      const {id, email, role, nickname, avatar} = tokenInfo
      Object.assign(userInfo, {id, email, role, nickname, avatar})
    }else{
      Object.assign(userInfo, {})
      isLoggedIn.value = false
    }
  }
  emitter.on('storage', (key) => {
    if (key === 'token' || key === 'clear') updateUserInfo()
  })
  updateUserInfo()
  return {userInfo, isLoggedIn}
})

// eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImlkIjoxOTAzMTIzMzc1MjQ3MDkzNzYxLCJpYXQiOjE3NDI2Mjc4MDAsImVtYWlsIjoiMzAxMDMzNjk1NUBxcS5jb20iLCJleHAiOjE3NDMyMzI2MDB9.UShNcEF0Jf946FdVEy1FAp1YOKRCqr9Zo09uEZkQ-rQ