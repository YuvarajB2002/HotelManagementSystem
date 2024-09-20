import { Component, ElementRef, HostListener, viewChild, ViewChild } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-room-component',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './room-component.component.html',
  styleUrl: './room-component.component.css'
})
export class RoomComponentComponent {
   //@ViewChild('top') top:ElementRef |undefined;
  // isBackToTopVisible: boolean = false;
  data :any[]=[];
  filteredRooms: any[] =[];
  isAdmin:boolean=false;
  isStaff:boolean=false;
  constructor(private apiser:HotelService,private router: Router, private authser: AuthService){

  }
  ngOnInit():void{
    this.isAdmin=this.authser.isAdmin();
    this.isStaff=this.authser.isStaff();
    this.apiser.get().subscribe(
      (response) =>{
        this.data=response;
        this.filteredRooms=this.data;
      }
    );
  }

  filterRooms(status: string){
    if (status === 'Available') {
      this.filteredRooms = this.data.filter(d => d.status === 'Available');
    } else if (status === 'Not Available') {
      this.filteredRooms = this.data.filter(room => room.status !== 'Available');
    }
  }
  //  scrolltoTop()
  //  {
  //   if(this.top)
  //   {
  //     this.top.nativeElement.ScollIntoView({behavior:'smooth',block:'start'});
  //   }
  //  }
  roomDetails(id: number): void {

    this.router.navigate(['/room-details',id]);
  }
  bookRoom(id:number){
    this.router.navigate(['/book-room',id]);
  }
  deleteRoom(id:number){
    this.router.navigate(['/room-delete',id]);
  }
  editRoom(id:number){
     this.router.navigate(['room-edit',id]);
  }
  maintenanceRoom(id:number){
    this.router.navigate(['/maintenace-request',id]);
  }

}
