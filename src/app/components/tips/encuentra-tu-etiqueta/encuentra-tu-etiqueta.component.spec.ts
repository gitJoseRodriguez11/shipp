import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentraTuEtiquetaComponent } from './encuentra-tu-etiqueta.component';

describe('EncuentraTuEtiquetaComponent', () => {
  let component: EncuentraTuEtiquetaComponent;
  let fixture: ComponentFixture<EncuentraTuEtiquetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuentraTuEtiquetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncuentraTuEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
