/*
 * @Author: WuPeiQi
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-01-27 20:20:32
 * @LastEditors: WuPeiQi
 * @LastEditTime: 2021-01-29 09:35:10
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import React, { FC, useRef, useState } from 'react';
import { toast } from '@/utils/function';
import './style.less';
import { getSign, uploadImage } from './service';

interface UploadProps {
  bucketType: number, // 0: 公有仓库上传, 1: 私有仓库上传
  serviceLine: string,
  callback: (value: string[]) => void;
}

const Upload: FC<UploadProps> = ({ bucketType, serviceLine, callback }) => {
  const inputRef = useRef<any>();

  /**
     * 上传文件
     */
  const handleUpload = async () => {
    const fileName: string[] = [];
    const { files } = inputRef.current;
    if (!files.length) return;

    for (const key in files) {
      const file = files[key];
      if (typeof file === 'number') {
        callback(fileName);
        return;
      }

      let { type } = file, validSuffix = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
      if (!validSuffix.includes(type)) {
        toast('error', '请上传正确的图片');
        return;
      }

      let params: any = {
        action: 'getUFileSig',
        serviceLine,
        mediaType: 'image',
        method: 'PUT',
        ext: type.split('/')[1],
        contentType: type
      };
      if (bucketType) {
        params.bucket = 'bwgj-common';
      }
      let sign: any = await getSign(params);
      let { filename, authorization, bucketHost } = sign.info;
      let uploadParams = {
        url: `${bucketHost}/${filename}`,
        file,
        headers: {
          headers: {
            Authorization: authorization,
            'Content-Type': type,
          }
        },
        isSign: false
      }
      // 上传第三方
      await uploadImage(uploadParams);
      fileName.push(filename);
    }
  }

  return (
    <div className='upload-main'>
      <input type="file"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 9,
          opacity: 0,
        }}
        ref={inputRef}
        onChange={() => handleUpload()}
        multiple
      />
    </div>
  );
}

export default Upload;