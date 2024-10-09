import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BreakpointObserver,BreakpointState } from '@angular/cdk/layout';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AddContactoModel } from '../../model/AddContacto';
import { RespuestaGlobalModel } from '../../model/RespuestaGlobal.model';
import Swal from 'sweetalert2';
import { ContactoService } from '../../services/contacto/contacto.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, MenuComponent,
    MatInputModule,MatFormFieldModule,MatButtonModule,
    MatCardModule,MatGridListModule,ReactiveFormsModule,
    FormsModule,NgxSpinnerModule
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit{

  //variables que se ocupan en todos los componentes
  saludoNombre: any;
  
  private _formBuilder = inject(FormBuilder);
  private breakpointObserver = inject(BreakpointObserver);
  addContactoModel:AddContactoModel = new AddContactoModel();
  respuestaGlobalModel: RespuestaGlobalModel = new RespuestaGlobalModel();

  colspanOne: number = 0;
  colspanTwo: number = 0;
  colspanThree: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private buidr: FormBuilder,
    private spinner: NgxSpinnerService,
    private contactoService: ContactoService,
    public appComponent : AppComponent
    
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

  formulario = this.buidr.group({
    nombre: this.buidr.control(""),
    correo: this.buidr.control(""),
    celular: this.buidr.control(""),
    mensaje: this.buidr.control(""),
  })

  save(){
    if(this.formulario.value.nombre === undefined || this.formulario.value.nombre === ""){
      this.callAlert("Debe ingresar un nombre.");
      return;
    }else if(this.formulario.value.correo === undefined || this.formulario.value.correo === ""){
      this.callAlert("Debe ingresar un correo.");
      return;
    }else if(this.formulario.value.celular === undefined || this.formulario.value.celular === ""){
      this.callAlert("Debe ingresar un número de celular.");
      return;
    }if(this.formulario.value.mensaje === undefined || this.formulario.value.mensaje === ""){
      this.callAlert("Debe ingresar un mensaje.");
      return;
    }else{
  
      this.spinner.show();
      debugger;
      this.addContactoModel = {
        nombre: this.formulario.value.nombre ?? "",
        correo: this.formulario.value.correo ?? "",
        celular: this.formulario.value.celular ?? "",
        mensaje: this.formulario.value.mensaje ?? "",
      }

      this.contactoService.contacto(this.addContactoModel).subscribe(
        (response) =>{
         this.respuestaGlobalModel = response;
         
         if(this.respuestaGlobalModel.codRespuesta == 0){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: this.respuestaGlobalModel.glosaRespuesta,
            showConfirmButton: false,
            timer: 3000
          });
          this.formulario.reset();
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
      // console.log(`Item with key "${key}" exists in session storage.`);
      this.saludoNombre = sessionStorage.getItem("nombre");
      this.appComponent.isAuthentificate(this.saludoNombre);
    } else {
      // console.log(`Item with key "${key}" does not exist in session storage.`);
    }
  }

}
