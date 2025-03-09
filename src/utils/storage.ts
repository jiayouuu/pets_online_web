/*
 * @Author: 桂佳囿
 * @Date: 2025-02-27 23:17:43
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-05 12:11:43
 * @Description: 
 */
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
  }

  /**
     * @description: 删除单个存储
     * @param {string} key
     * @return {*}
     */
  public static removeItem(key: string): void {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  }

  /**
     * @description: 情况所有的缓存
     * @return {*}
     */
  public static clear():void {
    sessionStorage.clear();
    localStorage.clear();
  }

  public static parseJWT() {
    const token = this.getItem('token');
    if (!token) return;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c)=> 
      ('%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    ).join(''));
    return JSON.parse(jsonPayload);
  }
}