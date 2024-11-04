import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-bar',
  standalone: true,
  imports: [],
  templateUrl: './settings-bar.component.html',
  styleUrl: './settings-bar.component.css'
})
export class SettingsBarComponent {
  isLoggedIn: boolean = true; // Replace with actual authentication logic

  constructor() {
    // Replace with actual authentication check
    this.isLoggedIn = true; // Example: Set to true for demonstration
  }
}