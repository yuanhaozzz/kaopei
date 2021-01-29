import React, { FC, useState, useImperativeHandle } from 'react';
import { toast } from '../../../utils/function';
import Countdown from '@/components/countDown';
import { validateCode } from '../service';
import './phone_form.less';

interface PhoneProps {
  childRef?: any;
}

const PhoneForm: FC<PhoneProps> = (props) => {
  const { childRef } = props;
  const [formData, setFormData] = useState({
    phone: '',
    code: '',
  });
  let reg = /^[1]([3-9])[0-9]{9}$/;
  /**
   * @description: input输入change
   * @param {React} e: event对象
   * @param {number} type: 对应input 1: 手机号, 2: 验证码
   * @return {*}
   */
  const inputChange = function (e: React.ChangeEvent<HTMLInputElement>, type: number) {
    switch (type) {
      case 1:
        formData.phone = e.target.value;
        break;
      case 2:
        formData.code = e.target.value;
        break;
      default:
        break;
    }
    setFormData(Object.assign({}, formData));
  }

  /**
   * 获取验证码
   */
  const validationCode = () => {
    if (formData.phone === '' || !reg.test(formData.phone.trim())) {
      toast('error', "请输入正确的手机号");
      return false;
    }
    return true;
  }
  const sendCodeValidate = async () => {
    const res: any = await validateCode({action: 'smsValidate', smsSignId: 5, smsTemplateId: 3, validateCode: formData.code, mobile: formData.phone});
    if (res.status.code !== 0) {
      toast('error', "验证失败");
      return;
    }
    return
  }
  /**
   * 下一步
   */
  const nextStep = () => {
    if (formData.phone.trim() === '' || !reg.test(formData.phone)) {
      toast('error', "请输入正确的手机号");
      return
    }
    if (!formData.code.trim()) {
      toast('error', "请输入验证码");
      return
    }
    sendCodeValidate()
    return true
  }
  /**
   * 向父组件抛出方法
   */
  useImperativeHandle(childRef, () => ({
    phoneVerify: () => nextStep()
  }))

  return (
    <>
      <div className='phone-account'>
        <input placeholder-class="place-holder" type="text" maxLength={11} placeholder="请输入手机号" value={formData.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 1)} />
      </div>
      <div className='phone-account code-container'>
        <input placeholder-class="place-holder" type="text" maxLength={6} placeholder="请输入验证码" className="code-input" value={formData.code} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 2)} />
        <Countdown value={formData.phone} type={2} validationCode={validationCode} />
        <i></i>
      </div>
      <p>已向188****8888的手机发送短信验证码</p>
    </>
  )
}
export default PhoneForm;