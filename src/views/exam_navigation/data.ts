
export interface locationInterface{
    latitude: number;
    longitude: number;
    speed: number;
    accuracy: number;
}

export interface navigationList{
    action: string;
    token: string;
}


export interface navigationItem{
    [x: string]: any;
    baiduLat: string;
    baiduLng: string;
    examDate: string;
    examItemsName: string;
    googleLat: string;
    googleLng: string;
    testSiteName: string;
}

export interface batchListItem{
    batchName: string;
    candidateName: string;
    examName: string;
    testCenterNavigationList: navigationItem;
}