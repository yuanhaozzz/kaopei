/*
 * @Author: WuPeiQi
 * @description: 复选框组件
 * @path: 引入路径
 * @Date: 2021-01-12 14:15:12
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-24 10:14:18
 * @mustParam: text: label展示内容,
 * onChange: 复选框change事件 返回event元素及传入组件的value（无传入不返回value）
 * @optionalParam: value: 当前传入组件中的value值
 */
import './style.less';
import React, { FC } from 'react';

interface RadioProps {
  text: string | number,
  value?: any,
  checked?: boolean,
  onChange: (e: any, value?: any) => void,
}

const Radio: FC<RadioProps> = (props) => {
  const { text, value, checked, onChange } = props;

  return (
    <div className='radio-box'>
      <input className='radio' type="checkbox" checked={checked && checked} onChange={(e) => {onChange(e, value && value)}}/>
      <label>{text}</label>
    </div>
  )
}

export default Radio;