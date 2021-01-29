/*
 * @Author: WuPeiQi
 * @description: 公共方法
 * @path: 引入路径
 * @Date: 2021-01-05 14:58:00
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-18 11:22:30
 */

/**
 * @description: rem设置
 * @param {any} n：window
 * @return {*}
 */
export function setRem(n: any) {
  let e, t: any, i, d: number, o, a;
  e = n.document;
  t = e.documentElement;
  i = 750;
  d = i / 100;
  o = 'orientationchange' in n ? 'orientationchange' : 'resize';
  a = () => {
    let n = t.clientWidth || 375; n > 750 && (n = 750);
    t.style.fontSize = `${n / d}px`;
  }
  if (e.addEventListener) {
    n.addEventListener(o, a, !1);
    e.addEventListener('DOMContentLoaded', a, !1);
  }
}

/**
 * @description: 将****-**-**字符转转换为****年**月**日
 * @param {string} string: 需要转换的日期字符串
 * @return {*}
 */
export function dateSplit(string: string) {
  if (!string) return '';
  const regex = /(\d{4})-(\d{2})-(\d{2})/;
  const result = string.replace(regex, "$1年$2月$3日");
  return result;
}