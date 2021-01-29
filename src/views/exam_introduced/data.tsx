export interface listItem{
	cover: string;
    examId: number;
    examName: string;
    coverUrl: string;
}

export interface contentData{
    content?: any;
    hasContent: boolean
}

export interface newsData {
    title: string;
    content: string;
    isHot: number;
    createTime: string;
    introduced: string;
    coverUrl: string;
    id: number;
    displayStyleType: number;
    about: string;
}

export interface examContent {
    action: string;
    examContentCode: string;
    offcialAccountCode: string | number
}
export interface examIntroduction {
    action: string;
    examContentCode: string;
    examId: string | number
}
export interface examNewsContent {
    action: string;
    id: string | number;
}