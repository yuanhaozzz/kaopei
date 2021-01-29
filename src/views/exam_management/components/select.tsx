import React, {Fragment, useState, useImperativeHandle} from 'react'

import {format} from '@/utils/function'
import './select.less'

interface itemList {
    name: string;
    batch: string | number;
}
interface Props{
    list: itemList[];
    callback: Function;
    childRef: any;
}
const Select = (props: Props) => {
    let {list, callback, childRef} = props
    let [display, setDisplay] = useState<boolean>(false)

    useImperativeHandle(childRef, () => ({
        handleDisplay: (status: boolean) => {
          return handleDisplay(status)
        }
    }))

    /**
     * @description 处理显示
     * @param status {boolean}  true 显示 false 隐藏
     */
    const handleDisplay = (status: boolean) => {
        setDisplay(status)
    }

    /**
     * @description 点击
     */
    const click = (index: number) => {
        setTimeout(() => {
            handleDisplay(false)
        }, 0);
        callback(index)
    }

    return (
        <Fragment>
            {
                display ? <ul className="select-wrapper">
                    {
                        list.map((item: itemList, index: number) => (
                            <li key={index} onClick={() => click(index)}>
                                {item.name || format(item.batch, 'yyyy年MM月dd日')}
                            </li>
                        ))
                    }
                </ul>
                :
                <Fragment></Fragment>
            }
        </Fragment>
       
    )
}

export default Select