/*
 * @Author: WuPeiQi
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-01-27 20:20:32
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-28 09:38:15
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import { request } from '@/utils/request';
import {sign, UploadParam} from './data'

// 签名

const getSign = (param: sign) => request('/tools/dispatch', 'post', param, true);

const uploadImage = (param: UploadParam) => request(param.url, 'put', param.file, true, false, param.headers);

export {
  getSign,
  uploadImage
}