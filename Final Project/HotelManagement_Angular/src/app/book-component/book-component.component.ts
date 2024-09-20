import { Component } from '@angular/core';
import { Guest } from '../Guest';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../Reservation';
import { User } from '../User';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-book-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book-component.component.html',
  styleUrl: './book-component.component.css'
})
export class BookComponentComponent {
guest:Guest={
  guestId: 0,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  preferences: '',
  dateCreated:  new Date(),
  reservations: []
}
reservation:Reservation={
  reservationId: 0,
  guestId: 0,
  roomId: 0,
  reservationStatus: '',
  checkInDate: new Date,
  checkOutDate: new Date,
  totalAmount: 0,
  dateCreated: new Date,
  createdByUserId: '',
  capacity: 0,
  paymentStatus: ''
}
user: User = {
  userId:0,
  username: '',
  email:'',
  passwordHash: '',
  role:''
}

staffId = localStorage.getItem('userId')
showReservationForm = false;
id:number=0;
data:any

constructor(private apiser:HotelService,private router:Router,private route:ActivatedRoute,private authService:AuthService){
  
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
ngOnInit(): void {
   this.id = +this.route.snapshot.paramMap.get('id')!;
}
goBack(){

  this.router.navigate(['/roomlist']);
}
registerGuest(){

  this.apiser.postGuest(this.guest).subscribe(
    (response) =>
    {
      console.log('Guest added successfully',response);
      this.data=response
      this.showReservationForm=true;
    }
  );
}
submitReservation(){
  this.reservation.createdByUserId=this.staffId;
  this.reservation.guestId=this.data.guestId;
  this.reservation.roomId=this.id;
  console.log(this.reservation)
  this.apiser.postReservation(this.reservation).subscribe(
    (response) =>
    {
      console.log('Reservation added successfully',response);
      this.updateRoomStatus();
    },
    (error) => console.error('Error adding reservation', error)
  );
}
updateRoomStatus(){
  this.apiser.editRoomStatus(this.reservation.roomId,'Not Available').subscribe(
    (response) => {
      console.log('Room updated successfully!', response);
      this.router.navigate(['/roomlist']); 
    },
    (error) => console.error('Error updating room', error)
  );
}
}
