/*
 * @Author: WuPeiQi
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-01-28 16:37:20
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-29 09:53:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import React, { FC } from 'react';
import './style.less'

import { useUserInfoStore } from '@/store';

const Setting: FC = (props: any) => {

	const userInfo = useUserInfoStore()

	const groupOne = [
		{
			name: '偏好设置',
			path: '/setting/preference'
		},
		// {
		// 	name: '完善信息',
		// 	path: '/test'
		// },
	]

	const groupTwo = [
		{
			name: '意见反馈',
			path: '/setting/feedback'
		},
		{
			name: '关于我们',
			path: '/setting/about'
		},
		// {
		// 	name: '隐私政策',
		// 	path: '/test'
		// },
		// {
		// 	name: '用户协议',
		// 	path: '/test'
		// },
	]

	const groupThree: any = [
		// {
		// 	name: '退出登录'
		// }
	]

	/**
	 * @description	跳转
	 * @params {string}	path	跳转路径
	 */
	const jumpToPage = (path: string) => {
		props.history.push(path)
	}

	return (
		<div className='setting-wrapper'>
			<ul>
				{
					groupOne.map((item: any, index: number) => (
						<li key={index} onClick={() => jumpToPage(item.path)}>{item.name}</li>
					))
				}
			</ul>
			<ul>
				{
					groupTwo.map((item: any, index: number) => (
						<li key={index} onClick={() => jumpToPage(item.path)}>{item.name}</li>
					))
				}
			</ul>
			<ul>
				{
					groupThree.map((item: any, index: number) => (
						<li key={index}>{item.name}</li>
					))
				}
			</ul>
		</div>
	)
}

export default Setting;