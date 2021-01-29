
export interface spokenOrderList {
    action: string;
    token: string | number;
}

export interface spokenItem{
    endTime: string;
    examDate: string;
    startTime: string;
    testSiteName: string;
}

export interface listItem {
    examName: string
    spokenOrderList: spokenItem[]
}