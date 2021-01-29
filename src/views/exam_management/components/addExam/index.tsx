import React, {useState, useImperativeHandle, useEffect, Fragment, useRef} from 'react'
import md5 from "js-md5";

import DownIcon from '@/assets/image/down-select.png'
import {getExamListForAdd, getExamDetailForAdd, sendCode, addExamInfo} from './service'
import {useUserInfoStore} from '@/store'
import Select from '../select'
import BatchSelect from '../select'
import {toast, format, findWechatUrlValue, formatCount, handleIosInputBlurScroll} from '@/utils/function'
import './style.less'

interface Props{
    childRef?: any;
    update: Function;
}
let timer: any;

const AddExam = (props: Props) => {
    const [count, setCount] = useState<number>(0)
    const [phoneCode, setPhoneCode] = useState<string>('')
    const [vaildPhone, setVaildPhone] = useState<string>('')
    const [ticket, setTicket] = useState<string>('')
    const [step, setStep] = useState(0)
    const [display, setDisplay] = useState(false)
    const [detail, setDetail] = useState<any>({})
    const [list, setList] = useState<any>([])
    const [batchList, setBatchList] = useState<any>([])

    const [typeIndex, setTypeIndex] = useState<number | undefined>(undefined)
    const [batchIndex, setBatchIndex] = useState<number | undefined>(undefined)

    const [value, setValue] = useState('Ad')
    const listRef: any = useRef(null)
    const batchListRef: any = useRef(null)
    const {getToken} = useUserInfoStore()

    let {childRef, update} = props

    useImperativeHandle(childRef, () => ({
        handleDisplay: (status: boolean) => {
          return handleDisplay(status)
        }
    }))

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (typeIndex !== undefined) {
            setBatchList(list[typeIndex].batchList)
        }
    }, [typeIndex])

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
     * @description 获取考试列表
     */
    const getData = async () => {
        let params = {
            action: 'getExamListForAdd',
            token: getToken
        }
        try {
            let data: any = await getExamListForAdd(params)
            setList(data.examList)
        } catch (error) {}
    }

    /**
     * @description 提交考试
     */
    const submit = async () => {
        if (!phoneCode) {
                toast('error', '请输入验证码')
                return
        }
        let params = {
            action: 'addUserExam',
            token: getToken,
            examCandidateNumber: ticket,
            examId: list[(typeIndex as number)].id,
            examBatchId: list[(typeIndex as number)].batchList[(batchIndex as number)].id,
            checkCode: phoneCode,
            phone: vaildPhone
        }
        try {
            await addExamInfo(params)
            setStep(0)
            handleDisplay(false)
            setPhoneCode('')
            toast('success', '添加考试成功')
            update()
        } catch (error) {
            
        }
        
    }

    /**
     * @description 获取验证码
     */
    const getCode = async () => {
		if (count !== 0) {
			return
		}
		setCount(60)
		let params = {
			action: 'smsSend',
			smsSignId: 5,
			smsTemplateId: 3,
			mobile: vaildPhone,
			validateCode: 6,
			deviceType: 5
		}
		try {
			await sendCode(params);
			toast('success', `验证码已发送至${detail.showPhone}，请注意查收`)
		} catch (error) {
			
		}
	}

    /**
     * @description 下一步
     * @param step {number} 当前步数
     */
    const next = async (step: number) => {
        switch(step) {
            case 1:
                vaildOneStep();
                break;
            case 2:
                vaildTwoStep();
                break;
        }
    }

    /**
     * 
     * @description 第一步验证
     */
    const vaildOneStep = async () => {
        if (typeIndex === undefined || batchIndex === undefined || !ticket) {
            toast('error', '请填写完整信息')
            return
        }
        let params = {
            action: 'getExamDetailForAdd',
            token: getToken,
            examCandidateNumber: ticket,
            examId: list[typeIndex].id,
            examBatchId: list[typeIndex].batchList[batchIndex].id
        }
        try {
            let data: any = await getExamDetailForAdd(params);
            setDetail(data.examCandidate)
            // md5
            setStep(1)
        } catch (error) {
            
        }
        
        
    }

    /**
     * 
     * @description 第二步验证
     */
    const vaildTwoStep = () => {
        if (!/^1\d{10}$/.test(vaildPhone)) {
            toast('error', '请填写正确的手机号码')
            return
        }
        let phone = detail.phoneMd5
        let md5Phone = md5(vaildPhone)
        if (md5Phone !== phone) {
            toast('error', '手机号填写错误')
            return
        }
        getCode()
        setStep(2)
    }

    /**
     * @description 时间改变
     * @param e {Object}    事件类型
     */
    const onChange = (e: any) => {
        let {name, value} = e.target
        switch(name) {
            case 'ticket':
                setTicket(value)
                break
            case 'vaildPhone':
                setVaildPhone(value)
                break
            case 'phoneCode':
                setPhoneCode(value)
                break
        }
    }

    /**
     * @description 处理显示弹窗
     * @param status {boolean}  true 显示 false 隐藏
     */
    const handleDisplay = (status: boolean) => {
        setDisplay(status)
    }

    /**
     * @descrption  类型选择
     */
    const selectType = (index: number) => {
        setTypeIndex(index)
        setBatchIndex(undefined)
    }

    /**
     * @descrption  日期类型选择
     */
    const selectBatchType = (index: number) => {
        setBatchIndex(index)
    }

    /**
     * @description 点击考试
     */
    const clickExam = () => {
        listRef.current.handleDisplay(true)
        if (batchList.length > 0) {
            batchListRef.current.handleDisplay(false)
        }
    }

    /**
     * @description 点击时间
     */
    const clickDate = () => {
        if (!batchList.length) {
            toast('error', '请选择考试')
            return
        }
       batchListRef.current.handleDisplay(true)
    }

    /**
     * 关闭添加考试
     */
    const close = () => {
        handleDisplay(false)
        setStep(0)
    }

    /**
     * @description 兼容性问题
     */
    const onBlur = () => {
        handleIosInputBlurScroll()
    }

    if (!display) {
        return <Fragment></Fragment>
    }

    /**
     * @description 渲染第三层
     */
    const renderThirdContent = () => {
        return (
            <section className="add-exam-phone-code">
                <h3 className="phone-code-title">填写验证码</h3>
                <div className="phone-code-container flex-start">
                    <input type="tel" maxLength={6} placeholder="请输入验证码" name="phoneCode" value={phoneCode} onChange={onChange} onBlur={onBlur}/>
                    <button className="phone-send-code" onClick={getCode} >{count === 0 ? '获取验证码' : formatCount(count)}</button>
                </div>
                
                <button className="add-exam-submit" onClick={submit}>完成</button>
            </section>
        )
    }

    /**
     * @description 渲染第二层
     */
    const renderSecondContent = () => {
        return (
            <section className="add-exam-vaild-phone">
                <div className="vaild-phone-container flex-space-between">
                    <h3>请输入报名考试预留的手机号</h3>
                    <span>{detail.showPhone}</span>
                </div>
                <input type="tel" placeholder="请输入完整手机号" name="vaildPhone" value={vaildPhone} maxLength={11} onChange={onChange} onBlur={onBlur}/>
                <button className="add-exam-submit" onClick={() => next(2)}>下一步</button>
            </section>
        )
    }

    /**
     * @description 第一层
     */
    const renderFirstContent = () => {
        return (
            <Fragment>
                {/* 考试类型 */}
                <div className="add-exam-form flex-center">
                    <h4>考试类型</h4>
                    <div className="add-exam-form-value" onClick={clickExam}>
                        {
                            typeIndex === undefined ? '请选择报名的考试' : list[(typeIndex as number)].name
                        }
                        <Select list={list} callback={selectType} childRef={listRef}/>
                    </div>
                    <img src={DownIcon} alt="" className="add-exam-form-image"/>
                </div>
                {/* 考试日期 */}
                <div className="add-exam-form flex-center">
                    <h4>考试日期</h4>
                    <div className="add-exam-form-value" onClick={clickDate}>
                        {
                            batchIndex === undefined ? <span>请选择考试日期</span> : format(batchList[batchIndex].batch, 'yyyy年MM月dd日')
                        }
                        {
                           batchList.length > 0 && <BatchSelect list={batchList} callback={selectBatchType} childRef={batchListRef}/>
                        }
                        
                    </div>
                    <img src={DownIcon} alt="" className="add-exam-form-image"/>
                </div>
                {/* 准考证号 */}
                <div className="add-exam-form flex-center">
                    <h4>准考证号</h4>
                    <input type="text" placeholder="请输入准考证号" value={ticket} name="ticket" onChange={onChange} onBlur={onBlur}/>
                    <img src={DownIcon} alt="" className="add-exam-form-image hide"/>
                </div>
                <button className="add-exam-submit" onClick={() => next(1)}>下一步</button>
            </Fragment>
           
        )
    }

    return (
        <div className="add-exam-wrapper flex-center" onClick={close}>
            <section className="add-exam-box" onClick={(e) => e.stopPropagation()}>
                {/* 标题 */}
                <h2 className="add-exam-title">考试信息录入</h2>
                {
                    step === 0 && renderFirstContent()
                }
                {
                    step === 1 && renderSecondContent()
                }
                {
                    step === 2 && renderThirdContent()
                }
            </section>
        </div>
    )
}

export default AddExam