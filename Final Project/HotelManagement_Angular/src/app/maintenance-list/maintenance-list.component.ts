import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../hotel.service';
import { Router, RouterLink } from '@angular/router';
import { MaintenanceRequest } from '../MaintenanceRequest';

@Component({
  selector: 'app-maintenance-list',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './maintenance-list.component.html',
  styleUrl: './maintenance-list.component.css'
})
export class MaintenanceListComponent {
  maintenanceRequests :any;
  staffList: any[] = [];
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

    this.apiser.getAllHouseKeepingUser().subscribe(
      (response) =>{
        this.staffList=response;
      }
    );
    this.loadMaintenanceRequests();
    
  }
  loadMaintenanceRequests(){
    this.apiser.getAllMaintenanceRequest().subscribe(
      (response) =>{
        this.maintenanceRequests=response;
        this.mapStaffNames();
      }
    );
  }
  
  mapStaffNames() {
    this.maintenanceRequests.forEach((request: MaintenanceRequest) => {
      const staff = this.staffList.find(staff => staff.userId === request.assignedMaintenanceStaffId);
      request.assignedMaintenanceStaffName = staff ? staff.username : 'Unknown';
    });
  }
}
