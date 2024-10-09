import { Component, inject, Inject, OnInit,PLATFORM_ID,VERSION } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { LoginService } from '../../services/login/login.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { VisibilityServiceService } from '../../services/VisibilityService/visibility-service.service';
import { AppComponent } from '../../app.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BreakpointObserver,BreakpointState } from '@angular/cdk/layout';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { TrackingComponent } from '../tracking/tracking.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TerminosComponent } from '../terminos/terminos.component';



@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [  MatTabsModule,MatGridListModule,MatButtonModule,MatCardModule,NgxSpinnerModule,
    CommonModule, RouterOutlet, MenuComponent,MatTooltipModule,
    MatInputModule,MatFormFieldModule,MatButtonModule,
    MatCardModule,MatGridListModule,ReactiveFormsModule,MatMenuModule,
    FormsModule,NgxSpinnerModule,MatSelectModule,MatIconModule,MatPaginatorModule,MatTableModule,
    MatDialogModule,MatCheckboxModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})


export class PagosComponent implements OnInit{
//variables que se ocupan en todos los componentes
saludoNombre: any;

// mat-grid
colspanOne: number = 0;
colspanTwo: number = 0;
colspanThree: number = 0;

private breakpointObserver = inject(BreakpointObserver);

// dialog
readonly dialog = inject(MatDialog);

pagonombreOrigen: any;
pagodireccionOrigen: any
pagocelularorigen:any;
pagoemailOrigen:any;
pagonombreDestino: any;
pagodireccionDestino: any
pagocelularDestino:any;
pagoemailDestino:any;

constructor(
  @Inject(PLATFORM_ID) private platformId: Object, 
  public appComponent : AppComponent,
  private visibilityService: VisibilityServiceService,
  private spinner: NgxSpinnerService,
  private buidr: FormBuilder,
) 
{
  if (isPlatformBrowser(this.platformId)) {
    this.checkSessionStorage('nombre');
  } else {
    // console.log('Running on the server, sessionStorage is not available.');
  }
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
      this.colspanTwo =2;
      this.colspanThree = 2;
    } else {
      console.log('Viewport width is less than 500px!');
      this.colspanOne = 3;
      
      

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

terminos(){
  const dialogRef = this.dialog.open(TerminosComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });

}


}
