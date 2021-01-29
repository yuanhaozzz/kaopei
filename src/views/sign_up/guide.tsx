/*
 * @Author: WuPeiQi
 * @description: 报名指导列表
 * @path: 引入路径
 * @Date: 2021-01-08 15:27:06
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-28 14:51:38
 */
import './guide.less';
import React, { FC, useEffect, useState } from 'react';
import TipModal from './component/tipModal';
import { ExamItem } from './data';
import { getAllExam } from './service';

interface SignUpGuideProps {
  history: any;
}

const SignUpGuide: FC<SignUpGuideProps> = (props) => {
  const { history } = props;
  let cardColorList = ['#E62A53', '#162C56', '#7F51B9', '#F1BC1A', '#91BA20'];

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [examList, setExamList] = useState<ExamItem[]>([]);
  const [tips, setTips] = useState<string[]>([]);

  useEffect(() => {
    getExamList();
  }, [])

  const getExamList = async () => {
    try {
      const res: any = await getAllExam();
      console.log('res')
      if (res.result.length) {
        setExamList(res.result);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const modalShow = (tipsList: string[]) => {
    setTips(tipsList);
    setModalStatus(true);
  }

  const cancel = () => {
    setModalStatus(false);
  }

  const goProcess = (id: number) => {
    history.push({
      pathname: '/signup/process',
      state: { id }
    });
  }

  const signUp = () => {
    history.push({
      pathname: '/tkt'
    });
  }

  const cardRender = () => {
    return examList.map((item: ExamItem, index: number) => {
      return item.channelType !== 1 ?
        // 三方报名
        (
          <div className='signUp-exam-card' key={item.id} style={{ borderLeftColor: cardColorList[index] }}>
            <div className='card-left'>
              <div className='exam-name' style={{ background: cardColorList[index] }}>{item.examName}</div>
              <div className='exam-title'>官网报名地址</div>
              <div className='exam-url'>{item.registrationUrl}</div>
              <div className='exam-tip'>请用电脑输入地址，完成报名事项</div>
            </div>
            <div className='card-right'>
              <div className='card-right-guide' onClick={() => goProcess(item.examId)}>报名流程</div>
              <div className='card-right-tips' onClick={() => modalShow(item.tipsList ?? [])}>报名小贴士</div>
            </div>
          </div>
        ) :
        // 北外报名
        (
          <div className='signUp-exam-card' key={item.id} style={{ borderLeftColor: cardColorList[index] }}>
            <div className='card-left'>
              <div className='exam-name' style={{ background: cardColorList[index] }}>{item.examName}</div>
              <div className='exam-sign_up' dangerouslySetInnerHTML={{ __html: item.registrationTimeText }}>
                {/* 报名时间<span className='exam-sign_up_time'>2021年 3月 21日</span> */}
              </div>
              <div className='exam-sign_up_btn'>
                <div className='sign_up_btn_style' onClick={() => signUp()}>马上报名</div>
              </div>
            </div>
            <div className='card-right'>
              <div className='card-right-guide' onClick={() => goProcess(item.examId)}>报名流程</div>
              <div className='card-right-tips' onClick={() => modalShow(item.tipsList ?? [])}>报名小贴士</div>
            </div>
          </div>
        )
    })
  }

  return (
    <div className='signUp-guide'>
      {cardRender()}
      {
        modalStatus ? <TipModal tips={tips} cancel={cancel} /> : null
      }
    </div>
  )
}

export default SignUpGuide;