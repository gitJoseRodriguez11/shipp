import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcepcionesDeServicioComponent } from './excepciones-de-servicio.component';

describe('ExcepcionesDeServicioComponent', () => {
  let component: ExcepcionesDeServicioComponent;
  let fixture: ComponentFixture<ExcepcionesDeServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcepcionesDeServicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcepcionesDeServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
