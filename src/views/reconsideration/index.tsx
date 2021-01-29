import React, {useState, useEffect, useRef, Fragment} from 'react'

import Message from '@/components/message/message'

import {toast, vaildEmail, vaildPhone, queryUrlParams, format} from '@/utils/function'
import {getExamRecheckDetail, saveExamRecheckDetail, sendCode, getExamReconsiderationList, getExamFeeList} from './service'
import {useUserInfoStore} from '@/store'
import './style.less'

let timer: any = null
const Reconsideration = (props: any) => {
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [reconsideration, setReconsideration] = useState<any>('')
    const [fee, setFee] = useState<any>('')
    const [count, setCount] = useState<number>(0)
    
    const query = queryUrlParams()
    const messageRef = useRef<any>();

    const {getToken} = useUserInfoStore()

    useEffect(() => {
        getDetail()
        getRichText()
    }, [])

    useEffect(() => {
		if (count === 60) {
			timer = setInterval(() => {
				setCount((count: number) => count - 1)
			}, 1000);
		} else if (count === 0) {
			clearInterval(timer)
		}
	}, [count])

    /**
     * @description 获取富文本
     */
    const getRichText = async () => {
        let {examId} = query
        try {
            let reconsideration: any = await getExamReconsiderationList({
                action: 'getExamReconsiderationList',
                examId
            })
            setReconsideration(reconsideration.result[0].bwDescription)
            let fee: any = await getExamFeeList({
                action: 'getExamFeeList',
                examId
            })
            setFee(fee.result[0].description)
        } catch (error) {
            
        }
        
    }

    /**
     * @description 获取详情
     */
    const getDetail = async () => {
        let {examId, examBatchId, examCandidateNumber} = query
        let params = {
            action: 'getExamRecheckInfo',
            token: getToken,
            examId,
            examBatchId,
            examCandidateNumber
        }
        try {
            let data: any = await getExamRecheckDetail(params),
                {email, mobile, applyContent} = data.info
            setEmail(email)
            setPhone(mobile)
            setText(applyContent)
        } catch (error) {
        }
    }

    /**
     * @description 保存详情
     */
    const saveDetail = async () => {
        let {examId, examBatchId, examCandidateNumber} = query
        let params = {
            action: 'saveExamRecheck',
            token: getToken,
            examId,
            examBatchId,
            examCandidateNumber,
            mobile: phone,
            smsCode: code,
            email,
            applyContent: text
        }
        try {
           await saveExamRecheckDetail(params)
           messageRef.current.showMessage()
        } catch (error) {
           
        }
    }

    /**
	 * 获取验证码
	 */
	const getCode = async () => {
		if (count !== 0) {
			return
		}
		let validReg = /^[1]([3-9])[0-9]{9}$/
		// 手机号码验证
		if (!validReg.test((phone as string))) {
			toast('error', "请输入正确的手机号码")
			return
		}
		setCount(60)
		let params = {
			action: 'smsSend',
			smsSignId: 5,
			smsTemplateId: 3,
			mobile: phone,
			validateCode: 6,
			deviceType: 5
		}
		try {
		await sendCode(params);
			toast('success', `验证码已发送至${(phone as string).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}，请注意查收`)
		} catch (error) {
			
		}
    }
    
    /**
     * @description 提交成功
     */
    const handleSuccess = () => {
        props.history.go(-1)
    }

    /**
     * @description 提交
     */
    const submit = () => {
        if (!email) {
            toast('error', '邮箱格式错误', 3)
            return
        }
        if (!phone) {
            toast('error', '手机格式错误', 3)
            return
        }
        if (!code || code.length <= 5) {
            toast('error', '6位验证码', 3)
            return
        }
        if(!text.length) {
            toast('error', '请填写具体原因', 3)
            return
        }
        saveDetail()
       
    }

    /**
     * @description 离开焦点
     */
    const onBlue = (e: any) => {
        let {name, value} = e.target
        switch(name) {
            case 'email':
                vaildEmail(value) || toast('error', '邮箱格式错误', 3)
                break
            case 'phone':
                vaildPhone(value) || toast('error', '手机格式错误', 3)
                break
            case 'code':
                code.length >= 5 || toast('error', '6位验证码', 3)
                break
            case 'text':
                console.log(name)
                text.length || toast('error', '请填写具体原因', 3)
                break
        }


    }
    /**
     * @description 文本框改变
     */
    const onChange = (e: any) => {
        let {name, value} = e.target
        switch(name) {
            case 'email':
                setEmail(value)
                break
            case 'phone':
                setPhone(value)
                break
            case 'code':
                setCode(value)
                break
            case 'text':
                console.log(value)
                    setText(value.replace(/[a-zA-Z]+/g, ''))
                break
        }
    }

    /**
	 * @description 格式化日期
	 */
	const formatCount = () => {
		return count > 9 ? count : '0' + count
	}


    /**
     * @description 渲染提交按钮
     */
    const renderButton = () => {
        if (query.status === '1') {
            return <Fragment></Fragment>
        }
        return (
            <button className="reconsideration-form-submit" onClick={submit}>提交申请</button>
        )
    }

    /**
     * @description 渲染第四层
     */
    const renderFourthFloor = () => {
        return (
            <ul className="reconsideration-form">
                <li className="reconsideration-form-row">
                    <h5 className="form-title">复议流程</h5>
                    <div className="rich-text" dangerouslySetInnerHTML={{__html:reconsideration}}></div>
                </li>
                <li className="reconsideration-form-row">
                    <h5 className="form-title">相关费用</h5>
                    <div className="rich-text" dangerouslySetInnerHTML={{__html:fee}}></div>
                </li>
            </ul>
        )
    }

    /**
     * @description 渲染第三层
     */
    const renderThirdFloor = () => {
        return (
            <ul className="reconsideration-form">
                <li className="reconsideration-form-row flex-start">
                    <h5>申请原因</h5>
                    <a href="tel:010-6888899" className="reconsideration-font">（如有疑问，请拨打010-6888899</a>
                </li>
                <li className="reconsideration-form-row">
                    <textarea name="text" id="" placeholder="填写具体原因" onChange={onChange} onBlur={onBlue} value={text} disabled={query.status === '1' ? true : false}></textarea>
                </li>
            </ul>
        )
    }

    /**
     * @description 渲染第二层
     */
    const renderSecondFloor = () => {
        let {examBatch, examCandidateNumber} = query
        return (
            <ul className="reconsideration-form">
                <li className="reconsideration-form-row flex-start">
                    <h5>考试批次</h5>
                    <p className="reconsideration-font">{format(examBatch * 1, 'yyyy年MM月dd日')}</p>
                </li>
                <li className="reconsideration-form-row flex-start">
                    <h5>准考证号</h5>
                    <p className="reconsideration-font">{examCandidateNumber}</p>
                </li>
            </ul>
        )
    }

    /**
     * @description 渲染第一层
     */
    const renderFirstFloor = () => {
        return (
            <ul className="reconsideration-form">
                <li className="reconsideration-form-row flex-start">
                    <h5>联系邮箱</h5>
                    <input type="email" name="email" placeholder="请填写有效邮箱用于接收邮件提醒" onChange={onChange} value={email} onBlur={onBlue} disabled={query.status === '1' ? true : false}/>
                </li>
                <li className="reconsideration-form-row flex-start">
                    <h5>联系电话</h5>
                    <input type="tel" name="phone" maxLength={11} placeholder="请填写联系电话" onChange={onChange} value={phone} onBlur={onBlue} disabled={query.status === '1' ? true : false}/>
                    <button className="row-code" onClick={getCode}>{count === 0 ? '获取验证码' : formatCount() + 's'}</button>
                </li>
                <li className="reconsideration-form-row flex-start">
                    <h5>验证码</h5>
                    <input type="tel" name="code" placeholder="请输入验证码" onChange={onChange} maxLength={6} value={code} onBlur={onBlue} disabled={query.status === '1' ? true : false}/>
                </li>
            </ul>
        )
    }

    return (
        <div className="reconsideration-wrapper">
            {
                renderFirstFloor()
            }
            {
                renderSecondFloor()
            }
            {
                renderThirdFloor()
            }
            {
                renderFourthFloor()
            }
            {
                renderButton()
            }
            <Message title={'申请已提交'} content={'您的申请已经提交，工作人员将于5个工作日内完成审核。'} childRef={messageRef} success={handleSuccess}/>
        </div>
    )
}

export default Reconsideration