import React, { FC, useState, useEffect } from 'react';

import {queryUrlParams} from '@/utils/function'
import { getExamNewsContent } from './service'
import './newsDetail.less'

const NewsDetail: FC = () => {
    const query = queryUrlParams()
    const [detail, setDetail] = useState<string>('')

    useEffect(() => {
        getData()
    }, [])

    /**
     * 获取数据
     */
    const getData = async () => {
        let params = {
            action: 'getExamNewsContent',
            id: query.id
        }
        try {
            let data: any = await getExamNewsContent(params)
            setDetail(data.result)
        } catch (error) {
            setDetail('')
        }
       
    }

    return (
        <div className='news-detail-wrapper'>
            <p dangerouslySetInnerHTML={{__html:detail}}></p>
        </div>
    )
}

export default NewsDetail;