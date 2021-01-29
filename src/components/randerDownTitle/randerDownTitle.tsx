import React, { useEffect, useState } from 'react';

import {queryUrlParams} from '@/utils/function'
import DownSelectComponent from './downSelect'
import DownSelect from '@/assets/image/down-select.png'
import './randerDownTitle.less'
import { createPublicKey } from 'crypto';

interface Props{
    list: any[]
    callback: Function
}

const RanderDownTitle = (props: Props) => {
    const [isShowSelectList, setShowSelectList] = useState<boolean>(false)
    const [listIndex, setListIndex] = useState<number>(0)
    const query = queryUrlParams()

    useEffect(() => {
        console.log(props.list, 'props.list------------')
        findGroupItemIndex()
    }, [])

    /**
     * @description 查找分组项下标
     */
    const findGroupItemIndex = () => {
        let {id} = query
        let index = props.list.findIndex((item: any) => item.examId + '' === id)
        setListIndex(index < 0 ? 0 : index)
    }

    /**
     * @description 设置选中标题
     * @param index 下标
     */
    const selectTitle = (e: any, index:number) => {
        e.stopPropagation()
        setShowSelectList(false)
        setListIndex(index)
        props.callback(index)
    }

    /**
     * @description 处理点击
     */
    const handleclick = (e: any) => {
        e.stopPropagation()
        setShowSelectList(!isShowSelectList)

    }

    return (
        <div className='rander-down-title-wrapper'>
            <h1 className="flex-center" onClick={(e: any) => handleclick(e)}>
                {
                    props.list[listIndex].examName
                }
            
                <img src={DownSelect} alt="" className={isShowSelectList ? '' : 'action'}/>
            </h1>
            {
                isShowSelectList && <DownSelectComponent list={props.list} selectTitle={selectTitle}/>
            }
        </div>
    )
}

export default RanderDownTitle;