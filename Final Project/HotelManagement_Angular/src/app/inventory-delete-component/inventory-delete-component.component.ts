import { Component } from '@angular/core';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventory-delete-component',
  standalone: true,
  imports: [],
  templateUrl: './inventory-delete-component.component.html',
  styleUrl: './inventory-delete-component.component.css'
})
export class InventoryDeleteComponentComponent {
  constructor(private apiser:HotelService,private router:Router,private route:ActivatedRoute)
  {

  }
  ngOnInit():void{
    const id = +this.route.snapshot.params['id'];
    if (confirm("Are you sure to delete")){
       this.apiser.deleteInventory(id).subscribe(
      
        (response)=>
        {
          console.log("Company Removed");
          this.router.navigate(['/inventory-list'])
        }
       )
      }
      else{
        this.router.navigate(['/inventory-list'])
      }
  }
}
