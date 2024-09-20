import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEditComponentComponent } from './inventory-edit-component.component';

describe('InventoryEditComponentComponent', () => {
  let component: InventoryEditComponentComponent;
  let fixture: ComponentFixture<InventoryEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryEditComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
