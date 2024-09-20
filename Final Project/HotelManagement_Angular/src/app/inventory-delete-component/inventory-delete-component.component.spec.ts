import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDeleteComponentComponent } from './inventory-delete-component.component';

describe('InventoryDeleteComponentComponent', () => {
  let component: InventoryDeleteComponentComponent;
  let fixture: ComponentFixture<InventoryDeleteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryDeleteComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryDeleteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
