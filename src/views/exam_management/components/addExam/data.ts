
export interface examList{
    action: string;
    token: string;
}
export interface examAdd{
    action: string;
    token: string;
    examCandidateNumber: string | number;
    examId: string | number;
    examBatchId: string | number;
}

export interface examInfo{
    action: string;
    token: string;
    examCandidateNumber: string | number;
    examId: string | number;
    examBatchId: string | number;
    checkCode: string | number;
    phone: string | number;
}

export interface smsSend {
    action: string;
    smsSignId: string | number;
    smsTemplateId: string | number;
    mobile: string | number;
    validateCode: number;
    sign?: string;
}