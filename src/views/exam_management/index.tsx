import React, {useEffect, useState, useRef, Fragment} from 'react'

import {getExamList} from './service'
import {examItem} from './data'
import {useUserInfoStore} from '@/store'
import './style.less'
import Empty from '@/components/empty/list'
import {format} from '@/utils/function'
import Message from '@/components/message/message'
import AddExam from './components/addExam/index'

const ExamManagement = (props: any) => {
    const [list, setList] = useState<examItem[]>([])
    const [loding, setLoding] = useState<boolean>(true)
    const [content, setContent] = useState<string>('')
    const {getToken} = useUserInfoStore()

    const messageRef = useRef<any>(null)

    const addExamRef = useRef<any>(null)

    useEffect(() => {
        getData()
    }, [])

    /**
     * @description 获取数据
     */
    const getData = async() => {
        let params = {
            action: 'getUserExamList',
            token: getToken
        }
        try {
            console.log(getToken, '-------------')
            let data: any = await getExamList(params)
            setList(data.examList)
        } catch (error) {
        }finally {
            setLoding(false)
        }
    }

    /**
     * @description 审核未通过
     * @param 
     */
    const handleNotPass = (content: string) => {
        setContent(content)
        messageRef.current.showMessage()
    }

    /**
     * @description 跳转信息勘误
     * @pram item   {any}   信息
     * @pram type   {any}   1 信息勘误 2 信息复议
     */
    const jumpToPage = (type: number, item: examItem) => {
        switch(type) {
            case 1:
                handleInfo(item)
                break
            case 2:
                handleReconsideration(item)
                break
        }

      
    }

    /**
     * @description 信息勘误
     * @pram item   {any}   信息
     */
    const handleInfo = (item: examItem) => {
        let {examCandidateName, firstNamePinyin, idNumber, examId, examBatchId, examCandidateNumber, lastNamePinyin, candidateCorrigendum} = item

        let search = `?userName=${encodeURIComponent(examCandidateName)}&firstNamePinyin=${firstNamePinyin}&idNumber=${idNumber}&examId=${examId}&examBatchId=${examBatchId}&examCandidateNumber=${examCandidateNumber}&lastNamePinyin=${lastNamePinyin}&status=${candidateCorrigendum ? candidateCorrigendum.status : '0'}`
        props.history.push({
            pathname: '/corrigendum',
            search
        })
    }

    /**
     * @description 复议
     * @pram item   {any}   信息
     */
    const handleReconsideration = (item: examItem) => {
        let {examId, examBatchId, examItemId, examBatch, examCandidateNumber, examRecheck} = item

        let search = `?examId=${examId}&examBatchId=${examBatchId}&examCandidateNumber=${examCandidateNumber}&examItemId=${examItemId}&examBatch=${examBatch}&examCandidateNumber=${examCandidateNumber}&status=${examRecheck ? examRecheck.status : '0'}`
        props.history.push({
            pathname: '/reconsideration',
            search
        })
    }

    /**
     * @description 显示弹窗
     */
    const openAddExam = () => {
        addExamRef.current.handleDisplay(true)
    }

    /**
     * @description 渲染添加考试按钮
     */
    const renderExamAdd = () => {
        return (
            <button className="exam-management-button" onClick={openAddExam}></button>
        )
    }

    /**
     * @description 渲染列表
     */
    const renderList = () => {
        return (
            <ul className="exam-management-list">
                {
                    list.map((item: examItem, index: number) => (
                        <li className="list-item" key={index}>
                            {/* 考试名称 */}
                            <h2 className="list-item-title">
                                {item.examName}
                                {/* 1-待审核,3-审核通过,2-审核未通过 */}
                                {/* 复议 */}
                                {
                                    item.examRecheck &&  <Fragment>
                                        {
                                            item.examRecheck.status === 1 &&  <div className="list-item-status pending">复议审核中</div>
                                        }
                                        {
                                            item.examRecheck.status === 3 &&  <div className="list-item-status  resolve" onClick={() => handleNotPass(item.examRecheck.checkContent)}>复议已通过</div>
                                        }
                                        {
                                            item.examRecheck.status === 2 &&  <div className="list-item-status reject" onClick={() => handleNotPass(item.examRecheck.checkContent)}>审核未通过</div>
                                        }
                                    </Fragment>
                                }
                                {/* 勘误 */}
                                {
                                    item.candidateCorrigendum &&  <Fragment>
                                        {
                                            item.candidateCorrigendum.status === 1 &&  <div className="list-item-status pending">勘误审核中</div>
                                        }
                                        {
                                            item.candidateCorrigendum.status === 3 &&  <div className="list-item-status resolve" onClick={() => handleNotPass(item.candidateCorrigendum.errorMsg)}>勘误已通过</div>
                                        }
                                        {
                                            item.candidateCorrigendum.status === 2 &&  <div className="list-item-status reject" onClick={() => handleNotPass(item.candidateCorrigendum.errorMsg)}>审核未通过</div>
                                        }
                                    </Fragment>
                                }
                               
                            </h2>
                            {/* 考试信息 */}
                            <div className="list-item-box flex-space-between">
                                <div className="list-item-count">
                                    <h5>考试批次</h5>
                                    <span>{format(item.examBatch, 'yyyy年MM月dd日')} 考试</span>
                                </div>
                                <div className="list-item-number">
                                    <h5>准考证号</h5>
                                    <span>{item.examCandidateNumber}</span>
                                </div>
                            </div>
                            {/* 个人信息 */}
                            <div className="list-item-info">
                                <div className="list-item-info-container flex-space-between">
                                    <div className="list-item-info-box">
                                        <h5>姓名</h5>
                                        <span>{item.examCandidateName}</span>
                                    </div>
                                    <div className="list-item-info-box">
                                        <h5>拼音</h5>
                                        <span>{item.firstNamePinyin}{item.lastNamePinyin}</span>
                                    </div>
                                </div>
                                <div className="list-item-info-num">
                                    <h5>证件号</h5>
                                    <span>{item.idNumber}</span>
                                </div>
                            </div>
                            {/* 信息勘误 */}
                            {
                                item.showCorrigendum === 1 && <div className="list-item-button flex-end">
                                    <button onClick={() =>jumpToPage(1, item)}>信息勘误</button>
                                </div>
                            }
                            {/* 复议申请 */}
                            {
                                item.showRecheck === 1 && <div className="list-item-button flex-end">
                                    <button onClick={() =>jumpToPage(2, item)}>复议申请</button>
                                </div>
                            }
                          
                        </li>
                    ))
                }
                
            </ul>
        )
    }

    if (loding) {
        return <Fragment></Fragment>
    }

    if (!list.length) {
        return (
            <Fragment>
                {renderExamAdd()}
                <AddExam childRef={addExamRef} update={getData}/>
            </Fragment>
            
        )
    }

    return (
        <div className="exam-management-wrapper">
            {renderList()}
            {renderExamAdd()}
            <AddExam childRef={addExamRef} update={getData}/>
            {/* 弹出框 */}
            <Message title='申请未通过' content={content} success={() => messageRef.current.hideMessage()} childRef={messageRef}/>
        </div>
    )
}

export default ExamManagement