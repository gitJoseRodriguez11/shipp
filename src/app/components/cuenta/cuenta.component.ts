import { MatGridListModule } from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, OnInit, PLATFORM_ID,signal,VERSION, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { BreakpointObserver,BreakpointState } from '@angular/cdk/layout';
import { AddContactoModel } from '../../model/AddContacto';
import { RespuestaGlobalModel } from '../../model/RespuestaGlobal.model';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';
import {MatSelectModule} from '@angular/material/select';
import { ParametrosService } from '../../services/parametros.service';
import { ComunaReqModel } from '../../model/ComunaReq.model';
import { SetUserReqdModel } from '../../model/SetUserReq.model';
import { LoginService } from '../../services/login/login.service';
import {MatIconModule} from '@angular/material/icon';
import { SetPasswordModel } from '../../model/setPassword.model';
import { Router } from '@angular/router';
import { FrecuenteReqModel } from '../../model/FrecuenteReqModel.model';
import { FrecuenteService } from '../../services/frecuente/frecuente.service';

import {MatTooltipModule} from '@angular/material/tooltip';
import { format } from 'date-fns';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';


// import table
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { EditarFrecuenteComponent } from './editarFrecuente/editar-frecuente/editar-frecuente.component';
import { FrecuenteRespModel } from '../../model/Frecuente/FrecuenteReqModel.model';

