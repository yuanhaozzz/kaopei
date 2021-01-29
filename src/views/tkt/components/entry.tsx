import React, { FC, useState } from 'react';

import Isteacher from '@/assets/image/tkt_user_avatar3.png'
import Noteacher from '@/assets/image/tkt_user_avatar2.png'
import './entry.less'

interface EntryProps {
  callback: (step: number, type?: number) => void,
}

const Entry: FC<EntryProps> = (props) => {
  const { callback } = props;

  const jumpToTeacher = (type: number) => {
    if (!type) {
      callback(1)
    } else {
      callback(2, 1)
    }

  }

  return (
    <div className='tkt'>
      <div className='tkt-identity'>
        <div className='tkt-welcomes'>HELLO!</div>
        <div className='tkt-font'>请认证您的身份。</div>
      </div>
      <div className='tkt-class'>
        <div className='tkt-avatar' onClick={() => jumpToTeacher(0)}>
          <img src={Isteacher} />
        </div>
        <div className='tkt-desc'>我是北外国际的老师</div>
      </div>
      <div className='tkt-class'>
        <div className='tkt-avatar' onClick={() => jumpToTeacher(1)}>
          <img src={Noteacher} />
        </div>
        <div className='tkt-desc'>我不是北外国际的老师</div>
      </div>
    </div>
  )
}

export default Entry;