/*
 * @Author: WuPeiQi
 * @description: 报名页数据类型申明
 * @path: 引入路径
 * @Date: 2021-01-11 14:32:11
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-29 10:22:35
 */
export interface ExamItem {
  id: number,
  examId: number,
  examName: string,
  channelTypeName: string,
  channelType: number,
  registrationUrl: string,
  registrationTimeText: string,
  processDescription: string,
  tipsList?: string[],
}