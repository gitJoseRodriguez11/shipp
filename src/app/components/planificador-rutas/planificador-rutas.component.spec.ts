import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificadorRutasComponent } from './planificador-rutas.component';

describe('PlanificadorRutasComponent', () => {
  let component: PlanificadorRutasComponent;
  let fixture: ComponentFixture<PlanificadorRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanificadorRutasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanificadorRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
