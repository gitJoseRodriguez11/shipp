import { Component, inject, Inject, OnInit,PLATFORM_ID,VERSION } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BreakpointObserver,BreakpointState } from '@angular/cdk/layout';
import { MenuComponent } from '../../menu/menu.component';
import { AppComponent } from '../../../app.component';
import { VisibilityServiceService } from '../../../services/VisibilityService/visibility-service.service';
import { ParametrosService } from '../../../services/parametros.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { TrackingComponent } from '../../tracking/tracking.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    CommonModule, RouterOutlet, MenuComponent,MatProgressBarModule,MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit{
 //variables que se ocupan en todos los componentes
 saludoNombre: any;

 // totales
 totalenvios: string = "";
 countPagados : string = "";
 countPendientesPago : string = "";
 montoPendiente : string = "";
 countCancelado : string = "";
 countPorRetirar : string = "";
 countEnTransito : string = "";
 countEntregado : string = "";
 countPreparacion : string = "";

  // mat-grid
  colspanOne: number = 0;
  colspanOne2: number = 0;
  colspanTwo: number = 0;
  colspanThree: number = 0;

  private breakpointObserver = inject(BreakpointObserver);

  // dialog
  readonly dialog = inject(MatDialog);
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    public appComponent : AppComponent,
    private visibilityService: VisibilityServiceService,
    private spinner: NgxSpinnerService,
    private readonly parametros: ParametrosService,
    private buidr: FormBuilder,
  ) 
  {
    if (isPlatformBrowser(this.platformId)) {
      this.checkSessionStorage('nombre');
    } else {
      // console.log('Running on the server, sessionStorage is not available.');
    }

    this.totalenvios = ""+parametros.separadorMiles(Number(localStorage.getItem("countEnvioProceso")));
    this.countPagados = ""+parametros.separadorMiles(Number(localStorage.getItem("countPagados")));
    this.countPendientesPago = ""+parametros.separadorMiles(Number(localStorage.getItem("countPendientesPago")));
    this.montoPendiente = ""+parametros.separadorMiles(Number(localStorage.getItem("montoPendiente")));
    this.countCancelado = ""+parametros.separadorMiles(Number(localStorage.getItem("countCancelado")));
    this.countPorRetirar = ""+parametros.separadorMiles(Number(localStorage.getItem("countPorRetirar")));
    this.countEnTransito = ""+parametros.separadorMiles(Number(localStorage.getItem("countEnTransito")));
    this.countEntregado = ""+parametros.separadorMiles(Number(localStorage.getItem("countEntregado")));
    this.countPreparacion = ""+parametros.separadorMiles(Number(localStorage.getItem("countPreparacion")));
  }

  formularioTracking = this.buidr.group({
    orden: this.buidr.control(""),
  });

  ngOnInit() {
    this.visibilityService.setVisibility(false);
    this.breakpointObserver
    .observe(['(min-width: 500px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log('Viewport width is 500px or greater!');
        this.colspanOne =1;
        this.colspanOne2 =1;
        this.colspanTwo =2;
        this.colspanThree = 2;
      } else {
        console.log('Viewport width is less than 500px!');
        this.colspanOne = 3;
        this.colspanOne2 = 2;
        
        

        this.colspanTwo =2;
        this.colspanThree = 2;
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
      
        sessionStorage.clear();
      
    }
  }
  

  openDialogTracking(): void{

    if(this.formularioTracking.value.orden === undefined || this.formularioTracking.value.orden === ""){
      this.callAlert("Debe ingresar un número de orden.");
       return;
    }else{
      const dialogRef = this.dialog.open(TrackingComponent, {
        width: "99%",
        height: "99%",
        data: {name: 'Seguimiento',orden: this.formularioTracking.value.orden},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.formularioTracking.reset();
        if (result !== undefined) {
        
        }
      });
    }
  }

  callAlert(texto: string){
    Swal.fire({
      title: "Advertencia",
      text:  texto,
      icon:  "warning"
    })
  }

}
