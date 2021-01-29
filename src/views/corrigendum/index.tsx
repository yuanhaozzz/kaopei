import React, { FC, useState, useEffect, useRef, Fragment } from 'react';
import Phone from './components/phone';
import { examItem } from './data';
import { useUserInfoStore } from '@/store';
import { getExamList } from './service';
import UserInfo from './components/userInfo';
import {format} from '@/utils/function'
import './style.less';

const Corrigendum: FC = () => {
  const [step, setStep] = useState<number>(0);
  const [list, setList] = useState<examItem[]>([]);
  const [loding, setLoding] = useState<boolean>(true);
  const [content, setContent] = useState<string>('');
  const { getToken } = useUserInfoStore();

  const messageRef = useRef<any>(null);

  const addExamRef = useRef<any>(null);

  const stepCallback = (step: number) => {
    console.log(step)
    setStep(step)
  }

  const stepViewRender = () => {
    switch (step) {
      case 0:
        return <Phone callback={(step: number) => stepCallback(step)} />
      case 1:
        return <UserInfo callback={(step: number) => stepCallback(step)} />
      default:
        break;
    }
  }

  useEffect(() => {
    getData()
  }, [])

  /**
   * @description 获取数据
   */
  const getData = async () => {
    let params = {
      action: 'getUserExamList',
      token: getToken
    }
    try {
      console.log(getToken, '-------------')
      let data: any = await getExamList(params)
      setList(data.examList)
    } catch (error) {
    } finally {
      setLoding(false)
    }
  }

  /**
     * @description 审核未通过
     * @param 
     */
  const handleNotPass = (content: string) => {
    setContent(content)
    messageRef.current.showMessage()
  }

  /**
     * @description 渲染列表
     */
  const renderList = () => {
    return (
      <ul className="exam-management-list">
        {
          list.map((item: examItem, index: number) => (
            <li className="list-item" key={index}>
              {/* 考试名称 */}
              <h2 className="list-item-title">
                {item.examName}
                {/* 勘误 */}
                {
                  item.candidateCorrigendum && <Fragment>
                    {
                      item.candidateCorrigendum.status === 1 && <div className="list-item-status pending">勘误审核中</div>
                    }
                    {
                      item.candidateCorrigendum.status === 3 && <div className="list-item-status resolve" onClick={() => handleNotPass(item.candidateCorrigendum.errorMsg)}>勘误已通过</div>
                    }
                    {
                      item.candidateCorrigendum.status === 2 && <div className="list-item-status reject" onClick={() => handleNotPass(item.candidateCorrigendum.errorMsg)}>审核未通过</div>
                    }
                  </Fragment>
                }

              </h2>
              {/* 考试信息 */}
              <div className="list-item-box flex-space-between">
                <div className="list-item-count">
                  <h5>考试批次</h5>
                  <span>{format(item.examBatch, 'yyyy年MM月dd日')} 考试</span>
                </div>
                <div className="list-item-number">
                  <h5>准考证号</h5>
                  <span>{item.examCandidateNumber}</span>
                </div>
              </div>
              {/* 个人信息 */}
              <div className="list-item-info">
                <div className="list-item-info-container flex-space-between">
                  <div className="list-item-info-box">
                    <h5>姓名</h5>
                    <span>{item.examCandidateName}</span>
                  </div>
                  <div className="list-item-info-box">
                    <h5>拼音</h5>
                    <span>{item.firstNamePinyin}{item.lastNamePinyin}</span>
                  </div>
                </div>
                <div className="list-item-info-num">
                  <h5>证件号</h5>
                  <span>{item.idNumber}</span>
                </div>
              </div>
              {/* 信息勘误 */}
              {
                item.showCorrigendum === 1 && <div className="list-item-button flex-end">
                  <button onClick={() => stepViewRender()}>信息勘误</button>
                </div>
              }
            </li>
          ))
        }

      </ul>
    )
  }

  return (
    <div className='corrigendum'>
      {stepViewRender()}
      {/* {renderList()} */}
    </div>
  )
}
export default Corrigendum;