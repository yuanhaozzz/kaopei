import './tipModal.less';
import React, { FC } from 'react';

interface TipModalProps {
  tips: string[],
  cancel: () => void,
}

const TipModal: FC<TipModalProps> = (props) => {
  const { tips, cancel } = props;

  const tipsItemRender = () => {
    return tips.map((item: string, index: number) => {
      return (
        <div className='content-item' key={index}>
          <span className='item-order'>{index + 1}</span>
          <span className='item-text'>{item}</span>
        </div>
      )
    })
  }

  return (
    <div className='tip-modal'>
      <div className='tip-modal-main'>
        <div className='modal-title'>报名小贴士</div>
        <div className='modal-content'>
          {tipsItemRender()}
          {/* <div className='content-item'>
            <span className='item-order'>1</span>
            <span className='item-text'>关注考试官网发布的报名时间截点，提前注册个人信息，
            报名时尽可能提高网速，可提升百名成功的概率</span>
          </div>
          <div className='content-item'>
            <span className='item-order'>2</span>
            <span className='item-text'>关注考试官网发布的报名时间截点，提前注册个人信息，
            报名时尽可能提高网速，可提升百名成功的概率</span>
          </div> */}
        </div>
        <div className='modal-ok' onClick={() => { cancel() }}>确 定</div>
      </div>
    </div>
  )
}

export default TipModal;