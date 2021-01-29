import { toast } from '@/utils/function';
import React, { FC, useState } from 'react';
import { sendMailCode, sendPhoneCode } from './service';
import { SendMailCodeParams, SendPhoneCodeParams } from './data';
import { useUserInfoStore } from '@/store';
import './style.less';

interface CountDownProps {
  value?: string | number, // 1 邮箱 2 手机
  type?: string | number,
  validationCode: () => {}
}

const CountDown: FC<CountDownProps> = (props) => {
  const { value, type, validationCode } = props;
  const [time, setTime] = useState<number>(0);
  const [codeFlag, setCodeFlag] = useState<boolean>(false);
  const { getToken } = useUserInfoStore();
  /**
   * 获取验证码
   */
  const getCode = () => {
    const result = validationCode();
    if(!result) {return};
    const mailParams = {
      action: 'sendValidateCodeToEmail',
      token: getToken,
      email: value ? value : ''
    }
    const phoneParams = {
      action: 'smsSend',
      smsSignId: 5,
      smsTemplateId: 3,
      mobile: value ? value : '',
      validateCode: 6
    }
    type === 1 ? sendMail(mailParams) : sendPhone(phoneParams);
  }
  
  const sendMail = async (data: SendMailCodeParams) => {
    try {
      const res: any = await sendMailCode(data);
      toast('success', '发送成功');
      countdown();
    } catch (error) {
      console.log(error);
    }
  }

  const sendPhone = async (data: SendPhoneCodeParams) => {
    try {
      const res: any = await sendPhoneCode(data);
      toast('success', '发送成功');
      countdown();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 倒计时
   */
  const countdown = () => {
    let time = 60;
    let timer: any = '';
    timer = setInterval(() => {
      time--;
      setTime(time);
      if (time <= 0) {
        clearInterval(timer);
        setTime(60);
        setCodeFlag(false);
        return
      }
      setTime(time);
      setCodeFlag(true);
    }, 1000);
  }
  
  return (
    <div className='code-btn' onClick={getCode}>{codeFlag ? time : '获取验证码'}</div>
  )
}

export default CountDown;