import React, { FC } from 'react';
import './style.less'

interface ButtonProps {
  prev?: () => void,
  next?: () => void,
  routeType?: string | number
}

const Button: FC<ButtonProps> = (props) => {
  const { prev, next, routeType } = props;
  
  return (
    <div className='footer'>
      {
        !routeType && <button className="prev-form-button" onClick={prev}>上一步</button>
      }
      <button className="next-form-button" onClick={next}>下一步</button>
    </div>
  )
}

export default Button;