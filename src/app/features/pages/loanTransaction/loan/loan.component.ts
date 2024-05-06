import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.scss'
})
export class LoanComponent implements OnInit{
constructor(public bookService:BookService){}
  ngOnInit(): void {
    
  }

}
