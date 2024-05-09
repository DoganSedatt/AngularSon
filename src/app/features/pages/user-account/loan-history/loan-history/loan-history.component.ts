import { Component, OnInit } from '@angular/core';
import { LoanTransactionService } from '../../../../services/loan-transaction.service';
import { AuthService } from '../../../../../core/services/Auth.service';
import { LoanTransaction } from '../../../../models/loanTransaction';
import { Response } from '../../../../models/response';
import { LoanGetById } from '../../../../models/LoanGetById';
import { ResponseModel } from '../../../../models/responseModel';
import { CommonModule } from '@angular/common';
import { Book } from '../../../../models/book';
import { BookService } from '../../../../services/book.service';
import { MemberService } from '../../../../services/member.service';

@Component({
  selector: 'app-loan-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-history.component.html',
  styleUrl: './loan-history.component.scss'
})
export class LoanHistoryComponent implements OnInit {
  constructor(private loanService: LoanTransactionService,
    private authService: AuthService,
    private memberService: MemberService,
    private bookService: BookService) { }

  memberId = this.authService.loggedInMember?.id;
  loanList: LoanTransaction[] = [];
  findLoanId!: string;
  findLoanIdArray: string[] = [];
  myResponse:any[]=[];
  myResponseBorrowed:any[]=[];
  member!:string[];
  book!:string[];

  ngOnInit(): void {

    this.getLoans();
    
  }

  getById(loanId: string) {
    if (this.memberId !== undefined) {
      this.loanService.getById(loanId).subscribe({
        next: (response: Response<LoanGetById>) => {
          console.log("Gelen ödünç cevabı:", response);
          this.myResponse.push(response);
          
          console.log("MyResponse:",this.myResponse)
          
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
    this.loanService.getAll().subscribe({
      next: (response: ResponseModel<LoanTransaction>) => {
        console.log('backendden cevap geldi:', response);
        this.loanList = response.items;
        
        console.log("GetLoans List:",this.loanList);
        this.findMember();
        this.filterLoansForMember();
        
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
      }
    })
    console.log("Bulunan LoanID Dizisi:", this.findLoanIdArray);
    //İlgili memberin tüm loan işlemlerinin ID'sini bir dizi değişkeninde saklıyorum
  };

  filterLoansForMember() {
    for (let loan of this.loanList) {
      if (loan.memberId === this.memberId) {
        this.myResponse.push(loan);
        
        if(loan.returnStatus==3){
          console.log("Status:",loan.returnStatus);//ReturnStatus'ü 3 olanları yani ödünç alınmışları console bastık
          //Sonra bunları sayfada göster=>Kitapı iade edince returnStatus değişicek ve 3 olmayanlar artık gözükmeyecek
          this.myResponseBorrowed.push(loan);
        }
      }
    }}


    
}
