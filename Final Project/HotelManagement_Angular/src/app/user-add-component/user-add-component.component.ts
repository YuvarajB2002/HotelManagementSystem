import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../User';
import { Router, RouterLink } from '@angular/router';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-user-add-component',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './user-add-component.component.html',
  styleUrl: './user-add-component.component.css'
})
export class UserAddComponentComponent {
user:User={
  userId: 0,
  username: '',
  email: '',
  passwordHash: '',
  role: ''
}
isRegistered: boolean = false; 
constructor(private apiser:HotelService,private router:Router){
    
}
onSubmit():void{
  this.apiser.postUser(this.user).subscribe(
    (response) =>
    {
      this.isRegistered=true
      console.log('User added successfully',response);
    }
  );
}

}
