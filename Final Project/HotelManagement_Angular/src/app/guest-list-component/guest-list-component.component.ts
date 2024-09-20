import { Component } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guest-list-component',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './guest-list-component.component.html',
  styleUrl: './guest-list-component.component.css'
})
export class GuestListComponentComponent {
  guestList :any;
  loading: boolean = true;
  constructor(private apiser:HotelService,private router: Router){

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
    this.apiser.getAllGuest().subscribe(
      (response) =>{
        this.guestList=response;
        this.loading = false;

      }
    );
  }
  editGuest(id:number){
     this.router.navigate(['/guest-edit',id])
  }
  deleteGuest(id:number){
     this.router.navigate(['guest-delete',id])
  }
}
