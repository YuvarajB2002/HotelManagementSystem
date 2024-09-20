import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestListComponentComponent } from './guest-list-component.component';

describe('GuestListComponentComponent', () => {
  let component: GuestListComponentComponent;
  let fixture: ComponentFixture<GuestListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
