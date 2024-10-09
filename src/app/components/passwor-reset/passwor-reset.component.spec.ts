import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassworResetComponent } from './passwor-reset.component';

describe('PassworResetComponent', () => {
  let component: PassworResetComponent;
  let fixture: ComponentFixture<PassworResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassworResetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassworResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
