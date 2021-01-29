import React, {} from 'react'
import './list.less'

interface Props{
    text?: string
}

const EmptyList = (props: Props) => {
    const {text} = props

    return (
        <div className="empty-list-wrapper">{text ? test : '暂无数据'}</div>
    )
}

export default EmptyList