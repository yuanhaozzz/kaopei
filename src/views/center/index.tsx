import React, { FC, Fragment, useEffect, useState } from 'react';

import NotSign from './component/notSign'
import Login from './component/login'
import TwoTab from './component/twoTab'
import WxSDK from '@/components/wxsdk'
import ExamList from './component/examList'
import Guide from './component/guide'
import {queryUrlParams, browserType, findWechatUrlValue} from '@/utils/function'

import {getUnionidLogin, getUserInfoByToken} from './service'
import {unionidLogin} from './data'

import { observer } from 'mobx-react';
import { useUserInfoStore } from '@/store';

import Setting from '@/assets/image/setting.png'
import Banner from '@/assets/image/banner.png'
import './style.less'

const Center = (props: any) => {
	const query: any = queryUrlParams()
	const browser = browserType()	
	const [isLoading, setLoading] = useState<Boolean>(true)
	const [showGudie, setGudie] = useState<string>('')

	const {setToken, setOpenId, getOpenId, getToken, setUserInfo, hasBindedUser} = useUserInfoStore()


	useEffect(() => {
		initialization()
		ready()
	}, [])

	/**
     * @description 微信配置完成
     */
    const ready = () => {
        window.wx.ready(function(){
			window.wx.updateAppMessageShareData({ 
                title: '测试', // 分享标题
                desc: '这是帮助中心啊啊啊啊啊 啊啊啊啊啊啊啊啊啊 啊啊啊啊 啊啊啊啊 啊啊啊啊 啊啊啊啊 啊', // 分享描述
                link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://tms.beiwaiguoji.com//resources/files/upload/recourseQuestionImage/2021/01/22/19/9fb5eb18fe17442694bebbd53e2e24f5.jpg', // 分享图标
                success: function () {
                  // 设置成功
                }
            })
		});
    }

	/**
	 * @description 初始化
	 */
	const initialization = () => {
		let guide: string = localStorage.getItem('guide') || ''
		console.log(guide)
		setGudie(guide)

		if (!getToken) {
			if (!getOpenId) {
				redrectWhchat()
				return
			}
			setLoading(false)
		} else {
			
			getUserInfo()
		}
	}

	/**
	 * 跳转设置
	 */
	const jumpToSetting = () => {
		props.history.push('/setting')
	}

	const redrectWhchat = () => {
		if (browser === 'wechat') {
			// https://preonlineh5.beiwaiguoji.com/koppe/center?type=8
			// snsapi_base 静默	snsapi_userinfo 用户同意
			// 获取code
			let {code, scope = 'snsapi_userinfo', type} = query
			if (!code) {
				window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx805a08ea22095996&redirect_uri=https%3A%2F%2Fpreonlineh5.beiwaiguoji.com%2Fkoppe%2Fcenter&response_type=code&scope=${scope}&state=type=${type || 8}#wechat_redirect`
				return
			}
			if (!getToken) {
				getWechatInfo()
			}
		} else {
			setLoading(false)
		}
	}

	/**
	 * @description		获取用户信息
	 */
	const getUserInfo = async () => {
		let type = findWechatUrlValue('type') || 8
		let params = {
			action: 'getUserInfoByToken',
			token: getToken
		}
		try {
			let data: any = await getUserInfoByToken(params)
			data.userInfo.userInfo.isBeiwai = data.isBeiwai
			data.userInfo.hasBindedUser = 1
			setUserInfo(data.userInfo)
		} catch (error) {
			localStorage.removeItem(`${type}-openId`)
			localStorage.removeItem(`${type}-token`)
			setOpenId('')
			setToken('')
			redrectWhchat()
		}
		
		setLoading(false)
	}

	/**
	 * @description	获取用户信息
	 * @param code {String}		获取微信code
	 */
	const getWechatInfo = async () => {
		let {code} = query
		let type = findWechatUrlValue('type') || 8
		// 考试公众号		KP_BASEGZH
		// TKT考试公众号	KP_TKTGZH
		let params:unionidLogin  = {
			action: 'unionidLogin',
			mpId: type,
			code
		}
		try {
			let data: any = await getUnionidLogin(params)
			let result = data.loginResult
			// 是否绑定用户
			if (result.hasBindedUser === 0) {
				localStorage.setItem(`${type}-openId`, result.openId)
				props.history.replace({
					pathname: '/login/phone',
					search: `?type=${type}`
				})
			} else {
				result.userInfo.isBeiwai = data.isBeiwai
				// 保存数据
				setUserInfo(result)
				setToken(result.token)
				localStorage.setItem(`${type}-token`, result.token)
			}
		} catch (error) {
			if (error === 11015) {
				props.history.replace('/center')
			}
		}
		setLoading(false)
	}

	if (isLoading) {
		return <Fragment></Fragment>
	}

	return (
		<div className='center-wrapper'>
			{/* 个人信息 */}
			<header className="center-header">
				{
					hasBindedUser === 1
					?	
					// 已登录
					<Login />
					:
					// 未登录
					<NotSign {...props}/>
				}
				<div className="flex-center center-setting" onClick={jumpToSetting}>
				<img src={Setting}/>
				</div>
			</header>
			{/* 考试管理 我的订单 */}
			<section className="center-tab">
				<TwoTab {...props}/>
			</section>
			{/* 轮播图 */}
			<section className="center-banner">
				<img src={Banner} alt=""/>
			</section>
			{/* 我的考试 */}
			<section>
				<ExamList {...props}/>
			</section>

			{/* 微信SDK */}
			<WxSDK />
			{
				!showGudie && <Guide {...props}/>
			}
			
		</div>
	)
}

export default observer(Center);