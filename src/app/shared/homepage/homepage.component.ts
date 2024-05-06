import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from "../components/navbar/navbar.component";
import { CategoryListComponent } from "../../features/pages/admin/category/category-list/category-list.component";
import { BookListComponent } from '../../features/pages/admin/book/book-list/book-list.component';
import { LayoutComponent } from "../layout/layout.component";
import { BookListForMembersComponent } from "../../features/pages/book/book-list-for-members/book-list-for-members.component";



@Component({
    selector: 'myhomepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
    imports: [CommonModule, FormsModule, CategoryListComponent, BookListComponent, BookListForMembersComponent]
})
export class HomepageComponent {
    title = 'library';
    image='assets/images/library_image.jpg';
}
