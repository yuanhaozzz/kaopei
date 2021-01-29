/*
 * @Author: WuPeiQi
 * @description: 地区选择组件(省-市-区）
 * @path: 引入路径
 * @Date: 2021-01-14 14:23:10
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-19 09:35:53
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import './region.less';
import React, { FC, useEffect, useState } from 'react';
import { CityItem } from '../data.d';
import { getCity } from '../service';

interface RegionProps {
  onChange: (data: CityItem[]) => void,
}

const Region: FC<RegionProps> = (props) => {
  const { onChange } = props;
  const [regionStatus, setRegionStatus] = useState<number>(1); // 1: 省 2: 市 3: 县
  const [cityList, setCityList] = useState<CityItem[]>([]);
  const [selectedList, setSelectedList] = useState<CityItem[]>([]);
  const [cityListFlag, setCityListFlag] = useState<boolean>(false);

  useEffect(() => {
    getProvince();
  }, [])

  useEffect(() => {
    if (!cityListFlag) return;
    onChange(selectedList);
  }, [cityListFlag, selectedList, onChange])

  useEffect(() => {
    if (selectedList.length !== 3) return;
    onChange(selectedList);
  }, [selectedList, onChange])

  const getProvince = async (data?: { parentId: number }) => {
    const res: any = await getCity(data);
    if (!res.list.length) {
      setCityListFlag(true);
      setRegionStatus(2);
      return;
    };
    setCityList(res.list);
  }

  const close = () => {
    onChange(selectedList);
  }

  const cityClick = (item: CityItem) => {
    switch (regionStatus) {
      case 1:
        getProvince({ parentId: item.id });
        selectedList.splice(0, 1, item);
        setSelectedList(selectedList);
        setRegionStatus(2);
        break;
      case 2:
        if (!cityListFlag) {
          getProvince({ parentId: item.id });
          setRegionStatus(3);
        }
        selectedList.splice(1, 1, item);
        setSelectedList(selectedList.splice(0));
        break;
      case 3:
        if (!cityListFlag) {
          selectedList.splice(2, 1, item);
          setSelectedList(selectedList.splice(0));
        }
        break;
      default:
        break;
    }
  }

  const selectedClick = (item: CityItem, index: number) => {
    switch (index) {
      case 0:
        getProvince({ parentId: 1 });
        setRegionStatus(1);
        setCityListFlag(false);
        selectedList.splice(1, 2);
        setSelectedList(selectedList.splice(0));
        break;
      case 1:
        getProvince({ parentId: selectedList[0].id });
        setRegionStatus(2);
        selectedList.splice(2, 1);
        setSelectedList(selectedList.splice(0));
        break;
      default:
        break;
    }
  }

  const titleText = () => {
    switch (regionStatus) {
      case 1:
        return '省份/地区';
      case 2:
        return '城市';
      case 3:
        return '区/县'
      default:
        break;
    }
  }

  const selectedListRender = () => {
    return selectedList.map((item: CityItem, index: number) => {
      return (
        <li className='selected-item' key={item.id} onClick={() => selectedClick(item, index)}>
          <div className={['selected-item-line', index ? 'top-line' : ''].join(' ')}></div>
          <div className='selected-item-text'>{item.name}</div>
        </li>
      )
    })
  }

  const regionListRender = () => {
    return cityList.map((item: CityItem) => {
      return (
        <li className='city-item' key={item.id} onClick={() => cityClick(item)}>{item.name}</li>
      )
    })
  }

  return (
    <div className='region'>
      <div className='region-main'>
        <div className='region-title flex-center'>
          <div className='region-title-text'>请选择所在地区</div>
          <div className='region-title-close' onClick={() => close()}>X</div>
        </div>
        <div className='region-selected'>{selectedListRender()}</div>
        <div className='region-con'>
          <div className='region-tips'>请选择{titleText()}</div>
          <ul className='region-list'>
            {regionListRender()}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Region;