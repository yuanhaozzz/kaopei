/*
 * @Author: WuPeiQi
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-01-11 15:48:56
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-29 13:30:28
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */

export interface Logistics {
  message: string,
  state: string | number,
  status: string | number,
  ischeck: string,
  com: string,
  nu: number,
  data: LogisticsData[]
}

export interface LogisticsData {
  context: string,
  time: string,
  ftime: string;
}

export interface ExamExpressItem {
  examBatch: string,
  examBatchId: number,
  examCandidateNumber: string | number,
  examId: number,
  examName: string,
  firstNamePinyin: string,
  idNumber: string | number,
  lastNamePinyin: string,
  isHasCertificate: number,
  userExamId: number,
  expressId?: number,
  score?: string,
  mailNo?: string,
}

export interface CityItem {
  id: number,
  name: string,
  parentId: number,
}

export interface AddressItem {
  address: string,
  cityId: number,
  fullCityId: string,
  fullCityName: string,
  id: number,
  mobile: number | string,
  receiver: string,
  userId: number
}

export interface AddressForm {
  id?: number,
  receiver: string,
  mobile: string,
  region: CityItem[],
  address: string,
}

export interface EditAddressParams {
  token: string,
  cityId: number,
  address: string,
  mobile: number | string,
  receiver: string,
  fullCityId: string,
  fullCityName: string,
  addressId?: number
}

export interface CreateExamExpressParams {
  token: string,
  cityId: number,
  receiver: string,
  mobile: string,
  address: string,
  idNumber?: number,
  userExamIds: string,
}

export interface ExpressData {
  data: ExpressItem[],
  state: string,
  nu: string,
  com: string,
}

export interface ExpressItem {
  context: string,
  ftime: string,
  time: string,
}