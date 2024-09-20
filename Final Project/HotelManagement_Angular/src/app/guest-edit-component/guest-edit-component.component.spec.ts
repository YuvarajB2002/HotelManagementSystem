import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestEditComponentComponent } from './guest-edit-component.component';

describe('GuestEditComponentComponent', () => {
  let component: GuestEditComponentComponent;
  let fixture: ComponentFixture<GuestEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestEditComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
