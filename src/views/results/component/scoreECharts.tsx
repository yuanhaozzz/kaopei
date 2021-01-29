/*
 * @Author: WuPeiQi
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-01-25 17:28:54
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-27 16:59:26
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import './scoreECharts.less';
import React, { createRef, FC, ReactNode, useEffect, useRef, useState } from 'react';
import {
  AnalyseExamItem,
  ExamBatchItem,
  FormData,
  ExamScoreDistributionParams,
  ExamScoreSegment,
  ScoreDistributionItem
} from '../data.d';
import { getExamScoreDistribution } from '../service';

interface ScoreEChartsProps {
  examScoreItem: AnalyseExamItem,
  examBatchItem: ExamBatchItem,
  scoreData: FormData,
}

const ScoreECharts: FC<ScoreEChartsProps> = (props) => {
  const colorList = ['#FF7A46', '#FFBB95', '#FFD566', '#B7EB8E', '#91D5FF', '#E8E8E8'];
  const levelList = [80, 100, 120, 140, 160, 180, 200];

  const EChartsPie = useRef(null);
  const barRefList: React.RefObject<ReactNode>[] = [];
  const { examScoreItem, examBatchItem, scoreData } = props;

  const [examScoreAll, setExamScoreAll] = useState<ScoreDistributionItem>({
    batch: '',
    itemsType: -1,
    avgScore: -1,
    maxScore: -1,
    score: -1,
    excellentRate: '',
    goodRate: '',
    passRate: '',
    scoreSegmentName: '',
    examScoreSegmentList: [],
  })
  const [examScoreSubItemList, setExamScoreSubItemList] = useState<ScoreDistributionItem[]>([]);

  useEffect(() => {
    getData({
      examId: examScoreItem.examId,
      examBatchId: examBatchItem.examBatchId,
      scoreJson: JSON.stringify(scoreData),
      action: 'getExamScoreDistribution'
    });
  }, [])

  useEffect(() => {
    const { examScoreSegmentList } = examScoreAll;
    if (examScoreSegmentList.length) {
      initPie(examScoreSegmentList);
    }
  }, [examScoreAll])

  useEffect(() => {
    if (barRefList.length === examScoreSubItemList.length) {
      barRefList.forEach((item: { current: ReactNode }, index: number) => {
        initBar(item.current, examScoreSubItemList[index]);
      })
    }
  }, [examScoreSubItemList])

  /**
   * @description: 获取数据
   * @param {*}
   * @return {*}
   */
  const getData = async (params: ExamScoreDistributionParams) => {
    try {
      const res: any = await getExamScoreDistribution(params);
      const subItemList: ScoreDistributionItem[] = [];
      const { scoreDistribution } = res;
      scoreDistribution.scoreItemsDistributionList.forEach((item: ScoreDistributionItem) => {
        if (item.itemsType === 1) { // 总分
          setExamScoreAll({ ...item, batch: scoreDistribution.batch });
        } else { // 分项集合
          subItemList.push(item);
        }
      })
      setExamScoreSubItemList(subItemList);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description: 实例化pie
   * @param {ExamScoreSegment} examScoreSegmentList
   * @return {*}
   */
  const initPie = (examScoreSegmentList: ExamScoreSegment[]) => {
    const EChartsPieData = new (window as any).echarts.init(EChartsPie.current);
    const option = {
      tooltip: { show: false },
      legend: { show: false },
      color: colorList,
      series: [
        {
          type: 'pie',
          radius: ['46%', '70%'],
          avoidLabelOverlap: false,
          label: { show: false },
          emphasis: {
            label: { show: false }
          },
          labelLine: {
            show: false
          },
          data: examScoreSegmentList.map((item: ExamScoreSegment) => ({
            value: +item.rate, name: item.scoreSegmentName,
          }))
        }
      ]
    };
    EChartsPieData.setOption(option);
  }

  /**
   * @description: 实例化bar
   * @param {ReactNode} dom
   * @param {ScoreDistributionItem} item
   * @return {*}
   */
  const initBar = (dom: ReactNode, item: ScoreDistributionItem) => {
    const EChartsBarData = new (window as any).echarts.init(dom);
    const option = {
      xAxis: {
        type: 'category',
      },
      grid: {
        height: 50
      },
      yAxis: {
        show: false,
      },
      series: [{
        barWidth: 18,
        type: 'bar',
        data: [{
          name: '我的得分',
          value: item.score,
          label: { show: true, position: 'top' },
          itemStyle: { color: colorList[0] }
        }, {
          name: '最高分',
          value: item.maxScore,
          label: { show: true, position: 'top' },
          itemStyle: { color: colorList[1] }
        }, {
          name: '平均分',
          value: item.avgScore,
          label: { show: true, position: 'top' },
          itemStyle: { color: colorList[2] }
        }],
      }]
    };
    EChartsBarData.setOption(option);
  }

  /**
   * @description: 分数标尺left偏移量计算
   * @param {number} score: 当前标尺分数
   * @return {number} return: 定位left偏移量
   */
  const buoyLeft = (score: number) => {
    // (分数 - 起始) / 总量 * 100 - ( 分数标尺宽度 / 2 )
    if (score <= 80) return -(16.66 / 2);
    return (score - 80) / 120 * 100 - (16.66 / 2);
  }

  const scoreEChartsBarRender = () => {
    return examScoreSubItemList.map((item: ScoreDistributionItem, index: number) => {
      const barRef = createRef<any>();
      barRefList.push(barRef);
      return (
        <div className='score-ECharts-bar-item' key={index}>
          <div className='score-ECharts-bar-item-view' ref={barRef}></div>
          <div className='score-ECharts-bar-item-text'>{item.scoreItemsName}</div>
        </div>
      )
    })
  }

  /**
   * @description: 分项列表render
   * @param {*}
   * @return {*}
   */
  const levelListRender = () => {
    if (!examScoreAll.examScoreSegmentList.length) return null;
    const reversed = JSON.parse(JSON.stringify(examScoreAll.examScoreSegmentList)).reverse();
    return reversed.map((item: ExamScoreSegment, index: number) => {
      return (
        <li className='score-ECharts-level-item' key={index}>
          <div className='circular' style={{ background: `${colorList[index]}` }}></div>
          <div className='score-ECharts-level-item-con'>
            <span className='subitem-label'>{item.scoreSegmentName}</span>
            <span style={{ color: '#0F0F0F' }}>{item.minScore}-{item.maxScore}</span>
          </div>
        </li>
      )
    })
  }

  return (
    <div className='score-ECarts'>
      <div className='score-ECarts-tips'>本成绩分析，基于“考试批次”次北外国际考点参考考生成绩。</div>
      {/* 通过率 */}
      <div className='score-ECharts-item pass_rate'>
        <div className='score-ECharts-item-title'>北外考点{examScoreAll.batch}成绩分布</div>
        <div className='score-ECharts-item-number'>通过率 {examScoreAll.passRate}%</div>
        <ul className='score-ECharts-item-statistics'>
          <li className='statistics-item'>
            <div className='statistics-item-sort circular' style={{ backgroundColor: `${colorList[0]}` }}></div>
            <div className='statistics-item-number'>优秀率: {examScoreAll.excellentRate}%</div>
          </li>
          <li className='statistics-item'>
            <div className='statistics-item-sort circular' style={{ backgroundColor: `${colorList[1]}` }}></div>
            <div className='statistics-item-number'>良好率: {examScoreAll.goodRate}%</div>
          </li>
        </ul>
        <div className='score-ECharts-body'>
          <div className='score-ECharts-main'>
            <div className='score-ECharts-main-data' id='ECharts-pie' ref={EChartsPie}></div>
          </div>
          <ul className='score-ECharts-level-list'>
            {levelListRender()}
          </ul>
        </div>
      </div>
      {/* 学生成绩level */}
      <div className='score-ECharts-item student-level'>
        <div className='score-ECharts-item-title'>北外考点{examScoreAll.batch} 考试成绩</div>
        <div className='score-ECharts-item-number'>我的成绩 {examScoreAll.scoreSegmentName}</div>
        <ul className='score-student-level-explain'>
          <li className='score-student-level-explain-item user'>我的得分</li>
          <li className='score-student-level-explain-item highest'>最高分</li>
          <li className='score-student-level-explain-item average'>平均分</li>
        </ul>
        <div className='score-ECharts-scale'>
          <div className='score-ECharts-scale-calipers'>
            <div className='score-ECharts-scale-head'></div>
            {/* level刻度尺 */}
            <div className='score-ECharts-scale-box'>
              <ul className='score-ECharts-scale-list'>
                {
                  levelList.map((item: any, index: number) => {
                    if (index === levelList.length - 1) return null;
                    return <li className='score-ECharts-scale-list-item' key={item}></li>
                  })
                }
              </ul>
              {/* level刻度数 */}
              <ul className='score-ECharts-scale-number'>
                {
                  levelList.map((item: number) => {
                    return <li className='score-ECharts-scale-number-item' key={item}>{item}</li>
                  })
                }
              </ul>
              {/* 分数标尺 */}
              <div className='score-ECharts-scale-buoy buoy-average' style={{ left: `${buoyLeft(examScoreAll.avgScore)}%` }}>{examScoreAll.avgScore}</div>
              <div className='score-ECharts-scale-buoy buoy-highest' style={{ left: `${buoyLeft(examScoreAll.maxScore)}%` }}>{examScoreAll.maxScore}</div>
              <div className='score-ECharts-scale-buoy-user' style={{ left: `${buoyLeft(examScoreAll.score)}%` }}>{examScoreAll.score}</div>
            </div>
            <div className='score-ECharts-scale-tail'></div>
          </div>
        </div>
      </div>
      {/* 考试分项得分 */}
      <div className='score-ECharts-item bar'>
        <div className='score-ECharts-item-title'>北外考点{examScoreAll.batch} 考试分项得分</div>
        <ul className='score-student-level-explain'>
          <li className='score-student-level-explain-item user'>我的得分</li>
          <li className='score-student-level-explain-item highest'>最高分</li>
          <li className='score-student-level-explain-item average'>平均分</li>
        </ul>
        <div className='score-ECharts-bar-list'>
          {scoreEChartsBarRender()}
        </div>
      </div>
    </div>
  )
}

export default ScoreECharts;