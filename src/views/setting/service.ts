/*
 * @Author: WuPeiQi
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-01-20 08:11:01
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-29 10:58:14
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import { request } from '@/utils/request';
import { SaveFeedbackParams, ExamPreferenceParams } from './data.d';

const getQuestions = (data: any) => request('exam/dispatch', 'post', data);

const saveFeedback = (data: SaveFeedbackParams) => request('exam/dispatch', 'post', data);

const getExamPreference = (data: ExamPreferenceParams) => request('exam/dispatch', 'get', data, true, false);

const saveExamPreference = (data: ExamPreferenceParams) => request('exam/dispatch', 'post', data);

export {
  getQuestions,
  saveFeedback,
  getExamPreference,
  saveExamPreference
}