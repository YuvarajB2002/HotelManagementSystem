import { Component } from '@angular/core';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaintenanceRequest } from '../MaintenanceRequest';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { HouseKeepingTask } from '../HouseKeepingTask';
import { User } from '../User';

@Component({
  selector: 'app-maintenance-request',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './maintenance-request.component.html',
  styleUrl: './maintenance-request.component.css'
})
export class MaintenanceRequestComponent {
  roomId: number=0;  // RoomId passed from the route
  successMessage: string = '';
  errorMessage: string = '';
  staffList: any[] = [];
  maintenanceData: MaintenanceRequest = {
    RequestId: 0,
    RoomId: 0,
    assignedMaintenanceStaffId: 0,
    IssueDescription: '',
    MaintenanceStatus: 'Pending',
    RequestDate: new Date,
    ScheduledDate: new Date
  }
  housekeeping:HouseKeepingTask={
    taskId: 0,
    taskStatus: '',
    roomId: 0,
    assignedStaffId: 0,
    taskDescription: '',
    taskDate: new Date
  }
  constructor(private router:Router,private apiser:HotelService,private route: ActivatedRoute){}

  ngOnInit(): void {
    // Get RoomId from the route parameters
    this.roomId=+this.route.snapshot.params['id'];
    this.maintenanceData.RoomId = this.roomId;
    this.housekeeping.taskStatus='Pending';
    this.housekeeping.roomId=this.roomId;
    this.apiser.getAllHouseKeepingUser().subscribe(
      (response) =>{
        this.staffList=response;
      }
    );

  }
  submitMaintenanceRequest(){
    this.apiser.postMaintenance(this.maintenanceData).subscribe(
      (response) =>
      {
        console.log('Maintenance request added successfully',response);
        this.housekeeping.assignedStaffId=this.maintenanceData.assignedMaintenanceStaffId;
        this.housekeeping.taskDescription=this.maintenanceData.IssueDescription;
        this.successMessage = 'Maintenance request successfully submitted!';
        this.errorMessage = ''; 
        this.apiser.postHouseKeepingTask(this.housekeeping).subscribe(
          (response)=>
          {
              console.log('HouseKeepingTask added successfully',response);
          }
        )
      },
      error => {
        this.errorMessage = 'An error occurred while submitting the request.';
        this.successMessage = '';  // Clear the success message on error
      }
    );
  }
}
