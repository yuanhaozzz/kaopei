import './list.less';
import React, { FC, useEffect, useState } from 'react';
import Radio from '@/components/radio';
import { dateSplit } from '@/utils/helper';
import { toast, findWechatUrlValue } from '@/utils/function';
import { useUserInfoStore } from '@/store';
import Modal from './modal';
import { ExamExpressItem, ExpressData } from '../data.d';
import { getExam, getExamExpressTrack } from '../service';

interface ExamListProps {
  next: (step: number) => void,
  selectExam: ExamExpressItem[],
  selectExamChange: (selectExam: ExamExpressItem[]) => void;
}

const ExamList: FC<ExamListProps> = (props) => {
  const { next, selectExam, selectExamChange } = props;
  const { getToken } = useUserInfoStore();
  const [operateStatus, setOperateStatus] = useState<boolean>(false);
  const [examList, setExamList] = useState<ExamExpressItem[]>([]);
  const [expressData, setExpressData] = useState<ExpressData>({
    data: [],
    state: '',
    nu: '',
    com: '',
  });
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalStatus, setModalStatue] = useState<number>(2);

  useEffect(() => {
    getExamList({
      token: getToken, offcialAccountCode: findWechatUrlValue('type') || 8
    });
  }, [])

  const getExamList = async (params: { token: string | number, offcialAccountCode: string | number }) => {
    try {
      const res: any = await getExam(params)
      console.log(res);
      setExamList(res.list);
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * @description: modal组件回调
   * @param {*}
   * @return {*}
   */
  const modalCallBack = () => {
    setModalShow(false);
  }

  /**
   * @description: radio组件change事件
   * @param {any} e
   * @param {any} value
   * @return {*}
   */
  const radioChange = (e: any, value: any) => {
    const idx = selectExam.findIndex((item: ExamExpressItem) => item.examId === value.examId);
    ~idx ? selectExam.splice(idx, 1) : selectExam.push(value);
    selectExamChange(selectExam);
  }

  /**
   * @description: examItem点击事件
   * @param {*}
   * @return {*}
   */
  const examItemClick = async (status: number, item: ExamExpressItem) => {
    if (status === 1) {
      selectExam.splice(0, 1, item);
      selectExamChange(selectExam.splice(0, 1, item));
      next(2);
      return;
    }
    if (status === 2) { // 获取物流信息
      if (!item.mailNo) { // 无物流单号
        setModalStatue(3);
        setModalShow(true);
        return;
      }
      try {
        const res: any = await getExamExpressTrack({ token: '1', expressId: item.expressId as number });
        if (res.info.nu) {
          setExpressData(Object.assign({}, res.info))
          setModalStatue(4);
          setModalShow(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  /**
   * @description: 取消批量申请寄送
   * @param {*}
   * @return {*}
   */
  const close = () => {
    selectExamChange([]);
    setOperateStatus(false);
  }

  /**
   * @description: 批量申请寄送
   * @param {*}
   * @return {*}
   */
  const apply = () => {
    if (!selectExam.length) {
      toast('error', '请选择需要寄送的考试证书');
      return;
    }
    next(2);
  }

  const expressStatus = (item: ExamExpressItem) => {
    let obj = {
      status: 0,
      expressText: '',
      btnText: '',
    };
    if (item.isHasCertificate) {
      if (item.expressId) {
        obj = {
          status: 2,
          expressText: '已寄送',
          btnText: '查看物流',
        }
      }
      if (!item.expressId && item.score) {
        obj = {
          status: 1,
          expressText: '待寄送',
          btnText: '申请寄送',
        }
      }
    } else {
      obj = {
        status: -1,
        expressText: '暂无证书',
        btnText: '',
      };
    }
    return obj;
  }

  const certificateRender = () => {
    return examList.map((item: any, index: number) => {
      const expressObj = expressStatus(item);
      return (
        <div className='exam-item' key={index}>
          {
            operateStatus ? (<div className='exam-item-radio flex-center'>
              {
                item.isHasCertificate &&
                  !item.expressId &&
                  !item.mailNo ?
                  <Radio text='' value={item} onChange={radioChange} /> : null
              }
            </div>) : null
          }
          <div className='exam-item-con'>
            <div className='exam-item-title flex-between'>
              <div className='item-title-name'>{item.examName}</div>
              <div className='item-title-exam-status'>{expressObj.expressText}</div>
            </div>
            <div className='exam-item-info'>
              <div className='item-info-item flex-start'>
                <span className='info-item-label'>姓名</span>
                <span className='info-item-text'>{item.examCandidateName}</span>
              </div>
              <div className='item-info-item flex-start'>
                <span className='info-item-label'>拼音</span>
                <span className='info-item-text'>{item.firstNamePinyin} {item.lastNamePinyin}</span>
              </div>
              <div className='item-info-item flex-start'>
                <span className='info-item-label'>证件号</span>
                <span className='info-item-text'>{item.idNumber}</span>
              </div>
              <div className='item-info-item flex-start'>
                <span className='info-item-label'>考试批次</span>
                <span className='info-item-text' style={{ marginRight: '.2rem' }}>{dateSplit(item.examBatch)}考试</span>
                <span className='info-item-label'>准考证号</span>
                <span className='info-item-text'>{item.examCandidateNumber}</span>
              </div>
            </div>
            <div className='exam-item-footer flex-between'>
              <div className='item-footer-results'>考试成绩: {item.score ?? '暂无'}</div>
              {item.score ? <div className='item-footer-check' onClick={() => examItemClick(expressObj.status, item)} > {expressObj.btnText}</div> : null}
            </div>
          </div>
        </div >
      )
    })
  }

  return (
    <div className='exam'>
      <div className='exam-list'>
        {certificateRender()}
      </div>
      {
        operateStatus ? (
          <div className='exam-cancel'>
            <div className='btn-box flex-between'>
              <div className='btn-style cancel' onClick={() => close()}>取&emsp;消</div>
              <div className='btn-style send' onClick={() => apply()}>申请寄送</div>
            </div>
          </div>
        ) : (
            <div className='exam-operate flex-center'>
              <div className='operate-btn' onClick={() => { setOperateStatus(true) }}>
                批量申请
              </div>
            </div>
          )
      }
      {modalShow ? <Modal status={modalStatus} expressData={expressData} callback={modalCallBack} /> : null}
    </div>
  )
}

export default ExamList;