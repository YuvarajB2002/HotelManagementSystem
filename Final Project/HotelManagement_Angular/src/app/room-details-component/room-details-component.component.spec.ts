import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailsComponentComponent } from './room-details-component.component';

describe('RoomDetailsComponentComponent', () => {
  let component: RoomDetailsComponentComponent;
  let fixture: ComponentFixture<RoomDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDetailsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
