import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-component.component.html',
  styleUrl: './staff-component.component.css'
})
export class StaffComponentComponent {
  constructor(private authService: AuthService, private router: Router) { }
  isLoggedIn(): boolean {
    // Implement your authentication check logic here
    return !!localStorage.getItem('token');  // Example logic
  }
  onLogout(): void {
    // Perform logout operation
    localStorage.removeItem('token');  // Remove token or user info
    this.router.navigate(['/login']);  // Navigate to login page after logout
  }
  onManageRooms(){
     this.router.navigate(['/roomlist']);
  }
  onManageReservations(){
     this.router.navigate(['/reservation-list']);
  }
  onManagePayments(){
     this.router.navigate(['/payment-list'])
  }
  onManageGuests(){
    this.router.navigate(['/guest-list']);
  }
}
