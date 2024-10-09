import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbalajeEtiquetadoComponent } from './embalaje-etiquetado.component';

describe('EmbalajeEtiquetadoComponent', () => {
  let component: EmbalajeEtiquetadoComponent;
  let fixture: ComponentFixture<EmbalajeEtiquetadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbalajeEtiquetadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmbalajeEtiquetadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
