import React, { FC } from 'react';

import ExamImg from '@/assets/image/exam.png'
import OrderImg from '@/assets/image/order.png'
import './twoTab.less'

interface listItem {
    name: string;
    image: string;
    path: string;
}

const TwoTab = (props: any) => {
	const list: listItem[] = [
        {
			name: '考试管理',
			image: ExamImg,
            path: '/exam/management'
		},
        {
			name: '我的订单',
			image: OrderImg,
            path: '/order'
		},
	]

	/**
	 * @description	跳转页面
	 * @params	path {string}	路径
	 */
	const jumpToPage = (path: string) => {
		// 引导组件隐藏
		let guide = localStorage.getItem('guide')
		if (!guide) {
			localStorage.setItem('guide', '1');
		}
		props.history.push(path)
	}

	return (
		<div className='two-tab-wrapper flex-start'>
			{
				list.map((item: listItem, index: number) => (
					<div className="two-tab flex-center" key={index} onClick={() => jumpToPage(item.path)}>
						<img src={item.image} alt=""/>
						<h3>{item.name}</h3>
					</div>
				))
			}
		</div>
	)
}

export default TwoTab;