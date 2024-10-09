import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioMasivoComponent } from './envio-masivo.component';

describe('EnvioMasivoComponent', () => {
  let component: EnvioMasivoComponent;
  let fixture: ComponentFixture<EnvioMasivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvioMasivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnvioMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
