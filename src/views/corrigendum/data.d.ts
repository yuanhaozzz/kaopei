export interface CorrigendumParams {
  examId: string | number,
  examBatchId: string | number,
  examItemId?: string | number,
  examCandidateNumber: string | number,
  examCandidateName: string,
  idNumber: string | number,
  firstNamePinyin: string,
  lastNamePinyin: string,
  idNumberImgUrl: string | number,
  phone: string | number,
  token: string,
}

export interface ValidateCodeParams {
  action: string,
  smsSignId: string | number,
  smsTemplateId: string | number,
  validateCode: string | number,
  mobile: string | number
}


export interface examList{
  action: string;
  token: string;
}

export interface examItem{
  examBatchId: number;
  examBatch: number;
  examBatchexamCandidateName: string;
  examCandidateNumber: string | number;
  firstNamePinyin: string;
  lastNamePinyin: string;
  idNumber: string | number;
  examName: string;
  examCandidateName: string;
  examId: number;
  showCorrigendum: number;
  showRecheck: number;
  examItemId: number;
  checkContent: string;
  examRecheck: any;
  candidateCorrigendum: any;
}