import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Member } from '../../../features/models/member';
import { AuthService } from '../../../core/services/Auth.service';
import { TokenService } from '../../../core/services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-middlebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './middlebar.component.html',
  styleUrl: './middlebar.component.scss'
})
export class MiddlebarComponent {
  loggedInMember: Member | null = null;
  constructor(private tokenService:TokenService,private router:Router,public authService:AuthService){}
  isLoggedIn():boolean{
    
    this.loggedInMember=this.authService.loggedInMember;
    
    return this.tokenService.hasToken();//Token varsa true yoksa false dönecek.
    
  }

  logOut():void{
    this.authService.loggedInMember=null;
    this.tokenService.removeToken();
    this.router.navigateByUrl('/login');
  }
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  @HostListener('document:mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.navbar')) {
      this.isMenuOpen = false;
    }
  }
  
}
