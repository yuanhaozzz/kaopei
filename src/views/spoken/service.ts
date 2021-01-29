import {request} from '@/utils/request'
import {spokenOrderList} from './data'

export const getSpokenOrderList = (data: spokenOrderList) => request('exam/dispatch', 'post', data)