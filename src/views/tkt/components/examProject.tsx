import React, { FC, useEffect, useState } from 'react';
import Radio from '@/components/radio';
import Button from '@/components/button';
import { getExamProjectList } from '../service';
import { ExamProjectListPramas, ExamDetailList } from '../data';
import { useUserInfoStore } from '@/store';
import { dateSplit } from '@/utils/helper';
import { format, toast } from '@/utils/function';


import ProjectIcon from '@/assets/image/test_item_icon.png'
import './examProject.less'

interface ProjectProps {
  routeType: number, //routeType (0 => 北外教师，1 => 非北外教师)
  examList: ExamDetailList[],
  selectExamCallback: (data: ExamDetailList[]) => void,
  callback: (step: number, type?: number) => void,
}

const Project: FC<ProjectProps> = (props) => {
  const { routeType, examList, selectExamCallback, callback } = props;
  const { getToken } = useUserInfoStore();
  const [projectList, setProjectList] = useState<ExamDetailList[]>(examList);
  const [selectExam, setSelectExam] = useState<ExamDetailList[]>([]);

  useEffect(() => {
    const params = {
      action: 'getExamProdList',
      token: getToken,
      isBwStatus: routeType
    }
    getList(params);
  }, []);

  /**
   * @description: 获取报考列表
   * @param {*} data
   */
  const getList = async (data: ExamProjectListPramas) => {
    try {
      const res: any = await getExamProjectList(data);
      setProjectList(res.result.prodList)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * @description: radio组件change事件
   * @param {any} e
   * @param {any} value
   * @return {*}
   */
  const radioChange = (e: any, value: any) => {
    const idx = selectExam.findIndex((item: any) => item.id === value.id)
    ~idx ? selectExam.splice(idx, 1) : selectExam.push(value);
    setSelectExam(selectExam.splice(0));
  }

  /**
   * 上一步
   */
  const prev = () => {
    callback(2, routeType);
  }
  /**
   * 下一步
   */
  const next = () => {
    console.log(selectExam)
    if(!selectExam.length) {
      toast('error', '请选择报考项目');
      return;
    }
    selectExamCallback(selectExam);
    callback(4, routeType)
  }
  /**
   * 项目列表
   */
  const renderList = () => {
    return (
      <>
        {
          projectList && projectList.map((item, index) => {
            return <div className='project-list' key={index}>
              <img src={ProjectIcon} />
              <div className='project-item'>
                <div className='project-name'>{item.examItemsName}</div>
                <div className='project-time'>考试时间：{dateSplit(format(item.examItemsDate,'yyyy-MM-dd'))}</div>
                <div className='project-price'>￥{item.prodPrice}</div>
              </div>
              <Radio text='' value={item} onChange={radioChange} />
            </div>
          })
        }
      </>
    )
  }


  return (
    <div className='project'>
      <h2>请选择报考项目（可多选）：</h2>
      {
        renderList()
      }
      <Button prev={prev} next={next} />
    </div>
  )
}

export default Project;