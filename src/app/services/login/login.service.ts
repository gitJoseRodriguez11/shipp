import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ParametrosService } from '../parametros.service';
import { AddUserModel } from '../../model/AddUser.model';
import Swal from 'sweetalert2';
import { PassworResetComponent } from '../../components/passwor-reset/passwor-reset.component';
import { RecuperarPassModel } from '../../model/RecuperarPass.model';
import { ValidarCodigoPassModel } from '../../model/ValidarCodigoPass.model';
import { SetPasswordModel } from '../../model/setPassword.model';
import { SetUserReqdModel } from '../../model/SetUserReq.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL_LOGIN: string;
  private URL_ADD_USER: string;
  private URL_PASS_RESET: string;
  private URL_CODIGO_PASS: string;
  private URL_SET_PASS: string;
  private URL_SET_USER: string;
  private tokenKey = "authToken";
  headers: HttpHeaders;

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private readonly parametros: ParametrosService
    
  ) { 
    const baseUrl = parametros.apiRoot;
    this.URL_LOGIN = baseUrl +'/usuario/login';
    this.URL_ADD_USER = baseUrl + '/usuario/addUser';
    this.URL_PASS_RESET = baseUrl + '/usuario/recuperarPass';
    this.URL_CODIGO_PASS = baseUrl + '/usuario/ValidarCodigoPass';
    this.URL_SET_PASS = baseUrl + '/usuario/setPassword';
    this.URL_SET_USER = baseUrl + '/usuario/setUser';

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('responseType', 'application/json');
    // this.headers.append('Access-Control-Allow-Origin', '*');
    // this.headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  }

  addUser(model: AddUserModel): Observable<Object>{
    return this.http.post(this.URL_ADD_USER,model)
  }

  setUser(model: SetUserReqdModel): Observable<Object>{
    return this.http.post(this.URL_SET_USER,model)
  }
  
  ValidarCodigoPass(model: ValidarCodigoPassModel): Observable<Object>{
    return this.http.post(this.URL_CODIGO_PASS,model)
  }

  passReset(model: RecuperarPassModel): Observable<Object>{
    return this.http.post(this.URL_PASS_RESET,model)
  }

  setPassword(model: SetPasswordModel): Observable<Object>{
    return this.http.post(this.URL_SET_PASS,model)
  }
  
  login(email: string, pass: string): Observable<any>{
    return this.http.post<any>(this.URL_LOGIN,{email,pass}).pipe(
      tap(response =>{
        if(response.token){
          console.log(response);
          console.log("token");
          console.log(response.token);
          this.setAlmacenarSesion(
            response.token, 
            response.datosUser,
            response.montoPendiente,
            response.countPendientesPago,
            response.countPagados,
            response.countEnvioProceso,
            response.countCancelado,
            response.countPorRetirar,
            response.countEnTransito,
            response.countEntregado,
            response.countPreparacion
          )
        }
      })
      
    )
   
  }

  // almacenar token en local
  private setAlmacenarSesion(token:string, datosUser:any, montoPendiente:number,countPendientesPago:number,
    countPagados:number,
    countEnvioProceso:number,
    countCancelado:number,
    countPorRetirar:number,
    countEnTransito:number,
    countEntregado:number,
    countPreparacion:number
  ): void{
    console.log("########### datos usuario login");
    console.log(datosUser);
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem("nombre", datosUser[0].nombre);
    localStorage.setItem("montoPendiente", ""+montoPendiente);
    localStorage.setItem("countPendientesPago", ""+countPendientesPago);
    localStorage.setItem("countPagados", ""+countPagados);
    localStorage.setItem("countEnvioProceso", ""+countEnvioProceso);
    localStorage.setItem("countCancelado", ""+countCancelado);
    localStorage.setItem("countPorRetirar", ""+countPorRetirar);
    localStorage.setItem("countEnTransito", ""+countEnTransito);
    localStorage.setItem("countEntregado", ""+countEntregado);
    localStorage.setItem("countPreparacion", ""+countPreparacion);

    localStorage.setItem("tbktoken","");
    
    // SESSION
    sessionStorage.setItem("authToken", token );
    sessionStorage.setItem("nombre", datosUser[0].nombre);
    sessionStorage.setItem("celularUser", ""+datosUser[0].telefono);
    sessionStorage.setItem("emailUser", ""+datosUser[0].email);
    sessionStorage.setItem("direccionUser", ""+datosUser[0].direccion);
    sessionStorage.setItem("appPaternoUser", ""+datosUser[0].apellido_paterno);
    sessionStorage.setItem("appMaternoUser", ""+datosUser[0].apellido_materno);
    sessionStorage.setItem("idUser", ""+datosUser[0].id_usuario);
    sessionStorage.setItem("nombreEmpresa", ""+datosUser[0].nombre_empresa);
    sessionStorage.setItem("comunaUser", ""+datosUser[0].id_comuna);
    sessionStorage.setItem("generoUser",""+datosUser[0].id_genero);
    sessionStorage.setItem("rolUser",""+datosUser[0].rol);

    

    this.isAuthentificate();
  }

  private getToken(): string | null {
    if(typeof window !== 'undefined'){
      return sessionStorage.getItem(this.tokenKey);
    }else {
      return null;
    }
  }

  getRol(): string | null {
    if(typeof window !== 'undefined'){
      return sessionStorage.getItem("rolUser");
    }else {
      return null;
    }
  }

  isAuthentificate(): boolean{

    const token = this.getToken();

    if(!token){
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    // tiempo token
    const exp = payload.exp * 1000;

    return Date.now() < exp;

  }

  logout(): void {

    localStorage.clear();
    sessionStorage.clear();

    // this.router.navigate(['']);
  }

  callAlert(texto: string){
    Swal.fire({
      title: "Advertencia",
      text:  texto,
      icon:  "warning"
    })
  }
}
