import { Component, OnInit, VERSION } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import {MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  name = 'Angular ' + VERSION.major;
  public isCollapsed = true;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    let sidebar: any | null = document.querySelector('.sidebar');
    let closeBtn: any | null = document.querySelector('#btn');
    let searchBtn: any | null = document.querySelector('.bx-search');

    closeBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      menuBtnChange(); //calling the function(optional)
    });

    searchBtn.addEventListener('click', () => {
      // Sidebar open when you click on the search iocn
      sidebar.classList.toggle('open');
      menuBtnChange(); //calling the function(optional)
    });

    // following are the code to change sidebar button(optional)
    function menuBtnChange() {
      if (sidebar.classList.contains('open')) {
        closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right'); //replacing the iocns class
      } else {
        closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu'); //replacing the iocns class
      }
    }
  }

  salir(): void{
    localStorage.removeItem(localStorage.getItem("authToken") || '');
    sessionStorage.clear;
    this.loginService.logout();
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goContacto() {
    this.router.navigate(['/contacto']);
  }
}
