/*
 * @Author: WuPeiQi
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-01-25 08:21:08
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-28 17:32:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import './reconsider.less';
import Rract, { FC, useEffect, useState } from 'react';
import { getReconsider, getReconsiderInfo } from './service';

import ReviewInstructions from '@/assets/image/review_instructions.png';

const Reconsider: FC = () => {
  let cardColorList = ['#E62A53', '#162C56', '#7F51B9', '#F1BC1A', '#91BA20'];

  const [reconsiderList, setReconsider] = useState<any[]>([]);
  const [reconsiderItem, setReconsiderItem] = useState<any>({});
  const [explainInfoStatus, setExplainInfoStatus] = useState<boolean>(false);

  useEffect(() => {
    getReconsiderList();
  }, [])

  /**
   * @description: 获取成绩复议列表
   * @param {*} async
   * @return {*}
   */
  const getReconsiderList = async () => {
    try {
      const res: any = await getReconsider();
      console.log(res)
      setReconsider(res.result);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description: 获取成绩复议说明详情
   * @param {*} async
   * @return {*}
   */
  const getReconsiderInfoData = async (id: number) => {
    try {
      const res: any = await getReconsiderInfo({ id });
      console.log(res);
      setReconsiderItem(res.result);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description: 显示复议说明详情
   * @param {number} id
   * @return {*}
   */
  const explainClick = (id: number) => {
    getReconsiderInfoData(id);
    setExplainInfoStatus(true);
  }

  /**
   * @description: 关闭复议说明详情
   * @param {*}
   * @return {*}
   */
  const closeExplain = () => {
    setExplainInfoStatus(false);
  }

  const reconsiderRender = () => {
    return reconsiderList.map((item: any, index: number) => {
      return (
        <div className='reconsider-exam-card' key={item.id} style={{ borderLeftColor: cardColorList[index] }}>
          <div className='card-left'>
            <div className='exam-name' style={{ background: cardColorList[index] }}>{item.examName}</div>
            <div className='exam-title'>复议地址</div>
            <div className='exam-url'>{item.reconsiderationUrl}</div>
            <div className='exam-tip'>请用电脑输入官网地址，完成复议事项</div>
          </div>
          <div className='reconsider-explain' onClick={() => explainClick(item.id)}>
            <img src={ReviewInstructions} alt="" />
          </div>
        </div>
      )
    })
  }

  return (
    <div className='reconsider'>
      {reconsiderRender()}
      {
        explainInfoStatus ? (
          <div className='reconsider-explain-info'>
            <div className='reconsider-explain-info-box' dangerouslySetInnerHTML={{ __html: reconsiderItem.processDescription }}></div>
            <div className='reconsider-explain-info-close'>
              <div className='close-btn' onClick={() => closeExplain()}>关闭</div>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

export default Reconsider;