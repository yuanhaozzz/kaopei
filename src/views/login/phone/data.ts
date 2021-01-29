export interface smsSend {
    action: string;
    smsSignId: string | number;
    smsTemplateId: string | number;
    mobile: string | number;
    validateCode: number;
    sign?: string;
}

export interface bindMobile {
    action: string;
    mpId: string | number;
    openId: string | number;
    mobile: string | number;
    smsCode: any;

    fromPlatform?: string | number;
    deviceType?: string | number;
    sign?: string;
}