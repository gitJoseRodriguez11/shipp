import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioUnitarioComponent } from './envio-unitario.component';

describe('EnvioUnitarioComponent', () => {
  let component: EnvioUnitarioComponent;
  let fixture: ComponentFixture<EnvioUnitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvioUnitarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnvioUnitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
