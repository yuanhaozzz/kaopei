import { request } from '@/utils/request';
import { SendMailCodeParams, SendPhoneCodeParams } from './data';


const sendMailCode = (data: SendMailCodeParams) => request('exam/dispatch', 'post', data);

const sendPhoneCode = (data: SendPhoneCodeParams) => request('tools/dispatch', 'post', data);

export {
  sendMailCode,
  sendPhoneCode
}