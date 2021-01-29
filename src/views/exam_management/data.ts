
export interface examList{
    action: string;
    token: string;
}

export interface examItem{
    examBatchId: number;
    examBatch: number;
    examBatchexamCandidateName: string;
    examCandidateNumber: string | number;
    firstNamePinyin: string;
    lastNamePinyin: string;
    idNumber: string | number;
    examName: string;
    examCandidateName: string;
    examId: number;
    showCorrigendum: number;
    showRecheck: number;
    examItemId: number;
    checkContent: string;
    examRecheck: any;
    candidateCorrigendum: any;
}