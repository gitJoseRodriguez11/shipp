import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFrecuenteComponent } from './add-frecuente.component';

describe('AddFrecuenteComponent', () => {
  let component: AddFrecuenteComponent;
  let fixture: ComponentFixture<AddFrecuenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFrecuenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFrecuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
