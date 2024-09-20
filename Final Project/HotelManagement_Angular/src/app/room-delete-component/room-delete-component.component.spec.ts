import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDeleteComponentComponent } from './room-delete-component.component';

describe('RoomDeleteComponentComponent', () => {
  let component: RoomDeleteComponentComponent;
  let fixture: ComponentFixture<RoomDeleteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDeleteComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomDeleteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
