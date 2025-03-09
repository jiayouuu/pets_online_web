// import type { ResponseData } from '@/types/common'
// import { http } from '@/utils/http'

import { http } from "@/utils/http"
import type { UploadFileParams } from '@/types/public'
import type { ResponseData } from "@/types/common"
import type { AxiosRequestConfig } from "axios"
export const PUBLIC = {
  upload: '/files/upload/chunk'
}

/**
 * @description: 上传文件切片
 * @param {UploadFileParams} params
 * @return {*}
 */
export const uploadFileChunk = (params: UploadFileParams, config: AxiosRequestConfig<UploadFileParams> | undefined): ResponseData<unknown> => {
  return http.post(PUBLIC.upload, params, config
  )
}