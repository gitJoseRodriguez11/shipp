import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationInterface } from '../interfaces/Location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsServiceService {

  // private url = 'http://localhost:5000'
  
  private url = 'https://api.shipments.cl'
  private location = this.url+'/parametro/getIp'

  constructor(
    private readonly http: HttpClient
  ) { }

  getLocation(object : LocationInterface): Observable<object>{
    return this.http.post(this.location,object);
  }

  getLocationTwo(ip: string): Observable<object>{
    return this.http.get('https://ipgeolocation.abstractapi.com/v1/?api_key=91b1ba633a424cfbb38ba696e084ab27&ip_address='+ip+'');
  }
}
