import { Component } from '@angular/core';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room-delete-component',
  standalone: true,
  imports: [],
  templateUrl: './room-delete-component.component.html',
  styleUrl: './room-delete-component.component.css'
})
export class RoomDeleteComponentComponent {
  constructor(private apiser:HotelService,private router:Router,private route:ActivatedRoute)
  {

  }
  ngOnInit():void{
    const id = +this.route.snapshot.params['id'];
    if (confirm("Are you sure to delete")){
       this.apiser.deleteRoom(id).subscribe(
      
        (response)=>
        {
          console.log("Room Removed");
          this.router.navigate(['/roomlist'])
        }
       )
      }
      else{
        this.router.navigate(['/roomlist'])
      }
}
}
