/*
 * @Author: WuPeiQi
 * @description: 成绩分析
 * @path: 引入路径
 * @Date: 2021-01-25 16:01:05
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-28 18:34:07
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */

import './scoreAnalyse.less';
import { FC, useEffect, useState } from 'react';
import { AnalyseExamItem, ExamBatchItem, FormData, ExamScoreDistributionParams, ExamAnalysisData } from '../data.d';
import { getExamScoreDistribution } from '../service';

interface ScoreAnalyseProps {
  examScoreItem: AnalyseExamItem,
  examBatchItem: ExamBatchItem,
  scoreData: FormData,
  next: (step: number) => void,
}

const ScoreAnalyse: FC<ScoreAnalyseProps> = (props) => {
  const { examScoreItem, examBatchItem, scoreData, next } = props;

  const [examAnalysisData, setExamAnalysisData] = useState<ExamAnalysisData>({
    remark: '',
  });

  useEffect(() => {
    getData({
      examId: examScoreItem.examId,
      examBatchId: examBatchItem.examBatchId,
      scoreJson: JSON.stringify(scoreData),
      action: 'getExamScoreAnalysis',
    })
  }, [])

  const getData = async (params: ExamScoreDistributionParams) => {
    try {
      const res: any = await getExamScoreDistribution(params);
      if (!res.examScoreItemsList.length) return;
      setExamAnalysisData(res.examScoreItemsList[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const queryScore = () => {
    next(3);
  }
  return (
    <div className='score-analyse'>
      <div className='score-analyse-title'>分析</div>
      <div className='score-analyse-main'>
        <div className='score-analyse-comment'>{examAnalysisData.remark}</div>
      </div>
      <div className='score-analyse-footer'>
        <div className='score-analyse-footer-btn' onClick={() => queryScore()}>查看我的成绩分布</div>
      </div>
    </div>
  )
}

export default ScoreAnalyse;
