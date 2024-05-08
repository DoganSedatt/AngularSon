import { Component, OnInit } from '@angular/core';
import { LoanTransactionService } from '../../../../services/loan-transaction.service';
import { AuthService } from '../../../../../core/services/Auth.service';
import { LoanTransaction } from '../../../../models/loanTransaction';
import { Response } from '../../../../models/response';
import { LoanGetById } from '../../../../models/LoanGetById';
import { ResponseModel } from '../../../../models/responseModel';

@Component({
  selector: 'app-loan-history',
  standalone: true,
  imports: [],
  templateUrl: './loan-history.component.html',
  styleUrl: './loan-history.component.scss'
})
export class LoanHistoryComponent implements OnInit {
  constructor(private loanTrans: LoanTransactionService,
    private authService: AuthService) { }

  memberId = this.authService.loggedInMember?.id;
  loanHistory: LoanTransaction[] = [];
  loanList: LoanTransaction[] = [];
  findLoanId!: string;
  findLoanIdArray: string[] = [];

  ngOnInit(): void {

    this.getLoans();

  }

  getById(loanId: string) {
    if (this.memberId !== undefined) {
      this.loanTrans.getById(loanId).subscribe({
        next: (response: Response<LoanGetById>) => {
          console.log("Gelen ödünç cevabı:", response);
          this.loanHistory = response.items;

          console.log("LoanHistory:", this.loanHistory);
        },
        error: (error) => {
          console.log('backendden hatalı cevap geldi.', error);
        },
        complete: () => {
          console.log('backend isteği sonlandı.');

        }
      });
    }
  }
  getLoans() {
    this.loanTrans.getAll().subscribe({
      next: (response: ResponseModel<LoanTransaction>) => {
        console.log('backendden cevap geldi:', response);
        this.loanList = response.items;
        console.log("getLoans içindeki findMember:", this.findMember());
        console.log("getLoans içindeki procces:", this.processAllLoanIds());
      },
      error: (error) => {
        console.log('backendden hatalı cevap geldi.', error);
      },
      complete: () => {
        console.log('backend isteği sonlandı.');
      }
    });

  }
  findMember() {
    this.loanList.forEach((loan: LoanTransaction) => {
      if (loan.memberId == this.authService.loggedInMember?.id) {
        this.findLoanId = loan.id;
        this.findLoanIdArray.push(this.findLoanId);
        console.log("Bulunan loan Id'ler:", this.findLoanId);
      }

    })
    console.log("Bulunan LoanID Dizisi:", this.findLoanIdArray);
    //İlgili memberin tüm loan işlemlerinin ID'sini bir dizi değişkeninde saklıyorum
  };

  processAllLoanIds() {
    this.findLoanIdArray.forEach((loanId: any) => {
      this.getById(loanId); // Her bir loanId için getById metodunu çağır
    });
  }
}
