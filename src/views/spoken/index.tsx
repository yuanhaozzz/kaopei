import React, { FC, useState, useEffect, Fragment } from 'react';

import './style.less'
import {getSpokenOrderList} from './service'
import {listItem, spokenItem} from './data'
import RanderDownTitle from '@/components/randerDownTitle/randerDownTitle'
import DateImag from '@/assets/image/date.png'
import DateCopyImag from '@/assets/image/date-copy.png'
import AddressImag from '@/assets/image/address.png'
import {weekMap} from '@/utils/function'

import {useUserInfoStore} from '@/store'
const Spoken: FC = () => {

    const [list, setList] = useState<listItem[]>([])
    const [listIndex, setListIndex] = useState<number>(0)
    const {getToken} = useUserInfoStore()

    useEffect(() => {
        getData()
    }, [])

    /**
     * @description 获取数据
     */
    const getData = async () => {
        let params = {
            action: 'getSpokenOrderList',
            token: getToken
        }
        let data: any = await getSpokenOrderList(params)
        console.log(data, 'data')
        setList(data.examBatchList)
    }

    /**
     * 选中标题
     * @param {any}     e       时间
     * @param {number}  index   选中下标
     */
    const selectTitle = (index: number) => {
        setListIndex(index)
    }

    /**
     * @description     周
     * @param date {string}    日期
     */
    const formatWeek = (date: string) => {
        let data = new Date(date),
            week = data.getDay();
        return weekMap[week]
    }

    /**
     * @description     小时
     * @param startTime {string}    
     */
    const formatHoure = (startTime: string ) => {
        let time = parseInt(startTime)
        let str = '晚上'
        if (time > 8 && time <= 12) {
            str = '上午'
        } else if (time > 12 && time < 19) {
            str = '下午'
        }
        return str
    }

    /**
     * 渲染列表
     */
    const renderList = () => {
        return (
            <section className="spoken-list">
                <h2 className="spoken-list-title">考生的口语考试安排如下</h2>
                <ul className="spoken-list-container">
                    {
                        list[listIndex].spokenOrderList && list[listIndex].spokenOrderList.map((item: spokenItem, index: number) => (
                            <li key={index}>
                                <h3 className="item-title">预计考试时间</h3>
                                <div className="item-box flex-center">
                                    <div className="item-list flex-start">
                                        <img src={DateImag} />
                                        <span>{item.examDate}，{formatWeek(item.examDate)}</span>
                                    </div>
                                    <div className="item-list flex-start">
                                        <img src={DateCopyImag} />
                                        <span>{item.startTime} - {item.endTime}，{formatHoure(item.startTime)}</span>
                                    </div>
                                    <div className="item-list flex-start">
                                        <img src={AddressImag} />
                                        <span>{item.testSiteName}</span>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                   
                </ul>
                <p className="spoken-text">家长可以在预计时间结束后，到达接考生处等待</p>
            </section>
        )
    }

    /**
     * 渲染页首
     */
    const renderHeader = () => {
        return (
            <header className="spoken-header flex-center">
                <RanderDownTitle list={list} callback={selectTitle}/>
            </header>
        )
    }

    if (!list.length) {
        return <Fragment></Fragment>
    }

    return (
        <div className='spoken-wrapper'>
            {
                renderHeader()
            }
            {
                renderList()
            }
        </div>
    )
}

export default Spoken;