import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { AppComponent } from '../../app.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { BreakpointObserver,BreakpointState } from '@angular/cdk/layout';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-preguntas-frecuente',
  standalone: true,
  imports: [NgxSpinnerModule,MatCardModule,MatGridListModule,
    MatExpansionModule
  ],
  templateUrl: './preguntas-frecuente.component.html',
  styleUrl: './preguntas-frecuente.component.css'
})
export class PreguntasFrecuenteComponent implements OnInit{
  //variables que se ocupan en todos los componentes
  saludoNombre: any;

  // mat-grid
  colspanOne: number = 0;

  private breakpointObserver = inject(BreakpointObserver);

  // panel 
  readonly panelOpenState = signal(false);
  readonly panelOpenStateTwo = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public appComponent : AppComponent,
    private spinner: NgxSpinnerService,
    
  ){
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
      } else {
        console.log('Viewport width is less than 500px!');
        this.colspanOne = 1;
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
