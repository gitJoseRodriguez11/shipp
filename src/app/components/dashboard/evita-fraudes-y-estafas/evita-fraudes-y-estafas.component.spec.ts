import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvitaFraudesYEstafasComponent } from './evita-fraudes-y-estafas.component';

describe('EvitaFraudesYEstafasComponent', () => {
  let component: EvitaFraudesYEstafasComponent;
  let fixture: ComponentFixture<EvitaFraudesYEstafasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvitaFraudesYEstafasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvitaFraudesYEstafasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
