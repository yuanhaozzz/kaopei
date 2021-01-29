import React, {Fragment, useState, forwardRef, useImperativeHandle} from 'react'

import './message.less'

interface Props{
    title: string;
    content: string;
    success: Function
    childRef?: any;

}
const Message = (props: Props) => {
    const [display, setDisplay] = useState<boolean>(false)
    const { childRef, success } = props;

    useImperativeHandle(childRef, () => ({
        showMessage: () => {
          return showMessage()
        },
        // 返回选中数据
        hideMessage: () => {
          return hideMessage()
        },
      }))

    /**
     * @description 显示弹窗
     */
    const showMessage = () => {
        setDisplay(true)
    }

    /**
     * @description 显示弹窗
     */
    const hideMessage = () => {
        setDisplay(false)
    }

    /**
     * @description 确定
     */
    const onClick = () => {
        success()
    }

    if (!display) {
        return <Fragment></Fragment>
    }

    return (
        <div className="message-wrapper flex-center">
            <section className="message-box">
                <h2 className="message-box-title">{props.title}</h2>
                <p className="message-box-content">{props.content}</p>
                <button className="message-box-button" onClick={onClick}>确定</button>
            </section>
        </div>
    )

}

export default Message