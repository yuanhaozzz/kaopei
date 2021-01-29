/*
 * @Author: WuPeiQi
 * @description: 证书页面数据请求接口
 * @path: 引入路径
 * @Date: 2021-01-14 14:40:22
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-28 19:30:37
 */
import { request } from '@/utils/request';
import { EditAddressParams, CreateExamExpressParams } from './data.d';

const getExam = (data: {
  token: string | number, offcialAccountCode: string | number
}) => request('exam/dispatch', 'get', { ...data, action: 'getExamCertificateExpressList' });

const getCity = (data?: { parentId: number }) => request('base/dispatch', 'get', { ...data, action: 'getCityList' }, true, false);

const getAddress = (data: { token: string | number }) => request('exam/dispatch', 'get', { ...data, action: 'getUserAddressList' }, true, false);

const saveUserAddress = (data: EditAddressParams) => request('exam/dispatch', 'post', { ...data, action: 'saveUserAddress'});

const createExamExpress = (data: CreateExamExpressParams) => request('exam/dispatch', 'post', { ...data, action: 'createExamExpress' });

const getExamExpressTrack = (data: { token: string, expressId: number | string }) => request('exam/dispatch', 'post', { ...data, action: 'getExamExpressTrack' });

export {
  getExam,
  getCity,
  getAddress,
  saveUserAddress,
  createExamExpress,
  getExamExpressTrack,
}