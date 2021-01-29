import React, { FC, useEffect, useState } from 'react';
import { getOrderList } from './service';
import { useUserInfoStore } from '@/store';

import './style.less'

interface OrderProps {
  // callback: (step: number) => void,
}

const Order: FC<OrderProps> = (props) => {
  // const { callback } = props;
  const [time, setTime] = useState('');

  const [orderList, setOrderList] = useState([]);
  const { getToken } = useUserInfoStore();
  const data = [
    {
      id: '1',
      name: 'TKT考试',
      ordertime: '2020-11-31',
      status: 0,
      list: [
        {
          name: '考试项目1-1：',
          price: '400.00'
        },
        {
          name: '考试项目1-2：',
          price: '400.00'
        },
      ],
      remainTime: 3600
    },
    {
      id: '2',
      name: 'TKT考试',
      ordertime: '2020-12-31',
      status: 1,
      list: [
        {
          name: '考试项目2-1：',
          price: '500.00'
        },
        {
          name: '考试项目2-2：',
          price: '500.00'
        },
      ],
      remainTime: 4600
    },
    {
      id: '3',
      name: 'TKT考试',
      ordertime: '2021-1-31',
      status: 2,
      list: [
        {
          name: '考试项目3-1：',
          price: '500.00'
        },
        {
          name: '考试项目3-2：',
          price: '500.00'
        },
        {
          name: '考试项目3-3：',
          price: '500.00'
        },
      ],
      remainTime: 5600
    },
  ]

  useEffect(() => {
    getList();
    timeTransition(36000);
  }, [])

  const orderStatus = (status: number) => {
    switch (status) {
      case 0:
        return '待支付'
      case 1:
        return '已完成'
      case 2:
        return '已过期'
      default:
        return '待支付'
    }
  }

  const getList = async () => {
    try {
      let res: any = await getOrderList({action:'getExamOrderList', token: getToken});
      setOrderList(res.result)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const toPayFor = () => {
    // callback(6)
  }

  /**
   * 支付倒计时
   */
  const timeTransition = (ms: number) => {
    let maxtime = ms / 1000; //按秒计算
    let timer: any = null;
    setTimeout(function f() {
      if (maxtime >= 0) {
        let minutes: any = Math.floor(maxtime / 60);
        let seconds: any = Math.floor(maxtime % 60);
        minutes < 10 ? minutes = '0' + minutes : minutes = minutes;
        seconds < 10 ? seconds = '0' + seconds : seconds = seconds;
        let time = minutes + ":" + seconds;
        setTime(time)
        --maxtime;
      } else {
        clearTimeout(timer);
        return;
      }
      timer = setTimeout(f, 1000);
    }, 1000);
  }
  /**
   * 订单列表
   */
  const renderOrderList = () => {
    return (
      <>
        {
          data && data.map((item, index) => {
            return (
              <div className='order-list-item' key={index}>
                <div className='order-list-header'>
                  <h3>{item.name}</h3>
                  <p>({item.ordertime})</p>
                  <p className='order-status'>{orderStatus(item.status)}</p>
                </div>
                <div className='order-list-content'>
                  {renderOrderDetail(item.list)}
                </div>
                <div className='order-list-footer'>
                  <div className='countdown'>{time}</div>
                  <div className='pay-btn' onClick={toPayFor}>去支付</div>
                </div>
              </div>
            )
          })
        }
      </>
    )
  }
  /**
   * 订单列表详情
   */
  const renderOrderDetail = (data: any) => {
    return (
      <>
        <h3>订单详情：</h3>
        {
          data && data.map((item: any, index: any) => {
            return (
              <div className='order-detail-list' key={index}>
                <p>{item.name}</p>
                <p className='detail-price'>￥{item.price}</p>
              </div>
            )
          })
        }
        <div className='detail-footer'>
          共{data.length}个项目，合计<span>￥800.00</span>
        </div>
      </>
    )
  }

  return (
    <div className='order'>
      {
        // renderOrderList()
      }
    </div>
  )
}

export default Order