import {request} from '@/utils/request'
import {examContent, examIntroduction, examNewsContent} from './data'


export const getExamContent = (data: examContent) => request('exam/dispatch', 'post', data)

export const getExamIntroductionServer = (data: examIntroduction) => request('exam/dispatch', 'post', data)

export const getExamNewsContent = (data: examNewsContent) => request('exam/dispatch', 'post', data)

