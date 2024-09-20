import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Room } from '../Room';
import { HotelService } from '../hotel.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-room-add-component',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './room-add-component.component.html',
  styleUrl: './room-add-component.component.css'
})
export class RoomAddComponentComponent {
room:Room={
  roomId: 0,
  roomNumber: '',
  roomType: '',
  price: 0,
  status: '',
  description: '',
  capacity: 0,
  dateCreated: new Date,
  ac: false,
  roomImage: '',
  reservations: []
}
isRoomAdded:boolean=false;
constructor(private apiser:HotelService,private router:Router){
    
}
onSubmit():void{
  this.apiser.postRoom(this.room).subscribe(
    (response) =>
    {
      console.log('Room added successfully',response);
      this.isRoomAdded=true;
    }
  );
}
}
