import { Injectable } from '@angular/core';
import { AddContactoModel } from '../../model/AddContacto';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParametrosService } from '../parametros.service';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private URL_SEN_MAIL: string;
  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private readonly parametros: ParametrosService
  ) { 
    const baseUrl = parametros.apiRoot;
    this.URL_SEN_MAIL = baseUrl +'/email/send-email';
  }

  contacto(model: AddContactoModel): Observable<Object>{
    return this.http.post(this.URL_SEN_MAIL,model)
  }
}

