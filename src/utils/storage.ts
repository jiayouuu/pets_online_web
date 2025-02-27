/*
 * @Author: 桂佳囿
 * @Date: 2025-02-27 23:17:43
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-02-28 00:26:12
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
}