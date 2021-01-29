import {request} from '@/utils/request'
import {getExamRecheck, saveExamRecheck, smsSend, reconsideration, fee} from './data'

// 详情
const getExamRecheckDetail = (data:getExamRecheck) => request('exam/dispatch', 'post', data)

const saveExamRecheckDetail = (data:saveExamRecheck) => request('exam/dispatch', 'post', data)

// 发送验证码
const sendCode = (data: smsSend) => request('tools/dispatch', 'post', data);

// 获取复议列表
const getExamReconsiderationList = (data: reconsideration) => request('exam/dispatch', 'post', data);

// 获取考试费用列表
const getExamFeeList = (data: fee) => request('exam/dispatch', 'post', data);

export {
    getExamRecheckDetail,
    saveExamRecheckDetail,
    sendCode,
    getExamReconsiderationList,
    getExamFeeList
}