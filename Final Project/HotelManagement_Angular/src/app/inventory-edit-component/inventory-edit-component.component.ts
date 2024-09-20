import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Inventory } from '../Inventory';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventory-edit-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './inventory-edit-component.component.html',
  styleUrl: './inventory-edit-component.component.css'
})
export class InventoryEditComponentComponent {
  inventoryItem:Inventory={
    inventoryId:0,
    itemName: '',
    quantity: 0,
    reorderLevel: 0,
    lastRestockedDate: new Date,
    supplier: ''

  }
  constructor(
    private apiService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.apiService.getinventorybyid(id).subscribe(
      (inven) => this.inventoryItem = inven,
      (error) => console.error('Error loading Inventory', error)
    );
  }
  onSubmit(){
    const id = this.inventoryItem.inventoryId;
    this.apiService.editInventory(id,this.inventoryItem).subscribe(
      (response) => {
        console.log('Inventory updated successfully!', response);
        this.router.navigate(['/inventory-list']); 
      },
      (error) => console.error('Error updating Inventory', error)
    );
  }
  goBack(){
    this.router.navigate(['/inventory-list']); 
  }
}
