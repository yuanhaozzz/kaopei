/*
 * @Author: WuPeiQi
 * @description: 滑动组件
 * @path: 引入路径
 * @Date: 2021-01-06 14:33:10
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-22 09:46:57
 */

import './carousel.less';
import React, { FC, useState, useEffect } from 'react';
import { ExamItem } from '../data.d';

interface CarouselProps {
  examsList: ExamItem[],
  menuList: string[],
  carouselMenuCallback: (data: ExamItem, index: number) => void,
}

const Carousel: FC<CarouselProps> = (props) => {
  let startX: number = 0,
    startY: number = 0,
    endX: number = 0,
    endY: number = 0;

  const { examsList, menuList, carouselMenuCallback } = props;

  let [slideIdx, setSlideIdx] = useState<number>(0);
  let [tabWidth, setTabWidth] = useState<number>(0);
  const [itemWidth] = useState<number>(650);

  useEffect(() => {
    if (examsList.length) {
      setTabWidth(100 / examsList.length);
    }
  }, [examsList])

  const carouselTabChange = (index: number) => {
    setSlideIdx(index);
  }

  const carouselMenuClick = (item: ExamItem, index: number) => {
    carouselMenuCallback(item, index);
  }

  const touchStart = (e: any) => {
    const { pageX, pageY } = e.touches[0];
    startX = pageX;
    startY = pageY;
  }

  const GetSlideDirection = (startX: number, startY: number, endX: number, endY: number) => {
    var dy = endY - startY;
    var dx = endX - startX;
    //如果滑动距离太短 
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      return 0;
    }
    const GetSlideAngle = (dx: number, dy: number) => {
      return Math.atan2(dy, dx) * 180 / Math.PI;
    }
    const angle = GetSlideAngle(dx, dy);
    // 向上
    if (angle >= 45 && angle < 135) {
      return 1;
    }
    // 向下
    if (angle >= -135 && angle < -45) {
      return 2;
    }
    // 向左
    if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      return 3;
    }
    // 向右
    if (angle >= -45 && angle < 45) {
      return 4;
    }
    return 0;
  }

  const touchEnd = (e: any) => {
    const { pageX, pageY } = e.changedTouches[0];
    endX = pageX;
    endY = pageY;
    const direction = GetSlideDirection(startX, startY, endX, endY);
    switch (direction) {
      case 0:
        console.log('没滑动');
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        slideIdx += 1;
        if (slideIdx > examsList.length - 1) {
          slideIdx = examsList.length - 1;
        }
        setSlideIdx(slideIdx)
        break;
      case 4:
        slideIdx -= 1;
        if (slideIdx <= 0) {
          slideIdx = 0;
        }
        setSlideIdx(slideIdx)
        break;
      default:
        break;
    }
  }

  const carouserItemRender = () => {
    return examsList.map((item: ExamItem, index: number) => {
      return (
        <li className='carousel-item'
          style={{ width: `${itemWidth / 100}rem` }}
          key={item.examId}
          onTouchStart={(e: any) => touchStart(e)}
          onTouchEnd={(e: any) => touchEnd(e)}
        >
          <div className='item-content'>
            <div className='item-img'>
              <img src={item.coverUrl} alt="" />
            </div>
            <div className='item-name'>{item.examName}</div>
            {/* <div className='item-text'>isxjniasud sjcnvi aund laksjdnfiausdf akjs</div> */}
            <ul className='item-tab'>
              {
                menuList.map((items: string, itemIndex: number) => {
                  return <li className={['tab', itemIndex < menuList.length - 1 ? 'right-line' : ''].join(' ')}
                    key={itemIndex}
                    onClick={() => carouselMenuClick(item, itemIndex)}>{items}</li>
                })
              }
            </ul>
          </div>
        </li>
      )
    })
  }

  const carouselTabRender = () => {
    return examsList.map((item: ExamItem, index: number) => {
      return (
        <li className='tab-item' key={item.examId} onClick={() => carouselTabChange(index)}>{item.examName}</li>
      )
    })
  }

  return (
    <>
      <div className='carouser-contain'>
        <ul className='contain-main'
          style={{
            width: `${(itemWidth * examsList.length) / 100}rem`,
            transform: `translateX(-${(itemWidth * slideIdx) / 100}rem)`
          }}>
          {carouserItemRender()}
        </ul>
      </div>
      <ul className='carouser-tab'>
        {carouselTabRender()}
        <li className='carouser-tab-slick' style={{
          width: `${tabWidth}%`,
          left: `${slideIdx * tabWidth}%`
        }}></li>
      </ul>
    </>
  )
}

export default Carousel;