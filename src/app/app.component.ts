import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { MapsServiceService } from './services/maps-service.service';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { BooleanInput } from '@angular/cdk/coercion';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { VisibilityServiceService } from './services/VisibilityService/visibility-service.service';
import { LoginService } from './services/login/login.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet, RouterLink, RouterLinkActive,
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,MatButtonModule,
    MatMenuModule,MatProgressBarModule,MatCardModule,MatChipsModule,CommonModule
    

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'soca13';
  mdcBackdrop: BooleanInput = false;
  drawerMode: MatDrawerMode = "push";

  readonly breakpoint$ = this.breakpointObserver
  .observe([ '(max-width: 500px)']);


   crearcuenta: boolean = true;
   salirBoolean: boolean = false;



  latitude: number = 0;
  longitude: number = 0;
  errorMessage: string = "";

 locationObject : any;
 datos: any;
 ipAddress: string = "";

 isLoggedIn = false;
 isAdminIn = false;

 saludo: string = "Inicia sesión"


  constructor(
    private mapservicio : MapsServiceService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    public login: LoginService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
    this.breakpoint$.subscribe(() =>
      this.breakpointChanges()
  );

  this.route.paramMap.subscribe((parametros: ParamMap) => {
    console.log(parametros.get("id"));
  })

  
  }

  breakpointChanges(): void {

    if (this.breakpointObserver.isMatched('(max-width: 500px)')) {
      this.drawerMode = "over";
      this.mdcBackdrop = true;
    } else {
      this.drawerMode = "push";
      this.mdcBackdrop = false;
    }
    
  }

 
  isAuthentificate(nombre: string){

    this.isLoggedIn = this.login.isAuthentificate();

    let rol = this.login.getRol();
    
    if(rol === "0"){
      this.isAdminIn = true;
    }else{
      this.isAdminIn = false;
    }

    if(this.isLoggedIn === false){
      this.isAdminIn = false;
      this.saludo = "Inicia sesión";
    }else{
      this.saludo = nombre;
    }
    this.cdr.detectChanges();
  }

  ngOnInit(): void{

  }

  ngAfterViewInit(){
   
    this.isLoggedIn =  this.login.isAuthentificate();
    this.saludo = this.saludo;

    this.cdr.detectChanges(); // Manually trigger change detection
  
  }
  

 async getLocationTwo(){

  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    this.ipAddress = response.data.ip;
    console.log(this.ipAddress);
    
  } catch (error) {
    console.error('Error al obtener la dirección IP:', error);
  }
   
    this.mapservicio.getLocationTwo(this.ipAddress).subscribe(data => {
      this.datos = data;
      console.log(data);
      console.log(this.datos['latitude']);
      console.log(this.datos['longitude']);

      this.locationObject = {
        ip: "",
        latitude: this.datos['latitude'],
        longitude: this.datos['longitude'],
        ipfront: this.ipAddress
      }

      this.mapservicio.getLocation(this.locationObject).subscribe(data => {
        console.log(data);
      })
    })
  }

  getLocation(){
    console.log("1");
    if (navigator.geolocation) {
      console.log("if");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log(this.latitude);
          console.log(this.longitude);

          this.locationObject = {
            ip: "",
            latitude: this.latitude,
            longitude: this.longitude,
          }
         
          this.mapservicio.getLocation(this.locationObject).subscribe(data => {
            console.log(data);
          })


        },
        (error) => {
          console.log("error");
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.errorMessage = 'Permiso denegado';
              console.log("Permiso denegado");
              break;
            case error.POSITION_UNAVAILABLE:
              this.errorMessage = 'Posición no disponible';
              console.log("Posición no disponible");
              break;
            case error.TIMEOUT:
              this.errorMessage = 'Tiempo de espera agotado';
              console.log("Tiempo de espera agotado");
              break;
             
              console.log("error");
           
          }
        }
      );
    } else {
      this.errorMessage = 'La geolocalización no es compatible con este navegador.';
      console.log("else");
    }
  }
}


  

