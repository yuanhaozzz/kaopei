/*
 * @Author: WuPeiQi
 * @description: Handbook组件
 * @path: 引入路径
 * @Date: 2021-01-07 14:17:50
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-27 17:59:53
 */
import './Handbook.less';
import React, { FC, useEffect, useState } from 'react';
import { ExamItem, HandbookItem, ProcessItem } from '../data.d';

import DownSelect from '@/assets/image/down-select.png';

import { getPreparation } from '../service';

interface HandbookProps {
  menu: number,
  examsList: ExamItem[],
  menuList: string[],
  selectExam: ExamItem,
  selectChange: (item: ExamItem) => void,
  menuChange: (index: number) => void,
  handbookBack: () => void,
}

const Handbook: FC<HandbookProps> = (props) => {
  const { menu, examsList, menuList, selectExam, selectChange, menuChange, handbookBack } = props;

  const [preparation, setPreparation] = useState<HandbookItem>({
    id: -1,
    examId: -1,
    mattersNeedAttention: '',
    accompanyingArticle: '',
    examPreparationProcessList: []
  });
  const [selectStatus, setSelectStatus] = useState<boolean>(false);
  const [processData, setProcessData] = useState<ProcessItem>({
    id: -1,
    name: '',
    examPreparationId: -1,
    imageUrl: '',
  });

  useEffect(() => {
    if (~selectExam.examId) {
      getPreparationList({ examId: selectExam.examId });
    }
  }, [selectExam])

  const getPreparationList = async (params: { examId: number }) => {
    try {
      const res: any = await getPreparation(params);
      console.log(res)
      setPreparation(res.result[0]);
      setProcessData(res.result[0].examPreparationProcessList[0]);
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * @description: 下来菜单change事件
   * @param {ExamItem} item
   * @return {*}
   */
  const onChange = (item: ExamItem) => {
    setSelectStatus(false);
    if (selectExam.examId === item.examId) return false;
    selectChange(item);
  }

  const menuClick = (index: number) => {
    menuChange(index);
  }

  const processTabClick = (item: ProcessItem) => {
    setProcessData(item);
  }

  /**
   * @description: 考试下拉菜单render
   * @param {*}
   * @return {*}
   */
  const examsSelectRender = () => {
    return <ul className={[
      'select-exams-option',
      selectStatus ? 'select-option-show' : 'select-option-hide'
    ].join(' ')}>
      {
        examsList.map((item: ExamItem, index: number) => {
          return <li className='option-item'
            key={item.examId}
            onClick={() => onChange(item)}>{item.examName}</li>
        })
      }
    </ul>
  }

  /**
   * @description: 
   * @param {*}
   * @return {*}
   */
  const menuRender = () => {
    return menuList.map((item: string, index: number) => {
      return <div
        className={['menu-item', menu === index ? 'active' : ''].join(' ')}
        key={index}
        onClick={() => menuClick(index)}>{item}</div>
    })
  }

  /**
   * @description: 考试流程process下tab分类render
   * @param {*}
   * @return {*}
   */
  const processTabRender = () => {
    return preparation.examPreparationProcessList.map((item: ProcessItem, index: number) => {
      return <li
        className={['process-tab-item', processData.id === item.id ? 'active' : ''].join(' ')}
        key={item.id}
        onClick={() => processTabClick(item)}
      >{item.name}</li>;
    })
  }

  /**
   * @description: 考试下指南tab内容render
   * @param {*}
   * @return {*}
   */
  const handbookConRender = () => {
    switch (menu) {
      case 0:
        return <div className='handbook-main-process'>
          <div className='process-box'>
            <ul className='process-tab'>
              {processTabRender()}
            </ul>
            <div className='process-con'>
              <img src={processData.imageUrl} alt="" />
            </div>
          </div>
        </div>;
      case 1:
        return <div className='handbook-main-matter' dangerouslySetInnerHTML={{ __html: preparation.mattersNeedAttention }}></div>;
      case 2:
        return <div className='handbook-main-carry_items' dangerouslySetInnerHTML={{ __html: preparation.accompanyingArticle }}></div>;
      default:
        break;
    }
  }

  return (
    <div className='handbook'>
      <div className='handbook-nav'>
        <div className='nav-back' onClick={() => { handbookBack() }}>
          <img className='nav-back-icon' src={DownSelect} alt="" />
        </div>
        <div className='nav-select'>
          <span className='select-exams-name'>{selectExam.examName}</span>
          <span className='select-icon' onClick={() => { setSelectStatus(!selectStatus) }}>
            <img src={DownSelect} alt="" />
          </span>
          {examsSelectRender()}
        </div>
      </div>
      <div className='handbook-menu'>
        {menuRender()}
      </div>
      <div className='handbook-main'>
        {handbookConRender()}
      </div>
    </div>
  )
}

export default Handbook;