/*
 * @Author: WuPeiQi
 * @description: 成绩分析
 * @path: 引入路径
 * @Date: 2021-01-22 11:05:24
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-28 19:38:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import './analyse.less';
import { FC, useEffect, useState } from 'react';
import { findWechatUrlValue } from '@/utils/function';
import { useUserInfoStore } from '@/store';
import ScoreECharts from './component//scoreECharts';
import ScoreAnalyse from './component/scoreAnalyse';
import { ExamBatchItem, AnalyseExamItem, ExamScoreItem, FormData } from './data.d';
import { getExamScoreItemsListOfScore } from './service';

import DownSelect from '@/assets/image/down-select.png';
import AnalyseBanner from '@/assets/image/analyse_banner.png';

interface Analyseprops {
  location: { state?: { id: number } }
}

const Analyse: FC<Analyseprops> = (props) => {
  let timer: any;
  let examSelectDefaultData = {
    examId: -1,
    examName: '',
    scoreAnalysisShowStatus: 0,
  }
  let examBatchSelectDefaultData = {
    batch: '',
    examBatchId: -1,
    examId: -1,
  }
  let formDefaultData = {};

  const { getToken } = useUserInfoStore();
  const { location: { state } } = props;

  const [analyseStatus, setAnalyseStatus] = useState<number>(1); // 1: 成绩分析form表单 2: 成绩分布ECharts图
  const [step, setStep] = useState<number>(1); // 1: 成绩分析表单 2: 成绩分析
  const [examScoreList, setExamScoreList] = useState<AnalyseExamItem[]>([]);
  const [examSelectData, setExamSelectData] = useState<AnalyseExamItem>(examSelectDefaultData);
  const [examBatchSelectData, setExamBatchSelectData] = useState<ExamBatchItem>(examBatchSelectDefaultData);
  const [examSelectStatus, setExamSelectStatus] = useState<boolean>(false);
  const [examBatchSelectStatus, setExamBatchSelectStatus] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(formDefaultData);

  useEffect(() => {
    if (step === 1) {
      const wechatType = findWechatUrlValue('type') || 8;
      getExamScore(getToken ?
        { offcialAccountCode: wechatType, token: getToken } :
        { offcialAccountCode: wechatType }
      );
    }
  }, [step])

  useEffect(() => {
    // setDefaultFormData();
  }, [examSelectData])

  /**
   * @description: 数据获取
   * @param {*} async
   * @return {*}
   */
  const getExamScore = async (params: { offcialAccountCode: string | number, token?: string }) => {
    try {
      const res: any = await getExamScoreItemsListOfScore(params);
      if (!res.examList.length) return;
      setExamScoreList(res.examList);
      if (state) {
        setExamSelectData(res.examList.find((item: AnalyseExamItem) => item.examId === state.id));
      } else {
        setExamSelectData(res.examList[0]);
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * @description: 组件callback回调
   * @param {number} step
   * @return {*}
   */
  const callback = (step: number) => {
    if (step === 3) {
      setAnalyseStatus(2);
      return;
    }
    setStep(step);
  }

  /**
   * @description: 考试批次下拉框change
   * @param {*}
   * @return {*}
   */
  const examBatchOptionChange = (item: ExamBatchItem) => {
    setExamBatchSelectData(Object.assign({}, item));
    setExamBatchSelectStatus(false);
  }
  /**
   * @description: 考试批次下拉框
   * @param {*}
   * @return {*}
   */
  const examBatchSelectRender = () => {
    return examSelectData.examBatchList?.map((item: ExamBatchItem) => {
      return <li
        className='form-exam-batch-select-option'
        key={item.examBatchId}
        onClick={() => examBatchOptionChange(item)}
      >{item.batch}</li>
    })
  }

  /**
   * @description: 考试下拉框change
   * @param {AnalyseExamItem} item
   * @return {*}
   */
  const optionChange = (item: AnalyseExamItem) => {
    setExamBatchSelectData(Object.assign({}, examBatchSelectDefaultData));
    setExamSelectData(Object.assign({}, item));
    setExamSelectStatus(false);
  }

  /**
   * @description: 考试下拉框
   * @param {*}
   * @return {*}
   */
  const examSelectRender = () => {
    return examScoreList.map((item: AnalyseExamItem) => {
      return (<li
        className='option-item'
        key={item.examId}
        onClick={() => optionChange(item)}
      >{item.examName}</li>)
    })
  }

  /**
   * @description: input输入change
   * @param {React} e: input对象
   * @param {number} type: 对应input
   * @return {*}
   */
  const inputChange = function (e: React.ChangeEvent<HTMLInputElement>, type: number) {
    if (timer) clearInterval(timer);
    timer = setTimeout(() => {
      formData[type] = +e.target.value;
      setFormData(Object.assign({}, formData));
      clearInterval(timer);
    }, 200)
  }

  const startAnalysis = () => {
    setStep(2);
  }

  const formItemRender = () => {
    const { examScoreItemsList } = examSelectData;
    if (!examScoreItemsList) return null;
    return examScoreItemsList.map((item: ExamScoreItem) => {
      return (
        <li className='form-item' key={item.examScoreItemsId}>
          <div className='form-item-label'>{item.scoreItemsName}</div>
          <div className='form-item-input-control'>
            <input
              className='form-item-input'
              defaultValue={formData[item.examScoreItemsId]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, item.examScoreItemsId)} />
          </div>
        </li>
      )
    })
  }

  const stepRender = () => {
    switch (step) {
      case 1: // 成绩查询
        return (
          <div className='analyse-score-query' >
            <div className='analyse-score-exam_select flex-center'>
              <div className='exam_select-main' onClick={() => { setExamSelectStatus(!examSelectStatus) }}>
                <span>{examSelectData.examName}</span>
                <ul className={[
                  'exam_select-option',
                  examSelectStatus ? 'select-option-show' : 'select-option-hide'
                ].join(' ')}>
                  {examSelectRender()}
                </ul>
              </div>
              <img className='exam_select-icon' src={DownSelect} alt="" />
            </div>
            <div className='analyse-score-form'>
              <ul className='form-box'>
                <li className='form-item' style={{ marginBottom: '70px' }}>
                  <div className='form-item-label'>考试批次</div>
                  <div className='form-item-input-control' onClick={() => { setExamBatchSelectStatus(!examBatchSelectStatus) }}>
                    <span className='form-item-input text-con'>{examBatchSelectData.batch}</span>
                    <ul className={[
                      'form-exam-batch-select',
                      examBatchSelectStatus ?
                        'form-exam-batch-select-show' :
                        'form-exam-batch-select-hide'].join(' ')}>{examBatchSelectRender()}</ul>
                  </div>
                  <div className='form-item-down' onClick={() => { setExamBatchSelectStatus(!examBatchSelectStatus) }}>
                    <img className='form-item-down-icon' src={DownSelect} alt="" />
                  </div>
                </li>
                {formItemRender()}
              </ul>
            </div>
            {
              examSelectData.scoreAnalysisShowStatus ? (
                <div className='analyse-score-btn'>
                  <div className='start-analyse-btn' onClick={() => startAnalysis()}>开始分析</div>
                </div>
              ) : null
            }
          </div>
        );
      case 2: // 成绩分布
        return <ScoreAnalyse
          examScoreItem={examSelectData}
          examBatchItem={examBatchSelectData}
          scoreData={formData}
          next={callback} />
      default:
        break;
    }
  }

  return (
    <div className='analyse'>
      {
        analyseStatus === 1 ? (
          <>
            <div className='analyse-banner'>
              <img className='analyse-banner-img' src={AnalyseBanner} alt="" />
            </div>
            <div className='analyse-score'>
              {stepRender()}
            </div>
          </>
        ) : (
            <ScoreECharts
              examScoreItem={examSelectData}
              examBatchItem={examBatchSelectData}
              scoreData={formData}
            />
          )
      }

    </div>
  )
}

export default Analyse;