/*
 * @Author: WuPeiQi
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-01-29 09:51:44
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-29 11:17:10
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */

import './style.less';
import React, { FC, useEffect, useState } from 'react';
import { findWechatUrlValue, toast } from '@/utils/function';
import { useUserInfoStore } from '@/store';
import { ExamPreferenceParams, PreferenceItem } from '../../data.d';
import { getExamPreference, saveExamPreference } from '../../service';

const Preference: FC = () => {
  const { getMpId, getOpenId } = useUserInfoStore();

  const [examTypeList, setExamTypeList] = useState<PreferenceItem[]>([]);
  const [serviceContentList, setServiceContentList] = useState<PreferenceItem[]>([]);

  useEffect(() => {
    getPreferenceList({
      action: 'getExamPreference',
      appId: getMpId || findWechatUrlValue('type'),
      openId: getOpenId || '1'
    });
  }, [])

  const getPreferenceList = async (params: ExamPreferenceParams) => {
    const res: any = await getExamPreference(params);
    setExamTypeList(res.preference.examTypeList);
    setServiceContentList(res.preference.serviceContentList);
  }

  const preferenceItemClick = (type: number, index: number, isSelect: boolean) => {
    if (type === 1) {
      examTypeList[index].isSelect = !isSelect;
      setExamTypeList(examTypeList.splice(0));
    } else {
      serviceContentList[index].isSelect = !isSelect;
      setServiceContentList(serviceContentList.splice(0));
    }
  }

  const getParamsPreferenceTemplateId = () => {
    const idList: number[] = [];
    examTypeList.forEach((item: PreferenceItem) => {
      if (item.isSelect) idList.push(item.preferenceTemplateId)
    })
    serviceContentList.forEach((item: PreferenceItem) => {
      if (item.isSelect) idList.push(item.preferenceTemplateId)
    })
    console.log(idList);
    return JSON.stringify(idList);
  }

  const submit = async () => {
    try {
      const params = {
        action: 'getExamPreference',
        appId: getMpId || findWechatUrlValue('type'),
        openId: getOpenId || '1',
        preferenceTemplateId: getParamsPreferenceTemplateId()
      }
      const res: any = await saveExamPreference(params);
      console.log(res);
      toast('success', '保存成功');
    } catch (error) {
      console.log(error);
    }
  }

  const examPreferenceRender = (type: number) => {
    return type === 1 ? examTypeList.map((item: PreferenceItem, index: number) => {
      return <li
        className={['preference-item', item.isSelect ? 'active' : ''].join(' ')}
        key={item.preferenceTemplateId}
        onClick={() => preferenceItemClick(type, index, item.isSelect)}
      >{item.title}</li>
    }) : serviceContentList.map((item: PreferenceItem, index: number) => {
      return <li
        className={['preference-item', item.isSelect ? 'active' : ''].join(' ')}
        key={item.preferenceTemplateId}
        onClick={() => preferenceItemClick(type, index, item.isSelect)}
      >{item.title}</li>
    })
  }

  return (
    <div className='preference'>
      <div className='preference-exam'>
        <div className='preference-title'>考试类型</div>
        <ul className='preference-list'>{examPreferenceRender(1)}</ul>
      </div>
      <div className='preference-service'>
        <div className='preference-title'>服务内容</div>
        <ul className='preference-list'>{examPreferenceRender(2)}</ul>
      </div>
      <div className='preference-footer'>
        <div className='preference-footer-btn' onClick={() => submit()}>保存</div>
      </div>
    </div>
  )
}

export default Preference
