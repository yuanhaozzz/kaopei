import React, { FC, useEffect, useState } from 'react';
import { UserInfoParams, ExamDetailList } from '../data';
import ProjectIcon from '@/assets/image/test_item_icon.png';
import RadioIcon from '@/assets/image/payment_icon.png';
import { dateSplit } from '@/utils/helper';
import { format, toast } from '@/utils/function';
import { useUserInfoStore } from '@/store';
import { completeOrder } from '../service';
import './confirmInfo.less';

interface ConfirmProps {
  routeType: number,
  userInfo: UserInfoParams,
  examList: ExamDetailList[],
  callback: (step: number, type?: number) => void,
  history?: any
}

const Confirm: FC<ConfirmProps> = (props) => {
  const { routeType, userInfo, examList, callback, history } = props;
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [examListId, setExamListId] = useState<[]>([]);
  const { getToken } = useUserInfoStore();

  useEffect(() => {
    computedPrice()
  }, [])

  /**
   * 性别格式化
   */
  const gender = () => {
    switch (+userInfo.gender) {
      case 1:
        return '男';
      case 2:
        return '女';
      default:
        break;
    }
  }

  /**
   * 计算总价
   */
  const computedPrice = () => {
    let total = 0;
    let examId: any = [];
    examList && examList.map((item: any) => {
      examId.push(item.id);
      total += item.prodPrice;
    })
    setExamListId(examId);
    setTotalPrice(total);
  }

  
  /**
   * 上一步
   */
  const prev = () => {
    callback(3, routeType);
  }
  /**
   * 提交
   */
  const submitOrder = async () => {
    const params = {
      action: 'createExamOrder',
      token: getToken,
      birthday: userInfo.birthday,
      checkCode: userInfo.code,
      email: userInfo.mail,
      firstNamePinyin: userInfo.firstName,
      lastNamePinyin: userInfo.lastName,
      fullNameCn: userInfo.userName,
      gender: userInfo.gender,
      idNumber: userInfo.idNum,
      isBwStatus: routeType,
      phone: userInfo.phone,
      prodIds: examListId.join(','),
    }
    try {
      let res: any = await completeOrder(params);
      toast('success', '提交成功');
      history.push('/order');
    } catch (error) {
      return;
    }
    callback(6, routeType)
  }
  /**
   * 考生信息
   */
  const renderUserInfo = () => {
    return (
      <>
        <div className='input-item'>
          <h3>{userInfo.userName}</h3>
          <div className="userInfo">{userInfo.lastName} {userInfo.firstName}</div>
        </div>
        <div className='input-item'>
          <h3>证件号：</h3>
          <div className="userInfo">{userInfo.idNum}</div>
        </div>
        <div className='input-item radio-reset'>
          <h3>性&nbsp;&nbsp;&nbsp;&nbsp;别</h3>
          <img className='radio-icon' src={RadioIcon} />
          <label htmlFor="male">{gender()}</label>
        </div>
      </>
    )
  }
  /**
   * 报考项目列表
   */
  const renderList = () => {
    return (
      <>
        {
          examList && examList.map((item, index) => {
            return <div className='project-list' key={index}>
              <div className='list-icon'>
                <img src={ProjectIcon} />
              </div>

              <div className='project-item'>
                <div className='project-name'>{item.examName}</div>
                <div className='project-time'>考试时间：{dateSplit(format(item.examItemsDate, 'yyyy-MM-dd'))}</div>
                <div className='project-price'>￥{item.prodPrice}</div>
              </div>
            </div>
          })
        }
      </>
    )
  }

  return (
    <div className='confirm'>
      <div className='confirm-form'>
        <div className='confirm-panel'>
          <h2><i></i>报名信息</h2>
          {renderUserInfo()}
        </div>

        <div className='confirm-panel'>
          {renderList()}
        </div>
        <div className='tips'>温馨提示：报名完成后，<span>不提供退款服务</span></div>
      </div>
      <div className='footer'>
        {/* <div className='total'>合计<p>￥456.<span>00</span></p></div> */}
        <div className='total'>合计<p>￥{totalPrice}</p></div>
        <h3 onClick={prev}>上一步</h3>
        <div className='submitBtn' onClick={submitOrder}>提交订单</div>
      </div>
    </div>
  )
}

export default Confirm;