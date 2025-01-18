import type { AxiosResponse } from 'axios'

export interface Data<T> {
  code: number
  message: string
  data: T
}

// 响应体类型
export type ResponseData<T> = Promise<AxiosResponse<Data<T>>>