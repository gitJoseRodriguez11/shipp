import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ParametrosService } from '../parametros.service';
import { AddEnviosReqModel } from '../../model/Envios/AddEnvios/addEnviosReq.model';
import { getEstadoEnvioReqModel } from '../../model/Envios/getEstadoEnvio/getEstadoEnvioReq.model';
import { SetRechazoEnvioModel } from '../../model/Envios/SetRechazoEnvioReq.model';
import { SetEstadoTrackingReqModel } from '../../model/Envios/setEstadoTrackingReq.model';
import { TrackingReqModel } from '../../model/tracking/TrackingReqModel.model';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  headers: HttpHeaders;
  private URL_ADD_ENVIO: string;
  private URL_GET_ESTADO_ENVIOS: string;
  private URL_GET_ESTADO_ENVIOS_SEARCH: string;
  private URL_SET_RECHAZO_ENVIOS: string;
  private URL_SET_ESTADO_TRACKING: string;

  private URL_TRACKING_BY_ORDER: string;

  private URL_GET_ESTADO_ENVIOS_SEARCH_ADMIN: string;
  private URL_GET_ESTADO_ENVIOS_ADMIN: string;
  

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private readonly parametros: ParametrosService
  ) { 
    const baseUrl = parametros.apiRoot;
    this.URL_ADD_ENVIO = baseUrl +'/shipp/setAddEnvio';
    this.URL_GET_ESTADO_ENVIOS = baseUrl +'/shipp/getEstadoEnvios';
    this.URL_GET_ESTADO_ENVIOS_SEARCH = baseUrl +'/shipp/getEstadoEnviosSerachUser';
    this.URL_SET_RECHAZO_ENVIOS = baseUrl +'/shipp/setRechazoEnvio';
    this.URL_SET_ESTADO_TRACKING = baseUrl +'/shipp/setTracking';

    this.URL_TRACKING_BY_ORDER = baseUrl +'/tracking/getTrackingByOrden';

    this.URL_GET_ESTADO_ENVIOS_SEARCH_ADMIN = baseUrl +'/shipp/getEstadoEnviosSerachAdmin';
    this.URL_GET_ESTADO_ENVIOS_ADMIN = baseUrl +'/shipp/getEstadoEnviosAdmin';
    
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('responseType', 'application/json');
    this.headers.append(`Bearer ${ sessionStorage.getItem("authToken")}`, 'application/json');
  
  }

  addEnvio(model: AddEnviosReqModel): Observable<Object>{

    console.log(" llego el token :" +sessionStorage.getItem("authToken"));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ sessionStorage.getItem("authToken")}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.URL_ADD_ENVIO,model,{ headers } )
  }


  getEstadoEnvios(model: getEstadoEnvioReqModel): Observable<Object>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ sessionStorage.getItem("authToken")}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.URL_GET_ESTADO_ENVIOS,model,{ headers } )
  }

  getEstadoEnviosAdmin(model: getEstadoEnvioReqModel): Observable<Object>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ sessionStorage.getItem("authToken")}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.URL_GET_ESTADO_ENVIOS_ADMIN,model,{ headers } )
  }

  getEstadoEnviosSearch(model: getEstadoEnvioReqModel): Observable<Object>{
    debugger;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ sessionStorage.getItem("authToken")}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.URL_GET_ESTADO_ENVIOS_SEARCH,model,{ headers } )
  }

  getEstadoEnviosSearchAdmin(model: getEstadoEnvioReqModel): Observable<Object>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ sessionStorage.getItem("authToken")}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.URL_GET_ESTADO_ENVIOS_SEARCH_ADMIN,model,{ headers } )
  }

  setRechazoEnvio(model: SetRechazoEnvioModel): Observable<Object>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ sessionStorage.getItem("authToken")}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.URL_SET_RECHAZO_ENVIOS,model,{ headers } )
  }

  setTracking(model: SetEstadoTrackingReqModel): Observable<Object>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ sessionStorage.getItem("authToken")}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.URL_SET_ESTADO_TRACKING,model,{ headers } )
  }

  getTrackingByOrden(model: TrackingReqModel) : Observable<any>{
    const apiUrl = `${this.URL_TRACKING_BY_ORDER}`;
    return this.http.post<any>(apiUrl, model, { headers: this.headers})
  }

  

 
}
