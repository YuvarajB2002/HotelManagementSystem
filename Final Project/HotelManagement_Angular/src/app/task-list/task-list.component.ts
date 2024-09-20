import { Component } from '@angular/core';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  data :any;
  constructor(private apiser:HotelService,private router: Router,private route:ActivatedRoute){

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
    const id=+this.route.snapshot.params['id'];
    this.apiser.getalltaskbyid(id).subscribe(
      (response) =>{
        this.data=response;
      }
    );
    this.apiser.getPendingTask().subscribe(
      (response) =>{
        this.pendingTasks=response;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching pending tasks:', error);
        this.loading = false;
      }
    );
  }
  pendingTasks: any[] = [];
  loading = true;

  completeTask(id:number){
    this.apiser.editTaskStatus(id).subscribe(
      (response)=>{
        console.log('Successfully changed the status');
        this.router.navigate(['/task-list',id]);
      }
    )
  }
}
