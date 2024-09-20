import { Component } from '@angular/core';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-delete-component',
  standalone: true,
  imports: [],
  templateUrl: './user-delete-component.component.html',
  styleUrl: './user-delete-component.component.css'
})
export class UserDeleteComponentComponent {
  constructor(private apiser:HotelService,private router:Router,private route:ActivatedRoute)
  {

  }
  ngOnInit():void{
    const id = +this.route.snapshot.params['id'];
    if (confirm("Are you sure to delete")){
       this.apiser.deleteUser(id).subscribe(
      
        (response)=>
        {
          console.log("User Removed");
          this.router.navigate(['/user-list'])
        }
       )
      }
      else{
        this.router.navigate(['/user-list'])
      }
  }
}
