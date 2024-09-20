import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListComponentComponent } from './inventory-list-component.component';

describe('InventoryListComponentComponent', () => {
  let component: InventoryListComponentComponent;
  let fixture: ComponentFixture<InventoryListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
