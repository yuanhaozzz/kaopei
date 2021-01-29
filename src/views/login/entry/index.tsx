import React, { FC } from 'react';

import ExamEntry from '@/assets/image/exam-entry.png'
import './style.less'

const LoginEntry: FC = (props: any) => {

	const jumpToWechat = () => {
		window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx805a08ea22095996&redirect_uri=https%3A%2F%2Fpreonlineh5.beiwaiguoji.com%2Fkoppe%2Fcenter&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
	}

	const jumpToPhoneLogin = () => {
		props.history.push('/login/phone')
	}

	return (
		<div className='login-entry-wrapper'>
			{/* 图片 */}
			<img src={ExamEntry} className="login-entry-header-img"/>
			{/* 登录 */}
			<button className="login-button wechat" onClick={jumpToWechat}>微信登录</button>
			<button className="login-button phone" onClick={jumpToPhoneLogin}>手机号登录</button>
			{/* 协议 */}
			<p className="login-text">登录即代表同意<a>《用户协议》</a>和<a>《隐私政策》</a></p>
		</div>
	)
}

export default LoginEntry;