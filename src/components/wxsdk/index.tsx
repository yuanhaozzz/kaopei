import React, { FC, Fragment, useEffect } from 'react';

import {browserType} from '@/utils/function'
import {getShareConf} from './service'
import {useUserInfoStore} from '@/store'
import {APPID} from '@/utils/map'

const WxSDK: FC = () => {

    let {mpId} = useUserInfoStore()
    const browser = browserType()	
    
    useEffect(() => {
        if (browser === 'wechat') {
            getConfig()
            error()
            ready()
        }
        
    }, [])

    /**
     * @description 获取配置
     */
    const getConfig = async() => {
        let params = {
            action: 'getShareConf',
            mpId,
            url: window.location.href,
            timestamp: +new Date()
        }
        let data: any = await getShareConf(params)
        let {noncestr, signature, ticket, timestamp} = data.wxShareConf
        setConfig(timestamp, noncestr, signature)
    }

    /**
     * 微信配置
     */
    const setConfig = (timestamp: number, nonceStr: string, signature: string) => {
        window.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: APPID[mpId], // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature,// 必填，签名
            jsApiList: [
                'updateAppMessageShareData',
                'updateTimelineShareData',
                'hideMenuItems',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'openLocation',
                'getLocation'
            ] // 必填，需要使用的JS接口列表
          });
    }

    /**
     * @description 错误
     */
    const error = () => {
        window.wx.error((res: any) => {
            console.log(res, '---')
        })
    }

    /**
     * @description 微信配置完成
     */
    const ready = () => {
        window.wx.ready(function(){});
    }

    return (
        <Fragment></Fragment>
    )
}

export default WxSDK;