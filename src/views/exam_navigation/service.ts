import {request} from '@/utils/request'
import {navigationList} from './data'

const getNavigationList = (data: navigationList) => request('exam/dispatch', 'post', data)

export {
    getNavigationList
}