import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TransbankCreateModel } from '../../model/TransbankCreate.model';
import { Observable } from 'rxjs';
import { ParametrosService } from '../parametros.service';

@Injectable({
  providedIn: 'root'
})
export class TransbankService {

  headers: HttpHeaders;
  private URL_CREATE: string;
  private URL_COMMIT: string;
  

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private readonly parametros: ParametrosService
  ) { 
    const baseUrl = parametros.apiRoot;
    this.URL_CREATE = baseUrl +'/transbank/webpay_plus/create';
    this.URL_COMMIT = baseUrl +'/transbank/webpay_plus/commit?token_ws=';

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('responseType', 'application/json');
  }

  transbankCreate(transbankCreateModel: TransbankCreateModel) : Observable<any>{
    const apiUrl = `${this.URL_CREATE}`;
    const body = transbankCreateModel;
    return this.http.post<any>(apiUrl, body, { headers: this.headers})
  }

  transbankCommit(URL: String) : Observable<any>{
    const apiUrl = `${this.URL_COMMIT}`+ URL;
    return this.http.get<any>(apiUrl, { headers: this.headers})
  }
}
