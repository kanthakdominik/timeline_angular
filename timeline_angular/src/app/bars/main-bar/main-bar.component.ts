import { Component } from '@angular/core';

@Component({
  selector: 'app-main-bar',
  standalone: true,
  imports: [],
  templateUrl: './main-bar.component.html',
  styleUrl: './main-bar.component.css'
})
export class MainBarComponent {
  isLoggedIn = true; // Replace with actual authentication logic
  userName = 'User'; // Replace with actual user name

  logout() {
    // Implement logout logic here
    this.isLoggedIn = false;
  }
}


