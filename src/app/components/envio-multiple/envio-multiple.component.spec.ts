import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioMultipleComponent } from './envio-multiple.component';

describe('EnvioMultipleComponent', () => {
  let component: EnvioMultipleComponent;
  let fixture: ComponentFixture<EnvioMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvioMultipleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnvioMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
