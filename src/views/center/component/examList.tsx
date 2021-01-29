import React, { FC,useState } from 'react';

import {toast} from '@/utils/function'
import './examList.less'
// 考试提醒
import RemindShow from '@/assets/image/remind_show.png'
import RemindDisable from '@/assets/image/remind_disable.png'
// 信息勘误
import InfoShow from '@/assets/image/info_show.png'
import InfoDisable from '@/assets/image/info_disable.png'
// 考点导航
import MapShow from '@/assets/image/map_show.png'
import MapDisable from '@/assets/image/map_disable.png'
// 口试顺序
import OralShow from '@/assets/image/oral_show.png'
import OralDisable from '@/assets/image/oral_disable.png'
// 成绩查看
import ResultShow from '@/assets/image/result_show.png'
import ResultDisable from '@/assets/image/result_disable.png'
// 成绩复议
import ReconsiderationShow from '@/assets/image/reconsideration_show.png'
import ReconsiderationDisable from '@/assets/image/reconsideration_disable.png'
// 证书邮寄
import CertificateShow from '@/assets/image/certificate_show.png'
import CertificateDisable from '@/assets/image/certificate_disable.png'
// 成绩分析
import AnalysisShow from '@/assets/image/analysis_show.png'
import AnalysisDisable from '@/assets/image/analysis_disable.png'
// TKT报名
import TKTsisShow from '@/assets/image/TKT_show.png'
import TKTDisable from '@/assets/image/TKT_disable.png'

import {useUserInfoStore} from '@/store'
interface listItem {
    name: string;
    show: string;
    disable: string;
    path: string;
}


const ExamList: FC = (props: any) => {

    const {getUserInfo} = useUserInfoStore()

    const list: listItem[] = [
        {
            name: '考试提醒',
            show: RemindShow,
            disable: RemindDisable,
            path: '/exam/reminders'
        },
        {
            name: '信息勘误',
            show: InfoShow,
            disable: InfoDisable,
            path: '/corrigendum'
        },
        {
            name: '考点导航',
            show: MapShow,
            disable: MapDisable,
            path: '/exam/navigation'
        },
        {
            name: '口试顺序',
            show: OralShow,
            disable: OralDisable,
            path: '/spoken'
        },
        {
            name: '成绩查看',
            show: ResultShow,
            disable: ResultDisable,
            path: '/results/inquire'
        },
        {
            name: '成绩复议',
            show: ReconsiderationShow,
            disable: ReconsiderationDisable,
            path: '/results/reconsider'
        },
        {
            name: '证书寄送',
            show: CertificateShow,
            disable: CertificateDisable,
            path: '/certificate'
        },
        {
            name: '成绩分析',
            show: AnalysisShow,
            disable: AnalysisDisable,
            path: '/results/analyse'
        },
        {
            name: 'TKT报名',
            show: TKTsisShow,
            disable: TKTDisable,
            path: '/tkt'
        },
    ]

    /**
     * @description 跳转页面
     */
    const jumpToPage = (path: string) => {
        if (!getUserInfo.isBeiwai) {
            toast('error', '请添加考试后使用该功能')
            return 
        }
        console.log(props)
        props.history.push(path)
    }

    return (
        <div className='exam-list-wrapper'>
            {/* 标题 */}
            <div className="exam-list-title">
                <h1>我的考试</h1>
                <span>此类内容只服务于在北外国际参加考试的考生</span>
            </div>
            {/* 列表 */}
            <ul className="exam-list-container flex-space-between">
                {
                    list.map((item:listItem, index: number) => (
                        <li key={index} onClick={() => jumpToPage(item.path)}>
                            <img src={getUserInfo.isBeiwai ? item.show : item.disable} />
                            <h3>{item.name}</h3>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default ExamList;