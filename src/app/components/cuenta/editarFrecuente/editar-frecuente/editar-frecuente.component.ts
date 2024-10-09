import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FrecuenteReqModel } from '../../../../model/FrecuenteReqModel.model';
import { FrecuenteService } from '../../../../services/frecuente/frecuente.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { ParametrosService } from '../../../../services/parametros.service';
import { ComunaReqModel } from '../../../../model/ComunaReq.model';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../../../services/login/login.service';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { RespuestaGlobalModel } from '../../../../model/RespuestaGlobal.model';


@Component({
  selector: 'app-editar-frecuente',
  standalone: true,
  imports: [MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatListModule,
    CommonModule,
    NgxSpinnerModule,MatGridListModule,MatSelectModule,MatCardModule,
    ReactiveFormsModule],
  templateUrl: './editar-frecuente.component.html',
  styleUrl: './editar-frecuente.component.css'
})
export class EditarFrecuenteComponent implements OnInit{

  readonly dialogRef = inject(MatDialogRef<EditarFrecuenteComponent>);
  inputdata: any;
  public respuesta: any;

  selectedComunaFrecuente = 0;
  public optionsFrecuente: any;
  comunasReq: ComunaReqModel = new ComunaReqModel();
  frecuenteReqModel : FrecuenteReqModel = new FrecuenteReqModel();
  respuestaGlobalModel: RespuestaGlobalModel = new RespuestaGlobalModel();

  fechaFormateada: string = "";

  // constructor
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private buidr: FormBuilder,
    private frecuenteService: FrecuenteService,
    private spinner: NgxSpinnerService,
    private parametros: ParametrosService,
    private login: LoginService,
    private router: Router,
  ){
    const fechaActual = new Date();
    this.fechaFormateada = format(fechaActual, 'yyyy-MM-dd');
  }

  formularioFrecuente= this.buidr.group({
    nombreFrecuente: this.buidr.control(""),
    correoFrecuente: this.buidr.control(""),
    celularFrecuente: this.buidr.control(""),
    direccionFrecuente: this.buidr.control("")
  });

  ngOnInit() {
    
    this.inputdata = this.data;
    console.log(this.inputdata);

    this.formularioFrecuente.patchValue({
      nombreFrecuente: this.inputdata.frecuente.nombre,
      correoFrecuente: this.inputdata.frecuente.email,
      celularFrecuente: this.inputdata.frecuente.telefono,
      direccionFrecuente: this.inputdata.frecuente.direccion
    });
    this.selectedComunaFrecuente = this.inputdata.frecuente.id_comuna;

    this.spinner.show();

    this.comunasReq = new ComunaReqModel();

    this.comunasReq = {
      idRegion : 7
    }
    // call comuna
    this.parametros.getComunas(this.comunasReq).subscribe(
      (response) =>{
       this.optionsFrecuente = response;
       this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

 
  saveFrecuente(): void{
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
    } else{
      this.spinner.show();
      this.frecuenteReqModel = new FrecuenteReqModel();

      this.frecuenteReqModel = {
        idfrecuente: this.inputdata.frecuente.idfrecuente, 
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
        fecha_creacion : this.inputdata.frecuente.fecha_creacion, 
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
          this.formularioFrecuente.reset();
          this.spinner.hide();
          this.dialogRef.close(this.frecuenteReqModel);
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
}
