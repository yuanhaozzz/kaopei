import axios from 'axios';
import { toast } from '@/utils/function'
import paramsQs from 'qs';
import {commonLoginParam, sign} from '@/utils/function'


export const http = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
});

http.interceptors.request.use(
  config => {
    // post数据序列化  针对post需要
    if (config.method !== 'get') {
      if (!config['headers']['Content-Type'] || config['headers']['Content-Type'] === 'application/x-www-form-urlencoded') {
        config.data = paramsQs.stringify(config.data);
      }
    }
    (document.querySelector('.common-loading-wrapper') as any).style.display = 'block'

    return config;
  },
  error => Promise.reject(error),
)

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if ([400, 401].indexOf(error.response.status) > -1) {
        console.log('error.response', error.response);
      }
    } else if (error.request) {
      console.log('error.request', error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log('error.config', error.config);
    return Promise.reject(error);
  },
);

function post(url: string, data?: any, conf?: any, toastShow?: boolean) {
	return new Promise((resolve, reject) => {
		http.post(url, data).then(response => {
		let responseData = response.data,
			code = responseData.status.code;
		if (code !== 0) {
      toastShow && toast('error', responseData.status.message)
			reject(code)
		}
		

		try {
			(document.querySelector('.common-loading-wrapper') as any).style.display = 'none'
		} catch (error) {}
		
		resolve(response.data.data)

		}).catch(error => {
		reject(error)
		})
	})
}

function get(url: string, data?: any, toastShow?: boolean) {
  return new Promise((resolve, reject) => {
    http.get(url, { params: data }).then(response => {
      const { data } = response;
      if (data.status.code !== 0) {
        toastShow && toast('error', data.status.message)
        reject(data.status.code)
      }
      (document.querySelector('.common-loading-wrapper') as any).style.display = 'none';
      resolve(data.data);
    }).catch(error => {
      reject(error)
    })
  })
}

function put(url: string, data?: any, conf?: any) {
  return new Promise((resolve, reject) => {
    http.put(url, data, conf).then(response => {
      (document.querySelector('.common-loading-wrapper') as any).style.display = 'none';
      resolve(response.data.data)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * @description: 网络请求
 * @param {url: 请求地址, method?: 请求方式, data?: 请求参数, conf?: 请求时headers配置, toastShow: 是否弹出toast} 
 * @return {} 
 */
export function request(url: string, method?: string, data?: any, toastShow: boolean = true, isSign: boolean = true, conf?: any) {
  if (isSign) {
    data = {...data, ...commonLoginParam()}
    data.sign = sign(data)
  }
  
  switch (method) {
    case 'get':
      return get(url, data, toastShow);
    case 'post':
      return post(url, data, conf, toastShow);
    case 'put':
      return put(url, data, conf);
    default:
      return get(url, data, toastShow);
  }
}
