import React, { FC, useEffect, useState } from 'react';
import { useUserInfoStore } from '@/store';
import Upload from '@/components/upload';
import { getQuestions, saveFeedback } from '@/views/setting/service';
import { SaveFeedbackParams } from '@/views/setting/data.d';

import Camera from '@/assets/image/camera.png';
import './style.less';

const Feedback: FC = () => {
  const { getToken } = useUserInfoStore();

  const [dataList, setDataList] = useState<[]>([]);
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [description, setDescription] = useState<string>('');
  const [imgList, setImgList] = useState<string[]>([]);

  useEffect(() => {
    getQuestionsList();
  }, []);

  /**
   * @description: 获取问题列表
   * @param {*} async
   * @return {*}
   */
  const getQuestionsList = async () => {
    const res: any = await getQuestions({ action: 'getFeedbackTypeList' });
    setDataList(res.list);
  }

  /**
   * @description: 选中问题类型
   * @param {any} data
   * @return {*}
   */
  const handleClick = (data: any) => {
    const idx = checkedList.findIndex((item: any) => item.name === data.name)
    ~idx ? checkedList.splice(idx, 1) : checkedList.push(data);
    setCheckedList(checkedList.splice(0));
  }

  /**
   * @description: 问题描述
   * @param {any} e
   * @return {*}
   */
  const setShowDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  /**
   * @description: Upload组件回调
   * @param {string} value
   * @return {*}
   */
  const uploadCallback = (value: string[]) => {
    console.log(value)
    setImgList(value.splice(0));
  }

  /**
   * @description: 提交反馈
   * @param {*} async
   * @return {*}
   */
  const submitFeedback = async () => {
    const params: SaveFeedbackParams = {
      action: 'saveFeedback',
      token: getToken || '',
      typeids: checkedList.map((item) => item.value).join(','),
      content: description,
      files: imgList.join(',')
    }
    try {
      const res: any = await saveFeedback(params);
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  }
  
  /**
   * @description: 问题列表
   * @param {*}
   * @return {*}
   */
  const renderQuestions = () => {
    return (
      <div className='question-wrapper'>
        <h3>问题类型</h3>
        <div className='question-list'>
          <ul>
            {
              dataList && dataList.map((item: any, index: any) => {
                return (
                  <li className={checkedList.some(items => items.value === item.value) ? 'current' : ''}
                    onClick={() => handleClick(item)}
                    key={index}>{item.name}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  /**
   * @description: 反馈问题说明及图片
   * @param {*}
   * @return {*}
   */
  const renderTextarea = () => {
    return (
      <div className='question-wrapper'>
        <h3>问题说明</h3>
        <div className='question-area'>
          <textarea placeholder="请输入您要反馈的问题（5-200字以内）" maxLength={200} value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setShowDescription(e)}></textarea>
        </div>
        <div className='upload-img'>
          <Upload bucketType={0} serviceLine='exam/feedbacks' callback={uploadCallback} />
          <img src={Camera} alt='' />
          <p>添加图片</p>
        </div>
      </div>
    )
  }

  return (
    <div className='feedback'>
      {renderQuestions()}
      {renderTextarea()}
      <button className="form-button" onClick={submitFeedback}>提 交</button>
    </div>
  )
}

export default Feedback;