// end import table

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [MatTabsModule,MatGridListModule,MatButtonModule,MatCardModule,NgxSpinnerModule,
    CommonModule, RouterOutlet, MenuComponent,MatTooltipModule,
    MatInputModule,MatFormFieldModule,MatButtonModule,
    MatCardModule,MatGridListModule,ReactiveFormsModule,MatMenuModule,
    FormsModule,NgxSpinnerModule,MatSelectModule,MatIconModule,MatPaginatorModule,MatTableModule,
    MatDialogModule
  ],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent implements OnInit{

  //variables que se ocupan en todos los componentes
  saludoNombre: any;
  defaultCategoryId: String = "2"; 
  // selected:  String = "red";

  fechaFormateada: string = "";

  selected = 'option2';
  public options2: any;
  public optionsFrecuente: any;
   
  selected2 = 0;
  selectedComuna = 0;
  selectedComunaFrecuente = 0;
  selectedGenero = 1;

  //table frecuente
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns: string[] = ['nombre','email', 'telefono','comuna', 'direccion','acciones'];
  dataSource: any;
  frecuenteReqModel : FrecuenteReqModel = new FrecuenteReqModel();
  public alltable: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // en table frecuente

  public genero = [
    {"value": 1, "viewValue": "Masculino"},
    {"value": 2, "viewValue": "Femenino"},
    {"value": 3, "viewValue": "Otro"}
  ]

   // dialog
   readonly dialog = inject(MatDialog);

  comunasempresas: Food[] = [
    {value: "1", viewValue: 'Puente Alto'},
    {value: '2', viewValue: 'La Florida'},
    {value: '3', viewValue: 'Providencia'},
    {value: 'red', viewValue: 'Red'},
    
  ];

  private _formBuilder = inject(FormBuilder);
  private breakpointObserver = inject(BreakpointObserver);
  addContactoModel:AddContactoModel = new AddContactoModel();
  respuestaGlobalModel: RespuestaGlobalModel = new RespuestaGlobalModel();
  setUserReqdModel : SetUserReqdModel = new SetUserReqdModel();

  comunasReq: ComunaReqModel = new ComunaReqModel();

  colspanOne: number = 0;
  colspanTwo: number = 0;
  colspanThree: number = 0;

  colspanFrecuenteOne: number = 0;
  colspanFrecuenteTwo: number = 0;

  //pass
  hide = signal(true);
  hideTwo = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  clickEventTwo(event: MouseEvent) {
    this.hideTwo.set(!this.hideTwo());
    event.stopPropagation();
  }

  setPasswordModel: SetPasswordModel = new SetPasswordModel();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private buidr: FormBuilder,
    private spinner: NgxSpinnerService,
    private parametros: ParametrosService,
    private loginService: LoginService,
    private login: LoginService,
    public appComponent : AppComponent,
    private router: Router,
    private frecuenteService: FrecuenteService
  ){
    if (isPlatformBrowser(this.platformId)) {
      this.checkSessionStorage('nombre');
    } else {
    }
    
    this.formulario.patchValue({
    nombre: sessionStorage.getItem("nombre"),
    correo: sessionStorage.getItem("emailUser"),
    celular: sessionStorage.getItem("celularUser"),
    appPaterno: sessionStorage.getItem("appPaternoUser"),
    appMaterno: sessionStorage.getItem("appMaternoUser"),
    direccionUser: sessionStorage.getItem("direccionUser"),
    });

    const fechaActual = new Date();
    this.fechaFormateada = format(fechaActual, 'yyyy-MM-dd');
  }

  ngOnInit() {

    this.comunasReq = new ComunaReqModel();
    this.selectedGenero = Number(sessionStorage.getItem("generoUser"));

    this.comunasReq = {
      idRegion : 7
    }

    this.spinner.show();
    this.parametros.getComunas(this.comunasReq).subscribe(
      (response) =>{
       this.options2 = response;
       this.optionsFrecuente = response;
       this.selectedComuna = Number(sessionStorage.getItem("comunaUser"));
       this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    )
    
    this.breakpointObserver
    .observe(['(min-width: 500px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.colspanOne =1;
        this.colspanTwo =1;
        this.colspanThree = 3;
        this.colspanFrecuenteOne = 1;
        this.colspanFrecuenteTwo = 3;
      } else {
        this.colspanOne = 2;
        this.colspanTwo =2;
        this.colspanThree = 3;
        this.colspanFrecuenteOne = 4;
        this.colspanFrecuenteTwo = 4;
      }
    });

    this.buscarAll();
  }

  formularioPass = this.buidr.group({
    pass: this.buidr.control(""),
    passConfirm: this.buidr.control("")
  });

  formulario = this.buidr.group({
    nombre: this.buidr.control(""),
    appPaterno: this.buidr.control(""),
    appMaterno : this.buidr.control(""),
    correo: this.buidr.control(""),
    celular: this.buidr.control(""),
    direccionUser: this.buidr.control("")
  });

  formularioFrecuente= this.buidr.group({
    nombreFrecuente: this.buidr.control(""),
    correoFrecuente: this.buidr.control(""),
    celularFrecuente: this.buidr.control(""),
    direccionFrecuente: this.buidr.control("")
  });

  formularioEmpresa = this.buidr.group({
    nombreEmpresa: this.buidr.control(""),
    NombreFantasia: this.buidr.control(""),
    RutEmpresa: this.buidr.control(""),
    DireccionEmpresa: this.buidr.control(""),
  });

  panelColor = new FormControl('red');

  saveFrecuente(){

    if(this.checkSesion() === false){
      this.router.navigate(['']);
      return;
    }

    if(this.formularioFrecuente.value.nombreFrecuente === undefined || this.formularioFrecuente.value.nombreFrecuente === ""){
      this.callAlert("Debe ingresar un nombre.");
      return;
    }else if(this.formularioFrecuente.value.correoFrecuente === undefined || this.formularioFrecuente.value.correoFrecuente === ""){
      this.callAlert("Debe ingresar un correo.");
      return;
    }else if(this.formularioFrecuente.value.celularFrecuente === undefined || this.formularioFrecuente.value.celularFrecuente === ""){
      this.callAlert("Debe ingresar un número de celular.");
      return;
    }else if(this.formularioFrecuente.value.direccionFrecuente === undefined || this.formularioFrecuente.value.direccionFrecuente === ""){
      this.callAlert("Debe ingresar una dirección.");
      return;
    }else if(this.selectedComunaFrecuente === 0){
      this.callAlert("Debe seleccionar una comuna.");
    }
    
    else{
      this.spinner.show();
      this.frecuenteReqModel = new FrecuenteReqModel();

      this.frecuenteReqModel = {
        id_usuario: Number(sessionStorage.getItem("idUser")),
        id_empresa: 0, 
        id_region: 0, 
        id_provincia: 0, 
        id_comuna : this.selectedComunaFrecuente, 
        direccion : ""+this.formularioFrecuente.value.direccionFrecuente, 
        nombre : ""+this.formularioFrecuente.value.nombreFrecuente, 
        email : ""+this.formularioFrecuente.value.correoFrecuente, 
        telefono : ""+this.formularioFrecuente.value.celularFrecuente, 
        rut : 0, 
        dv: "", 
        fecha_creacion : this.fechaFormateada, 
        fecha_actualizacion : this.fechaFormateada
      }

      this.frecuenteService.addFrecuente(this.frecuenteReqModel).subscribe(
        (response) =>{
         this.respuestaGlobalModel = response;
         
         if(this.respuestaGlobalModel.codRespuesta == 0){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: this.respuestaGlobalModel.glosaRespuesta,
            showConfirmButton: false,
            timer: 1000
          });
          this.selectedComunaFrecuente = 0;
          this.buscarAll();
          this.formularioFrecuente.reset();
         }else{
          Swal.fire({
            title: "Advertencia",
            text:  this.respuestaGlobalModel.glosaRespuesta,
            icon:  "warning"
          })
         }
         this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      )
    }
  }

  callAlert(texto: string){
    Swal.fire({
      title: "Advertencia",
      text:  texto,
      icon:  "warning"
    })
  }

  checkSessionStorage(key: string): void {
    const item = sessionStorage.getItem(key);
    if (item !== null) {
      this.saludoNombre = sessionStorage.getItem("nombre");
      this.appComponent.isAuthentificate(this.saludoNombre);
    } else {
      this.saludoNombre = 'inicia sesión';
      this.appComponent.isAuthentificate(this.saludoNombre);
    }
  }

  savePersonales(){
    
    if(this.checkSesion() === false){
      this.router.navigate(['']);
      return;
    }

    if(this.formulario.value.nombre === undefined || this.formulario.value.nombre === ""){
      this.callAlert("Debe ingresar un nombre.");
      return;
    }else if(this.formulario.value.appPaterno === undefined || this.formulario.value.appPaterno === ""){
      this.callAlert("Debe ingresar un apellido paterno.");
      return;
    }else if(this.formulario.value.appMaterno === undefined || this.formulario.value.appMaterno === ""){
      this.callAlert("Debe ingresar un apellido materno.");
      return;
    }else if(this.formulario.value.correo === undefined || this.formulario.value.correo === ""){
      this.callAlert("Debe ingresar un correo.");
      return;
    }else if(this.formulario.value.celular === undefined || this.formulario.value.celular === ""){
      this.callAlert("Debe ingresar un número de celular.");
      return;
    }else if(this.formulario.value.direccionUser === undefined || this.formulario.value.direccionUser === ""){
      this.callAlert("Debe ingresar una dirección.");
      return;
    }
    
    else{
      this.spinner.show();
      this.setUserReqdModel = new SetUserReqdModel();

      this.setUserReqdModel = {
        idUsuario: Number(sessionStorage.getItem("idUser")),
        nombre: this.formulario.value.nombre ?? "",
        appPaterno: this.formulario.value.appPaterno ?? "",
        appMaterno: this.formulario.value.appMaterno ?? "",
        email: this.formulario.value.correo ?? "",
        celular: this.formulario.value.celular ?? "",
        idPais: 81,
        idComuna: this.selectedComuna,
        idRegion: 7,
        direccion: this.formulario.value.direccionUser ?? "",
        idGenero: this.selectedGenero
      }

      this.login.setUser(this.setUserReqdModel).subscribe(
        (response) =>{
         this.respuestaGlobalModel = response;
         
         if(this.respuestaGlobalModel.codRespuesta == 0){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: this.respuestaGlobalModel.glosaRespuesta,
            showConfirmButton: false,
            timer: 1000
          });

          sessionStorage.setItem("nombre", ""+this.formulario.value.nombre);
          sessionStorage.setItem("appPaternoUser",""+this.formulario.value.appPaterno);
          sessionStorage.setItem("appMaternoUser",""+this.formulario.value.appMaterno);
          sessionStorage.setItem("emailUser", ""+this.formulario.value.correo);
          sessionStorage.setItem("celularUser",""+this.formulario.value.celular);
          sessionStorage.setItem("direccionUser",""+this.formulario.value.direccionUser);
          sessionStorage.setItem("comunaUser",""+this.selectedComuna);
          sessionStorage.setItem("generoUser",""+this.selectedGenero);

          if (isPlatformBrowser(this.platformId)) {
            this.checkSessionStorage('nombre');
          } else {
          }
         }else{
          Swal.fire({
            title: "Advertencia",
            text:  this.respuestaGlobalModel.glosaRespuesta,
            icon:  "warning"
          })
         }
         this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      )
    }
  }

  savePass(){
 
    if(this.checkSesion() === false){
      this.router.navigate(['']);
      return;
    }
    
    if(this.formularioPass.value.pass === undefined || this.formularioPass.value.pass === ""){
      this.loginService.callAlert("Debe ingresar una contraseña.");
      return;
    }else if(this.formularioPass.value.passConfirm === undefined || this.formularioPass.value.passConfirm === ""){
       this.loginService.callAlert("Debe ingresar una contraseña de confirmación.");
       return;
     }else{
       this.spinner.show();
       
       this.setPasswordModel = {
         idUser: Number(sessionStorage.getItem("idUser")),
         pass: this.formularioPass.value.pass ?? "",
         passConfirm: this.formularioPass.value.passConfirm ?? "",
         correo: "byid"
       }
 
       // call servicio
       this.loginService.setPassword(this.setPasswordModel).subscribe(
         (response) =>{
 
           this.respuestaGlobalModel = response;
 
           // validar respuesta servicio
           if(this.respuestaGlobalModel.codRespuesta == 0){
             Swal.fire({
               position: "top-end",
               icon: "success",
               title: this.respuestaGlobalModel.glosaRespuesta,
               showConfirmButton: false,
               timer: 1000
             });

             this.formularioPass.reset();
             
           }else{
 
             Swal.fire({
               title: "Advertencia",
               text:  this.respuestaGlobalModel.glosaRespuesta,
               icon:  "warning"
             })
         
           }
 
           this.spinner.hide();
         },
         (error) => {
 
           console.log(error);
           this.spinner.hide();
 
         }
        )
     
 
 
   }
  }

  checkSesion(): boolean{
    if(this.login.isAuthentificate() === false){
      Swal.fire({
        title: "Sesión expiro.",
        icon: "warning",
        timer: 3000
      })
      sessionStorage.clear();
      localStorage.clear();
      return false;
    }
    return true;
  }

  // table frecuente
  buscarAll(){
    if(this.checkSesion() === false){
      this.router.navigate(['']);
      return;
    }

    this.frecuenteReqModel = new FrecuenteReqModel();

    this.frecuenteReqModel = {
      id_usuario : Number(sessionStorage.getItem("idUser"))
    }
     // call servicio
     this.frecuenteService.allFrecuenteByIdUser(this.frecuenteReqModel).subscribe(
      (response) =>{
        this.spinner.show();
        this.alltable = response

        // validar respuesta servicio
        if( this.alltable.codRespuesta == 0){
          
          const ELEMENT_DATA: FrecuenteRespModel[] = this.alltable.listaFreecuente;

          this.dataSource = new MatTableDataSource<FrecuenteRespModel>(ELEMENT_DATA);
          this.dataSource.paginator = this.paginator ?? null;
          this.spinner.hide();
          
        }else{
      
        }

        this.spinner.hide();
      },
      (error) => {

        console.log(error);
        this.spinner.hide();

      }
     )
  }

  eliminarFrecuente(model: any){
    Swal.fire({
      title: "Está seguro de eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        
        // call servicio
        this.frecuenteService.deleteFrecuenteByID(model.idfrecuente).subscribe(
          (response) =>{
            this.spinner.show();
            this.respuestaGlobalModel = response;

            // validar respuesta servicio
            if( this.respuestaGlobalModel.codRespuesta == 0){
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: this.respuestaGlobalModel.glosaRespuesta,
                showConfirmButton: false,
                timer: 1000
              });
              this.buscarAll();
              this.spinner.hide();
            }else{
              this.callAlert(""+this.respuestaGlobalModel.glosaRespuesta);
            }
            this.spinner.hide();
          },
          (error) => {
            console.log(error);
            this.spinner.hide();
          }
        )
      }
    });
  }

  openDialogEditFrecuente(model: any): void {

    if(this.parametros.isMobile()){
      const dialogRef = this.dialog.open(EditarFrecuenteComponent, {
        width: "99%",
        height: "60%",
        data: {name: 'Editar Frecuente', frecuente: model},
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.buscarAll();
         
        }
      });
    }else{
      const dialogRef = this.dialog.open(EditarFrecuenteComponent, {
        width: "99%",
        height: "99%",
        data: {name: 'Editar Frecuente', frecuente: model},
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.buscarAll();
         
        }
      });
    }

   

   
  }

  
  
}