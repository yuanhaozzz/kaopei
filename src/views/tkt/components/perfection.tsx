import React, { FC, useEffect, useState } from 'react';
import Countdown from '@/components/countDown';
import Button from '@/components/button';
import { CheckCode } from '../service';
import { useUserInfoStore } from '@/store';
import { CheckoutParams, UserInfoParams } from '../data';
import { toast } from '@/utils/function';
import './perfection.less'

interface PerfectionProps {
  userInfo: UserInfoParams,
  routeType: number,
  formCallback: (data: UserInfoParams) => void,
  callback: (step: number, type?: number) => void,
}

const Perfection: FC<PerfectionProps> = (props) => {
  const { userInfo, routeType, formCallback, callback } = props;
  const [formData, setFormData] = useState<UserInfoParams>(userInfo);
  const [birthday, setBirthday] = useState<string>('');
  const { getToken } = useUserInfoStore();
  const phoneReg = /^[1]([3-9])[0-9]{9}$/;
  const mailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  const upperReg = /^([A-Z])+$/; 

  /**
   * 验证
   */
  const validation = () => {
    if (formData.userName.trim() === '') {
      toast('error', "请输入正确的姓名");
      return false;
    };
    if (formData.lastName.trim() === '' || !upperReg.test(formData.lastName)) {
      toast('error', "请输入正确的拼音姓");
      return false;
    };
    if (formData.firstName.trim() === '' || !upperReg.test(formData.firstName)) {
      toast('error', "请输入正确的拼音名");
      return false;
    };
    if (formData.gender.trim() === '') {
      toast('error', "请选择性别");
      return false;
    };
    if (formData.idNum.trim() === '') {
      toast('error', "请输入正确的身份证号");
      return false;
    };
    if (formData.mail.trim() === '' || !mailReg.test(formData.mail)) {
      toast('error', "请输入正确的邮箱");
      return false;
    };
    if (formData.phone.trim() === '' || !phoneReg.test(formData.phone)) {
      toast('error', "请输入正确的手机号");
      return false;
    };
    if (formData.code.trim() === '') {
      toast('error', "请输入正确的验证码");
      return false;
    };
    return true;
  }
  /**
   * @description: input输入change
   * @param {React} e: event对象
   * @param {number} type: 对应input 1: 姓名, 2: 拼音, 3: 身份证号
   * @return {*}
   */
  const inputChange = function (e: React.ChangeEvent<HTMLInputElement>, type: number) {
    switch (type) {
      case 1:
        formData.userName = e.target.value;
        break;
      case 2:
        formData.lastName = e.target.value;
        break;
      case 3:
        formData.firstName = e.target.value;
        break;
      case 4:
        formData.gender = e.target.value;
        break;
      case 5:
        formData.idNum = e.target.value;
        getBirthday();
        break;
      case 6:
        formData.mail = e.target.value;
        break;
      case 7:
        formData.phone = e.target.value;
        break;
      case 8:
        formData.code = e.target.value;
        break;
      default:
        break;
    }
    setFormData(Object.assign({}, formData));
  }
   /**
   * 获取生日
   */
  const getBirthday = () => {
    if (formData.idNum != null && formData.idNum != "") {
      if (formData.idNum.length) {
        setBirthday(formData.idNum.trim().substr(6, 8));
      }
      formData.birthday = birthday;
    } else {
      setBirthday('');
    }
  }
  /**
   * 获取验证码
   */
  const validationCode = () => {
    if (formData.mail.trim() === '' || !mailReg.test(formData.mail)) {
      toast('error', "请输入正确的邮箱");
      return false;
    };
    if (formData.phone === '' || !phoneReg.test(formData.phone.trim())) {
      toast('error', "请输入正确的手机号");
      return false;
    }
    return true;
  }
  /**
   * 验证码验证
   */
  const checkoutCode = async (data: CheckoutParams) => {
    let isPass = true;
    try {
      const res: any = await CheckCode(data);
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
    callback(1, routeType);
  }
  /**
   * 下一步
   */
  const next = async () => {
    const result = validation();
    if (!result) { return };
    const checkedParams = {
      action: 'smsValidate',
      smsSignId: 5,
      smsTemplateId: 3,
      validateCode: formData.code,
      mobile: formData.phone
    }
    let check = await checkoutCode(checkedParams);
    if(!check) return;
    formCallback(formData);
    callback(3, routeType);
  }
  /**
   * 报名信息
   */
  const renderRegistration = () => {
    return (
      <div className='perfection-panel'>
        <h2><i></i>完善报名信息</h2>
        <div className='input-item'>
          <h3>中文姓名：</h3>
          <input placeholder-class="place-holder" type="text" placeholder="请输入您的中文姓名" className="userName" value={formData.userName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 1)} />
        </div>
        <div className='input-item'>
          <h3>拼音姓：</h3>
          <input placeholder-class="place-holder" type="text" placeholder="请全部用大写字母拼写" className="lastName" value={formData.lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 2)} />
        </div>
        <div className='input-item'>
          <h3>拼音名：</h3>
          <input placeholder-class="place-holder" type="text" placeholder="请全部用大写字母拼写" className="firstName" value={formData.firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 3)} />
        </div>
        <div className='input-item radio-reset'>
          <h3>性&nbsp;&nbsp;&nbsp;&nbsp;别：</h3>
          <label htmlFor="male">
            <input className='radio_type' type="radio" name="sex" id="male" value={1} checked={formData.gender === '1'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 4)} />男
          </label>
          <label htmlFor="female">
            <input className='radio_type' type="radio" name="sex" id="female" value={2} checked={formData.gender === '2'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 4)} />女
          </label>
        </div>
        <div className='input-item'>
          <h3>身份证：</h3>
          <input placeholder-class="place-holder" type="text" placeholder="请输入身份证号码" className="id" maxLength={18} value={formData.idNum} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 5)} />
        </div>
        <div className='input-item'>
          <h3>生&nbsp;&nbsp;&nbsp;&nbsp;日：</h3>
          <input placeholder-class="place-holder" type="text" placeholder="生日" className="birthday" value={birthday} onChange={() => { }} />
        </div>
      </div>
    )
  }
  /**
  * 联系方式
  */
  const renderContact = () => {
    return (
      <div className='perfection-panel'>
        <h2><i></i>预留联系方式</h2>
        <div className='input-item'>
          <h3>联系邮箱：</h3>
          <input placeholder-class="place-holder" type="text" placeholder="请输入您的邮箱" className="mail" value={formData.mail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 6)} />
        </div>
        <div className='input-item'>
          <h3>联系电话：</h3>
          <input placeholder-class="place-holder" type="text" placeholder="请输入您的电话" maxLength={11} className="mobile" value={formData.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 7)} />
        </div>
        <div className='input-item code-container'>
          <h3>验&nbsp;&nbsp;证&nbsp;&nbsp;码：</h3>
          <input placeholder-class="place-holder" type="text" placeholder="请输入验证码" maxLength={6} className="code" value={formData.code} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 8)} />
          <Countdown value={formData.phone} type={2} validationCode={validationCode} />
          <i></i>
        </div>
        <div className='code-tip'>验证码已发送，请注意查收</div>
      </div>
    )
  }

  return (
    <div className='perfection'>
      <div className='perfection-form'>
        {/* 报名信息 */}
        {
          renderRegistration()
        }
        {/* 联系方式 */}
        {
          renderContact()
        }

      </div>
      <Button prev={prev} next={next} routeType={routeType}/>
    </div>
  )
}

export default Perfection;