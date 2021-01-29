/*
 * @Author: WuPeiQi
 * @description: 成绩查询页
 * @path: 引入路径
 * @Date: 2021-01-22 11:04:55
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-28 17:00:34
 */
import './inquire.less';
import React, { FC, useEffect, useState } from 'react';
import { findWechatUrlValue } from '@/utils/function';
import { InquireExamItem } from './data.d';
import { getExamListOfScore } from './service';

import AnalysisShow from '@/assets/image/analysis_show.png';

interface InquireProps {
  history: any
}

const Inquire: FC<InquireProps> = (props) => {
  const { history } = props;
  let cardColorList = ['#E62A53', '#162C56', '#7F51B9', '#F1BC1A', '#91BA20'];
  const [examList, setExamList] = useState<InquireExamItem[]>([]);

  useEffect(() => {
    getExamScore({ offcialAccountCode: findWechatUrlValue('type') || '8' })
  }, [])

  const getExamScore = async (params: { offcialAccountCode: string | number }) => {
    try {
      const res: any = await getExamListOfScore(params);
      console.log(res);
      setExamList(res.examList);
    } catch (error) {
      console.log(error);
    }
  }

  const goAnalyse = (id: number) => {
    history.push({
      pathname: '/results/analyse',
      state: { id }
    })
  }

  const cardRender = () => {
    return examList.map((item: InquireExamItem, index: number) => {
      return (
        <div className='card-box' key={index} style={{ borderLeftColor: cardColorList[index] }}>
          <div className='card-left'>
            <div className='exam-name' style={{ background: cardColorList[index] }}>{item.examName}</div>
            <div className='exam-title'>查询地址</div>
            <div className='exam-url'>{item.officialWebsite}</div>
            <div className='exam-tip'>请用电脑输入地址，完成成绩查询</div>
          </div>
          {
            item.scoreAnalysisShowStatus ? (
              <div className='card-right'>
                <div className='card-analyse-icon' onClick={() => goAnalyse(item.examId)}>
                  <img src={AnalysisShow} alt="" />
                </div>
                <p>成绩分析</p>
              </div>
            ) : null
          }
        </div>
      )
    })
  }

  return (
    <div className='inquire'>
      {cardRender()}
    </div>
  )
}

export default Inquire;
