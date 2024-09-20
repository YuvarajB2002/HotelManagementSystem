import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAddComponentComponent } from './room-add-component.component';

describe('RoomAddComponentComponent', () => {
  let component: RoomAddComponentComponent;
  let fixture: ComponentFixture<RoomAddComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAddComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAddComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
