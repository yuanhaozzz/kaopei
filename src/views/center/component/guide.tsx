import React, {} from 'react'

import './guide.less'
import TwoTab from './twoTab'
import Guide from '@/assets/image/guide.png'
const GuideComponent = (props: any) => {

    /**
     * 关闭layer
     */
    const closeLayer = () => {
        localStorage.setItem('guide', '1');
        (document as any).querySelector('.layer-wrapper').style.display = 'none';
    }

    return (
        <div className='layer-wrapper'>
            <div className='layer-box'>
                <TwoTab  {...props}/>
            </div>
            <img src={Guide} alt="" className="layer-guide" onClick={closeLayer}/>
        </div>
    )
}

export default GuideComponent