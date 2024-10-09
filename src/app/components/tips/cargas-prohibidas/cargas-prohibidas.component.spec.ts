import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargasProhibidasComponent } from './cargas-prohibidas.component';

describe('CargasProhibidasComponent', () => {
  let component: CargasProhibidasComponent;
  let fixture: ComponentFixture<CargasProhibidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargasProhibidasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargasProhibidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
