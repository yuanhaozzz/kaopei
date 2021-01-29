import React, { FC } from 'react';

import Payment from '@/assets/image/payment_icon.png'
import './payResult.less'

interface ResultProps {
  callback: (step: number) => void,
}

const Result: FC<ResultProps> = () => {

  const data = [
    {
      id: '1',
      name: '剑桥通用英语五级考试',
      time: '2021 年 6 月 13 日 上午 9:00 考试'
    },
    {
      id: '2',
      name: '剑桥通用英语五级考试',
      time: '2021 年 6 月 14 日 上午 9:00 考试'
    },
    {
      id: '3',
      name: '剑桥通用英语五级考试',
      time: '2021 年 6 月 15 日 上午 9:00 考试'
    },
  ]
  /**
   * 支付成功信息
   */
  const renderUserInfo = () => {
    return (
      <div className='payment-status'>
        <div className='payment-icon'>
          <img src={Payment} />
        </div>
        <div className='result-payment'>
          <h5>支付成功</h5>
          <p><span>￥</span>456.00</p>
        </div>
        <div className='result-userinfo'>
          <div className='userinfo'>
            <h5>姓名</h5>
            <p>陈考培</p>
          </div>
          <div className='userinfo'>
            <h5>拼音</h5>
            <p>KAOPEI CHEN</p>
          </div>
          <div className='userinfo'>
            <h5>证件号</h5>
            <p>130107202101102119</p>
          </div>
        </div>
      </div>
    )
  }
  /**
   * 支付考试项目信息列表
   */
  const renderExamList = () => {
    return (
      <>
        <div className='tips'>考试安排如下,请准时参加考试：</div>
        {
          data && data.map((item, index) => {
            return (
              <div className='exam-list' key={index}>
                <div className='exam-item'>
                  <h3>{item.name}</h3>
                  <i></i>
                  <p>考试时间</p>
                  <div>{item.time}</div>
                </div>
              </div>
            )
          })
        }
      </>
    )
  }

  return (
    <div className='result'>
      {
        renderUserInfo()
      }
      {
        renderExamList()
      }
      <button className='comfirmBtn'>确 定</button>
    </div>
  )
}

export default Result;