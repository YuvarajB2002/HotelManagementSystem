import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../User';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-edit-component',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './user-edit-component.component.html',
  styleUrl: './user-edit-component.component.css'
})
export class UserEditComponentComponent {
  user:User={
    userId: 0,
    username: '',
    email: '',
    passwordHash: '',
    role: ''
  }
  isUpdated:boolean=false;
  constructor(
    private apiService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.apiService.getuserbyid(id).subscribe(
      (u) => this.user = u,
      (error) => console.error('Error loading User', error)
    );
  }
  onSubmit(){
    const id = this.user.userId;
    this.apiService.editUser(id,this.user).subscribe(
      (response) => {
        this.isUpdated=true;
        console.log('User updated successfully!', response);
      },
      (error) => console.error('Error updating User', error)
    );
  }
}
