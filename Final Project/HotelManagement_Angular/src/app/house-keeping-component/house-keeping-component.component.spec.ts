import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseKeepingComponentComponent } from './house-keeping-component.component';

describe('HouseKeepingComponentComponent', () => {
  let component: HouseKeepingComponentComponent;
  let fixture: ComponentFixture<HouseKeepingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseKeepingComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseKeepingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
