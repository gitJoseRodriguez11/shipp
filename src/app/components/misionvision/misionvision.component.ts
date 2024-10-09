import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppComponent } from '../../app.component';
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { BreakpointObserver,BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-misionvision',
  standalone: true,
  imports: [NgxSpinnerModule,MatCardModule,MatGridListModule],
  templateUrl: './misionvision.component.html',
  styleUrl: './misionvision.component.css'
})
export class MisionvisionComponent implements OnInit{
  //variables que se ocupan en todos los componentes
  saludoNombre: any;

  // mat-grid
  colspanOne: number = 0;
  colspanTwo: number = 0;
  colspanThree: number = 0;

  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    public appComponent : AppComponent,
    private spinner: NgxSpinnerService,
  ) 
  {
    if (isPlatformBrowser(this.platformId)) {
      this.checkSessionStorage('nombre');
    } else {
      // console.log('Running on the server, sessionStorage is not available.');
    }
  }

  ngOnInit() {
    this.breakpointObserver
    .observe(['(min-width: 500px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log('Viewport width is 500px or greater!');
        this.colspanOne =1;
        this.colspanTwo =1;
        this.colspanThree = 3;
      } else {
        console.log('Viewport width is less than 500px!');
        this.colspanOne = 2;
        this.colspanTwo =2;
        this.colspanThree = 3;
      }
    });
  }

  checkSessionStorage(key: string): void {
    const item = sessionStorage.getItem(key);
    if (item !== null) {
      // console.log(`Item with key "${key}" exists in session storage.`);
      this.saludoNombre = sessionStorage.getItem("nombre");
      this.appComponent.isAuthentificate(this.saludoNombre);
    } else {
      // console.log(`Item with key "${key}" does not exist in session storage.`);
    }
  }

  
}

