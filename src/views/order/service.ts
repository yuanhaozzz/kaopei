import { request } from '@/utils/request';

const getOrderList = (data: {action: string, token: string}) => request('exam/dispatch', 'post', data);

export {
  getOrderList
}