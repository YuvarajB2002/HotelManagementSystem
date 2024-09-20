import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Inventory } from '../Inventory';
import { FormsModule, Validators } from '@angular/forms';
import { HotelService } from '../hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-component',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './inventory-component.component.html',
  styleUrl: './inventory-component.component.css'
})
export class InventoryComponentComponent {
inventory:Inventory={
  inventoryId:0,
  itemName: '',
  quantity: 0,
  reorderLevel: 0,
  lastRestockedDate: new Date,
  supplier: ''
}
success = false;
constructor(private router:Router,private apiser:HotelService){}
goBack(){
  this.router.navigate(['/inventory-list']);
}
onSubmit(){
  this.apiser.postInventory(this.inventory).subscribe(
    (response) =>
    {
      console.log('Inventory added successfully',response);
      this.success=true;
    }
  );
}
}
