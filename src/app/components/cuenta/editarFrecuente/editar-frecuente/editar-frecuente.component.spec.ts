import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFrecuenteComponent } from './editar-frecuente.component';

describe('EditarFrecuenteComponent', () => {
  let component: EditarFrecuenteComponent;
  let fixture: ComponentFixture<EditarFrecuenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFrecuenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarFrecuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
