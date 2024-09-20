import { Component } from '@angular/core';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../Room';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-room-details-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './room-details-component.component.html',
  styleUrl: './room-details-component.component.css'
})
export class RoomDetailsComponentComponent {
  room :Room | undefined
  isAdmin:boolean=false;
  isStaff:boolean=false;
  constructor(private apiser:HotelService,private route:ActivatedRoute,private router:Router,private authser:AuthService){

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
    this.isAdmin=this.authser.isAdmin();
    this.isStaff=this.authser.isStaff();
   const id=+this.route.snapshot.params['id'];
   this.apiser.getbyid(id).subscribe(
     (response)=>{
       this.room=response
     }
   )
  }
  goBack(){
   this.router.navigate(['/roomlist']);
  }
}
