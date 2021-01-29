import {request} from '@/utils/request'

import {examList, examAdd, smsSend, examInfo} from './data'

// 批次列表
const getExamListForAdd = (data: examList) => request('exam/dispatch', 'post', data)

// 获取考试详情
const getExamDetailForAdd = (data: examAdd) => request('exam/dispatch', 'post', data)

// 添加考试信息
const addExamInfo = (data: examInfo) => request('exam/dispatch', 'post', data)

// 发送验证码
const sendCode = (data: smsSend) => request('tools/dispatch', 'post', data)

export {
    getExamListForAdd,
    getExamDetailForAdd,
    sendCode,
    addExamInfo
}