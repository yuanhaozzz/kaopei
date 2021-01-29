import React, {Fragment, useEffect, useState} from 'react'

import Empty from '@/components/empty/list'

import {locationInterface, batchListItem, navigationItem} from './data'
import MapShow from '@/assets/image/map_show.png'
import {getNavigationList} from './service'
import {useUserInfoStore} from '@/store'
import './style.less'


const ExamNavigation = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [batchList, setBatchList] = useState<batchListItem[]>([])
    const [batchIndex, setBatchIndex] = useState<number>(0)

    const {getToken} = useUserInfoStore()

    useEffect(() => {
        getData()
    }, [])

    /**
     * @description 获取数据
     */
    const getData = async () => {
        let params = {
            action: 'getTestCenterNavigationList',
            token: getToken
        }
        try {
            let data: any = await getNavigationList(params)
            setBatchList(data.examBatchList)
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }

    /**
     * @description 打开地图
     * @param item {Object} 当前考试
     */
    const openMap = (item: navigationItem) => {
        let {googleLat, googleLng, testSiteName} = item
        window.wx.openLocation({
            latitude: googleLat, // 纬度，浮点数，范围为90 ~ -90
            longitude: googleLng, // 经度，浮点数，范围为180 ~ -180。
            name: testSiteName, // 位置名
            address: testSiteName, // 地址详情说明
            scale: 16, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
          })
    }
    

    /**
     * @description 渲染内容
     */
    const renderContent = () => {
        if (!batchList[batchIndex].testCenterNavigationList) {
            return <Fragment></Fragment>
        }
        let {testCenterNavigationList} = batchList[batchIndex]

        return (
            <ul className="exam-navigation-content">
                {
                    testCenterNavigationList.map((item: navigationItem, index: number) => (
                        <li key={index}>
                            {/* 考试分类 */}
                            <div className="content-title flex-space-between">
                                <h3>{item.examItemsName}</h3>
                                <div className="content-title-map flex-center" onClick={() => openMap(item)}>
                                    <img src={MapShow}/>
                                </div>
                            </div>
                            {/* 考试时间 */}
                            <div className="content-box flex-start">
                                <h3>考试时间：</h3>
                                <span>{item.examDate}</span>
                            </div>
                            {/* 考点 */}
                            <div className="content-box flex-start">
                                <h3>考&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：</h3>
                                <span>{item.testSiteName} 1103</span>
                            </div>
                        </li>
                    ))
                }
                
            </ul>
        )
    }

    /**
     * @description 渲染导航
     */
    const renderNav = () => {
        let {examName, candidateName, batchName} = batchList[batchIndex]
        return (
            <nav className="exam-navigation-nav flex-space-between">
                <div className="nav-left">
                    <h3>{examName}</h3>
                    <p className="nav-left-info flex-start">
                        <span>{candidateName}</span>
                        <span>（考试批次：{batchName}）</span>
                    </p>
                </div>
                <button className="nav-right-button">切换考试</button>
            </nav>
        )
    }

    if (loading) {
        return <Fragment></Fragment>
    }

    if (!batchList.length) {
        return <Empty/>
    }

    return (
        <div className="exam-navigation-wrapper">
            {
                renderNav()
            }
            {
                renderContent()
            }

            <select name="" id="">
                <option value="a">a</option>
                <option value="b">b</option>
                <option value="c">c</option>
            </select>
        </div>
    )

}

export default ExamNavigation