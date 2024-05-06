import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanTransaction } from '../models/loanTransaction';
import { Observable } from 'rxjs';


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
}
