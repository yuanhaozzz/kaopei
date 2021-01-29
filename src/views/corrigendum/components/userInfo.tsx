import React, { FC, useState, useRef } from 'react';
import Radio from '@/components/radio';
import Upload from '@/components/upload';
import PhoneForm from './phone_form';
import ConfirmModal from './confirmModal';

import Idcard from '@/assets/image/id_card.png';
import DeleteImg from '@/assets/image/close_icon.png';
import './userInfo.less';

interface userInfoProps {
  callback: (step: number) => void,
}

const UserInfo: FC<userInfoProps> = (props) => {
  const { callback } = props;
  let timer: any;
  const wx = (window as any).wx
  const phoneVerify = useRef<any>();
  const [formData, setFormData] = useState({
    name: '',
    spellName: '',
    idNum: '',
  });
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [nameStatus, setNameStatus] = useState<boolean>(true);
  const [spellStatus, setSpellStatus] = useState<boolean>(true);
  const [idStatus, setIdStatus] = useState<boolean>(true);
  const [idImg, setIdImg] = useState<string[]>([]);

  /**
   * form-disable
   */
  const changeDisable = (e: any, value: any) => {
    let checkStatus = e.target.checked
    if (value === 1 && checkStatus) {
      setNameStatus(false);
    } else if (value === 1 && checkStatus === false) {
      formData.name = ''
      setFormData(Object.assign({}, formData));
      setNameStatus(true);
    }
    if (value === 2 && checkStatus) {
      setSpellStatus(false);
    } else if (value === 2 && checkStatus === false) {
      formData.spellName = ''
      setFormData(Object.assign({}, formData));
      setSpellStatus(true);
    }
    if (value === 3 && checkStatus) {
      setIdStatus(false);
    } else if (value === 3 && checkStatus === false) {
      formData.idNum = ''
      setFormData(Object.assign({}, formData));
      setIdStatus(true);
    }
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
        formData.name = e.target.value;
        break;
      case 2:
        formData.spellName = e.target.value;
        break;
      case 3:
        formData.idNum = e.target.value;
        break;
      default:
        break;
    }
    setFormData(Object.assign({}, formData));
  }
  /**
   * 上一步
   */
  const prev = () => {
    callback(0)
  }
  /**
   * 显示确认提交
   */
  const modalShow = () => {
    // 组件手机号表单验证
    const verifyResult = phoneVerify.current.phoneVerify();
    if (!verifyResult) {
      return
    }
    setModalStatus(true)
  }
  /**
   * 关闭modal
   */
  const cancel = () => {
    setModalStatus(false)
  }
  /**
   * 勘误学生信息
   */
  const rederCorrigendum = () => {
    return (
      <>
        <div className='input-item'>
          <Radio text='' value={1} onChange={changeDisable} />
          <h4>姓&nbsp;&nbsp;&nbsp;名</h4>
          <input disabled={nameStatus} className='input-info' placeholder-class="place-holder" type="text" placeholder="请输入考生姓名" value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 1)} />
        </div>
        <div className='input-item'>
          <Radio text='' value={2} onChange={changeDisable} />
          <h4>拼&nbsp;&nbsp;&nbsp;音</h4>
          <input disabled={spellStatus} className='input-info' placeholder-class="place-holder" type="text" placeholder="请全部用大写字母拼写" value={formData.spellName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 2)} />
        </div>
        <div className='input-item'>
          <Radio text='' value={3} onChange={changeDisable} />
          <h4>证件号</h4>
          <input disabled={idStatus} className='input-info' placeholder-class="place-holder" type="text" placeholder="请输入证件号" value={formData.idNum} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 3)} />
        </div>
      </>
    )
  }

  const uploadCallback = (value: string[]) => {
    setIdImg(idImg.concat([...value]));
  }
  /**
   * 删除
   */
  const deleteImg = (index: number) => {
    idImg.splice(index, 1);
    setIdImg(idImg.slice(0));
  }
  /**
   * 上传的图片
   */
  const imageRender = () => {
    return idImg && idImg.map((item: string, index: number) => {
      return (
        <div key={index} className='idcard-img'>
          <div className='option-img_delete' onClick={() => deleteImg(index)}>
            <img src={DeleteImg} alt="" />
          </div>
          <img src={`${process.env.REACT_APP_CDN_HOST}${item}`} alt="" />
        </div>
      )
    })
  }
  /**
   * 身份证
   */
  const renderUpload = () => {
    return (
      <>
        <div className='upload-content'>
          {imageRender()}
          {
            idImg && idImg.length === 0 && (
              <div className='upload-area'>
                <Upload bucketType={1}  serviceLine='exam/corrigendum' callback={uploadCallback} />
                <img src={Idcard} />
                <div className='tip'>上传身份证证明</div>
              </div>
            )
          }
          
        </div>
      </>
    )
  }
  /**
   * 勘误盒子
   */
  const renderCorrigendumContent = () => {
    return (
      <div className='corrigendum-content'>
        <h3>请选择需要勘误的内容</h3>
        {
          rederCorrigendum()
        }
        <h3>上传身份信息<span>用于工作人员核对您勘误的信息</span></h3>
        {
          renderUpload()
        }
      </div>
    )
  }
  /**
   * 手机号模块
   */
  const renderPhoneContent = () => {
    return (
      <div className='phone'>
        <h3>请留下您的联系方式 <span>审核有疑问时与您确认</span></h3>
        <PhoneForm childRef={phoneVerify} />
      </div>
    )
  }
  /**
   * 底部按钮
   */
  const renderFooter = () => {
    return (
      <div className='footer'>
        <button className="prev-form-button" onClick={prev}>上一步</button>
        <button className="next-form-button" onClick={modalShow}>提 交</button>
      </div>
    )
  }

  return (
    <>
      {/* 勘误 */}
      {
        renderCorrigendumContent()
      }
      {/* 手机 */}
      {
        renderPhoneContent()
      }
      {/* 按钮 */}
      {
        renderFooter()
      }
      {/* 弹窗 */}
      {
        modalStatus && <ConfirmModal name={formData.name} spellName={formData.spellName} idNum={formData.idNum} idImg={idImg} cancel={cancel} />
      }
    </>
  )
}
export default UserInfo;