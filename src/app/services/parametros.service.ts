import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComunaReqModel } from '../model/ComunaReq.model';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
    providedIn: 'root'
  })
  export class ParametrosService {

    public apiRoot = 'http://localhost:5000';
    // public apiRoot = 'https://api.shipments.cl';

    private URL_COMUNAS: string;
    

    public valorIva = 19;
    public valorNeto = 2353;
    public valorIvaResult = Math.round((this.valorNeto * this.valorIva /100));
    // public valorEnvioUnitario = (this.valorNeto) + Number(this.valorIvaResult);
    public valorEnvioUnitario = 2800;
    // public valorEnvio = (this.valorNeto) + Number(this.valorIvaResult);
    public valorEnvio = 2800;



    constructor(
      private readonly http: HttpClient,
      private deviceService: DeviceDetectorService
    ) { 
      this.URL_COMUNAS = this.apiRoot +'/parameters/getComunaByRegion';
    }

    separadorMiles(valor: number) {
      const nf = new Intl.NumberFormat('es-CL');
      return nf.format(valor);
    }

    getComunas(model: ComunaReqModel): Observable<Object>{
      return this.http.post(this.URL_COMUNAS,model)
    }


    device(): any {
      return this.deviceService.getDeviceInfo();
    }
  
    isMobile(): boolean {
      return this.deviceService.isMobile();
    }
  
    isTablet(): boolean {
      return this.deviceService.isTablet();
    }
  
    isDesktop(): boolean {
      return this.deviceService.isDesktop();
    }
  }