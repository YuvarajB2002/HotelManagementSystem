import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-reservation-component',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './reservation-component.component.html',
  styleUrl: './reservation-component.component.css'
})
export class ReservationComponentComponent {
 reservations:any
 constructor(private apiser:HotelService,private router: Router){

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
   this.apiser.getAllReservation().subscribe(
     (response) =>{
       this.reservations=response;
     }
   );
 }
 checkOut(reservation: any){
  this.router.navigate(['/payment-calculation'], {
    queryParams: { 
      reservationId: reservation.reservationId,
      roomId: reservation.roomId,
      checkInDate: reservation.checkInDate,
      capacity: reservation.capacity 
    }
  });
 }
}
