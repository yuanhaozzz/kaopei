import React, {FC} from 'react'

import {findWechatUrlValue} from '@/utils/function'
import Avatar from '@/assets/image/user_avatar.jpg'
import './notSign.less'

const NotSign: FC = (props: any) => {

    const jumpToLogin = () => {
        let type = findWechatUrlValue('type') || 8
        props.history.push({
            pathname: '/login/phone',
            search: `?type=${type}`
        })
    }

    return (
        <div className="center-not-sign-wrapper flex-start">
            <img src={Avatar} className="center-avatar"/>
            <div className="center-right flex-center">
                <div className="center-right-box">
                    <button onClick={jumpToLogin}>登录/注册</button>
                    <p>添加考试信息获取定制服务</p>
                </div>
            </div>
        </div>
    )
}

export default NotSign