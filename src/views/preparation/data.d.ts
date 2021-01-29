/*
 * @Author: WuPeiQi
 * @description: Preparation数据类型结构声明
 * @path: 引入路径
 * @Date: 2021-01-07 14:27:16
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-21 16:50:52
 */

export interface ExamParams {
  examContentCode: string,
  offcialAccountCode: string | number
}

export interface ExamItem {
  examId: number,
  examName: string,
  coverUrl: string,
  cover?: number,
  status?: number,
  examContentList?: [],
}

export interface HandbookItem {
  id: number,
  examId: number,
  mattersNeedAttention: string,
  accompanyingArticle: string,
  examPreparationProcessList: []
}

export interface ProcessItem {
  id: number,
  name: string,
  examPreparationId: number,
  imageUrl: string,
}

