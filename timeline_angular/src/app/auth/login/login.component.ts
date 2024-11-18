import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainBarComponent } from '../../bars/main-bar/main-bar.component';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    MainBarComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.maxLength(100)]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.successMessage = null;
      this.errorMessage = null;

      const { email, password } = this.loginForm.value;
      const user = this.dataService.getUserByEmail(email);
      
      if (!user) {
        this.errorMessage = 'Nieprawidłowy email lub hasło';
        return;
      }

      if (this.dataService.verifyPassword(password, user.password)) {
        this.successMessage = 'Logowanie zakończone pomyślnie!';
        this.authService.login(user);
        this.loginForm.reset();

        timer(1000).pipe(take(1)).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.errorMessage = 'Nieprawidłowy email lub hasło';
      }
    }
  }
}
