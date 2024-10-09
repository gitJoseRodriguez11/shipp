import { Routes } from '@angular/router';
import LoginComponent from './components/authentification/login/login.component';

import { AuthGuard } from './services/guards/auth/auth.guard';
import InicioComponent from './components/inicio/inicio.component';
import DashboardComponent from './components/dashboard/dashboard/dashboard.component';
import { AuthentificateGuard } from './services/guards/authentificate/authentificate.guard';
import { PagosComponent } from './components/pagos/pagos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { MisionvisionComponent } from './components/misionvision/misionvision.component';
import { PreguntasFrecuenteComponent } from './components/preguntas-frecuente/preguntas-frecuente.component';
import { SalirComponent } from './components/salir/salir.component';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { EnvioUnitarioComponent } from './components/envio-unitario/envio-unitario.component';
import { PassworResetComponent } from './components/passwor-reset/passwor-reset.component';
import { ListaDeEnvioComponent } from './components/lista-de-envio/lista-de-envio.component';
import { PagosPendientesComponent } from './components/pagos-pendientes/pagos-pendientes.component';
import { EnvioMultipleComponent } from './components/envio-multiple/envio-multiple.component';
import { EnvioMasivoComponent } from './components/envio-masivo/envio-masivo.component';
import { PruebacomponetComponent } from './pruebacomponet/pruebacomponet.component';
import { CargasProhibidasComponent } from './components/tips/cargas-prohibidas/cargas-prohibidas.component';
import { EmbalajeEtiquetadoComponent } from './components/tips/embalaje-etiquetado/embalaje-etiquetado.component';
import { EncuentraTuEtiquetaComponent } from './components/tips/encuentra-tu-etiqueta/encuentra-tu-etiqueta.component';
import { ExcepcionesDeServicioComponent } from './components/tips/excepciones-de-servicio/excepciones-de-servicio.component';
import { AllSolicitudesComponent } from './components/allSolicitudes/all-solicitudes/all-solicitudes.component';
import { PlanificadorRutasComponent } from './components/planificador-rutas/planificador-rutas.component';

export const routes: Routes = [
    
    { 
        path: '', 
        component: InicioComponent,
    },

    

    { 
        path: 'nosotros', 
        component: NosotrosComponent,
    },
    { 
        path: 'mision-vision', 
        component: MisionvisionComponent,
    },

    // RECURSOS
    { 
        path: 'preguntas-frecuentes', 
        component: PreguntasFrecuenteComponent,
    },
    // TIPS
    { 
        path: 'cargas-prohibidas', 
        component: CargasProhibidasComponent,
    },
    { 
        path: 'embalaje-etiquetado', 
        component: EmbalajeEtiquetadoComponent,
    },
    { 
        path: 'encuentra-tu-etiqueta', 
        component: EncuentraTuEtiquetaComponent,
    },
    { 
        path: 'excepciones-de-servicio', 
        component: ExcepcionesDeServicioComponent,
    },

    
    
    
    // END TIPS
    // END RECURSOS

    { 
        path: 'contacto', 
        component: ContactoComponent,
    },
   
    
    { 
        path: 'salir', 
        component: SalirComponent,
    },
  
    { 
        path: 'cuenta', 
        component: CuentaComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'crear-cuenta', 
        component: CrearCuentaComponent,
    },
    { 
        path: 'pass-reset', 
        component: PassworResetComponent,
    },
    { 
        path: 'prueba', 
        component: PruebacomponetComponent,
    },

    
    
    

    
    { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [AuthentificateGuard]
    },
    {
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pagos', 
        component: PagosComponent,
    },
    {
        path: 'envio-unitario', 
        component: EnvioUnitarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'envio-multiple', 
        component: EnvioMultipleComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'envio-masivo', 
        component: EnvioMasivoComponent,
        canActivate: [AuthGuard]
    },

    
    {
        path: 'mis-solicitudes', 
        component: ListaDeEnvioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pagos-pendientes', 
        component: PagosPendientesComponent,
        canActivate: [AuthGuard]
    },

    // admin 
    {
        path: 'admin-all-solicitudes', 
        component: AllSolicitudesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'planificador-rutas', 
        component: PlanificadorRutasComponent,
        
    }
    

    

    


    
   
   
   
    
];
