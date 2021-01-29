/*
 * @Author: WuPeiQi
 * @description: 证书寄送页
 * @path: 引入路径
 * @Date: 2021-01-11 15:30:11
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-28 20:36:30
 */
import './style.less';
import React, { FC, useState } from 'react';
import ExamList from './component/list';
import Send from './component/send';
import { ExamExpressItem } from './data.d';

const Certificate: FC = () => {

  const [step, setStep] = useState<number>(1);
  const [selectExam, setSelectExam] = useState<ExamExpressItem[]>([]);

  const selectExamChange = (list: ExamExpressItem[]) => {
    console.log(list)
    setSelectExam(list.splice(0));
  }

  const callback = (step: number) => {
    step === 1 && setSelectExam([]);
    setStep(step);
  }

  const stepRender = () => {
    switch (step) {
      case 1:
        return <ExamList selectExam={selectExam} next={(step: number) => callback(step)} selectExamChange={selectExamChange} />;
      case 2:
        return <Send selectExam={selectExam} prev={(step: number) => callback(step)} />
      default:
        break;
    }
  }

  return (
    <div className='certificate'>
      {stepRender()}
    </div>
  )
}

export default Certificate;