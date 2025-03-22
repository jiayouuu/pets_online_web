/*
 * @Author: 桂佳囿
 * @Date: 2025-03-13 23:31:14
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-22 20:43:29
 * @Description:
 */
export type UploadFileParams={
    chunk:Blob,
    fileId:string,
    chunkIndex:number,
    totalChunks:number,
    fileName:string;
    hash:string;
}

export interface TokenInfo {
    exp: number
    iat: number
    role: string
    id: number
    email: string
    nickname: string
    avatar: string
  }