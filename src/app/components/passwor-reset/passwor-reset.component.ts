import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../services/login/login.service';
import { AppComponent } from '../../app.component';
import { RecuperarPassModel } from '../../model/RecuperarPass.model';
import { RespuestaGlobalModel } from '../../model/RespuestaGlobal.model';
import Swal from 'sweetalert2';
import { ValidarCodigoPassModel } from '../../model/ValidarCodigoPass.model';
import { SetPasswordModel } from '../../model/setPassword.model';

@Component({
  selector: 'app-passwor-reset',
  standalone: true,
  imports: [FormsModule,CommonModule,MatIconModule,MatFormFieldModule,MatInputModule,
    MatCardModule,MatButtonModule,MatGridListModule,
    RouterLink,RouterLinkActive,NgxSpinnerModule,ReactiveFormsModule
  ],
  templateUrl: './passwor-reset.component.html',
  styleUrl: './passwor-reset.component.css'
})
export class PassworResetComponent implements OnInit{

  codeBoolean: boolean = false;
  passBoolean: boolean = false;
  buttonRecuperar: boolean = true;
  butonValidarCode: boolean = false;
  butonCambiarPass: boolean = false;
  correoGlobal: string = "";

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

  
  recuperarPassModel: RecuperarPassModel = new RecuperarPassModel();
  respuestaGlobalModel: RespuestaGlobalModel = new RespuestaGlobalModel();
  validarCodigoPassModel: ValidarCodigoPassModel = new ValidarCodigoPassModel();
  setPasswordModel: SetPasswordModel = new SetPasswordModel();

  constructor(
    private loginService: LoginService,
    private router: Router,
    public appComponent : AppComponent,
    private spinner: NgxSpinnerService,
    private buidr: FormBuilder
  ){

  }

  ngOnInit() {
  }

  formulario = this.buidr.group({
    correo: this.buidr.control(""),
    code: this.buidr.control(""),
    pass: this.buidr.control(""),
    passConfirm: this.buidr.control(""),
  })

  recuperar(): void{
    // validar correo del formulario
     if(this.formulario.value.correo === undefined || this.formulario.value.correo === ""){
      this.loginService.callAlert("Debe ingresar un correo.");
      return;
    }else{
      this.spinner.show();
 
      // json a enviar
      this.recuperarPassModel = {
        correo: this.formulario.value.correo ?? ""
      }

      this.correoGlobal = this.formulario.value.correo ?? "";

      // call servicio
      this.loginService.passReset(this.recuperarPassModel).subscribe(
        (response) =>{
          this.respuestaGlobalModel = response;
          if(this.respuestaGlobalModel.codRespuesta == 0){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: this.respuestaGlobalModel.glosaRespuesta,
              showConfirmButton: false,
              timer: 5000
            });
           this.codeBoolean = true;
           this.butonValidarCode = true;
           this.buttonRecuperar = false;
           this.formulario.get('correo')?.disable();
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

  validarCodigo(){
    // validar codigo del formulario
    if(this.formulario.value.code === undefined || this.formulario.value.code === ""){
      this.loginService.callAlert("Debe ingresar un Código.");
      return;
    }else{
      this.spinner.show();
      // json a enviar
      this.validarCodigoPassModel = {
        correo: this.correoGlobal,
        codigo: Number(this.formulario.value.code) ?? 0
      }

      // call servicio
      this.loginService.ValidarCodigoPass(this.validarCodigoPassModel).subscribe(
        (response) =>{
          this.spinner.show();
          this.respuestaGlobalModel = response;

          // validar respuesta servicio
          if(this.respuestaGlobalModel.codRespuesta == 0){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: this.respuestaGlobalModel.glosaRespuesta,
              showConfirmButton: false,
              timer: 5000
            });

           this.codeBoolean = false;
           this.butonValidarCode = false;
           this.buttonRecuperar = false;
           this.passBoolean = true;
           this.butonCambiarPass = true;

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
          this.spinner.hide();
        }
       )
    }
  }

  cambiarPass(){

     if(this.formulario.value.pass === undefined || this.formulario.value.pass === ""){
      this.loginService.callAlert("Debe ingresar una contraseña.");
      return;
    }else if(this.formulario.value.passConfirm === undefined || this.formulario.value.passConfirm === ""){
      this.loginService.callAlert("Debe ingresar una contraseña de confirmación.");
      return;
    }else{
      this.spinner.show();
      
      this.setPasswordModel = {
        correo: this.correoGlobal,
        pass: this.formulario.value.pass ?? "",
        passConfirm: this.formulario.value.passConfirm ?? "",
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
              timer: 5000
            });
            this.router.navigate(['/login']);
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
}
