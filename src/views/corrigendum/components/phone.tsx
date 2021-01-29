import React, { FC, useState, useRef } from 'react';
import PhoneForm from './phone_form';
import './phone.less';

interface PhoneProps {
  callback: (step: number) => void,
}

const Phone: FC<PhoneProps> = (props) => {
  const { callback } = props;
  const phoneVerify = useRef<any>();
  /**
   * 下一步
   */
  const nextStep = () => {
    // 组件手机号表单验证
    const verifyResult = phoneVerify.current.phoneVerify()
    if (verifyResult) {
      callback(1)
    }
  }

  return (
    <div className='phone'>
      <h3>请输入报名考试预留的手机号</h3>
      <PhoneForm childRef={phoneVerify} />
      <button className="next-form-button" onClick={nextStep}>下一步</button>
    </div>
  )
}
export default Phone;