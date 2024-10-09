import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FrecuenteReqModel } from '../../../../model/FrecuenteReqModel.model';
import { FrecuenteService } from '../../../../services/frecuente/frecuente.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-add-frecuente',
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
    NgxSpinnerModule
  ],
  templateUrl: './add-frecuente.component.html',
  styleUrl: './add-frecuente.component.css'
})

export class AddFrecuenteComponent implements OnInit{

  frecuenteReqModel : FrecuenteReqModel = new FrecuenteReqModel();
  public optionsFrecuente: any;
  public optionsFrecuenteFinal: any;
  public respuesta: any;

  onAreaListControlChanged(list: any){
  this.respuesta = list;
}
  
  
  inputdata: any;
  readonly dialogRef = inject(MatDialogRef<AddFrecuenteComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private buidr: FormBuilder,
    private frecuenteService: FrecuenteService,
    private spinner: NgxSpinnerService,
  ){
    this.buscarAll();
  }



  ngOnInit() {
    
    this.inputdata = this.data;
    console.log(this.inputdata);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  AgregarFrecuente(){
    return this.respuesta;
  }

  buscarAll(){
   

    this.frecuenteReqModel = new FrecuenteReqModel();

    this.frecuenteReqModel = {
      id_usuario : Number(sessionStorage.getItem("idUser"))
    }
     // call servicio
     this.frecuenteService.allFrecuenteByIdUser(this.frecuenteReqModel).subscribe(
      (response) =>{
        this.spinner.show();
        this.optionsFrecuente = response

        // validar respuesta servicio
        if( this.optionsFrecuente.codRespuesta == 0){
          
          this.optionsFrecuenteFinal = this.optionsFrecuente.listaFreecuente;
          
          this.spinner.hide();
          
        }else{
      
        }

        this.spinner.hide();
      },
      (error) => {

        console.log(error);
        this.spinner.hide();

      }
     )
  }
}
