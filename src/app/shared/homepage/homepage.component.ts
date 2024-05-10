import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from "../components/navbar/navbar.component";
import { CategoryListComponent } from "../../features/pages/admin/category/category-list/category-list.component";
import { BookListComponent } from '../../features/pages/admin/book/book-list/book-list.component';
import { LayoutComponent } from "../layout/layout.component";
import { BookListForMembersComponent } from "../../features/pages/book/book-list-for-members/book-list-for-members.component";
import { FooterComponent } from "../layout/footer/footer.component";
import { Announcement } from '../../features/models/announcement';
import { AnnouncementService } from '../../features/services/announcement.service';
import { ResponseModel } from '../../features/models/responseModel';
import { RouterLink } from '@angular/router';





@Component({
    selector: 'myhomepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
    imports: [CommonModule, FormsModule,RouterLink, CategoryListComponent, BookListComponent, BookListForMembersComponent, FooterComponent]
})
export class HomepageComponent {
   
announcementList: Announcement[]=[];

constructor(private announcementService: AnnouncementService){}
ngOnInit():void{
this.getAnnouncement();
}

getAnnouncement(){
    this.announcementService.getAll().subscribe({
        next:(response:ResponseModel<Announcement>)=>{
          console.log('backendden cevap geldi:',response);
          this.announcementList = response.items;
          console.log("AnnouncementList:",this.announcementList)
          this.announcementList.forEach(announcement=>{
            console.log(announcement.title);
           
          })
        },
        error : (error) =>{
          console.log('backendden hatalı cevap geldi.',error);
        },
        complete: () =>{
          console.log('backend isteği sonlandı.');
        }
      });
    }
}



