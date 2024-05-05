import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Category } from '../../../features/models/Category';
import { CategoryService } from '../../../features/services/category.service';
import { ResponseModel } from '../../../features/models/responseModel';
import { CommonModule } from '@angular/common';
import { Response } from '../../../features/models/response';
import { Author } from '../../../features/models/Author';
import { AuthorService } from '../../../features/services/author.service';

@Component({
  selector: 'app-bottombar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './bottombar.component.html',
  styleUrl: './bottombar.component.scss'
})
export class BottombarComponent implements OnInit {
  constructor(private catService:CategoryService,private activeRoute: ActivatedRoute,private authorService:AuthorService){}
  ngOnInit(): void {
    this.getAllCategories();
  this.getAllAuthors();  
}

  categories:Category[]=[];
  
  currentCategory!:Category;
  authors:Author[]=[];
  currentAuthor!:Author;

  getAllCategories() {
    this.catService.getAll().subscribe(
      (response: ResponseModel<Category>) => {
        this.categories = response.items;
        this.categories
      }
    )}


    setCurrentCategory(category:Category){
      this.currentCategory=category;
      console.log(this.currentCategory);
    }
    getCurrentCategory(category:Category){
      if(category==this.currentCategory){
        return "list-group-item active"
      }
      else{
        return "list-group-item"
      }
    }

    getAllAuthors() {
      this.authorService.getAllAuthors().subscribe(
        (response: ResponseModel<Author>) => {
          this.authors = response.items;
          this.authors
        }
      )}
  
  
      setCurrentAuthor(author:Author){
        this.currentAuthor=author;
        console.log(this.currentAuthor);
      }
      getCurrentAuthor(author:Author){
        if(author==this.currentAuthor){
          return "list-group-item active"
        }
        else{
          return "list-group-item"
        }
      }
   
}
