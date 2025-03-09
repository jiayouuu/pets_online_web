/*
 * @Author: 桂佳囿
 * @Date: 2025-03-06 20:55:33
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-09 19:33:22
 * @Description: 
 */

import { nanoid } from 'nanoid';
import axios, { type AxiosRequestConfig } from 'axios';
import pLimit from 'p-limit';
import { Storage } from '@/utils/storage'
import CryptoJS from 'crypto-js';
import type { UploadFileParams } from '@/types/public';
import {WebSocketService} from '@/service/websocket'

export class FileUpload {
  private chunkSize:number = 1024 * 1024 * 5;
  private apiUrl:string = `${import.meta.env.VITE_BASE_URL}/files/upload/chunk`;
  private maxConcurrent:number = 5;
  private maxRetries:number = 2;
  private requestDelay:number = 300;

  private fileId:string;
  private file: File;
  private totalChunks:number;
  private fileName:string;
  private controller: AbortController;
  private uploadedChunks:number;
  private wsService: WebSocketService;
  private callback:(process:number)=>void;
  constructor(file: File, callback:(process:number)=>void) {
    this.file = file;
    this.fileName = file.name;
    this.fileId = nanoid();
    this.uploadedChunks = 0;
    this.totalChunks = Math.ceil(file.size / this.chunkSize);
    this.controller = new AbortController();
    this.callback = callback;
    this.wsService = new WebSocketService();
  }

  public async uploadFile():Promise<string> {
    return new Promise(async(resolve, reject)=>{
      const hash = await this.calculateHash(this.file);
      const chunkTasks = [];
      for(let i = 0; i < this.totalChunks; i++) {
        const start = i * this.chunkSize;
        const end = Math.min(start + this.chunkSize, this.file.size);
        const chunk = this.file.slice(start, end);
        chunkTasks.push(async()=>{
          // 如果是第一批则不用等待
          if(i !== 0) {
            await new Promise(resolve=>setTimeout(resolve, this.requestDelay));
          }
          return this.uploadChunk(hash, chunk, i);
        });
      }
      try {
        const stompClient = await this.wsService.connect();

        // 订阅上传进度
        stompClient.subscribe(`/topic/upload-progress/${this.fileId}`, (message) => {
          const progress = parseInt(message.body, 10);
          this.callback(progress)
        });

        // 订阅上传完成
        stompClient.subscribe(`/topic/upload-complete/${this.fileId}`, (message) => {
          const fileName = message.body;
          console.log(`文件上传完成: ${fileName}`);
          resolve(fileName); // 解析最终文件名
          this.wsService.disconnect(); // 完成后断开 WebSocket
        });
        const limit = pLimit(this.maxConcurrent);
        const limitedTasks = chunkTasks.map(task=>limit(task));
        await Promise.all(limitedTasks);
      } catch (error) {
        if(axios.isCancel(error)) {
          reject(error);
        }else{
          this.cancelUpload();
          reject(error);
        }
      }
    })
  }


  private async uploadChunk(hash:string, chunk: Blob, chunkIndex: number, retryCount:number = 0):Promise<void> {
    const params:UploadFileParams = {
      hash,
      chunk,
      chunkIndex,
      totalChunks: this.totalChunks,
      fileId: this.fileId, 
      fileName: this.fileName
    }
    const config: AxiosRequestConfig = {
      signal: this.controller.signal,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    const token = Storage.getItem('token');
    if(token) config.headers!['Authorization'] = `Bearer ${token}`;
    try {
      const {data: {code, data}} = await axios.post(this.apiUrl, params, config);
      if(code !== 200) console.error(data)
      if(code !== 200) throw new Error('Upload failed');
      this.uploadedChunks++;

    }catch(error) {
      if(axios.isCancel(error)) throw error
      else if(retryCount < this.maxRetries) {
        await this.uploadChunk(hash, chunk, chunkIndex, retryCount + 1)
      }
      else throw error;
    }
  }

  public cancelUpload():void {
    this.controller.abort();
  }

  private calculateHash(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunkSize = 2 * 1024 * 1024; // 每片2MB
      const chunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;
      const fileReader = new FileReader();
      const hash = CryptoJS.algo.SHA256.create(); // 创建 SHA-256 实例

      const loadNext = () => {
        const start = currentChunk * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        fileReader.readAsArrayBuffer(file.slice(start, end));
      };

      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
        hash.update(wordArray); // 更新哈希值
        currentChunk++;
        if (currentChunk < chunks) {
          loadNext();
        } else {
          const finalHash = hash.finalize().toString(); // 获取最终哈希值
          resolve(finalHash);
        }
      };

      fileReader.onerror = () => {
        reject(new Error('文件读取失败'));
      };

      loadNext(); // 开始读取
    });
  }
}
