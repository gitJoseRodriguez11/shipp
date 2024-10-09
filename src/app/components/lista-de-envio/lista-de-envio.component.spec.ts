import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeEnvioComponent } from './lista-de-envio.component';

describe('ListaDeEnvioComponent', () => {
  let component: ListaDeEnvioComponent;
  let fixture: ComponentFixture<ListaDeEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeEnvioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaDeEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
