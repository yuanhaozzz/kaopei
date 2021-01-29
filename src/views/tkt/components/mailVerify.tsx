import React, { FC, useState } from 'react';
import Button from '@/components/button';
import Countdown from '@/components/countDown';
import { useUserInfoStore } from '@/store';
import { CheckoutParams, CheckMailCodeParams } from '../data';
import { CheckMailCode } from '../service';
import { toast } from '@/utils/function';
import './mailVerify.less';

interface MailVerifyProps {
  routeType: number,
  callback: (step: number, type?: number) => void,
}

const MailVerify: FC<MailVerifyProps> = (props) => {
  const { routeType, callback } = props;
  const [formData, setFormData] = useState({
    mail: '',
    code: '',
  });
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  const [checkResult, setCheckResult] = useState<boolean>(false);
  const { getToken } = useUserInfoStore();

  /**
   * @description: input输入change
   * @param {React} e: event对象
   * @param {number} type: 对应input 1: 邮箱, 2: 验证码
   * @return {*}
   */
  const inputChange = function (e: React.ChangeEvent<HTMLInputElement>, type: number) {
    switch (type) {
      case 1:
        formData.mail = e.target.value;
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
    if (formData.mail === '' || !reg.test(formData.mail.trim())) {
      toast('error', "请输入正确的邮箱账号");
      return false;
    }
    return true;
  }
  /**
   * 验证码验证
   */
  const checkoutCode = async (data: CheckMailCodeParams) => {
    let isPass = true;
    try {
      const res: any = await CheckMailCode(data);
      isPass = true;
    } catch (error) {
      if(error !== 0 ) {
        isPass = false;
      }
    } finally {
      console.log(isPass)
      return isPass;
    }
  }
  /**
   * 上一步
   */
  const prev = () => {
    callback(0, routeType);
  }
  /**
   * 下一步
   */
  const next = async () => {
    if (formData.mail.trim() === '' || !reg.test(formData.mail)) {
      toast('error', "请输入正确的邮箱");
      return;
    }
    if (!formData.code.trim()) {
      toast('error', "请输入验证码");
      return;
    }
    const checkedParams = {
      action: 'checkValidateCode',
      token: getToken,
      validateCode: formData.code
    }
    let check = await checkoutCode(checkedParams);
    if(!check) return;
    callback(2);
  }
  /**
   * 邮箱表单
   */
  const renderForm = () => {
    return (
      <div className='mail-form'>
        <div className='mail-account'>
          <h3>邮箱</h3>
          <input placeholder-class="place-holder" type="text" placeholder="请输入您的工作邮箱" className="mail-form-account" value={formData.mail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 1)} />
        </div>
        <h4>如无，请致电：</h4>
        <div className='mail-account code-container'>
          <h3>验证码</h3>
          <input placeholder-class="place-holder" type="text" placeholder="请输入您邮箱获取的验证码" maxLength={6} className="mail-form-code" value={formData.code} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 2)} />
          <Countdown value={formData.mail} type={1} validationCode={validationCode} />
          <i></i>
        </div>
        <h4>已向邮箱发送验证码，请打开邮箱获取验证信息</h4>
        <Button prev={prev} next={next} />
      </div>
    )
  }

  return (
    <>
      {
        renderForm()
      }
    </>
  )
}

export default MailVerify;