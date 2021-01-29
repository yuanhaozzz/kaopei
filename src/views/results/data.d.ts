/*
 * @Author: WuPeiQi
 * @description: 成绩页面数据结构声明
 * @path: 引入路径
 * @Date: 2021-01-22 11:09:26
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-28 19:36:45
 */

export interface ExamScoreDistributionParams {
  examId: number | string,
  examBatchId: number | string,
  scoreJson: string,
  action: string
}

export interface InquireExamItem {
  examId: number,
  examName: string,
  officialWebsite: string,
  scoreAnalysisShowStatus: number,
}

export interface ExamBatchItem {
  batch: string,
  examBatchId: number,
  examId: number
}

export interface FormData {
  [key:number]: string | number,
}

export interface ExamScoreItem {
  examId: number,
  examScoreItemsId: number,
  scoreItemsName: string,
}

export interface AnalyseExamItem {
  examId: number,
  examName: string,
  scoreAnalysisShowStatus: number,
  examBatchList?: ExamBatchItem[],
  examScoreItemsList?: ExamScoreItem[]
}

export interface ExamAnalysisData {
  remark: string,
  examScoreItemsId?: number,
  score?: number,
  scoreItemsName?: string,
}

export interface ExamScoreSegment {
  maxScore: string,
  minScore: string,
  rate: string,
  scoreSegmentName: string,
}

export interface ScoreDistributionItem {
  batch: string,
  itemsType: number,
  avgScore: number,
  maxScore: number,
  score: number,
  excellentRate: string,
  goodRate: string,
  passRate: string,
  scoreSegmentName: string,
  scoreItemsName?: string,
  examScoreSegmentList: ExamScoreSegment[]
}