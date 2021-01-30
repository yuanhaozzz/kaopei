import React, {useEffect, useRef, useState} from 'react'

import './style.less'

const map = [
    {
        name: '苹果'
    },
    {
        name: '苹果'
    },
    {
        name: '香蕉'
    },
    {
        name: '苹果'
    },
    {
        name: '橘子'
    },
    {
        name: '苹果'
    },
    {
        name: '芒果'
    },
]

interface Props{
    list: any[];
    title: string;
}

const Picker = (props: Props) => {
    const [startClientY, setStartClientY] = useState<number>(0)
    const [translateY, setTranslateY] = useState<number>(0)

    const [selectIndex, setSelectIndex] = useState<number>(0)

    let scrollContainerRef = useRef(null)

    useEffect(() => {

    }, [startClientY])

    /**
     * @description 手指点击
     * @param e {Object}    事件对象
     */
    const onTouchStart = (e: any) => {
        let {clientY} = e.changedTouches[0]
        setTranslateY(findMatrixY())
        setStartClientY(clientY)
    }

    /**
     * @description 手指移动
     * @param e {Object}    事件对象
     */
    const onTouchMove = (e: any) => {
        let {clientY} = e.changedTouches[0]
        let scrollEl: any = scrollContainerRef.current

        scrollEl.style.transform = `translate3d(0px, ${translateY + (clientY - startClientY)}px, 0px)`
    }

    /**
     * @description 手机离开
     * @param e {Object}    事件对象
     */
    const onTouchEnd = (e: any) => {
        let scrollEl: any = scrollContainerRef.current
        let translateY = findMatrixY()
        let index: any = Math.abs(translateY / 30).toFixed(0)
        
        // 过度动画
        let y = translateY > 0 ? index * 30 : -index * 30
        console.log(translateY, '---------translateY---------')
        // 边界情况
        if (translateY > 0) {
            y = 0
            index = 0
        } else if (-map.length * 30 > translateY) {
            y = -(map.length - 1) * 30
            index = map.length - 1
        }
        // 设置选中下标
        setSelectIndex(Number(index))
        scrollEl.style.transform = `translate3d(0px, ${y}px, 0px)`
        scrollEl.style.transition = `all 0.5s`
        setTimeout(() => {
            scrollEl.style = `transform: translate3d(0px, ${y}px, 0px)`
        }, 500);
    }

    /**
     * @description 查找矩阵Y
     */
    const findMatrixY = ():number => {
        let scrollRef: any = window.getComputedStyle((scrollContainerRef.current as any)).transform;
        scrollRef.match(/\((.+)\)/g)
        let arr = RegExp.$1.split(',')
        let transformY = arr[arr.length - 1]
        return Number(transformY)
    }

    const renderItem = () => {
        return (
            <div className="picker-content-item">
                {/* 选中框 */}
                <div className="item-target"></div>
                {/* 灰色遮罩 */}
                <div className="item-layer" onTouchMove={onTouchMove} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}></div>
                <ul className="item-list" ref={scrollContainerRef}>
                    {
                        map.map((item: any, index: number) => (
                            <li className={`${index === selectIndex ? 'action' : ''}`} key={index}>{item.name}</li>
                        ))
                    }
                </ul>
            </div>
            
        )
    }

    const renderContent = () => {
        return (
            <div className="picker-content">
                {
                    renderItem()
                }
            </div>
        )
    }

    const renderHeader = () => {
        return (
            <header className="picker-header flex-space-between">
                <button>取消</button>
                <h2>标题</h2>
                <button>确定</button>
            </header>
        )
    }

    return (
        <div className="picker-wrapper flex-end">
            <section className="picker-box">
                {
                    renderHeader()
                }
                {
                    renderContent()
                }
                
            </section>
        </div>
    )
}

export default Picker