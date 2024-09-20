import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-payment-list-component',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './payment-list-component.component.html',
  styleUrl: './payment-list-component.component.css'
})
export class PaymentListComponentComponent {
payments:any
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
  this.apiser.getAllPayment().subscribe(
    (response) =>{
      this.payments=response;
    }
  );
}
}
