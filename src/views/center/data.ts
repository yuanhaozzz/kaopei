export interface unionidLogin{
    action: string;
    code: string;
    fromPlatform?: string;
    deviceType?: number;
    mpId: string | number;
    appid?: string;
}

export interface userInfoByToken
{
    action: string;
    token: string;
    fromPlatform?: string;
    deviceType?: number;
}

