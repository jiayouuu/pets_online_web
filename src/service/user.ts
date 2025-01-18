/*
 * @Author: 桂佳囿
 * @Date: 2025-01-18 17:15:47
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-01-18 20:48:29
 * @Description: 用户相关接口
 */

import type { ResponseData } from '@/types/common'
import { http } from '@/utils/http'
import qs from 'qs'
import type { User } from '@/types/user'

const USER = {
  addUser: 'user/add',
}

export const addUser = (params:User): ResponseData<User> => http.post(
    USER.addUser,
    qs.stringify(params)
)
