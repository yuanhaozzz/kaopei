export interface SendMailCodeParams {
  token: string,
  email: string
}

export interface CheckMailCodeParams {
  action: string,
  token: string,
  validateCode: string | number,
}

export interface CheckoutParams {
  action: string,
  smsSignId: string | number,
  smsTemplateId: string | number,
  validateCode: string | number,
  mobile: string | number
}

export interface ExamProjectListPramas {
  action: string,
  token: string,
  isBwStatus: string | number
}

export interface ExamDetailList {
  checkbox: string | number,
  examBatch: string | number,
  examBatchId: string | number,
  examId: string | number,
  examItemsDate: string | number,
  examItemsId: string | number,
  examItemsName: string | number,
  examItemsRepelIds: []
  examName: string | number,
  id: string | number,
  prodPrice: string | number,
  regTimeEnd: string | number,
  regTimeStart: string | number,
}

export interface UserInfoParams {
  userName: string,
  lastName: string,
  firstName: string,
  gender: string,
  idNum: string,
  birthday: string,
  mail: string,
  phone: string,
  code: string,
}

export interface completeOrderParams {
  action: string,
  token: string,
  birthday: string,
  checkCode:  string,
  email: string,
  firstNamePinyin: string,
  lastNamePinyin: string,
  fullNameCn: string,
  gender: string,
  idNumber: string,
  isBwStatus: number,
  phone: string,
  prodIds: string,
}