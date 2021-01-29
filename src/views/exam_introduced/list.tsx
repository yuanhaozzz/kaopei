import React, { FC, Fragment, useEffect, useState } from 'react';

import {getExamContent} from './service'
import Empty from '@/components/empty/list'
import './list.less'
import {listItem} from './data'


const ExamIntroducedList: FC = (props: any) => {
	const [list, setList] = useState<any[]>([])

	useEffect(() => {
		getData()
	}, [])

	/**
	 * @description	获取数据
	 */
	const getData = async () => {
		let params = {
			action: 'getExamContent',
			examContentCode: 'exam_introduction',
			offcialAccountCode: 8
		}
		let data: any = await getExamContent(params)
		setList(data.examContentList)
		console.log(data)
	}

	/**
	 * @description 跳转详情
	 */
	const jumpToDetail = (item: listItem) => {
		props.history.push({
			pathname: '/exam/introduced/detail',
			search: `?id=${item.examId}`
		})
	}

	if (!list.length) {
		return <Empty />
	}

	return (
		<div className='exam-introduced-list-wrapper'>
			<ul className="list-container flex-space-between">
				{
					list.map((item: listItem) => (
							<li className="flex-center">
								<img src={item.coverUrl} onClick={() => jumpToDetail(item)} key={item.examId}/>
							</li>
					))
				}
			</ul>
		</div>
	)
}

export default ExamIntroducedList;