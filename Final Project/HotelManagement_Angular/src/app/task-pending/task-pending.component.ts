import { Component } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-pending',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './task-pending.component.html',
  styleUrl: './task-pending.component.css'
})
export class TaskPendingComponent {
  pendingTasks: any[] = [];
  loading = true;

  constructor(private apiser: HotelService, private router: Router) {}
  ngOnInit():void{
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
  completeTask(id:number){
    this.apiser.editTaskStatus(id).subscribe(
      (response)=>{
        console.log('Successfully changed the status');
        this.router.navigate(['/housekeeping']);
      }
    )
  }
  goBack(): void {
    this.router.navigate(['/housekeeping']);
  }
}
