import md5 from "js-md5";
import {weChatPublicAccount} from '@/utils/map'
// 设备
export function device() {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {         //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    }
}

// 浏览器
export function browserType() {
    let isMobile = device().mobile
    if (isMobile) {
        var ua: any = navigator.userAgent.toLowerCase();//获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            //在微信中打开
            return 'wechat'
        }
        if (ua.match(/WeiBo/i) == "weibo") {
                //在新浪微博客户端打开
        }
        if (ua.match(/QQ/i) == "qq") {
                //在QQ空间打开
        }
    }
}

// 获取url参数
export const queryUrlParams = () => {
    let value: any = {};
    if (!window.location.search.includes('?')) {
        return value;
    }
    let search = window.location.search.split('?')[1];
    let splitSearch = search.split('&');
    splitSearch.forEach(item => {
        let splitItem = item.split('=');
        value[splitItem[0]] = splitItem[1];
    });
    return value;
};

export const toast = (type: string, text: string, delay: number = 3) => {
    let toastEl = document.createElement('div')
    toastEl.className = 'toast'
    let img = document.createElement('img')
    switch(type) {
        case 'success':
            img.src = 'http://tms.beiwaiguoji.com//resources/files/upload/recourseQuestionImage/2021/01/11/34/20338f0264df404d895c8397a425fad1.png'
            toastEl.appendChild(img)
            break
        case 'error': 
            img.src = 'http://tms.beiwaiguoji.com//resources/files/upload/recourseQuestionImage/2021/01/11/89/b6a16539f2a44d619136ee5390126dee.png'
            toastEl.appendChild(img)
            break
    }
    toastEl.style.animation = `toast ${delay}s`
    toastEl.appendChild(document.createTextNode(text))
    document.body.appendChild(toastEl)
    // 删除DOM元素
    setTimeout(() => {
        document.body.removeChild(toastEl)
    }, delay * 1000);
}


export const weekMap: any = {
    0: '周日',
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
}


/**
 * 时间过滤器
 * @param {number} time 
 * @param {string} fmt 
 */
export let format = (time: number | string, fmt: string) => {
    if (!time) return '';
    fmt = fmt || 'yyyy-MM-dd hh:mm';
    let date = new Date(time);

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }

    let dt: any = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };

    for (let key in dt) {
        if (new RegExp(`(${key})`).test(fmt)) {
            let str = dt[key] + '';
            fmt = fmt.replace(RegExp.$1,
                (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length)
            );
        }
    }
    return fmt;
};

/**
 * @description  处理state
 * @param   str {String}    字符  a=b|c=d
 */
export const filterState = () => {
    let str = decodeURIComponent(queryUrlParams().state)
    if (!str)   return {}
    let o: any = {},
        arr = str.split('|');
    arr.forEach((item: any) => {
        item = item.split('=')
        o[item[0]] = item[1]
    })
    return o
}

/**
 * @description 查找微信url指定值
 * @param {string}  key   
 */
export const findWechatUrlValue = (key: string) => {
    return queryUrlParams()[key] || filterState()[key]
}

/**
     * 
     * @param {*} params 
     * java 不转义的 _-. *
     * #define SPECIFED_CHARACTERS @"~!@#$%^&()+={}':;,[]\\<>?~！\" \' ''￥%……（）【】‘；：" "’“。，、？——|/`《》€ £ "
     */
export const sign = (params: any) => {
    const key = "HitTEWfyAERMrYXo$s2iSYgB8!urBUv#";
    var arr = [];
    for (var i in params) {
        arr.push((i + "=" + encodeURIComponent(params[i])).replace(/(~|!|\(|\)|\')/g, code => {
            return encodePassword[code];
        }));
    }
    var paramsStr = arr.join(("&"));
    var urlStr = paramsStr.split("&").sort().join("&");
    // 签名前 添加 timestamp  有则添加  没有则空串
    var newUrl = urlStr + '&timestamp=&key=' + key;
    return md5(newUrl).toUpperCase();
}
export const encodePassword: any = {
    '~': '%7E',
    '!': '%21',
    '(': '%28',
    ')': '%29',
    "'": '%27'
}


/**
     * @description 验证邮箱
     * @param value {string}    输入值
     */
export const vaildEmail = (value: string) => {
    return /\w+@\w*\.\w/.test(value)
}

/**
     * @description 验证手机
     * @param value {string}    输入值
     */
export const vaildPhone = (value: string) => {
    return /^1\d{10}$/.test(value)
}




export const commonLoginParam = () => {
    let type = findWechatUrlValue('type')
    return {
        fromPlatform: weChatPublicAccount[type || 8],
        deviceType: 5
    }
}

/**
 * @description 格式化日期
 */
export const formatCount = (count: number) => {
    return (count > 9 ? count : '0' + count) + 's'
}

export const handleIosInputBlurScroll = () => {
    setTimeout(function(){
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);  
}