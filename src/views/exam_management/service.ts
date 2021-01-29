import {request} from '@/utils/request'
import {examList} from './data'

const getExamList = (data: any) => request('exam/dispatch', 'post', data, false)

export {
    getExamList
}