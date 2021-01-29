import { request } from '@/utils/request';
import { CheckoutParams, CheckMailCodeParams, ExamProjectListPramas, completeOrderParams} from '../../views/tkt/data';

const CheckCode = (data: CheckoutParams) => request('tools/dispatch', 'post', data);

const CheckMailCode = (data: CheckMailCodeParams) => request('exam/dispatch', 'post', data);

const getExamProjectList = (data: ExamProjectListPramas) => request('exam/dispatch', 'post', data);

const completeOrder = (data: completeOrderParams) => request('exam/dispatch', 'post', data)

export {
  CheckCode,
  CheckMailCode,
  getExamProjectList,
  completeOrder
}