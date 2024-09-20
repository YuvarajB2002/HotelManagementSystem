import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../hotel.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list-component',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './user-list-component.component.html',
  styleUrl: './user-list-component.component.css'
})
export class UserListComponentComponent {
  data :any;
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
      this.apiser.getAllUser().subscribe(
        (response) =>{
          this.data=response;
        }
      );
    }
  editUser(id:number){
    this.router.navigate(['/user-edit',id]);
  }
  deleteUser(id:number){
    this.router.navigate(['user-delete',id]);
  }
}
