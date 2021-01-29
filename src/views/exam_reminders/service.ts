import {request} from '@/utils/request'
import {examContent, enabledExamRemind} from './data'


export const getExamContent = (data: examContent) => request('exam/dispatch', 'post', data)

export const getEnabledExamRemind = (data: enabledExamRemind) => request('exam/dispatch', 'post', data)

