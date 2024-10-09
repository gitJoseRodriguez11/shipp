import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-salir',
  standalone: true,
  imports: [],
  templateUrl: './salir.component.html',
  styleUrl: './salir.component.css'
})
export class SalirComponent implements OnInit{

  constructor(
    private router: Router,
    public appComponent : AppComponent
  ){

  }
  ngOnInit(): void{
   
    sessionStorage.clear();
    localStorage.clear();
    this.appComponent.isAuthentificate("Inicia sesión");
    this.router.navigate([''])
  }
}
