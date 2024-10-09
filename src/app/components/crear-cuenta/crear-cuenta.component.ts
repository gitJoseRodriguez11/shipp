import { Component, OnInit, signal } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2';
import { AddUserModel } from '../../model/AddUser.model';
import {MatGridListModule} from '@angular/material/grid-list';
import { LoginService } from '../../services/login/login.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AddUserRespModel } from '../../model/AddUserResp.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,NgxSpinnerModule
    
  ],
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css'
})
export class CrearCuentaComponent implements OnInit{

  addUserModel: AddUserModel = new AddUserModel();
  addUserRespModel: AddUserRespModel = new AddUserRespModel();

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
  
  constructor(
    private buidr: FormBuilder,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ){
  }
  ngOnInit() {
    
  }

  formulario = this.buidr.group({
    name: this.buidr.control(""),
    apellidoPaterno: this.buidr.control(""),
    correo: this.buidr.control(""),
    correoConfirm: this.buidr.control(""),
    celular: this.buidr.control(""),
    direccion: this.buidr.control(""),
    pass: this.buidr.control(""),
    passConfirm: this.buidr.control(""),
  })

  save(){

    if(this.formulario.value.name === undefined || this.formulario.value.name === ""){
      this.callAlert("Debe ingresar un nombre.");
      return;
    }else if(this.formulario.value.apellidoPaterno === undefined || this.formulario.value.apellidoPaterno === ""){
      this.callAlert("Debe ingresar un apellido paterno.");
      return;
    }else if(this.formulario.value.correo === undefined || this.formulario.value.correo === ""){
      this.callAlert("Debe ingresar un correo.");
      return;
    }else if(this.formulario.value.correoConfirm === undefined || this.formulario.value.correoConfirm === ""){
      this.callAlert("Debe ingresar un correo de confirmación.");
      return;
    }else if(this.formulario.value.correo !==  this.formulario.value.correoConfirm){
      this.callAlert("Correos electrónicos no coinciden.");
      return;
    }else if(this.formulario.value.celular === undefined || this.formulario.value.celular === ""){
      this.callAlert("Debe ingresar un número de celular.");
      return;
    }else if(this.formulario.value.direccion === undefined || this.formulario.value.direccion === ""){
      this.callAlert("Debe ingresar una dirección.");
      return;
    }else if(this.formulario.value.pass === undefined || this.formulario.value.pass === ""){
      this.callAlert("Debe ingresar una contraseña.");
      return;
    }else if(this.formulario.value.passConfirm === undefined || this.formulario.value.passConfirm === ""){
      this.callAlert("Debe ingresar una contraseña de confirmación.");
      return;
    }
    else{
      this.spinner.show();
      this.addUserModel = {
        nombre: this.formulario.value.name ?? "",
        appPaterno: this.formulario.value.apellidoPaterno ?? "",
        appMaterno: "",
        correo: this.formulario.value.correo ?? "",
        correoConfirm: this.formulario.value.correoConfirm ?? "",
        pass: this.formulario.value.pass ?? "",
        passConfirm: this.formulario.value.passConfirm ?? "",
        celular: this.formulario.value.celular ?? "",
        idPais: 1,
        idRegion: 0,
        idComuna: 0,
        direccion: this.formulario.value.direccion ?? "",
        genero: 0
       }

       this.loginService.addUser(this.addUserModel).subscribe(
        (response) =>{
          console.log('Data received:', response);
          this.addUserRespModel = response;
          if(this.addUserRespModel.codRespuesta == 0){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: this.addUserRespModel.glosaRespuesta,
              showConfirmButton: false,
              timer: 3000
            });
            this.router.navigate(['/login']);
          }else{
            Swal.fire({
              title: "Advertencia",
              text:  this.addUserRespModel.glosaRespuesta,
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

}
