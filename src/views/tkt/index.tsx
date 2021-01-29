import React, { FC, useState } from 'react';

import Entry from './components/entry';
import MailVerify from './components/mailVerify';
import Perfection from './components/perfection';
import Project from './components/examProject';
import Confirm from './components/confirmInfo';
import Result from './components/payResult';
// import Order from './components/order';
import { UserInfoParams, ExamDetailList } from './data';
import './style.less'

const Tkt: FC = () => {
  const [userType, setUserType] = useState<number>(0);
  /**
   * routeType (0 => 北外教师，1 => 非北外教师)
   */
  const [routeType, setRouteType] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UserInfoParams>({
    userName: '',
    lastName: '',
    firstName: '',
    gender: '',
    idNum:  '',
    birthday: '',
    mail: '',
    phone: '',
    code: ''
  });
  const [examList, setExamList] = useState<ExamDetailList[]>([])

  /**
   * step callback
   */
  const stepCallback = (step: number, type?: number) => {
    setUserType(step);
    setRouteType(type ? type : 0);
  }

  /**
   * useeInfo From callback
   */
  const formCallback = (data: UserInfoParams) => {
    setUserInfo(data);
  }

  /**
   * selectExam callback
   */
  const selectExamCallback = (data: ExamDetailList[]) => {
    setExamList(data);
  }

  const stepViewRender = () => {
    switch (userType) {
      case 0:
        return <Entry callback={(step: number, type?: number) => stepCallback(step, type)} />
      case 1:
        return <MailVerify routeType={routeType} callback={(step: number, type?: number) => stepCallback(step, type)} />
      case 2:
        return <Perfection routeType={routeType} userInfo={userInfo} formCallback={formCallback} callback={(step: number, type?: number) => stepCallback(step, type)} />
      case 3:
        return <Project routeType={routeType} examList={examList} selectExamCallback={selectExamCallback} callback={(step: number, type?: number) => stepCallback(step, type)} />
      case 4:
        return <Confirm routeType={routeType} userInfo={userInfo} examList={examList} callback={(step: number, type?: number) => stepCallback(step, type)} />
      case 5:
        // return <Order callback={(step: number) => stepCallback(step)} />
      case 6:
        return <Result callback={(step: number) => stepCallback(step)} />
      default:
        break;
    }
  }

  return (
    <>
      {stepViewRender()}
    </>
  )
}
export default Tkt;