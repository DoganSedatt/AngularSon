import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanTransaction } from '../models/loanTransaction';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { LoanGetById } from '../models/LoanGetById';
import { ResponseModel } from '../models/responseModel';


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

  getById(id:string):Observable<Response<LoanGetById>>{
    return this.httpClient.get<Response<LoanGetById>>('http://localhost:60805/api/LoanTransactions/'+id)
  }

  getAll():Observable<ResponseModel<LoanTransaction>>{
    return this.httpClient.get<ResponseModel<LoanTransaction>>(
      this.apiUrl+'?PageIndex=0&PageSize=100'
    );
}
}
