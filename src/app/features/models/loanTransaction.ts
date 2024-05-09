export interface LoanTransaction {
    id: string;
    memberId: string;
    memberName:string;
    bookId: string;
    bookName:string;
    returnStatus: ReturnStatus;
    returnTime: Date;
    
}
export enum ReturnStatus {
    NotReturned = 1,
    Returned = 2,
    Borrowed = 3
}