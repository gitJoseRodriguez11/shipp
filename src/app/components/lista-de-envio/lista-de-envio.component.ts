import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, Inject, inject, OnInit, PLATFORM_ID, signal, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { BreakpointObserver,BreakpointState } from '@angular/cdk/layout';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AddContactoModel } from '../../model/AddContacto';
import { RespuestaGlobalModel } from '../../model/RespuestaGlobal.model';
import Swal from 'sweetalert2';
import { ContactoService } from '../../services/contacto/contacto.service';
import { AppComponent } from '../../app.component';

import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerIntl, MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { EnvioService } from '../../services/envio/envio.service';
import { getEstadoEnvioReqModel } from '../../model/Envios/getEstadoEnvio/getEstadoEnvioReq.model';
import { EnviosModel } from '../../model/Envios/AddEnvios/Envios';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { SetRechazoEnvioModel } from '../../model/Envios/SetRechazoEnvioReq.model';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-de-envio',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, 
      useValue: 'es-CL' 
    }

  ],

  // providers: [provideNativeDateAdapter(),
  //   {
  //     provide: STEPPER_GLOBAL_OPTIONS,
  //     useValue: {showError: true},
  //   },
  // ],
  imports: [NgxSpinnerModule,MatGridListModule,MatCardModule,
    MatInputModule,MatFormFieldModule,CommonModule,MatDatepickerModule,
    MatButtonModule,MenuComponent,MatTableModule,MatPaginatorModule,MatTooltipModule,
    MatSelectModule,ReactiveFormsModule
  ],
  templateUrl: './lista-de-envio.component.html',
  styleUrl: './lista-de-envio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaDeEnvioComponent implements OnInit{

  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar() {
    this._snackBar.open('Se cargaron los pedidos de los últimos 30 días.', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000,
    });
  }

  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _intl = inject(MatDatepickerIntl);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  readonly dateFormatString = computed(() => {
    if (this._locale() === 'es-CL') {
      return 'DD/MM/YYYY';
      
    } else if (this._locale() === 'fr') {
      return 'DD/MM/YYYY';
    }
    return '';
  });

  //variables que se ocupan en todos los componentes
  saludoNombre: any;
  colspanOne: number = 0;
  colspanTwo: number = 0;
  private breakpointObserver = inject(BreakpointObserver);
  public alltable: any;

  date: any;

  myForm: FormGroup;

  displayedColumns: string[] = ['n_orden','tiket', 'fecha_creacion','nombre', 'email', 'telefono', 'comuna_s', 'direccion', 'estado_pago','acciones'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: any;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  selectedEstoPago = 3;
  public estado = [
    {"value": 1, "viewValue": "PAGADO"},
    {"value": 0, "viewValue": "PENDIENTE"},
    {"value": 2, "viewValue": "RECHAZADO"},
  ]

  getEstadoEnvioReqModel: getEstadoEnvioReqModel = new getEstadoEnvioReqModel();
  setRechazoEnvioModel: SetRechazoEnvioModel = new SetRechazoEnvioModel();
  respuestaGlobalModel: RespuestaGlobalModel = new RespuestaGlobalModel();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public appComponent : AppComponent,
    private spinner: NgxSpinnerService,
    private buidr: FormBuilder,
    private envioService: EnvioService,
    private fb: FormBuilder
    
  )
  {
    if (isPlatformBrowser(this.platformId)) {
      this.checkSessionStorage('nombre');
    } else {
      // console.log('Running on the server, sessionStorage is not available.');
    }

    this.myForm = this.fb.group({
      date: [null], // Initialize the form control
      date2: [null] // Initialize the form control
    });
  }

  ngOnInit() {
    this.breakpointObserver
    .observe(['(min-width: 500px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.colspanOne =1;
        this.colspanTwo =3;
      } else {
        this.colspanOne = 4;
        this.colspanTwo =4;
      }
    });
    this.buscarAll();
    this.openSnackBar();
  }

  checkSessionStorage(key: string): void {
    const item = sessionStorage.getItem(key);
    if (item !== null) {
      // console.log(`Item with key "${key}" exists in session storage.`);
      this.saludoNombre = sessionStorage.getItem("nombre");
      this.appComponent.isAuthentificate(this.saludoNombre);
    } else {
      // console.log(`Item with key "${key}" does not exist in session storage.`);
    }
  }

   formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Santiago', // Asegúrate de establecer la zona horaria correcta
    };

    const formattedDate = date.toLocaleString('es-CL', options);
    return formattedDate.replace(',', ''); // Eliminar la coma si es necesario
}

  buscar(){
    const selectedDate = this.myForm.get('date')?.value;
    const selectedDateTwo = this.myForm.get('date2')?.value;

    if(selectedDate === null){
       this.callAlert("Debe ingresar una fecha desde.");
       return;
    }else if(selectedDateTwo === null){
      this.callAlert("Debe ingresar una fecha hasta.");
      return;
    }else{
      let fechad = new Date(selectedDate);
      let resultadoD = this.formatDate(fechad);
      let finalDesde = resultadoD.split(" ")
      let fechah = new Date(selectedDateTwo);
      let resultadoH = this.formatDate(fechah);
      let finalHasta = resultadoH.split(" ")

      this.getEstadoEnvioReqModel = new getEstadoEnvioReqModel();
      this.getEstadoEnvioReqModel = {
        estado: this.selectedEstoPago,
        idUsuario: Number(sessionStorage.getItem("idUser")),
        fechaDesde: finalDesde[0],
        fechaHasta: finalHasta[0]
      }

      // call servicio
      this.envioService.getEstadoEnviosSearch(this.getEstadoEnvioReqModel).subscribe(
        (response) =>{
          this.spinner.show();
          this.alltable = response
          // validar respuesta servicio
          if( this.alltable.codRespuesta == 0){
            const ELEMENT_DATA: EnviosModel[] = this.alltable.listaDeEnvios;
            this.dataSource = new MatTableDataSource<EnviosModel>(ELEMENT_DATA);
            this.dataSource.paginator = this.paginator ?? null;
            this.spinner.hide();
          }else{
            const ELEMENT_DATA: EnviosModel[] = [];
            this.dataSource = new MatTableDataSource<EnviosModel>(ELEMENT_DATA);
            this.dataSource.paginator = this.paginator ?? null;
            this.spinner.hide();
          }

          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
    })
  }
  }

  callAlert(texto: string){
    Swal.fire({
      title: "Advertencia",
      text:  texto,
      icon:  "warning"
    })
  }

  buscarAll(){
    this.getEstadoEnvioReqModel = new getEstadoEnvioReqModel();
    this.getEstadoEnvioReqModel = {
      estado: 1,
      idUsuario: Number(sessionStorage.getItem("idUser")),
    }
    // call servicio
    this.envioService.getEstadoEnvios(this.getEstadoEnvioReqModel).subscribe(
      (response) =>{
        this.spinner.show();
        this.alltable = response
        // validar respuesta servicio
        if( this.alltable.codRespuesta == 0){
          
          const ELEMENT_DATA: EnviosModel[] = this.alltable.listaDeEnvios;

          this.dataSource = new MatTableDataSource<EnviosModel>(ELEMENT_DATA);
          this.dataSource.paginator = this.paginator ?? null;
          
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

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
  
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
  
        var dataURL = canvas.toDataURL("image/png");
  
        resolve(dataURL);
      };
  
      img.onerror = error => {
        reject(error);
      };
  
      img.src = url;
    });
  }

  async descargarTicket(model: any){
 
    const pdfDefinition: any = {
      content: [
        {
          table: {
            body: [
              [
                { 
                image: await this.getBase64ImageFromURL("../../../assets/images/logo.png"), colSpan: 1,
                width: 70,height:50
                },
                {
                  text: model.estado_pago+ " $"+model.valor_envio,
                },
                {
                  colSpan: 2,
                  table:{
                    body: [
                      [
                        'Orden de Seguimiento',
                        
                      ],
                      [
                        model.n_orden
                      ]
                    ]
                  }
                },
                {}
              ],
              [
                { 
                  text: "ENTREGAR A:", colSpan: 2,
                },
                {},
                { 
                  text: "ENVIADO POR:", colSpan: 2,
                },
                {}
              ],
              // nombre
              [
                {
                  text: "Destinatario"
                },
                {
                  text: model.nombre
                },
                {
                  text: "Remitente"
                },
                {
                  text: model.nombre_empresa
                }
              ],
              // telefono
              [
                {
                  text: "Teléfono"
                },
                {
                  text: model.telefono
                },
                {
                  text: "Teléfono"
                },
                {
                  text: model.telefono_origen
                }
              ],
              //direccion
              [
                {
                  text: "Dirección"
                },
                {
                  text: model.direccion
                },
                {
                  //  text: "Dirección"
                },
                {
                  //  text: model.direccion_origen
                }
              ],
              //Comuna
              [
                {
                  text: "Comuna"
                },
                {
                  text: model.comuna_s
                },
                {
                  
                },
                {
                  
                }
              ],
              //footer
              [
                {
                  text: "Seguimiento en línea en https://shipments.cl", colSpan: 4,
                },
                {},
                {},
                {}
              ],
            ]
          }
        }
      ]
    }
    pdfMake.createPdf(pdfDefinition).download(model.n_orden+'.pdf'); // Download the generated PDF
  }

  detenerSolicitud(model: any){
    Swal.fire({
      title: "Está seguro de detener la solicitud.?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.setRechazoEnvioModel = new SetRechazoEnvioModel();

        this.setRechazoEnvioModel = {
          idEnvio: model.id_envio
        }
        // call servicio
        this.envioService.setRechazoEnvio(this.setRechazoEnvioModel).subscribe(
          (response) =>{
            this.spinner.show();
            this.respuestaGlobalModel = response;

            // validar respuesta servicio
            if( this.respuestaGlobalModel.codRespuesta == 0){
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: this.respuestaGlobalModel.glosaRespuesta,
                showConfirmButton: false,
                timer: 1000
              });
              this.buscarAll();
              this.spinner.hide();
            }else{
              this.callAlert(""+this.respuestaGlobalModel.glosaRespuesta);
            }
            this.spinner.hide();
          },
          (error) => {
            console.log(error);
            this.spinner.hide();
          }
        )
      }
    });
  }
}