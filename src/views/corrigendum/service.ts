import { request } from '@/utils/request';
import { CorrigendumParams, ValidateCodeParams,  } from './data.d';

const completeCorrigendum = (param: CorrigendumParams) => request('exam/dispatch', 'post', param);

const validateCode = (param: ValidateCodeParams) => request('tools/dispatch', 'post', param);

const getExamList = (data: any) => request('exam/dispatch', 'post', data, false)

export {
  completeCorrigendum,
  validateCode,
  getExamList
}