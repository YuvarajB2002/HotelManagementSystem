import { Component } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-list-component',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './inventory-list-component.component.html',
  styleUrl: './inventory-list-component.component.css'
})
export class InventoryListComponentComponent {
  data :any[]=[];
  constructor(private apiser:HotelService,private router: Router, private service: AuthService){

  }
  isLoggedIn(): boolean {
    // Implement your authentication check logic here
    return !!localStorage.getItem('token');  // Example logic
  }
  onLogout(): void {
    // Perform logout operation
    localStorage.removeItem('token');  // Remove token or user info
    this.router.navigate(['/login']);  // Navigate to login page after logout
  }
  ngOnInit():void{
    this.apiser.getAllInventory().subscribe(
      (response) =>{
        this.data=response;
      }
    );
  }
  navigateToAddItem(){
     this.router.navigate(['/inventory']);
  }
  goBack(){
    this.router.navigate(['/admin']);
  }
  editItem(id:number){
    this.router.navigate(['/inventory-edit',id])
  }
  deleteItem(id:number){
    this.router.navigate(['/inventory-delete',id])
  }
}
