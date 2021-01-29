import './modal.less';
import React, { FC } from 'react';
import { ExpressData, ExpressItem } from '../data.d';

import Close from '@/assets/image/close_icon.png';
import ExpressInfo from '@/assets/image/express_info.png';
import ExpressInTransit from '@/assets/image/express_in_transit.png';
import ExpressNoInfo from '@/assets/image/express_no_info.png';
import ExpressGetSuccess from '@/assets/image/express_get_success.png';
import ExpressGet from '@/assets/image/express_get.png';

interface ModalProps {
  status: number, // 1: 提交申寄 2: 申请成功 3: 证书待寄出 4: 证书已寄出无物流 5: 证书已寄出有物流
  expressData?: ExpressData;
  callback: () => void;
}

const Modal: FC<ModalProps> = (props) => {
  const { status, expressData, callback } = props;

  const close = () => {
    callback();
  }

  const expressTimeText = (value: string) => {
    const hours = +new Date(value).getHours();
    return `${value.substr(11, 5)} ${hours < 12 ? '上午' : '下午'}`
  }

  const expressIcon = (index: number) => {
    if (expressData && !index) {
      if (expressData.state === '3') {
        return <img className='item-status-icon' src={ExpressGet} alt="" />;
      }
    }
    return <img className='item-status-icon' src={ExpressInTransit} alt="" />;
  }

  const modalTitleText = () => {
    switch (status) {
      case 1:
        return '邮寄信息确认';
      case 2:
        return '申请成功';
      case 3:
        return '证书待寄出';
      default:
        return '证书已寄出';
    }
  }

  const expressListRender = () => {
    return expressData?.data.map((item: ExpressItem, index: number) => {
      return (
        <li className='send-info-item' key={index}>
          <span className='item-time'>{expressTimeText(item.time)}</span>
          <span className='item-status'>{expressIcon(index)}</span>
          <span className='item-con bottom-line'>{item.context}</span>
        </li>
      )
    })
  }

  const modalConRender = () => {
    switch (status) {
      case 1: //提交申寄
        return (
          <div className='modal-submit'>
            <div className='express-info'>
              <div className='express--info-contacts'>
                <span className='contacts-name'>陈考培</span>
                <span className='contacts-mobile'>18600871563</span>
              </div>
              <div className='express-info-address'>
                北京 北京市 海淀区 西三环北路 紫竹院街道 19号 北京外国语大学西校区
              </div>
            </div>
            <div className='exam-list'>
              <div className='exam-list-item'>
                <span className='exam-name'>TKT</span>
                <span className='exam-time'>2020-12-24</span>
              </div>
              <div className='exam-list-item'>
                <span className='exam-name'>剑桥通用英语五级-KET</span>
                <span className='exam-time'>2020-12-24</span>
              </div>
            </div>
            <div className='express-footer flex-between'>
              <div className='express-footer-btn back' onClick={() => { callback() }}>返 回</div>
              <div className='express-footer-btn submit'>确 定</div>
            </div>
          </div>
        );
      case 2: // 申请成功
        return (
          <div className='modal-success'>
            <div className='success-con'>
              工作人员会按照您预留的信息给您寄送证书。发件状态会在快递寄出后同步
            </div>
            <div className='success-footer flex-center'>
              <div className='footer-btn-ok' onClick={() => { callback() }}>确 定</div>
            </div>
          </div>
        )
      case 3:
      case 4:
      case 5: // 证书申寄成功后物流信息
        return (
          <div className='modal-express'>
            <div className='express-status flex-between'>
              <div className='express-status-icon' onClick={() => close()}>
                <img className='express-status-icon_img' src={status !== 3 ? ExpressInfo : ExpressNoInfo} alt="" />
              </div>
              <div className='express-status-con'>
                {
                  status !== 3 ? (
                    <ul className='express-status-sent'>
                      <li className='express-name'>顺丰快递</li>
                      <li className='express-number'>2983 9381 0398098</li>
                      <li className='express-copy'>复制</li>
                    </ul>
                  ) : (
                      <div className='express-status-no_sent'>
                        您的证书，正在等待寄出，请耐心等待
                      </div>
                    )
                }
              </div>
            </div>
            <ul className='express-send-info'>
              {expressListRender()}
            </ul>
            <div className='express-tips'>如有疑问，请拨打：010-63987112</div>
          </div>
        )
      default:
        break;
    }
  }

  return (
    <div className='modal'>
      <div className='modal-box'>
        {
          status > 2 ? (
            <div className='modal-close' onClick={() => { callback() }}>
              <img className='modal-close-img' src={Close} alt="" />
            </div>
          ) : null
        }
        <div className='modal-title'>{modalTitleText()}</div>
        {modalConRender()}
      </div>
    </div>
  )
}

export default Modal;