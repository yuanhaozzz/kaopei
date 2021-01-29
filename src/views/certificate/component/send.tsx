import './send.less';
import React, { FC, useEffect, useState } from 'react';
import { toast } from '@/utils/function';
import Radio from '@/components/radio';
import { useUserInfoStore } from '@/store';
import { AddressForm, CityItem, ExamExpressItem, AddressItem, EditAddressParams } from '../data.d';
import Region from './region';
import Modal from './modal';
import { getAddress, saveUserAddress, createExamExpress } from '../service';

interface SendProps {
  selectExam: ExamExpressItem[],
  prev: (step: number) => void,
}

const Send: FC<SendProps> = (props) => {
  const { selectExam, prev } = props;
  const { getToken } = useUserInfoStore();

  let timer: any;
  let formDataDefault = {
    receiver: '',
    mobile: '',
    region: [],
    address: '',
    id: -1,
  }

  const [addressList, setAddressLIst] = useState<AddressItem[]>([]);
  const [formData, setFormData] = useState<AddressForm>(formDataDefault);
  const [radioData, setRadioData] = useState<AddressItem>({
    address: '',
    cityId: -1,
    fullCityId: '',
    fullCityName: '',
    id: -1,
    mobile: '',
    receiver: '',
    userId: -1
  });

  const [switchStatus, setSwitchStatus] = useState<boolean>(false); // true: 编辑收件人信息, false: 选择收件地址
  const [regionShow, setRegionShow] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalStatus, setModalStatue] = useState<number>(2);

  useEffect(() => {
    if (!switchStatus) {
      getAddressList({ token: getToken });
    }
  }, [switchStatus])

  const getAddressList = async (params: { token: string | number }) => {
    try {
      const res: any = await getAddress(params);
      console.log(res)
      setAddressLIst(res.list);
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * @description: radio组件change事件
   * @param {*}
   * @return {*}
   */
  const radioChange = (e: any, value: any) => {
    setFormData(Object.assign({}, {
      id: value.id,
      receiver: value.receiver,
      mobile: `${value.mobile}`,
      region: setFormDataRegion(value.fullCityName, value.fullCityId),
      address: value.address,
    }))
    setRadioData(Object.assign({}, value));
  }

  /**
   * @description: region组件回调函数
   * @param {CityItem[]} data: 选中的地区列表
   * @return {*}
   */
  const regionCallback = (data: CityItem[]) => {
    formData.region = data;
    setFormData(Object.assign({}, formData));
    setRegionShow(false);
  }

  /**
   * @description: modal组件回调函数
   * @param {*}
   * @return {*}
   */
  const modalCallBack = () => {
    setModalShow(false);
    prev(1);
  }

  /**
   * @description: 编辑时formData.region数据处理
   * @param {*}
   * @return {*}
   */
  const setFormDataRegion = (fullCityName: string, fullCityId: string) => {
    const fullCityNameList = fullCityName.split(',');
    const fullCityIdList = fullCityId.split(',');
    return fullCityNameList.map((item: string, index) => {
      return {
        id: +fullCityIdList[index],
        name: item,
        parentId: !index ? 1 : +fullCityIdList[index - 1]
      }
    })
  }

  /**
   * @description: 详细地址显示文案
   * @param {*}
   * @return {*}
   */
  const regionText = () => {
    if (formData.region.length) {
      let text: string = '';
      formData.region.forEach((item: CityItem) => {
        text += `${item.name} `;
      })
      return text;
    }
    return '所在地区';
  }

  /**
   * @description: form表单验证函数
   * @param {*}
   * @return {*}
   */
  const formValidate = () => {
    const nameTest = /^[\u4e00-\u9fa5]+$/;
    const mobileTest = /^1[3-9]\d{9}$/;
    const { receiver, mobile, region, address } = formData;
    if (!nameTest.test(receiver)) {
      toast('error', '请输入正确收件人姓名');
      return false;
    }
    if (!mobileTest.test(mobile)) {
      toast('error', '请输入正确手机号码');
      return false
    };
    if (!region.length) {
      toast('error', '请选择所在地区');
      return false;
    }
    if (!address) {
      toast('error', '请输入详细地址');
      return false;
    }
    return true;
  }

  /**
   * @description: input输入change
   * @param {React} e: event对象
   * @param {number} type: 对应input 1: 收件人, 2: 手机号, 3: 详细地址
   * @return {*}
   */
  const inputChange = function (e: React.ChangeEvent<HTMLInputElement>, type: number) {
    if (timer) clearInterval(timer);
    timer = setTimeout(() => {
      switch (type) {
        case 1:
          formData.receiver = e.target.value;
          break;
        case 2:
          formData.mobile = e.target.value;
          break;
        case 3:
          formData.address = e.target.value;
          break;
        default:
          break;
      }
      setFormData(Object.assign({}, formData));
      clearInterval(timer);
    }, 200)
  }

  /**
   * @description: 编辑按钮，显示region组件
   * @param {*}
   * @return {*}
   */
  const edit = (item: AddressItem) => {
    setFormData(Object.assign({}, {
      id: item.id,
      receiver: item.receiver,
      mobile: `${item.mobile}`,
      region: setFormDataRegion(item.fullCityName, item.fullCityId),
      address: item.address,
    }))
    setSwitchStatus(true);
  }

  /**
   * @description: 新建地址
   * @param {*}
   * @return {*}
   */
  const addAddress = () => {
    setSwitchStatus(true);
  }

  /**
   * @description: 上一步
   * @param {*}
   * @return {*}
   */
  const prevBtn = () => {
    if (!switchStatus) {
      prev(1)
    } else {
      setFormData(Object.assign({}, formDataDefault))
      setSwitchStatus(false);
    }
  }

  /**
   * @description: 显示选择地区组件
   * @param {*}
   * @return {*}
   */
  const regionClick = () => {
    setRegionShow(true);
  }

  /**
   * @description: 提交按钮
   * @param {*}
   * @return {*}
   */
  const submit = async () => {
    // switchStatus === true 新建|编辑地址
    const { id, address, mobile, receiver, region } = formData;
    if (switchStatus) {
      const validate = formValidate();
      if (!validate) return;
      let fullCityId: string = '', fullCityName: string = '';
      region.forEach((item: CityItem, index) => {
        if (index) {
          fullCityId += `,${item.id}`;
          fullCityName += `,${item.name}`;
        } else {
          fullCityId += `${item.id}`;
          fullCityName += `${item.name}`;
        }
      })
      const params: EditAddressParams = {
        token: getToken,
        cityId: region[region.length - 1].id,
        mobile,
        receiver,
        address,
        fullCityId,
        fullCityName,
      }
      if (id && id !== -1) {
        params.addressId = id;
      }
      try {
        const res: any = await saveUserAddress(params);
        console.log(res)
        toast('success', '保存成功');
        setSwitchStatus(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      // switchStatus === false 提交申请寄送
      if (!id || id === -1) {
        return toast('error', '请选择地址');
      }
      let addressString: string = '';
      region.forEach((item: CityItem) => {
        addressString += item.name;
      });
      const params = {
        token: getToken,
        cityId: region[region.length - 1].id,
        mobile,
        receiver,
        address: `${addressString}${address}`,
        idNumber: 1,
        userExamIds: selectExam.map(item => item.userExamId).join(',')
      }
      try {
        const res: any = await createExamExpress(params);
        console.log(res)
        setModalShow(true);
        setModalStatue(2);
      } catch (error) {
        console.log(error)
      }
    }
  }

  const addressListRender = () => {
    return addressList.map((item: AddressItem, index: number) => {
      return (
        <li className='address-item' key={item.id}>
          <div className='item-info'>
            <div className='item-info-radio flex-center'>
              <Radio text='' value={item} checked={item.id === radioData.id} onChange={radioChange} />
            </div>
            <div className='item-info-con'>
              <div className='info-contact'>
                <span className='contact-name'>{item.receiver}</span>
                <span className='contact-mobile'>{item.mobile}</span>
              </div>
              <div className='info-address'>{item.address}</div>
            </div>
          </div>
          <div className='item-edit flex-center' onClick={() => edit(item)}>编辑</div>
        </li>
      )
    })
  }

  const addressSwitchRender = () => {
    // switchStatus === false 显示已发货列表
    return !switchStatus ? (
      <div className='address-main'>
        <div className='address-title'>请确认您的收货地址</div>
        <ul className='address-list'>
          {addressListRender()}
        </ul>
        <div className='add-address flex-center'>
          <span className='add-btn' onClick={() => addAddress()}>新建地址</span>
        </div>
      </div>
    ) : (
        // switchStatus === true 显示收件信息form表单
        <div className='edit-main'>
          <form action="address-form" className='address-form'>
            <div className='form-item'>
              <div className='form-item-label'>
                <label>收件人</label>
              </div>
              <div className='form-item-control'>
                <div className='form-item-control-input'>
                  <input
                    className='item-input'
                    type="text" placeholder='收件人姓名'
                    defaultValue={formData.receiver}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 1)} />
                </div>
              </div>
            </div>
            <div className='form-item'>
              <div className='form-item-label'>
                <label>手机号码</label>
              </div>
              <div className='form-item-control'>
                <div className='form-item-control-input'>
                  <input
                    className='item-input'
                    type="text" placeholder='手机号码'
                    defaultValue={formData.mobile}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 2)} />
                </div>
              </div>
            </div>
            <div className='form-item'>
              <div className='form-item-label'>
                <label>所在地区</label>
              </div>
              <div className='form-item-control'>
                <div className='form-item-control-input select-region'>
                  <div className='item-input flex-between' onClick={() => regionClick()}>
                    <span style={{ color: formData.region.length ? '#000000' : '#808080' }}>{regionText()}</span>
                    <span className='input-placeholder'>→</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='form-item'>
              <div className='form-item-label'>
                <label>详细地址</label>
              </div>
              <div className='form-item-control'>
                <div className='form-item-control-input'>
                  <input
                    className='item-input'
                    type="text" placeholder='如道路、门牌号、小区、楼栋号、单元...'
                    defaultValue={formData.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e, 3)} />
                </div>
              </div>
            </div>
          </form>
        </div>
      )
  }

  return (
    <div className='send'>
      <div className='address'>
        {addressSwitchRender()}
        <div className='send-tips'>
          <p>*本次证书邮寄，采用顺丰到付方式；</p>
          <p>*证书预计申请后10个工作日内收到，如有疑问，请拨打：</p>
        </div>
      </div>
      <div className='send-footer flex-around'>
        <div className='footer-btn prev' onClick={() => prevBtn()}>上一步</div>
        <div className='footer-btn submit' onClick={() => submit()}>{!switchStatus ? '提 交' : '保 存'}</div>
      </div>
      {regionShow ? <Region onChange={regionCallback} /> : null}
      {modalShow ? <Modal status={modalStatus} callback={modalCallBack} /> : null}
    </div>
  )
}

export default Send;