/*
 * @Author: WuPeiQi
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-01-20 08:11:01
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-29 10:57:46
 */
export interface QuestionsListItem {
  name: string,
  value: string | number
}

export interface SaveFeedbackParams {
  action: string,
  token: string,
  typeids: string,
  content: string,
  files: string
}

export interface ExamPreferenceParams {
  appId: string,
  openId: string,
  action: string,
  preferenceTemplateId?: string
}

export interface PreferenceItem {
  isSelect: boolean,
  preferenceTemplateId: number,
  title: string,
  type: number
}