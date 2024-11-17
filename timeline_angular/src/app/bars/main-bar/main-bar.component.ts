import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-main-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main-bar.component.html',
  styleUrl: './main-bar.component.css'
})
export class MainBarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  currentUser$!: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}


