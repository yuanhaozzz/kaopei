import React, { FC, Fragment, useState, useEffect } from 'react';

import {queryUrlParams} from '@/utils/function'
import Hot from '@/assets/image/hot.png'
import './detail.less'
import {listItem, newsData, contentData} from './data'
import {getExamContent, getExamIntroductionServer} from './service'
import TextContainer from './components/textContainer'
import RanderDownTitle from '@/components/randerDownTitle/randerDownTitle'
import {format} from '@/utils/function'


const ExamIntroducedDetail: FC = (props: any) => {
    const query = queryUrlParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [groupId, setGroupId] = useState<number | string>('')
    const [listIndex, setListIndex] = useState<number>(0)
    const [tabIndex, setTabIndex] = useState<number>(0)
    const [isShowSelectList, setShowSelectList] = useState<boolean>(false)
    const [list, setList] = useState<any[]>([])
    const [introducedContent, setIntroducedContent] = useState<any>([{content: []}, {content: []}, {content: []}, {content: []}]
    )
    const tab: string[] = ['最新动态', '评分标准', '证书用途', '报考费用']

    useEffect(() => {
        getData()
        
    }, [])

    useEffect(() => {
        if (list.length > 0) {
            findGroupItemIndex()
        }
    }, [list])


    useEffect(() => {
        if (groupId) {
            getExamIntroduction()
            
        }
    }, [groupId])

    useEffect(() => {
        if (groupId) {
            console.log(introducedContent[tabIndex].content)
            if (!introducedContent[tabIndex].content.length) {
                getExamIntroduction()
            }
        }
    }, [tabIndex])

    useEffect(() => {
        if (list.length > 0) {
            setIntroducedContent([{content: []}, {content: []}, {content: []}, {content: []}])
            setGroupId(list[listIndex].examId)
        }
     
    }, [listIndex])

    /**
	 * @description	获取数据
	 */
	const getData = async () => {
		let params = {
			action: 'getExamContent',
			examContentCode: 'exam_introduction',
			offcialAccountCode: 8
        }
        try {
            let data: any = await getExamContent(params)
            setList(data.examContentList)
        } catch (error) {
            setList([])
        }
    }
    
    /**
     * @description 获取考试介绍
     */
	const getExamIntroduction = async () => {
        const map: any = {
            0: 'latest_news',
            1: 'scoring_criteria',
            2: 'certificate_purpose',
            3: 'registration_fee'
        }
		let params = {
            action: 'getExamIntroduction',
            examContentCode: map[tabIndex],
            examId: groupId
        }
        try {
            let data: any = await getExamIntroductionServer(params)
            introducedContent[tabIndex].content = data.result
        } catch (error) {
            introducedContent[tabIndex].content = []
        } finally{
            setIntroducedContent([...introducedContent])

        }
      
	}

    /**
     * @description 查找分组项下标
     */
    const findGroupItemIndex = () => {
        let {id} = query
        setGroupId(id)
        let index = list.findIndex((item: listItem) => item.examId + '' === id)
        setListIndex(index)
    }

    /**
     * @description 设置选中标题
     * @param index 下标
     */
    const selectTitle = (index:number) => {
        setListIndex(index)
    }

    /**
     * 切换tab
     */
    const switchTab = (index: number) => {
        setTabIndex(index)
    }

    /**
     * @description 跳转动态心情
     * @param {number} id 资讯id
     */
    const jumpToNewsDetail = (id: number) => {
        props.history.push({
            pathname: '/exam/news/detail',
            search: `?id=${id}`
        })
    }

    /**
     * @description 渲染富文本
     */
    const renderRichText = () => {
        return (
            <TextContainer {...props}>
                <div dangerouslySetInnerHTML={{__html:introducedContent[tabIndex].content[0].description}}>

                </div>
            </TextContainer>
           
        )
    }

    /**
     * 渲染最新动态
     */
    const renderNews = () => {
        return (
            <ul className="detail-content-item-news">
                {
                    introducedContent[0].content.map((item: newsData, index:number) => (
                        <li key={index} onClick={() => jumpToNewsDetail(item.id)}>
                            {/* 标题 */}
                            <h3>{item.title}</h3>
                            {
                                item.displayStyleType === 1
                                ?
                                // 封面
                                <div className="item-img flex-center">
                                    <img src={item.coverUrl} alt=""/>
                                </div>
                                :
                                <p className="item-about">{item.about}</p>
                            }
                           
                            <div className="item-bottom flex-space-between">
                                <span>[{format(item.createTime, 'yyyy-MM-dd')}]</span>
                                <button>[详情]</button>
                            </div>
                            {/* 热点图标 */}
                            {
                                item.isHot === 1 && <img src={Hot} className="item-hot"/>
                            }
                        </li>
                    ))
                }
            </ul>
        )
    }

    /**
     * 渲染内容
     */
    const renderContent = () => {
        return (
            <Fragment>
                {
                    tab.map((item: any, index: number) => (
                        <Fragment key={index}>
                            {
                                tabIndex === index && <div className="detail-content-item">
                                    {
                                         introducedContent[tabIndex].content.length > 0 
                                         ? 
                                         index === 0 ? renderNews() : renderRichText()
                                         :
                                         ''
                                    }
                                </div>
                            }
                        </Fragment>
                    ))
                }
            </Fragment>
        )
    }

    /**
     * 渲染选项
     */
    const renderTab = () => {
        return (
            <nav className="detail-tab flex-space-around">
                {
                    tab.map((item: any, index: number) => (
                        <h2 className={tabIndex === index ? 'action' : ''} onClick={() => switchTab(index)} key={index}>
                            {item}
                        </h2>
                    ))
                }
            </nav>
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
        return <Fragment></Fragment>
    }

	return (
		<div className='exam-introduced-detail-wrapper' onClick={(e: any) => setShowSelectList(false)}>

            {/* 标题 */}
            {
                renderTitle()
            }
            {/* 列表 */}
            {
               list.map((item: listItem, index: number) => (
                <Fragment key={index}>
                    {
                        listIndex === index && <div className="detail-list-item">
                            {/* 选项 */}
                            {
                                renderTab()
                            }
                            {/* 内容 */}
                            {
                                renderContent()
                            }
                        </div>
                    }
                </Fragment>
                   
               ))
            }
		</div>
	)
}

export default ExamIntroducedDetail;