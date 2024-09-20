import { Component } from '@angular/core';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-guest-delete-component',
  standalone: true,
  imports: [],
  templateUrl: './guest-delete-component.component.html',
  styleUrl: './guest-delete-component.component.css'
})
export class GuestDeleteComponentComponent {
  constructor(private apiser:HotelService,private router:Router,private route:ActivatedRoute)
  {

  }
  ngOnInit():void{
    const id = +this.route.snapshot.params['id'];
    if (confirm("Are you sure to delete")){
       this.apiser.deleteGuest(id).subscribe(
      
        (response)=>
        {
          console.log("Delete Removed");
          this.router.navigate(['/guest-list'])
        }
       )
      }
      else{
        this.router.navigate(['/guest-list'])
      }
  }
}
