import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Room } from '../Room';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-room-edit-component',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './room-edit-component.component.html',
  styleUrl: './room-edit-component.component.css'
})
export class RoomEditComponentComponent {
room:Room={
  roomId: 0,
  roomNumber: '',
  roomType: '',
  price: 0,
  status: '',
  description: '',
  capacity: 0,
  dateCreated: new Date(),
  ac: false,
  roomImage: '',
  reservations: []
}
isUpdated:boolean=false;
constructor(
  private apiService: HotelService,
  private route: ActivatedRoute,
  private router: Router
) { }

ngOnInit(): void {
  this.loadRoom();
}

loadRoom(): void {
  const id = +this.route.snapshot.paramMap.get('id')!;
  this.apiService.getbyid(id).subscribe(
    (r) => this.room = r,
    (error) => console.error('Error loading room', error)
  );
}

onSubmit(){
  const id = this.room.roomId;
    this.apiService.editRoom(id,this.room).subscribe(
      (response) => {
        this.isUpdated=true;
        console.log('Room updated successfully!', response);
      },
      (error) => console.error('Error updating room', error)
    );
}
}
