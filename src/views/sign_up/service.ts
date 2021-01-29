/*
 * @Author: WuPeiQi
 * @description: 报名指导页请求
 * @path: 引入路径
 * @Date: 2021-01-20 15:16:01
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-28 14:48:51
 */

import { request } from '@/utils/request';

const getAllExam = () => request('exam/dispatch', 'get', {action: 'getAllExamRegistrationList'}, true, false);

const getExam = (data: { examId: number }) => request('exam/dispatch', 'get', { ...data, action: 'getExamRegistrationList' }, true);

export {
  getAllExam,
  getExam,
}
