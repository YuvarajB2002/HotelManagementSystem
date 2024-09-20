import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentListComponentComponent } from './payment-list-component.component';

describe('PaymentListComponentComponent', () => {
  let component: PaymentListComponentComponent;
  let fixture: ComponentFixture<PaymentListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
