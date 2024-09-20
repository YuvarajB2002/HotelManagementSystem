import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
constructor(private router:Router){}

  onLogin():void{
    this.router.navigate(['/login']);
  }
  onExploreRooms():void{
    this.router.navigate(['/roomlist']);
  }
}
