/*
 * @Author: WuPeiQi
 * @description: 报名流程页
 * @path: 引入路径
 * @Date: 2021-01-11 14:55:33
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-29 10:28:04
 * @mustParam: id: 通过路由传递
 */
import './process.less';
import React, { FC, useState, useEffect } from 'react';
import { ExamItem } from './data';
import { getExam } from './service';

interface ProcessProps {
  location: { state: { id: number } }
}

const SignUpProcess: FC<ProcessProps> = (props) => {
  console.log(props)
  const { location: { state: { id } } } = props;
  const [examData, setExamData] = useState<ExamItem>({
    id: 0,
    examId: 0,
    examName: '',
    channelTypeName: '',
    channelType: 0,
    registrationUrl: '',
    registrationTimeText: '',
    processDescription: '',
  });

  useEffect(() => {
    getExamList({ examId: id });
  }, [])

  const getExamList = async (params: { examId: number }) => {
    try {
      const res: any = await getExam(params);
      if (res.result.length) {
        setExamData(res.result.find((item: ExamItem) => item.examId === id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='signUp-process' dangerouslySetInnerHTML={{ __html: examData.processDescription }}>
      {/* <img className='process-img' src="" alt="" /> */}
    </div>
  )
}

export default SignUpProcess;