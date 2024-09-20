import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-component.component.html',
  styleUrl: './admin-component.component.css'
})
export class AdminComponentComponent {
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

  onManageRooms() {
    this.router.navigate(['/roomlist']);
  }

  onManageMaintenance() {
    this.router.navigate(['/maintenance-list']);
  }

  onGenerateReport() {
    this.router.navigate(['/reports']);
  }
  onManageInventory(){
    this.router.navigate(['/inventory-list']);
  }

  onAddUser() {
    this.router.navigate(['/user-list']);
  }


}
