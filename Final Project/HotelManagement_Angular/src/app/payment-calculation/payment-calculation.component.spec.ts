import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCalculationComponent } from './payment-calculation.component';

describe('PaymentCalculationComponent', () => {
  let component: PaymentCalculationComponent;
  let fixture: ComponentFixture<PaymentCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCalculationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
