import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanTransaction } from '../models/loanTransaction';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { ResponseModel } from '../models/responseModel';
import { ReturnLoanBook } from '../models/returnLoanBook';


@Injectable({
  providedIn: 'root'
})
export class LoanTransactionService {
  apiUrl="http://localhost:60805/api/LoanTransactions";
  constructor(private httpClient:HttpClient) { }

  borrowed(loanTransaction:LoanTransaction):Observable<LoanTransaction>{
    const token = localStorage.getItem('Token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<LoanTransaction>(this.apiUrl,loanTransaction,{headers:headers})
  }

  bookReturn(loanTransaction:ReturnLoanBook):Observable<any>{
    return this.httpClient.put<ReturnLoanBook>(this.apiUrl,loanTransaction)
  }

  getById(id:string):Observable<Response<LoanTransaction>>{
    return this.httpClient.get<Response<LoanTransaction>>('http://localhost:60805/api/LoanTransactions/'+id)
  }

  getAll():Observable<ResponseModel<LoanTransaction>>{
    return this.httpClient.get<ResponseModel<LoanTransaction>>(
      this.apiUrl+'?PageIndex=0&PageSize=100'
    );
}
}
