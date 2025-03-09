/*
 * @Author: 桂佳囿
 * @Date: 2025-01-18 17:15:47
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-05 23:12:31
 * @Description: 用户相关接口
 */

import type { ResponseData } from '@/types/common'
import { http } from '@/utils/http'


const USER = {
  register: '/user/register',
  login: '/user/login',
  imgCode: '/public/imgCode',
  emailCode: '/public/email/code',
  verifyCode: '/public/validateImgCode',
  verifyEmailCode: '/public/validateEmailCode'
}

/**
 * @description: 用户注册
 * @param {object} params
 * @param {string} token
 * @return {*}
 */
export const register = (params:{email:string, password:string}, token:string): ResponseData<unknown>=>{
  return http.post(USER.register, params, {headers: {Authorization: `Bearer ${token}`}})
}

/**
 * @description: 用户登录
 * @param {object} params
 * @return {*}
 */
export const login = (params:{email:string, password:string, remember:boolean}):ResponseData<{token:string}>=> http.post(USER.login, params)

/**
 * @description: 获取图片验证码
 * @param {*} ResponseData
 * @return {*}
 */
export const getImgCode = (): ResponseData<{id:string, img:string}> => http.get(USER.imgCode)

/**
 * @description: 验证图片验证码
 * @param {string} code
 * @return {*}
 */
export const verifyImgCode = (params:{code:string, id:string}):ResponseData<null> => http.post(USER.verifyCode, params)


/**
 * @description: 获取邮箱验证码
 * @param {object} params
 * @return {*}
 */
export const getEmailCode = (params:{email:string}):ResponseData<{token:string}> => http.get(USER.emailCode, { params })

/**
 * @description: 验证邮箱验证码
 * @param {object} params
 * @param {string} token
 * @return {*}
 */
export const verifyEmailCode = (params:{email:string, code:string}, token:string):ResponseData<{result:string, token:string}> => http.post(USER.verifyEmailCode, params, { headers: {Authorization: `Bearer ${token}`}})