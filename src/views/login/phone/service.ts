import {request} from '@/utils/request'
import {smsSend, bindMobile} from './data'
import {findWechatUrlValue, sign} from '@/utils/function'
import {weChatPublicAccount} from '@/utils/map'

// 发送验证码
const sendCode = (data: smsSend) => request('tools/dispatch', 'post', data);

// 绑定手机号登录
const bindMobileAndLogin = (data: bindMobile) => request('examuser/dispatch', 'post', data);



export {
    sendCode,
    bindMobileAndLogin
}
