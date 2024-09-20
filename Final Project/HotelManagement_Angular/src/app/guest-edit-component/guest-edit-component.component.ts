import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Guest } from '../Guest';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-guest-edit-component',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './guest-edit-component.component.html',
  styleUrl: './guest-edit-component.component.css'
})
export class GuestEditComponentComponent {
  guest:Guest={
    guestId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    preferences: '',
    dateCreated: new Date,
    reservations: []
  }
  constructor(
    private apiService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
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
    this.loadCompany();
  }

  loadCompany(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.apiService.getguestbyid(id).subscribe(
      (g) => this.guest = g,
      (error) => console.error('Error loading guest', error)
    );
  }
  onSubmit(){
    const id = this.guest.guestId;
    this.apiService.editGuest(id,this.guest).subscribe(
      (response) => {
        console.log('Guest updated successfully!', response);
        this.router.navigate(['/guest-list']); 
      },
      (error) => console.error('Error updating guest', error)
    );
  }
}
