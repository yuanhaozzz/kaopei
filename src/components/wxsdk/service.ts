import {request} from '@/utils/request'

interface shareConf{
    action: string;
    mpId: string |number;
    url: string |number;
    timestamp: number;
}

const getShareConf = (data: shareConf) => request('/examuser/dispatch', 'post', data)

export {
    getShareConf
}