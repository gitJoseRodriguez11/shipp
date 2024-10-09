import { ChangeDetectionStrategy, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AppComponent } from '../../app.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import Swal from 'sweetalert2';
import { ParametrosService } from '../../services/parametros.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransbankService } from '../../services/transbank/transbank.service';
import { TransbankCreateModel } from '../../model/TransbankCreate.model';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { AddEnviosReqModel } from '../../model/Envios/AddEnvios/addEnviosReq.model';
import { EnviosModel } from '../../model/Envios/AddEnvios/Envios';
import { EnviosProductoModel } from '../../model/Envios/AddEnvios/EnvioProducto.model';
import { format } from 'date-fns';
import { EnvioService } from '../../services/envio/envio.service';
import { ComunaReqModel } from '../../model/ComunaReq.model';
import {MatSelectModule} from '@angular/material/select';
import { TerminosComponent } from '../terminos/terminos.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FrecuenteService } from '../../services/frecuente/frecuente.service';

import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { FrecuenteReqModel } from '../../model/FrecuenteReqModel.model';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddFrecuenteComponent } from './addFrecuente/add-frecuente/add-frecuente.component';

@Component({
  selector: 'app-envio-unitario',
  standalone: true,
  imports: [MatStepperModule,MatFormFieldModule,MatButtonModule,MatInputModule
    ,FormsModule,ReactiveFormsModule,MatCardModule,MatGridListModule,NgxSpinnerModule,
    MatListModule, MatDividerModule,CommonModule,MatSlideToggleModule,
    MatCheckboxModule,MatRadioModule,MatSelectModule,MatDialogModule,RouterOutlet,
  ],
  // providers: [
  //   {
  //     provide: STEPPER_GLOBAL_OPTIONS,
  //     useValue: {showError: true},
  //   },
  // ],
  templateUrl: './envio-unitario.component.html',
  styleUrl: './envio-unitario.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvioUnitarioComponent implements OnInit{
   //variables que se ocupan en todos los componentes
   saludoNombre: any;

   // dialog
   readonly dialog = inject(MatDialog);
   
   nombreForm: any;
   direccionUser: any
   celularUser:any;
   emailUser:any;
   appPaternoUser:any;
   appMaternoUser:any;

   pagonombreOrigen: any;
   pagodireccionOrigen: any
   pagocelularorigen:any;
   pagoemailOrigen:any;

   // variables destinatario
   nombreDestino: any;
   direccionDestino: any
   celularDestino:any;
   emailDestino:any;

   pagonombreDestino: any;
   pagodireccionDestino: any
   pagocelularDestino:any;
   pagoemailDestino:any;

   // variables pago
   total: any;
   urlTransbank: String;
   transbankCreateModel: TransbankCreateModel;
   tokenTransbank: String;
   respuesta: any;
   booleanPagar: boolean = false;
   booleanPorPagar: boolean = false;
   contains: boolean = false;


   addEnviosReqModel: AddEnviosReqModel;
   fechaFormateada: string = "";

   valorIva: any;
   valorNeto: any;
   valorEnvioUnitario: any;
   

  private breakpointObserver = inject(BreakpointObserver);

  colspanOne: number = 0;
  colspanTwo: number = 0;
  colspanThree: number = 0;

  isEditable = false;

  // combo
  selectedComuna = 0;
  comunasReq: ComunaReqModel = new ComunaReqModel();
  public options2: any;

  // combo comuna destino
  selected2 = 0;

  frecuenteReqModel: FrecuenteReqModel = new FrecuenteReqModel()



  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    public appComponent : AppComponent,
    private spinner: NgxSpinnerService,
    private buidr: FormBuilder,
    private readonly parametros: ParametrosService,
    private http: HttpClient,
    private transbankService: TransbankService,
    private envioService: EnvioService,
    private login: LoginService,
    private frecuenteService: FrecuenteService,
    private router: Router,
  ){
    if (isPlatformBrowser(this.platformId)) {
      this.checkSessionStorage('nombre');
    } else {
      // console.log('Running on the server, sessionStorage is not available.');
    }

    const valorUnitario = parametros.separadorMiles(parametros.valorEnvioUnitario);
    this.total = valorUnitario;
    this.valorIva = parametros.separadorMiles(parametros.valorIvaResult);
    this.valorNeto = parametros.separadorMiles(parametros.valorNeto);
    this.valorEnvioUnitario = parametros.separadorMiles(parametros.valorEnvioUnitario);
    this.urlTransbank = "";
    this.tokenTransbank = "";

    this.addEnviosReqModel = {
      data: new EnviosModel(),
      productos: []
    }


    this.transbankCreateModel = {
      amount: parametros.valorEnvioUnitario
    }
    this.respuesta = "";

    this.FormCheckTerminos.patchValue({
      checkTerminos: false
     
    });

  }

  checkForm = this.buidr.group({
    pepperoni: false,
    
  });

  checkFormXP = this.buidr.group({
    popagar: false,
    
  });

  FormCheckTerminos= this.buidr.group({
    checkTerminos: false,
    
  });

  firstFormGroup = this.buidr.group({
    name: ['', Validators.required],
    correo: ['', Validators.required],
    celular: ['', Validators.required],
    direccion: ['', Validators.required],
  });

  secondFormGroup = this.buidr.group({
    nombreDestino: ['', Validators.required],
    direccionDestino: ['', Validators.required],
    celularDestino: ['', Validators.required],
    emailDestino: ['', Validators.required]
  });

  formFrecuente = this.buidr.group({
    acceptFrecuente: ['', Validators.requiredTrue],
  });

  ngOnInit() {

    this.comunasReq = new ComunaReqModel();

    this.comunasReq = {
      idRegion : 7
    }
    this.spinner.show();

    // CALL servicio all comunas
    this.parametros.getComunas(this.comunasReq).subscribe(
      (response) =>{
       this.options2 = response;
       this.selectedComuna = Number(sessionStorage.getItem("comunaUser"));
       this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    )
    
    const item = localStorage.getItem("tbktoken");

    this.FormCheckTerminos.patchValue({
      checkTerminos: false
     
    });

    if (item !== null && item !== "") {
      // loading
      this.spinner.show();

      // console.log("token tbk encontreado");
      // console.log(item);
      localStorage.setItem("tbktoken","");

      this.transbankService.transbankCommit(item).subscribe(
        (dato) => {
          // console.log("Respuesta Commit");
          // console.log(dato);

          if ("response" in dato){
            if(dato.response.responseCode === 0){

              this.respuesta = "<p>Monto $"+this.parametros.separadorMiles(dato.response.amount)+"</p>"+
              "<p>Tarjeta ********"+dato.response.cardDetail.cardNumber+"</p>"+
              "<p>N.º de orden "+dato.response.buyOrder+"</p>";
              
              this.addEnviosReqModel = new AddEnviosReqModel();

              const fechaActual = new Date();
              this.fechaFormateada = format(fechaActual, 'yyyy-MM-dd');

              let nombreEmpresa = sessionStorage.getItem("nombreEmpresa") != "" ? sessionStorage.getItem("nombreEmpresa") : sessionStorage.getItem("nombre");

              this.frecuenteReqModel = new FrecuenteReqModel();
              let checkFre: any;
              checkFre = this.formFrecuente.value.acceptFrecuente;
              if(checkFre !== true){
                this.frecuenteReqModel = {};
              }else{
                this.frecuenteReqModel = {
                  id_usuario: Number(sessionStorage.getItem("idUser")),
                  id_empresa: 0, 
                  id_region: 0, 
                  id_provincia: 0, 
                  id_comuna : Number(localStorage.getItem("comunaDestinatario")),
                  direccion : ""+localStorage.getItem("direccionDestinatario"), 
                  nombre : ""+localStorage.getItem("nombreDestinatario"),
                  email : ""+localStorage.getItem("emailDestinatario"),
                  telefono : ""+localStorage.getItem("celularDestinatario"),
                  rut : 0, 
                  dv: "", 
                  fecha_creacion : this.fechaFormateada, 
                  fecha_actualizacion : this.fechaFormateada
                }
              }

              this.addEnviosReqModel = {
                data: {
                  estado_pagado: 1,
                  id_usuario: Number(sessionStorage.getItem("idUser")),
	                id_empresa : 0,
                  id_pais : 81,
                  id_region : 0,
                  id_provincia : 0,
                  id_comuna : Number(localStorage.getItem("comunaDestinatario")),
                  direccion : ""+localStorage.getItem("direccionDestinatario"),
                  nombre :  ""+localStorage.getItem("nombreDestinatario"),
                  email : ""+localStorage.getItem("emailDestinatario"),
                  telefono : "+56"+localStorage.getItem("celularDestinatario"),
                  rut : 0,
                  dv : "",
                  frecuente : 0,
                  fecha_creacion : this.fechaFormateada,
                  fecha_actualizacion : this.fechaFormateada,
                  fecha_entrega : "",
                  n_orden: dato.response.buyOrder,
                  fecha_pago : this.fechaFormateada,
                  status_transbank : dato.response.status,
                  pago_transbank : 1,
                  valor_envio : Number(this.parametros.valorEnvioUnitario),
                  tbk_accounting_date : dato.response.accountingDate,
                  tbk_authorization_code : dato.response.authorizationCode,
                  tbk_balance : dato.response.balance,
                  tbk_installments_amount : dato.response.installmentsAmount,
                  tbk_installments_number : dato.response.installmentsNumber,
                  tbk_payment_type_code : dato.response.paymentTypeCode,
                  tbk_response_code : dato.response.responseCode,
                  tbk_session_id : dato.response.sessionId,
                  tbk_transaction_date : dato.response.transactionDate,
                  tbk_vci : dato.response.vci,
                  tbk_token_ws : dato.response.token_ws,
                  tbk_card_number : dato.response.cardDetail.cardNumber,
                  nombre_empresa : ""+nombreEmpresa,
                  id_comuna_origen:  Number(localStorage.getItem("comunaOrigen")),
                  telefono_origen: "+56"+localStorage.getItem("celularOrigen"),
                  email_origen: ""+localStorage.getItem("emailOrigen"),
                  direccion_origen: ""+localStorage.getItem("direccionOrigen"),
                  nombre_origen:  ""+localStorage.getItem("nombreOrigen"),
                },
                frecuente: this.frecuenteReqModel,
                productos: []
              }

             
              // CALL servicio insertar envio y frecuente
              this.envioService.addEnvio(this.addEnviosReqModel).subscribe(
                (dato) => {
                  // console.log(dato);
                },
                (error) => console.log(error)
              )
  
              Swal.fire({
                title: "Pago realizado con éxito.",
                html: this.respuesta,
                icon:  "success"
              });

              localStorage.setItem("tbktoken", "");
              localStorage.setItem("comunaDestinatario", "");
              localStorage.setItem("comunaOrigen", "");
              this.secondFormGroup.reset();
              this.resetDescripcion();
              this.spinner.hide();
              return;
  
            }else{
              Swal.fire({
                title: "Pago rechazado.",
                text:  "Intente nuevamente o si el problema persiste comuníquese con nosotros.",
                icon:  "error"
              });

              localStorage.setItem("tbktoken", "");
              localStorage.setItem("comunaDestinatario", "");
              localStorage.setItem("comunaOrigen", "");
              this.secondFormGroup.reset();
              this.resetDescripcion();
              this.spinner.hide();
              return;
            }
          }

          if(dato.resp){
            let text = dato.resp;
            let searchTerm = 'aborted';
            this.contains = text.includes(searchTerm);

            if(this.contains){
              Swal.fire({
                title: "La compra fue anulada.",
                icon:  "warning"
              });
              this.secondFormGroup.reset();
              localStorage.setItem("tbktoken", "");
              localStorage.setItem("comunaDestinatario", "");
              localStorage.setItem("comunaOrigen", "");
              this.resetDescripcion();
              this.spinner.hide();
              return;
            }else{
              // console.log("otro error");
              // console.log(dato.resp);
              this.secondFormGroup.reset();
              localStorage.setItem("tbktoken", "");
              localStorage.setItem("comunaDestinatario", "");
              localStorage.setItem("comunaOrigen", "");
              this.resetDescripcion();
              this.FormCheckTerminos.patchValue({
                checkTerminos: false
               
              });
              this.spinner.hide();
              return;
            }
           
          }
        },
        (error) => console.log(error)
      )

    }

  // llenar campos origen
  this.reset();

  this.firstFormGroup.patchValue({
    name: this.nombreForm + " " + this.appPaternoUser + " " + this.appMaternoUser, 
    correo: this.emailUser,
    celular: this.celularUser,
    direccion: this.direccionUser
  });


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

  pagar(){

    if(this.checkSesion() === false){
      this.router.navigate(['']);
      return;
    }

    if(this.checkForm.value.pepperoni === false){
      this.callAlert("Debe seleccionar un método de pago.");
      return;
    }else if(this.FormCheckTerminos.value.checkTerminos === false){
      this.callAlert("Debe aceptar los términos y condiciones.");
      return;
    }else{

      const item = localStorage.getItem("tbktoken");
      if (item !== null && item !== "" && item !== "undefined") {
        // console.log("token tbk encontreado");
        // console.log(item);
        localStorage.setItem("tbktoken","");
  
        this.transbankService.transbankCommit(item).subscribe(
          (dato) => {
            // console.log("Respuesta Commit");
            // console.log(dato);
            // console.log(dato.response.accountingDate);
            // console.log(dato.response.amount);
            // console.log(dato.response.balance);
            // console.log(dato.response.buyOrder);
            // console.log(dato.response.cardDetail.cardNumber);
            // console.log(dato.response.installmentsAmount);
            // console.log(dato.response.installmentsNumber);
            // console.log(dato.response.paymentTypeCode);
            // console.log(dato.response.responseCode);
            // console.log(dato.response.sessionId);
            // console.log(dato.response.status);
            // console.log(dato.response.transactionDate);
            // console.log(dato.response.vci);
            // console.log(dato.token_ws);
          },
          (error) => console.log(error)
        )
  
      }else{
        console.log("token NO tbk encontreado");
        this.transbankService.transbankCreate(this.transbankCreateModel).subscribe(
          (dato) => {
            console.log(dato.token);
            console.log(dato.url);
            this.urlTransbank = dato.url;
            this.tokenTransbank = dato.token;
            localStorage.setItem("tbktoken", ""+dato.token);

          },
          (error) => console.log(error)
        )
      }
    }
  }

  callAlert(texto: string){
    Swal.fire({
      title: "Advertencia",
      text:  texto,
      icon:  "warning"
    })
  }

  onCheckboxChangePorPagar(){
    if(this.checkFormXP.value.popagar === true){
      this.checkForm.patchValue({
        pepperoni: false
      });
    }
  }

  onCheckboxChangeWebpay(){
    if(this.checkForm.value.pepperoni === true){
      this.checkFormXP.patchValue({
        popagar: false
      });
    }
  }

  // crear token transbank
  onCheckboxChange() {

    if(this.checkSesion() === false){
      this.router.navigate(['']);
      return;
    }

    if(this.FormCheckTerminos.value.checkTerminos === false){
      // si el check termino es = a falso limpiar token session
      this.booleanPagar = false;
      this.booleanPorPagar = false;
     
      localStorage.setItem("tbktoken", "");
    }else{

      if(this.checkForm.value.pepperoni === false && this.checkFormXP.value.popagar === false){
        this.callAlert("Debe seleccionar un método de pago.");

        this.FormCheckTerminos.patchValue({
          checkTerminos: false
        });

        return;
      }

      if(this.checkFormXP.value.popagar === true ){
        this.savePorPagar();
      }else{
        this.spinner.show();
         // solicitar token transbank
      this.transbankService.transbankCreate(this.transbankCreateModel).subscribe(
        (dato) => {
          console.log(dato.token);
          console.log(dato.url);
          this.urlTransbank = dato.url;
          this.tokenTransbank = dato.token;
          
          localStorage.setItem("tbktoken", ""+dato.token);
          localStorage.setItem("emailDestinatario", ""+this.secondFormGroup.value.emailDestino);
          localStorage.setItem("celularDestinatario", ""+this.secondFormGroup.value.celularDestino);
          localStorage.setItem("direccionDestinatario", ""+this.secondFormGroup.value.direccionDestino);
          localStorage.setItem("nombreDestinatario", ""+this.secondFormGroup.value.nombreDestino);
          localStorage.setItem("comunaDestinatario", ""+this.selected2);
          localStorage.setItem("emailOrigen", ""+this.firstFormGroup.value.correo);
          localStorage.setItem("celularOrigen", ""+this.firstFormGroup.value.celular);
          localStorage.setItem("direccionOrigen", ""+this.firstFormGroup.value.direccion);
          localStorage.setItem("nombreOrigen", ""+this.firstFormGroup.value.name);
          localStorage.setItem("comunaOrigen", ""+this.selectedComuna);
          localStorage.setItem("buyOrder", ""+dato.buyOrder);

          this.booleanPagar = true;
          this.booleanPorPagar = false;

        },
        (error) => console.log(error)
      )
      this.spinner.hide();
      }
    }
    
  }

  savePorPagar(){

    // solicitar token transbank
    this.transbankService.transbankCreate(this.transbankCreateModel).subscribe(
      (dato) => {
       
        localStorage.setItem("tbktoken", ""+dato.token);
        localStorage.setItem("emailDestinatario", ""+this.secondFormGroup.value.emailDestino);
        localStorage.setItem("celularDestinatario", ""+this.secondFormGroup.value.celularDestino);
        localStorage.setItem("direccionDestinatario", ""+this.secondFormGroup.value.direccionDestino);
        localStorage.setItem("nombreDestinatario", ""+this.secondFormGroup.value.nombreDestino);
        localStorage.setItem("comunaDestinatario", ""+this.selected2);
        localStorage.setItem("emailOrigen", ""+this.firstFormGroup.value.correo);
        localStorage.setItem("celularOrigen", ""+this.firstFormGroup.value.celular);
        localStorage.setItem("direccionOrigen", ""+this.firstFormGroup.value.direccion);
        localStorage.setItem("nombreOrigen", ""+this.firstFormGroup.value.name);
        localStorage.setItem("comunaOrigen", ""+this.selectedComuna);
        localStorage.setItem("buyOrder", ""+dato.buyOrder);

        this.booleanPagar = false;
        this.booleanPorPagar = true;

      },
      (error) => console.log(error)
    )
    this.spinner.hide();
    
  }

  savePagoPendiente(){
    this.respuesta = "<p>Monto $"+this.parametros.separadorMiles(this.parametros.valorEnvioUnitario)+"</p>"+
                     "<p>N.º de orden "+localStorage.getItem("buyOrder")+"</p>";
              
    this.addEnviosReqModel = new AddEnviosReqModel();
    const fechaActual = new Date();
    this.fechaFormateada = format(fechaActual, 'yyyy-MM-dd');
    let nombreEmpresa = sessionStorage.getItem("nombreEmpresa") != "" ? sessionStorage.getItem("nombreEmpresa") : sessionStorage.getItem("nombre");

    this.frecuenteReqModel = new FrecuenteReqModel();
    let checkFre: any;
    checkFre = this.formFrecuente.value.acceptFrecuente;
              
    if(checkFre !== true){
      this.frecuenteReqModel = {};
    }else{
      this.frecuenteReqModel = {
        id_usuario: Number(sessionStorage.getItem("idUser")),
        id_empresa: 0, 
        id_region: 0, 
        id_provincia: 0, 
        id_comuna : Number(localStorage.getItem("comunaDestinatario")),
        direccion : ""+localStorage.getItem("direccionDestinatario"), 
        nombre : ""+localStorage.getItem("nombreDestinatario"),
        email : ""+localStorage.getItem("emailDestinatario"),
        telefono : ""+localStorage.getItem("celularDestinatario"),
        rut : 0, 
        dv: "", 
        fecha_creacion : this.fechaFormateada, 
        fecha_actualizacion : this.fechaFormateada
      }
    }
    // objeto final a enviar al servicio
    this.addEnviosReqModel = {
      data: {
        estado_pagado: 0,
        id_usuario: Number(sessionStorage.getItem("idUser")),
	      id_empresa : 0,
        id_pais : 81,
        id_region : 0,
        id_provincia : 0,
        id_comuna : Number(localStorage.getItem("comunaDestinatario")),
        direccion : ""+localStorage.getItem("direccionDestinatario"),
        nombre :  ""+localStorage.getItem("nombreDestinatario"),
        email : ""+localStorage.getItem("emailDestinatario"),
        telefono : "+56"+localStorage.getItem("celularDestinatario"),
        rut : 0,
        dv : "",
        frecuente : 0,
        fecha_creacion : this.fechaFormateada,
        fecha_actualizacion : this.fechaFormateada,
        fecha_entrega : "",
        n_orden: ""+localStorage.getItem("buyOrder"),
        fecha_pago : this.fechaFormateada,
        status_transbank : "",
        pago_transbank : 0,
        valor_envio : Number(this.parametros.valorEnvioUnitario),
        tbk_accounting_date : "",
        tbk_authorization_code : "",
        tbk_balance : "",
        tbk_installments_amount : "",
        tbk_installments_number : "",
        tbk_payment_type_code : "",
        tbk_response_code : "",
        tbk_session_id : "",
        tbk_transaction_date : "",
        tbk_vci : "",
        tbk_token_ws : "",
        tbk_card_number : "",
        nombre_empresa : ""+nombreEmpresa,
        id_comuna_origen:  Number(localStorage.getItem("comunaOrigen")),
        telefono_origen: "+56"+localStorage.getItem("celularOrigen"),
        email_origen: ""+localStorage.getItem("emailOrigen"),
        direccion_origen: ""+localStorage.getItem("direccionOrigen"),
        nombre_origen:  ""+localStorage.getItem("nombreOrigen"),
      },
      frecuente: this.frecuenteReqModel,
      productos: []
    }

    console.log("###################  envios ##################");
    console.log(this.addEnviosReqModel);
    this.spinner.show();
    // CALL SERVICIO
    this.envioService.addEnvio(this.addEnviosReqModel).subscribe(
      (dato) => {
        console.log(dato);
        this.spinner.hide();
      },
      (error) => console.log(error)
    )
  
    Swal.fire({
      title: "Realizado con éxito.",
      html: this.respuesta,
      icon:  "success"
    });

    localStorage.setItem("tbktoken", "");
    localStorage.setItem("comunaDestinatario", "");
    localStorage.setItem("comunaOrigen", "");
    localStorage.setItem("buyOrder", "");
    this.secondFormGroup.reset();
    this.resetDescripcion();
    this.spinner.hide();

    this.FormCheckTerminos.patchValue({
      checkTerminos: false
    });

    this.checkFormXP.patchValue({
      popagar: false
    });

    this.router.navigate(['']);

    return;
  }

  terminos(){
    const dialogRef = this.dialog.open(TerminosComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  
  }

  setDestinatario(){

    this.pagonombreOrigen = this.firstFormGroup.value.name;
    this.pagodireccionOrigen = this.firstFormGroup.value.direccion;
    this.pagocelularorigen = this.firstFormGroup.value.celular;
    this.pagoemailOrigen = this.firstFormGroup.value.correo;

    this.pagonombreDestino = this.secondFormGroup.value.nombreDestino;
    this.pagodireccionDestino = this.secondFormGroup.value.direccionDestino;
    this.pagocelularDestino = this.secondFormGroup.value.celularDestino;
    this.pagoemailDestino = this.secondFormGroup.value.emailDestino;

  }

  reset(){
    this.nombreForm = sessionStorage.getItem("nombre") ?? "";
    this.celularUser = sessionStorage.getItem("celularUser") ?? "";
    this.emailUser = sessionStorage.getItem("emailUser") ?? "";
    this.direccionUser = sessionStorage.getItem("direccionUser") ?? "";
    this.appPaternoUser = sessionStorage.getItem("appPaternoUser") ?? "";
    this.appMaternoUser = sessionStorage.getItem("appMaternoUser") ?? "";
  }

  resetDescripcion(){
    this.pagonombreDestino = "";
    this.pagodireccionDestino = "";
    this.pagocelularDestino = "";
    this.pagoemailDestino = "";

    localStorage.setItem("emailDestinatario", "");
    localStorage.setItem("celularDestinatario", "");
    localStorage.setItem("direccionDestinatario", "");
    localStorage.setItem("nombreDestinatario", "");
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

  openDialogFrecuente(): void {
    const dialogRef = this.dialog.open(AddFrecuenteComponent, {
      width: "99%",
      height: "99%",
      data: {name: 'Destinatarios Frecuentes', animal: 'leon'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.secondFormGroup.patchValue({
          nombreDestino: result.nombre,
          direccionDestino: result.direccion,
          celularDestino: result.telefono,
          emailDestino: result.email
         
        });
        this.selected2 = result.id_comuna;
      }
    });
  }

}