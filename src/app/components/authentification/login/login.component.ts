import { Component, OnInit, signal } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VisibilityServiceService } from '../../../services/VisibilityService/visibility-service.service';
import { AppComponent } from '../../../app.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,MatIconModule,MatFormFieldModule,MatInputModule,
    MatCardModule,MatButtonModule,MatGridListModule,
    RouterLink,RouterLinkActive,NgxSpinnerModule,ReactiveFormsModule
  ],
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent implements OnInit{

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private visibilityService: VisibilityServiceService,
    public appComponent : AppComponent,
    private spinner: NgxSpinnerService,
    private buidr: FormBuilder
  ){

  }

  ngOnInit() {
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 5000);
  }

  formulario = this.buidr.group({
    correo: this.buidr.control(""),
    pass: this.buidr.control(""),
  })

  login(): void{

    if(this.formulario.value.correo === undefined || this.formulario.value.correo === ""){
      Swal.fire({
        title: "Advertencia",
        text:  "Debe ingresar un correo electrónico.",
        icon:  "warning"
      })
      return;
    }else if(this.formulario.value.pass === undefined || this.formulario.value.pass === ""){
      Swal.fire({
        title: "Advertencia",
        text:  "Debe ingresar una contraseña.",
        icon:  "warning"
      })
      return;
    }else{
      this.spinner.show();

      let correoU = this.formulario.value.correo || null;
  
      if(correoU !== null && this.formulario.value.pass !== null){
        this.loginService.login(correoU.toLocaleUpperCase(),this.formulario.value.pass).subscribe(
          (response) => {
            
            console.log('Data received:', response);
      
            if(response.codRespuesta == 0){
              this.router.navigate(['/dashboard']);
            }else{
              Swal.fire({
                title: "Advertencia",
                text:  response.glosa,
                icon:  "warning"
              })
          
            }
            this.spinner.hide();
          },
          
          (error) => {
            console.error('Error occurred:', error);
            this.spinner.hide();
          }
        
        )
      }else{
        Swal.fire({
          title: "Advertencia",
          text:  "Intente nuevamente.",
          icon:  "warning"
        })
      }
      
      
    }

   
  }
}
