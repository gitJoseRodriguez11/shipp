import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // if( !navigator.geolocation){
  //   console.log("Navegador no soporta Geolocalización");
  //   throw new Error("Navegador no soporta Geolocalización");
  // }
