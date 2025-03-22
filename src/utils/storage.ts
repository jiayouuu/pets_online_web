/*
 * @Author: 桂佳囿
 * @Date: 2025-02-27 23:17:43
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-22 21:41:16
 * @Description:
 */
import type { TokenInfo } from '@/types/public'
import { emitter } from '@/utils/mitt'

export class Storage {
  /**
     * @description: 从sessionStorage或者localStorage中获取数据
     * @param {string} key
     * @return {*}
     */
  public static getItem(key: string): string | null {
    return sessionStorage.getItem(key) || localStorage.getItem(key);
  }

  /**
     * @description: 存储到sessionStorage或者localStorage
     * @param {string} key
     * @param {string} value
     * @param {boolean} isLongTime
     * @return {*}
     */
  public static setItem(key: string, value: string, isLongTime:boolean = true): void {
    this.removeItem(key);
    if (!isLongTime) return sessionStorage.setItem(key, value);
    localStorage.setItem(key, value);
    emitter.emit('storage', key)
  }

  /**
     * @description: 删除单个存储
     * @param {string} key
     * @return {*}
     */
  public static removeItem(key: string): void {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
    emitter.emit('storage', key)
  }

  /**
     * @description: 情况所有的缓存
     * @return {*}
     */
  public static clear():void {
    sessionStorage.clear();
    localStorage.clear();
    emitter.emit('storage', 'clear')
  }

  public static parseJWT():TokenInfo | null {
    const token = this.getItem('token');
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c)=>
      ('%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    ).join(''));
    const tokenInfo = JSON.parse(jsonPayload) as TokenInfo;
    if(tokenInfo.exp < Date.now() / 1000) {
      this.removeItem('token');
      return null;
    }
    return tokenInfo;
  }
}