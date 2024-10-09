import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-trabaja-con-nosotros',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './trabaja-con-nosotros.component.html',
  styleUrl: './trabaja-con-nosotros.component.css'
})
export class TrabajaConNosotrosComponent implements OnInit{
  //variables que se ocupan en todos los componentes
  saludoNombre: any;

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
