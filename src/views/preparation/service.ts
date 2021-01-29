/*
 * @Author: WuPeiQi
 * @description: 备考指南页请求
 * @path: 引入路径
 * @Date: 2021-01-19 16:03:59
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-27 20:07:40
 */
import { request } from '@/utils/request';
import { ExamParams } from './data.d';

const getExam = (data: ExamParams) => request('exam/dispatch', 'get', { ...data, action: 'getExamContent' }, true, false);

const getPreparation = (data: { examId: number }) => request('exam/dispatch', 'get', { ...data, action: 'getExamPreparationList' }, true, false);

export {
  getExam,
  getPreparation,
}