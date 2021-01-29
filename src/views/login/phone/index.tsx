import React, { FC, useEffect, useState } from 'react';

import { useUserInfoStore } from '@/store';
import {toast, findWechatUrlValue} from '@/utils/function'
import {sendCode, bindMobileAndLogin} from './service'
import './style.less'

let timer: any = null
const PhoneLogin: FC = (props: any) => {
	const [phone, setPhone] = useState<number | string>('')
	const [count, setCount] = useState<number>(0)
	const [code, setCode] = useState<string | number>('')

	const {setOpenId, getOpenId, setUserInfo, setToken} = useUserInfoStore()

	useEffect(() => {
		
	}, [])

	useEffect(() => {
		if (count === 60) {
			timer = setInterval(() => {
				setCount((count: number) => count - 1)
			}, 1000);
		} else if (count === 0) {
			clearInterval(timer)
		}
	}, [count])

	/**
	 * 获取验证码
	 */
	const getCode = async () => {
		if (count !== 0) {
			return
		}
		let validReg = /^[1]([3-9])[0-9]{9}$/
		// 手机号码验证
		if (!validReg.test((phone as string))) {
			toast('error', "请输入正确的手机号码")
			return
		}
		setCount(60)
		let params = {
			action: 'smsSend',
			smsSignId: 5,
			smsTemplateId: 3,
			mobile: phone,
			validateCode: 6,
			deviceType: 5
		}
		try {
			let data = await sendCode(params);
			toast('success', `验证码已发送至${(phone as string).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}，请注意查收`)
		} catch (error) {
			
		}
	}

	/**
	 * @description 手机号
	 */
	const change = (e: any) => {
		let target = e.target
		switch(target.name) {
			case 'phone':
				setPhone(e.target.value)
				break;
			case 'code':
				setCode(e.target.value)
				break;
		}
	}

	/**
	 * @description 格式化日期
	 */
	const formatCount = () => {
		return count > 9 ? count : '0' + count
	}

	/**
	 * @description 登录
	 */
	const login = async() => {
		if (!code) {
			toast('error', "请输入验证码")
			return
		}
		let type = findWechatUrlValue('type') || 8
		let params = {
			action: 'bindMobileAndLogin',
			mpId: type,
			openId: getOpenId,
			mobile: phone,
			smsCode: code,
		}
		try {
			let data: any = await bindMobileAndLogin(params)
			let result = data.loginResult
			result.userInfo.isBeiwai = data.isBeiwai
			// 保存数据
			setUserInfo(result)
			setToken(result.token)
			localStorage.setItem(`${type}-token`, result.token)
			props.history.replace({
				pathname: '/center',
				search: `?type=${type}`
			})
		} catch (error) {
			if (error === 11013) {
				localStorage.removeItem(`${type}-token`)
				localStorage.removeItem(`${type}-openId`)
				props.history.replace({
					pathname: '/center',
					search: `?type=${type}`
				})
			}
		}
	}


	return (
		<div className='phone-login-wrapper'>
			<h1 className="login-title">手机号登录</h1>
			{/* 表单 */}
			<div className="login-form">
				<h3>手机号</h3>
				<input type="number" placeholder="请输入手机号" name='phone' maxLength={11} className="login-form-phone" value={phone} onChange={change}/>
				<h3>验证码</h3>
				<div className="flex-start code-container">
					<input type="tel" placeholder="请输入验证码" maxLength={6} className="login-form-code" value={code} name="code" onChange={change}/>
					<button className="login-form-send-button" onClick={getCode}>{count === 0 ? '获取验证码' : formatCount() + 's'}</button>
					<i></i>
				</div>
				<button className="login-form-button" onClick={login}>立即登录</button>
				<div className="login-form-foot">
				登录即代表同意
				<a>《用户协议》</a>
				和
				<a>《隐私政策》</a>
				</div>
			</div>
		</div>
	)
}

export default PhoneLogin;