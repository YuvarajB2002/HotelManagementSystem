import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditComponentComponent } from './room-edit-component.component';

describe('RoomEditComponentComponent', () => {
  let component: RoomEditComponentComponent;
  let fixture: ComponentFixture<RoomEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomEditComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
