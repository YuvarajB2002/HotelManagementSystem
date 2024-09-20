import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../User';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-logincomponent',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './logincomponent.component.html',
  styleUrl: './logincomponent.component.css'
})
export class LogincomponentComponent {
  
  user: User = {
    userId:0,
    username: '',
    email:'',
    passwordHash: '',
    role:''
  }
  constructor(private authService: AuthService, private router: Router) { }
  onLogin(){
    console.log(this.user.email, this.user.passwordHash);
    if (this.user.email && this.user.passwordHash) {
      this.authService.login(this.user).subscribe(
        data => {
          console.log(data)
         const token = data?.token;
         console.log(token) // Directly get the token from API response
          if (token) {
            localStorage.setItem('token', token); // Store the token directly
            console.log('Token stored');
            console.log(localStorage.getItem('token'));
            const decodedToken: any = jwtDecode(token);
            localStorage.setItem('userId',decodedToken.UserId)
            const housestaffid = parseInt(decodedToken.UserId, 10);
            console.log(decodedToken);
            if(decodedToken.role === "Admin"){
              this.router.navigate(['/admin']);
            }
            else if(decodedToken.role === "Staff"){
              this.router.navigate(['/staff']);
              
            }
            else if(decodedToken.role === "HouseKeeping"){
             
              this.router.navigate(['/task-list',housestaffid]);
            }
             // Navigate to the products component
          } else {
            console.log('No token found in API response.');
            alert("Failed to retrieve token.");
          }        
        },
        error => {
          console.error('Login error:', error);
          alert("Invalid login details or server error");
        }
      );
    } else {
      alert("Please enter username and password first");
    }
  }
}
