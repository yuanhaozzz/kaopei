export interface SendMailCodeParams {
  action: string,
  token: string,
  email: string | number
}

export interface SendPhoneCodeParams {
  action: string,
  smsSignId: string | number,
  smsTemplateId: string | number,
  mobile: string | number,
  validateCode: string | number
}