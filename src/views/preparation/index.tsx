/*
 * @Author: WuPeiQi
 * @description: 备考指南页
 * @path: 引入路径
 * @Date: 2021-01-06 09:08:53
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-27 18:02:58
 */
import './style.less';
import React, { FC, useEffect, useState } from 'react';
import { findWechatUrlValue } from '@/utils/function';
import Carousel from './component/carousel';
import Handbook from './component/Handbook';
import { ExamParams, ExamItem } from './data.d';
import { getExam } from './service';

const Preparation: FC = () => {
  const [examsList, setExamList] = useState<ExamItem[]>([]);
  const [menuList] = useState<string[]>(['考试流程', '注意事项', '携带物品']);
  const [selectExam, setSelectExam] = useState<ExamItem>({ examName: '', examId: -1, coverUrl: '' });
  const [menu, setMenu] = useState<number>(0);
  const [rotateStatus, setRotateStatus] = useState<boolean>(false);

  useEffect(() => {
    getExamList({
      examContentCode: 'preparation_items',
      offcialAccountCode: findWechatUrlValue('type') || 8
    });
  }, [])

  /**
   * @description: 数据获取
   * @param {*} async
   * @return {*}
   */
  const getExamList = async (params: ExamParams) => {
    try {
      const res: any = await getExam(params);
      console.log(res)
      if (res.examContentList.length) {
        setExamList(res.examContentList);
        setSelectExam(res.examContentList[0])
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * @description: carouse组件menu点击回调
   * @param {ExamItem} data
   * @param {number} index
   * @return {*}
   */
  const carouselMenuCallback = (data: ExamItem, index: number) => {
    setSelectExam(data);
    setMenu(index);
    setRotateStatus(true);
  }

  /**
   * @description: handbook组件select change事件回调
   * @param {ExamItem} data
   * @return {*}
   */
  const selectChange = (data: ExamItem) => {
    console.log(data)
    setSelectExam(data);
    setMenu(0);
  }

  /**
   * @description: handbook组件menu点击事件回调
   * @param {number} index
   * @return {*}
   */
  const menuChange = (index: number) => {
    setMenu(index);
  }

  /**
   * @description: handbook返回
   * @param {*}
   * @return {*}
   */
  const handbookBack = () => {
    setRotateStatus(false);
  }

  return (
    <div className='preparation'>
      <div className={
        ['preparation-carousel',
          rotateStatus ?
            'preparation-carousel-hide' : 'preparation-carousel-show'].join(' ')
      }>
        <Carousel
          examsList={examsList}
          menuList={menuList}
          carouselMenuCallback={carouselMenuCallback}
        />
      </div>
      <div className={
        ['preparation-handbook',
          rotateStatus ?
            'preparation-handbook-hide' : 'preparation-handbook-show'].join(' ')
      }>
        <Handbook
          menu={menu}
          examsList={examsList}
          menuList={menuList}
          selectExam={selectExam}
          selectChange={selectChange}
          menuChange={menuChange}
          handbookBack={handbookBack}
        />
      </div>
    </div >
  )
}

export default Preparation;