import React, {Fragment, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useUserInfoStore } from '@/store';
import {findWechatUrlValue} from '@/utils/function'
import routes from './config'

function RouteGuard(props: any) {
    const {setToken, setOpenId, setMpId} = useUserInfoStore()

    let pathname = props.location.pathname
    let targetRouter = routes.find((item: any) => item.path === pathname)
    if (!targetRouter) {
        return <Redirect to='/404' />
    }
    document.title = targetRouter.meta.title

    /**
     * @description 设置用户信息提供全局
     */
    const setUser = () => {
        let type = findWechatUrlValue('type') || '8'
        let token: any = localStorage.getItem(`${type}-token`)
        let openId: any = localStorage.getItem(`${type}-openId`)
        // '/center', '/login/phone', '/exam/introduced/list', '/exam/introduced/detail', '/preparation', '/signup/process', ''
        // let whiteList = []

        setMpId(type)
        if (token) {
            setToken(token)
        } else {
            // if (!whiteList.includes(props.location.pathname)) {
            //     window.location.href = '/koppe/center'
            // }
        }
        if (openId) {
            setOpenId(openId)
        }
    }
    setUser()

    return (
        <Route exact path={pathname} component={targetRouter.component} />
    )
}

export default RouteGuard