import './confirmModal.less';
import React, { FC, useState } from 'react';
import { completeCorrigendum } from '../service';
import { CorrigendumParams } from '../data.d';

import CloseIcon from '@/assets/image/close_icon.png'

interface ConfirmModalProps {
  name: string,
  spellName: string,
  idNum: string | number,
  idImg: string[],
  cancel: () => void,
}

const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { name, spellName, idNum, idImg, cancel } = props;
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [modalType, setModalType] = useState<number>(0); // 0 (默认)提交框 1 提示框

  const submitCorrigendum = async (data: CorrigendumParams) => {
    try {
      const res: any = await completeCorrigendum(data);
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const showTipModal = () => {
    const params = {
      examId: 1,
      examBatchId: 1,
      examItemId: 1,
      examCandidateNumber: 1,
      examCandidateName: 'name',
      idNumber: 1,
      firstNamePinyin: 'pinyin',
      lastNamePinyin: 'pinyin',
      idNumberImgUrl: idImg.join(''),
      phone: 1,
      token: 'string',
    }
    submitCorrigendum(params)
    setModalStatus(true);
    setModalType(1);
  }
  /**
   * 确认提交模态框
   */
  const confirmModal = () => {
    return (
      modalType === 0 &&
      <>
        <img src={CloseIcon} onClick={() => { cancel() }} />
        <div className='modal-title'>勘误信息确认</div>
        <div className='modal-content'>
          {
            name && <div className='content-item'>
              <span className='item-order'>姓&nbsp;&nbsp;&nbsp;&nbsp;名</span>
              <span className='item-text'>{name}</span>
            </div>
          }
          {
            spellName && <div className='content-item'>
              <span className='item-order'>拼&nbsp;&nbsp;&nbsp;&nbsp;音</span>
              <span className='item-text'>{spellName}</span>
            </div>
          }
          {
            idNum && <div className='content-item'>
              <span className='item-order'>证件号</span>
              <span className='item-text'>{idNum}</span>
            </div>
          }
        </div>
        <div className='modal-ok' onClick={showTipModal}>确 定</div>
      </>
    )
  }
  /**
   * 提交成功后的提示模态框
   */
  const tipModal = () => {
    return (
      modalType === 1 &&
      <>
        <img src={CloseIcon} onClick={() => { cancel() }} />
        <div className='modal-title'>申请成功</div>
        <div className='modal-content'>
          勘误信息已提交，请耐心等待工作人员审核。
        </div>
        <div className='modal-ok' onClick={() => { cancel() }}>确 定</div>
      </>
    )
  }

  return (
    <div className='confirm-modal'>
      <div className='confirm-modal-main'>
        {/* {确认框} */}
        {
          confirmModal()
        }
        {/* {提示框} */}
        {
          modalStatus && tipModal()
        }
      </div>
    </div>
  )
}

export default ConfirmModal;