import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDeleteComponentComponent } from './guest-delete-component.component';

describe('GuestDeleteComponentComponent', () => {
  let component: GuestDeleteComponentComponent;
  let fixture: ComponentFixture<GuestDeleteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestDeleteComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestDeleteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
