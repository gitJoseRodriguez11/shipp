import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasFrecuenteComponent } from './preguntas-frecuente.component';

describe('PreguntasFrecuenteComponent', () => {
  let component: PreguntasFrecuenteComponent;
  let fixture: ComponentFixture<PreguntasFrecuenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreguntasFrecuenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreguntasFrecuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
