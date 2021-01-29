import React, {FC} from 'react'

import { useUserInfoStore } from '@/store';

import './login.less'

const Login: FC = () => {
    
    const userInfoStore = useUserInfoStore()
    return (
        <div className="center-login-wrapper flex-start">
            <img src={userInfoStore.getUserInfo.headImgUrl} className="center-avatar"/>
            <div className="center-right">
                <p>{userInfoStore.getUserInfo.nickname}</p>
                <p>{userInfoStore.getUserInfo.mobile}</p>
            </div>
        </div>
    )
}

export default Login