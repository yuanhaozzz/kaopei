import React, { FC, useState, useEffect, Fragment } from 'react';
import './style.less'
import DownSelect from '@/assets/image/down-select.png'
import DownSelectComponent from '@/views/exam_introduced/components/downSelect'
import {newsData} from '@/views/exam_introduced/data'
import Empty from '@/components/empty/list'
import RanderDownTitle from '@/components/randerDownTitle/randerDownTitle'
import {getExamContent, getEnabledExamRemind} from './service'
import {format} from '@/utils/function'

const ExamReminders: FC = () => {
	const [list, setList] = useState<any[]>([])
	const [news, setNews] = useState<newsData[]>([])
    const [listIndex, setListIndex] = useState<number>(0)
	const [isShowSelectList, setShowSelectList] = useState<boolean>(false)


	useEffect(() => {
        getData()
    }, [])

	useEffect(() => {
		if (list.length > 0) {
			getExamRemind()
		}
	}, [list])

	useEffect(() => {
		if (list.length > 0) {
			getExamRemind()
		}
	}, [listIndex])
	

	
    /**
	 * @description	获取数据
	 */
	const getData = async () => {
		let params = {
			action: 'getExamContent',
			examContentCode: 'bw_candidate',
			offcialAccountCode: 8
        }
		
        try {
			let data: any = await getExamContent(params)
			setList(data.examContentList)
        } catch (error) {
            setList([])
        }
	}
	
	const getExamRemind = async () => {
		let paramsExamList = {
			action: 'getEnabledExamRemindList',
			examId: list[listIndex].examId,
		}
		try {
			let examList: any = await getEnabledExamRemind(paramsExamList)
			setNews(examList.result)
		} catch (error) {
			setNews([])
		}
		
	}

	/**
     * @description 设置选中标题
     * @param index 下标
     */
    const selectTitle = (index:number) => {
        setListIndex(index)
	}

	/**
	 * @description 处理天数
	 * @param {string}	createTime 	创建时间
	 */
	const handleDate = (createTime: string) => {
		let currentTime = +new Date(),
			targetTime = +new Date(createTime);
		return Math.round((targetTime - currentTime) / 1000 / 60 / 60 / 24)
	}

	/**
	 * @description	处理北京
	 * @param {number} date		天
	 */
	const handleBackground = (date: number) => {
		if (date < 7) {
			return 'one'
		} else if (date >= 7 && date < 14) {
			return 'two'
		} else {
			return 'three'
		}
	}

	

	/**
	 * 渲染列表
	 */
	const renderList = () => {
		return (
			<ul className="exam-reminders-list">
				{
					news.map((item: newsData, index: number) => (
						<li key={index}>
							{/* 标题 */}
							<h3>{item.title}</h3>
							{/* 简介 */}
							<span>{item.content}</span>
							<div className="item-bottom flex-space-between">
							{
								handleDate(item.createTime) > 0 ? <p className={`item-bottom-date ${handleBackground(handleDate(item.createTime))}`}>{handleDate(item.createTime)}天后开考</p> : ''
							}
								<p className="item-bottom-time">{format(item.createTime, 'yyyy-MM-dd')}</p>
							</div>
							
						</li>
					))
				}
			</ul>
		)
	}
	
	/**
     * 渲染标题
     */
    const renderTitle = () => {
        return (
			<RanderDownTitle list={list} callback={selectTitle}/>
        )
	}

	if (!list.length) {
		return <Empty/>
	}

	return (
		<div className='exam-reminders-wrapper' onClick={(e: any) => setShowSelectList(false)}>
			{
				renderTitle()
			}
			{
				!news.length ? <Empty/> : renderList()
			}
		</div>
	)
}

export default ExamReminders;