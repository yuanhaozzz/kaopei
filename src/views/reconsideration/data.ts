
export interface getExamRecheck{
    action: string;
    token: string;
    examId: string;
    examBatchId: string;
    examCandidateNumber: string;
}

export interface saveExamRecheck{
    action: string;
    token: string;
    examId: string;
    examBatchId: string;
    examCandidateNumber: string;
    mobile: string;
    email: string;
    applyContent: string;
    smsCode: string;
}

export interface smsSend {
    action: string;
    smsSignId: string | number;
    smsTemplateId: string | number;
    mobile: string | number;
    validateCode: number;
    sign?: string;
}

export interface reconsideration {
    action: string;
    examId: string | number;
}

export interface fee {
    action: string;
    examId: string | number;
}