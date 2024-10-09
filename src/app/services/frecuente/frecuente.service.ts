import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ParametrosService } from '../parametros.service';
import { FrecuenteReqModel } from '../../model/FrecuenteReqModel.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FrecuenteService {

  headers: HttpHeaders;
  private URL_ADD_FRECUENTE: string;
  private URL_ALL_FRECUENTE_BY_ID_USER: string;
  private URL_DELETE_FRECUENTE: string;
  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private readonly parametros: ParametrosService
  ) {
    const baseUrl = parametros.apiRoot;
    this.URL_ADD_FRECUENTE = baseUrl +'/frecuente/addfrecuente';
    this.URL_ALL_FRECUENTE_BY_ID_USER = baseUrl +'/frecuente/allFrecuenteByIdUser';
    this.URL_DELETE_FRECUENTE = baseUrl +'/frecuente/delete/';

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('responseType', 'application/json');
    this.headers.append(`Bearer ${ sessionStorage.getItem("authToken")}`, 'application/json');
   }

   addFrecuente(model : FrecuenteReqModel) : Observable<Object>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ sessionStorage.getItem("authToken")}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.URL_ADD_FRECUENTE,model,{ headers } )
  }

  allFrecuenteByIdUser(model : FrecuenteReqModel) : Observable<Object>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ sessionStorage.getItem("authToken")}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.URL_ALL_FRECUENTE_BY_ID_USER,model,{ headers } )
  }

  deleteFrecuenteByID(id : number) : Observable<Object>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ sessionStorage.getItem("authToken")}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete(this.URL_DELETE_FRECUENTE+id,{ headers } )
  }
}
