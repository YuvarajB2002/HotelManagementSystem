import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteComponentComponent } from './user-delete-component.component';

describe('UserDeleteComponentComponent', () => {
  let component: UserDeleteComponentComponent;
  let fixture: ComponentFixture<UserDeleteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDeleteComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDeleteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
