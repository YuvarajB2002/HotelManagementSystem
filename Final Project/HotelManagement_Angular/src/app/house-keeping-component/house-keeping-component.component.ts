import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-house-keeping-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './house-keeping-component.component.html',
  styleUrl: './house-keeping-component.component.css'
})
export class HouseKeepingComponentComponent {
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
  onTaskAssigned(){
      this.router.navigate(['/task-list']);
  }
  onTaskPending(){
     this.router.navigate(['/task-pendinglist']);
  }
  // onTaskUpdate(){

  // }
}
