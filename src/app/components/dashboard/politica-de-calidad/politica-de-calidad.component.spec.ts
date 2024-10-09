import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaDeCalidadComponent } from './politica-de-calidad.component';

describe('PoliticaDeCalidadComponent', () => {
  let component: PoliticaDeCalidadComponent;
  let fixture: ComponentFixture<PoliticaDeCalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticaDeCalidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoliticaDeCalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
