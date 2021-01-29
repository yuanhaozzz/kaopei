import {request} from '@/utils/request'
import {findWechatUrlValue} from '@/utils/function'
import {weChatPublicAccount} from '@/utils/map'
import {unionidLogin, userInfoByToken} from './data'

function common() {
    let type = findWechatUrlValue('type') || 8
    return {
        fromPlatform: weChatPublicAccount[type || 8],
        deviceType: 5
    }
}

const getUnionidLogin = (data: unionidLogin) => request('examuser/dispatch','post', Object.assign({}, data, common()))

const getUserInfoByToken = (data: userInfoByToken) => request('examuser/dispatch','post', Object.assign({}, data, common()), false)

export {
    getUnionidLogin,
    getUserInfoByToken
}