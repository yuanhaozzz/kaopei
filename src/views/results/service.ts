/*
 * @Author: WuPeiQi
 * @description: 成绩相关页面请求
 * @path: 引入路径
 * @Date: 2021-01-25 09:25:26
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-28 17:24:29
 */
import { request } from '@/utils/request';
import { ExamScoreDistributionParams } from './data.d';

const getExamListOfScore = (data: { offcialAccountCode: string | number, token?: string }) => request('exam/dispatch', 'get', { ...data, action: 'getExamListOfScore' }, true, false);

const getExamScoreItemsListOfScore = (data: { offcialAccountCode: string | number }) => request('exam/dispatch', 'get', { ...data, action: 'getExamScoreItemsListOfScore' }, true, false);

const getExamScoreDistribution = (data: ExamScoreDistributionParams) => request('exam/dispatch', 'get', data, true, false);

const getReconsider = () => request('exam/dispatch', 'get', {action: 'getAllExamReconsiderationList'}, true, false);

const getReconsiderInfo = (data: {id: number}) => request('exam/dispatch', 'get', {...data, action: 'getExamReconsiderationById'}, true, false);

export {
  getExamListOfScore,
  getExamScoreItemsListOfScore,
  getExamScoreDistribution,
  getReconsider,
  getReconsiderInfo,
}
