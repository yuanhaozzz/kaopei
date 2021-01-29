import React, {} from 'react'

import './style.less'
import LogoExam from '@/assets/image/logo_exam.png'

const About = () => {

    return(
        <div className="about-wrapper">
            <img src={LogoExam} className="about-login"/>
            <h1>北外考培</h1>
            <p>可使用本公众号查询【北京外国语大学国际教育集团】
            考点信息、查询口试顺序、获得成绩分析及证书寄送等相关服务。</p>
        </div>
    )
}

export default About