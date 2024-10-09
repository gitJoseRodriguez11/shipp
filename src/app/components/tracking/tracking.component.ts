import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { EnvioService } from '../../services/envio/envio.service';
import { TrackingReqModel } from '../../model/tracking/TrackingReqModel.model';
import { TrackingRespModel } from '../../model/tracking/TrackingRespModel.model';
import { TrackingModel } from '../../model/tracking/TrackingModel.model';



@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatListModule,
    CommonModule,
    NgxSpinnerModule],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit{
  public optionsFrecuente: any;
  public optionsFrecuenteFinal: any;
  public respuesta: any;
  public pedido: any;
  public comuna: any;
  public direccion: any;
  public estado: any;
  public monto: number;
  public estadoPago: any;
  public booleanPorPagar: boolean = false;


  trackingReqModel : TrackingReqModel = new TrackingReqModel();
  trackingModel : TrackingModel = new TrackingModel();

  @Input() disabled1: boolean;
  @Input() disabled2: boolean;
  @Input() disabled3: boolean;
  @Input() disabled4: boolean;

  toggle = true;
  status = "Enable";

  onAreaListControlChanged(list: any){
  this.respuesta = list;
}
  
  
  inputdata: any;
  readonly dialogRef = inject(MatDialogRef<TrackingComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private buidr: FormBuilder,
    private spinner: NgxSpinnerService,
    private envioService: EnvioService
  ){
  
  }



  ngOnInit() {
    
    this.inputdata = this.data;
    console.log(this.inputdata);
    this. buscar();
    
  }

  onNoClick(): void {
    this.dialogRef.close();
    localStorage.setItem("PendienteMonto","");
    localStorage.setItem("PendienteIdEnvio","");
  }

  AgregarFrecuente(){
    return this.respuesta;
  }

  buscar(){
    // call servicio

    this.trackingReqModel = {
      n_orden : this.inputdata.orden
    }
    this.spinner.show();
    this.envioService.getTrackingByOrden(this.trackingReqModel).subscribe(
      (response) =>{
        this.trackingModel = response;
        console.log(this.trackingModel );

        if(this.trackingModel.codRespuesta === 0){
          this.pedido = this.trackingModel.data.n_orden;
          this.comuna = this.trackingModel.data.comuna;
          this.direccion = this.trackingModel.data.direccion;
          this.monto = this.trackingModel.data.valor_envio;
          this.estadoPago = this.trackingModel.data.estado_pago_s;

          if(this.trackingModel.data.estado_pagado === 0){
            this.booleanPorPagar = true;
            localStorage.setItem("PendienteMonto",""+this.monto);
            localStorage.setItem("PendienteIdEnvio",""+this.trackingModel.data.id_envio);
            localStorage.setItem("PendienteObjeto",""+this.trackingModel);
          }else{
            this.booleanPorPagar = false;
          }

          if(this.trackingModel.data.estado === 1){
            this.disabled1 = false;
            this.disabled2 = true;
            this.disabled3 = true;
            this.disabled4 = true;

            this.toggle = !this.toggle;
            this.status = this.toggle ? "Enable" : "Disable";
          }
          else if(this.trackingModel.data.estado === 2){
            this.disabled1 = true;
            this.disabled2 = false;
            this.disabled3 = true;
            this.disabled4 = true;

            this.toggle = !this.toggle;
            this.status = this.toggle ? "Enable" : "Disable";
          }else if(this.trackingModel.data.estado === 3){
            this.disabled1 = true;
            this.disabled2 = true;
            this.disabled3 = false;
            this.disabled4 = true;

            this.toggle = !this.toggle;
            this.status = this.toggle ? "Enable" : "Disable";
          }else if(this.trackingModel.data.estado === 3){
            this.disabled1 = true;
            this.disabled2 = true;
            this.disabled3 = true;
            this.disabled4 = false;

            this.toggle = !this.toggle;
            this.status = this.toggle ? "Enable" : "Disable";
          }


        }


        this.spinner.hide();
    },
    (error) => {
      console.log(error);
      this.spinner.hide();
    }
  )}

  Pagar(){

  }
}